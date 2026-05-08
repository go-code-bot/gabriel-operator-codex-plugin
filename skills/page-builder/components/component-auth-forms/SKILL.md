---
name: component-auth-forms
description: Authentication and onboarding components — login-form, forgot-password-form, signup-form, signup-left-panel, onboarding-step.
metadata:
  category: page-builder
  subcategory: auth-forms
  componentTypes:
    - login-form
    - forgot-password-form
    - signup-form
    - signup-left-panel
    - onboarding-step
---

# Authentication & Onboarding Components

Components for login, registration, password recovery, and onboarding flows. Auth forms are typically arranged in a split layout (left panel + form).

## Common Layout Patterns

```
Login page:      signup-left-panel (col:1, colSpan:2) + login-form (col:3, colSpan:2)
Signup page:     signup-left-panel (col:1, colSpan:2) + signup-form (col:3, colSpan:2)
Onboarding:      onboarding-step (col:1, colSpan:4)
```

---

## login-form

Email/password login form with magic link and social auth support.

### Props — `LoginComponentProps`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | yes | Form heading |
| `subtitle` | `string` | yes | Form subheading |
| `emailPlaceholder` | `string` | yes | Email field placeholder |
| `passwordPlaceholder` | `string` | yes | Password field placeholder |
| `submitBtnText` | `string` | yes | Submit button label |
| `forgotPasswordText` | `string` | no | Forgot password link text |
| `magicLinkText` | `string` | no | Magic link option text |
| `termsText` | `string` | no | Terms & conditions text |
| `signUpText` | `string` | no | Sign-up redirect text |
| `logo` | `string` | no | Logo URL or identifier |

### Data Binding

Bindable props: `title`, `subtitle`, `emailPlaceholder`, `passwordPlaceholder`, `submitBtnText`, `magicLinkText`

### Events

Built-in events: `auth_login`, `auth_magic_link`

### Grid Position

Typical: `colSpan: 2, rowSpan: 2` (right side of split layout)

### Example

```json
{
  "id": "login-form",
  "componentType": "login-form",
  "props": {
    "title": "Welcome back",
    "subtitle": "Sign in to your account",
    "emailPlaceholder": "name@company.com",
    "passwordPlaceholder": "Enter your password",
    "submitBtnText": "Sign In",
    "forgotPasswordText": "Forgot password?",
    "magicLinkText": "Sign in with magic link",
    "termsText": "By signing in, you agree to our Terms of Service.",
    "signUpText": "Don't have an account? Sign up",
    "logo": "logo-acme"
  },
  "gridPosition": { "col": 3, "row": 1, "colSpan": 2, "rowSpan": 2 }
}
```

---

## forgot-password-form

Password reset request form.

### Props — `ForgotPasswordComponentProps`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | yes | Form heading |
| `subtitle` | `string` | yes | Form subheading |
| `emailPlaceholder` | `string` | yes | Email field placeholder |
| `submitBtnText` | `string` | yes | Submit button label |
| `backToSignInText` | `string` | yes | Back navigation text |
| `termsText` | `string` | yes | Terms text |
| `signUpText` | `string` | yes | Sign-up link text |

### Grid Position

Typical: `colSpan: 2, rowSpan: 2`

### Example

```json
{
  "id": "forgot-password-form",
  "componentType": "forgot-password-form",
  "props": {
    "title": "Reset your password",
    "subtitle": "Enter your email and we'll send you a reset link.",
    "emailPlaceholder": "name@company.com",
    "submitBtnText": "Send Reset Link",
    "backToSignInText": "Back to sign in",
    "termsText": "By continuing, you agree to our Terms of Service.",
    "signUpText": "Don't have an account? Sign up"
  },
  "gridPosition": { "col": 3, "row": 1, "colSpan": 2, "rowSpan": 2 }
}
```

---

## signup-form

User registration form.

