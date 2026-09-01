# Vectra Physical AI — Documentation & Curriculum Frontend

> Modern static documentation and interactive web application for the **Vectra Physical AI & Humanoid Robotics** curriculum, built with Docusaurus 3, React 19, and TypeScript.

---

## 🚀 Overview

- **Engine**: [Docusaurus 3.9+](https://docusaurus.io/)
- **Theme System**: Dual-engine adaptive Light and Obsidian Dark modes with custom CSS tokens.
- **Icons**: Scalable vector icons via `lucide-react` (zero informal emojis).
- **Interactive AI Copilot**: Context-aware floating assistant widget (`ChatWidget`) with text-selection prompt trigger.
- **Syntax Highlighting**: High-contrast Prism token palette for Python (`rclpy`), C++, URDF/Xacro, YAML, and Bash.

---

## 📂 Directory Structure

```
book-source/
├── docs/                      # 10 Chapters across 4 Parts (80+ Lessons)
│   ├── intro.md               # Curriculum introduction & prerequisites
│   ├── Part-1-ROS2-Foundation/
│   ├── Part-2-Digital-Twin/
│   ├── Part-3-Advanced-Simulation-Perception/
│   └── Part-4-Vision-Language-Action/
├── src/
│   ├── components/
│   │   └── ChatWidget/        # AI Copilot widget & tooltip launcher
│   ├── css/
│   │   └── custom.css         # Global design system & theme variables
│   ├── pages/
│   │   ├── index.tsx          # High-impact modern homepage
│   │   └── index.module.css   # Homepage styles & layout tokens
│   └── theme/
│       └── Layout.js          # Root layout wrapper with Copilot integration
├── static/
│   ├── img/                   # Brand logo emblem and SVG graphics
│   └── robots.txt
├── docusaurus.config.ts       # Site configuration, navbar, footer, and plugins
└── sidebars.ts                # Auto-generated & structured curriculum sidebars
```

---

## ⚙️ Environment Configuration

Create a `.env` file in this directory (optional for local mock copilot, required for live backend):

```bash
cp .env.example .env
```

```ini
# Backend API Base URL for Copilot Widget
CHATBOT_API_BASE=http://localhost:3000/api
```

---

## 🛠️ Development & Build Commands

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
# Default port 3000
npm run start

# Or specify a custom port (e.g. 3005)
npm run start -- --port 3005 --no-open
```
The site will be live at `http://localhost:3005/humanoid-robotics/`.

### 3. Type Checking
```bash
npm run typecheck
```

### 4. Build Production Static Files
```bash
npm run build
```
The optimized production bundle will be generated into the `./build` directory.

### 5. Preview Production Build Locally
```bash
npm run serve
```

---

## 🎨 Design System Guide

### CSS Custom Properties (`src/css/custom.css`)

| Token | Light Mode Value | Dark Mode Value | Usage |
| :--- | :--- | :--- | :--- |
| `--ifm-color-primary` | `#0284c7` (Sky-600) | `#00f0ff` (Cyber Cyan) | Brand primary & active links |
| `--ifm-background-color` | `#f8fafc` (Slate-50) | `#06080f` (Obsidian) | Body background |
| `--ifm-background-surface-color` | `#ffffff` | `#0b0f19` | Cards, sidebars & panels |
| `--ifm-toc-border-color` | `#e2e8f0` | `#1a2234` | Separators and borders |
| `--cyber-border-glow` | `rgba(2, 132, 199, 0.2)` | `rgba(0, 240, 255, 0.35)` | Neon hover halos |

---

## 🚀 Deployment

### GitHub Pages
```bash
GIT_USER=<your-github-username> npm run deploy
```

### Vercel / Netlify / Cloudflare Pages
1. Root Directory: `human-robotics-book/book-source`
2. Build Command: `npm run build`
3. Output Directory: `build`
