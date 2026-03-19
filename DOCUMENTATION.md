# Shoe Palace — Project Documentation

## Overview

Shoe Palace is a React-based online shoe shop where customers browse products and place orders directly through WhatsApp. There is no payment gateway or cart system — the ordering flow is intentionally kept simple and conversational via WhatsApp, which suits the target market of a small-to-medium retail business operating in Kenya.

---

## Tech Stack

| Technology | Version | Reason |
|---|---|---|
| React | 19 | Component-based UI, fast rendering, large ecosystem |
| Vite | 6 | Faster dev server and build times compared to CRA |
| Tailwind CSS | v4 | Utility-first styling, no need for separate CSS files, rapid UI development |
| React Router DOM | v7 | Client-side routing for multi-page navigation without full page reloads |
| React Icons | v5 | Lightweight icon library, no need for custom SVGs |

---

## Project Structure

```
src/
├── components/        # Reusable UI sections rendered on the landing page
│   ├── Navbar.jsx
│   ├── HeroSection.jsx
│   ├── Categories.jsx
│   ├── Latest.jsx
│   ├── Brands.jsx
│   ├── Trending.jsx
│   ├── Testimonials.jsx
│   ├── ContactSection.jsx
│   └── Footer.jsx
├── pages/             # Full pages tied to routes
│   ├── LandingPage.jsx
│   ├── Products.jsx
│   ├── Details.jsx
│   └── Admin.jsx
├── data/
│   └── shoes.js       # Single source of truth for all product data
├── App.jsx            # Root component, routing, sticky WhatsApp button
├── main.jsx           # React DOM entry point
└── index.css          # Global styles including marquee animation
```

---

## Architecture Decisions

### 1. Single Data File (`src/data/shoes.js`)
All shoe data lives in one file exported as `allShoes`. This was a deliberate decision made after the initial build had each component (Latest, Trending, Products) maintaining its own local data arrays, which caused the same shoe to appear in multiple sections.

Centralising the data means:
- One place to add, edit, or remove a product
- Components simply import and filter/slice from the same array
- No risk of data getting out of sync across sections

### 2. WhatsApp Ordering Instead of a Cart
The business model is WhatsApp-first. When a customer clicks "Order on WhatsApp", a pre-filled message is generated using `wa.me` deep links:

```
https://wa.me/254707011888?text=Hi, I'd like to order *Shoe Name* — KES Price
```

This approach:
- Requires zero backend infrastructure
- Keeps the ordering process personal and conversational
- Works perfectly for a small business that manages orders manually
- Is familiar to the Kenyan market where WhatsApp commerce is common

### 3. Sticky WhatsApp Floating Button
A green WhatsApp icon is fixed to the bottom-right of every page via `App.jsx`. This ensures the customer always has a direct line to the shop regardless of which page they are on, without needing to scroll to the contact section.

### 4. Footer and Navbar in `App.jsx`
The Navbar and Footer are rendered in `App.jsx` outside the `<Routes>` block. This means they appear on every page automatically without having to import them into each page individually. This is a standard layout pattern in React Router applications.

### 5. Component vs Page Separation
- **Components** (`src/components/`) are UI sections that make up the landing page. They are not tied to a route.
- **Pages** (`src/pages/`) are full views tied to a specific URL route.

This separation keeps the codebase organised and makes it easy to know where to look when editing a specific part of the UI.

### 6. Collapsible Filters on Mobile (`Products.jsx`)
On small screens, the filter sidebar is hidden by default behind a "Show Filters" toggle button. Each filter section (Category, Brand, Price Range) is also individually collapsible. This decision was made because:
- The sidebar takes up significant vertical space on mobile
- Users on mobile should see products first, not filters
- Individual section toggles give users fine-grained control

### 7. Shared Shoe Card Design
The same card design is used across Latest, Trending, and Collections (Products page). This creates visual consistency and reduces the cognitive load for users navigating between sections. The only difference is the button — landing page cards use "View Details" while the Details page has the "Order on WhatsApp" button.

### 8. `Details.jsx` as a Page, Not a Component
The product detail view is a full page (`/shoe/:id`) rather than a modal or drawer. This was chosen because:
- It gives each product a shareable URL
- It allows the "You May Also Like" section to have enough space
- It feels more like a proper product page, building trust with the customer

### 9. "You May Also Like" Section
On the Details page, related shoes are filtered by the same `category` as the viewed shoe (excluding the current shoe). This keeps recommendations relevant without needing a recommendation engine — a simple array filter is sufficient at this scale.

### 10. Continuous Brands Carousel (CSS Only)
The brands section uses a pure CSS `@keyframes marquee` animation defined in `index.css` rather than a JavaScript interval or a third-party carousel library. This keeps the bundle size small and avoids unnecessary re-renders.

### 11. Hero Section Carousel
The hero uses React `useState` and `useEffect` with `setInterval` to auto-rotate between two images every 4 seconds with a CSS opacity transition. Dot indicators allow manual navigation. This was kept simple intentionally — no external carousel library needed for just two images.

### 12. Contact Us as Scroll, Not a Route
"Contact Us" in the navbar does not navigate to a separate `/contact` page. Instead it scrolls smoothly to the `ContactSection` component on the landing page (identified by `id="contact"`). If the user is on a different page, it navigates to `/` first then scrolls after a 300ms delay. This keeps the contact information on the main page where it is most visible.

---

## Product Data Structure

Each shoe in `src/data/shoes.js` follows this shape:

```js
{
  id: 1,
  name: 'Dr. Martens Classic',
  price: 3500,           // in KES (Kenya Shillings)
  brand: 'Dr. Martens',
  category: 'men',       // 'men' | 'women' | 'unisex'
  image: '/Martins.png', // served from /public
  stock: 8               // number of pairs available
}
```

---

## Routing

| Route | Component | Description |
|---|---|---|
| `/` | `LandingPage` | Full landing page with all sections |
| `/collections` | `Products` | All shoes with filters and pagination |
| `/collections/:category` | `Products` | Pre-filtered by category (men/women/unisex) |
| `/shoe/:id` | `Details` | Individual shoe detail page |
| `/admin` | `Admin` | Admin page (placeholder) |

---

## Landing Page Section Order

1. `HeroSection` — Full screen carousel with CTA
2. `Categories` — Men, Women, Unisex category cards
3. `Latest` — 8 newest shoes
4. `Brands` — Continuous logo carousel
5. `Trending` — 8 trending shoes (different from Latest)
6. `Testimonials` — 4 customer reviews + CTA strip
7. `ContactSection` — Location, hours, phone, email
8. `Footer` — Quick links, socials, brand info

---

## WhatsApp Number

The WhatsApp number is defined in two places:
- `src/App.jsx` — for the sticky floating button
- `src/pages/Details.jsx` — for the "Order on WhatsApp" button on the product page

Current number: **+254 707 011 888**

---

## Assets

All images are stored in `/public` and referenced with a root-relative path (e.g. `/Martins.png`). Vite serves the `public/` directory at the root, so no `public/` prefix is needed in the `src` attribute.

---

## Future Improvements

- Move shoe data to a CMS or backend API so products can be managed without touching code
- Add an admin dashboard to manage products, view orders, and update stock
- Add a search bar to the Collections page
- Add size selection on the Details page before ordering
- Integrate analytics to track which products get the most views
