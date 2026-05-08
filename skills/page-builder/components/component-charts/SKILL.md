---
name: component-charts
description: Chart and KPI card components for dashboards — kpi-card, line-chart, area-chart, bar-chart, donut-chart.
metadata:
  category: page-builder
  subcategory: charts
  componentTypes:
    - kpi-card
    - line-chart
    - area-chart
    - bar-chart
    - donut-chart
---

# Chart & KPI Components

Visual data components used in dashboards and analytics pages. Typically laid out as a row of KPI cards followed by wider chart panels.

## Common Layout Pattern

```
Row 1: 4 × kpi-card   (colSpan:1 each)
Row 2: 2 × chart       (colSpan:2 each)
```

---

## kpi-card

Single-stat card showing a metric value with optional trend indicator.

### Props — `KpiCardProps`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | yes | Metric label |
| `value` | `string \| number` | yes | Primary display value |
| `subtitle` | `string` | no | Supporting text below value |
| `icon` | `string` | no | Icon identifier |
| `trend` | `'up' \| 'down' \| 'neutral'` | no | Trend direction |
| `trendValue` | `string` | no | Trend magnitude (e.g. "+12%") |

### Data Binding

Bindable props: `title`, `value`, `subtitle`, `change`, `trend`, `icon`

### Grid Position

Typical: `colSpan: 1, rowSpan: 1` — place 4 across a row.

### Example

```json
{
  "id": "kpi-revenue",
  "componentType": "kpi-card",
  "props": {
    "title": "Total Revenue",
    "value": "$48,200",
    "subtitle": "vs last month",
    "icon": "dollar-sign",
    "trend": "up",
    "trendValue": "+12.5%"
  },
  "gridPosition": { "col": 1, "row": 1, "colSpan": 1, "rowSpan": 1 }
}
```

---

## line-chart

Multi-series line chart for trend visualisation.

### Props — `ChartProps`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | yes | Chart heading |
| `data` | `Array<Record<string, any>>` | yes | Data points |
| `xAxisKey` | `string` | no | Key used for the X axis |
| `yAxisKey` | `string` | no | Key used for the Y axis |
| `lines` | `Array<{ dataKey: string; color: string; name?: string }>` | no | Series definitions |

### Data Binding

Bindable props: `title`, `data`

### Grid Position

Typical: `colSpan: 2, rowSpan: 1`

### Example

```json
{
  "id": "chart-monthly-trend",
  "componentType": "line-chart",
  "props": {
    "title": "Monthly Trend",
    "data": [
      { "month": "Jan", "revenue": 4000, "users": 240 },
      { "month": "Feb", "revenue": 4500, "users": 280 },
      { "month": "Mar", "revenue": 5200, "users": 310 }
    ],
    "xAxisKey": "month",
    "lines": [
      { "dataKey": "revenue", "color": "#6366f1", "name": "Revenue" },
      { "dataKey": "users", "color": "#22c55e", "name": "Users" }
    ]
  },
  "gridPosition": { "col": 1, "row": 2, "colSpan": 2, "rowSpan": 1 }
}
```

---

## area-chart

Area chart — identical props to `line-chart` but renders filled areas beneath lines.

### Props — `ChartProps`

Same as [line-chart](#line-chart).

### Data Binding

Bindable props: `title`, `data`

### Grid Position

Typical: `colSpan: 2, rowSpan: 1`

### Example

```json
{
  "id": "chart-area-sessions",
  "componentType": "area-chart",
  "props": {
    "title": "Session Volume",
    "data": [
      { "date": "2025-01-01", "sessions": 1200 },
      { "date": "2025-01-02", "sessions": 1350 },
      { "date": "2025-01-03", "sessions": 1100 }
    ],
    "xAxisKey": "date",
    "lines": [
      { "dataKey": "sessions", "color": "#3b82f6", "name": "Sessions" }
    ]
  },
  "gridPosition": { "col": 3, "row": 2, "colSpan": 2, "rowSpan": 1 }
}
```

---

## bar-chart

Vertical bar chart — identical props to `line-chart`.

### Props — `ChartProps`

Same as [line-chart](#line-chart).

### Data Binding

Bindable props: `title`, `data`

### Grid Position

Typical: `colSpan: 2, rowSpan: 1`

### Example

```json
{
  "id": "chart-bar-sources",
  "componentType": "bar-chart",
  "props": {
    "title": "Traffic by Source",
    "data": [
      { "source": "Organic", "visits": 3400 },
      { "source": "Paid", "visits": 1800 },
      { "source": "Referral", "visits": 900 }
    ],
    "xAxisKey": "source",
    "lines": [
      { "dataKey": "visits", "color": "#f59e0b", "name": "Visits" }
    ]
  },
  "gridPosition": { "col": 1, "row": 3, "colSpan": 2, "rowSpan": 1 }
}
```

---

## donut-chart

Donut/ring chart with a centre label and optional detail table.

### Props — `DonutChartProps`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | yes | Chart heading |
| `subtitle` | `string` | no | Secondary heading |
| `centerValue` | `number` | yes | Numeric value shown in the centre |
| `centerLabel` | `string` | yes | Label below the centre value |
| `segments` | `Array<{ label: string; value: number; color: string; percentage: number }>` | yes | Ring segments |
| `tableRows` | `Array<{ domain: string; icon?: string; subtitle?: string; frequency: number; avgCitations: number; type: string; typeColor?: string }>` | no | Optional detail table rows |

### Data Binding

Bindable props: `title`, `centerValue`, `segments`, `tableRows`

### Grid Position

Typical: `colSpan: 2, rowSpan: 1`

### Example

```json
{
  "id": "chart-donut-traffic",
  "componentType": "donut-chart",
  "props": {
    "title": "Traffic Distribution",
    "centerValue": 12400,
    "centerLabel": "Total Visits",
    "segments": [
      { "label": "Direct", "value": 5200, "color": "#6366f1", "percentage": 42 },
      { "label": "Organic", "value": 4100, "color": "#22c55e", "percentage": 33 },
      { "label": "Referral", "value": 3100, "color": "#f59e0b", "percentage": 25 }
    ],
    "tableRows": [
      {
        "domain": "google.com",
        "subtitle": "Search Engine",
        "frequency": 4100,
        "avgCitations": 3.2,
        "type": "Organic",
        "typeColor": "#22c55e"
      }
    ]
  },
  "gridPosition": { "col": 3, "row": 3, "colSpan": 2, "rowSpan": 1 }
}
```
