export interface IconSpec {
  name: string;
  size: number;
}

export interface Platform {
  id: string;
  label: string;
  description: string;
  icon: string; // lucide icon name
  gradient: [string, string];
  borderRadius: string; // CSS preview border radius (视觉模拟)
  cornerRadiusRatio: number; // Canvas 渲染圆角比例 (0~0.5)，0 = 方形导出
  specs: IconSpec[];
}

// ============================================================
// 各平台图标规范说明：
//
// 【iOS / iPadOS】
//   - Xcode 15+ 只需提交 1024x1024，系统自动缩放
//   - 但为兼容旧项目，仍导出所有常用尺寸
//   - 导出必须为方形、无透明、无圆角（系统自动加超椭圆遮罩）
//   - 不要自己加圆角！
//
// 【macOS】
//   - .iconset 需要 10 张 PNG（16~512 含 @2x）
//   - macOS 图标本身就带圆角+阴影，但 Apple 建议提交方形图
//   - 系统自动加圆角遮罩
//
// 【Android】
//   - 自适应图标：108x108dp，前景/背景各一层
//   - 安全区：中心 66dp（约 61%），外部 18dp 留给系统裁切
//   - 导出尺寸：mdpi(48) hdpi(72) xhdpi(96) xxhdpi(144) xxxhdpi(192)
//   - Play Store: 512x512
//   - 导出方形，系统按厂商决定圆角/圆形
//
// 【Windows】
//   - ICO 格式包含多尺寸
//   - 方形无圆角
//
// 【Web / PWA】
//   - favicon: 16, 32, 48
//   - apple-touch-icon: 180
//   - PWA manifest: 192, 512
//   - maskable icon: 512（需要安全区 padding）
//   - 方形无圆角
//
// 【Tauri】
//   - 需要：32x32, 128x128, 128x128@2x(256), icon.png(512)
//   - Windows 部分：Square*Logo 系列 + StoreLogo
//   - macOS/Linux 部分通过 icns/ico 生成
// ============================================================

export const platforms: Platform[] = [
  {
    id: "ios",
    label: "iOS / iPadOS",
    description: "AppIcon set (方形导出，系统加圆角)",
    icon: "smartphone",
    gradient: ["#F472B6", "#DB2777"],
    borderRadius: "22.37%", // 模拟 iOS 超椭圆视觉
    cornerRadiusRatio: 0, // 导出方形！系统自动裁切
    specs: [
      // Xcode 15+ 主要只需 1024，但兼容导出所有常用尺寸
      { name: "AppIcon-1024", size: 1024 },
      // iPhone
      { name: "iPhone-60@3x", size: 180 },
      { name: "iPhone-60@2x", size: 120 },
      { name: "iPhone-40@3x", size: 120 },
      { name: "iPhone-40@2x", size: 80 },
      { name: "iPhone-29@3x", size: 87 },
      { name: "iPhone-29@2x", size: 58 },
      { name: "iPhone-20@3x", size: 60 },
      { name: "iPhone-20@2x", size: 40 },
      // iPad
      { name: "iPad-83.5@2x", size: 167 },
      { name: "iPad-76@2x", size: 152 },
      { name: "iPad-76", size: 76 },
      { name: "iPad-40@2x", size: 80 },
      { name: "iPad-40", size: 40 },
      { name: "iPad-29@2x", size: 58 },
      { name: "iPad-29", size: 29 },
      { name: "iPad-20@2x", size: 40 },
      { name: "iPad-20", size: 20 },
    ],
  },
  {
    id: "macos",
    label: "macOS",
    description: ".iconset PNGs (方形导出，系统加圆角)",
    icon: "monitor",
    gradient: ["#10B981", "#059669"],
    borderRadius: "22.37%", // 模拟 macOS 圆角视觉
    cornerRadiusRatio: 0, // 导出方形！macOS 系统自动加圆角
    specs: [
      { name: "icon_512x512@2x", size: 1024 },
      { name: "icon_512x512", size: 512 },
      { name: "icon_256x256@2x", size: 512 },
      { name: "icon_256x256", size: 256 },
      { name: "icon_128x128@2x", size: 256 },
      { name: "icon_128x128", size: 128 },
      { name: "icon_32x32@2x", size: 64 },
      { name: "icon_32x32", size: 32 },
      { name: "icon_16x16@2x", size: 32 },
      { name: "icon_16x16", size: 16 },
    ],
  },
  {
    id: "android",
    label: "Android",
    description: "自适应图标 (方形导出，系统裁切形状)",
    icon: "tablet-smartphone",
    gradient: ["#14B8A6", "#0D9488"],
    borderRadius: "22.37%", // Android 常见圆角矩形
    cornerRadiusRatio: 0, // 导出方形！系统自适应裁切
    specs: [
      { name: "playstore-icon-512", size: 512 },
      { name: "mipmap-xxxhdpi/ic_launcher", size: 192 },
      { name: "mipmap-xxhdpi/ic_launcher", size: 144 },
      { name: "mipmap-xhdpi/ic_launcher", size: 96 },
      { name: "mipmap-hdpi/ic_launcher", size: 72 },
      { name: "mipmap-mdpi/ic_launcher", size: 48 },
    ],
  },
  {
    id: "windows",
    label: "Windows",
    description: "ICO + Store Logo (方形无圆角)",
    icon: "layout-grid",
    gradient: ["#3B82F6", "#1D4ED8"],
    borderRadius: "0",
    cornerRadiusRatio: 0,
    specs: [
      { name: "icon_256", size: 256 },
      { name: "icon_128", size: 128 },
      { name: "icon_64", size: 64 },
      { name: "icon_48", size: 48 },
      { name: "icon_32", size: 32 },
      { name: "icon_24", size: 24 },
      { name: "icon_16", size: 16 },
      { name: "StoreLogo_150", size: 150 },
      { name: "StoreLogo_50", size: 50 },
    ],
  },
  {
    id: "web",
    label: "Web / PWA",
    description: "Favicon + PWA manifest (方形无圆角)",
    icon: "globe",
    gradient: ["#F59E0B", "#D97706"],
    borderRadius: "0",
    cornerRadiusRatio: 0,
    specs: [
      { name: "pwa-512x512", size: 512 },
      { name: "pwa-maskable-512x512", size: 512 },
      { name: "pwa-192x192", size: 192 },
      { name: "apple-touch-icon-180", size: 180 },
      { name: "favicon-48x48", size: 48 },
      { name: "favicon-32x32", size: 32 },
      { name: "favicon-16x16", size: 16 },
    ],
  },
  {
    id: "tauri",
    label: "Tauri",
    description: "跨平台图标集 (32~512 + Store Logo)",
    icon: "package",
    gradient: ["#EF4444", "#DC2626"],
    borderRadius: "0",
    cornerRadiusRatio: 0,
    specs: [
      { name: "icon", size: 512 },
      { name: "128x128@2x", size: 256 },
      { name: "128x128", size: 128 },
      { name: "32x32", size: 32 },
      // Windows Store Logo 系列
      { name: "Square310x310Logo", size: 310 },
      { name: "Square284x284Logo", size: 284 },
      { name: "Square150x150Logo", size: 150 },
      { name: "Square142x142Logo", size: 142 },
      { name: "Square107x107Logo", size: 107 },
      { name: "Square89x89Logo", size: 89 },
      { name: "Square71x71Logo", size: 71 },
      { name: "Square44x44Logo", size: 44 },
      { name: "Square30x30Logo", size: 30 },
      { name: "StoreLogo", size: 50 },
    ],
  },
];
