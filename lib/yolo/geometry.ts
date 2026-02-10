import type { Detection } from "@/types/yolo";
import { IOU_THRESHOLD } from "./constants";

export function iou(a: Detection, b: Detection) {
  const areaA = a.w * a.h;
  const areaB = b.w * b.h;

  const minX = Math.max(a.x, b.x);
  const minY = Math.max(a.y, b.y);
  const maxX = Math.min(a.x + a.w, b.x + b.w);
  const maxY = Math.min(a.y + a.h, b.y + b.h);

  const inter = Math.max(0, maxX - minX) * Math.max(0, maxY - minY);
  return inter / (areaA + areaB - inter);
}

export function nms(dets: Detection[]) {
  let arr = [...dets].sort((a, b) => b.score - a.score);
  const res: Detection[] = [];

  while (arr.length) {
    const best = arr.shift()!;
    res.push(best);
    arr = arr.filter((d) => iou(best, d) < IOU_THRESHOLD);
  }
  return res;
}
