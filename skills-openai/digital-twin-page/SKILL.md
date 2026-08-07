---
name: digital-twin-page
description: Author review-only Gabriel digital-twin page profile and conversational copy in assets/chat-config.json. Use when the user explicitly asks to update local titles, descriptions, imagery references, first messages, or system instructions. Does not publish, connect services, configure credentials, or run the twin.
---

# Digital Twin Page

Maintain the local display profile and safe conversational text for one digital
twin page.

## Public authoring boundary

- Work only in the repository explicitly selected by the user.
- Edit `assets/chat-config.json` only.
- Do not commit, push, synchronize, publish, or invoke the twin.
- Do not add or modify connectors, external tools, computers, inboxes, telephony, credentials, access tokens, or private user data.
- Do not place secrets or confidential source material in prompts.
- Do not edit embed appearance; that belongs in `assets/embed-config.json`.

## Supported fields

- `pageProfile.title`
- `pageProfile.description`
- `pageProfile.longDescription`
- `pageProfile.profilePicture`
- `pageProfile.bannerImage`
- `pageProfile.bannerType`
- `pageProfile.tags`
- `pageProfile.category`
- `pageProfile.subcategory`
- `publishedConfig.name`
- `publishedConfig.firstMessage`
- `publishedConfig.systemPrompt`

Preserve all other `publishedConfig` fields unchanged.

## Authoring process

1. Read the existing file and preserve `schemaVersion`, `pageId`, stable IDs, and unknown fields.
2. Change only the requested supported fields.
3. Ensure conversational instructions are clear, non-deceptive, and do not claim unavailable capabilities.
4. Keep image fields as existing references or user-supplied safe placeholders; do not fetch media.
5. Validate JSON syntax locally.
6. Report changed fields and note that publication remains a separate user-controlled action.

Minimal shape:

```json
{
  "schemaVersion": 1,
  "pageId": "page_example",
  "publishedConfig": {
    "name": "Assistant",
    "firstMessage": "How can I help?",
    "systemPrompt": "Answer using the material supplied by the user."
  },
  "pageProfile": {
    "title": "Assistant",
    "description": "A helpful digital twin",
    "tags": []
  },
  "updatedAt": 0
}
```
