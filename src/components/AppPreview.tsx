"use client";

import {
  Image,
  Monitor,
  LayoutGrid,
  Smartphone,
  TabletSmartphone,
  Globe,
  Package,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { LucideIcon } from "lucide-react";

const platforms: {
  icon: LucideIcon;
  label: string;
  size: string;
  gradient: string;
  radius: string;
}[] = [
  {
    icon: Monitor,
    label: "macOS",
    size: "icns + 6 PNGs",
    gradient: "from-emerald-500 to-emerald-600",
    radius: "rounded-[22px]",
  },
  {
    icon: LayoutGrid,
    label: "Windows",
    size: "ico + Store logos",
    gradient: "from-blue-500 to-blue-700",
    radius: "rounded-[4px]",
  },
  {
    icon: Smartphone,
    label: "iOS",
    size: "AppIcon set",
    gradient: "from-pink-400 to-pink-600",
    radius: "rounded-[22px]",
  },
  {
    icon: TabletSmartphone,
    label: "Android",
    size: "Adaptive icons",
    gradient: "from-teal-500 to-teal-600",
    radius: "rounded-[22px]",
  },
  {
    icon: Globe,
    label: "Web / PWA",
    size: "Favicon + PWA",
    gradient: "from-amber-500 to-amber-600",
    radius: "rounded-[22px]",
  },
  {
    icon: Package,
    label: "Tauri",
    size: "Full icon set",
    gradient: "from-red-500 to-red-600",
    radius: "rounded-[22px]",
  },
];

export default function AppPreview() {
  const { t } = useI18n();

  return (
    <section id="platforms" className="flex justify-center px-20 pb-20 w-full">
      <div className="w-full max-w-[1100px] bg-zinc-100 rounded-3xl border border-zinc-200 p-8 flex flex-col gap-6">
        {/* Top bar */}
        <div className="flex items-center justify-between w-full">
          {/* Upload area */}
          <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-xl border border-zinc-300">
            <Image className="w-5 h-5 text-emerald-500" />
            <span className="text-sm font-medium text-zinc-900">
              my-logo.svg
            </span>
          </div>

          {/* Settings */}
          <div className="flex items-center gap-3">
            <span className="text-[13px] font-medium text-zinc-500">
              {t("ap.background")}
            </span>
            <div className="w-6 h-6 rounded-full bg-white border-2 border-emerald-500" />
            <div className="w-6 h-6 rounded-full bg-zinc-900 border border-zinc-300" />
            <div className="w-6 h-6 rounded-full bg-zinc-200 border border-zinc-300" />
            <span className="text-[13px] font-medium text-zinc-500">
              {t("ap.padding")}
            </span>
          </div>
        </div>

        {/* Platform grid */}
        <div className="grid grid-cols-6 gap-4 w-full">
          {platforms.map((p) => (
            <div
              key={p.label}
              className="flex flex-col items-center gap-3 p-5 bg-white rounded-2xl border border-zinc-200"
            >
              <div
                className={`w-24 h-24 bg-gradient-to-b ${p.gradient} ${p.radius} flex items-center justify-center`}
              >
                <p.icon className="w-10 h-10 text-white" />
              </div>
              <span className="text-sm font-semibold text-zinc-900">
                {p.label}
              </span>
              <span className="text-xs text-zinc-400">{p.size}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
