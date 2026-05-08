#!/usr/bin/env npx tsx

/**
 * Validates a PageBuilderConfig JSON file.
 *
 * Usage:
 *   npx tsx server/skills/page-builder/scripts/validate-config.ts <file.json>
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const VALID_COMPONENT_TYPES = [
  "kpi-card", "line-chart", "area-chart", "table", "bar-chart", "text",
  "filter-bar", "platform-performance", "queries-table", "sentiment-bar",
  "share-of-voice-chart", "ranking-table", "donut-chart", "ai-mentions",
  "header-summary", "header-chart", "status-tags", "metric-bars",
  "response-history", "brand-profile", "competitors-manager", "entity-mapper",
  "writing-style-guide", "knowledge-sources", "insights-list", "actions-list",
  "connect-integration", "connect-banner", "topic-list", "tracked-topics-table",
  "article-list", "article-editor", "health-gauges", "health-gauge",
  "pages-table", "page-audit-header", "web-vitals", "audit-issues",
  "button", "link", "action-card", "sidebar", "dashboard-header",
  "header-actions", "quick-action-card", "project-card", "landing-hero",
  "landing-feature", "landing-trust", "landing-faq", "landing-cta",
  "landing-footer", "landing-nav", "landing-logos", "landing-search-hero",
  "login-form", "forgot-password-form", "signup-form", "signup-left-panel",
  "onboarding-step", "card", "modal", "form-group", "connections-manager",
  "account-info-form", "clients-table", "data-list",
] as const;

const VALID_APP_TYPES = ["web-app", "mobile-app", "landing-page"] as const;

const VALID_PAGE_THEMES = [
  "aeo", "property-management", "email-marketing", "alpha-frame",
  "funding-tool", "ivy-match", "accelerator-os",
] as const;

const VALID_COLOR_MODES = ["light", "dark", "system"] as const;

const VALID_PALETTE_NAMES = [
  "coral", "ocean", "forest", "purple", "slate", "research",
  "maroon", "stone", "emerald", "custom",
] as const;

const VALID_FONT_FAMILIES = [
  "dm-sans", "inter", "system", "roboto", "poppins", "outfit",
] as const;

const VALID_COLOR_NAMES = [
  "purple", "indigo", "blue", "green", "orange", "pink", "red",
  "teal", "gray", "slate", "maroon", "stone", "emerald",
] as const;

const VALID_FIELD_TYPES = [
  "text", "number", "boolean", "date", "email", "url",
  "rich-text", "image", "array", "object", "json",
] as const;

const VALID_EVENT_TYPES = [
  "onClick", "onSubmit", "onChange", "onLoad", "onHover",
] as const;

const VALID_EVENT_ACTION_TYPES = [
  "navigate", "api_call", "call_workflow", "set_state",
  "open_modal", "submit_form", "auth_login", "auth_register",
  "auth_forgot_password", "auth_magic_link",
] as const;

const VALID_HTTP_METHODS = ["GET", "POST", "PUT", "DELETE"] as const;

const VALID_ROUTE_TYPES = ["authenticated", "unauthenticated"] as const;

// ── Helpers ───────────────────────────────────────────────────────────

interface ValidationError {
  path: string;
  message: string;
}

const errors: ValidationError[] = [];
const warnings: string[] = [];

function err(path: string, message: string) {
  errors.push({ path, message });
}

function warn(message: string) {
  warnings.push(message);
}

function isIn<T extends string>(value: string, list: readonly T[]): value is T {
  return (list as readonly string[]).includes(value);
}

// ── Main ──────────────────────────────────────────────────────────────

const filePath = process.argv[2];
if (!filePath) {
  console.error("Usage: npx tsx validate-config.ts <file.json>");
  process.exit(1);
}

let raw: string;
try {
  raw = readFileSync(resolve(filePath), "utf-8");
} catch {
  console.error(`Cannot read file: ${filePath}`);
  process.exit(1);
}

let config: any;
try {
  config = JSON.parse(raw);
} catch (e: any) {
  console.error(`Invalid JSON: ${e.message}`);
  process.exit(1);
}

// ── Top-level required fields ─────────────────────────────────────────

if (!config.appName || typeof config.appName !== "string") {
  err("appName", "Required string field");
}

if (!config.appType || !isIn(config.appType, VALID_APP_TYPES)) {
  err("appType", `Must be one of: ${VALID_APP_TYPES.join(", ")}`);
}

if (!Array.isArray(config.pages) || config.pages.length === 0) {
  err("pages", "Must be a non-empty array of PageDefinition objects");
}

// ── Optional top-level enums ──────────────────────────────────────────

if (config.pageTheme && !isIn(config.pageTheme, VALID_PAGE_THEMES)) {
  err("pageTheme", `Must be one of: ${VALID_PAGE_THEMES.join(", ")}`);
}

if (config.colorMode && !isIn(config.colorMode, VALID_COLOR_MODES)) {
  err("colorMode", `Must be one of: ${VALID_COLOR_MODES.join(", ")}`);
}

// ── Theme ─────────────────────────────────────────────────────────────

if (config.theme) {
  const t = config.theme;
  if (t.palette && !isIn(t.palette, VALID_PALETTE_NAMES)) {
    err("theme.palette", `Must be one of: ${VALID_PALETTE_NAMES.join(", ")}`);
  }
  if (t.fontFamily && !isIn(t.fontFamily, VALID_FONT_FAMILIES)) {
    err("theme.fontFamily", `Must be one of: ${VALID_FONT_FAMILIES.join(", ")}`);
  }
  if (!t.primaryColor || !isIn(t.primaryColor, VALID_COLOR_NAMES)) {
    err("theme.primaryColor", `Required. Must be one of: ${VALID_COLOR_NAMES.join(", ")}`);
  }
  if (t.secondaryColor && !isIn(t.secondaryColor, VALID_COLOR_NAMES)) {
    err("theme.secondaryColor", `Must be one of: ${VALID_COLOR_NAMES.join(", ")}`);
  }
  if (t.accentColor && !isIn(t.accentColor, VALID_COLOR_NAMES)) {
    err("theme.accentColor", `Must be one of: ${VALID_COLOR_NAMES.join(", ")}`);
  }
}

// ── Duplicate ID tracking ─────────────────────────────────────────────

const seenPageIds = new Set<string>();
const seenComponentIds = new Set<string>();
const seenCollectionIds = new Set<string>();
const seenEndpointIds = new Set<string>();

// ── Pages ─────────────────────────────────────────────────────────────

function validatePage(page: any, idx: number, prefix: string) {
  const p = `${prefix}[${idx}]`;

  if (!page.id) err(`${p}.id`, "Required");
  if (!page.name) err(`${p}.name`, "Required");
  if (!page.path || typeof page.path !== "string") {
    err(`${p}.path`, "Required string");
  } else if (!page.path.startsWith("/")) {
    err(`${p}.path`, "Must start with /");
  }
  if (!page.templateId) err(`${p}.templateId`, "Required");
  if (!page.layoutId) warn(`${p}.layoutId: Missing (will default to 'dashboard')`);

  if (page.routeType && !isIn(page.routeType, VALID_ROUTE_TYPES)) {
    err(`${p}.routeType`, `Must be one of: ${VALID_ROUTE_TYPES.join(", ")}`);
  }

  // Duplicate page ID
  if (page.id) {
    if (seenPageIds.has(page.id)) {
      err(`${p}.id`, `Duplicate page ID: ${page.id}`);
    }
    seenPageIds.add(page.id);
  }

  // Components
  if (!Array.isArray(page.components)) {
    err(`${p}.components`, "Must be an array");
  } else {
    page.components.forEach((comp: any, ci: number) => {
      validateComponent(comp, ci, `${p}.components`);
    });
  }
}

// ── Components ────────────────────────────────────────────────────────

function validateComponent(comp: any, idx: number, prefix: string) {
  const c = `${prefix}[${idx}]`;

  if (!comp.id) err(`${c}.id`, "Required");
  if (comp.id) {
    if (seenComponentIds.has(comp.id)) {
      err(`${c}.id`, `Duplicate component ID: ${comp.id}`);
    }
    seenComponentIds.add(comp.id);
  }

  if (!comp.componentType || !isIn(comp.componentType, VALID_COMPONENT_TYPES)) {
    err(`${c}.componentType`, `Must be one of the 68 valid types. Got: "${comp.componentType}"`);
  }

  // Grid position
  if (!comp.gridPosition) {
    err(`${c}.gridPosition`, "Required");
  } else {
    const g = comp.gridPosition;
    if (typeof g.col !== "number" || g.col < 1) err(`${c}.gridPosition.col`, "Must be >= 1");
    if (typeof g.row !== "number" || g.row < 1) err(`${c}.gridPosition.row`, "Must be >= 1");
    if (typeof g.colSpan !== "number" || g.colSpan < 1) err(`${c}.gridPosition.colSpan`, "Must be >= 1");
    if (typeof g.rowSpan !== "number" || g.rowSpan < 1) err(`${c}.gridPosition.rowSpan`, "Must be >= 1");
    if (g.col + g.colSpan - 1 > 4) {
      warn(`${c}.gridPosition: col(${g.col}) + colSpan(${g.colSpan}) exceeds 4-column grid`);
    }
  }

  if (!comp.props || typeof comp.props !== "object") {
    err(`${c}.props`, "Required object");
  }

  // Data binding
  if (comp.dataBinding) {
    validateDataBinding(comp.dataBinding, `${c}.dataBinding`);
  }

  // Events
  if (comp.events && Array.isArray(comp.events)) {
    comp.events.forEach((evt: any, ei: number) => {
      validateEvent(evt, ei, `${c}.events`);
    });
  }
}

// ── Data Binding ──────────────────────────────────────────────────────

function validateDataBinding(db: any, path: string) {
  if (!db.agentId) warn(`${path}.agentId: Missing (may use sources[] instead)`);
  if (!db.actionId) warn(`${path}.actionId: Missing (may use endpointId instead)`);

  if (!Array.isArray(db.mappings) || db.mappings.length === 0) {
    err(`${path}.mappings`, "Must be a non-empty array");
  } else {
    db.mappings.forEach((m: any, mi: number) => {
      if (!m.componentProp) err(`${path}.mappings[${mi}].componentProp`, "Required");
      if (!m.responsePath) err(`${path}.mappings[${mi}].responsePath`, "Required");
    });
  }

  if (db.queryConfig) {
    const qc = db.queryConfig;
    if (qc.filters && Array.isArray(qc.filters)) {
      qc.filters.forEach((f: any, fi: number) => {
        if (!f.fieldPath) err(`${path}.queryConfig.filters[${fi}].fieldPath`, "Required");
      });
    }
    if (qc.sort) {
      if (!qc.sort.fieldPath) err(`${path}.queryConfig.sort.fieldPath`, "Required");
      if (qc.sort.direction && !["asc", "desc"].includes(qc.sort.direction)) {
        err(`${path}.queryConfig.sort.direction`, "Must be 'asc' or 'desc'");
      }
    }
  }
}

// ── Events ────────────────────────────────────────────────────────────

function validateEvent(evt: any, idx: number, prefix: string) {
  const e = `${prefix}[${idx}]`;

  if (!evt.id) err(`${e}.id`, "Required");
  if (!evt.type || !isIn(evt.type, VALID_EVENT_TYPES)) {
    err(`${e}.type`, `Must be one of: ${VALID_EVENT_TYPES.join(", ")}`);
  }
  if (!Array.isArray(evt.actions) || evt.actions.length === 0) {
    err(`${e}.actions`, "Must be a non-empty array");
  } else {
    evt.actions.forEach((act: any, ai: number) => {
      if (!act.id) err(`${e}.actions[${ai}].id`, "Required");
      if (!act.type || !isIn(act.type, VALID_EVENT_ACTION_TYPES)) {
        err(`${e}.actions[${ai}].type`, `Must be one of: ${VALID_EVENT_ACTION_TYPES.join(", ")}`);
      }
      if (!act.config || typeof act.config !== "object") {
        err(`${e}.actions[${ai}].config`, "Required object");
      }
    });
  }
}

// ── Collections ───────────────────────────────────────────────────────

if (config.collections && Array.isArray(config.collections)) {
  config.collections.forEach((col: any, ci: number) => {
    const p = `collections[${ci}]`;
    if (!col.id) err(`${p}.id`, "Required");
    if (!col.name) err(`${p}.name`, "Required");

    if (col.id) {
      if (seenCollectionIds.has(col.id)) {
        err(`${p}.id`, `Duplicate collection ID: ${col.id}`);
      }
      seenCollectionIds.add(col.id);
    }

    if (!Array.isArray(col.fields) || col.fields.length === 0) {
      err(`${p}.fields`, "Must be a non-empty array");
    } else {
      col.fields.forEach((f: any, fi: number) => {
        if (!f.key) err(`${p}.fields[${fi}].key`, "Required");
        if (!f.label) err(`${p}.fields[${fi}].label`, "Required");
        if (!f.type || !isIn(f.type, VALID_FIELD_TYPES)) {
          err(`${p}.fields[${fi}].type`, `Must be one of: ${VALID_FIELD_TYPES.join(", ")}`);
        }
      });
    }
  });
}

// ── Endpoints ─────────────────────────────────────────────────────────

if (config.endpoints && Array.isArray(config.endpoints)) {
  config.endpoints.forEach((ep: any, ei: number) => {
    const p = `endpoints[${ei}]`;
    if (!ep.id) err(`${p}.id`, "Required");
    if (!ep.name) err(`${p}.name`, "Required");
    if (!ep.slug) err(`${p}.slug`, "Required");
    if (!ep.method || !isIn(ep.method, VALID_HTTP_METHODS)) {
      err(`${p}.method`, `Must be one of: ${VALID_HTTP_METHODS.join(", ")}`);
    }

    if (ep.id) {
      if (seenEndpointIds.has(ep.id)) {
        err(`${p}.id`, `Duplicate endpoint ID: ${ep.id}`);
      }
      seenEndpointIds.add(ep.id);
    }
  });
}

// ── NavSections ───────────────────────────────────────────────────────

if (config.navSections && Array.isArray(config.navSections)) {
  config.navSections.forEach((section: any, si: number) => {
    const s = `navSections[${si}]`;
    if (!section.id) err(`${s}.id`, "Required");
    if (section.routeType && !isIn(section.routeType, VALID_ROUTE_TYPES)) {
      err(`${s}.routeType`, `Must be one of: ${VALID_ROUTE_TYPES.join(", ")}`);
    }
    if (Array.isArray(section.pages)) {
      section.pages.forEach((page: any, pi: number) => {
        validatePage(page, pi, `${s}.pages`);
      });
    }
  });
}

// ── Top-level pages (backward compat) ─────────────────────────────────

if (Array.isArray(config.pages)) {
  config.pages.forEach((page: any, pi: number) => {
    validatePage(page, pi, "pages");
  });
}

// ── Billing products ──────────────────────────────────────────────────

if (config.billingProducts && Array.isArray(config.billingProducts)) {
  config.billingProducts.forEach((bp: any, bi: number) => {
    if (!bp.planId) err(`billingProducts[${bi}].planId`, "Required");
  });
}

// ── Connectors ────────────────────────────────────────────────────────

if (config.connectors && Array.isArray(config.connectors)) {
  config.connectors.forEach((conn: any, ci: number) => {
    const p = `connectors[${ci}]`;
    if (!conn.id) err(`${p}.id`, "Required");
    if (!conn.name) err(`${p}.name`, "Required");
    if (!conn.agentId) err(`${p}.agentId`, "Required");
    if (!conn.actionId) err(`${p}.actionId`, "Required");
  });
}

// ── Cross-references ──────────────────────────────────────────────────

if (config.defaultAuthenticatedPageId && !seenPageIds.has(config.defaultAuthenticatedPageId)) {
  warn(`defaultAuthenticatedPageId "${config.defaultAuthenticatedPageId}" not found in pages`);
}
if (config.defaultUnauthenticatedPageId && !seenPageIds.has(config.defaultUnauthenticatedPageId)) {
  warn(`defaultUnauthenticatedPageId "${config.defaultUnauthenticatedPageId}" not found in pages`);
}

// ── Output ────────────────────────────────────────────────────────────

console.log("\n=== PageBuilderConfig Validation ===\n");
console.log(`Pages:      ${seenPageIds.size}`);
console.log(`Components: ${seenComponentIds.size}`);
console.log(`Collections:${seenCollectionIds.size}`);
console.log(`Endpoints:  ${seenEndpointIds.size}`);
console.log();

if (warnings.length > 0) {
  console.log(`⚠  ${warnings.length} warning(s):`);
  warnings.forEach((w) => console.log(`   - ${w}`));
  console.log();
}

if (errors.length > 0) {
  console.log(`✗  ${errors.length} error(s):`);
  errors.forEach((e) => console.log(`   ${e.path}: ${e.message}`));
  console.log();
  process.exit(1);
} else {
  console.log("✓  Valid PageBuilderConfig");
  process.exit(0);
}
