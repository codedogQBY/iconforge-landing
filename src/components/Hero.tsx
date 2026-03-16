import { Upload, Github } from "lucide-react";

export default function Hero() {
  return (
    <section className="flex flex-col items-center gap-6 px-20 pt-20 pb-15 w-full">
      {/* Badge */}
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/[0.12]">
        <div className="w-2 h-2 rounded-full bg-emerald-500" />
        <span className="text-[13px] font-semibold text-emerald-500">
          Free &amp; Open Source
        </span>
      </div>

      {/* Headline */}
      <h1 className="text-[56px] font-extrabold leading-[1.1] text-zinc-900 text-center max-w-[900px] font-[family-name:var(--font-display)]">
        One SVG. Every Platform Icon.
      </h1>

      {/* Subline */}
      <p className="text-lg leading-[1.6] text-zinc-500 text-center max-w-[700px]">
        Upload your SVG logo, customize background color, padding and corners —
        get production-ready icons for macOS, Windows, iOS, Android, Web and
        Tauri in one click.
      </p>

      {/* CTAs */}
      <div className="flex items-center gap-4">
        <a
          href="#workspace"
          className="flex items-center gap-2.5 px-8 py-4 bg-emerald-500 rounded-[14px] hover:bg-emerald-600 transition-colors"
        >
          <Upload className="w-5 h-5 text-white" />
          <span className="text-base font-semibold text-white">Upload SVG</span>
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-8 py-4 rounded-[14px] border-[1.5px] border-zinc-200 hover:border-zinc-300 transition-colors"
        >
          <Github className="w-5 h-5 text-zinc-900" />
          <span className="text-base font-semibold text-zinc-900">
            View on GitHub
          </span>
        </a>
      </div>
    </section>
  );
}
