# PageBuilderConfig Template and Examples

---

## Blank template with placeholders

```json
{
  "appName": "{{APP_NAME}}",
  "appType": "{{web-app | mobile-app | landing-page}}",
  "appLogo": "{{LOGO_URL}}",
  "pageTheme": "{{THEME_ID}}",
  "colorMode": "{{light | dark | system}}",
  "theme": {
    "palette": "{{PALETTE_NAME}}",
    "fontFamily": "{{FONT_FAMILY}}",
    "primaryColor": "{{COLOR_NAME}}",
    "secondaryColor": "{{COLOR_NAME}}",
    "accentColor": "{{COLOR_NAME}}"
  },
  "defaultAuthenticatedPageId": "{{PAGE_UUID}}",
  "defaultUnauthenticatedPageId": "{{PAGE_UUID}}",
  "collections": [
    {
      "id": "{{COLLECTION_UUID}}",
      "name": "{{COLLECTION_NAME}}",
      "description": "{{DESCRIPTION}}",
      "fields": [
        {
          "key": "{{field_key}}",
          "label": "{{Field Label}}",
          "type": "{{FIELD_TYPE}}",
          "required": false,
          "defaultValue": null,
          "description": "{{FIELD_DESCRIPTION}}"
        }
      ]
    }
  ],
  "endpoints": [
    {
      "id": "{{ENDPOINT_UUID}}",
      "name": "{{ENDPOINT_NAME}}",
      "slug": "{{endpoint-slug}}",
      "method": "{{GET | POST | PUT | DELETE}}",
      "description": "{{DESCRIPTION}}",
      "agentId": "{{AGENT_UUID}}",
      "collectionId": "{{COLLECTION_UUID}}",
      "handlerType": "{{collection-crud | agent-action | workflow}}"
    }
  ],
  "connectors": [],
  "navSections": [
    {
      "id": "{{SECTION_UUID}}",
      "title": "{{SECTION_TITLE}}",
      "pages": [
        {
          "id": "{{PAGE_UUID}}",
          "name": "{{PAGE_NAME}}",
          "path": "{{/page-path}}",
          "icon": "{{ICON_NAME}}",
          "routeType": "{{authenticated | unauthenticated}}",
          "components": [
            {
              "id": "{{COMPONENT_UUID}}",
              "componentType": "{{COMPONENT_TYPE}}",
              "gridPosition": {
                "col": 1,
                "row": 1,
                "colSpan": 4,
                "rowSpan": 1
              },
              "props": {},
              "exampleData": {},
              "dataBinding": {
                "agentId": "{{AGENT_UUID}}",
                "actionId": "{{ACTION_UUID}}",
                "mappings": [
                  {
                    "componentProp": "{{PROP_NAME}}",
                    "responsePath": "{{data.path}}"
                  }
                ]
              },
              "events": [
                {
                  "id": "{{EVENT_UUID}}",
                  "type": "{{EVENT_TYPE}}",
                  "actions": [
                    {
                      "id": "{{ACTION_UUID}}",
                      "type": "{{ACTION_TYPE}}",
                      "config": {}
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  "pages": [],
  "billingProducts": [],
  "monitoring": {
    "posthogApiKey": "{{POSTHOG_KEY}}",
    "posthogHost": "{{POSTHOG_HOST}}",
    "googleAnalyticsId": "{{GA_ID}}"
  },
  "googleSignIn": {
    "enabled": false,
    "clientId": "{{GOOGLE_CLIENT_ID}}",
    "clientSecret": "{{GOOGLE_CLIENT_SECRET}}",
    "redirectUri": "{{REDIRECT_URI}}"
  },
  "llm": {
    "defaultModelId": "{{MODEL_ID}}"
  },
  "overrideConfig": {}
}
```

---

## Example 1: Minimal dashboard app

A simple web app with one authenticated page containing 4 KPI cards and a line
chart.

