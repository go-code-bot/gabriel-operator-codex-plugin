# PageBuilderConfig — Complete JSON Schema Reference

This document defines every field in the `PageBuilderConfig` object, organized
by interface.

---

## PageBuilderConfig (top-level)

```typescript
{
  pages: PageDefinition[];                     // Required — flat list of all pages (backward compat)
  navSections?: NavSection[];                  // New source of truth for navigation grouping
  appType: 'web-app' | 'mobile-app' | 'landing-page';  // Required
  appName: string;                             // Required — display name
  appLogo?: string;                            // URL or asset path for app logo
  theme?: ThemeConfig;                         // Visual theming
  pageTheme?: PageTheme;                       // Named preset theme
  colorMode?: ColorMode;                       // Light/dark/system
  landingPageUrl?: string;                     // URL for the public landing page
  collections?: CollectionDefinition[];        // Data collections (like DB tables)
  endpoints?: EndpointDefinition[];            // API endpoint definitions
  connectors?: PageBuilderConnector[];         // External integration connectors
  defaultAuthenticatedPageId?: string;         // Page ID to redirect to after login
  defaultUnauthenticatedPageId?: string;       // Page ID for unauthenticated visitors
  overrideConfig?: OverrideConfigJson;         // Runtime overrides
  useHardcodedSidebar?: boolean;               // Use hardcoded sidebar instead of config-driven
  useConfigUrlRuntime?: boolean;               // Use config URL runtime mode
  billingProducts?: BillingProductConfig[];    // Stripe billing plans
  stripeSecretKey?: string;                    // Stripe secret key
  stripePublishableKey?: string;               // Stripe publishable key
  monitoring?: MonitoringConfig;               // Analytics and monitoring
  googleSignIn?: GoogleSignInConfig;           // Google OAuth configuration
  llm?: LlmConfig;                            // LLM default settings
}
```

---

## NavSection

Groups pages into navigable sidebar/nav sections.

```typescript
{
  id: string;                 // UUID — unique section identifier
  title?: string;             // Display title for the section (optional for single-section apps)
  pages: PageDefinition[];    // Ordered array of pages in this section
  isPaid?: boolean;           // Whether this section requires a paid plan
  routeType?: string;         // Route type for all pages in this section
}
```

---

## PageDefinition

Defines a single page/screen in the application.

```typescript
{
  id: string;                          // UUID — unique page identifier
  name: string;                        // Display name
  path: string;                        // URL path (e.g. "/dashboard", "/login")
  icon?: string;                       // Icon identifier for nav display
  layoutId?: string;                   // Layout template ID
  templateId?: string;                 // Template ID from the templates catalog
  components: ComponentInstance[];     // Array of components on this page
  routeType?: 'authenticated' | 'unauthenticated';  // Access control
  linkedCollections?: Record<string, string>;  // Maps template schema collection IDs to actual collection IDs
  hiddenSections?: string[];           // Section IDs to hide on this page
  marksOnboardingComplete?: boolean;   // Whether visiting this page completes onboarding
}
```

---

## ComponentInstance

A single component placed on a page.

```typescript
{
  id: string;                          // UUID — unique component identifier
  componentType: string;               // One of the 68 registered component types
  gridPosition: GridPosition;          // Placement on the page grid
  props: Record<string, any>;          // Static prop values for the component
  exampleData?: Record<string, any>;   // Static fallback data (used when no dataBinding)
  dataBinding?: DataBinding;           // Dynamic data source configuration
  events?: ComponentEvent[];           // Interactive event handlers
}
```

---

## GridPosition

Positions a component on the 4-column page grid.

```typescript
{
  col: number;      // Starting column (1-based, range: 1–4)
  row: number;      // Starting row (1-based)
  colSpan: number;  // Number of columns to span (1–4)
  rowSpan: number;  // Number of rows to span (1+)
}
```

**Grid rules:**
- The grid has 4 columns.
- `col` and `row` start at 1 (not 0).
- `col + colSpan - 1` must not exceed 4.
- Full-width components: `{ col: 1, row: N, colSpan: 4, rowSpan: 1 }`.
- Half-width components: `colSpan: 2`.
- Quarter-width components: `colSpan: 1`.

---

## DataBinding

Connects a component to dynamic data from agents, collections, or endpoints.

```typescript
{
  agentId: string;                        // ID of the agent providing data
  agentName?: string;                     // Display name of the agent
  actionId: string;                       // ID of the agent action/workflow to invoke
  actionName?: string;                    // Display name of the action
  endpointId?: string;                    // Endpoint ID (if binding to a defined endpoint)
  mappings: DataBindingMapping[];         // How response fields map to component props
  lastExecuted?: string;                  // ISO timestamp of last execution
  cachedData?: any;                       // Cached response data
  recordFilter?: Record<string, any>;     // Filter criteria for records
  queryConfig?: DataBindingQueryConfig;   // Query configuration (filters, sort, limit)
  sources?: DataBindingSource[];          // Multiple data sources
}
```

