---
name: component-landing
description: Landing page section components — landing-hero, landing-feature, landing-trust, landing-faq, landing-cta, landing-footer, landing-nav, landing-logos, landing-search-hero.
metadata:
  category: page-builder
  subcategory: landing
  componentTypes:
    - landing-nav
    - landing-hero
    - landing-search-hero
    - landing-logos
    - landing-feature
    - landing-trust
    - landing-faq
    - landing-cta
    - landing-footer
---

# Landing Page Components

Full-width section components for marketing and product landing pages. All components use `colSpan: 4` and stack vertically.

## Common Layout Pattern

```
landing-nav          (row 1,  rowSpan: 1)
landing-hero         (row 2,  rowSpan: 2)
landing-logos        (row 4,  rowSpan: 1)
landing-feature      (row 5,  rowSpan: 2)
landing-trust        (row 7,  rowSpan: 1)
landing-faq          (row 8,  rowSpan: 2)
landing-cta          (row 10, rowSpan: 1)
landing-footer       (row 11, rowSpan: 2)
```

---

## landing-nav

Top navigation bar with logo, links, and CTA button.

### Props — `LandingNavProps`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `logo` | `string` | no | Logo URL or identifier |
| `links` | `Array<{ label: string; url: string }>` | yes | Navigation links |
| `ctaText` | `string` | no | Primary CTA button text |
| `loginText` | `string` | no | Login link text |

### Grid Position

`colSpan: 4, rowSpan: 1`

### Example

```json
{
  "id": "landing-nav",
  "componentType": "landing-nav",
  "props": {
    "logo": "logo-acme",
    "links": [
      { "label": "Features", "url": "#features" },
      { "label": "Pricing", "url": "#pricing" },
      { "label": "Blog", "url": "/blog" }
    ],
    "ctaText": "Get Started Free",
    "loginText": "Sign In"
  },
  "gridPosition": { "col": 1, "row": 1, "colSpan": 4, "rowSpan": 1 }
}
```

---

## landing-hero

Primary hero section with headline, subtitle, CTA buttons, and optional stats.

### Props — `LandingHeroProps`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | yes | Main headline |
| `subtitle` | `string` | no | Supporting text |
| `ctaText` | `string` | no | Primary CTA button text |
| `demoText` | `string` | no | Secondary CTA text |
| `badgeText` | `string` | no | Badge/pill text above headline |
| `badgeIcon` | `string` | no | Badge icon |
| `stats` | `Array<{ label: string; value: string }>` | no | Social proof stats |

### Grid Position

`colSpan: 4, rowSpan: 2`

### Example

```json
{
  "id": "hero-main",
  "componentType": "landing-hero",
  "props": {
    "title": "Monitor Your Brand Across AI Platforms",
    "subtitle": "Track how AI assistants talk about your brand, identify gaps, and optimize your visibility.",
    "ctaText": "Start Free Trial",
    "demoText": "Watch Demo",
    "badgeText": "New: GPT-4o Support",
    "badgeIcon": "sparkles",
    "stats": [
      { "label": "Brands Monitored", "value": "2,400+" },
      { "label": "AI Platforms", "value": "12" },
      { "label": "Queries Tracked", "value": "1M+" }
    ]
  },
  "gridPosition": { "col": 1, "row": 2, "colSpan": 4, "rowSpan": 2 }
}
```

---

## landing-search-hero

Hero variant with a prominent search/analysis input.

### Props — `LandingSearchHeroProps`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | yes | Main headline |
| `placeholder` | `string` | yes | Search input placeholder |
| `analyzeBtnText` | `string` | yes | Analyze button label |
| `demoBtnText` | `string` | no | Secondary demo button |

### Grid Position

`colSpan: 4, rowSpan: 2`

### Example

```json
{
  "id": "hero-search",
  "componentType": "landing-search-hero",
  "props": {
    "title": "See How AI Talks About Your Brand",
    "placeholder": "Enter your brand or domain...",
    "analyzeBtnText": "Analyze Now",
    "demoBtnText": "Try Demo"
  },
  "gridPosition": { "col": 1, "row": 2, "colSpan": 4, "rowSpan": 2 }
}
```

---

## landing-logos

Logo cloud / social proof strip.

### Props — `LandingLogosProps`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | no | Section label |
| `logos` | `Array<{ name: string; url?: string; image?: string }>` | yes | Logo entries |

### Grid Position

`colSpan: 4, rowSpan: 1`

### Example

```json
{
  "id": "logos-trusted",
  "componentType": "landing-logos",
  "props": {
    "title": "Trusted by leading brands",
    "logos": [
      { "name": "Stripe", "image": "/logos/stripe.svg" },
      { "name": "Shopify", "image": "/logos/shopify.svg" },
      { "name": "HubSpot", "image": "/logos/hubspot.svg" },
      { "name": "Notion", "image": "/logos/notion.svg" }
    ]
  },
  "gridPosition": { "col": 1, "row": 4, "colSpan": 4, "rowSpan": 1 }
}
```

---

## landing-feature

Feature showcase section with optional image and metrics.

### Props — `LandingFeatureProps`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | yes | Section heading |
| `subtitle` | `string` | no | Section description |
| `features` | `Array<{ title: string; description: string; icon?: string }>` | no | Feature cards |
| `image` | `string` | no | Hero image URL |
| `metrics` | `Array<{ label: string; value: string; trend?: string }>` | no | Proof-point metrics |

