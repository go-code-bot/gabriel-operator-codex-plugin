---
name: asset-library
description: Author and validate local Gabriel Operator asset-library and movie manifest drafts in a user-selected repository. Use when the user explicitly asks to organize existing asset references or edit movie timeline metadata. Does not fetch, upload, render, publish, or expose media.
---

# Asset Library

Maintain versioned JSON manifests for assets and movie projects without operating
on the underlying media.

## Public authoring boundary

- Work only in the repository explicitly selected by the user.
- Edit manifest JSON only. Do not fetch, upload, render, publish, commit, or push.
- Do not add raw media, credentials, signed URLs, private storage paths, or personal data.
- Use existing opaque asset IDs and safe placeholders; never invent access links.
- Keep IDs stable and preserve unknown fields.

## Canonical files

```text
assets/library-index.json
assets/generated-media/<assetId>/asset.json
movies/index.json
movies/projects/<movieProjectId>/project.json
movies/renders/<movieRenderId>/render.json
```

## Authoring process

1. Read the relevant manifest and referenced index before editing.
2. Preserve asset, project, scene, track, overlay, and render IDs.
3. Increment a movie project `revision` when modifying its timeline.
4. Keep scene timing in frames and retain the project frame-rate convention.
5. Reference only assets already present in the local manifests.
6. Validate JSON syntax and cross-reference IDs locally.
7. Report changed files and any missing asset reference that requires user action in Gabriel Operator.

Runtime media stays outside Git. The local manifests describe identity, metadata,
ordering, timing, and relationships only.
