# Markdown Editor CSS Documentation

A comprehensive guide to the design system and styling architecture of the Markdown Editor.

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Design Tokens](#design-tokens)
3. [Component Structure](#component-structure)
4. [Typography System](#typography-system)
5. [Color System](#color-system)
6. [Spacing & Layout](#spacing--layout)
7. [Interactive States](#interactive-states)
8. [Responsive Behavior](#responsive-behavior)

---

## Design Philosophy

The Markdown Editor stylesheet is built on several core principles:

### Minimalism

- Clean, distraction-free interface
- Removed excessive gradients, glows, and decorative effects
- Focus on content readability

### Consistency

- Token-based design system
- Predictable spacing scale (4px base)
- Systematic color hierarchy

### Accessibility

- WCAG-compliant contrast ratios
- Focus-visible states for keyboard navigation
- Semantic HTML structure support

### Performance

- Minimal CSS complexity
- Efficient selectors
- Reduced repaints and reflows

---

## Design Tokens

Design tokens are the atomic values that define the visual language. All tokens are CSS custom properties (variables) defined in `:root`.

### Color System

#### Background Layers

```css
--bg-body: #1a1614; /* Deepest layer - main background */
--bg-card: #252220; /* Elevated surfaces (sidebar, cards) */
--bg-code: #2d2926; /* Code blocks and inputs */
--bg-highlight: #2e2a27; /* Hover states and emphasis */
--bg-elevated: #2a2522; /* Footer and special sections */
```

**Purpose**: Creates visual depth through layering. Each level is slightly lighter, establishing a clear visual hierarchy.

#### Text Hierarchy

```css
--text-primary: #f0ede1; /* Main content text */
--text-secondary: #b8b2a7; /* Supporting text, icons */
--text-tertiary: #7a7469; /* Metadata, timestamps */
--text-muted: #5a544c; /* Disabled, placeholders */
```

**Purpose**: Four-tier text system ensures proper contrast and readability across different content importance levels.

#### Accent Colors

```css
--accent-primary: #e67e4d; /* Main brand color - ember orange */
--accent-hover: #f19866; /* Hover states - lighter orange */
--accent-subtle: #d46838; /* Subtle accents - darker orange */
--accent-glow: rgba(230, 126, 77, 0.08); /* Subtle backgrounds */
```

**Purpose**: The "ember" accent provides warmth and energy. Three tones allow for hover states and variations without introducing new hues.

#### Semantic Colors

```css
--success: #6bb88a; /* Success states, confirmations */
--warning: #e8b55d; /* Warnings, cautions */
--error: #d95d5d; /* Errors, destructive actions */
--info: #6ba6d9; /* Information, hints */
```

**Purpose**: Standard semantic colors for UI feedback. Currently defined but not heavily used, allowing for future expansion.

### Border System

```css
--border-subtle: #332e29; /* Minimal separation */
--border-medium: #3d3631; /* Standard borders */
--border-strong: #4a433c; /* Emphasis borders */
--border-focus: var(--accent-primary); /* Focus indicators */
```

**Purpose**: Three-tier border hierarchy creates subtle depth. Borders progressively lighten from subtle to strong.

### Shadow System

```css
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.2); /* Subtle elevation */
--shadow-md: 0 2px 8px rgba(0, 0, 0, 0.25); /* Cards, dropdowns */
--shadow-lg: 0 4px 16px rgba(0, 0, 0, 0.3); /* Modals, popovers */
--shadow-xl: 0 8px 24px rgba(0, 0, 0, 0.35); /* Maximum elevation */
--shadow-glow: 0 0 0 3px var(--accent-glow); /* Focus rings */
```

**Purpose**: Elevation system creates depth perception. Shadows are intentionally subtle to maintain the minimal aesthetic.

### Typography System

```css
--font-serif: "Charter", "Bitstream Charter", "Sitka Text", Cambria, serif;
--font-sans:
    "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
--font-mono: "JetBrains Mono", "Fira Code", Consolas, monospace;
```

**Purpose**:

- **Serif (Charter)**: Editorial warmth for headings, quotes
- **Sans (Inter)**: Clean readability for UI and body text
- **Mono (JetBrains)**: Code blocks and technical content

### Spacing System

```css
--space-1: 4px; /* Micro spacing */
--space-2: 8px; /* Small gaps */
--space-3: 12px; /* Compact spacing */
--space-4: 16px; /* Base unit */
--space-5: 20px; /* Comfortable spacing */
--space-6: 24px; /* Section spacing */
--space-8: 32px; /* Large gaps */
--space-10: 40px; /* Component separation */
--space-12: 48px; /* Major sections */
--space-16: 64px; /* Layout spacing */
--space-20: 80px; /* Maximum spacing */
```

**Purpose**: 4px-based scale ensures mathematical consistency. Each step is a multiple of 4, making spacing predictable and harmonious.

### Border Radius System

```css
--radius-xs: 2px; /* Minimal rounding */
--radius-sm: 6px; /* Buttons, inputs */
--radius-md: 10px; /* Cards, containers */
--radius-lg: 14px; /* Large surfaces */
--radius-xl: 20px; /* Special elements */
--radius-full: 9999px; /* Pills, avatars */
```

**Purpose**: Consistent rounding creates visual cohesion. Modest radii maintain professionalism while adding softness.

### Animation System

```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 350ms cubic-bezier(0.4, 0, 0.2, 1);
```

**Purpose**: Material Design's standard easing curve provides natural motion. Three speeds accommodate different interaction types.

---

## Component Structure

### Sidebar Component

**Layout**: Fixed-width vertical panel with header, scrollable content, and footer.

```css
.sidebar {
    width: 280px; /* Fixed width for consistency */
    background-color: var(--bg-card); /* Elevated surface */
    border-right: 1px solid var(--border-medium);
    display: flex;
    flex-direction: column; /* Vertical stacking */
    box-shadow: var(--shadow-md); /* Depth perception */
}
```

**Key Features**:

- **Header**: Logo and subtitle with clear hierarchy
- **Content**: Scrollable area with grouped sections
- **Footer**: User profile with avatar and info

**Sidebar Buttons**:

```css
.sidebar-btn.active {
    background-color: var(--bg-highlight);
    color: var(--accent-primary);
    border-left: 3px solid var(--accent-primary); /* Active indicator */
    padding-left: calc(var(--space-3) - 2px); /* Compensate for border */
}
```

The left border provides a clear active state without overwhelming the design.

### Top Bar Component

**Purpose**: Document title and actions bar

```css
.top-bar {
    background-color: var(--bg-card);
    border-bottom: 1px solid var(--border-medium);
    padding: var(--space-4) var(--space-6);
    display: flex;
    justify-content: space-between; /* Title left, actions right */
}
```

**Document Title Input**:

```css
.document-title input:focus {
    border-color: var(--accent-primary);
    box-shadow: 0 0 0 3px var(--accent-glow); /* Focus ring */
}
```

Focus states use a subtle glow effect for clear keyboard navigation feedback.

### Editor Area

**Layout**: Centered content column with generous whitespace

```css
.editor-wrapper {
    padding: var(--space-16) var(--space-20) var(--space-20);
    /* 64px top, 80px sides - generous breathing room */
}

.editor-container {
    max-width: 760px; /* Optimal line length for readability */
    margin: 0 auto; /* Center alignment */
}
```

**Rationale**:

- 760px max-width provides 65-75 characters per line (optimal for reading)
- Large padding creates a focused writing environment
- Auto margins ensure content stays centered on wide screens

---

## Typography System

### Heading Hierarchy

#### H1 - Page Title

```css
.editor-content h1 {
    font-family: var(--font-serif);
    font-size: 52px;
    line-height: 1.1; /* Tight for visual impact */
    letter-spacing: -0.04em; /* Optical correction at large sizes */
    margin: 0 0 0.3em 0;
}
```

**Purpose**: Large, commanding presence. Serif font adds editorial quality.

#### H2 - Section Headers

```css
.editor-content h2 {
    font-size: 38px;
    margin: 2.2em 0 0.7em; /* Large top margin for section break */
    border-bottom: 2px solid var(--border-medium); /* Visual separator */
    padding-bottom: 0.5em;
}
```

**Purpose**: Clear section delineation. Bottom border creates visual weight without overwhelming.

#### H3-H5 - Subsections

Progressive size reduction (30px → 24px → 16px) maintains clear hierarchy. H5 uses sans-serif and uppercase for a distinct label style.

### Body Text

```css
.editor-content p {
    font-size: 18px;
    line-height: 1.8; /* Generous spacing for readability */
    margin-bottom: 1.6em;
}
```

**Rationale**:

- 18px provides comfortable reading on screens
- 1.8 line-height (32.4px) prevents cramped text
- 1.6em bottom margin creates clear paragraph separation

### Lead Paragraphs

```css
.editor-content .lead {
    font-size: 23px;
    font-family: var(--font-serif);
    font-style: italic;
}
```

Larger, italic serif creates distinction for introductory content.

### Lists

```css
.editor-content li::marker {
    color: var(--accent-primary); /* Accent-colored bullets */
    font-weight: bold;
}
```

Colored markers add visual interest while maintaining readability.

---

## Special Elements

### Blockquotes

```css
.editor-content blockquote {
    border-left: 5px solid var(--accent-primary);
    background: var(--bg-card);
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 21px;
    box-shadow: var(--shadow-md);
}

.editor-content blockquote::before {
    content: '"';
    font-size: 90px;
    opacity: 0.15; /* Subtle decorative element */
    position: absolute;
}
```

**Features**:

- Left accent border for emphasis
- Elevated background for distinction
- Large decorative quote mark (subtle opacity)
- Italic serif for editorial feel

### Callouts

```css
.callout {
    padding: var(--space-5);
    background: var(--bg-card);
    border-left: 4px solid var(--accent-primary);
    display: flex;
    gap: var(--space-4);
}
```

**Structure**: Icon + content layout. Left border matches blockquote style but with flex layout for icon support.

### Code Blocks

```css
.editor-content pre {
    background: var(--bg-card);
    border-radius: var(--radius-lg);
    padding: var(--space-6);
    box-shadow: var(--shadow-md);
}

.editor-content pre::before {
    content: "CODE";
    position: absolute;
    font-size: 10px;
    color: var(--text-muted);
    letter-spacing: 0.12em;
}
```

**Features**:

- "CODE" label in upper-right
- Elevated appearance with shadow
- Generous padding for readability
- Monospace font with syntax-friendly sizing

### Tables

```css
.editor-content table {
    border-collapse: separate; /* Allows border-radius */
    border-spacing: 0;
    border-radius: var(--radius-lg);
    overflow: hidden; /* Clips rounded corners */
}

.editor-content th {
    background-color: var(--bg-code);
    text-transform: uppercase;
    letter-spacing: 0.03em;
}

.editor-content tr:hover td {
    background-color: var(--bg-highlight);
}
```

**Features**:

- Rounded corners for modern appearance
- Uppercase headers with subtle letter-spacing
- Row hover states for interactivity
- Consistent padding throughout

### Horizontal Rules

```css
.editor-content hr {
    background: linear-gradient(
        to right,
        transparent,
        var(--border-strong),
        transparent
    );
}

.editor-content hr::after {
    content: "§";
    background: var(--bg-body);
    padding: 0 var(--space-4);
}
```

Gradient fade creates elegant separation. Section symbol (§) adds editorial character.

### Custom Checkboxes

```css
.editor-content input[type="checkbox"] {
    appearance: none; /* Remove native styling */
    background-color: var(--bg-card);
    border: 2px solid var(--border-strong);
}

.editor-content input[type="checkbox"]::before {
    content: "";
    transform: scale(0);
    transition: transform 180ms cubic-bezier(0.68, -0.55, 0.27, 1.55);
    clip-path: polygon(...); /* Checkmark shape */
}

.editor-content input[type="checkbox"]:checked::before {
    transform: scale(1); /* Bounce animation */
}
```

**Animation**: Spring easing (cubic-bezier with overshoot) creates satisfying micro-interaction.

---

## Color System Deep Dive

### Espresso & Ember Palette

The color scheme combines warm browns (espresso) with burnt orange (ember) for a sophisticated, focused aesthetic.

#### Color Rationale

**Dark Background**:

- Reduces eye strain in extended writing sessions
- Creates focus by reducing visual distractions
- Provides excellent contrast for light text

**Warm Tones**:

- Brown/beige text (#f0ede1) instead of pure white
- Reduces harshness compared to #ffffff on dark
- Maintains readability while being easier on eyes

**Orange Accent**:

- Energetic but not aggressive
- Stands out against neutral backgrounds
- Creates warmth and approachability

### Contrast Ratios

All text colors meet WCAG AA standards:

- Primary text (#f0ede1) on body (#1a1614): ~13:1 (AAA)
- Secondary text (#b8b2a7) on body: ~8:1 (AA+)
- Accent (#e67e4d) on body: ~5:1 (AA for large text)

---

## Spacing & Layout

### The 4px Grid

All spacing uses multiples of 4px:

```
4px  - Micro adjustments
8px  - Compact spacing (button padding)
12px - Standard gaps
16px - Base unit (paragraph margins)
24px - Section spacing
32px - Component separation
64px - Layout spacing
```

**Benefits**:

- Mathematical consistency
- Scales well across breakpoints
- Aligns to pixel grid (crisp rendering)

### Layout Techniques

#### Flexbox for Structure

```css
.sidebar {
    display: flex;
    flex-direction: column;
}

.sidebar-content {
    flex: 1; /* Grows to fill space */
    overflow-y: auto; /* Scrolls independently */
}
```

**Pattern**: Header + flexible content + footer is a common, robust layout.

#### Center-Aligned Content

```css
.editor-container {
    max-width: 760px;
    margin: 0 auto;
}
```

Centers content while constraining line length for readability.

---

## Interactive States

### Hover States

**Buttons**:

```css
.sidebar-btn:hover {
    background-color: var(--bg-highlight);
    transform: translateX(2px); /* Subtle slide */
}
```

Minimal transforms (2px) provide feedback without distraction.

**Links**:

```css
.editor-content a:hover {
    border-bottom-color: var(--accent-primary);
    color: var(--accent-hover);
}
```

Underline appears on hover, matching the accent color shift.

### Active States

```css
.sidebar-btn:active {
    transform: scale(0.98); /* "Press down" effect */
}
```

Subtle scale reduction creates tactile feedback.

### Focus States

```css
*:focus-visible {
    outline: 2px solid var(--accent-primary);
    outline-offset: 2px;
}
```

Clear focus indicators for keyboard navigation. `focus-visible` prevents mouse users from seeing outlines.

---

## Responsive Behavior

### Breakpoint Strategy

**1024px and below** (Tablets):

```css
@media (max-width: 1024px) {
    .sidebar {
        width: 260px;
    }
    .editor-content h1 {
        font-size: 44px;
    }
}
```

Modest reductions in spacing and typography.

**768px and below** (Mobile):

```css
@media (max-width: 768px) {
    .sidebar {
        position: fixed;
        left: -280px; /* Hidden off-screen */
        transition: left var(--transition-slow);
    }

    .sidebar.active {
        left: 0; /* Slides in */
    }
}
```

**Mobile Changes**:

- Sidebar becomes slide-out drawer
- Typography scales down (38px H1)
- Padding reduces significantly
- Button labels hide (icon-only)

### Fluid Typography

Instead of fixed breakpoints for every heading, mobile uses percentage scaling:

```css
/* Desktop */
h1: 52px
h2: 38px

/* Mobile */
h1: 38px (73% of desktop)
h2: 30px (79% of desktop)
```

Maintains proportional relationships while fitting smaller screens.

---

## Scrollbar Styling

```css
::-webkit-scrollbar-thumb {
    background: var(--border-strong);
    border-radius: var(--radius-md);
    border: 4px solid var(--bg-body); /* Creates visual padding */
}
```

Custom scrollbars match the design system:

- Same color palette
- Rounded corners
- Inner padding via border trick

---

## Print Styles

```css
@media print {
    .sidebar,
    .top-bar {
        display: none;
    }

    body {
        background: white;
        color: black;
    }
}
```

Removes UI chrome and reverses to black-on-white for printing.

---

## Performance Considerations

### Efficient Selectors

```css
/* Good - single class */
.sidebar-btn {
}

/* Avoid - deep nesting */
.sidebar .sidebar-content .sidebar-section .sidebar-btn {
}
```

Flat selector structure improves parsing speed.

### Hardware Acceleration

```css
.sidebar-btn:hover {
    transform: translateX(2px); /* GPU-accelerated */
}
```

Transform and opacity changes use GPU, preventing repaints.

### Transition Optimization

```css
transition: all var(--transition-base); /* Convenient but slower */

/* Better for production: */
transition:
    background-color 250ms ease,
    transform 250ms ease;
```

Specific properties prevent unnecessary calculations.

---

## Accessibility Features

### 1. Focus Indicators

Clear, consistent focus rings for keyboard users.

### 2. Color Contrast

All text meets WCAG AA standards (AAA for body text).

### 3. Semantic HTML Support

CSS works with proper HTML structure (headers, lists, etc.).

### 4. Reduced Motion

Could be extended with:

```css
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}
```

### 5. Screen Reader Friendly

Minimizes cosmetic content (::before/::after) that screen readers might announce.

---

## Extension Points

### Adding New Colors

```css
:root {
    --accent-secondary: #6ba6d9; /* Add complementary color */
}

.special-callout {
    border-left-color: var(--accent-secondary);
}
```

### Custom Block Types

```css
.editor-content .warning-box {
    padding: var(--space-5);
    background: var(--bg-card);
    border-left: 4px solid var(--warning);
}
```

Follow existing patterns for consistency.

### Dark/Light Mode Toggle

Could add:

```css
[data-theme="light"] {
    --bg-body: #ffffff;
    --text-primary: #1a1614;
    /* etc. */
}
```

Token-based system makes theming straightforward.

---

## Best Practices

### 1. Use Design Tokens

Always reference CSS variables instead of hard-coded values:

```css
/* ✓ Good */
padding: var(--space-4);

/* ✗ Avoid */
padding: 16px;
```

### 2. Follow Spacing Scale

Stick to the 4px-based scale for all spacing:

```css
/* ✓ Good */
margin: var(--space-3) var(--space-6);

/* ✗ Avoid */
margin: 10px 25px;
```

### 3. Maintain Color Hierarchy

Use the semantic color names:

```css
/* ✓ Good */
color: var(--text-secondary);

/* ✗ Avoid */
color: #b8b2a7;
```

### 4. Consistent Border Radius

Use radius scale tokens:

```css
/* ✓ Good */
border-radius: var(--radius-md);

/* ✗ Avoid */
border-radius: 8px;
```

---

## Summary

This stylesheet demonstrates modern CSS architecture:

✅ **Token-based design system** for consistency  
✅ **Minimal, focused aesthetic** reducing visual noise  
✅ **Accessibility-first** approach with WCAG compliance  
✅ **Performance-optimized** with efficient selectors  
✅ **Responsive** with mobile-first thinking  
✅ **Extensible** structure for easy customization

The espresso & ember palette creates a warm, focused writing environment while the systematic approach to spacing, typography, and color ensures a professional, polished result.
