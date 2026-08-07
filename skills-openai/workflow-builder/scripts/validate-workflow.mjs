import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const SAFE_ACTION_TYPES = new Set([
  'navigate',
  'wait',
  'llm',
  'confirmation',
  'api_output',
]);

const STEP_ID_PATTERN = /^step-[a-f0-9]{5}$/;
const SENSITIVE_KEY_PATTERN = /(?:^|_)(?:api_?key|authorization|bearer|cookie|credential|password|private_?key|secret|session_?token|access_?token|refresh_?token)(?:$|_)/i;
const STEP_WRAPPER_KEYS = ['arguments', 'params', 'options', 'input', 'config', 'data'];

function isObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function addError({ errors, path, message }) {
  errors.push(`${path}: ${message}`);
}

function scanSensitiveValues({ value, path, errors }) {
  if (Array.isArray(value)) {
    value.forEach((entry, index) => {
      scanSensitiveValues({ value: entry, path: `${path}[${index}]`, errors });
    });
    return;
  }
  if (!isObject(value)) return;
  for (const [key, entry] of Object.entries(value)) {
    const entryPath = `${path}.${key}`;
    if (
      SENSITIVE_KEY_PATTERN.test(key)
      && entry !== undefined
      && entry !== null
      && String(entry).trim() !== ''
    ) {
      addError({
        errors,
        path: entryPath,
        message: 'sensitive values are not permitted in the public authoring bundle',
      });
    }
    scanSensitiveValues({ value: entry, path: entryPath, errors });
  }
}

function validateCommonStep({ step, index, errors, seenStepIds }) {
  const path = `structure.steps[${index}]`;
  if (!isObject(step)) {
    addError({ errors, path, message: 'must be an object' });
    return;
  }

  if (step.step_number !== index + 1) {
    addError({ errors, path: `${path}.step_number`, message: `must equal ${index + 1}` });
  }
  if (typeof step.stepId !== 'string' || !STEP_ID_PATTERN.test(step.stepId)) {
    addError({ errors, path: `${path}.stepId`, message: 'must match step-[a-f0-9]{5}' });
  } else if (seenStepIds.has(step.stepId)) {
    addError({ errors, path: `${path}.stepId`, message: 'must be unique' });
  } else {
    seenStepIds.add(step.stepId);
  }
  if (typeof step.action_type !== 'string' || !SAFE_ACTION_TYPES.has(step.action_type)) {
    addError({
      errors,
      path: `${path}.action_type`,
      message: `must be one of ${[...SAFE_ACTION_TYPES].join(', ')}`,
    });
  }
  if (typeof step.label !== 'string' || !step.label.trim()) {
    addError({ errors, path: `${path}.label`, message: 'is required' });
  }
  if (typeof step.intent !== 'string' || !step.intent.trim()) {
    addError({ errors, path: `${path}.intent`, message: 'is required' });
  }
  if (typeof step.timestamp !== 'number') {
    addError({ errors, path: `${path}.timestamp`, message: 'must be a number' });
  }

  for (const key of STEP_WRAPPER_KEYS) {
    if (Object.prototype.hasOwnProperty.call(step, key)) {
      addError({ errors, path: `${path}.${key}`, message: 'step fields must remain at the step root' });
    }
  }

  if (step.action_type === 'navigate') {
    if (step.disableBrowser !== true) {
      addError({ errors, path: `${path}.disableBrowser`, message: 'must be true' });
    }
    if (step.url !== '') {
      addError({ errors, path: `${path}.url`, message: 'must be an empty string in this authoring-only bundle' });
    }
  }

  if (step.action_type === 'wait') {
    const waitTime = Number(step.waitTime);
    if (!Number.isFinite(waitTime) || waitTime < 0 || waitTime > 300_000) {
      addError({ errors, path: `${path}.waitTime`, message: 'must be between 0 and 300000 milliseconds' });
    }
  }

  if (step.action_type === 'confirmation') {
    const confirmation = step.confirmationConfig;
    if (!isObject(confirmation)) {
      addError({ errors, path: `${path}.confirmationConfig`, message: 'is required' });
    } else {
      const answerModes = new Set(['yes_no', 'freeform', 'multiple_choice']);
      if (!answerModes.has(confirmation.answerMode)) {
        addError({
          errors,
          path: `${path}.confirmationConfig.answerMode`,
          message: 'must be yes_no, freeform, or multiple_choice',
        });
      }
      if (confirmation.postAnswer !== 'continue') {
        addError({
          errors,
          path: `${path}.confirmationConfig.postAnswer`,
          message: 'must be continue in the public authoring bundle',
        });
      }
    }
  }

  if (step.action_type === 'api_output' && !Array.isArray(step.outputFields)) {
    addError({ errors, path: `${path}.outputFields`, message: 'must be an array' });
  }
}

function validateWorkflow(value) {
  const errors = [];
  if (!isObject(value)) return ['workflow: must be a JSON object'];
  if (!isObject(value.structure)) return ['structure: must be an object'];

  const structure = value.structure;
  for (const key of ['name', 'actionName', 'baseUrl']) {
    if (typeof structure[key] !== 'string') {
      addError({ errors, path: `structure.${key}`, message: 'must be a string' });
    }
  }
  if (!Array.isArray(structure.steps) || structure.steps.length === 0) {
    addError({ errors, path: 'structure.steps', message: 'must contain at least one step' });
  }
  if (!isObject(structure.parameters) || !Array.isArray(structure.parameters.execute)) {
    addError({ errors, path: 'structure.parameters.execute', message: 'must be an array' });
  }
  if (!Array.isArray(structure.groups)) {
    addError({ errors, path: 'structure.groups', message: 'must be an array' });
  }
  if (typeof value.commitMessage !== 'string' || !value.commitMessage.trim()) {
    addError({ errors, path: 'commitMessage', message: 'is required' });
  }

  const seenStepIds = new Set();
  if (Array.isArray(structure.steps)) {
    structure.steps.forEach((step, index) => {
      validateCommonStep({ step, index, errors, seenStepIds });
    });
    const first = structure.steps[0];
    if (isObject(first) && first.action_type !== 'navigate') {
      addError({ errors, path: 'structure.steps[0].action_type', message: 'must be navigate' });
    }
  }

  scanSensitiveValues({ value, path: 'workflow', errors });
  return errors;
}

async function main() {
  const inputPath = process.argv[2];
  if (!inputPath) {
    process.stderr.write('Usage: node scripts/validate-workflow.mjs <workflow.json>\n');
    process.exitCode = 1;
    return;
  }

  let parsed;
  try {
    parsed = JSON.parse(await readFile(resolve(inputPath), 'utf8'));
  } catch (error) {
    process.stderr.write(`Could not read workflow JSON: ${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
    return;
  }

  const errors = validateWorkflow(parsed);
  if (errors.length > 0) {
    process.stderr.write(`Validation failed with ${errors.length} error(s):\n`);
    errors.forEach((error) => process.stderr.write(`- ${error}\n`));
    process.exitCode = 1;
    return;
  }

  process.stdout.write('Workflow draft is valid for the public OpenAI authoring bundle.\n');
}

await main();
