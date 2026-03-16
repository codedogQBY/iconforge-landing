"use client";

import { Zap, ShieldCheck, Download } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { TransKey } from "@/lib/i18n";
import type { LucideIcon } from "lucide-react";

const highlights: { icon: LucideIcon; iconColor: string; iconBg: string; titleKey: TransKey; descKey: TransKey }[] = [
  {
    icon: Zap,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-500/[0.12]",
    titleKey: "hl.clientSide",
    descKey: "hl.clientSideDesc",
  },
  {
    icon: ShieldCheck,
    iconColor: "text-teal-500",
    iconBg: "bg-teal-500/[0.12]",
    titleKey: "hl.pixelPerfect",
    descKey: "hl.pixelPerfectDesc",
  },
  {
    icon: Download,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/[0.12]",
    titleKey: "hl.oneClickZip",
    descKey: "hl.oneClickZipDesc",
  },
];

export default function Highlights() {
  const { t } = useI18n();

  return (
    <section className="flex flex-col items-center gap-12 px-[120px] py-20 w-full">
      <h2 className="text-4xl font-extrabold text-zinc-900 text-center font-[family-name:var(--font-display)]">
        {t("hl.title")}
      </h2>

      <div className="grid grid-cols-3 gap-5 w-full">
        {highlights.map((h) => (
          <div
            key={h.titleKey}
            className="flex flex-col gap-4 p-7 bg-zinc-100 rounded-[20px]"
          >
            <div
              className={`w-12 h-12 ${h.iconBg} rounded-[14px] flex items-center justify-center`}
            >
              <h.icon className={`w-6 h-6 ${h.iconColor}`} />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 font-[family-name:var(--font-display)]">
              {t(h.titleKey)}
            </h3>
            <p className="text-sm leading-[1.6] text-zinc-500">{t(h.descKey)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
