# ApexCraft Studio — Modern Agency Portfolio & Interactive Showcase

> *"We Build Digital Experiences That Grow Businesses."*

A premium, modern, highly professional Freelancer Web Development Agency & Portfolio Website engineered to attract real clients and convert visitors into web-development customers.

---

## 🌟 Key Features

### 1. Agency Portfolio (`/index.html`)
- **Visual Identity**: Dark-first glassmorphism design with deep navy/obsidian surfaces, electric indigo & violet gradients, cyan accents, and emerald success states.
- **Theme Switcher**: Instant toggle between Dark and Light mode with localStorage persistence.
- **Hero Section**: Pulsing availability badge, conversion headline, 3 strategic CTAs, and an interactive browser window mockup showcasing live Google Lighthouse scores (100/100/100/100) and Core Web Vitals telemetry.
- **Trust & Statistics Bar**: Animated number counters (65+ projects, 99% satisfaction, 95+ PageSpeed score, 24/7 support) via `IntersectionObserver`.
- **Services Section**: 6 high-value services with interactive "Learn More" modals displaying deliverables, tech stacks, and timelines.
- **Live Client Demos Showcase**: 3 dedicated production-grade demo cards directing clients to live interactive web applications.
- **Interactive Project Pricing Calculator**: Live instant cost & timeline estimation based on website types, scope/pages, and 8 add-ons with automated pre-filled WhatsApp quote generation.
- **Why Choose Us**: 8 commercial advantage cards highlighting performance, SEO, mobile-first design, and clean code.
- **Our Process**: 4-step structured delivery pipeline with visual connecting timeline.
- **Testimonials & Reviews**: Verified social proof cards with star ratings and client roles.
- **Interactive FAQ Accordion**: 8 common client questions with smooth expand/collapse.
- **Conversion Contact Section**: Validated contact form with interactive feedback confirmation modal, direct email link, and worldwide availability badge.
- **Centralized WhatsApp Integration**: Configurable international WhatsApp number (`CONFIG.WHATSAPP_NUMBER`) used consistently across all conversion hooks.

---

## 🚀 3 Dedicated Live Client Demos

### 1. NovaStore — Modern Cyber-Retail E-Commerce (`/demos/ecommerce/`)
- **Brand Identity**: Sleek dark cyber retail aesthetic with neon cyan and electric violet accents.
- **Interactive Catalog**: 8 curated products across Audio, Gadgets, Fashion, and Accessories.
- **Live Instant Search**: Real-time filtering by keyword and category with search status indicator.
- **Category Tabs & Sorting**: Filter by category or sort by price (low to high, high to low) and rating.
- **Interactive Cart Drawer**: Sliding cart panel with quantity adjustments (+ / -), item removal, and subtotal calculation.
- **Coupon Code Engine**: Type `APEX20` for an instant 20% discount on cart subtotal.
- **Simulated Checkout Flow**: Full shipping form, payment method selector, and interactive order confirmation receipt with generated order reference code (`NOVA-XXXXXX`).
- **Product Quick View Modal**: Modal with zoomed photography, specifications, and quantity picker.

### 2. Vanguard Solutions — Enterprise B2B SaaS Platform (`/demos/business-agency/`)
- **Brand Identity**: High-tech enterprise intelligence platform with deep space blues and glowing telemetry.
- **Interactive Analytics Dashboard**:
  - Live metric boxes (MRR, Active Orgs, Churn Rate, API Latency).
  - Timeframe filter pills (`7 Days`, `30 Days`, `90 Days`, `All Time`) dynamically updating numbers and charts.
  - Interactive chart tabs (`Revenue Forecast`, `Traffic Volume`, `API Response Times`) rendering responsive SVG curves.
- **Feature Tabs Subsystem**: 4 subsystems (AI Workflows, Predictive Analytics, Zero-Trust Security, Cloud Connectors) with live syntax-highlighted TypeScript SDK snippets.
- **Interactive Pricing Switcher**: Monthly vs. Annual toggle recalculating prices with an automatic 20% annual discount.
- **Trial Provisioning Modal**: Instant simulation of cloud tenant deployment.

### 3. Savor & Spice — Luxury Fine Dining & Table Reservations (`/demos/restaurant-booking/`)
- **Brand Identity**: Opulent candlelight aesthetic with antique gold accents, dark charcoal surfaces, and Playfair Display serif typography.
- **Curated Culinary Menu**: 9 gourmet dishes across Starters, Signature Mains, Chef Specials, Artisan Desserts, and Rare Cellar Wines.
- **Dietary Badges & Dish Selection**: Tags (Gluten-Free, A5 Certified, Vegan, Organic) and "Reserve Table for this Dish" interactive linking.
- **Interactive Table Reservation Engine**:
  - Guest counter stepper (1 to 8 guests).
  - Automated date picker preset to today's date.
  - Interactive dining time slots (5:30 PM to 9:15 PM).
  - Seating area selection (Main Dining Salon, Chef's Open Counter, Rooftop Terrace, Private Wine Vault).
  - Instant booking confirmation modal with unique reference code (`SAVOR-XXXXX`).

---

## 📁 File Structure

```
websites/
├── index.html                           # Main Agency Portfolio Homepage
├── README.md                            # Documentation and Architecture Guide
├── robots.txt                           # Search Engine Crawler Directives
├── sitemap.xml                          # XML Sitemap for SEO
│
├── css/
│   └── style.css                        # Master Agency Stylesheet & Design System
│
├── js/
│   └── script.js                        # Master Application Logic & Calculator Engine
│
├── assets/
│   ├── favicon/
│   │   └── favicon.svg                  # Modern Code-Bracket Vector Favicon
│   ├── icons/                           # Vector Icons
│   └── images/                          # Media Assets
│
└── demos/
    ├── ecommerce/                       # NovaStore Demo
    │   ├── index.html
    │   ├── style.css
    │   └── script.js
    │
    ├── business-agency/                 # Vanguard Solutions SaaS Demo
    │   ├── index.html
    │   ├── style.css
    │   └── script.js
    │
    └── restaurant-booking/              # Savor & Spice Restaurant Demo
        ├── index.html
        ├── style.css
        └── script.js
```

---

## ⚙️ Configuration & Customization

All core business parameters can be updated in a single file: `js/script.js`:

```javascript
const CONFIG = {
  BRAND_NAME: "ApexCraft Studio",
  TAGLINE: "We Build Digital Experiences That Grow Businesses.",
  WHATSAPP_NUMBER: "923135233955", // Pakistan WhatsApp Number
  CONTACT_EMAIL: "apexcrafthub@gmail.com",
  DEFAULT_THEME: "dark",
  // Modify base prices, multipliers, and add-on pricing in CONFIG.CALCULATOR
};
```

---

## 🌐 Browser Compatibility & Standards

- **Cross-Browser**: Tested on Chrome, Safari, Firefox, Edge, and iOS/Android WebKit.
- **Performance**: Zero bulky external JavaScript frameworks (React/Vue/jQuery not required). Pure modular vanilla JS and lean modern CSS3.
- **Accessibility**: ARIA labels, semantic landmark elements, keyboard navigation focus rings (`:focus-visible`), and `@media (prefers-reduced-motion)` support.
- **SEO Ready**: Full OpenGraph tags, Twitter Card tags, canonical link, semantic heading hierarchy, and valid sitemap.
