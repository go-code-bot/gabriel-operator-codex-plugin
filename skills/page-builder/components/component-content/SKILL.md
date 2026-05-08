---
name: component-content
description: Content display components — text, article-list, article-editor, data-list.
metadata:
  category: page-builder
  subcategory: content
  componentTypes:
    - text
    - article-list
    - article-editor
    - data-list
---

# Content Components

Components for displaying and editing textual and list-based content.

---

## text

Simple rich-text or plain-text content block.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `content` | `string` | yes | Text content to display |

### Data Binding

Bindable props: `content`

### Grid Position

Typical: `colSpan: 4, rowSpan: 1`

### Example

```json
{
  "id": "text-intro",
  "componentType": "text",
  "props": {
    "content": "Welcome to your dashboard. Here you can monitor key metrics and manage your content pipeline."
  },
  "gridPosition": { "col": 1, "row": 1, "colSpan": 4, "rowSpan": 1 }
}
```

---

## article-list

Tabular article listing with column configuration and a create button.

### Props — `ArticleListProps`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | yes | List heading |
| `columns` | `Array<{ key: string; header: string; width?: string; align?: string }>` | yes | Column definitions |
| `rows` | `Array<Record<string, any>>` | yes | Article row data |

### Data Binding

Bindable props: `title`, `columns`, `rows`

### Events

Built-in create button emits an event for adding new articles.

### Grid Position

Typical: `colSpan: 4, rowSpan: 2`

### Example

```json
{
  "id": "article-list-main",
  "componentType": "article-list",
  "props": {
    "title": "Published Articles",
    "columns": [
      { "key": "title", "header": "Title", "width": "40%" },
      { "key": "status", "header": "Status" },
      { "key": "author", "header": "Author" },
      { "key": "date", "header": "Published", "align": "right" }
    ],
    "rows": [
      { "title": "Getting Started with AI SEO", "status": "Published", "author": "Jane Doe", "date": "2025-03-01" },
      { "title": "Content Strategy Guide", "status": "Draft", "author": "John Smith", "date": "2025-02-28" }
    ]
  },
  "gridPosition": { "col": 1, "row": 1, "colSpan": 4, "rowSpan": 2 }
}
```

---

## article-editor

Full article editor with step progress and outline blocks.

### Props — `ArticleEditorProps`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | yes | Article title |
| `steps` | `Array<{ id: string; label: string; status: string; icon?: string }>` | yes | Progress steps |
| `outline` | `Array<{ id: string; type: string; content: string }>` | yes | Outline blocks |

### Data Binding

Bindable props: `title`, `steps`, `outline`

### Events

Built-in save and export actions.

### Grid Position

Typical: `colSpan: 4, rowSpan: 3`

### Example

```json
{
  "id": "editor-article",
  "componentType": "article-editor",
  "props": {
    "title": "How to Improve Brand Visibility with AI",
    "steps": [
      { "id": "s1", "label": "Research", "status": "complete", "icon": "search" },
      { "id": "s2", "label": "Outline", "status": "complete", "icon": "list" },
      { "id": "s3", "label": "Draft", "status": "active", "icon": "edit" },
      { "id": "s4", "label": "Review", "status": "pending", "icon": "check" }
    ],
    "outline": [
      { "id": "b1", "type": "heading", "content": "Introduction" },
      { "id": "b2", "type": "paragraph", "content": "AI-powered tools are transforming how brands approach visibility..." },
      { "id": "b3", "type": "heading", "content": "Key Strategies" },
      { "id": "b4", "type": "paragraph", "content": "Focus on content quality, entity optimization, and platform diversification." }
    ]
  },
  "gridPosition": { "col": 1, "row": 1, "colSpan": 4, "rowSpan": 3 }
}
```

---

## data-list

Simple list display for items or suggestions.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `suggestedCompetitors` | `Array<string>` | no | Suggested competitor names |
| `items` | `Array<string>` | no | Generic list items |

### Data Binding

Bindable props: `suggestedCompetitors`, `items`

### Grid Position

Typical: `colSpan: 2, rowSpan: 1`

### Example

```json
{
  "id": "list-competitors",
  "componentType": "data-list",
  "props": {
    "suggestedCompetitors": ["Ahrefs", "SEMrush", "Moz"],
    "items": ["Content gap analysis", "Backlink audit", "Keyword tracking"]
  },
  "gridPosition": { "col": 1, "row": 1, "colSpan": 2, "rowSpan": 1 }
}
```
