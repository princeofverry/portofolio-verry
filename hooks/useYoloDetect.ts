"use client";

import { useEffect, useState } from "react";
import * as ort from "onnxruntime-web";
import type { Detection } from "@/types/yolo";
import { prepareCanvas, imageToTensor } from "@/lib/yolo/preprocess";
import { decodeYoloOutput } from "@/lib/yolo/postprocess";
import { drawDetections } from "@/lib/yolo/draw";

type Params = {
  imageUrl: string | null;
  session: ort.InferenceSession | null;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  imageRef: React.RefObject<HTMLImageElement | null>;
  classes: string[];
  setStatus: (s: string) => void;
};

export function useYoloDetect({
  imageUrl,
  session,
  canvasRef,
  imageRef,
  classes,
  setStatus,
}: Params) {
  const [detectionCount, setDetectionCount] = useState(0);

  useEffect(() => {
    if (!imageUrl || !session) return;

    const canvas = canvasRef.current;
    const imgEl = imageRef.current;
    if (!canvas || !imgEl) return;

    let cancelled = false;

    (async () => {
      try {
        setStatus("Running inference...");

        if (!imgEl.complete) {
          await new Promise((r) => (imgEl.onload = () => r(null)));
        }
        if (cancelled) return;

        const ctx = prepareCanvas(canvas);
        const tensor = imageToTensor(ctx, imgEl);

        const outputs = await session.run({ images: tensor });
        const output = outputs[Object.keys(outputs)[0]] as ort.Tensor;
        const data = output.data as Float32Array;

        const dets: Detection[] = decodeYoloOutput(data);
        setDetectionCount(dets.length);

        drawDetections(ctx, imgEl, dets, classes);

        setStatus(`✓ Done — ${dets.length} object(s)`);
      } catch {
        if (cancelled) return;
        setStatus("Inference failed");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [imageUrl, session, canvasRef, imageRef, classes, setStatus]);

  return { detectionCount, setDetectionCount };
}
