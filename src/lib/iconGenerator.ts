import JSZip from "jszip";
import { saveAs } from "file-saver";
import { platforms } from "./platforms";

export interface GenerateOptions {
  svgContent: string;
  bgColor: string;
  padding: number; // 0-50 percentage
}

function loadSvgAsImage(svgContent: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const blob = new Blob([svgContent], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load SVG"));
    };
    img.src = url;
  });
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

export function renderIcon(
  svgImg: HTMLImageElement,
  size: number,
  options: GenerateOptions & { cornerRadiusRatio: number }
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  const radius = options.cornerRadiusRatio * size;

  // Apply rounded corner clipping first, then draw everything inside
  ctx.save();
  if (radius > 0) {
    roundRect(ctx, 0, 0, size, size, radius);
    ctx.clip();
  }

  // Draw background (only inside the clipped region)
  if (options.bgColor !== "transparent") {
    ctx.fillStyle = options.bgColor;
    ctx.fillRect(0, 0, size, size);
  }

  // Draw SVG with padding
  const pad = (options.padding / 100) * size;
  const drawSize = size - pad * 2;

  // Maintain aspect ratio
  const imgRatio = svgImg.naturalWidth / svgImg.naturalHeight;
  let drawW = drawSize;
  let drawH = drawSize;
  if (imgRatio > 1) {
    drawH = drawSize / imgRatio;
  } else {
    drawW = drawSize * imgRatio;
  }

  const offsetX = pad + (drawSize - drawW) / 2;
  const offsetY = pad + (drawSize - drawH) / 2;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(svgImg, offsetX, offsetY, drawW, drawH);

  ctx.restore();

  return canvas;
}

function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob!), "image/png");
  });
}

export async function generatePreview(
  svgContent: string,
  size: number,
  options: { bgColor: string; padding: number; cornerRadiusRatio: number }
): Promise<string> {
  const img = await loadSvgAsImage(svgContent);
  const canvas = renderIcon(img, size, { svgContent, ...options });
  return canvas.toDataURL("image/png");
}

export async function generateAllAndDownload(
  options: GenerateOptions,
  selectedPlatforms: string[],
  onProgress?: (current: number, total: number) => void
) {
  const img = await loadSvgAsImage(options.svgContent);
  const zip = new JSZip();

  const activePlatforms = platforms.filter((p) =>
    selectedPlatforms.includes(p.id)
  );

  let total = 0;
  activePlatforms.forEach((p) => (total += p.specs.length));
  let current = 0;

  for (const platform of activePlatforms) {
    const folder = zip.folder(platform.id)!;
    for (const spec of platform.specs) {
      const canvas = renderIcon(img, spec.size, {
        svgContent: options.svgContent,
        bgColor: options.bgColor,
        padding: options.padding,
        cornerRadiusRatio: platform.cornerRadiusRatio,
      });
      const blob = await canvasToBlob(canvas);
      const path = spec.name + ".png";

      // Handle nested paths like "mipmap-mdpi/ic_launcher"
      if (spec.name.includes("/")) {
        const parts = spec.name.split("/");
        let current_folder = folder;
        for (let i = 0; i < parts.length - 1; i++) {
          current_folder = current_folder.folder(parts[i])!;
        }
        current_folder.file(parts[parts.length - 1] + ".png", blob);
      } else {
        folder.file(path, blob);
      }

      current++;
      onProgress?.(current, total);
    }
  }

  const zipBlob = await zip.generateAsync({ type: "blob" });
  saveAs(zipBlob, "iconforge-icons.zip");
}
