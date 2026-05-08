---
name: page-structure
description: Define pages, navigation sections, routing, and grid layouts for Page Builder apps.
metadata:
  category: structural
  system: page-builder
  version: 1.0.0
  dependencies: []
---

# Page Structure

Define the navigation hierarchy, page definitions, routing, and grid layout system for Page Builder applications.

## Core Interfaces

### NavSection

The top-level grouping for pages. `navSections` is the source of truth for page organization.

```typescript
interface NavSection {
  id: string;
  title?: string;
  pages: PageDefinition[];
  isPaid?: boolean;
  routeType?: 'authenticated' | 'unauthenticated';
}
```

### PageDefinition

Each page within a section.

```typescript
interface PageDefinition {
  id: string;
  name: string;
  path: string;
  icon: string;            // Heroicon name: ChartBarIcon, Squares2X2Icon, etc.
  layoutId: string;        // Typically 'dashboard'
  templateId: string;      // Must match an entry in TEMPLATE_OPTIONS
  components: ComponentInstance[];
  routeType?: RouteType;   // Default: 'authenticated'
  linkedCollections?: Record<string, string>;
  hiddenSections?: string[];
  marksOnboardingComplete?: boolean;
}
```

### RouteType

```typescript
type RouteType = 'authenticated' | 'unauthenticated';
```

- `authenticated` -- pages shown after login (dashboard, settings, etc.)
- `unauthenticated` -- pages shown before login (landing, login, signup, onboarding)

### GridPosition

All components are placed on a 4-column grid. Columns and rows are 1-indexed.

```typescript
interface GridPosition {
  col: number;      // Starting column (1-4)
  row: number;      // Starting row (1+)
  colSpan: number;  // Number of columns to span
  rowSpan: number;  // Number of rows to span
}
```

### Layout

```typescript
interface Layout {
  id: string;
  name: string;
  description: string;
  gridConfig: {
    columns: number;  // Always 4
    rows: number;
    gap: number;      // Always 4
  };
}
```

The default layout is `"dashboard"` with 4 columns and a gap of 4:

```typescript
const DASHBOARD_LAYOUT: Layout = {
  id: 'dashboard',
  name: 'Dashboard Layout',
  description: 'Standard dashboard with KPIs, charts, and tables',
  gridConfig: { columns: 4, rows: 4, gap: 4 },
};
```

## Path Conventions

| Page type       | Path example          |
|-----------------|-----------------------|
| Main page       | `'/'`                 |
| Analytics       | `'/analytics'`        |
| Settings        | `'/settings'`         |
| Login           | `'/login'`            |
| Signup          | `'/signup'`           |
| Landing         | `'/landing'`          |
| Onboarding      | `'/onboarding'`       |

## Routing Control

Two fields on `PageBuilderConfig` control which page loads first:

- `defaultAuthenticatedPageId` -- the page ID shown after login
- `defaultUnauthenticatedPageId` -- the page ID shown before login (e.g., landing page)

## JSON Example

A complete `navSections` array with two sections:

```json
{
  "navSections": [
    {
      "id": "main-pages",
      "title": "Main",
      "routeType": "authenticated",
      "pages": [
        {
          "id": "page-dashboard",
          "name": "Dashboard",
          "path": "/",
          "icon": "Squares2X2Icon",
          "layoutId": "dashboard",
          "templateId": "dashboard",
          "components": [
            {
              "id": "kpi-1",
              "componentType": "kpi-card",
              "gridPosition": { "col": 1, "row": 1, "colSpan": 1, "rowSpan": 1 },
              "props": { "title": "Revenue", "value": "$12,400", "subtitle": "+8% this month" }
            },
            {
              "id": "chart-1",
              "componentType": "line-chart",
              "gridPosition": { "col": 1, "row": 2, "colSpan": 2, "rowSpan": 1 },
              "props": { "title": "Monthly Trend", "data": [] }
            }
          ]
        },
        {
          "id": "page-settings",
          "name": "Settings",
          "path": "/settings",
          "icon": "Cog6ToothIcon",
          "layoutId": "dashboard",
          "templateId": "account",
          "components": []
        }
      ]
    },
    {
      "id": "auth-pages",
      "title": "Auth",
      "routeType": "unauthenticated",
      "pages": [
        {
          "id": "page-login",
          "name": "Login",
          "path": "/login",
          "icon": "LockClosedIcon",
          "layoutId": "dashboard",
          "templateId": "login-page",
          "components": []
        },
        {
          "id": "page-signup",
          "name": "Sign Up",
          "path": "/signup",
          "icon": "UserPlusIcon",
          "layoutId": "dashboard",
          "templateId": "signup-page",
          "components": []
        }
      ]
    }
  ],
  "defaultAuthenticatedPageId": "page-dashboard",
  "defaultUnauthenticatedPageId": "page-login"
}
```

## Gotchas

1. **Paths must start with `/`** -- e.g., `"/settings"`, not `"settings"`.
2. **Every page needs at least one component** in production apps, though templates may provide default content.
3. **`layoutId` is typically `"dashboard"`** -- custom layouts are rare.
4. **`navSections` is the new source of truth** -- a flat `pages` array is kept on `PageBuilderConfig` for backward compatibility but should not be used for new apps.
5. **`templateId` must match a valid entry in `TEMPLATE_OPTIONS`** -- invalid template IDs will render blank pages.
6. **Grid is 4 columns, 1-indexed** -- `col: 1` is the leftmost column, `col: 4` is the rightmost. A full-width component uses `col: 1, colSpan: 4`.
7. **Icon names are Heroicon component names** -- e.g., `"ChartBarIcon"`, `"Squares2X2Icon"`, `"Cog6ToothIcon"`. Do not use kebab-case or lowercase.
