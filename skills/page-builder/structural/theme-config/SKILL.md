---
name: theme-config
description: Configure themes, color palettes, fonts, and visual appearance for Page Builder apps.
metadata:
  category: structural
  system: page-builder
  version: 1.0.0
  dependencies: []
---

# Theme Configuration

Configure colors, fonts, palettes, and visual themes for Page Builder applications.

## Core Interfaces

### ThemeConfig

Controls colors and fonts for the application.

```typescript
interface ThemeConfig {
  palette?: ThemePaletteName;
  fontFamily?: ThemeFontFamily;
  primaryColor: ThemeColorName;       // Required
  secondaryColor?: ThemeColorName;
  accentColor?: ThemeColorName;
}
```

### ThemePaletteName

Predefined color palette presets.

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

Individual color values used for `primaryColor`, `secondaryColor`, and `accentColor`.

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

### PageTheme

Determines which sidebar variant and template set are available. This is a separate concept from `ThemeConfig`.

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

### ColorMode

```typescript
type ColorMode = 'light' | 'dark' | 'system';
```

## ThemeConfig vs PageTheme

These are two distinct concepts:

| Concept | Purpose | Field on PageBuilderConfig |
|---------|---------|---------------------------|
| `ThemeConfig` | Controls colors and fonts (visual styling) | `theme` |
| `PageTheme` | Selects which templates and sidebar variant to use | `pageTheme` |

A `pageTheme` of `'property-management'` uses property management templates and sidebar, while `theme.primaryColor` of `'blue'` makes the primary color blue. They are independent.

## JSON Examples

### Professional SaaS (Ocean Palette)

```json
{
  "theme": {
    "palette": "ocean",
    "fontFamily": "inter",
    "primaryColor": "blue",
    "secondaryColor": "slate",
    "accentColor": "teal"
  },
  "pageTheme": "aeo",
  "colorMode": "light"
}
```

### Dark Analytics Dashboard

```json
{
  "theme": {
    "palette": "slate",
    "fontFamily": "dm-sans",
    "primaryColor": "purple",
    "secondaryColor": "gray",
    "accentColor": "pink"
  },
  "pageTheme": "aeo",
  "colorMode": "dark"
}
```

### Property Management App

```json
{
  "theme": {
    "palette": "forest",
    "fontFamily": "poppins",
    "primaryColor": "green",
    "secondaryColor": "stone",
    "accentColor": "emerald"
  },
  "pageTheme": "property-management",
  "colorMode": "light"
}
```

### Custom Palette (Branding Override)

```json
{
  "theme": {
    "palette": "custom",
    "fontFamily": "outfit",
    "primaryColor": "maroon",
    "secondaryColor": "stone",
    "accentColor": "red"
  },
  "pageTheme": "funding-tool",
  "colorMode": "system"
}
```

### Minimal Config (Only Required Fields)

```json
{
  "theme": {
    "primaryColor": "indigo"
  }
}
```

## Gotchas

1. **`primaryColor` is required** -- it is the only non-optional field in `ThemeConfig`. All other fields have defaults or are optional.
2. **Palette presets override individual colors** -- when a named palette (e.g., `"ocean"`) is set, it provides a coordinated set of colors. Setting `palette: "custom"` allows full control over individual color fields.
3. **`pageTheme` is not the same as `theme`** -- `pageTheme` controls template availability and sidebar variant; `theme` controls visual colors/fonts. They must be set independently.
4. **`colorMode` defaults to `'light'`** if not specified. The `'system'` option follows the user's OS preference.
5. **Font availability** -- all listed fonts are bundled. `'system'` uses the OS default font stack.
6. **Changing `pageTheme` changes available templates** -- each `pageTheme` has its own set of `TEMPLATE_OPTIONS`. Templates from one theme are not valid in another.
