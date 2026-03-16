"use client";

import { Hexagon, Globe } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function Navbar() {
  const { locale, setLocale, t } = useI18n();

  return (
    <nav className="flex items-center justify-between px-20 py-4 w-full">
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 bg-emerald-500 rounded-[10px] flex items-center justify-center">
          <Hexagon className="w-5 h-5 text-white" fill="white" />
        </div>
        <span className="text-[22px] font-extrabold text-zinc-900 font-[family-name:var(--font-display)]">
          IconForge
        </span>
      </div>

      {/* Links */}
      <div className="flex items-center gap-8">
        <a href="#features" className="text-[15px] font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
          {t("nav.features")}
        </a>
        <a href="#platforms" className="text-[15px] font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
          {t("nav.platforms")}
        </a>
        <a
          href="https://github.com/codedogQBY/iconforge-landing"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[15px] font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
        >
          GitHub
        </a>

        {/* Language Switcher */}
        <button
          onClick={() => setLocale(locale === "en" ? "zh" : "en")}
          className="flex items-center gap-1 px-3 py-2 rounded-lg border border-zinc-200 hover:border-zinc-300 transition-colors"
        >
          <Globe className="w-4 h-4 text-zinc-500" />
          <span className="text-[13px] font-medium text-zinc-500">
            {locale === "en" ? "EN / 中文" : "中文 / EN"}
          </span>
        </button>

        {/* CTA */}
        <a
          href="#cta"
          className="px-5 py-2.5 bg-emerald-500 text-white text-sm font-semibold rounded-[10px] hover:bg-emerald-600 transition-colors"
        >
          {t("nav.getStarted")}
        </a>
      </div>
    </nav>
  );
}
