# Onboarding Guide

## What You’re Working With

- Static single-page site: `index.html` loads `styles/*.css` and ES modules in
  `modules/`.
- No build or package manager; everything is plain HTML/CSS/JS and ships as-is.
- Fonts are local WOFF2 assets preloaded in `index.html` and declared in
  `styles/index.css`.

## Quick Start

1. Clone and open the repo.
2. Serve the root directory locally so fonts and modules load with correct
   origins. Examples:

   ```sh
   # Python 3
   python3 -m http.server 8000

   # Or Node (if installed)
   npx serve .
   ```

3. Visit `http://localhost:8000/` to verify the page loads and the carousel
   advances.

## Project Layout

- `index.html` — main entry; preloads fonts and bootstraps JS.
- `styles/` — `index.css` (design system, layout, components), `Carousel.css`
  (carousel-specific).
- `modules/` — `Website.js` (bootstrap, singleton), `Carousel.js` (hero carousel
  behavior).
- `assets/` — images and fonts (`*.woff2` only).

## Development Notes

- Fonts: keep preload `href`s in `index.html` aligned with `@font-face` `src`
  URLs in `styles/index.css`. Prefer WOFF2; add fallbacks only if you
  reintroduce older formats.
- CSS variables drive spacing, colors, and typography. Adjust them in `:root`;
  check responsive overrides in media queries.
- Carousel: `Carousel.js` manages slides/indicators and auto-advance. If you
  change markup, keep ARIA roles/labels in sync.
- No bundler or minifier—keep assets lightweight and paths relative to the root.

## Testing and QA

- There is no automated test suite. Do a manual pass:

  - Load locally and confirm fonts render (no console 404s).
  - Resize to mobile widths to verify layout and carousel controls.
  - Check keyboard focus and tab order on carousel dots and links.

## Contributing Workflow

- Use feature branches; keep changes scoped.
- Run a local static serve and smoke-test before pushing.
- Maintain README/ONBOARDING updates when changing structure, assets, or
  commands.
- Default to ASCII; align with existing formatting and comment style.
