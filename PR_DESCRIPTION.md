## Zapphire Gallery — Site Redesign & Enhancement

### Summary
Full overhaul of the gallery site with a new hero section, improved accessibility, lightbox artwork previews, responsive layout fixes, and performance optimizations.

---

### Changes

**Features**
- Added a `#home` hero section with headline, subtext, and CTA buttons (View Gallery / Message on Facebook)
- Added an `#about` section with a responsive card grid layout
- Added a site footer with a tagline, Facebook CTA, and dynamic copyright year
- Implemented a lightbox for full-size artwork previews — click or keyboard-activate any gallery image to open
- Active nav link highlighting using `IntersectionObserver`

**Accessibility**
- Skip-to-main-content link
- `aria-label`, `aria-modal`, `role="dialog"` on lightbox; focus trap and focus restore on open/close
- `aria-labelledby` on all sections; `aria-hidden="true"` on background video
- `role="button"` + `aria-haspopup="dialog"` on lightbox trigger images
- `focus-visible` styles for keyboard navigation on links, buttons, images, and the slider
- `tabindex="0"` + `aria-label` on the scrollable slider div

**Performance**
- `loading="lazy"` + `decoding="async"` on all non-hero gallery images
- `preload="metadata"` on the background video
- Font preload with `crossorigin="anonymous"` + `font-display: swap`
- Replaced auto-scroll `@keyframes` animation with native CSS scroll snap (`scroll-snap-type: x mandatory`)
- Removed global `* { transition: all 0.5s }` rule

**SEO / Meta**
- Updated Open Graph and Twitter Card meta tags (description, image URLs)
- Added `<meta name="description">`, `<meta name="theme-color">`, and `<link rel="canonical">`
- Fixed unquoted attribute values in HTML

**Styles & Layout**
- Responsive nav: flexbox layout, reduced font sizes, `width: min(1300px, 92%)`
- `h4` → `h2` for the site logo/title (correct heading hierarchy)
- Small-screen overrides (`max-width: 480px`) for nav, hero actions, cards, and sections
- Video background fixed to fill container with `object-fit: cover`
- Pricing list style fix for cross-browser emoji bullets
- CTA button active/hover states

**Housekeeping**
- Renamed `.JPG` images to lowercase `.jpg` for consistency
- Added `.gitignore`
- Split CSS imports out of `style.css` into individual `<link>` tags in HTML; load order corrected (`style.css` last)

---

### Testing
- Verify lightbox opens/closes via click, Enter/Space, and Escape
- Confirm active nav highlights on scroll through all four sections
- Check skip link appears on Tab from top of page
- Test on mobile viewport (360px–480px) for layout and nav
