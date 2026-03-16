const steps = [
  {
    num: "1",
    color: "bg-emerald-500",
    title: "Upload SVG",
    desc: "Drag and drop your SVG logo or click to browse. We support any valid SVG file.",
  },
  {
    num: "2",
    color: "bg-teal-500",
    title: "Customize",
    desc: "Pick background color, adjust padding, set corner radius. Real-time preview for every platform.",
  },
  {
    num: "3",
    color: "bg-amber-500",
    title: "Download ZIP",
    desc: "One click generates all formats. Download a ZIP organized by platform, ready for your project.",
  },
];

export default function HowItWorks() {
  return (
    <section id="features" className="flex flex-col items-center gap-12 bg-zinc-100 px-[120px] py-20 w-full">
      {/* Header */}
      <div className="flex flex-col items-center gap-3">
        <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/[0.12] text-xs font-semibold text-emerald-500">
          How it works
        </span>
        <h2 className="text-[40px] font-extrabold text-zinc-900 text-center font-[family-name:var(--font-display)]">
          Three steps. Zero hassle.
        </h2>
        <p className="text-[17px] text-zinc-500 text-center">
          From SVG to production-ready icons in under 10 seconds.
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
              {step.title}
            </h3>
            <p className="text-[15px] leading-[1.6] text-zinc-500">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
