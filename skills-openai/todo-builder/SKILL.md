---
name: todo-builder
description: Author review-only Gabriel personal To-Do workspace drafts in assets/todos.json. Use when the user explicitly asks to define or revise local goals, boards, lanes, or To-Dos. Produces local drafts only and does not sync, import, schedule, or execute tasks.
---

# Todo Builder

Maintain a local personal To-Do workspace definition for human review.

## Public authoring boundary

- Work only in the repository explicitly selected by the user.
- Edit `assets/todos.json` only.
- Do not commit, push, publish, synchronize, import, schedule, or execute To-Dos.
- Do not add credentials, webhook secrets, private notes, or personal contact data.
- Do not place `userId`, `pageId`, run status, comments, or monitor secrets in the draft.
- Keep stable `id` values. Rename titles freely; do not regenerate IDs unless the user asks to fork a new identity.

## Mental model

- One repository owns one personal To-Do workspace draft.
- Goals, boards, lanes, and To-Dos are portable definitions only.
- Optional execution targets may reference existing local identifiers supplied by the user.
- Runtime runs and comments stay outside this authoring skill.

## Authoring process

1. Read the existing `assets/todos.json` when present.
2. Preserve schema version, stable IDs, and unknown fields.
3. Add or revise goals, boards, lanes, and To-Dos with unique IDs.
4. Keep titles and descriptions free of confidential material.
5. Omit monitor webhook secrets entirely.
6. Validate JSON syntax and unique IDs locally.
7. Report changed fields and note that sync or import remains a separate user-controlled action in Gabriel Operator.

Minimal shape:

```json
{
  "schemaVersion": 1,
  "goals": [
    {
      "id": "goal_example",
      "title": "Ship weekly update",
      "description": "Prepare a concise status summary"
    }
  ],
  "boards": [
    {
      "id": "board_example",
      "name": "Personal",
      "lanes": [
        {
          "id": "lane_todo",
          "name": "To Do"
        },
        {
          "id": "lane_done",
          "name": "Done"
        }
      ]
    }
  ],
  "todos": [
    {
      "id": "todo_example",
      "title": "Draft status notes",
      "goalId": "goal_example",
      "boardId": "board_example",
      "laneId": "lane_todo"
    }
  ],
  "commitMessage": "Draft todos workspace"
}
```
