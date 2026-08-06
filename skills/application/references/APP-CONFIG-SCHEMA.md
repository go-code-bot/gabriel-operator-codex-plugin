# app-config.json Schema Reference

The `app-config.json` file is the machine-readable definition for a Gabriel Operator Application. It lives at the root of the Application's git repository.

## Top-level fields

| Field | Type | Required | Description |
|---|---|---|---|
| `schemaVersion` | `number` | ✓ | Always `1` |
| `id` | `string` | ✓ | Application ID (MongoDB ObjectId or UUID) |
| `name` | `string` | ✓ | Human-readable display name |
| `version` | `string` | | Semantic version (default `"1.0.0"`) |
| `embedConfig` | `EmbedConfig` | ✓ | How the app is rendered |
| `dataConnections` | `DataConnection[]` | | Pipeline collections this app reads |
| `slashCommandDefaults` | `SlashCommandDefaults` | | Default slash command linking |

## EmbedConfig

```typescript
interface EmbedConfig {
  type: 'static_files' | 'raw_html' | 'iframe_url' | 'external_link';
  publicDir?: string;   // default 'public' — for static_files
  html?: string;        // inline HTML — for raw_html
  url?: string;         // for iframe_url / external_link
  mcpApp?: {
    entrypoint?: string; // filename in repo, default 'mcp-app.html'
    html?: string;       // inline HTML (takes precedence over entrypoint)
  };
}
```

## DataConnection

```typescript
interface DataConnection {
  collectionId: string;
  accessMode: 'read' | 'read-write';
  label?: string;
}
```

## Data API endpoints

Given `pageId` and `collectionId`:

| Endpoint | Description |
|---|---|
| `GET /api/data-api/{pageId}/{collectionId}/records?limit=N&offset=M` | Paginated records |
| `GET /api/data-api/{pageId}/{collectionId}/stats` | Count, latest updated_at, field summary |
| `GET /api/data-api/{pageId}/{collectionId}/records/{id}` | Single record by ID |
| `POST /api/data-api/{pageId}/{collectionId}/records` | Create record (read-write only) |
| `PUT /api/data-api/{pageId}/{collectionId}/records/{id}` | Update record (read-write only) |

All requests require `Authorization: Bearer <api-key>` header. Obtain the API key from Applications > Docs > API Keys.

## SlashCommandDefaults

```typescript
interface SlashCommandDefaults {
  trigger?: string;           // default trigger name without the /
  showOnCompletion?: boolean; // if true, auto-link to slash commands with matching trigger
}
```
