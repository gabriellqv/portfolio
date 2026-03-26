# Gabriel Queiroz | Portfolio

Personal portfolio built with Next.js 16, React 19 and TypeScript. A single-page application with animated pixel starfield background, bilingual support (PT/EN), server-side rendered pages, and a functional contact form powered by Resend.

**Live:** [gabriellqv.dev](https://gabriellqv.dev)

## Table of Contents

- [Stack](#stack)
- [Architecture](#architecture)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Technical Decisions](#technical-decisions)
- [Security](#security)
- [Performance](#performance)
- [CI](#ci)
- [License](#license)

## Stack

| Layer | Technologies |
|-------|-------------|
| Framework | Next.js 16 (App Router, Server Components, React Compiler) |
| Language | TypeScript 5 (strict, zero `any`) |
| UI | React 19, Tailwind CSS 4, Lucide Icons |
| Animation | Framer Motion (scroll-triggered), Canvas API (pixel starfield) |
| Validation | Zod (server schema validation) |
| Email | Resend API |
| Fonts | Geist Sans + Geist Mono (via `next/font`) |
| Testing | Vitest |
| CI | GitHub Actions (type-check, lint, test, build) |
| Linting | ESLint 9 + Prettier + eslint-config-next |

## Architecture

The project follows a **Monolithic Modular** architecture with clear separation of concerns:

```
Browser Request
    |
    v
Next.js SSR (Server Components)
    |
    +--> React Components (Client Islands)
    |       |
    |       +--> Config Layer (site.ts, navigation.ts)
    |       +--> Data Layer (projects.ts, skills.ts)
    |       +--> i18n Layer (locales.ts, context.tsx)
    |
    +--> API Routes
            |
            +--> Zod Validation --> Rate Limiting --> Resend API
```

Server Components render static HTML for optimal FCP/LCP. Each section manages its own client-side interactivity through the `"use client"` directive only where necessary.

## Features

### Core
- **Bilingual (PT/EN):** Language toggle with `useSyncExternalStore` for state management, persisted in `localStorage`, auto-detected from `navigator.language`
- **Pixel Starfield:** Full-viewport animated canvas with parallax depth layers, cursor proximity lighting, delta-time normalization, and pre-computed color arrays to avoid GC pauses
- **Contact Form:** Server-side Zod validation, in-memory rate limiting (3 req/min per IP), HTML entity escaping for XSS prevention, email delivery via Resend
- **Scroll Animations:** `IntersectionObserver`-based fade-in wrapper with configurable direction and delay, auto-disconnecting after first intersection

### UI/UX
- Glassmorphism cards with `backdrop-blur` and custom design tokens (`surface`, `edge`, `glow`)
- Hero parallax effect with opacity fade on scroll
- Skills section with animated proficiency bars triggered on viewport entry
- Infinite scrolling skills carousel with CSS mask gradient
- Custom dark-themed scrollbar
- Responsive mobile menu with CSS `grid-template-rows` transition
- Floating scroll-to-top button with visibility threshold
- Auto-dismissing toast notifications with slide-in animation

### Accessibility
- Skip-to-content link for keyboard navigation
- `aria-label` on all interactive elements
- `aria-hidden` on decorative canvas
- `aria-expanded` on mobile menu toggle
- `role="alert"` on toast notifications
- Focus-visible outlines
- Semantic HTML throughout (`section`, `nav`, `main`, `footer`)

### SEO
- Open Graph and Twitter Card metadata
- Canonical URL with `metadataBase`
- Dynamic `robots.ts` and `sitemap.ts`
- Single `<h1>` per page with proper heading hierarchy
- `lang` attribute dynamically updated on locale switch

## Project Structure

```
src/
├── app/
│   ├── api/contact/route.ts    # POST endpoint (Zod + rate limit + Resend)
│   ├── globals.css             # Design tokens, animations, scrollbar
│   ├── layout.tsx              # Root layout, fonts, metadata, providers
│   ├── page.tsx                # Landing page (Server Component)
│   ├── error.tsx               # Error boundary
│   ├── not-found.tsx           # 404 page
│   ├── loading.tsx             # Suspense fallback
│   ├── robots.ts               # Search engine rules
│   └── sitemap.ts              # XML sitemap
├── components/
│   ├── effects/
│   │   ├── starfield-pixel.tsx # Canvas starfield with parallax + hover glow
│   │   └── lazy-starfield.tsx  # Dynamic import wrapper (SSR disabled)
│   ├── layout/
│   │   ├── header.tsx          # Sticky nav with active section tracking
│   │   ├── footer.tsx          # Three-column footer with social links
│   │   ├── container.tsx       # Max-width responsive wrapper
│   │   └── providers.tsx       # Client-side provider composition
│   ├── sections/
│   │   ├── hero.tsx            # Hero with parallax, CTA, skills carousel
│   │   ├── about.tsx           # Bio, experience timeline, education, languages
│   │   ├── projects.tsx        # Project grid with i18n-aware cards
│   │   ├── skills.tsx          # Categorized skills with animated bars
│   │   └── contact.tsx         # Form + channel cards (email, LinkedIn, GitHub)
│   └── ui/
│       ├── card.tsx            # Project card with cover image and tech tags
│       ├── fade-in.tsx         # IntersectionObserver entrance animation
│       ├── scroll-to-top.tsx   # Floating back-to-top button
│       ├── skip-to-content.tsx # Accessibility skip link
│       └── toast.tsx           # Auto-dismissing notification
├── config/
│   ├── site.ts                 # Centralized site metadata and links
│   └── navigation.ts           # Shared nav items and social links
├── data/
│   ├── projects.ts             # Project definitions (slug, tags, links)
│   └── skills.ts               # Skill items for hero carousel
├── i18n/
│   ├── context.tsx             # LocaleProvider with useSyncExternalStore
│   └── locales.ts              # PT and EN translation dictionaries
├── lib/
│   └── utils.ts                # cn() utility (clsx + tailwind-merge)
└── types/
    └── index.ts                # Shared type definitions
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/gabriellqv/portfolio.git
cd portfolio

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run unit tests (Vitest) |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check formatting without modifying |

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

| Variable | Description | Required |
|----------|-------------|:--------:|
| `RESEND_API_KEY` | API key from [resend.com/api-keys](https://resend.com/api-keys) | Yes |
| `CONTACT_EMAIL` | Email where contact form messages are delivered | No (defaults to site email) |

## Technical Decisions

**Why `useSyncExternalStore` for i18n instead of a library like `next-intl`?**
The portfolio has only two locales and no routing-based language switching. A module-level store with `useSyncExternalStore` avoids the overhead of an external dependency, prevents the `setState`-inside-`useEffect` pattern that triggers React Compiler warnings, and keeps the hydration boundary clean with explicit `getServerSnapshot`.

**Why Canvas API for the starfield instead of CSS or SVG?**
Rendering 390 animated particles with cursor proximity detection at 60fps requires per-frame control that CSS animations and SVG cannot provide efficiently. The Canvas approach uses squared distance checks (avoiding `Math.sqrt`), pre-computed RGB color strings (avoiding string allocation in the animation loop), and delta-time normalization for consistent speed across refresh rates.

**Why no external state management?**
The application state is minimal: locale toggle, form status, menu open/close, and scroll position. React's built-in `useState` and `useContext` handle these cases without the bundle cost of Zustand or Redux.

**Why Tailwind CSS 4 with custom design tokens?**
The `@theme inline` block in `globals.css` maps semantic token names (`surface`, `edge`, `fg-primary`) to CSS custom properties. This provides the consistency of a design system with the utility-first approach of Tailwind, and makes the visual language self-documenting in the code.

**Why React Compiler (`babel-plugin-react-compiler`)?**
Automatic memoization eliminates the need for manual `useMemo`/`useCallback` calls throughout the component tree, reducing boilerplate while maintaining render performance.

## Security

The following security measures are implemented:

| Measure | Implementation |
|---------|---------------|
| Content Security Policy | `default-src 'self'` with scoped exceptions in `next.config.ts` |
| Frame Protection | `X-Frame-Options: DENY` |
| MIME Sniffing | `X-Content-Type-Options: nosniff` |
| Referrer Control | `strict-origin-when-cross-origin` |
| Permissions Policy | Camera, microphone, and geolocation disabled |
| Input Validation | Zod schema on the server before processing |
| XSS Prevention | HTML entity escaping (`&`, `<`, `>`, `"`) on all user inputs before email rendering |
| Rate Limiting | 3 requests per minute per IP address |
| API Endpoint Protection | `robots.txt` disallows `/api/` indexing |

## Performance

Key optimizations for Core Web Vitals:

- **LCP:** Server-side rendered HTML with deferred canvas initialization (500ms delay via `setTimeout`)
- **CLS:** Fixed canvas with `position: fixed` and `z-[-1]` avoids layout shifts
- **INP:** Passive scroll listeners, `requestAnimationFrame` batching, `will-change-transform` on parallax elements
- **Bundle:** Dynamic import with `ssr: false` for the starfield component excludes canvas JS from the server bundle
- **Images:** `next/image` with WebP format, blur placeholders, and responsive `sizes` attribute
- **Fonts:** `next/font` for zero-CLS font loading with `font-display: swap`
- **Canvas:** Pre-computed color lookup table (256 entries), squared distance proximity checks, `imageSmoothingEnabled: false` for pixel-perfect rendering, `visibilitychange` listener to pause animation when tab is hidden

## CI

The GitHub Actions workflow at `.github/workflows/ci.yml` runs on every push and pull request to `main`:

1. TypeScript type check (`tsc --noEmit`)
2. ESLint
3. Unit tests (Vitest)
4. Production build

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
