---
name: component-actions-ui
description: Interactive UI components — button, link, action-card, quick-action-card, project-card, card, modal, form-group.
metadata:
  category: page-builder
  subcategory: actions-ui
  componentTypes:
    - button
    - link
    - action-card
    - quick-action-card
    - project-card
    - card
    - modal
    - form-group
---

# Interactive Action Components

Clickable, interactive components for user actions, navigation, and data entry.

---

## button

Standard action button.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `label` | `string` | yes | Button text |
| `disabled` | `string` | no | Disabled state (string "true"/"false") |

### Events

`onClick` — triggered on button press.

### Grid Position

Typical: `colSpan: 1, rowSpan: 1`

### Example

```json
{
  "id": "btn-export",
  "componentType": "button",
  "props": {
    "label": "Export Report",
    "disabled": "false"
  },
  "gridPosition": { "col": 4, "row": 1, "colSpan": 1, "rowSpan": 1 }
}
```

---

## link

Navigation link element.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `label` | `string` | yes | Link text |
| `href` | `string` | yes | Target URL |

### Grid Position

Typical: `colSpan: 1, rowSpan: 1`

### Example

```json
{
  "id": "link-docs",
  "componentType": "link",
  "props": {
    "label": "View Documentation",
    "href": "/docs/getting-started"
  },
  "gridPosition": { "col": 1, "row": 1, "colSpan": 1, "rowSpan": 1 }
}
```

---

## action-card

Clickable card that triggers an action.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | yes | Card title |
| `icon` | `string` | no | Icon identifier |

### Events

`onClick` — triggered on card click.

### Grid Position

Typical: `colSpan: 1, rowSpan: 1`

### Example

```json
{
  "id": "action-new-report",
  "componentType": "action-card",
  "props": {
    "title": "Generate Report",
    "icon": "file-plus"
  },
  "gridPosition": { "col": 1, "row": 1, "colSpan": 1, "rowSpan": 1 }
}
```

---

## quick-action-card

Compact quick-action tile.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | yes | Card title |
| `icon` | `string` | no | Icon identifier |

### Events

`onClick` — triggered on card click.

### Grid Position

Typical: `colSpan: 1, rowSpan: 1`

### Example

```json
{
  "id": "quick-add-competitor",
  "componentType": "quick-action-card",
  "props": {
    "title": "Add Competitor",
    "icon": "user-plus"
  },
  "gridPosition": { "col": 2, "row": 1, "colSpan": 1, "rowSpan": 1 }
}
```

---

## project-card

Project summary card with key metrics.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | yes | Project name |
| `domain` | `string` | no | Project domain |
| `logo` | `string` | no | Project logo |
| `visibility` | `number` | no | Visibility score |
| `articlesCreated` | `number` | no | Articles count |
| `hoursSaved` | `number` | no | Hours saved metric |
| `openIssues` | `number` | no | Open issues count |
| `issueResolution` | `number` | no | Resolution percentage |

### Grid Position

Typical: `colSpan: 1, rowSpan: 1`

### Example

```json
{
  "id": "project-acme",
  "componentType": "project-card",
  "props": {
    "name": "Acme Marketing",
    "domain": "acme.com",
    "logo": "logo-acme",
    "visibility": 78,
    "articlesCreated": 24,
    "hoursSaved": 120,
    "openIssues": 3,
    "issueResolution": 92
  },
  "gridPosition": { "col": 1, "row": 1, "colSpan": 1, "rowSpan": 1 }
}
```

---

## card

General-purpose content card.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | no | Card title |
| `subtitle` | `string` | no | Card subtitle |
| `content` | `string` | no | Body text |
| `icon` | `string` | no | Icon identifier |
| `image` | `string` | no | Image URL |
| `items` | `Array<object>` | no | List items within the card |

### Grid Position

Typical: `colSpan: 1-2, rowSpan: 1`

### Example

```json
{
  "id": "card-overview",
  "componentType": "card",
  "props": {
    "title": "Getting Started",
    "subtitle": "Quick setup guide",
    "content": "Follow these steps to configure your brand monitoring dashboard.",
    "icon": "book-open",
    "items": [
      { "label": "Step 1", "text": "Add your brand" },
      { "label": "Step 2", "text": "Configure competitors" },
      { "label": "Step 3", "text": "Set up alerts" }
    ]
  },
  "gridPosition": { "col": 1, "row": 1, "colSpan": 2, "rowSpan": 1 }
}
```

---

## modal

Overlay dialog triggered by an event action. Not positioned in the grid.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | no | Modal title |
| `content` | `string` | no | Modal body content |
| `submitLabel` | `string` | no | Submit button text |

### Grid Position

N/A — modals are overlays, not placed in the grid. Triggered via `open_modal` event action.

### Example

```json
{
  "id": "modal-confirm-delete",
  "componentType": "modal",
  "props": {
    "title": "Confirm Deletion",
    "content": "Are you sure you want to remove this competitor from tracking?",
    "submitLabel": "Delete"
  }
}
```

---

## form-group

Grouped form fields with title and description.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | no | Form group heading |
| `description` | `string` | no | Form group description |

### Events

`onSubmit` — triggered on form submission.

### Grid Position

Typical: `colSpan: 2-4, rowSpan: 1-2`

### Example

```json
{
  "id": "form-brand-settings",
  "componentType": "form-group",
  "props": {
    "title": "Brand Settings",
    "description": "Configure your brand identity and monitoring preferences."
  },
  "gridPosition": { "col": 1, "row": 1, "colSpan": 4, "rowSpan": 2 }
}
```
