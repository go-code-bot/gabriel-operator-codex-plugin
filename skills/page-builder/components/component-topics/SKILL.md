---
name: component-topics
description: Topic tracking and platform analytics — topic-list, platform-performance.
metadata:
  category: page-builder
  subcategory: topics
  componentTypes:
    - topic-list
    - platform-performance
---

# Topic & Platform Analytics Components

Components for tracking topic coverage and platform-level performance metrics.

---

## topic-list

Categorised topic list with tracking actions. Topics are typed by strategic category.

### Props — `TopicListProps`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | yes | List heading |
| `subtitle` | `string` | no | Secondary heading |
| `type` | `'blind-spot' \| 'opportunity' \| 'strong'` | yes | Topic category type |
| `items` | `Array<{ id: string; title: string; description: string; tag?: string; brand?: string; competitors?: Array<string>; progress?: number }>` | yes | Topic items |

### Data Binding

Bindable props: `title`, `items`, `type`

### Events

Built-in "Start Tracking" action on individual topics.

### Grid Position

Typical: `colSpan: 2, rowSpan: 2`

### Example

```json
{
  "id": "topics-blind-spots",
  "componentType": "topic-list",
  "props": {
    "title": "Blind Spots",
    "subtitle": "Topics where competitors appear but you don't",
    "type": "blind-spot",
    "items": [
      {
        "id": "t1",
        "title": "AI-Powered Lead Scoring",
        "description": "Competitors are frequently cited in AI responses about lead scoring automation.",
        "tag": "High Priority",
        "competitors": ["CompetitorA", "CompetitorB"],
        "progress": 0
      },
      {
        "id": "t2",
        "title": "Marketing Attribution Models",
        "description": "Growing query volume with no brand presence in AI responses.",
        "tag": "Medium Priority",
        "competitors": ["CompetitorC"],
        "progress": 0
      }
    ]
  },
  "gridPosition": { "col": 1, "row": 1, "colSpan": 2, "rowSpan": 2 }
}
```

### Topic Type Variations

Use `type` to convey the strategic category:

- **`blind-spot`** — Topics where competitors appear but your brand does not. High urgency.
- **`opportunity`** — Topics with growing query volume where you can establish presence.
- **`strong`** — Topics where your brand already has strong visibility.

```json
{
  "id": "topics-opportunities",
  "componentType": "topic-list",
  "props": {
    "title": "Opportunities",
    "subtitle": "Emerging topics you can own",
    "type": "opportunity",
    "items": [
      {
        "id": "t3",
        "title": "Predictive Analytics for SMBs",
        "description": "Query volume up 40% this quarter with limited competition.",
        "tag": "Trending",
        "progress": 25
      }
    ]
  },
  "gridPosition": { "col": 3, "row": 1, "colSpan": 2, "rowSpan": 2 }
}
```

---

## platform-performance

Platform-level performance breakdown with tabs and metric bars.

### Props — `PlatformPerformanceProps`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | yes | Component heading |
| `subtitle` | `string` | no | Secondary heading |
| `mainValue` | `string` | yes | Primary metric value |
| `mainValueChange` | `string` | no | Change indicator |
| `tabs` | `Array<string>` | yes | Tab labels for view switching |
| `platforms` | `Array<{ name: string; icon: string; value: number; percentage: number }>` | yes | Platform breakdown |

### Data Binding

Bindable props: `title`, `mainValue`, `platforms`

### Events

Tab interaction for switching views.

### Grid Position

Typical: `colSpan: 2, rowSpan: 1`

### Example

```json
{
  "id": "platform-perf",
  "componentType": "platform-performance",
  "props": {
    "title": "Platform Performance",
    "subtitle": "AI mention distribution",
    "mainValue": "1,240",
    "mainValueChange": "+18%",
    "tabs": ["All Platforms", "Search", "Chat", "Assistants"],
    "platforms": [
      { "name": "ChatGPT", "icon": "openai", "value": 480, "percentage": 39 },
      { "name": "Perplexity", "icon": "perplexity", "value": 310, "percentage": 25 },
      { "name": "Gemini", "icon": "google", "value": 260, "percentage": 21 },
      { "name": "Claude", "icon": "anthropic", "value": 190, "percentage": 15 }
    ]
  },
  "gridPosition": { "col": 1, "row": 3, "colSpan": 2, "rowSpan": 1 }
}
```