---

## DataBindingMapping

Maps a single field from the data response to a component prop.

```typescript
{
  componentProp: string;    // The prop name on the component (e.g. "title", "rows")
  responsePath: string;     // Dot-notation path into the response (e.g. "data.items")
  collectionId?: string;    // Collection ID if sourcing from a collection
  fieldKey?: string;        // Field key within the collection
}
```

---

## DataBindingQueryConfig

Query parameters applied when fetching data for a binding.

```typescript
{
  filters?: DataBindingFilter[];   // Array of filter conditions
  sort?: {
    field: string;                 // Field to sort by
    direction: 'asc' | 'desc';    // Sort direction
  };
  limit?: number;                  // Maximum number of records to return
  selectLatest?: boolean;          // Select only the most recent record
}
```

---

## DataBindingFilter

A single filter condition within a query config.

```typescript
{
  fieldPath: string;       // Dot-notation path to the field to filter on
  operator?: string;       // Comparison operator (e.g. "eq", "ne", "gt", "lt", "contains", "in")
  value?: any;             // Static value to compare against
  contextKey?: string;     // Dynamic context key (e.g. "currentUser.id", "route.params.id")
}
```

---

## DataBindingSource

Defines a named data source within a multi-source binding.

```typescript
{
  id: string;
  agentId: string;
  actionId: string;
  mappings: DataBindingMapping[];
}
```

---

## ComponentEvent

An event handler attached to a component.

```typescript
{
  id: string;                    // UUID — unique event identifier
  type: EventType;               // Trigger type
  actions: EventAction[];        // Actions to execute when triggered
}
```

### EventType

```typescript
type EventType = 'onClick' | 'onSubmit' | 'onChange' | 'onLoad' | 'onHover';
```

---

## EventAction

A single action executed in response to an event.

```typescript
{
  id: string;                    // UUID — unique action identifier
  type: EventActionType;         // Action type
  config: EventActionConfig;     // Type-specific configuration
}
```

### EventActionType

```typescript
type EventActionType =
  | 'navigate'
  | 'api_call'
  | 'call_workflow'
  | 'set_state'
  | 'open_modal'
  | 'submit_form'
  | 'auth_login'
  | 'auth_register'
  | 'auth_forgot_password'
  | 'auth_magic_link';
```

### EventActionConfig by type

**navigate**
```typescript
{
  path: string;          // Target route path
  external?: boolean;    // Open in new tab if true
}
```

**api_call**
```typescript
{
  endpointId: string;    // ID of the endpoint to call
  method?: string;       // HTTP method override
  body?: any;            // Request body
  onSuccess?: EventAction[];  // Actions to run on success
  onError?: EventAction[];    // Actions to run on error
}
```

**call_workflow**
```typescript
{
  agentId: string;       // Agent ID
  actionId: string;      // Action/workflow ID
  input?: any;           // Input payload
  onSuccess?: EventAction[];
  onError?: EventAction[];
}
```

**set_state**
```typescript
{
  key: string;           // State key to set
  value: any;            // Value to assign
}
```

**open_modal**
```typescript
{
  modalComponentId: string;  // ID of the modal component to open
}
```

**submit_form**
```typescript
{
  endpointId?: string;   // Endpoint to submit to
  collectionId?: string; // Collection to write to
  onSuccess?: EventAction[];
  onError?: EventAction[];
}
```

**auth_login**
```typescript
{
  redirectPath?: string;     // Path to redirect after login
  provider?: string;         // Auth provider (e.g. "google", "email")
}
```

**auth_register**
```typescript
{
  redirectPath?: string;     // Path to redirect after registration
}
```

**auth_forgot_password**
```typescript
{
  redirectPath?: string;     // Path to redirect after password reset request
}
```

**auth_magic_link**
```typescript
{
  redirectPath?: string;     // Path to redirect after magic link auth
}
```

---

## CollectionDefinition

Defines a data collection (analogous to a database table).

```typescript
{
  id: string;                          // UUID — unique collection identifier
  name: string;                        // Display name
  description?: string;                // Human-readable description
  fields: CollectionField[];           // Array of field definitions
}
```

---

## CollectionField

A single field within a collection.

```typescript
{
  key: string;              // Programmatic field key
  label: string;            // Display label
  type: FieldType;          // Data type
  required?: boolean;       // Whether the field is required
  defaultValue?: any;       // Default value
  description?: string;     // Human-readable description
  items?: CollectionField[];  // Sub-fields (for type "object")
  arrayItemType?: FieldType;  // Item type (for type "array")
}
```

