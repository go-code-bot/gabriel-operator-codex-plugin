#!/usr/bin/env npx tsx

/**
 * Generates example PageBuilderConfig JSON for common app patterns.
 *
 * Usage:
 *   npx tsx server/skills/page-builder/scripts/generate-example.ts <scenario>
 *
 * Scenarios: dashboard, landing-page, crud-app, auth-flow, saas-app
 */

type Scenario = "dashboard" | "landing-page" | "crud-app" | "auth-flow" | "saas-app";

const SCENARIOS: Scenario[] = ["dashboard", "landing-page", "crud-app", "auth-flow", "saas-app"];

const scenario = process.argv[2] as Scenario;
if (!scenario || !SCENARIOS.includes(scenario)) {
  console.error(`Usage: npx tsx generate-example.ts <scenario>`);
  console.error(`Scenarios: ${SCENARIOS.join(", ")}`);
  process.exit(1);
}

// ── Helpers ───────────────────────────────────────────────────────────

let idCounter = 1;
function uid(prefix: string) {
  return `${prefix}-${String(idCounter++).padStart(3, "0")}`;
}

// ── Scenarios ─────────────────────────────────────────────────────────

function dashboardExample() {
  return {
    appName: "Analytics Dashboard",
    appType: "web-app",
    pageTheme: "aeo",
    colorMode: "light",
    theme: { primaryColor: "indigo", fontFamily: "inter" },
    pages: [
      {
        id: uid("page"),
        name: "Dashboard",
        path: "/",
        icon: "ChartBarIcon",
        layoutId: "dashboard",
        templateId: "dashboard",
        routeType: "authenticated",
        components: [
          {
            id: uid("comp"),
            componentType: "kpi-card",
            gridPosition: { col: 1, row: 1, colSpan: 1, rowSpan: 1 },
            props: { title: "Total Revenue", value: "$48,250", subtitle: "+12% vs last month", trend: "up" },
          },
          {
            id: uid("comp"),
            componentType: "kpi-card",
            gridPosition: { col: 2, row: 1, colSpan: 1, rowSpan: 1 },
            props: { title: "Active Users", value: "2,340", subtitle: "+5% vs last month", trend: "up" },
          },
          {
            id: uid("comp"),
            componentType: "kpi-card",
            gridPosition: { col: 3, row: 1, colSpan: 1, rowSpan: 1 },
            props: { title: "Conversion Rate", value: "3.2%", subtitle: "-0.5% vs last month", trend: "down" },
          },
          {
            id: uid("comp"),
            componentType: "kpi-card",
            gridPosition: { col: 4, row: 1, colSpan: 1, rowSpan: 1 },
            props: { title: "Avg Session", value: "4m 12s", subtitle: "Stable", trend: "neutral" },
          },
          {
            id: uid("comp"),
            componentType: "line-chart",
            gridPosition: { col: 1, row: 2, colSpan: 2, rowSpan: 1 },
            props: { title: "Revenue Over Time", data: [] },
          },
          {
            id: uid("comp"),
            componentType: "table",
            gridPosition: { col: 3, row: 2, colSpan: 2, rowSpan: 1 },
            props: {
              title: "Top Products",
              columns: [
                { key: "name", header: "Product" },
                { key: "revenue", header: "Revenue", align: "right" },
                { key: "units", header: "Units", align: "right" },
              ],
              rows: [],
            },
          },
        ],
      },
    ],
    navSections: [
      {
        id: uid("section"),
        title: "Main",
        routeType: "authenticated",
        pages: [],
      },
    ],
    defaultAuthenticatedPageId: "page-001",
    collections: [],
    endpoints: [],
  };
}

