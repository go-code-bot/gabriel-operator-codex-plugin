# OpenAI-safe workflow schema

## Top level

```json
{
  "actionId": "",
  "structure": {
    "name": "workflow-draft",
    "actionName": "Workflow Draft",
    "baseUrl": "",
    "screenshotEnabled": false,
    "parameters": {
      "execute": []
    },
    "groups": [],
    "steps": []
  },
  "commitMessage": "Draft workflow definition"
}
```

Required fields:

- `structure.name`
- `structure.actionName`
- `structure.baseUrl`
- `structure.steps`
- `structure.parameters.execute`
- `structure.groups`
- `commitMessage`

## Common step fields

```json
{
  "step_number": 1,
  "stepId": "step-a1b2c",
  "action_type": "navigate",
  "label": "Initialize browserless workflow",
  "intent": "**Input:** ... **Processing:** ... **Output:** ...",
  "timestamp": 0
}
```

Rules:

- Step numbers are sequential and begin at `1`.
- Step IDs are unique and match `step-[a-f0-9]{5}`.
- `label` and `intent` are non-empty.
- Step fields remain at the step root.
- Sensitive values are prohibited.

## Browserless initializer

The first step must have this behavior:

```json
{
  "step_number": 1,
  "stepId": "step-a1b2c",
  "action_type": "navigate",
  "disableBrowser": true,
  "url": "",
  "selectors": [],
  "label": "Initialize browserless workflow",
  "intent": "**Input:** No external inputs. **Processing:** Initializes the browserless draft. **Output:** No external action is performed.",
  "timestamp": 0
}
```

## Wait

```json
{
  "step_number": 2,
  "stepId": "step-b2c3d",
  "action_type": "wait",
  "label": "Wait before continuing",
  "intent": "**Input:** No external inputs. **Processing:** Waits for the configured bounded duration. **Output:** Continues to the next draft step.",
  "waitTime": 1000,
  "timestamp": 0
}
```

## LLM reasoning

```json
{
  "step_number": 2,
  "stepId": "step-b2c3d",
  "action_type": "llm",
  "label": "Summarize supplied text",
  "intent": "**Input:** Uses non-sensitive text supplied to the workflow. **Processing:** Produces a concise summary. **Output:** Exports `summary` for the result step.",
  "systemPrompt": "Summarize only the supplied material.",
  "userPrompt": "{{step-a1b2c.inputText}}",
  "exportedVariables": {
    "summary": "response"
  },
  "timestamp": 0
}
```

Do not place private or confidential material directly in authored prompt literals.

## Confirmation

Supported answer modes are `yes_no`, `freeform`, and `multiple_choice`.

```json
{
  "step_number": 3,
  "stepId": "step-c0ffe",
  "action_type": "confirmation",
  "label": "Review generated summary",
  "intent": "**Input:** Uses the generated summary. **Processing:** Requests human review. **Output:** Exposes the review answer.",
  "userPrompt": "Does the draft summary look correct?",
  "confirmationConfig": {
    "answerMode": "yes_no",
    "postAnswer": "continue"
  },
  "timestamp": 0
}
```

## API output

`api_output` structures local workflow results; it does not call an external API.

```json
{
  "step_number": 4,
  "stepId": "step-d4e5f",
  "action_type": "api_output",
  "label": "Return reviewed summary",
  "intent": "**Input:** Uses the reviewed summary. **Processing:** Maps it into a named result. **Output:** Returns the `summary` field.",
  "outputName": "reviewed-summary",
  "outputFields": [
    {
      "key": "summary",
      "value": "{{step-b2c3d.summary}}",
      "type": "string"
    }
  ],
  "timestamp": 0
}
```
