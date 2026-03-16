"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  Upload,
  X,
  Download,
  Monitor,
  LayoutGrid,
  Smartphone,
  TabletSmartphone,
  Globe,
  Package,
  Check,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import { generatePreview, generateAllAndDownload } from "@/lib/iconGenerator";
import { platforms } from "@/lib/platforms";
import type { LucideIcon } from "lucide-react";

const platformIcons: Record<string, LucideIcon> = {
  monitor: Monitor,
  "layout-grid": LayoutGrid,
  smartphone: Smartphone,
  "tablet-smartphone": TabletSmartphone,
  globe: Globe,
  package: Package,
};

const presetColors = [
  { color: "#FFFFFF", label: "White", border: true },
  { color: "#18181B", label: "Black", border: false },
  { color: "#10B981", label: "Green", border: false },
  { color: "#3B82F6", label: "Blue", border: false },
  { color: "#EF4444", label: "Red", border: false },
  { color: "#F59E0B", label: "Amber", border: false },
  { color: "#8B5CF6", label: "Purple", border: false },
  { color: "transparent", label: "Transparent", border: true },
];

export default function IconWorkspace() {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [svgName, setSvgName] = useState("");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [padding, setPadding] = useState(10);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(
    platforms.map((p) => p.id)
  );
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.name.endsWith(".svg")) {
      alert("Please upload an SVG file");
      return;
    }
    setSvgName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      setSvgContent(e.target?.result as string);
    };
    reader.readAsText(file);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const togglePlatform = (id: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  // Generate previews when settings change
  useEffect(() => {
    if (!svgContent) return;

    const generateAll = async () => {
      const newPreviews: Record<string, string> = {};
      for (const p of platforms) {
        try {
          const preview = await generatePreview(svgContent, 200, {
            bgColor,
            padding,
            cornerRadiusRatio: p.cornerRadiusRatio,
          });
          newPreviews[p.id] = preview;
        } catch {
          // ignore
        }
      }
      setPreviews(newPreviews);
    };
    generateAll();
  }, [svgContent, bgColor, padding]);

  const handleDownload = async () => {
    if (!svgContent || selectedPlatforms.length === 0) return;
    setIsGenerating(true);
    setProgress({ current: 0, total: 0 });

    try {
      await generateAllAndDownload(
        { svgContent, bgColor, padding },
        selectedPlatforms,
        (current, total) => setProgress({ current, total })
      );
    } catch (err) {
      console.error(err);
      alert("Generation failed. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const clearSvg = () => {
    setSvgContent(null);
    setSvgName("");
    setPreviews({});
  };

  return (
    <section id="workspace" className="w-full px-20 py-16">
      <div className="max-w-[1200px] mx-auto">
        {/* Upload Area */}
        {!svgContent ? (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className={`flex flex-col items-center justify-center gap-4 p-16 rounded-3xl border-2 border-dashed cursor-pointer transition-all ${
              isDragging
                ? "border-emerald-500 bg-emerald-500/5"
                : "border-zinc-300 bg-zinc-50 hover:border-emerald-500 hover:bg-emerald-500/5"
            }`}
          >
            <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center">
              <Upload className="w-8 h-8 text-emerald-500" />
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-zinc-900">
                Drop your SVG here or click to browse
              </p>
              <p className="text-sm text-zinc-500 mt-1">
                Supports any valid SVG file
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".svg"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
              }}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {/* Toolbar */}
            <div className="flex items-center justify-between bg-zinc-50 rounded-2xl border border-zinc-200 p-4">
              {/* File info */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-zinc-200">
                  <ImageIcon className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm font-medium text-zinc-900">
                    {svgName}
                  </span>
                  <button
                    onClick={clearSvg}
                    className="ml-1 text-zinc-400 hover:text-zinc-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Download button */}
              <button
                onClick={handleDownload}
                disabled={isGenerating || selectedPlatforms.length === 0}
                className="flex items-center gap-2 px-6 py-2.5 bg-emerald-500 text-white rounded-xl font-semibold text-sm hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>
                      {progress.total > 0
                        ? `${progress.current}/${progress.total}`
                        : "Generating..."}
                    </span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download ZIP</span>
                  </>
                )}
              </button>
            </div>

            {/* Settings + Preview */}
            <div className="grid grid-cols-[320px_1fr] gap-8">
              {/* Left: Settings */}
              <div className="flex flex-col gap-6">
                {/* Background Color */}
                <div className="flex flex-col gap-3">
                  <label className="text-sm font-semibold text-zinc-900">
                    Background Color
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {presetColors.map((c) => (
                      <button
                        key={c.color}
                        onClick={() => setBgColor(c.color)}
                        className={`w-9 h-9 rounded-full transition-all ${
                          c.border ? "border border-zinc-300" : ""
                        } ${
                          bgColor === c.color
                            ? "ring-2 ring-emerald-500 ring-offset-2"
                            : "hover:scale-110"
                        }`}
                        style={{
                          backgroundColor:
                            c.color === "transparent"
                              ? undefined
                              : c.color,
                          backgroundImage:
                            c.color === "transparent"
                              ? "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)"
                              : undefined,
                          backgroundSize:
                            c.color === "transparent"
                              ? "8px 8px"
                              : undefined,
                          backgroundPosition:
                            c.color === "transparent"
                              ? "0 0, 0 4px, 4px -4px, -4px 0px"
                              : undefined,
                        }}
                        title={c.label}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="color"
                      value={bgColor === "transparent" ? "#ffffff" : bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-8 h-8 rounded cursor-pointer border border-zinc-200"
                    />
                    <input
                      type="text"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="flex-1 px-3 py-1.5 text-sm border border-zinc-200 rounded-lg font-mono"
                    />
                  </div>
                </div>

                {/* Padding */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-zinc-900">
                      Padding
                    </label>
                    <span className="text-sm text-zinc-500 font-mono">
                      {padding}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="40"
                    value={padding}
                    onChange={(e) => setPadding(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>

                {/* Platform Selection */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-zinc-900">
                      Platforms
                    </label>
                    <button
                      onClick={() =>
                        setSelectedPlatforms(
                          selectedPlatforms.length === platforms.length
                            ? []
                            : platforms.map((p) => p.id)
                        )
                      }
                      className="text-xs text-emerald-500 font-medium hover:underline"
                    >
                      {selectedPlatforms.length === platforms.length
                        ? "Deselect All"
                        : "Select All"}
                    </button>
                  </div>
                  <div className="flex flex-col gap-2">
                    {platforms.map((p) => {
                      const Icon = platformIcons[p.icon];
                      const selected = selectedPlatforms.includes(p.id);
                      return (
                        <button
                          key={p.id}
                          onClick={() => togglePlatform(p.id)}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all text-left ${
                            selected
                              ? "border-emerald-500 bg-emerald-500/5"
                              : "border-zinc-200 hover:border-zinc-300"
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded flex items-center justify-center ${
                              selected
                                ? "bg-emerald-500"
                                : "border border-zinc-300"
                            }`}
                          >
                            {selected && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                          {Icon && (
                            <Icon className="w-4 h-4 text-zinc-500" />
                          )}
                          <span className="text-sm font-medium text-zinc-900">
                            {p.label}
                          </span>
                          <span className="text-xs text-zinc-400 ml-auto">
                            {p.specs.length} sizes
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right: Preview Grid */}
              <div className="grid grid-cols-3 gap-4">
                {platforms.map((p) => {
                  const Icon = platformIcons[p.icon];
                  const preview = previews[p.id];
                  return (
                    <div
                      key={p.id}
                      className={`flex flex-col items-center gap-3 p-5 rounded-2xl border transition-all ${
                        selectedPlatforms.includes(p.id)
                          ? "bg-white border-zinc-200"
                          : "bg-zinc-50 border-zinc-100 opacity-40"
                      }`}
                    >
                      {/* Checkerboard background to make white/transparent backgrounds visible */}
                      <div
                        className="relative w-[104px] h-[104px] rounded-xl overflow-hidden flex items-center justify-center"
                        style={{
                          backgroundImage:
                            "linear-gradient(45deg, #c4c4c8 25%, #dddde0 25%), linear-gradient(-45deg, #c4c4c8 25%, #dddde0 25%), linear-gradient(45deg, #dddde0 75%, #c4c4c8 75%), linear-gradient(-45deg, #dddde0 75%, #c4c4c8 75%)",
                          backgroundSize: "16px 16px",
                          backgroundPosition:
                            "0 0, 0 8px, 8px -8px, -8px 0px",
                        }}
                      >
                        {preview ? (
                          <img
                            src={preview}
                            alt={p.label}
                            className="w-24 h-24 object-contain relative z-10"
                          />
                        ) : (
                          <div
                            className="w-24 h-24 flex items-center justify-center relative z-10"
                            style={{
                              background: `linear-gradient(to bottom, ${p.gradient[0]}, ${p.gradient[1]})`,
                              borderRadius: p.borderRadius,
                            }}
                          >
                            {Icon && (
                              <Icon className="w-10 h-10 text-white" />
                            )}
                          </div>
                        )}
                      </div>
                      <span className="text-sm font-semibold text-zinc-900">
                        {p.label}
                      </span>
                      <span className="text-xs text-zinc-400">
                        {p.description}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
