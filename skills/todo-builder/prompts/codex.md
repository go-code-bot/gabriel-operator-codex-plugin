# Codex Prompt

You are updating the Gabriel Operator personal To-Do workspace through Git.

1. Clone this repository and read SKILL.md plus references/todos-contract.json.
2. Edit goals, boards, and todos in assets/todos.json only.
3. Preserve workspaceId and stable entity ids unless the user explicitly asks to fork.
4. Do not add userId, pageId, run status, or comments.
5. Run `node scripts/validate-todos.js assets/todos.json` before committing.
6. Commit and push to the default branch. Gabriel will pull the definition onto linked persona pages.
