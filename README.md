<div align="center">
  <p>
    <img src="src/assets/react.svg" alt="Project Logo" width="40" />
  </p>
  <h1>Model Dashboard SPA</h1>
  <p><strong>Modern, scalable, and maintainable Single Page Application for model management.</strong></p>
</div>

---

## Table of Contents
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Code Style & Linting](#code-style--linting)

---

## Overview
Model Dashboard SPA is a modern, modular, and performant dashboard for managing and visualizing model projects. Built with React, TypeScript, and Vite, it follows best practices for scalability, maintainability, and developer experience.

## Tech Stack
- **Framework:** React 18, Vite
- **Language:** TypeScript
- **Styling:** CSS Modules, Custom Theming
- **State Management:** React Context API
- **Linting/Formatting:** ESLint, Prettier

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) >= 18.x
- [pnpm](https://pnpm.io/) (recommended)

### Installation
```bash
pnpm install
```

### Development
```bash
pnpm dev
```

### Production Build
```bash
pnpm build
```

### Preview Production Build
```bash
pnpm preview
```

## Available Scripts
- `pnpm dev` — Start local development server
- `pnpm build` — Build for production
- `pnpm preview` — Preview production build
- `pnpm lint` — Run ESLint
- `pnpm format` — Run Prettier formatting

## Project Structure
```
src/
  assets/           # Static assets (images, fonts, etc.)
  components/       # UI components (atoms, molecules, organisms)
  context/          # React context providers
  layout/           # Layout and theming
  lib/              # Utilities and constants
  middleware/       # Middleware logic
  mock/             # Mock data and services
  pages/            # Page-level components
  routes/           # App routing
  service/          # API queries and hooks
  App.tsx           # Root component
  main.tsx          # Entry point
```

## Code Style & Linting
- **Linting:**
  ```bash
  pnpm lint
  ```
- **Formatting:**
  ```bash
  pnpm format
  ```
- **Type Checking:**
  ```bash
  pnpm typecheck
  ```