### Props — `SignUpComponentProps`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | yes | Form heading |
| `subtitle` | `string` | yes | Form subheading |
| `firstNamePlaceholder` | `string` | yes | First name placeholder |
| `lastNamePlaceholder` | `string` | yes | Last name placeholder |
| `emailPlaceholder` | `string` | yes | Email placeholder |
| `passwordPlaceholder` | `string` | yes | Password placeholder |
| `submitBtnText` | `string` | yes | Submit button label |
| `termsText` | `string` | yes | Terms text |
| `signInText` | `string` | yes | Sign-in redirect text |

### Grid Position

Typical: `colSpan: 2, rowSpan: 2`

### Example

```json
{
  "id": "signup-form",
  "componentType": "signup-form",
  "props": {
    "title": "Create your account",
    "subtitle": "Start your free trial today.",
    "firstNamePlaceholder": "First name",
    "lastNamePlaceholder": "Last name",
    "emailPlaceholder": "name@company.com",
    "passwordPlaceholder": "Create a password",
    "submitBtnText": "Create Account",
    "termsText": "By signing up, you agree to our Terms of Service and Privacy Policy.",
    "signInText": "Already have an account? Sign in"
  },
  "gridPosition": { "col": 3, "row": 1, "colSpan": 2, "rowSpan": 2 }
}
```

---

## signup-left-panel

Branded panel for the left side of a split auth layout.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `logoFallbackText` | `string` | no | Fallback text if logo unavailable |
| `brandName` | `string` | yes | Brand name display |
| `quote` | `string` | yes | Testimonial or tagline quote |
| `authorName` | `string` | yes | Quote attribution name |
| `authorRole` | `string` | no | Quote attribution role |
| `footerLeftText` | `string` | no | Bottom-left text |
| `footerRightText` | `string` | no | Bottom-right text |

### Grid Position

Typical: `colSpan: 2, rowSpan: 2` (left side of split layout)

### Example

```json
{
  "id": "signup-left-panel",
  "componentType": "signup-left-panel",
  "props": {
    "brandName": "Acme AI",
    "quote": "Acme AI helped us increase our brand visibility in AI search results by 3x in just two months.",
    "authorName": "Sarah Chen",
    "authorRole": "VP of Marketing, TechCorp",
    "footerLeftText": "Trusted by 2,400+ brands",
    "footerRightText": "SOC 2 Compliant"
  },
  "gridPosition": { "col": 1, "row": 1, "colSpan": 2, "rowSpan": 2 }
}
```

---

## onboarding-step

Full-width onboarding wizard step with progress, brand setup, and status indicators.

### Props — `OnboardingStepProps`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | yes | Step heading |
| `subtitle` | `string` | yes | Step description |
| `brandName` | `string` | no | Brand being configured |
| `brandWebsite` | `string` | no | Brand website URL |
| `mainTitle` | `string` | no | Main content title |
| `mainDescription` | `string` | no | Main content description |
| `generatingStatus` | `string` | no | Progress status message |
| `successTitle` | `string` | no | Completion title |
| `successDescription` | `string` | no | Completion description |
| `copyright` | `string` | no | Footer copyright |
| `trustText` | `string` | no | Trust badge text |

### Grid Position

Typical: `colSpan: 4, rowSpan: 3`

### Example

```json
{
  "id": "onboarding-step-1",
  "componentType": "onboarding-step",
  "props": {
    "title": "Set Up Your Brand",
    "subtitle": "Tell us about your brand so we can start monitoring.",
    "brandName": "Acme Corp",
    "brandWebsite": "https://acme.com",
    "mainTitle": "Analyzing Your Brand",
    "mainDescription": "We're scanning AI platforms to find existing mentions of your brand.",
    "generatingStatus": "Scanning ChatGPT, Perplexity, Gemini...",
    "successTitle": "Brand Profile Created",
    "successDescription": "We found 245 mentions across 8 AI platforms.",
    "copyright": "2025 Acme AI",
    "trustText": "Your data is encrypted and secure"
  },
  "gridPosition": { "col": 1, "row": 1, "colSpan": 4, "rowSpan": 3 }
}
```