```json
{
  "appName": "Sales Dashboard",
  "appType": "web-app",
  "colorMode": "light",
  "theme": {
    "palette": "slate",
    "fontFamily": "inter",
    "primaryColor": "blue"
  },
  "defaultAuthenticatedPageId": "d1a2b3c4-0001-4000-a000-000000000001",
  "navSections": [
    {
      "id": "s1a2b3c4-0001-4000-a000-000000000001",
      "title": "Main",
      "pages": [
        {
          "id": "d1a2b3c4-0001-4000-a000-000000000001",
          "name": "Dashboard",
          "path": "/dashboard",
          "icon": "LayoutDashboard",
          "routeType": "authenticated",
          "components": [
            {
              "id": "c1a2b3c4-0001-4000-a000-000000000001",
              "componentType": "kpi-card",
              "gridPosition": { "col": 1, "row": 1, "colSpan": 1, "rowSpan": 1 },
              "props": { "title": "Revenue" },
              "exampleData": { "value": "$52,000", "change": "+8%", "trend": "up" }
            },
            {
              "id": "c1a2b3c4-0001-4000-a000-000000000002",
              "componentType": "kpi-card",
              "gridPosition": { "col": 2, "row": 1, "colSpan": 1, "rowSpan": 1 },
              "props": { "title": "Orders" },
              "exampleData": { "value": "1,245", "change": "+3%", "trend": "up" }
            },
            {
              "id": "c1a2b3c4-0001-4000-a000-000000000003",
              "componentType": "kpi-card",
              "gridPosition": { "col": 3, "row": 1, "colSpan": 1, "rowSpan": 1 },
              "props": { "title": "Customers" },
              "exampleData": { "value": "832", "change": "+15%", "trend": "up" }
            },
            {
              "id": "c1a2b3c4-0001-4000-a000-000000000004",
              "componentType": "kpi-card",
              "gridPosition": { "col": 4, "row": 1, "colSpan": 1, "rowSpan": 1 },
              "props": { "title": "Churn Rate" },
              "exampleData": { "value": "2.1%", "change": "-0.3%", "trend": "down" }
            },
            {
              "id": "c1a2b3c4-0001-4000-a000-000000000005",
              "componentType": "line-chart",
              "gridPosition": { "col": 1, "row": 2, "colSpan": 4, "rowSpan": 2 },
              "props": { "title": "Revenue Over Time" },
              "exampleData": {
                "data": [
                  { "label": "Jan", "value": 40000 },
                  { "label": "Feb", "value": 42000 },
                  { "label": "Mar", "value": 45000 },
                  { "label": "Apr", "value": 48000 },
                  { "label": "May", "value": 52000 }
                ]
              }
            }
          ]
        }
      ]
    }
  ],
  "pages": [
    {
      "id": "d1a2b3c4-0001-4000-a000-000000000001",
      "name": "Dashboard",
      "path": "/dashboard",
      "icon": "LayoutDashboard",
      "routeType": "authenticated",
      "components": []
    }
  ]
}
```

---

## Example 2: Minimal landing page

A landing page with navigation, hero section, features, call-to-action, and
footer.

```json
{
  "appName": "Acme SaaS",
  "appType": "landing-page",
  "colorMode": "light",
  "theme": {
    "palette": "coral",
    "fontFamily": "dm-sans",
    "primaryColor": "purple"
  },
  "defaultUnauthenticatedPageId": "d2a2b3c4-0001-4000-a000-000000000001",
  "navSections": [
    {
      "id": "s2a2b3c4-0001-4000-a000-000000000001",
      "title": "Public",
      "pages": [
        {
          "id": "d2a2b3c4-0001-4000-a000-000000000001",
          "name": "Home",
          "path": "/",
          "routeType": "unauthenticated",
          "components": [
            {
              "id": "c2a2b3c4-0001-4000-a000-000000000001",
              "componentType": "landing-nav",
              "gridPosition": { "col": 1, "row": 1, "colSpan": 4, "rowSpan": 1 },
              "props": {
                "ctaText": "Get Started",
                "loginText": "Sign In",
                "links": [
                  { "label": "Features", "href": "#features" },
                  { "label": "Pricing", "href": "#pricing" },
                  { "label": "FAQ", "href": "#faq" }
                ]
              },
              "events": [
                {
                  "id": "e2a2b3c4-0001-4000-a000-000000000001",
                  "type": "onClick",
                  "actions": [
                    {
                      "id": "a2a2b3c4-0001-4000-a000-000000000001",
                      "type": "navigate",
                      "config": { "path": "/signup" }
                    }
                  ]
                }
              ]
            },
            {
              "id": "c2a2b3c4-0001-4000-a000-000000000002",
              "componentType": "landing-hero",
              "gridPosition": { "col": 1, "row": 2, "colSpan": 4, "rowSpan": 2 },
              "props": {
                "title": "Build faster with Acme",
                "subtitle": "The all-in-one platform for modern teams.",
                "ctaText": "Start Free Trial",
                "badgeText": "Now in Beta"
              }
            },
            {
              "id": "c2a2b3c4-0001-4000-a000-000000000003",
              "componentType": "landing-feature",
              "gridPosition": { "col": 1, "row": 4, "colSpan": 4, "rowSpan": 2 },
              "props": {
                "title": "Everything you need",
                "subtitle": "Powerful features to accelerate your workflow.",
                "features": [
                  { "title": "Analytics", "description": "Real-time insights into your data." },
                  { "title": "Automation", "description": "Automate repetitive tasks with ease." },
                  { "title": "Collaboration", "description": "Work together seamlessly." }
                ]
              }
            },
            {
              "id": "c2a2b3c4-0001-4000-a000-000000000004",
              "componentType": "landing-cta",
              "gridPosition": { "col": 1, "row": 6, "colSpan": 4, "rowSpan": 1 },
              "props": {
                "title": "Ready to get started?",
                "ctaText": "Sign Up Free"
              }
            },
            {
              "id": "c2a2b3c4-0001-4000-a000-000000000005",
              "componentType": "landing-footer",
              "gridPosition": { "col": 1, "row": 7, "colSpan": 4, "rowSpan": 1 },
              "props": {
                "companyName": "Acme SaaS",
                "description": "Building the future of productivity.",
                "copyright": "2026 Acme SaaS. All rights reserved.",
                "links": [
                  { "label": "Privacy", "href": "/privacy" },
                  { "label": "Terms", "href": "/terms" }
                ]
              }
            }
          ]
        }
      ]
    }
  ],
  "pages": [
    {
      "id": "d2a2b3c4-0001-4000-a000-000000000001",
      "name": "Home",
      "path": "/",
      "routeType": "unauthenticated",
      "components": []
    }
  ]
}
```

