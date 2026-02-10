import type { Detection } from "@/types/yolo";
import { INPUT_SIZE } from "./constants";

export function drawDetections(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  dets: Detection[],
  classes: string[]
) {
  ctx.clearRect(0, 0, INPUT_SIZE, INPUT_SIZE);
  ctx.drawImage(img, 0, 0, INPUT_SIZE, INPUT_SIZE);

  dets.forEach((d) => {
    ctx.strokeStyle = "#10b981";
    ctx.lineWidth = 2;
    ctx.strokeRect(d.x, d.y, d.w, d.h);

    const label = `${classes[d.classId]} ${(d.score * 100).toFixed(1)}%`;
    ctx.font = "14px sans-serif";
    const w = ctx.measureText(label).width;

    ctx.fillStyle = "#10b981";
    ctx.fillRect(d.x, d.y - 18, w + 8, 18);
    ctx.fillStyle = "#fff";
    ctx.fillText(label, d.x + 4, d.y - 4);
  });
}
