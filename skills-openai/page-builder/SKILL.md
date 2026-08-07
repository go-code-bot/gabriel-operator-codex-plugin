---
name: page-builder
description: Author review-only Gabriel PageBuilderConfig JSON for local page layout, navigation, static components, and theme settings. Use when the user explicitly asks to create or revise a local web, mobile, or landing-page configuration. Does not deploy apps, connect services, or operate live endpoints.
---

# Page Builder

Create or update a local `PageBuilderConfig` draft for human review.

## Public authoring boundary

- Work only in the repository and config file explicitly selected by the user.
- Edit local JSON only. Do not deploy, publish, commit, push, or call application endpoints.
- Do not add authentication, billing, analytics, tracking, credentials, external connectors, remote scripts, or live data writes.
- Use static sample content and empty collection/endpoint arrays unless the existing config already contains authorized references.
- Preserve unknown fields and existing stable IDs.

## Supported authoring scope

- `appType`
- `appName`
- `pages`
- `navSections`
- static component props
- `theme`
- `pageTheme`
- `colorMode`

Preserve `collections`, `endpoints`, `connectors`, authentication, billing,
monitoring, and model settings unchanged.

## Authoring process

1. Read the existing config and identify its current schema and component conventions.
2. Plan the requested pages, routes, navigation, static components, and theme.
3. Reuse stable page, section, and component IDs.
4. Keep component props serializable and avoid embedding private data.
5. Validate JSON syntax, unique IDs, routes, and navigation targets locally.
6. Report changed files and list any live integration work that must be reviewed separately in Gabriel Operator.

Minimal shape:

```json
{
  "appType": "web-app",
  "appName": "Example App",
  "colorMode": "system",
  "pages": [
    {
      "id": "home",
      "path": "/",
      "title": "Home",
      "components": []
    }
  ],
  "navSections": [],
  "collections": [],
  "endpoints": [],
  "connectors": []
}
```
