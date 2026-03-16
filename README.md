<p align="center">
  <img src="./public/icon.svg" alt="IconForge" width="80" height="80" />
</p>

<h1 align="center">IconForge</h1>

<p align="center">
  <strong>一个 SVG，生成所有平台图标。</strong>
</p>

<p align="center">
  <a href="https://codedogqby.github.io/iconforge-landing">在线体验</a> ·
  <a href="#功能特性">功能特性</a> ·
  <a href="#快速开始">快速开始</a> ·
  <a href="./README_EN.md">English</a>
</p>

---

## 功能特性

- **多平台导出** — 一键生成 iOS、iPadOS、macOS、Android、Windows、Web/PWA、Tauri (macOS / Win+Linux) 的生产级图标
- **终态预览** — 预览各平台特定遮罩效果（iOS 超椭圆、Android 圆形、macOS 圆角等）
- **SVG 文件上传 & 代码粘贴** — 支持拖拽上传 SVG 文件或直接粘贴 SVG 代码
- **自定义配置** — 调整背景色、内边距，所有平台实时预览
- **批量 ZIP 下载** — 将所选平台图标打包为整理好的 ZIP 压缩包
- **国际化** — 支持中文和英文
- **100% 客户端** — 无需服务器、无需上传，一切在浏览器中完成

## 技术栈

- [Next.js](https://nextjs.org/) 16 (App Router, 静态导出)
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/) 5
- [Tailwind CSS](https://tailwindcss.com/) 4
- [Lucide React](https://lucide.dev/) — 图标
- [JSZip](https://stuk.github.io/jszip/) + [FileSaver.js](https://github.com/eligrey/FileSaver.js/) — ZIP 生成与下载
- [pnpm](https://pnpm.io/) — 包管理器

## 快速开始

### 环境要求

- Node.js >= 18
- pnpm >= 8

### 安装 & 运行

```bash
# 克隆仓库
git clone https://github.com/codedogQBY/iconforge-landing.git
cd iconforge-landing

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

浏览器打开 [http://localhost:3000](http://localhost:3000) 即可。

### 构建

```bash
pnpm build
```

静态文件输出到 `out/` 目录。

## 部署

项目已配置 **GitHub Pages** 自动部署。每次推送到 `main` 分支会自动触发 GitHub Actions 构建并部署到：

```
https://codedogQBY.github.io/iconforge-landing
```

详见 [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)。

## 支持平台

| 平台 | 尺寸 | 导出格式 |
|---|---|---|
| iOS / iPadOS | 16px – 1024px | 方形 PNG（系统自动裁切圆角） |
| macOS | 16px – 512px (@2x) | 圆角 PNG（22.37% 圆角） |
| Android | 48px – 512px | 方形 PNG（系统自适应图标） |
| Windows | 16px – 256px | 方形 PNG |
| Web / PWA | 16px – 512px + favicon | 方形 PNG |
| Tauri (macOS) | 32px – 512px | 圆角 PNG（22.37% 圆角） |
| Tauri (Win/Linux) | 30px – 512px + Store Logo | 方形 PNG |

## 许可证

MIT