function landingPageExample() {
  return {
    appName: "ProductLaunch",
    appType: "landing-page",
    pageTheme: "aeo",
    colorMode: "light",
    theme: { primaryColor: "blue", fontFamily: "dm-sans" },
    pages: [
      {
        id: uid("page"),
        name: "Landing",
        path: "/",
        icon: "GlobeAltIcon",
        layoutId: "dashboard",
        templateId: "landing-page",
        routeType: "unauthenticated",
        components: [
          {
            id: uid("comp"),
            componentType: "landing-nav",
            gridPosition: { col: 1, row: 1, colSpan: 4, rowSpan: 1 },
            props: {
              links: [
                { label: "Features", url: "#features" },
                { label: "Pricing", url: "#pricing" },
                { label: "FAQ", url: "#faq" },
              ],
              ctaText: "Get Started",
              loginText: "Sign In",
            },
          },
          {
            id: uid("comp"),
            componentType: "landing-hero",
            gridPosition: { col: 1, row: 2, colSpan: 4, rowSpan: 2 },
            props: {
              title: "Build faster with AI-powered tools",
              subtitle: "Streamline your workflow and ship products 10x faster",
              ctaText: "Start Free Trial",
              demoText: "Watch Demo",
              badgeText: "New Release",
            },
          },
          {
            id: uid("comp"),
            componentType: "landing-logos",
            gridPosition: { col: 1, row: 4, colSpan: 4, rowSpan: 1 },
            props: {
              title: "Trusted by leading companies",
              logos: [
                { name: "Acme Corp" },
                { name: "TechStart" },
                { name: "DataFlow" },
              ],
            },
          },
          {
            id: uid("comp"),
            componentType: "landing-feature",
            gridPosition: { col: 1, row: 5, colSpan: 4, rowSpan: 2 },
            props: {
              title: "Everything you need",
              subtitle: "Powerful features to accelerate your business",
              features: [
                { title: "AI Assistant", description: "Get intelligent suggestions in real-time", icon: "SparklesIcon" },
                { title: "Analytics", description: "Track performance with detailed dashboards", icon: "ChartBarIcon" },
                { title: "Integrations", description: "Connect with 100+ tools you already use", icon: "LinkIcon" },
              ],
            },
          },
          {
            id: uid("comp"),
            componentType: "landing-faq",
            gridPosition: { col: 1, row: 7, colSpan: 4, rowSpan: 2 },
            props: {
              title: "Frequently Asked Questions",
              items: [
                { question: "How does the free trial work?", answer: "You get 14 days of full access, no credit card required." },
                { question: "Can I cancel anytime?", answer: "Yes, you can cancel your subscription at any time." },
              ],
            },
          },
          {
            id: uid("comp"),
            componentType: "landing-cta",
            gridPosition: { col: 1, row: 9, colSpan: 4, rowSpan: 1 },
            props: { title: "Ready to get started?", ctaText: "Start Free Trial" },
          },
          {
            id: uid("comp"),
            componentType: "landing-footer",
            gridPosition: { col: 1, row: 10, colSpan: 4, rowSpan: 2 },
            props: {
              companyName: "ProductLaunch",
              description: "AI-powered tools for modern teams",
              copyright: "© 2025 ProductLaunch. All rights reserved.",
              links: [
                { category: "Product", items: [{ label: "Features", url: "/features" }, { label: "Pricing", url: "/pricing" }] },
                { category: "Company", items: [{ label: "About", url: "/about" }, { label: "Contact", url: "/contact" }] },
              ],
            },
          },
        ],
      },
    ],
    navSections: [
      {
        id: uid("section"),
        routeType: "unauthenticated",
        pages: [],
      },
    ],
    defaultUnauthenticatedPageId: "page-008",
    collections: [],
    endpoints: [],
  };
}

