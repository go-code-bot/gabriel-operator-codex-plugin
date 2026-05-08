---
name: component-tables
description: Table components for data display — table, ranking-table, pages-table, queries-table, tracked-topics-table, clients-table.
metadata:
  category: page-builder
  subcategory: tables
  componentTypes:
    - table
    - ranking-table
    - pages-table
    - queries-table
    - tracked-topics-table
    - clients-table
---

# Table Components

Tabular data display components. Smaller tables use `colSpan: 2`; full-width data tables use `colSpan: 4`.

---

## table

General-purpose data table with configurable columns.

### Props — `TableProps`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | yes | Table heading |
| `columns` | `Array<{ key: string; header: string; align?: string }>` | yes | Column definitions |
| `rows` | `Array<Record<string, any>>` | yes | Row data |

### Data Binding

Bindable props: `title`, `headers`, `rows`

### Grid Position

Typical: `colSpan: 2, rowSpan: 1`

### Example

```json
{
  "id": "table-top-pages",
  "componentType": "table",
  "props": {
    "title": "Top Pages",
    "columns": [
      { "key": "page", "header": "Page" },
      { "key": "views", "header": "Views", "align": "right" },
      { "key": "bounce", "header": "Bounce Rate", "align": "right" }
    ],
    "rows": [
      { "page": "/home", "views": 12400, "bounce": "32%" },
      { "page": "/pricing", "views": 8200, "bounce": "28%" },
      { "page": "/blog", "views": 6100, "bounce": "45%" }
    ]
  },
  "gridPosition": { "col": 1, "row": 1, "colSpan": 2, "rowSpan": 1 }
}
```

---

## ranking-table

Ranked comparison table, commonly used for brand share-of-voice or competitive analysis.

### Props — `RankingTableProps`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | yes | Table heading |
| `subtitle` | `string` | no | Secondary heading |
| `mainValue` | `string` | no | Highlighted primary metric |
| `mainValueSubtext` | `string` | no | Text below mainValue |
| `columns` | `Array<{ key: string; header: string }>` | yes | Column definitions |
| `rows` | `Array<{ rank: number; brand: string; logo?: string; isYou?: boolean; sentiment?: number; share: number }>` | yes | Ranked row data |

### Data Binding

Bindable props: `title`, `rows`, `mainValue`

### Grid Position

Typical: `colSpan: 2, rowSpan: 1`

### Example

```json
{
  "id": "table-ranking-brands",
  "componentType": "ranking-table",
  "props": {
    "title": "Brand Rankings",
    "subtitle": "Share of Voice",
    "mainValue": "34%",
    "mainValueSubtext": "Your share",
    "columns": [
      { "key": "rank", "header": "#" },
      { "key": "brand", "header": "Brand" },
      { "key": "share", "header": "Share %" }
    ],
    "rows": [
      { "rank": 1, "brand": "Acme Corp", "isYou": true, "share": 34 },
      { "rank": 2, "brand": "Beta Inc", "share": 28 },
      { "rank": 3, "brand": "Gamma LLC", "share": 19 }
    ]
  },
  "gridPosition": { "col": 1, "row": 2, "colSpan": 2, "rowSpan": 1 }
}
```

---

## pages-table

Full-width page performance table with optional column widths.

### Props — `PagesTableProps`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | no | Table heading |
| `columns` | `Array<{ key: string; header: string; width?: string; align?: string }>` | yes | Column definitions |
| `rows` | `Array<Record<string, any>>` | yes | Row data |

### Data Binding

Bindable props: `columns`, `rows`

### Grid Position

Typical: `colSpan: 4, rowSpan: 2`

### Example

