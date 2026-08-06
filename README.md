# Gabriel Operator Plugin

Skills-first plugin for authoring Gabriel Operator assets. One repo, multiple client manifests:

| Standard / client | Location |
| --- | --- |
| **Agent Plugins 1.0** | root [`plugin.json`](plugin.json) + `skills/` |
| **Codex / ChatGPT** | [`.codex-plugin/`](.codex-plugin/) + [`.agents/plugins/marketplace.json`](.agents/plugins/marketplace.json) |
| **Cursor** | [`.cursor-plugin/`](.cursor-plugin/) |
| **Claude Code** | [`.claude-plugin/`](.claude-plugin/) |
| **Grok Build** | [`.grok-plugin/`](.grok-plugin/) |

Antigravity, Hermes, OpenClaw, Copilot, and peers consume the same `skills/<name>/SKILL.md` tree (Agent Skills / Agent Plugins layout).

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
git clone --recurse-submodules https://github.com/Gabriel-Operator/gabriel-operator-coding-agent-plugin.git
```

For an existing clone:

```bash
git submodule update --init --recursive
```

## Install

### Short skills alias (marketing / CLI)

```bash
npx skills add Gabriel-Operator/gabriel-workflow-builder
npx github:Gabriel-Operator/gabriel-cli scaffold persona
```

### Codex / ChatGPT

```bash
codex plugin marketplace add Gabriel-Operator/gabriel-operator-coding-agent-plugin --sparse .agents/plugins
```

Then install **Gabriel Operator** from that marketplace. Public directory: submit via [platform.openai.com/plugins](https://platform.openai.com/plugins) (Skills only).

### Cursor

Local test:

```bash
ln -s "$(pwd)" ~/.cursor/plugins/local/gabriel-operator
```

Official listing: [cursor.com/marketplace/publish](https://cursor.com/marketplace/publish). Team marketplace: Dashboard → Plugins → Import from Repo.

### Claude Code

```text
/plugin marketplace add Gabriel-Operator/gabriel-operator-coding-agent-plugin
/plugin install gabriel-operator@gabriel-operator
```

Or:

```bash
npx skills add Gabriel-Operator/gabriel-workflow-builder
# or the full plugin:
npx skills add Gabriel-Operator/gabriel-operator-coding-agent-plugin
```

### Grok Build

```bash
grok plugin marketplace add Gabriel-Operator/gabriel-operator-coding-agent-plugin
grok plugin install gabriel-operator --trust
```

Official xAI catalog: open a PR against [xai-org/plugin-marketplace](https://github.com/xai-org/plugin-marketplace) with a SHA-pinned remote source (see repo docs).

### Antigravity

Copy or link `skills/*` into:

- Project: `.agents/skills/`
- Global: `~/.agents/skills/` or `~/.gemini/config/skills/` (CLI paths may differ)

There is no separate Antigravity public plugin submission portal for third-party catalogs.

### Agent Plugins clients (VS Code, Copilot, Kiro, …)

Clients that implement [Agent Plugins](https://agentplugins.org) load root `plugin.json` and discover `skills/*/SKILL.md`.

## Notes

This plugin intentionally bundles skills only. It does not include MCP servers or app connectors yet.

Short skills alias: [`Gabriel-Operator/gabriel-workflow-builder`](https://github.com/Gabriel-Operator/gabriel-workflow-builder). CLI: [`Gabriel-Operator/gabriel-cli`](https://github.com/Gabriel-Operator/gabriel-cli).
