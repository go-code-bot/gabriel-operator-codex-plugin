---
name: list-builder
description: Author and validate review-only Gabriel data-list schemas in assets/list.json. Use when the user explicitly asks to define or revise local list names, descriptions, columns, or an existing pipeline binding. Does not import, synchronize, query, or modify live records.
---

# List Builder

Maintain the local schema and display metadata for a Gabriel data list.

## Public authoring boundary

- Work only in the repository explicitly selected by the user.
- Edit `assets/list.json` only.
- Do not import, synchronize, query, create, update, or delete live records.
- Do not add real personal, confidential, financial, or authentication data.
- Do not invent collection or pipeline IDs; preserve existing bindings unless the user supplies an authorized local value.
- Do not commit, push, or trigger runtime behavior.

## Authoring process

1. Read the existing list definition.
2. Preserve `schemaVersion`, `listId`, `list.id`, `collectionId`, and unknown fields.
3. Add or revise columns using stable, unique keys.
4. Use only `text`, `number`, `boolean`, `date`, or `select` column types.
5. Use `options` only for `select` columns.
6. Keep `pipelineId` unchanged unless the user explicitly requests a local binding update.
7. Validate JSON syntax, required fields, and duplicate column keys locally.
8. Report changed schema fields and note that record import remains a separate user-controlled action.

Minimal shape:

```json
{
  "schemaVersion": 1,
  "listId": "list_example",
  "list": {
    "id": "list_example",
    "name": "Example List",
    "description": "Review-only list schema",
    "collectionId": "collection_example",
    "columns": [
      {
        "key": "title",
        "label": "Title",
        "type": "text",
        "required": true
      }
    ]
  },
  "commitMessage": "Draft list schema update"
}
```