### Grid Position

`colSpan: 4, rowSpan: 2`

### Example

```json
{
  "id": "features-section",
  "componentType": "landing-feature",
  "props": {
    "title": "Everything You Need to Win in AI Search",
    "subtitle": "Comprehensive tools for brand monitoring, content optimization, and competitive intelligence.",
    "features": [
      { "title": "Real-Time Monitoring", "description": "Track mentions across ChatGPT, Perplexity, Gemini and more.", "icon": "activity" },
      { "title": "Competitive Analysis", "description": "See how you stack up against competitors in AI responses.", "icon": "bar-chart-2" },
      { "title": "Content Optimization", "description": "Get AI-powered recommendations to improve your visibility.", "icon": "zap" }
    ],
    "metrics": [
      { "label": "Avg. Visibility Lift", "value": "+42%", "trend": "up" },
      { "label": "Time Saved Weekly", "value": "8 hrs" }
    ]
  },
  "gridPosition": { "col": 1, "row": 5, "colSpan": 4, "rowSpan": 2 }
}
```

---

## landing-trust

Trust / social proof section with partner logos.

### Props — `LandingTrustProps`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | no | Section heading |
| `logos` | `Array<{ name: string; url?: string }>` | yes | Trust logos |

### Grid Position

`colSpan: 4, rowSpan: 1`

### Example

```json
{
  "id": "trust-section",
  "componentType": "landing-trust",
  "props": {
    "title": "Backed by the best",
    "logos": [
      { "name": "Y Combinator", "url": "https://ycombinator.com" },
      { "name": "Sequoia", "url": "https://sequoiacap.com" }
    ]
  },
  "gridPosition": { "col": 1, "row": 7, "colSpan": 4, "rowSpan": 1 }
}
```

---

## landing-faq

Accordion FAQ section.

### Props — `LandingFAQProps`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | yes | Section heading |
| `subtitle` | `string` | no | Section description |
| `items` | `Array<{ question: string; answer: string }>` | yes | FAQ entries |

### Grid Position

`colSpan: 4, rowSpan: 2`

### Example

```json
{
  "id": "faq-section",
  "componentType": "landing-faq",
  "props": {
    "title": "Frequently Asked Questions",
    "subtitle": "Everything you need to know about our platform.",
    "items": [
      { "question": "How does AI brand monitoring work?", "answer": "We query major AI platforms with industry-relevant prompts and track how often and how accurately your brand is mentioned in responses." },
      { "question": "Which AI platforms do you support?", "answer": "We currently monitor ChatGPT, Perplexity, Gemini, Claude, and Copilot, with more platforms added regularly." },
      { "question": "Can I track competitors?", "answer": "Yes — add up to 10 competitors and compare share of voice, sentiment, and mention frequency across all platforms." }
    ]
  },
  "gridPosition": { "col": 1, "row": 8, "colSpan": 4, "rowSpan": 2 }
}
```

---

## landing-cta

Call-to-action banner section.

### Props — `LandingCTAProps`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | yes | CTA headline |
| `subtitle` | `string` | no | Supporting text |
| `ctaText` | `string` | yes | Primary button text |
| `secondaryCtaText` | `string` | no | Secondary button text |

### Grid Position

`colSpan: 4, rowSpan: 1`

### Example

```json
{
  "id": "cta-section",
  "componentType": "landing-cta",
  "props": {
    "title": "Ready to Own Your AI Narrative?",
    "subtitle": "Start monitoring your brand across AI platforms in minutes.",
    "ctaText": "Start Free Trial",
    "secondaryCtaText": "Schedule Demo"
  },
  "gridPosition": { "col": 1, "row": 10, "colSpan": 4, "rowSpan": 1 }
}
```

---

## landing-footer

Page footer with links, company info, and optional pre-footer block.

### Props — `LandingFooterProps`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `preFooterTitle` | `string` | no | Pre-footer section title |
| `preFooterText` | `string` | no | Pre-footer description |
| `companyName` | `string` | yes | Company name |
| `description` | `string` | no | Company tagline |
| `copyright` | `string` | no | Copyright text |
| `links` | `Array<{ category: string; items: Array<{ label: string; url: string }> }>` | no | Footer link columns |

### Grid Position

`colSpan: 4, rowSpan: 2`

### Example

```json
{
  "id": "footer-main",
  "componentType": "landing-footer",
  "props": {
    "preFooterTitle": "Start optimizing today",
    "preFooterText": "Join 2,400+ brands monitoring their AI presence.",
    "companyName": "Acme AI",
    "description": "AI brand monitoring and optimization platform.",
    "copyright": "2025 Acme AI, Inc. All rights reserved.",
    "links": [
      {
        "category": "Product",
        "items": [
          { "label": "Features", "url": "/features" },
          { "label": "Pricing", "url": "/pricing" },
          { "label": "Changelog", "url": "/changelog" }
        ]
      },
      {
        "category": "Company",
        "items": [
          { "label": "About", "url": "/about" },
          { "label": "Blog", "url": "/blog" },
          { "label": "Careers", "url": "/careers" }
        ]
      },
      {
        "category": "Legal",
        "items": [
          { "label": "Privacy", "url": "/privacy" },
          { "label": "Terms", "url": "/terms" }
        ]
      }
    ]
  },
  "gridPosition": { "col": 1, "row": 11, "colSpan": 4, "rowSpan": 2 }
}
```
