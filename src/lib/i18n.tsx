"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type Locale = "en" | "zh";

const dict = {
  // Navbar
  "nav.features": { en: "Features", zh: "功能" },
  "nav.platforms": { en: "Platforms", zh: "平台" },
  "nav.getStarted": { en: "Get Started", zh: "开始使用" },

  // Hero
  "hero.badge": { en: "Free & Open Source", zh: "免费且开源" },
  "hero.title": { en: "One SVG. Every Platform Icon.", zh: "一个 SVG，生成所有平台图标。" },
  "hero.subtitle": {
    en: "Upload your SVG logo, customize background color, padding and corners — get production-ready icons for macOS, Windows, iOS, Android, Web and Tauri in one click.",
    zh: "上传你的 SVG Logo，自定义背景色、内边距和圆角 —— 一键生成 macOS、Windows、iOS、Android、Web 和 Tauri 的生产级图标。",
  },
  "hero.uploadSvg": { en: "Upload SVG", zh: "上传 SVG" },
  "hero.viewOnGithub": { en: "View on GitHub", zh: "查看 GitHub" },

  // IconWorkspace
  "ws.uploadFile": { en: "Upload File", zh: "上传文件" },
  "ws.pasteSvgCode": { en: "Paste SVG Code", zh: "粘贴 SVG 代码" },
  "ws.dropHere": { en: "Drop your SVG here or click to browse", zh: "拖放 SVG 文件到此处或点击浏览" },
  "ws.supportsAnySvg": { en: "Supports any valid SVG file", zh: "支持任意有效的 SVG 文件" },
  "ws.pasteHint": {
    en: 'Paste your SVG code here, e.g.\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">...</svg>',
    zh: '在此粘贴 SVG 代码，例如\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">...</svg>',
  },
  "ws.useThisSvg": { en: "Use This SVG", zh: "使用此 SVG" },
  "ws.invalidSvg": { en: "Invalid SVG code. Please paste valid SVG markup.", zh: "无效的 SVG 代码，请粘贴正确的 SVG 标记。" },
  "ws.pleaseUploadSvg": { en: "Please upload an SVG file", zh: "请上传 SVG 文件" },
  "ws.bgColor": { en: "Background Color", zh: "背景颜色" },
  "ws.padding": { en: "Padding", zh: "内边距" },
  "ws.platforms": { en: "Platforms", zh: "平台" },
  "ws.selectAll": { en: "Select All", zh: "全选" },
  "ws.deselectAll": { en: "Deselect All", zh: "取消全选" },
  "ws.downloadZip": { en: "Download ZIP", zh: "下载 ZIP" },
  "ws.generating": { en: "Generating...", zh: "生成中…" },
  "ws.genFailed": { en: "Generation failed. Please try again.", zh: "生成失败，请重试。" },
  "ws.sizes": { en: "sizes", zh: "个尺寸" },

  // HowItWorks
  "how.badge": { en: "How it works", zh: "如何使用" },
  "how.title": { en: "Three steps. Zero hassle.", zh: "三步完成，零门槛。" },
  "how.subtitle": { en: "From SVG to production-ready icons in under 10 seconds.", zh: "从 SVG 到生产级图标，10 秒搞定。" },
  "how.step1.title": { en: "Upload SVG", zh: "上传 SVG" },
  "how.step1.desc": {
    en: "Drag and drop your SVG logo or click to browse. We support any valid SVG file.",
    zh: "拖放你的 SVG Logo 或点击浏览，支持任意有效的 SVG 文件。",
  },
  "how.step2.title": { en: "Customize", zh: "自定义" },
  "how.step2.desc": {
    en: "Pick background color, adjust padding, set corner radius. Real-time preview for every platform.",
    zh: "选择背景色、调整内边距、设置圆角。每个平台实时预览。",
  },
  "how.step3.title": { en: "Download ZIP", zh: "下载 ZIP" },
  "how.step3.desc": {
    en: "One click generates all formats. Download a ZIP organized by platform, ready for your project.",
    zh: "一键生成所有格式，按平台分文件夹的 ZIP 直接用到项目里。",
  },

  // Highlights
  "hl.title": { en: "Why developers love IconForge", zh: "开发者为什么喜欢 IconForge" },
  "hl.clientSide": { en: "100% Client-Side", zh: "100% 本地处理" },
  "hl.clientSideDesc": {
    en: "Your files never leave your browser. All processing happens locally.",
    zh: "文件不会离开你的浏览器，所有处理均在本地完成。",
  },
  "hl.pixelPerfect": { en: "Pixel Perfect", zh: "像素级精准" },
  "hl.pixelPerfectDesc": {
    en: "8x supersampled anti-aliasing ensures silky smooth edges at every size.",
    zh: "8 倍超采样抗锯齿，确保每个尺寸都有丝滑的边缘。",
  },
  "hl.oneClickZip": { en: "One-Click ZIP", zh: "一键下载 ZIP" },
  "hl.oneClickZipDesc": {
    en: "Get a neatly organized ZIP with folders for each platform. Drop into your project instantly.",
    zh: "获得按平台整齐分类的 ZIP 文件，直接放入项目即可使用。",
  },

  // AppPreview
  "ap.background": { en: "Background:", zh: "背景:" },
  "ap.padding": { en: "Padding: 10%", zh: "内边距: 10%" },

  // FinalCTA
  "cta.title": { en: "Ready to forge your icons?", zh: "准备好生成你的图标了吗？" },
  "cta.subtitle": {
    en: "Free, open source, no sign-up required. Just upload and go.",
    zh: "免费、开源、无需注册，上传即用。",
  },
  "cta.startNow": { en: "Start Now — It's Free", zh: "立即开始 — 完全免费" },

  // Footer
  "footer.tagline": { en: "Open source & free forever", zh: "永久开源且免费" },

  // Layout metadata
  "meta.title": { en: "IconForge — One SVG. Every Platform Icon.", zh: "IconForge — 一个 SVG，生成所有平台图标。" },
  "meta.description": {
    en: "Upload your SVG logo, customize background color, padding and corners — get production-ready icons for macOS, Windows, iOS, Android, Web and Tauri in one click.",
    zh: "上传你的 SVG Logo，自定义背景色、内边距和圆角 —— 一键生成 macOS、Windows、iOS、Android、Web 和 Tauri 的生产级图标。",
  },
} as const;

export type TransKey = keyof typeof dict;

interface I18nContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: TransKey) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("zh");

  const t = useCallback(
    (key: TransKey): string => {
      const entry = dict[key];
      return entry ? entry[locale] : key;
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
