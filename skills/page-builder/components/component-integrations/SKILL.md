---
name: component-integrations
description: Integration and connection components — connect-integration, connect-banner, connections-manager, account-info-form.
metadata:
  category: page-builder
  subcategory: integrations
  componentTypes:
    - connect-integration
    - connect-banner
    - connections-manager
    - account-info-form
---

# Integration & Connection Components

Components for connecting external services, managing data sources, and configuring account settings.

---

## connect-integration

Single integration connection card with action button.

### Props — `ConnectIntegrationProps`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | yes | Integration name |
| `description` | `string` | yes | Integration description |
| `buttonText` | `string` | yes | Action button label |
| `icon` | `string` | no | Integration icon |
| `integrationType` | `string` | no | Integration type identifier |

### Data Binding

Bindable props: `title`, `description`, `buttonText`, `integrationType`

### Events

`onClick` — triggered on the action button.

### Grid Position

Typical: `colSpan: 2, rowSpan: 1`

### Example

```json
{
  "id": "connect-gsc",
  "componentType": "connect-integration",
  "props": {
    "title": "Google Search Console",
    "description": "Import search performance data, crawl stats, and indexing status.",
    "buttonText": "Connect GSC",
    "icon": "google",
    "integrationType": "google-search-console"
  },
  "gridPosition": { "col": 1, "row": 1, "colSpan": 2, "rowSpan": 1 }
}
```

---

## connect-banner

Full-width integration prompt banner.

### Props — `ConnectBannerProps`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | yes | Banner heading |
| `description` | `string` | yes | Banner description |
| `actionLabel` | `string` | yes | Action button text |
| `icon` | `string` | no | Banner icon |

### Data Binding

Bindable props: `title`, `description`, `actionLabel`

### Grid Position

Typical: `colSpan: 4, rowSpan: 1`

### Example

```json
{
  "id": "banner-connect-analytics",
  "componentType": "connect-banner",
  "props": {
    "title": "Connect Your Analytics",
    "description": "Link your Google Analytics account to unlock traffic insights and conversion tracking.",
    "actionLabel": "Connect Now",
    "icon": "bar-chart"
  },
  "gridPosition": { "col": 1, "row": 1, "colSpan": 4, "rowSpan": 1 }
}
```

---

## connections-manager

Multi-connection management panel for traffic sources and destinations.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `trafficSource` | `object` | no | Primary traffic source configuration |
| `destinations` | `Array<object>` | no | Connected destination services |

### Data Binding

Bindable props: `trafficSource`, `destinations`

### Grid Position

Typical: `colSpan: 4, rowSpan: 2`

### Example

```json
{
  "id": "connections-mgr",
  "componentType": "connections-manager",
  "props": {
    "trafficSource": {
      "name": "Google Search Console",
      "status": "connected",
      "lastSync": "2025-03-10T08:00:00Z"
    },
    "destinations": [
      { "name": "Google Analytics", "status": "connected", "type": "analytics" },
      { "name": "Slack", "status": "connected", "type": "notification" },
      { "name": "HubSpot", "status": "disconnected", "type": "crm" }
    ]
  },
  "gridPosition": { "col": 1, "row": 2, "colSpan": 4, "rowSpan": 2 }
}
```

---

## account-info-form

Account details and business information form.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `businessName` | `string` | no | Business name |
| `photo` | `string` | no | Profile photo URL |
| `address` | `object` | no | Business address object |

### Data Binding

Bindable props: `businessName`, `photo`, `address`

### Grid Position

Typical: `colSpan: 2, rowSpan: 2`

### Example

```json
{
  "id": "account-info",
  "componentType": "account-info-form",
  "props": {
    "businessName": "Acme Corp",
    "photo": "https://example.com/logo.png",
    "address": {
      "street": "123 Market Street",
      "city": "San Francisco",
      "state": "CA",
      "zip": "94105",
      "country": "US"
    }
  },
  "gridPosition": { "col": 1, "row": 1, "colSpan": 2, "rowSpan": 2 }
}
```
