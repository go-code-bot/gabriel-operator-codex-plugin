# Gabriel Operator Codex Plugin

Skills-first Codex plugin for authoring Gabriel Operator assets.

## Included Skills

- `workflow-builder` for browser/API/agent workflow JSON, included as a submodule from `go-code-bot/go-workflow-builder-skills`.
- `team-agents` for Page Builder team-agent endpoint workflows, included as a submodule from `go-code-bot/team-agents`.
- `page-builder` for PageBuilderConfig apps, pages, components, data binding, and events. This is copied into the plugin until a dedicated page-builder skill repository exists.
- `pipeline-builder` for Git-backed pipeline state machines, included as a submodule from `go-code-bot/pipeline-builder`.
- `list-builder` for Git-backed personal data list schemas, included as a submodule from `go-code-bot/list-builder`.
- `digital-twin-page` for Git-backed public chat and digital twin page configuration, included as a submodule from `go-code-bot/go-digital-twin-page-skills`.

`go-code-bot/go-task-orchestrator-skills` is not included because it is an older `team-agents` package and would duplicate the current `team-agents` skill name.

## Clone With Submodules

```bash
git clone --recurse-submodules https://github.com/go-code-bot/gabriel-operator-codex-plugin.git
```

For an existing clone:

```bash
git submodule update --init --recursive
```

## Install In Codex

This repository includes a Codex marketplace file at:

```text
.agents/plugins/marketplace.json
```

Add the marketplace in Codex CLI:

```bash
codex plugin marketplace add go-code-bot/gabriel-operator-codex-plugin --sparse .agents/plugins
```

Then open the Codex plugin directory, choose the `Gabriel Operator` marketplace, and install the plugin.

The marketplace entry points at the Git-backed plugin source in this repository. The plugin itself lives at the repository root.

## Notes

This v1 plugin intentionally bundles skills only. It does not include MCP servers or app connectors yet.
