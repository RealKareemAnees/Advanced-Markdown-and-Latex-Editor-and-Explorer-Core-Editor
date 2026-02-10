# Markdown Editor Complete Style Guide

A comprehensive example page showcasing the **Espresso & Ember** design system for the Markdown Editor. This project demonstrates all design tokens, components, typography styles, and interactive patterns defined in the styling guidelines.

## 🎨 Overview

This style guide is a living example of the complete design system, featuring:

- **Design Tokens**: All CSS custom properties for colors, spacing, typography, shadows, and more
- **Component Library**: Sidebar, top bar, editor area, callouts, badges, and more
- **Typography System**: Six heading levels, body text, lists, blockquotes, and code formatting
- **Interactive Elements**: Buttons, checkboxes, links, and hover states
- **Responsive Design**: Mobile-optimized with collapsible sidebar
- **Accessibility Features**: WCAG-compliant contrast, focus indicators, keyboard navigation

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Server

The development server will start at `http://localhost:5173` (or similar port). The page will automatically reload when you make changes to the source files.

## 📁 Project Structure

```
preview/
├── src/
│   ├── main.ts          # TypeScript initialization and interactivity
│   └── styles.css       # Complete design system CSS
├── index.html           # Comprehensive example page
├── package.json
├── tsconfig.json
└── README.md
```

## 🎯 Features Demonstrated

### Design Tokens

All design tokens are implemented as CSS custom properties in `:root`:

- **Colors**: Background layers, text hierarchy, accent colors, semantic colors
- **Typography**: Font families, sizes, weights, line-heights
- **Spacing**: 4px-based spacing scale (--space-1 through --space-20)
- **Borders**: Three-tier border system with focus states
- **Shadows**: Five shadow levels for elevation
- **Border Radius**: Six radius sizes from xs to full
- **Animations**: Three transition speeds with easing

### Components

#### Sidebar

- Fixed-width navigation panel
- Collapsible on mobile devices
- Active state indicators
- Footer with user profile

#### Top Bar

- Document title input with focus states
- Action buttons (Preview, Save, Export)
- Responsive button labels

#### Editor Area

- Centered content column (760px max-width)
- Generous whitespace for focus
- Scrollable content area

#### Callouts

- Five semantic variants (default, info, success, warning, error)
- Icon support
- Flexible content

#### Badges

- Six color variants
- Pill-shaped design
- Compact labels

### Typography Examples

- **Six heading levels** with progressive size reduction
- **Body text** optimized for readability (18px, 1.8 line-height)
- **Lead paragraphs** with italic serif styling
- **Lists** with accent-colored markers
- **Blockquotes** with decorative elements
- **Code blocks** with syntax highlighting support
- **Inline code** with subtle background

### Interactive Elements

- **Custom checkboxes** with spring animation
- **Hover states** on all interactive elements
- **Focus indicators** for keyboard navigation
- **Button transforms** for tactile feedback
- **Smooth scrolling** for anchor links
- **Table row hover** effects

### Special Elements

- **Horizontal rules** with section symbol (§)
- **Tables** with rounded corners and hover states
- **Links** with underline on hover
- **Images** with rounded corners and shadows (when added)
- **Custom scrollbars** matching the design system

## 🎨 Design System

### Color Palette

**Espresso & Ember Theme**

```css
/* Background Layers */
--bg-body: #1a1614 /* Deepest layer */ --bg-card: #252220
    /* Elevated surfaces */ --bg-code: #2d2926 /* Code blocks */
    --bg-highlight: #2e2a27 /* Hover states */ --bg-elevated: #2a2522
    /* Special sections */ /* Text Hierarchy */ --text-primary: #f0ede1
    /* Main content */ --text-secondary: #b8b2a7 /* Supporting text */
    --text-tertiary: #7a7469 /* Metadata */ --text-muted: #5a544c
    /* Placeholders */ /* Accent Colors */ --accent-primary: #e67e4d
    /* Ember orange */ --accent-hover: #f19866 /* Lighter orange */
    --accent-subtle: #d46838 /* Darker orange */;
```

### Typography

```css
--font-serif:
    "Charter", "Bitstream Charter", "Sitka Text", Cambria,
    serif --font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, sans-serif --font-mono: "JetBrains Mono", "Fira Code", Consolas,
    monospace;
```

### Spacing Scale

All spacing uses a 4px base grid:

```
4px   →  --space-1
8px   →  --space-2
12px  →  --space-3
16px  →  --space-4  (Base unit)
24px  →  --space-6
32px  →  --space-8
64px  →  --space-16
80px  →  --space-20
```

## 📱 Responsive Breakpoints

- **Desktop**: Full layout with fixed sidebar (> 1024px)
- **Tablet**: Slightly reduced spacing (769px - 1024px)
- **Mobile**: Slide-out sidebar, compact spacing (≤ 768px)

## ♿ Accessibility

- **Contrast Ratios**: All text meets WCAG AA standards
- **Focus Indicators**: Clear 2px outlines on all interactive elements
- **Keyboard Navigation**: Full keyboard support with Escape key behaviors
- **Semantic HTML**: Proper heading hierarchy and structure
- **Reduced Motion**: Supports `prefers-reduced-motion` media query

## 🔧 Customization

### Changing Colors

All colors are defined as CSS variables in [styles.css](src/styles.css). Update the `:root` values to customize:

```css
:root {
    --accent-primary: #your-color;
    --bg-body: #your-background;
    /* etc. */
}
```

### Adding New Components

Follow the existing patterns:

1. Use design tokens (CSS variables) instead of hard-coded values
2. Follow the 4px spacing scale
3. Include hover, active, and focus states
4. Test at all breakpoints

### Extending Typography

Add new heading or text styles by following the existing hierarchy patterns:

```css
.editor-content .custom-style {
    font-family: var(--font-serif);
    font-size: 28px;
    line-height: 1.4;
    color: var(--text-primary);
    margin: var(--space-8) 0 var(--space-4);
}
```

## 📖 Documentation

For complete documentation of the design system, see the main [styling.md](../../docs/styling.md) file, which provides:

- Detailed design philosophy and rationale
- Component architecture explanations
- Best practices and guidelines
- Performance considerations
- Accessibility features

## 🛠️ Technical Stack

- **HTML5**: Semantic structure
- **CSS3**: Modern features (custom properties, flexbox, grid)
- **TypeScript**: Type-safe interactions
- **Vite**: Fast build tool and dev server

## 📝 License

This style guide is part of the Markdown Editor project.

## 🤝 Contributing

When adding new components or patterns:

1. Use existing design tokens
2. Follow the 4px spacing scale
3. Maintain color hierarchy
4. Test accessibility
5. Document usage examples
6. Update this README

---

**Built with ♥️ using the Espresso & Ember design system**