---

## Example 3: Minimal auth flow

Login and signup pages for a web app.

```json
{
  "appName": "MyApp",
  "appType": "web-app",
  "colorMode": "light",
  "theme": {
    "palette": "ocean",
    "fontFamily": "inter",
    "primaryColor": "blue"
  },
  "defaultAuthenticatedPageId": "d3a2b3c4-0001-4000-a000-000000000003",
  "defaultUnauthenticatedPageId": "d3a2b3c4-0001-4000-a000-000000000001",
  "navSections": [
    {
      "id": "s3a2b3c4-0001-4000-a000-000000000001",
      "title": "Auth",
      "routeType": "unauthenticated",
      "pages": [
        {
          "id": "d3a2b3c4-0001-4000-a000-000000000001",
          "name": "Login",
          "path": "/login",
          "routeType": "unauthenticated",
          "components": [
            {
              "id": "c3a2b3c4-0001-4000-a000-000000000001",
              "componentType": "login-form",
              "gridPosition": { "col": 2, "row": 1, "colSpan": 2, "rowSpan": 3 },
              "props": {
                "title": "Welcome back",
                "subtitle": "Sign in to your account",
                "emailPlaceholder": "Email address",
                "passwordPlaceholder": "Password",
                "submitBtnText": "Sign In",
                "magicLinkText": "Sign in with magic link"
              }
            }
          ]
        },
        {
          "id": "d3a2b3c4-0001-4000-a000-000000000002",
          "name": "Sign Up",
          "path": "/signup",
          "routeType": "unauthenticated",
          "components": [
            {
              "id": "c3a2b3c4-0001-4000-a000-000000000010",
              "componentType": "signup-left-panel",
              "gridPosition": { "col": 1, "row": 1, "colSpan": 2, "rowSpan": 3 },
              "props": {
                "brandName": "MyApp",
                "quote": "The best tool I have ever used for my business.",
                "authorName": "Jane Smith",
                "authorRole": "CEO, TechCorp"
              }
            },
            {
              "id": "c3a2b3c4-0001-4000-a000-000000000011",
              "componentType": "signup-form",
              "gridPosition": { "col": 3, "row": 1, "colSpan": 2, "rowSpan": 3 },
              "props": {
                "title": "Create your account",
                "subtitle": "Get started in minutes",
                "firstNamePlaceholder": "First name",
                "lastNamePlaceholder": "Last name",
                "emailPlaceholder": "Email address",
                "passwordPlaceholder": "Create a password",
                "submitBtnText": "Create Account",
                "termsText": "By signing up, you agree to our Terms and Privacy Policy."
              }
            }
          ]
        }
      ]
    },
    {
      "id": "s3a2b3c4-0001-4000-a000-000000000002",
      "title": "App",
      "routeType": "authenticated",
      "pages": [
        {
          "id": "d3a2b3c4-0001-4000-a000-000000000003",
          "name": "Dashboard",
          "path": "/dashboard",
          "icon": "LayoutDashboard",
          "routeType": "authenticated",
          "components": [
            {
              "id": "c3a2b3c4-0001-4000-a000-000000000020",
              "componentType": "text",
              "gridPosition": { "col": 1, "row": 1, "colSpan": 4, "rowSpan": 1 },
              "props": { "content": "Welcome to your dashboard!" }
            }
          ]
        }
      ]
    }
  ],
  "pages": [
    {
      "id": "d3a2b3c4-0001-4000-a000-000000000001",
      "name": "Login",
      "path": "/login",
      "routeType": "unauthenticated",
      "components": []
    },
    {
      "id": "d3a2b3c4-0001-4000-a000-000000000002",
      "name": "Sign Up",
      "path": "/signup",
      "routeType": "unauthenticated",
      "components": []
    },
    {
      "id": "d3a2b3c4-0001-4000-a000-000000000003",
      "name": "Dashboard",
      "path": "/dashboard",
      "icon": "LayoutDashboard",
      "routeType": "authenticated",
      "components": []
    }
  ]
}
```