function crudAppExample() {
  const contactsCollectionId = uid("col");
  return {
    appName: "Contact Manager",
    appType: "web-app",
    pageTheme: "property-management",
    colorMode: "light",
    theme: { primaryColor: "teal", fontFamily: "inter" },
    collections: [
      {
        id: contactsCollectionId,
        name: "Contacts",
        description: "Customer contacts database",
        fields: [
          { key: "name", label: "Full Name", type: "text", required: true },
          { key: "email", label: "Email", type: "email", required: true },
          { key: "phone", label: "Phone", type: "text" },
          { key: "company", label: "Company", type: "text" },
          { key: "status", label: "Status", type: "text", defaultValue: "active" },
          { key: "createdAt", label: "Created", type: "date" },
        ],
      },
    ],
    endpoints: [
      { id: uid("ep"), name: "List Contacts", slug: "list-contacts", method: "GET", collectionId: contactsCollectionId },
      { id: uid("ep"), name: "Create Contact", slug: "create-contact", method: "POST", collectionId: contactsCollectionId },
      { id: uid("ep"), name: "Update Contact", slug: "update-contact", method: "PUT", collectionId: contactsCollectionId },
      { id: uid("ep"), name: "Delete Contact", slug: "delete-contact", method: "DELETE", collectionId: contactsCollectionId },
    ],
    pages: [
      {
        id: uid("page"),
        name: "Contacts",
        path: "/",
        icon: "UserGroupIcon",
        layoutId: "dashboard",
        templateId: "property-management-dashboard",
        routeType: "authenticated",
        components: [
          {
            id: uid("comp"),
            componentType: "kpi-card",
            gridPosition: { col: 1, row: 1, colSpan: 1, rowSpan: 1 },
            props: { title: "Total Contacts", value: "0", subtitle: "All time" },
          },
          {
            id: uid("comp"),
            componentType: "kpi-card",
            gridPosition: { col: 2, row: 1, colSpan: 1, rowSpan: 1 },
            props: { title: "Active", value: "0", subtitle: "Currently active" },
          },
          {
            id: uid("comp"),
            componentType: "table",
            gridPosition: { col: 1, row: 2, colSpan: 4, rowSpan: 2 },
            props: {
              title: "All Contacts",
              columns: [
                { key: "name", header: "Name" },
                { key: "email", header: "Email" },
                { key: "company", header: "Company" },
                { key: "status", header: "Status", align: "center" },
              ],
              rows: [],
            },
            dataBinding: {
              agentId: "",
              actionId: "",
              endpointId: "ep-022",
              mappings: [
                { componentProp: "rows", responsePath: "data" },
              ],
            },
          },
        ],
      },
    ],
    navSections: [
      { id: uid("section"), title: "Main", routeType: "authenticated", pages: [] },
    ],
    defaultAuthenticatedPageId: "page-025",
  };
}

