# Frontend Engineering Portfolio

A production-ready portfolio application demonstrating advanced web development practices, modern frontend architecture, and strict engineering standards. Built with Next.js App Router, strict TypeScript, and a highly optimized utility-first design system.

## Architecture and Technical Highlights

* Next.js 16 App Router: Utilizing React Server Components for optimal server-side rendering and minimized client JavaScript bundle size.
* Enterprise Git Flow: Strict version control enforced via Husky, lint-staged, and Commitlint enforcing the Conventional Commits specification.
* Automated Testing: Unit and integration testing ecosystem powered by Vitest, jsdom, and React Testing Library.
* Continuous Integration: GitHub Actions pipeline configured for Node 22, executing automated type checking, linting, code formatting validation, security audits, and automated testing on every pull request.
* Design System: Fully responsive interface utilizing Tailwind CSS v4, featuring a dual-theme (Light/Dark) architecture, custom glassmorphism utilities, and hardware-accelerated animations.
* Accessibility and SEO: Full WCAG 2.1 compliance including dynamic semantic HTML, keyboard focus traps, prefers-reduced-motion fallbacks, JSON-LD schemas, and dynamic Open Graph image generation.
* Native Internationalization: Zero-dependency, highly performant client-side i18n implementation supporting English and Portuguese.

## Local Environment Setup

### Prerequisites

* Node.js version 22 or higher
* npm version 10 or higher

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/gabriellqv/portfolio.git
cd portfolio
npm install
```

### Available Scripts

The repository includes the following scripts for development and maintenance:

* `npm run dev`: Starts the local development server with Fast Refresh.
* `npm run build`: Compiles the application for production.
* `npm run start`: Starts the production preview server.
* `npm run lint`: Executes ESLint across the codebase enforcing zero warnings.
* `npm run format`: Formats all files using Prettier.
* `npm run typecheck`: Validates TypeScript types across the entire project.
* `npm run test`: Executes the Vitest automated testing suite.

## Code Quality Enforcement

This project strictly forbids pushing unformatted or broken code. Upon executing a commit, Husky intercepts the action and executes `lint-staged`. This process isolates the staged files and runs Prettier and ESLint. If the files pass formatting and linting, the commit message is parsed by Commitlint to ensure semantic versioning compliance. If any step fails, the commit is aborted.

## License

This project is licensed under the MIT License.
