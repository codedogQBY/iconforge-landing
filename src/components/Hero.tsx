"use client";

import { Upload, Github } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function Hero() {
  const { t } = useI18n();

  return (
    <section className="flex flex-col items-center gap-6 px-20 pt-20 pb-15 w-full">
      {/* Badge */}
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/[0.12]">
        <div className="w-2 h-2 rounded-full bg-emerald-500" />
        <span className="text-[13px] font-semibold text-emerald-500">
          {t("hero.badge")}
        </span>
      </div>

      {/* Headline */}
      <h1 className="text-[56px] font-extrabold leading-[1.1] text-zinc-900 text-center max-w-[900px] font-[family-name:var(--font-display)]">
        {t("hero.title")}
      </h1>

      {/* Subline */}
      <p className="text-lg leading-[1.6] text-zinc-500 text-center max-w-[700px]">
        {t("hero.subtitle")}
      </p>

      {/* CTAs */}
      <div className="flex items-center gap-4">
        <a
          href="#workspace"
          className="flex items-center gap-2.5 px-8 py-4 bg-emerald-500 rounded-[14px] hover:bg-emerald-600 transition-colors"
        >
          <Upload className="w-5 h-5 text-white" />
          <span className="text-base font-semibold text-white">{t("hero.uploadSvg")}</span>
        </a>
        <a
          href="https://github.com/codedogQBY/iconforge-landing"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-8 py-4 rounded-[14px] border-[1.5px] border-zinc-200 hover:border-zinc-300 transition-colors"
        >
          <Github className="w-5 h-5 text-zinc-900" />
          <span className="text-base font-semibold text-zinc-900">
            {t("hero.viewOnGithub")}
          </span>
        </a>
      </div>
    </section>
  );
}
