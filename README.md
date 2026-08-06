# Gabriel Operator Plugin

Skills-first plugin for authoring Gabriel Operator assets. Dual packaging:

- **Agent Plugins 1.0** — root [`plugin.json`](plugin.json) plus `skills/<name>/SKILL.md`
- **Codex** — [`.codex-plugin/plugin.json`](.codex-plugin/plugin.json) and [`.agents/plugins/marketplace.json`](.agents/plugins/marketplace.json)

## Included Skills

- `workflow-builder` for browser/API/agent workflow JSON, included as a submodule from `go-code-bot/go-workflow-builder-skills`.
- `team-agents` for Page Builder team-agent endpoint workflows, included as a submodule from `go-code-bot/team-agents`.
- `page-builder` for PageBuilderConfig apps, pages, components, data binding, and events. This is copied into the plugin until a dedicated page-builder skill repository exists.
- `pipeline-builder` for Git-backed pipeline state machines, included as a submodule from `go-code-bot/pipeline-builder`.
- `list-builder` for Git-backed personal data list schemas, included as a submodule from `go-code-bot/list-builder`.
- `digital-twin-page` for Git-backed public chat and digital twin page configuration, included as a submodule from `go-code-bot/go-digital-twin-page-skills`.
- `todo-builder` for Git-backed personal To-Do workspaces (`assets/todos.json`). Copied from the Gabriel Operator monorepo until a dedicated public skill repository exists.
- `application` for Applications (`app-config.json`, `mcp-app.html`, Applications tab UI). Copied from the monorepo until a dedicated skill repository exists.
- `digital-twin-embed` for embed appearance (`assets/embed-config.json`). Copied from the monorepo until a dedicated skill repository exists.
- `asset-library` for Git-backed generated asset and Remotion movie manifests. Copied from the monorepo until a dedicated skill repository exists.

`go-code-bot/go-task-orchestrator-skills` is not included because it is an older `team-agents` package and would duplicate the current `team-agents` skill name.

## Clone With Submodules

```bash
git clone --recurse-submodules https://github.com/go-code-bot/gabriel-operator-codex-plugin.git
```

For an existing clone:

```bash
git submodule update --init --recursive
```

## Agent Plugins

Clients that implement [Agent Plugins](https://agentplugins.org) discover this package from the repository root:

1. Load root `plugin.json` (`$schema` → Agent Plugins 1.0).
2. Discover skills from immediate children of `skills/` that contain `SKILL.md`.

This plugin ships skills only. It does not include a root `mcp.json`.

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

The marketplace entry points at the Git-backed plugin source in this repository. The plugin itself lives at the repository root. Codex-specific UI metadata stays under `.codex-plugin/`; the portable Agent Plugins manifest is root `plugin.json`.

## Notes

This plugin intentionally bundles skills only. It does not include MCP servers or app connectors yet.