function authFlowExample() {
  return {
    appName: "MyApp",
    appType: "web-app",
    pageTheme: "aeo",
    colorMode: "light",
    theme: { primaryColor: "purple", fontFamily: "dm-sans" },
    pages: [
      {
        id: uid("page"),
        name: "Login",
        path: "/login",
        icon: "LockClosedIcon",
        layoutId: "dashboard",
        templateId: "login-page",
        routeType: "unauthenticated",
        components: [
          {
            id: uid("comp"),
            componentType: "signup-left-panel",
            gridPosition: { col: 1, row: 1, colSpan: 2, rowSpan: 2 },
            props: {
              brandName: "MyApp",
              quote: "The best platform I've ever used for managing my business.",
              authorName: "Jane Smith",
              authorRole: "CEO, TechStart",
            },
          },
          {
            id: uid("comp"),
            componentType: "login-form",
            gridPosition: { col: 3, row: 1, colSpan: 2, rowSpan: 2 },
            props: {
              title: "Welcome back",
              subtitle: "Sign in to your account",
              emailPlaceholder: "you@example.com",
              passwordPlaceholder: "Enter your password",
              submitBtnText: "Sign In",
              forgotPasswordText: "Forgot password?",
              signUpText: "Don't have an account? Sign up",
            },
            events: [
              {
                id: uid("evt"),
                type: "onSubmit",
                actions: [
                  {
                    id: uid("act"),
                    type: "auth_login",
                    config: {
                      authFieldMappings: { emailField: "email", passwordField: "password" },
                      onAuthSuccess: { redirect: "authenticated_default" },
                      onAuthError: { showMessage: true },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: uid("page"),
        name: "Sign Up",
        path: "/signup",
        icon: "UserPlusIcon",
        layoutId: "dashboard",
        templateId: "signup-page",
        routeType: "unauthenticated",
        components: [
          {
            id: uid("comp"),
            componentType: "signup-left-panel",
            gridPosition: { col: 1, row: 1, colSpan: 2, rowSpan: 2 },
            props: {
              brandName: "MyApp",
              quote: "Signing up was the best decision for our team.",
              authorName: "John Doe",
              authorRole: "CTO, DataCo",
            },
          },
          {
            id: uid("comp"),
            componentType: "signup-form",
            gridPosition: { col: 3, row: 1, colSpan: 2, rowSpan: 2 },
            props: {
              title: "Create your account",
              subtitle: "Start your free trial today",
              firstNamePlaceholder: "First name",
              lastNamePlaceholder: "Last name",
              emailPlaceholder: "you@example.com",
              passwordPlaceholder: "Create a password",
              submitBtnText: "Create Account",
              termsText: "By signing up, you agree to our Terms of Service",
              signInText: "Already have an account? Sign in",
            },
            events: [
              {
                id: uid("evt"),
                type: "onSubmit",
                actions: [
                  {
                    id: uid("act"),
                    type: "auth_register",
                    config: {
                      authFieldMappings: { emailField: "email", passwordField: "password", nameField: "name" },
                      onAuthSuccess: { redirect: "authenticated_default" },
                      onAuthError: { showMessage: true },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: uid("page"),
        name: "Forgot Password",
        path: "/forgot-password",
        icon: "KeyIcon",
        layoutId: "dashboard",
        templateId: "forgot-password-page",
        routeType: "unauthenticated",
        components: [
          {
            id: uid("comp"),
            componentType: "forgot-password-form",
            gridPosition: { col: 2, row: 1, colSpan: 2, rowSpan: 2 },
            props: {
              title: "Reset your password",
              subtitle: "Enter your email and we'll send you a reset link",
              emailPlaceholder: "you@example.com",
              submitBtnText: "Send Reset Link",
              backToSignInText: "Back to sign in",
              termsText: "Need help? Contact support",
              signUpText: "Don't have an account? Sign up",
            },
          },
        ],
      },
    ],
    navSections: [
      {
        id: uid("section"),
        routeType: "unauthenticated",
        title: "Auth",
        pages: [],
      },
    ],
    defaultUnauthenticatedPageId: "page-030",
    collections: [],
    endpoints: [],
  };
}

function saasAppExample() {
  const collectionId = uid("col");
  return {
    appName: "SaaSPlatform",
    appType: "web-app",
    pageTheme: "aeo",
    colorMode: "light",
    theme: { primaryColor: "indigo", secondaryColor: "slate", fontFamily: "inter" },
    collections: [
      {
        id: collectionId,
        name: "Projects",
        fields: [
          { key: "name", label: "Name", type: "text", required: true },
          { key: "status", label: "Status", type: "text" },
          { key: "createdAt", label: "Created", type: "date" },
        ],
      },
    ],
    endpoints: [
      { id: uid("ep"), name: "List Projects", slug: "list-projects", method: "GET", collectionId },
    ],
    pages: [
      // Landing page
      {
        id: uid("page"),
        name: "Home",
        path: "/",
        icon: "GlobeAltIcon",
        layoutId: "dashboard",
        templateId: "landing-page",
        routeType: "unauthenticated",
        components: [
          {
            id: uid("comp"),
            componentType: "landing-nav",
            gridPosition: { col: 1, row: 1, colSpan: 4, rowSpan: 1 },
            props: { links: [{ label: "Features", url: "#features" }], ctaText: "Get Started" },
          },
          {
            id: uid("comp"),
            componentType: "landing-hero",
            gridPosition: { col: 1, row: 2, colSpan: 4, rowSpan: 2 },
            props: { title: "Your SaaS Platform", subtitle: "All-in-one solution", ctaText: "Start Free" },
          },
          {
            id: uid("comp"),
            componentType: "landing-footer",
            gridPosition: { col: 1, row: 4, colSpan: 4, rowSpan: 1 },
            props: { companyName: "SaaSPlatform", copyright: "© 2025" },
          },
        ],
      },
      // Login
      {
        id: uid("page"),
        name: "Login",
        path: "/login",
        icon: "LockClosedIcon",
        layoutId: "dashboard",
        templateId: "login-page",
        routeType: "unauthenticated",
        components: [
          {
            id: uid("comp"),
            componentType: "signup-left-panel",
            gridPosition: { col: 1, row: 1, colSpan: 2, rowSpan: 2 },
            props: { brandName: "SaaSPlatform", quote: "Great product!", authorName: "User", authorRole: "Manager" },
          },
          {
            id: uid("comp"),
            componentType: "login-form",
            gridPosition: { col: 3, row: 1, colSpan: 2, rowSpan: 2 },
            props: { title: "Sign In", subtitle: "Welcome back", emailPlaceholder: "Email", passwordPlaceholder: "Password", submitBtnText: "Sign In" },
          },
        ],
      },
      // Dashboard
      {
        id: uid("page"),
        name: "Dashboard",
        path: "/dashboard",
        icon: "Squares2X2Icon",
        layoutId: "dashboard",
        templateId: "dashboard",
        routeType: "authenticated",
        components: [
          {
            id: uid("comp"),
            componentType: "kpi-card",
            gridPosition: { col: 1, row: 1, colSpan: 1, rowSpan: 1 },
            props: { title: "Projects", value: "12", trend: "up" },
          },
          {
            id: uid("comp"),
            componentType: "kpi-card",
            gridPosition: { col: 2, row: 1, colSpan: 1, rowSpan: 1 },
            props: { title: "Tasks", value: "48", trend: "neutral" },
          },
          {
            id: uid("comp"),
            componentType: "line-chart",
            gridPosition: { col: 1, row: 2, colSpan: 2, rowSpan: 1 },
            props: { title: "Activity", data: [] },
          },
          {
            id: uid("comp"),
            componentType: "table",
            gridPosition: { col: 3, row: 1, colSpan: 2, rowSpan: 2 },
            props: {
              title: "Recent Projects",
              columns: [{ key: "name", header: "Name" }, { key: "status", header: "Status" }],
              rows: [],
            },
          },
        ],
      },
      // Settings
      {
        id: uid("page"),
        name: "Settings",
        path: "/settings",
        icon: "Cog6ToothIcon",
        layoutId: "dashboard",
        templateId: "account",
        routeType: "authenticated",
        components: [
          {
            id: uid("comp"),
            componentType: "account-info-form",
            gridPosition: { col: 1, row: 1, colSpan: 2, rowSpan: 2 },
            props: {},
          },
        ],
      },
    ],
    navSections: [
      { id: uid("section"), title: "Public", routeType: "unauthenticated", pages: [] },
      { id: uid("section"), title: "App", routeType: "authenticated", pages: [] },
    ],
    defaultUnauthenticatedPageId: "page-051",
    defaultAuthenticatedPageId: "page-059",
  };
}

// ── Generate ──────────────────────────────────────────────────────────

const generators: Record<Scenario, () => any> = {
  dashboard: dashboardExample,
  "landing-page": landingPageExample,
  "crud-app": crudAppExample,
  "auth-flow": authFlowExample,
  "saas-app": saasAppExample,
};

const result = generators[scenario]();
console.log(JSON.stringify(result, null, 2));
