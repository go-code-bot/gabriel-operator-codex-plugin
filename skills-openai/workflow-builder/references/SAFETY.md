# Public authoring boundary

This skill prepares local workflow drafts for human review. It is not an execution
or integration skill.

## Allowed

- Read an existing workflow definition from the user-selected repository.
- Create or update `assets/workflow.json`.
- Use non-sensitive placeholders and outputs already present in the local draft.
- Run the bundled local validator.
- Explain which runtime steps remain to be configured in Gabriel Operator.

## Not allowed

- Deploying, running, scheduling, committing, pushing, or publishing workflows.
- Connecting to external accounts or services.
- Handling passwords, tokens, cookies, private keys, session data, or other credentials.
- Accessing restricted resources or automating authentication challenges.
- Creating instructions that defeat authorization checks or service restrictions.
- Sending messages, submitting forms, uploading files, modifying data, or deleting data.
- Executing arbitrary shell commands, code, desktop actions, or network requests.

## Handoff

When a requested workflow needs a capability outside the supported action set:

1. Keep the local draft limited to supported actions.
2. Add no invented or unsafe placeholder action.
3. Describe the desired runtime operation in the final response.
4. Tell the user to configure and review that operation in Gabriel Operator with
   the appropriate connection, permissions, and confirmation controls.
