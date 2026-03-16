import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-jakarta",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const siteUrl = "https://codedogqby.github.io/iconforge-landing";

export const metadata: Metadata = {
  title: "IconForge — 一个 SVG，生成所有平台图标",
  description:
    "上传你的 SVG Logo，自定义背景色、内边距和圆角 —— 一键生成 macOS、Windows、iOS、Android、Web 和 Tauri 的生产级图标。100% 浏览器端处理，无需上传服务器。",
  keywords: [
    "IconForge",
    "SVG",
    "图标生成器",
    "icon generator",
    "app icon",
    "iOS icon",
    "macOS icon",
    "Android icon",
    "Tauri icon",
    "favicon",
    "PWA icon",
  ],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "IconForge — 一个 SVG，生成所有平台图标",
    description:
      "上传 SVG，一键生成 iOS、macOS、Android、Windows、Web、Tauri 全平台图标。",
    url: siteUrl,
    siteName: "IconForge",
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "IconForge — 一个 SVG，生成所有平台图标",
    description:
      "上传 SVG，一键生成 iOS、macOS、Android、Windows、Web、Tauri 全平台图标。",
  },
  icons: {
    icon: "/icon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className={`${jakarta.variable} ${inter.variable} antialiased`}>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
