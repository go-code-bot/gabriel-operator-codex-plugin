# Component Registry — Quick Reference

All 68 component types with their category skill, required props, and
data binding / event support.

---

## Charts (component-charts)

| componentType | Required Props | Supports DataBinding | Supports Events |
|---|---|---|---|
| `kpi-card` | title(string), value(string) | Yes | No |
| `line-chart` | title(string), data(array) | Yes | No |
| `area-chart` | title(string), data(array) | Yes | No |
| `bar-chart` | title(string), data(array) | Yes | No |
| `donut-chart` | title(string), centerValue(number), segments(array) | Yes | No |

### Optional props

- **kpi-card**: subtitle?(string), change?(string), trend?(string), icon?(string)
- **line-chart**: (none beyond required)
- **area-chart**: (none beyond required)
- **bar-chart**: (none beyond required)
- **donut-chart**: tableRows?(array)

---

## Tables (component-tables)

| componentType | Required Props | Supports DataBinding | Supports Events |
|---|---|---|---|
| `table` | title(string), rows(array) | Yes | No |
| `ranking-table` | title(string), rows(array) | Yes | No |
| `pages-table` | columns(array), rows(array) | Yes | No |
| `queries-table` | title(string), rows(array) | Yes | No |
| `tracked-topics-table` | title(string), topics(array) | Yes | No |
| `clients-table` | clients(array) | Yes | No |

### Optional props

- **table**: headers?(array)
- **ranking-table**: mainValue?(string)
- **queries-table**: queryCount?(number)

---

## Content (component-content)

| componentType | Required Props | Supports DataBinding | Supports Events |
|---|---|---|---|
| `text` | content(string) | Yes | No |
| `article-list` | title(string), columns(array), rows(array) | Yes | Yes |
| `article-editor` | title(string), steps(array), outline(array) | Yes | Yes |
| `data-list` | (none required) | Yes | No |

### Optional props

- **data-list**: suggestedCompetitors?(array), items?(array)

---

## AI Analytics (component-ai-analytics)

| componentType | Required Props | Supports DataBinding | Supports Events |
|---|---|---|---|
| `ai-mentions` | platforms(array) | Yes | Yes |
| `header-summary` | title(string) | Yes | No |
| `header-chart` | centerValue(string) | Yes | No |
| `insights-list` | items(array) | Yes | No |
| `actions-list` | items(array) | Yes | No |
| `brand-profile` | location(string), context(string) | Yes | No |
| `competitors-manager` | competitors(array) | Yes | No |
| `entity-mapper` | entities(array) | Yes | No |
| `writing-style-guide` | style(string) | Yes | No |
| `knowledge-sources` | (none required) | Yes | No |
| `sentiment-bar` | totalMentions(number), segments(array) | Yes | No |
| `share-of-voice-chart` | mainValue(string), brands(array) | Yes | No |
| `metric-bars` | values(array) | Yes | No |
| `response-history` | responseContent(string) | Yes | No |
| `status-tags` | tags(array) | Yes | No |

### Optional props

- **ai-mentions**: title?(string), subtitle?(string), chartData?(array)
- **header-summary**: description?(string)
- **header-chart**: progress?(number)
- **insights-list**: title?(string), subtitle?(string)
- **actions-list**: title?(string), subtitle?(string)
- **brand-profile**: reach?(array), language?(string)
- **writing-style-guide**: instructions?(array)
- **knowledge-sources**: stats?(object), files?(array)
- **sentiment-bar**: title?(string)
- **share-of-voice-chart**: title?(string)
- **metric-bars**: title?(string)
- **response-history**: title?(string), subtitle?(string)

---

## Navigation and Layout (component-nav-layout)

| componentType | Required Props | Supports DataBinding | Supports Events |
|---|---|---|---|
| `sidebar` | (none required) | Yes | Yes |
| `dashboard-header` | (none required) | No | No |
| `header-actions` | (none required) | No | No |
| `filter-bar` | (none required) | Yes | No |

### Optional props

- **sidebar**: title?(string), links?(array), agentName?(string), appLogo?(string), memberCount?(number)
- **filter-bar**: filters?(array)

---

## Landing Page (component-landing)

| componentType | Required Props | Supports DataBinding | Supports Events |
|---|---|---|---|
| `landing-hero` | title(string) | Yes | Yes |
| `landing-feature` | title(string) | Yes | Yes |
| `landing-trust` | (none required) | Yes | No |
| `landing-faq` | title(string) | Yes | No |
| `landing-cta` | title(string), ctaText(string) | Yes | Yes |
| `landing-footer` | companyName(string) | Yes | Yes |
| `landing-nav` | (none required) | Yes | Yes |
| `landing-logos` | (none required) | Yes | No |
| `landing-search-hero` | title(string) | Yes | No |

