"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import * as ort from "onnxruntime-web";
import { COCO_CLASSES } from "@/data/yolo";

type Detection = {
  x: number;
  y: number;
  w: number;
  h: number;
  score: number;
  classId: number;
};

const INPUT_SIZE = 640;
const CONF_THRESHOLD = 0.25;
const IOU_THRESHOLD = 0.45;

/* ================= utils ================= */

function iou(a: Detection, b: Detection) {
  const areaA = a.w * a.h;
  const areaB = b.w * b.h;

  const minX = Math.max(a.x, b.x);
  const minY = Math.max(a.y, b.y);
  const maxX = Math.min(a.x + a.w, b.x + b.w);
  const maxY = Math.min(a.y + a.h, b.y + b.h);

  const inter = Math.max(0, maxX - minX) * Math.max(0, maxY - minY);
  return inter / (areaA + areaB - inter);
}

function nms(dets: Detection[]) {
  const res: Detection[] = [];
  dets.sort((a, b) => b.score - a.score);

  while (dets.length) {
    const best = dets.shift()!;
    res.push(best);
    dets = dets.filter((d) => iou(best, d) < IOU_THRESHOLD);
  }
  return res;
}

/* ================= component ================= */

export default function HomeYolo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [session, setSession] = useState<ort.InferenceSession | null>(null);
  const [status, setStatus] = useState("Ready");
  const [detectionCount, setDetectionCount] = useState(0);

  /* ================= load model ================= */

  useEffect(() => {
    (async () => {
      try {
        setStatus("Loading AI model...");
        const sess = await ort.InferenceSession.create("/models/yolov5n.onnx", {
          executionProviders: ["wasm"],
        });
        setSession(sess);
        setStatus("Model loaded");
      } catch {
        setStatus("Failed to load model");
      }
    })();
  }, []);

  /* ================= image upload ================= */

  const cleanupImage = () => {
    if (imageUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(imageUrl);
    }
  };

  const loadExampleImage = () => {
    cleanupImage();
    setImageUrl("/images/me.JPG");
    setDetectionCount(0);
    setStatus("Running inference...");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    cleanupImage();
    setImageUrl(URL.createObjectURL(file));
    setDetectionCount(0);
    setStatus("Running inference...");
  };

  /* ================= detect on image ================= */

  const detectOnImage = async (img: HTMLImageElement) => {
    if (!session || !canvasRef.current) return 0;

    const ctx = canvasRef.current.getContext("2d")!;
    canvasRef.current.width = INPUT_SIZE;
    canvasRef.current.height = INPUT_SIZE;

    ctx.drawImage(img, 0, 0, INPUT_SIZE, INPUT_SIZE);
    const imgData = ctx.getImageData(0, 0, INPUT_SIZE, INPUT_SIZE);

    const input = new Float32Array(3 * INPUT_SIZE * INPUT_SIZE);
    for (let i = 0; i < INPUT_SIZE * INPUT_SIZE; i++) {
      input[i] = imgData.data[i * 4] / 255;
      input[i + INPUT_SIZE * INPUT_SIZE] = imgData.data[i * 4 + 1] / 255;
      input[i + 2 * INPUT_SIZE * INPUT_SIZE] = imgData.data[i * 4 + 2] / 255;
    }

    const tensor = new ort.Tensor("float32", input, [
      1,
      3,
      INPUT_SIZE,
      INPUT_SIZE,
    ]);

    const outputs = await session.run({ images: tensor });
    const output = outputs[Object.keys(outputs)[0]] as ort.Tensor;
    const data = output.data as Float32Array;

    const dets: Detection[] = [];

    for (let i = 0; i < 25200; i++) {
      const o = i * 85;
      const obj = data[o + 4];
      if (obj < CONF_THRESHOLD) continue;

      let cx = data[o];
      let cy = data[o + 1];
      let w = data[o + 2];
      let h = data[o + 3];

      if (cx <= 1) {
        cx *= INPUT_SIZE;
        cy *= INPUT_SIZE;
        w *= INPUT_SIZE;
        h *= INPUT_SIZE;
      }

      let cls = 0;
      let best = 0;
      for (let c = 0; c < 80; c++) {
        if (data[o + 5 + c] > best) {
          best = data[o + 5 + c];
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

    const final = nms(dets);
    setDetectionCount(final.length);

    ctx.drawImage(img, 0, 0, INPUT_SIZE, INPUT_SIZE);
    final.forEach((d) => {
      ctx.strokeStyle = "#10b981";
      ctx.lineWidth = 2;
      ctx.strokeRect(d.x, d.y, d.w, d.h);

      const label = `${COCO_CLASSES[d.classId]} ${(d.score * 100).toFixed(1)}%`;
      ctx.font = "14px sans-serif";
      const w = ctx.measureText(label).width;
      ctx.fillStyle = "#10b981";
      ctx.fillRect(d.x, d.y - 18, w + 8, 18);
      ctx.fillStyle = "#fff";
      ctx.fillText(label, d.x + 4, d.y - 4);
    });

    return final.length;
  };

  useEffect(() => {
    if (!imageUrl || !session) return;

    (async () => {
      const img = imageRef.current!;
      if (!img.complete) {
        await new Promise((r) => (img.onload = () => r(null)));
      }
      const count = await detectOnImage(img);
      setStatus(`✓ Done — ${count} object(s)`);
    })();
  }, [imageUrl, session]);

  /* ================= UI ================= */

  return (
    <section id="yolo" className="pad-x py-16 text-white">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">
            Object Detection (Client-side)
          </h1>
          <p className="text-sm text-gray-400">
            YOLOv8 ONNX • 100% runs in your browser
          </p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded p-4 text-sm">
          {status}
          {detectionCount > 0 && (
            <span className="ml-3 text-emerald-400 font-mono">
              {detectionCount} objects
            </span>
          )}
        </div>

        {/* Upload box */}
        <label className="block border-2 border-dashed border-gray-700 rounded p-10 text-center cursor-pointer hover:border-emerald-500 transition">
          Click to upload image
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>

        <div className="text-center">
          <button
            onClick={loadExampleImage}
            className="text-emerald-400 underline"
          >
            Try example image
          </button>
        </div>

        {!imageUrl && (
          <div className="text-center text-gray-500 py-12">
            Upload an image or use the example to see detection results
          </div>
        )}

        {imageUrl && (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-400 mb-2">Original Image</p>
              <img
                ref={imageRef}
                src={imageUrl}
                alt="input"
                className="rounded bg-black w-full"
              />
            </div>

            <div>
              <p className="text-sm text-gray-400 mb-2">Detection Result</p>
              <canvas
                ref={canvasRef}
                className="rounded bg-black w-full"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
