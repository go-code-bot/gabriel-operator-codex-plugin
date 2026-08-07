# OpenAI submission skills

This directory contains reduced, public-directory-safe skill bundles prepared
for OpenAI review. It does not replace the full multi-client skills in `../skills/`.

Upload a plugin ZIP built only from these `skills-openai/` bundles. Every skill
here is intentionally authoring-only:

- it writes and validates local draft files;
- it does not install packages or execute remote scripts;
- it does not deploy, run, schedule, commit, or push;
- it does not request or store credentials;
- it does not automate external accounts or perform external writes.

Included skills:

- `application`
- `asset-library`
- `digital-twin-embed`
- `digital-twin-page`
- `list-builder`
- `page-builder`
- `pipeline-builder`
- `team-agents`
- `todo-builder`
- `workflow-builder`

The full cross-platform packs remain available to other plugin clients from
`../skills/`.