### Optional props

- **landing-hero**: subtitle?(string), badgeText?(string), badgeIcon?(string), ctaText?(string), demoText?(string)
- **landing-feature**: subtitle?(string), features?(array)
- **landing-trust**: title?(string), trustItems?(array)
- **landing-faq**: subtitle?(string), questions?(array)
- **landing-footer**: preFooterTitle?(string), preFooterText?(string), description?(string), copyright?(string), links?(array)
- **landing-nav**: logo?(string), links?(array), ctaText?(string), loginText?(string)
- **landing-logos**: title?(string), logos?(array)
- **landing-search-hero**: placeholder?(string), analyzeBtnText?(string)

---

## Auth Forms (component-auth-forms)

| componentType | Required Props | Supports DataBinding | Supports Events |
|---|---|---|---|
| `login-form` | title(string) | Yes | No (auth events built-in) |
| `forgot-password-form` | title(string) | Yes | No |
| `signup-form` | title(string) | Yes | No |
| `signup-left-panel` | brandName(string), quote(string), authorName(string) | Yes | No |
| `onboarding-step` | title(string) | Yes | No |

### Optional props

- **login-form**: subtitle?(string), emailPlaceholder?(string), passwordPlaceholder?(string), submitBtnText?(string), magicLinkText?(string)
- **forgot-password-form**: subtitle?(string), emailPlaceholder?(string), submitBtnText?(string), backToSignInText?(string), termsText?(string)
- **signup-form**: subtitle?(string), firstNamePlaceholder?(string), lastNamePlaceholder?(string), emailPlaceholder?(string), passwordPlaceholder?(string), submitBtnText?(string), termsText?(string)
- **signup-left-panel**: logoFallbackText?(string), authorRole?(string), footerLeftText?(string), footerRightText?(string)
- **onboarding-step**: subtitle?(string), brandName?(string), brandWebsite?(string), mainTitle?(string), mainDescription?(string), generatingStatus?(string), successTitle?(string), successDescription?(string), copyright?(string), trustText?(string)

---

## Actions UI (component-actions-ui)

| componentType | Required Props | Supports DataBinding | Supports Events |
|---|---|---|---|
| `button` | label(string) | Yes | Yes |
| `link` | label(string), href(string) | Yes | No |
| `action-card` | title(string) | Yes | Yes |
| `quick-action-card` | title(string) | Yes | Yes |
| `project-card` | name(string) | Yes | No |
| `card` | (none required) | Yes | No |
| `modal` | (none required) | Yes | No |
| `form-group` | (none required) | Yes | No |

### Optional props

- **button**: disabled?(string)
- **action-card**: icon?(string)
- **quick-action-card**: icon?(string)
- **project-card**: domain?(string), logo?(string), visibility?(number), articlesCreated?(number), hoursSaved?(number), openIssues?(number), issueResolution?(number)
- **card**: title?(string), subtitle?(string), content?(string), icon?(string), image?(string), items?(array)
- **modal**: title?(string), content?(string), submitLabel?(string)
- **form-group**: title?(string), description?(string)

---

## Integrations (component-integrations)

| componentType | Required Props | Supports DataBinding | Supports Events |
|---|---|---|---|
| `connect-integration` | title(string), description(string), buttonText(string) | Yes | Yes |
| `connect-banner` | title(string), description(string), actionLabel(string) | Yes | No |
| `connections-manager` | (none required) | Yes | No |
| `account-info-form` | (none required) | Yes | No |

### Optional props

- **connect-integration**: integrationType?(string)
- **connections-manager**: trafficSource?(object), destinations?(array)
- **account-info-form**: businessName?(string), photo?(string), address?(object)

---

## Health Audit (component-health-audit)

| componentType | Required Props | Supports DataBinding | Supports Events |
|---|---|---|---|
| `health-gauges` | items(array) | Yes | No |
| `health-gauge` | value(number) | Yes | No |
| `web-vitals` | metrics(array) | Yes | No |
| `audit-issues` | issues(array) | Yes | No |
| `page-audit-header` | title(string), url(string), scores(array) | Yes | No |

### Optional props

- **health-gauge**: label?(string), info?(string)

---

## Topics (component-topics)

| componentType | Required Props | Supports DataBinding | Supports Events |
|---|---|---|---|
| `topic-list` | title(string), items(array), type(string) | Yes | Yes |
| `platform-performance` | mainValue(string), platforms(array) | Yes | Yes |

### Optional props

- **platform-performance**: title?(string)
