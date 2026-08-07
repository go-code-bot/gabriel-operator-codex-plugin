# OpenAI submission skills

This directory contains the reduced, public-directory-safe skill bundles prepared
for OpenAI review. It does not replace the full multi-client skills in `../skills/`.

Upload `workflow-builder/` as the replacement bundle for the rejected
`workflow-builder` skill. The OpenAI bundle is intentionally authoring-only:

- it writes and validates local `assets/workflow.json` drafts;
- it does not install packages or execute remote scripts;
- it does not deploy or run workflows;
- it does not request or store credentials;
- it does not automate external accounts or perform external writes.

The full workflow-builder remains available to other plugin clients from
`../skills/workflow-builder/`.
