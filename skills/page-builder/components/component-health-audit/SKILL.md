---
name: component-health-audit
description: Site health and audit components — health-gauges, health-gauge, web-vitals, audit-issues, page-audit-header.
metadata:
  category: page-builder
  subcategory: health-audit
  componentTypes:
    - health-gauges
    - health-gauge
    - web-vitals
    - audit-issues
    - page-audit-header
---

# Health & Audit Components

Components for displaying site health scores, web performance metrics, and audit issue tracking.

---

## health-gauges

Row of multiple health gauge indicators.

### Props — `HealthGaugesProps`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | no | Section heading |
| `items` | `Array<{ label: string; value: number; color?: string; info?: string }>` | yes | Gauge items (value 0-100) |

### Data Binding

Bindable props: `items`

### Grid Position

Typical: `colSpan: 4, rowSpan: 1`

### Example

```json
{
  "id": "health-gauges-overview",
  "componentType": "health-gauges",
  "props": {
    "title": "Site Health Overview",
    "items": [
      { "label": "Performance", "value": 92, "color": "#22c55e", "info": "Excellent" },
      { "label": "Accessibility", "value": 85, "color": "#22c55e", "info": "Good" },
      { "label": "Best Practices", "value": 78, "color": "#f59e0b", "info": "Needs work" },
      { "label": "SEO", "value": 95, "color": "#22c55e", "info": "Excellent" }
    ]
  },
  "gridPosition": { "col": 1, "row": 1, "colSpan": 4, "rowSpan": 1 }
}
```

---

## health-gauge

Single circular health score gauge.

### Props — `HealthGaugeProps`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `label` | `string` | yes | Gauge label |
| `value` | `number` | yes | Score (0-100) |
| `color` | `string` | no | Gauge color |
| `info` | `string` | no | Supplementary info text |

### Data Binding

Bindable props: `value`, `label`, `info`

### Grid Position

Typical: `colSpan: 1, rowSpan: 1`

### Example

```json
{
  "id": "gauge-performance",
  "componentType": "health-gauge",
  "props": {
    "label": "Performance",
    "value": 92,
    "color": "#22c55e",
    "info": "Score improved +4 from last audit"
  },
  "gridPosition": { "col": 1, "row": 1, "colSpan": 1, "rowSpan": 1 }
}
```

---

## web-vitals

Core Web Vitals metrics display.

### Props — `WebVitalsProps`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | yes | Section heading |
| `metrics` | `Array<{ label: string; value: string; status: 'good' \| 'needs-improvement' \| 'poor' }>` | yes | Vital metrics |

### Data Binding

Bindable props: `metrics`

### Grid Position

Typical: `colSpan: 2, rowSpan: 1`

### Example

```json
{
  "id": "web-vitals-main",
  "componentType": "web-vitals",
  "props": {
    "title": "Core Web Vitals",
    "metrics": [
      { "label": "LCP", "value": "1.8s", "status": "good" },
      { "label": "INP", "value": "120ms", "status": "good" },
      { "label": "CLS", "value": "0.08", "status": "needs-improvement" },
      { "label": "FCP", "value": "1.2s", "status": "good" },
      { "label": "TTFB", "value": "0.6s", "status": "good" }
    ]
  },
  "gridPosition": { "col": 1, "row": 2, "colSpan": 2, "rowSpan": 1 }
}
```

---

## audit-issues

Audit issue tracker with severity and status.

### Props — `AuditIssuesProps`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | yes | Section heading |
| `totalIssues` | `number` | yes | Total issue count |
| `issues` | `Array<{ id: string; title: string; description?: string; severity: 'Critical' \| 'High' \| 'Medium' \| 'Low'; tags?: Array<string>; status: 'open' \| 'fixed' }>` | yes | Issue list |

### Data Binding

Bindable props: `issues`

### Grid Position

Typical: `colSpan: 4, rowSpan: 2`

### Example

```json
{
  "id": "audit-issues-list",
  "componentType": "audit-issues",
  "props": {
    "title": "Audit Issues",
    "totalIssues": 12,
    "issues": [
      {
        "id": "issue-1",
        "title": "Missing meta descriptions on 8 pages",
        "description": "Pages without meta descriptions may show poor snippets in search results.",
        "severity": "High",
        "tags": ["SEO", "Meta"],
        "status": "open"
      },
      {
        "id": "issue-2",
        "title": "Images without alt text",
        "description": "14 images are missing alt attributes, impacting accessibility and image search.",
        "severity": "Medium",
        "tags": ["Accessibility", "Images"],
        "status": "open"
      },
      {
        "id": "issue-3",
        "title": "Render-blocking JavaScript",
        "description": "3 scripts are blocking initial page render.",
        "severity": "Critical",
        "tags": ["Performance"],
        "status": "fixed"
      }
    ]
  },
  "gridPosition": { "col": 1, "row": 3, "colSpan": 4, "rowSpan": 2 }
}
```

---

## page-audit-header

Audit page header with URL, thumbnail, and score overview.

### Props — `PageAuditHeaderProps`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | yes | Page title |
| `url` | `string` | yes | Page URL |
| `lastAudit` | `string` | yes | Last audit timestamp |
| `thumbnail` | `string` | no | Page screenshot URL |
| `scores` | `Array<{ label: string; value: number; color?: string }>` | yes | Score summary |

### Data Binding

Bindable props: `title`, `url`, `scores`

### Grid Position

Typical: `colSpan: 4, rowSpan: 1`

### Example

```json
{
  "id": "page-audit-header",
  "componentType": "page-audit-header",
  "props": {
    "title": "Homepage Audit",
    "url": "https://acme.com",
    "lastAudit": "2025-03-10T14:30:00Z",
    "thumbnail": "https://screenshots.example.com/acme-home.png",
    "scores": [
      { "label": "Performance", "value": 92, "color": "#22c55e" },
      { "label": "SEO", "value": 95, "color": "#22c55e" },
      { "label": "Accessibility", "value": 85, "color": "#22c55e" },
      { "label": "Best Practices", "value": 78, "color": "#f59e0b" }
    ]
  },
  "gridPosition": { "col": 1, "row": 1, "colSpan": 4, "rowSpan": 1 }
}
```
