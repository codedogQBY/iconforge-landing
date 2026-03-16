"use client";

import { useI18n } from "@/lib/i18n";
import type { TransKey } from "@/lib/i18n";

const steps: { num: string; color: string; titleKey: TransKey; descKey: TransKey }[] = [
  { num: "1", color: "bg-emerald-500", titleKey: "how.step1.title", descKey: "how.step1.desc" },
  { num: "2", color: "bg-teal-500", titleKey: "how.step2.title", descKey: "how.step2.desc" },
  { num: "3", color: "bg-amber-500", titleKey: "how.step3.title", descKey: "how.step3.desc" },
];

export default function HowItWorks() {
  const { t } = useI18n();

  return (
    <section id="features" className="flex flex-col items-center gap-12 bg-zinc-100 px-[120px] py-20 w-full">
      {/* Header */}
      <div className="flex flex-col items-center gap-3">
        <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/[0.12] text-xs font-semibold text-emerald-500">
          {t("how.badge")}
        </span>
        <h2 className="text-[40px] font-extrabold text-zinc-900 text-center font-[family-name:var(--font-display)]">
          {t("how.title")}
        </h2>
        <p className="text-[17px] text-zinc-500 text-center">
          {t("how.subtitle")}
        </p>
      </div>

      {/* Step cards */}
      <div className="grid grid-cols-3 gap-6 w-full">
        {steps.map((step) => (
          <div
            key={step.num}
            className="flex flex-col gap-5 p-8 bg-white rounded-[20px] border border-zinc-200"
          >
            <div
              className={`w-11 h-11 ${step.color} rounded-xl flex items-center justify-center`}
            >
              <span className="text-xl font-extrabold text-white font-[family-name:var(--font-display)]">
                {step.num}
              </span>
            </div>
            <h3 className="text-xl font-bold text-zinc-900 font-[family-name:var(--font-display)]">
              {t(step.titleKey)}
            </h3>
            <p className="text-[15px] leading-[1.6] text-zinc-500">
              {t(step.descKey)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
