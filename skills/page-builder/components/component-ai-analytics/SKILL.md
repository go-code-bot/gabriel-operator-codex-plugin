---
name: component-ai-analytics
description: AI analytics and brand monitoring components — ai-mentions, header-summary, header-chart, insights-list, actions-list, brand-profile, competitors-manager, entity-mapper, writing-style-guide, knowledge-sources, sentiment-bar, share-of-voice-chart, metric-bars, response-history, status-tags.
metadata:
  category: page-builder
  subcategory: ai-analytics
  componentTypes:
    - ai-mentions
    - header-summary
    - header-chart
    - insights-list
    - actions-list
    - brand-profile
    - competitors-manager
    - entity-mapper
    - writing-style-guide
    - knowledge-sources
    - sentiment-bar
    - share-of-voice-chart
    - metric-bars
    - response-history
    - status-tags
---

# AI Analytics & Brand Monitoring Components

Components for AI-powered analytics dashboards, brand monitoring, competitive intelligence, and content strategy.

---

## ai-mentions

Platform-level AI mention tracking with optional trend chart.

### Props — `AiMentionsProps`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | yes | Component heading |
| `subtitle` | `string` | no | Secondary heading |
| `timePeriod` | `string` | no | Time range label |
| `platforms` | `Array<{ name: string; icon?: string; iconColor?: string; mentions: number; change?: number; changeType?: string }>` | yes | Platform breakdown |
| `chartData` | `Array<{ date: string; [key: string]: any }>` | no | Trend chart data |

### Data Binding

Bindable props: `title`, `subtitle`, `platforms`, `chartData`

### Grid Position

Typical: `colSpan: 2, rowSpan: 1`

### Example

```json
{
  "id": "ai-mentions-overview",
  "componentType": "ai-mentions",
  "props": {
    "title": "AI Mentions",
    "subtitle": "Across platforms",
    "timePeriod": "Last 30 days",
    "platforms": [
      { "name": "ChatGPT", "icon": "openai", "mentions": 245, "change": 12, "changeType": "increase" },
      { "name": "Perplexity", "icon": "perplexity", "mentions": 128, "change": -3, "changeType": "decrease" }
    ],
    "chartData": [
      { "date": "2025-02-01", "chatgpt": 40, "perplexity": 22 },
      { "date": "2025-02-08", "chatgpt": 55, "perplexity": 30 }
    ]
  },
  "gridPosition": { "col": 1, "row": 1, "colSpan": 2, "rowSpan": 1 }
}
```

---

## header-summary

Section header with title and description text.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | yes | Heading text |
| `description` | `string` | no | Summary paragraph |

### Data Binding

Bindable props: `title`, `description`

### Grid Position

Typical: `colSpan: 2, rowSpan: 1`

### Example

```json
{
  "id": "header-summary-main",
  "componentType": "header-summary",
  "props": {
    "title": "Brand Health Overview",
    "description": "Your brand was mentioned 1,240 times across AI platforms this month, up 18% from last month."
  },
  "gridPosition": { "col": 1, "row": 1, "colSpan": 2, "rowSpan": 1 }
}
```

---

## header-chart

Compact circular chart header showing a single metric.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `centerValue` | `string` | yes | Primary display value |
| `progress` | `number` | no | Progress percentage (0-100) |

### Data Binding

Bindable props: `centerValue`, `progress`

### Grid Position

Typical: `colSpan: 1, rowSpan: 1`

### Example

```json
{
  "id": "header-chart-score",
  "componentType": "header-chart",
  "props": {
    "centerValue": "82%",
    "progress": 82
  },
  "gridPosition": { "col": 3, "row": 1, "colSpan": 1, "rowSpan": 1 }
}
```

---

## insights-list

Actionable insights with optional highlight and action buttons.

### Props — `InsightsListProps`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | yes | List heading |
| `subtitle` | `string` | no | Secondary heading |
| `items` | `Array<{ id: string; text: string; highlight?: string; actionLabel?: string; actionIcon?: string }>` | yes | Insight items |

### Data Binding

Bindable props: `title`, `subtitle`, `items`

### Grid Position

Typical: `colSpan: 2, rowSpan: 1`

### Example

```json
{
  "id": "insights-weekly",
  "componentType": "insights-list",
  "props": {
    "title": "Weekly Insights",
    "subtitle": "AI-generated recommendations",
    "items": [
      { "id": "i1", "text": "Your brand is underrepresented in ChatGPT responses about CRM software.", "highlight": "CRM software", "actionLabel": "View Details" },
      { "id": "i2", "text": "Competitor mentions increased 25% in the Enterprise segment.", "actionLabel": "Analyze" }
    ]
  },
  "gridPosition": { "col": 1, "row": 2, "colSpan": 2, "rowSpan": 1 }
}
```