```json
{
  "id": "table-pages",
  "componentType": "pages-table",
  "props": {
    "title": "All Pages",
    "columns": [
      { "key": "url", "header": "URL", "width": "40%" },
      { "key": "clicks", "header": "Clicks", "align": "right" },
      { "key": "impressions", "header": "Impressions", "align": "right" },
      { "key": "ctr", "header": "CTR", "align": "right" }
    ],
    "rows": [
      { "url": "/home", "clicks": 5200, "impressions": 48000, "ctr": "10.8%" },
      { "url": "/features", "clicks": 3100, "impressions": 32000, "ctr": "9.7%" }
    ]
  },
  "gridPosition": { "col": 1, "row": 1, "colSpan": 4, "rowSpan": 2 }
}
```

---

## queries-table

Search queries table with optional pagination and mention toggle.

### Props — `QueriesTableProps`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | yes | Table heading |
| `subtitle` | `string` | no | Secondary heading |
| `showMentionsToggle` | `boolean` | no | Show/hide mentions toggle |
| `queryCount` | `number` | no | Total query count badge |
| `columns` | `Array<{ key: string; header: string; sortable?: boolean }>` | yes | Column definitions |
| `rows` | `Array<Record<string, any>>` | yes | Row data |
| `pagination` | `object` | no | Pagination config |

### Data Binding

Bindable props: `title`, `rows`, `queryCount`

### Grid Position

Typical: `colSpan: 4, rowSpan: 2`

### Example

```json
{
  "id": "table-queries",
  "componentType": "queries-table",
  "props": {
    "title": "Search Queries",
    "subtitle": "Top performing queries",
    "queryCount": 1240,
    "showMentionsToggle": true,
    "columns": [
      { "key": "query", "header": "Query", "sortable": true },
      { "key": "clicks", "header": "Clicks", "sortable": true },
      { "key": "impressions", "header": "Impressions", "sortable": true },
      { "key": "position", "header": "Avg. Position", "sortable": true }
    ],
    "rows": [
      { "query": "best crm software", "clicks": 320, "impressions": 8400, "position": 3.2 },
      { "query": "crm pricing", "clicks": 210, "impressions": 5600, "position": 4.1 }
    ]
  },
  "gridPosition": { "col": 1, "row": 1, "colSpan": 4, "rowSpan": 2 }
}
```

---

## tracked-topics-table

Topic tracking management table.

### Props — `TrackedTopicsTableProps`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | yes | Table heading |
| `subtitle` | `string` | no | Secondary heading |
| `topics` | `Array<{ id: string; rank: number; topic: string; seed: string; category: string; status: string; queryCount?: number }>` | yes | Topic rows |

### Data Binding

Bindable props: `title`, `topics`

### Grid Position

Typical: `colSpan: 4, rowSpan: 2`

### Example

```json
{
  "id": "table-tracked-topics",
  "componentType": "tracked-topics-table",
  "props": {
    "title": "Tracked Topics",
    "subtitle": "Monitoring 24 topics",
    "topics": [
      {
        "id": "t1",
        "rank": 1,
        "topic": "AI in Marketing",
        "seed": "artificial intelligence marketing",
        "category": "Technology",
        "status": "active",
        "queryCount": 48
      },
      {
        "id": "t2",
        "rank": 2,
        "topic": "SEO Best Practices",
        "seed": "seo optimization tips",
        "category": "Marketing",
        "status": "active",
        "queryCount": 32
      }
    ]
  },
  "gridPosition": { "col": 1, "row": 1, "colSpan": 4, "rowSpan": 2 }
}
```

---

## clients-table

Client listing table.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `clients` | `Array<object>` | yes | Client data objects |

### Data Binding

Bindable props: `clients`

### Grid Position

Typical: `colSpan: 4, rowSpan: 2`

### Example

```json
{
  "id": "table-clients",
  "componentType": "clients-table",
  "props": {
    "clients": [
      { "name": "Acme Corp", "plan": "Enterprise", "status": "active", "mrr": 4200 },
      { "name": "StartupXYZ", "plan": "Pro", "status": "active", "mrr": 1200 }
    ]
  },
  "gridPosition": { "col": 1, "row": 1, "colSpan": 4, "rowSpan": 2 }
}
```
