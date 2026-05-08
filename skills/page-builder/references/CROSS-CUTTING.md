# Cross-Cutting Features Reference

Features and patterns that apply across all components and pages in a
PageBuilderConfig.

---

## 1. Grid positioning system

Every component is placed on a **4-column grid** via its `gridPosition` field.

```typescript
gridPosition: {
  col: number;      // Starting column (1-based)
  row: number;      // Starting row (1-based)
  colSpan: number;  // Columns to span (1–4)
  rowSpan: number;  // Rows to span (1+)
}
```

### Rules

- Columns and rows are **1-based** (first column is `1`, not `0`).
- The grid has exactly **4 columns**.
- `col + colSpan - 1` must not exceed 4.
- Rows auto-expand; there is no maximum row count.
- Components in the same row that overlap columns will cause rendering issues.

### Common layouts

| Layout | col | colSpan | Description |
|---|---|---|---|
| Full width | 1 | 4 | Spans the entire row |
| Half width (left) | 1 | 2 | Left half of the row |
| Half width (right) | 3 | 2 | Right half of the row |
| Quarter width | 1/2/3/4 | 1 | Single column |
| Three-quarters | 1 | 3 | Three of four columns |
| Three-quarters (right) | 2 | 3 | Columns 2–4 |

### Example — 4 KPI cards in a row

```json
[
  { "col": 1, "row": 1, "colSpan": 1, "rowSpan": 1 },
  { "col": 2, "row": 1, "colSpan": 1, "rowSpan": 1 },
  { "col": 3, "row": 1, "colSpan": 1, "rowSpan": 1 },
  { "col": 4, "row": 1, "colSpan": 1, "rowSpan": 1 }
]
```

### Example — sidebar + main content

```json
[
  { "col": 1, "row": 1, "colSpan": 1, "rowSpan": 10 },
  { "col": 2, "row": 1, "colSpan": 3, "rowSpan": 1 }
]
```

---

## 2. Data binding pattern

Data binding connects a component to dynamic data from an agent action,
collection, or endpoint. Any component that supports data binding can include a
`dataBinding` field on its `ComponentInstance`.

### Binding flow

1. The renderer invokes the agent action specified by `agentId` + `actionId`.
2. The response is mapped to component props via `mappings`.
3. Each mapping extracts a value at `responsePath` and assigns it to
   `componentProp`.

### Minimal example

```json
{
  "dataBinding": {
    "agentId": "agent-uuid-here",
    "actionId": "action-uuid-here",
    "mappings": [
      {
        "componentProp": "rows",
        "responsePath": "data.items"
      },
      {
        "componentProp": "title",
        "responsePath": "data.title"
      }
    ]
  }
}
```

### With query config

```json
{
  "dataBinding": {
    "agentId": "agent-uuid-here",
    "actionId": "action-uuid-here",
    "mappings": [
      { "componentProp": "rows", "responsePath": "data.items" }
    ],
    "queryConfig": {
      "filters": [
        { "fieldPath": "status", "operator": "eq", "value": "active" }
      ],
      "sort": { "field": "createdAt", "direction": "desc" },
      "limit": 10
    }
  }
}
```

### Collection-backed binding

When binding to a collection, include `collectionId` and `fieldKey` in
mappings:

```json
{
  "mappings": [
    {
      "componentProp": "rows",
      "responsePath": "data",
      "collectionId": "collection-uuid",
      "fieldKey": "items"
    }
  ]
}
```

---

## 3. Event system overview

Components that support events can include an `events` array on the
`ComponentInstance`. Each event fires one or more actions when triggered.

### Event structure

```json
{
  "events": [
    {
      "id": "event-uuid",
      "type": "onClick",
      "actions": [
        {
          "id": "action-uuid",
          "type": "navigate",
          "config": { "path": "/dashboard" }
        }
      ]
    }
  ]
}
```

### Event types

