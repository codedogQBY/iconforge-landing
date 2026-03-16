import { Zap, ShieldCheck, Download } from "lucide-react";

const highlights = [
  {
    icon: Zap,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-500/[0.12]",
    title: "100% Client-Side",
    desc: "Your files never leave your browser. All processing happens locally.",
  },
  {
    icon: ShieldCheck,
    iconColor: "text-teal-500",
    iconBg: "bg-teal-500/[0.12]",
    title: "Pixel Perfect",
    desc: "8x supersampled anti-aliasing ensures silky smooth edges at every size.",
  },
  {
    icon: Download,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/[0.12]",
    title: "One-Click ZIP",
    desc: "Get a neatly organized ZIP with folders for each platform. Drop into your project instantly.",
  },
];

export default function Highlights() {
  return (
    <section className="flex flex-col items-center gap-12 px-[120px] py-20 w-full">
      <h2 className="text-4xl font-extrabold text-zinc-900 text-center font-[family-name:var(--font-display)]">
        Why developers love IconForge
      </h2>

      <div className="grid grid-cols-3 gap-5 w-full">
        {highlights.map((h) => (
          <div
            key={h.title}
            className="flex flex-col gap-4 p-7 bg-zinc-100 rounded-[20px]"
          >
            <div
              className={`w-12 h-12 ${h.iconBg} rounded-[14px] flex items-center justify-center`}
            >
              <h.icon className={`w-6 h-6 ${h.iconColor}`} />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 font-[family-name:var(--font-display)]">
              {h.title}
            </h3>
            <p className="text-sm leading-[1.6] text-zinc-500">{h.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
