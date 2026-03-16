import { Upload, Hexagon, Github, Twitter, Mail } from "lucide-react";

export function FinalCTA() {
  return (
    <section
      id="cta"
      className="flex flex-col items-center gap-6 px-[120px] py-20 w-full bg-gradient-to-b from-emerald-500 to-emerald-600"
    >
      <h2 className="text-[40px] font-extrabold text-white text-center font-[family-name:var(--font-display)]">
        Ready to forge your icons?
      </h2>
      <p className="text-lg text-white/80 text-center">
        Free, open source, no sign-up required. Just upload and go.
      </p>
      <a
        href="#workspace"
        className="flex items-center gap-2.5 px-8 py-4 bg-white rounded-[14px] hover:bg-zinc-50 transition-colors"
      >
        <Upload className="w-5 h-5 text-emerald-500" />
        <span className="text-base font-semibold text-emerald-500">
          Start Now — It&apos;s Free
        </span>
      </a>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="flex items-center justify-between px-20 py-8 w-full bg-zinc-900">
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 bg-emerald-500 rounded-lg flex items-center justify-center">
          <Hexagon className="w-4 h-4 text-white" fill="white" />
        </div>
        <span className="text-base font-bold text-white font-[family-name:var(--font-display)]">
          IconForge
        </span>
        <span className="text-[13px] text-zinc-500">
          &nbsp;·&nbsp; Open source &amp; free forever
        </span>
      </div>
      <div className="flex items-center gap-6">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          <Github className="w-5 h-5 text-zinc-500 hover:text-zinc-300 transition-colors" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <Twitter className="w-5 h-5 text-zinc-500 hover:text-zinc-300 transition-colors" />
        </a>
        <a href="mailto:hello@iconforge.dev">
          <Mail className="w-5 h-5 text-zinc-500 hover:text-zinc-300 transition-colors" />
        </a>
      </div>
    </footer>
  );
}
