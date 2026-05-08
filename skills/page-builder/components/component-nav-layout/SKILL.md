---
name: component-nav-layout
description: Navigation and layout components — sidebar, dashboard-header, header-actions, filter-bar.
metadata:
  category: page-builder
  subcategory: nav-layout
  componentTypes:
    - sidebar
    - dashboard-header
    - header-actions
    - filter-bar
---

# Navigation & Layout Components

Structural components for page chrome: sidebars, headers, and filter bars. Most of these are provided automatically by the template/theme and rarely need manual placement.

---

## sidebar

Vertical navigation sidebar with links and branding.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | no | Sidebar title |
| `links` | `Array<object>` | no | Navigation link items |
| `agentName` | `string` | no | Agent/app name display |
| `appLogo` | `string` | no | Logo URL or identifier |
| `memberCount` | `number` | no | Team member count badge |

### Data Binding

Bindable props: `title`, `links`, `agentName`, `appLogo`, `memberCount`

### Grid Position

Typical: `colSpan: 1, rowSpan: 4` (full-height left column)

> **Note:** The sidebar is typically provided by the template/theme and does not need to be manually placed in the component grid.

### Example

```json
{
  "id": "sidebar-main",
  "componentType": "sidebar",
  "props": {
    "title": "Navigation",
    "agentName": "BrandWatch AI",
    "appLogo": "logo-brandwatch",
    "memberCount": 12,
    "links": [
      { "label": "Dashboard", "icon": "home", "href": "/dashboard", "active": true },
      { "label": "Analytics", "icon": "bar-chart", "href": "/analytics" },
      { "label": "Content", "icon": "file-text", "href": "/content" },
      { "label": "Settings", "icon": "settings", "href": "/settings" }
    ]
  },
  "gridPosition": { "col": 1, "row": 1, "colSpan": 1, "rowSpan": 4 }
}
```

---

## dashboard-header

Top-level dashboard header bar. Typically auto-rendered by the template.

### Props

No configurable props — rendered from template context.

### Data Binding

Not bindable.

### Grid Position

Typical: `colSpan: 4, rowSpan: 1`

> **Note:** Auto-rendered by the template; manual placement is not required.

### Example

```json
{
  "id": "dashboard-header",
  "componentType": "dashboard-header",
  "props": {},
  "gridPosition": { "col": 1, "row": 1, "colSpan": 4, "rowSpan": 1 }
}
```

---

## header-actions

Header action bar (e.g. notification icons, user avatar). Typically auto-rendered.

### Props

No configurable props.

### Data Binding

Not bindable.

### Grid Position

Typical: `colSpan: 4, rowSpan: 1`

### Example

```json
{
  "id": "header-actions",
  "componentType": "header-actions",
  "props": {},
  "gridPosition": { "col": 1, "row": 1, "colSpan": 4, "rowSpan": 1 }
}
```

---

## filter-bar

Horizontal filter controls bar with dropdown filters.

### Props — `FilterBarProps`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `filters` | `Array<{ id: string; label: string; options: Array<string>; defaultValue?: string }>` | yes | Filter definitions |

### Data Binding

Bindable props: `filters`

### Grid Position

Typical: `colSpan: 4, rowSpan: 1`

### Example

```json
{
  "id": "filter-bar-main",
  "componentType": "filter-bar",
  "props": {
    "filters": [
      {
        "id": "time-range",
        "label": "Time Range",
        "options": ["Last 7 days", "Last 30 days", "Last 90 days", "All time"],
        "defaultValue": "Last 30 days"
      },
      {
        "id": "platform",
        "label": "Platform",
        "options": ["All Platforms", "ChatGPT", "Perplexity", "Gemini"],
        "defaultValue": "All Platforms"
      },
      {
        "id": "region",
        "label": "Region",
        "options": ["Global", "North America", "Europe", "APAC"],
        "defaultValue": "Global"
      }
    ]
  },
  "gridPosition": { "col": 1, "row": 2, "colSpan": 4, "rowSpan": 1 }
}
```
