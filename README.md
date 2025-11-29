# Seasons Computing Website Architecture

## Overview

This project is a single-page portfolio website for Ted V. Kremer, operating
under the brand "Seasons Computing". It showcases professional experience,
services, and contact information through a modern, responsive web interface.

## Technology Stack

- **Frontend Framework**: Vanilla JavaScript (ES6 Modules)
- **Markup**: HTML5
- **Styling**: CSS3 with Custom Properties (CSS Variables)
- **Fonts**: Custom web fonts (Varino, Comfortaa, Rock Salt) served locally via
  WOFF2
- **Assets**: Static images and fonts
- **Build System**: None (static files served directly)

## Project Structure

```text
seacom-portfolio/
├── README.md
├── index.html                 # Main HTML entry point
├── assets/                    # Static assets
│   ├── Comfortaa-Regular.woff2
│   ├── favicon.png
│   ├── logo.png
│   ├── RockSalt-Regular.woff2
│   └── Varino-Regular.woff2
├── modules/                   # JavaScript modules
│   ├── Carousel.js
│   └── Website.js
└── styles/                    # CSS stylesheets
    ├── Carousel.css
    └── index.css
```

## Architecture Patterns

### Modular JavaScript Architecture

The application uses ES6 modules to organize code into reusable
components:

- **Website Class**: Singleton pattern for application initialization and global
  state management
- **Carousel Class**: Component-based architecture for interactive carousel
  functionality

### CSS Design System

A comprehensive design system built with CSS custom properties:

- **Color Palette**: Gradient-based color scheme with semantic naming
- **Typography**: Multiple font families for branding and readability
- **Layout System**: Flexbox and Grid-based responsive layouts
- **Component Styles**: Modular CSS for reusable UI components

### Component Structure

#### Website Component

- Acts as the main application controller
- Manages initialization of sub-components
- Uses singleton pattern for global access

#### Carousel Component

- Handles slide transitions and navigation
- Implements automatic cycling with configurable duration
- Supports manual navigation via indicator buttons
- Uses CSS transforms for smooth animations

## Key Features

- **Responsive Design**: Mobile-first approach with fluid typography and
  adaptive layouts
- **Interactive Carousel**: Auto-advancing hero section with manual controls
- **Accessibility**: ARIA attributes and keyboard navigation support
- **Performance**: Font preloading and optimized asset loading
- **Visual Effects**: CSS animations, gradients, and backdrop filters

## Data Flow

1. **Initialization**: `Website.bootstrap()` creates the singleton instance
2. **DOM Ready**: Event listener triggers component initialization
3. **Component Setup**: Carousel initializes slides, indicators, and event
   handlers
4. **Interaction**: User interactions trigger state changes and visual updates

## Deployment

The application consists of static files that can be served by any web server.
No server-side processing or build steps are required.

## Browser Support

Modern browsers supporting ES6 modules and CSS custom properties (Chrome,
Firefox, Safari, Edge).
