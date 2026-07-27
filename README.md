# SpendWise Dashboard Shell

A static dashboard layout built with modern CSS — CSS Grid for the overall
page structure, Flexbox for component-level arrangement, and CSS custom
properties for a consistent, easily themeable color palette.

## What's Included

- **Sidebar navigation** — logo and 5 nav links, styled with Flexbox
  (`flex-direction: column`), with an active state and hover/focus feedback.
- **Header** — page title on the left, user info and avatar on the right,
  arranged with Flexbox (`justify-content: space-between`).
- **6 category cards** — Food, Transport, Rent, Entertainment, Savings, and
  Utilities, each showing a static amount and metadata, laid out with a
  CSS Grid (`repeat(3, 1fr)`) and internally structured with Flexbox.

## CSS Techniques Used

- **CSS Grid** (`.dashboard`) defines the overall page layout using named
  grid areas (`sidebar`, `header`, `main`) so the structure stays readable.
- **Flexbox** is used inside the header, sidebar nav, and each card to
  align and space content without needing absolute positioning anywhere.
- **CSS custom properties**, defined once in `:root`, drive every color in
  the stylesheet — brand, accent, surface, primary text, and secondary
  text — so the whole theme can be changed by editing a handful of values.
- **A media query at 768px** collapses the two-column grid into a single
  column, turning the sidebar into a horizontal bar and stacking the
  cards vertically for smaller screens.
- **Hover/focus micro-interactions** on each card use `transform` and
  `box-shadow` with a 200ms transition (under the 250ms requirement),
  applied identically to both `:hover` and `:focus-visible` so keyboard
  users get the same feedback as mouse users.
- **Dark theme (stretch goal)** — a `@media (prefers-color-scheme: dark)`
  query overrides only the `:root` custom properties, so the rest of the
  stylesheet automatically adapts without any duplicated rules.

## Files

- `index.html` — dashboard structure (sidebar, header, card grid)
- `style.css` — all layout, theming, responsiveness, and animations
- `README.md` — this file

## How to View

Open `index.html` directly in any browser, or use a Live Server extension
in your editor for auto-refresh while editing.
