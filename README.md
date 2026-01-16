# Nuclea Teknoloji - AI-Driven Enterprise Solutions

Welcome to the **Nuclea Teknoloji** official web application. This project is a modern, high-performance, and visually stunning corporate website built with cutting-edge frontend technologies to showcase enterprise-grade AI solutions.

## 🚀 Technological Stack

This project leverages a sophisticated stack to ensure performance, maintainability, and a premium user experience.

- **Frontend Framework**: [Angular 18+](https://angular.dev/)
  - Utilizes Standalone Components for a modular and lean architecture.
  - Implements Signal-based state management and reactive patterns with RxJS.
  - Advanced routing with lazy loading for optimized performance.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
  - Custom utility-first styling with a comprehensive design system.
  - Advanced CSS variables for dynamic theming (Dark Mode by default).
- **Animations**: [GSAP (GreenSock Animation Platform)](https://gsock.com/gsap/)
  - Premium scroll-triggered animations and high-performance micro-interactions.
  - Custom scroll services for smooth interaction throughout the application.
- **Icons**: [Lucide Angular](https://lucide.dev/)
  - Scalable vector icons for a clean and consistent UI.
- **Tools & Build**: 
  - TypeScript 5.4+ for robust type safety.
  - PostCSS & Autoprefixer for cross-browser compatibility.

## 🏗️ Project Architecture

The project follows a modular structure, separating concerns between pages, components, and shared services.

```text
src/
├── app/
│   ├── components/         # Feature-specific components (Hero, Services, etc.)
│   ├── pages/              # Main page layouts (Home Page)
│   ├── shared/             # Reusable resources
│   │   ├── animations/     # GSAP-based animation definitions
│   │   ├── components/     # UI kit items (Buttons, Glass Cards, Icons)
│   │   ├── services/       # Global services (Scroll, Animation management)
│   │   └── utils/          # Helper functions
│   ├── models/             # Data models and interfaces
│   ├── app.config.ts       # Global application configuration
│   ├── app.routes.ts       # Main routing definitions
│   └── app.component.ts    # Root component
├── assets/                 # Static assets (Images, Global Styles)
└── styles.scss             # Global design tokens and tailwind imports
```

## ✨ Key Features

- **Premium UI/UX**: Custom-designed glassmorphism effects and modern typography.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop using Tailwind's responsive utilities.
- **Smooth Interaction**: Integrated GSAP-based smooth scrolling and reveal animations.
- **Bento-style Layouts**: Modern grid systems for showcasing technological capabilities.
- **Performance Optimized**: Lazy loading of components and assets to ensure fast initial paint times.

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or later)
- [npm](https://www.npmjs.com/) (v9.x or later)
- [Angular CLI](https://angular.dev/cli) (v18.x or later)

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Development Server

Run the development server on `http://localhost:4200/`:
```bash
npm start
```

### Production Build

Build the project for production:
```bash
npm run build
```
