---
name: pipeline-builder
description: Author review-only Gabriel pipeline state-machine drafts in assets/pipeline.json. Use when the user explicitly asks to define or revise local columns, stages, or transitions. Produces local drafts only and does not deploy, run, sync, or modify live records.
---

# Pipeline Builder

Create or update a local Gabriel pipeline machine definition for human review.

## Public authoring boundary

- Work only in the repository explicitly selected by the user.
- Edit `assets/pipeline.json` only.
- Do not commit, push, publish, deploy, schedule, or run the pipeline.
- Do not create, update, query, import, or delete live records.
- Do not add credentials, private data, or external service connections.
- Preserve stable IDs and unknown fields.
- Do not invent collection, page, workflow, or task IDs unless the user supplies an authorized local value.

## Mental model

- One pipeline is one state-machine draft.
- `pipeline.columns[]` defines the persisted context schema.
- `pipeline.stages[]` defines state metadata only.
- `pipeline.transitions[]` defines allowed moves between stages and optional local workflow bindings.
- Runtime records and `_workflowState` never belong in Git.

## Authoring process

1. Read the existing `assets/pipeline.json` when present.
2. Preserve `schemaVersion`, `pageId`, `pipelineId`, `pipeline.id`, and `collectionId`.
3. Add or revise columns with stable unique `key` values.
4. Add or revise stages with stable unique `id` values.
5. Add or revise transitions with stable unique `id` values and valid source/target stage IDs.
6. Keep optional `taskIds` as references only; do not embed task payloads.
7. Validate JSON syntax, unique IDs, and transition stage references locally.
8. Report changed fields and note that sync, run, and record operations remain separate user-controlled actions in Gabriel Operator.

Minimal shape:

```json
{
  "schemaVersion": 1,
  "pageId": "page_example",
  "pipelineId": "pipe_example",
  "pipeline": {
    "id": "pipe_example",
    "pageId": "page_example",
    "name": "Example Pipeline",
    "collectionId": "collection_example",
    "columns": [
      {
        "id": "col_title",
        "key": "title",
        "label": "Title",
        "type": "text",
        "required": true,
        "order": 1
      }
    ],
    "stages": [
      {
        "id": "stage_new",
        "name": "New",
        "type": "start",
        "description": "Initial stage"
      },
      {
        "id": "stage_done",
        "name": "Done",
        "type": "end",
        "description": "Completed stage"
      }
    ],
    "transitions": [
      {
        "id": "tr_start_to_done",
        "name": "Complete",
        "fromStageId": "stage_new",
        "toStageId": "stage_done",
        "trigger": "manual"
      }
    ]
  },
  "taskIds": [],
  "commitMessage": "Draft pipeline definition"
}
```
