---
name: application
description: Author review-only Gabriel Operator Application files in a user-selected repository. Use when the user explicitly asks to create or update app-config.json, public/index.html, or mcp-app.html. Produces local drafts only and does not publish, deploy, connect to live data, or execute external actions.
---

# Application

Create or update the local files that define a Gabriel Operator Application.

## Public authoring boundary

- Work only in the repository explicitly selected by the user.
- Edit local draft files only. Do not commit, push, publish, deploy, or open a live connection.
- Do not add credentials, private data, remote scripts, tracking, authentication, network requests, or external write actions.
- Keep HTML self-contained. Do not load scripts or assets from unapproved external origins.
- Use sample data or non-sensitive placeholders for previews.

## Canonical files

- `app-config.json` — application identity and static embed configuration.
- `public/index.html` — full-page local application view.
- `mcp-app.html` — compact local result view.

## Authoring process

1. Read existing canonical files before editing.
2. Preserve stable IDs, schema versions, routes, and existing user-authored content.
3. Update only the files required by the request.
4. Keep generated HTML accessible, responsive, and free of inline confidential values.
5. Validate JSON syntax and inspect HTML structure locally.
6. Report changed files and identify any live data connection or deployment work that remains for the user to configure in Gabriel Operator.

## Minimal `app-config.json`

```json
{
  "schemaVersion": 1,
  "id": "app_example",
  "name": "Example Application",
  "version": "1.0.0",
  "embedConfig": {
    "type": "static_files",
    "publicDir": "public",
    "mcpApp": {
      "entrypoint": "mcp-app.html"
    }
  },
  "dataConnections": []
}
```

Do not invent connection IDs or add access credentials. When live data is
required, leave `dataConnections` unchanged and describe the required connection
in the handoff.
