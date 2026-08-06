---
name: todo-builder
description: "Build, validate, and maintain Git-backed Gabriel Operator personal To-Do workspaces by editing assets/todos.json. Use this skill when defining goals, boards, and To-Dos that sync from Git into Gabriel Operator and can be imported onto any persona."
compatibility: Requires Node.js 16+ for validation scripts.
---

# Todo Builder

## Using this skill in coding agents

Gabriel Operator skills are designed for Claude Code, Codex, Cursor, Hermes, OpenClaw, and any agent that supports skill packs. Work in the git-backed todos repository connected to your Gabriel personal To-Do workspace.

### Install the skill pack

| Agent | Install |
|-------|---------|
| **Claude Code** | `npx skills add go-code-bot/todo-builder` |
| **Codex** | `codex plugin marketplace add go-code-bot/gabriel-operator-codex-plugin --sparse .agents/plugins` then install the Gabriel Operator plugin |
| **Cursor** | `npx github:go-code-bot/todo-builder add ./my-todos` or copy into `.cursor/skills/todo-builder/` |
| **Hermes / generic CLI** | `npx github:go-code-bot/todo-builder add ./my-todos` |
| **OpenClaw** | `npx skills add go-code-bot/todo-builder` then `openclaw gateway connect --url https://your-openclaw-gateway` |
| **Gabriel Operator monorepo** | `cp -R server/skills/todo-builder ./your-git-repo/` |

Alternative curl installer:

```bash
curl -fsSL https://raw.githubusercontent.com/go-code-bot/todo-builder/main/install.sh | bash
```

### Modify with your coding agent

1. Open the git-backed todos repository.
2. Tell your agent: *"Read `SKILL.md` and update `assets/todos.json` (goals, boards, and To-Dos) for \<describe the change\>."*
3. Validate before committing:
   ```bash
   node scripts/validate-todos.js assets/todos.json
   ```
4. Commit and push to the default branch.

**Example prompts:**
- *"Add a recurring Monday 9:00 To-Do that drafts a weekly status update."*
- *"Rename the Marketing board and add a Review lane."*
- **OpenClaw:** *"Update assets/todos.json, run the validator, and prepare the workspace for Git sync."*

### Sync to Gabriel

1. Run the validator (see above).
2. Commit and push to the default branch.
3. Open To-Dos in Gabriel and **Pull** so `assets/todos.json` projects onto the linked persona page.

## Git-backed todos repositories

When this skill is materialized as a Git repository for one personal workspace,
the repo contains the scaffold plus `assets/todos.json`. The workspace is
**personal to the user** — the same payload can be imported onto any persona
page owned by that user. Runtime runs and comments stay in Gabriel's database;
Git only holds portable definitions.

## Mental Model

- One repository owns one personal To-Do workspace (goals + boards + todos).
- Keep stable `id` values. Renaming titles is fine; do not regenerate ids unless
  you intentionally fork into a new identity.
- Do **not** put `userId`, `pageId`, run status, `lastRun*`, or comments in Git.
- Optional `monitor` on a To-Do enables list-watch / webhook triggers. Include
  `enabled` and `listWatch` only — **never** commit `monitor.webhookToken`
  (Gabriel mints a fresh token on pull/import).
- Optional `executionTarget.type: "workflow"` runs a page-builder workflow
  endpoint (`appId` + `endpointSlug`). Endpoint ids are page-local after import.
- `executionTarget.playbookId` values are page-local. After importing onto a
  different persona, canvas shortcuts may need re-binding in Gabriel.

## Canonical File

Edit:

```text
assets/todos.json
```

Expected wrapper:

```json
{
  "schemaVersion": 1,
  "workspaceId": "todows_example",
  "workspace": {
    "id": "todows_example",
    "name": "Personal To-Dos",
    "goals": [],
    "boards": [],
    "todos": [],
    "checkInSchedule": null
  },
  "commitMessage": "Update todos workspace"
}
```

## Common Edits

Add a To-Do:

1. Append an entry to `workspace.todos[]` with a unique `id`.
2. Set `title`, `promptText`, `scheduleType` (`manual` | `one_time` | `recurring`), and `enabled`.
3. Point `goalId` / `boardId` at existing workspace goal/board ids when relevant.

Add a board lane:

1. Find the board in `workspace.boards[]`.
2. Append `{ "key", "name", "color", "order" }` to `lanes`.

## Validation

```bash
node scripts/validate-todos.js assets/todos.json
```

The validator rejects missing required fields, duplicate ids, invalid schedule
types, and malformed wrappers.