---

## actions-list

Recommended actions list with type categorisation.

### Props — `ActionsListProps`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | yes | List heading |
| `subtitle` | `string` | no | Secondary heading |
| `items` | `Array<{ id: string; text: string; subtext?: string; highlight?: string; actionLabel?: string; actionIcon?: string; type?: string }>` | yes | Action items |

### Data Binding

Bindable props: `title`, `subtitle`, `items`

### Grid Position

Typical: `colSpan: 2, rowSpan: 1`

### Example

```json
{
  "id": "actions-recommended",
  "componentType": "actions-list",
  "props": {
    "title": "Recommended Actions",
    "subtitle": "Prioritised by impact",
    "items": [
      { "id": "a1", "text": "Create FAQ content for top 5 unanswered queries", "subtext": "Est. impact: +15% visibility", "type": "content", "actionLabel": "Start" },
      { "id": "a2", "text": "Update product schema markup", "type": "technical", "actionLabel": "View Guide" }
    ]
  },
  "gridPosition": { "col": 3, "row": 2, "colSpan": 2, "rowSpan": 1 }
}
```

---

## brand-profile

Brand identity and context summary card.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `location` | `string` | yes | Brand location / HQ |
| `reach` | `Array<string>` | no | Target markets |
| `language` | `string` | no | Primary language |
| `context` | `string` | yes | Brand description / context |

### Data Binding

Bindable props: `location`, `reach`, `language`, `context`

### Grid Position

Typical: `colSpan: 2, rowSpan: 1`

### Example

```json
{
  "id": "brand-profile-main",
  "componentType": "brand-profile",
  "props": {
    "location": "San Francisco, CA",
    "reach": ["North America", "Europe", "APAC"],
    "language": "English",
    "context": "Enterprise SaaS platform for marketing automation and AI-powered analytics."
  },
  "gridPosition": { "col": 1, "row": 1, "colSpan": 2, "rowSpan": 1 }
}
```

---

## competitors-manager

Competitor list management card.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `competitors` | `Array<object>` | yes | Competitor entries |

### Data Binding

Bindable props: `competitors`

### Grid Position

Typical: `colSpan: 2, rowSpan: 1`

### Example

```json
{
  "id": "competitors-mgr",
  "componentType": "competitors-manager",
  "props": {
    "competitors": [
      { "name": "CompetitorA", "domain": "competitora.com", "tracked": true },
      { "name": "CompetitorB", "domain": "competitorb.com", "tracked": true }
    ]
  },
  "gridPosition": { "col": 3, "row": 1, "colSpan": 2, "rowSpan": 1 }
}
```

---

## entity-mapper

Entity relationship mapping card.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `entities` | `Array<object>` | yes | Entity definitions |

### Data Binding

Bindable props: `entities`

### Grid Position

Typical: `colSpan: 2, rowSpan: 1`

### Example

```json
{
  "id": "entity-map",
  "componentType": "entity-mapper",
  "props": {
    "entities": [
      { "name": "Acme Corp", "type": "Organization", "relations": ["CRM", "Marketing Automation"] },
      { "name": "CRM", "type": "Product Category", "relations": ["Salesforce", "HubSpot"] }
    ]
  },
  "gridPosition": { "col": 1, "row": 3, "colSpan": 2, "rowSpan": 1 }
}
```

---

## writing-style-guide

Brand writing style configuration card.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `style` | `string` | yes | Writing style description |
| `instructions` | `Array<string>` | no | Specific writing instructions |

### Data Binding

Bindable props: `style`, `instructions`

### Grid Position

Typical: `colSpan: 2, rowSpan: 1`

### Example

```json
{
  "id": "writing-style",
  "componentType": "writing-style-guide",
  "props": {
    "style": "Professional, concise, and data-driven",
    "instructions": [
      "Use active voice",
      "Include statistics when available",
      "Avoid jargon — explain technical terms"
    ]
  },
  "gridPosition": { "col": 3, "row": 3, "colSpan": 2, "rowSpan": 1 }
}
```

---

## knowledge-sources

Knowledge base / file source management card.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `stats` | `object` | no | Summary statistics |
| `files` | `Array<object>` | no | Uploaded file references |

### Data Binding

Bindable props: `stats`, `files`

### Grid Position

Typical: `colSpan: 2, rowSpan: 1`

### Example

```json
{
  "id": "knowledge-src",
  "componentType": "knowledge-sources",
  "props": {
    "stats": { "totalFiles": 24, "totalSize": "128 MB", "lastUpdated": "2025-03-01" },
    "files": [
      { "name": "brand-guidelines.pdf", "size": "4.2 MB", "type": "pdf" },
      { "name": "product-catalog.csv", "size": "1.8 MB", "type": "csv" }
    ]
  },
  "gridPosition": { "col": 1, "row": 4, "colSpan": 2, "rowSpan": 1 }
}
```

