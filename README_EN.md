<p align="center">
  <img src="public/icon.svg" alt="IconForge" width="80" height="80" />
</p>

<h1 align="center">IconForge</h1>

<p align="center">
  <strong>One SVG. Every Platform Icon.</strong>
</p>

<p align="center">
  <a href="https://codedogqby.github.io/iconforge-landing">Live Demo</a> ·
  <a href="#features">Features</a> ·
  <a href="#getting-started">Getting Started</a> ·
  <a href="./README.md">中文</a>
</p>

---

## Features

- **Multi-platform export** — Generate production-ready icons for iOS, iPadOS, macOS, Android, Windows, Web/PWA, and Tauri (macOS / Win+Linux) in one click
- **Platform-accurate preview** — Preview icons with platform-specific masks (iOS superellipse, Android circle, macOS rounded corners, etc.)
- **SVG file upload & code paste** — Drag-and-drop SVG files or paste raw SVG code directly
- **Customizable** — Adjust background color, padding, and see real-time preview across all platforms
- **Batch ZIP download** — Download all selected platform icons as a neatly organized ZIP archive
- **i18n** — Supports English and Chinese (中文)
- **100% client-side** — No server, no upload — everything runs in your browser

## Tech Stack

- [Next.js](https://nextjs.org/) 16 (App Router, Static Export)
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/) 5
- [Tailwind CSS](https://tailwindcss.com/) 4
- [Lucide React](https://lucide.dev/) — Icons
- [JSZip](https://stuk.github.io/jszip/) + [FileSaver.js](https://github.com/eligrey/FileSaver.js/) — ZIP generation & download
- [pnpm](https://pnpm.io/) — Package manager

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm >= 8

### Install & Run

```bash
# Clone the repo
git clone https://github.com/codedogQBY/iconforge-landing.git
cd iconforge-landing

# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
pnpm build
```

The static output will be in the `out/` directory.

## Deployment

This project is configured for **GitHub Pages** automatic deployment. Every push to the `main` branch triggers a GitHub Actions workflow that builds and deploys the site to:

```
https://codedogQBY.github.io/iconforge-landing
```

See [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) for details.

## Supported Platforms

| Platform | Sizes | Export |
|---|---|---|
| iOS / iPadOS | 16px – 1024px | Square PNG (system masks corners) |
| macOS | 16px – 512px (@2x) | Rounded PNG (22.37% radius) |
| Android | 48px – 512px | Square PNG (system adaptive icon) |
| Windows | 16px – 256px | Square PNG |
| Web / PWA | 16px – 512px + favicon | Square PNG |
| Tauri (macOS) | 32px – 512px | Rounded PNG (22.37% radius) |
| Tauri (Win/Linux) | 30px – 512px + Store Logo | Square PNG |

## License

MIT
