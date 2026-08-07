---
name: digital-twin-embed
description: Author review-only Gabriel digital-twin embed appearance in assets/embed-config.json. Use when the user explicitly asks to change local hero copy, theme, backgrounds, informational sections, or widget styling. Does not publish, synchronize, track users, or perform external actions.
---

# Digital Twin Embed

Edit only the local appearance configuration for a Gabriel digital twin embed.

## Public authoring boundary

- Work only in the repository explicitly selected by the user.
- Edit `assets/embed-config.json` only.
- Do not edit assistant runtime settings in `assets/chat-config.json`.
- Do not commit, push, synchronize, publish, or preview through a live service.
- Do not add credentials, tracking code, remote scripts, personal data, or hidden external requests.
- Preserve all existing destination links unless the user explicitly supplies an authorized replacement.

## Authoring process

1. Read the existing embed config and preserve `schemaVersion` and `pageId`.
2. Keep appearance settings under `chatEmbedConfig`.
3. Apply only the requested copy, color, layout, background, and informational-section changes.
4. Preserve unknown fields and stable block IDs.
5. Validate JSON syntax locally.
6. Report the changed fields and note that publishing remains a separate user-controlled action in Gabriel Operator.

Minimal shape:

```json
{
  "schemaVersion": 1,
  "pageId": "page_example",
  "chatEmbedConfig": {
    "hero": {
      "headline": "How can I help?"
    },
    "theme": {
      "mode": "system"
    }
  }
}
```