### FieldType

```typescript
type FieldType =
  | 'text'
  | 'number'
  | 'boolean'
  | 'date'
  | 'email'
  | 'url'
  | 'rich-text'
  | 'image'
  | 'array'
  | 'object'
  | 'json';
```

---

## EndpointDefinition

Defines an API endpoint the app exposes or consumes.

```typescript
{
  id: string;                    // UUID — unique endpoint identifier
  name: string;                  // Display name
  slug: string;                  // URL slug (e.g. "get-dashboard-data")
  method: string;                // HTTP method: "GET", "POST", "PUT", "DELETE"
  description?: string;          // Human-readable description
  agentId?: string;              // Agent ID to handle requests
  collectionId?: string;         // Collection ID for CRUD operations
  workflow?: string;             // Workflow identifier
  handlerType?: string;          // Handler type (e.g. "collection-crud", "agent-action", "workflow")
  chatConfig?: {                 // Chat-specific configuration
    systemPrompt?: string;
    model?: string;
    temperature?: number;
  };
}
```

---

## ThemeConfig

Visual theme configuration for the app.

```typescript
{
  palette?: ThemePaletteName;      // Named palette preset
  fontFamily?: ThemeFontFamily;    // Font family
  primaryColor: ThemeColorName;    // Primary brand color
  secondaryColor?: ThemeColorName; // Secondary color
  accentColor?: ThemeColorName;    // Accent color
}
```

### ThemePaletteName

```typescript
type ThemePaletteName =
  | 'coral'
  | 'ocean'
  | 'forest'
  | 'purple'
  | 'slate'
  | 'research'
  | 'maroon'
  | 'stone'
  | 'emerald'
  | 'custom';
```

### ThemeFontFamily

```typescript
type ThemeFontFamily =
  | 'dm-sans'
  | 'inter'
  | 'system'
  | 'roboto'
  | 'poppins'
  | 'outfit';
```

### ThemeColorName

```typescript
type ThemeColorName =
  | 'purple'
  | 'indigo'
  | 'blue'
  | 'green'
  | 'orange'
  | 'pink'
  | 'red'
  | 'teal'
  | 'gray'
  | 'slate'
  | 'maroon'
  | 'stone'
  | 'emerald';
```

---

## PageTheme

Named preset theme identifiers.

```typescript
type PageTheme =
  | 'aeo'
  | 'property-management'
  | 'email-marketing'
  | 'alpha-frame'
  | 'funding-tool'
  | 'ivy-match'
  | 'accelerator-os';
```

---

## ColorMode

```typescript
type ColorMode = 'light' | 'dark' | 'system';
```

---

## BillingProductConfig

Stripe billing plan definition.

```typescript
{
  planId: string;                      // Unique plan identifier
  stripeProductId?: string;            // Stripe product ID
  stripeMonthlyPriceId?: string;       // Stripe monthly price ID
  stripeAnnualPriceId?: string;        // Stripe annual price ID
  label?: string;                      // Display label
  description?: string;                // Plan description
  cta?: string;                        // Call-to-action text
  popular?: boolean;                   // Highlight as popular plan
  sortOrder?: number;                  // Display order
  featureTags?: string[];              // Feature list for plan comparison
}
```

---

## OverrideConfigJson

Runtime override configuration.

```typescript
{
  defaultPrecedence?: string;                       // Override precedence mode
  templates?: Record<string, any>;                  // Template-level overrides
  components?: Record<string, any>;                 // Component-level overrides
  endpoints?: Record<string, any>;                  // Endpoint-level overrides
  monitoring?: MonitoringConfig;                     // Monitoring overrides
  googleSignIn?: GoogleSignInConfig;                 // Google sign-in overrides
}
```

---

## MonitoringConfig

```typescript
{
  posthogApiKey?: string;
  posthogHost?: string;
  googleAnalyticsId?: string;
}
```

---

## GoogleSignInConfig

```typescript
{
  enabled?: boolean;
  clientId?: string;
  clientSecret?: string;
  redirectUri?: string;
}
```

---

## LlmConfig

```typescript
{
  defaultModelId?: string;    // Default model ID for LLM features
}
```

---

## PageBuilderConnector

External integration connector.

```typescript
{
  id: string;                   // UUID — unique connector identifier
  name: string;                 // Display name
  description?: string;         // Description of the connector
  icon?: string;                // Icon identifier
  agentId: string;              // Agent ID backing this connector
  actionId: string;             // Action ID on the agent
  actionName?: string;          // Display name of the action
  executionMode?: string;       // Execution mode (e.g. "sync", "async")
  website?: string;             // External website URL
}
```