| Type | Fires when |
|---|---|
| `onClick` | User clicks the component |
| `onSubmit` | User submits a form |
| `onChange` | An input value changes |
| `onLoad` | The component finishes loading |
| `onHover` | User hovers over the component |

### Action types

| Action Type | Purpose |
|---|---|
| `navigate` | Route to a different page |
| `api_call` | Call an API endpoint |
| `call_workflow` | Execute an agent workflow |
| `set_state` | Update application state |
| `open_modal` | Open a modal component |
| `submit_form` | Submit form data to an endpoint or collection |
| `auth_login` | Trigger login flow |
| `auth_register` | Trigger registration flow |
| `auth_forgot_password` | Trigger forgot password flow |
| `auth_magic_link` | Trigger magic link auth flow |

### Chaining actions

Multiple actions execute in sequence within a single event. Use `onSuccess` and
`onError` in `api_call` and `call_workflow` actions to create conditional
chains.

---

## 4. Example data pattern

The `exampleData` field on a `ComponentInstance` provides static fallback data.
The renderer uses it when:

- No `dataBinding` is configured.
- The data binding has not yet executed (`lastExecuted` is null).
- The data binding call fails.

```json
{
  "id": "comp-uuid",
  "componentType": "kpi-card",
  "gridPosition": { "col": 1, "row": 1, "colSpan": 1, "rowSpan": 1 },
  "props": { "title": "Total Revenue" },
  "exampleData": {
    "value": "$125,000",
    "change": "+12%",
    "trend": "up"
  }
}
```

**Best practice:** Always provide `exampleData` for data-bound components so
the page is not blank before data loads.

---

## 5. ID generation conventions

All IDs in a PageBuilderConfig use UUID v4 format:

```
xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
```

| Entity | ID Field | Scope |
|---|---|---|
| NavSection | `id` | Unique across config |
| PageDefinition | `id` | Unique across config |
| ComponentInstance | `id` | Unique across config |
| CollectionDefinition | `id` | Unique across config |
| CollectionField | `key` | Unique within collection |
| EndpointDefinition | `id` | Unique across config |
| ComponentEvent | `id` | Unique across config |
| EventAction | `id` | Unique across config |
| PageBuilderConnector | `id` | Unique across config |

**Rules:**
- Generate fresh UUIDs for every new entity.
- Never reuse an ID across different entity types.
- Field `key` values within a collection do not need to be UUIDs but must be
  unique within that collection.

---

## 6. Collection linking via linkedCollections

Templates define placeholder collection IDs. When a page uses a template, the
`linkedCollections` field maps those placeholder IDs to the actual collection
IDs in the current config.

```json
{
  "id": "page-uuid",
  "name": "Dashboard",
  "path": "/dashboard",
  "templateId": "aeo-dashboard",
  "linkedCollections": {
    "template-collection-placeholder-id": "actual-collection-uuid"
  },
  "components": []
}
```

This allows templates to be reusable — the same template can be applied to
different collections by changing the `linkedCollections` mapping.

### When to use

- Always set `linkedCollections` when using a `templateId` that references
  collections.
- If building pages from scratch (no `templateId`), `linkedCollections` is not
  needed — use direct `collectionId` references in data bindings instead.

---

## 7. Route types

Pages have a `routeType` that controls access:

| Route Type | Behavior |
|---|---|
| `'authenticated'` | Requires user login; redirects to login page if unauthenticated |
| `'unauthenticated'` | Public access; typically used for landing pages, login, signup |

### Defaults

- If `routeType` is omitted, the page inherits the route type from its
  `NavSection` (if present).
- Pages inside a `NavSection` with `routeType` set will inherit that value.
- Standalone pages in the `pages` array default to `'authenticated'` if not
  specified.

### Default page IDs

Set these top-level fields to control routing behavior:

- `defaultAuthenticatedPageId` — The page users land on after login.
- `defaultUnauthenticatedPageId` — The page shown to unauthenticated visitors
  (typically a landing page or login page).