---

## sentiment-bar

Horizontal segmented bar showing sentiment distribution.

### Props — `SentimentBarProps`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | yes | Component heading |
| `subtitle` | `string` | no | Secondary heading |
| `totalMentions` | `number` | yes | Total mention count |
| `segments` | `Array<{ label: string; value: number; color: string }>` | yes | Sentiment segments |

### Data Binding

Bindable props: `title`, `totalMentions`, `segments`

### Grid Position

Typical: `colSpan: 2, rowSpan: 1`

### Example

```json
{
  "id": "sentiment-overview",
  "componentType": "sentiment-bar",
  "props": {
    "title": "Sentiment Analysis",
    "subtitle": "AI platform mentions",
    "totalMentions": 1240,
    "segments": [
      { "label": "Positive", "value": 680, "color": "#22c55e" },
      { "label": "Neutral", "value": 420, "color": "#94a3b8" },
      { "label": "Negative", "value": 140, "color": "#ef4444" }
    ]
  },
  "gridPosition": { "col": 1, "row": 2, "colSpan": 2, "rowSpan": 1 }
}
```

---

## share-of-voice-chart

Brand share-of-voice comparison chart.

### Props — `ShareOfVoiceChartProps`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | yes | Chart heading |
| `subtitle` | `string` | no | Secondary heading |
| `mainValue` | `string` | yes | Your brand's share value |
| `mainValueChange` | `string` | no | Change indicator |
| `brands` | `Array<{ name: string; logo?: string; value: number; color: string }>` | yes | Brand breakdown |

### Data Binding

Bindable props: `title`, `mainValue`, `brands`

### Grid Position

Typical: `colSpan: 2, rowSpan: 1`

### Example

```json
{
  "id": "sov-chart",
  "componentType": "share-of-voice-chart",
  "props": {
    "title": "Share of Voice",
    "subtitle": "AI Search Platforms",
    "mainValue": "34%",
    "mainValueChange": "+5%",
    "brands": [
      { "name": "Your Brand", "value": 34, "color": "#6366f1" },
      { "name": "Competitor A", "value": 28, "color": "#f59e0b" },
      { "name": "Competitor B", "value": 22, "color": "#22c55e" },
      { "name": "Others", "value": 16, "color": "#94a3b8" }
    ]
  },
  "gridPosition": { "col": 3, "row": 2, "colSpan": 2, "rowSpan": 1 }
}
```

---

## metric-bars

Compact vertical metric bars.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | yes | Component heading |
| `values` | `Array<number>` | yes | Metric values |

### Data Binding

Bindable props: `title`, `values`

### Grid Position

Typical: `colSpan: 1, rowSpan: 1`

### Example

```json
{
  "id": "metric-bars-weekly",
  "componentType": "metric-bars",
  "props": {
    "title": "Weekly Activity",
    "values": [45, 62, 38, 71, 55, 80, 67]
  },
  "gridPosition": { "col": 4, "row": 1, "colSpan": 1, "rowSpan": 1 }
}
```

---

## response-history

AI response content viewer.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | yes | Component heading |
| `subtitle` | `string` | no | Secondary heading |
| `responseContent` | `string` | yes | Full response text |

### Data Binding

Bindable props: `title`, `subtitle`, `responseContent`

### Grid Position

Typical: `colSpan: 2, rowSpan: 2`

### Example

```json
{
  "id": "response-history-latest",
  "componentType": "response-history",
  "props": {
    "title": "Latest AI Response",
    "subtitle": "ChatGPT — March 5, 2025",
    "responseContent": "When comparing CRM platforms for mid-market companies, Acme CRM stands out for its AI-powered lead scoring and automated workflow capabilities..."
  },
  "gridPosition": { "col": 1, "row": 3, "colSpan": 2, "rowSpan": 2 }
}
```

---

## status-tags

Compact status tag cluster.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `tags` | `Array<object>` | yes | Tag objects |

### Data Binding

Bindable props: `tags`

### Grid Position

Typical: `colSpan: 1, rowSpan: 1`

### Example

```json
{
  "id": "status-tags-brand",
  "componentType": "status-tags",
  "props": {
    "tags": [
      { "label": "Indexed", "color": "#22c55e" },
      { "label": "Verified", "color": "#3b82f6" },
      { "label": "Monitoring", "color": "#f59e0b" }
    ]
  },
  "gridPosition": { "col": 4, "row": 3, "colSpan": 1, "rowSpan": 1 }
}
```
