# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog, and this project follows Semantic Versioning.

## [1.0.0] - 2026-03-16

### Added
- New `#home` hero section with headline, subtext, and CTA buttons.
- New `#about` section with a responsive card grid layout.
- Footer section with tagline, Facebook CTA, and dynamic copyright year.
- Lightbox for full-size artwork previews with keyboard support.
- Active navigation link highlighting via `IntersectionObserver`.

### Accessibility
- Skip-to-main-content link.
- Improved ARIA semantics for lightbox and sections.
- Focus trap and focus restore behavior for modal interactions.
- `:focus-visible` styles for keyboard navigation across interactive elements.

### Performance
- Lazy loading and async decoding on non-hero gallery images.
- Background video metadata preload.
- Font preload and `font-display: swap`.
- Replaced auto-scroll animation with CSS scroll snap.
- Removed global transition-all rule.

### SEO
- Updated Open Graph and Twitter metadata.
- Added canonical URL, meta description, and theme color.
- Fixed HTML attribute quoting consistency.

### Changed
- Refined responsive navigation and section layout for small screens.
- Updated heading hierarchy for better document structure.
- Corrected pricing list bullet styling across browsers.
- Improved CTA interaction states.

### Housekeeping
- Renamed `.JPG` image references to lowercase `.jpg`.
- Added `.gitignore`.
- Split CSS imports into explicit HTML `<link>` tags with corrected load order.
