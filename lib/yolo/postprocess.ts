import type { Detection } from "@/types/yolo";
import {
  CONF_THRESHOLD,
  INPUT_SIZE,
  YOLO_ATTRS,
  YOLO_CLASSES,
  YOLO_ROWS,
} from "./constants";
import { nms } from "./geometry";

export function decodeYoloOutput(data: Float32Array) {
  const dets: Detection[] = [];

  for (let i = 0; i < YOLO_ROWS; i++) {
    const o = i * YOLO_ATTRS;
    const obj = data[o + 4];
    if (obj < CONF_THRESHOLD) continue;

    let cx = data[o];
    let cy = data[o + 1];
    let w = data[o + 2];
    let h = data[o + 3];

    // handle normalized outputs
    if (cx <= 1) {
      cx *= INPUT_SIZE;
      cy *= INPUT_SIZE;
      w *= INPUT_SIZE;
      h *= INPUT_SIZE;
    }

    let cls = 0;
    let best = 0;
    for (let c = 0; c < YOLO_CLASSES; c++) {
      const p = data[o + 5 + c];
      if (p > best) {
        best = p;
        cls = c;
      }
    }

    const score = obj * best;
    if (score > CONF_THRESHOLD) {
      dets.push({
        x: cx - w / 2,
        y: cy - h / 2,
        w,
        h,
        score,
        classId: cls,
      });
    }
  }

  return nms(dets);
}
