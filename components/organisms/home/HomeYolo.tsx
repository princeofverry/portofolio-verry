"use client";

import { useEffect, useRef, useState } from "react";
import * as ort from "onnxruntime-web";
import { COCO_CLASSES } from "@/data/yolo";

/* ================= TYPES ================= */
type Detection = {
  x: number;
  y: number;
  w: number;
  h: number;
  score: number;
  classId: number;
};

/* ================= CONSTANTS ================= */
const INPUT_SIZE = 640;
const CONF_THRESHOLD = 0.25;
const IOU_THRESHOLD = 0.45;

/* ================= NMS ================= */
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
  const result: Detection[] = [];
  dets.sort((a, b) => b.score - a.score);

  while (dets.length) {
    const best = dets.shift()!;
    result.push(best);
    dets = dets.filter((d) => iou(best, d) < IOU_THRESHOLD);
  }
  return result;
}

/* ================= COMPONENT ================= */
export default function HomeYolo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const [imageUrl, setImageUrl] = useState<string | null>("images/me.JPG");
  const [session, setSession] = useState<ort.InferenceSession | null>(null);
  const [status, setStatus] = useState("Loading default image...");
  const [detectionCount, setDetectionCount] = useState(0);

  /* ========== HANDLE IMAGE UPLOAD (NO SAVE) ========== */
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (imageUrl && imageUrl.startsWith("blob:")) {
      URL.revokeObjectURL(imageUrl);
    }

    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setStatus("Image loaded. Running detection...");
  };

  /* ========== RUN YOLO WHEN IMAGE CHANGES ========== */
  useEffect(() => {
    if (!imageUrl) return;

    const runYolo = async () => {
      try {
        let activeSession = session;

        if (!activeSession) {
          setStatus("Loading model...");
          activeSession = await ort.InferenceSession.create(
            "/models/yolov5n.onnx",
            { executionProviders: ["wasm"] }
          );
          setSession(activeSession);
        }

        const img = imageRef.current!;
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;

        await new Promise((resolve) => {
          if (img.complete) resolve(null);
          else img.onload = () => resolve(null);
        });

        canvas.width = INPUT_SIZE;
        canvas.height = INPUT_SIZE;
        ctx.drawImage(img, 0, 0, INPUT_SIZE, INPUT_SIZE);

        /* -------- Preprocess -------- */
        const imageData = ctx.getImageData(0, 0, INPUT_SIZE, INPUT_SIZE);
        const input = new Float32Array(1 * 3 * INPUT_SIZE * INPUT_SIZE);

        for (let i = 0; i < INPUT_SIZE * INPUT_SIZE; i++) {
          input[i] = imageData.data[i * 4] / 255;
          input[i + INPUT_SIZE * INPUT_SIZE] = imageData.data[i * 4 + 1] / 255;
          input[i + 2 * INPUT_SIZE * INPUT_SIZE] =
            imageData.data[i * 4 + 2] / 255;
        }

        const tensor = new ort.Tensor("float32", input, [
          1,
          3,
          INPUT_SIZE,
          INPUT_SIZE,
        ]);

        setStatus("Running inference...");
        const outputs = await activeSession.run({ images: tensor });
        const output = outputs[Object.keys(outputs)[0]] as ort.Tensor;

        /* -------- Postprocess -------- */
        const detections: Detection[] = [];
        const data = output.data as Float32Array;

        const numBoxes = 25200;
        const numAttrs = 85;

        for (let i = 0; i < numBoxes; i++) {
          const offset = i * numAttrs;

          let cx = data[offset];
          let cy = data[offset + 1];
          let w = data[offset + 2];
          let h = data[offset + 3];

          if (cx <= 1 && cy <= 1 && w <= 1 && h <= 1) {
            cx *= INPUT_SIZE;
            cy *= INPUT_SIZE;
            w *= INPUT_SIZE;
            h *= INPUT_SIZE;
          }

          const obj = data[offset + 4];
          if (obj < CONF_THRESHOLD) continue;

          let bestClass = 0;
          let bestScore = 0;

          for (let c = 0; c < 80; c++) {
            const score = data[offset + 5 + c];
            if (score > bestScore) {
              bestScore = score;
              bestClass = c;
            }
          }

          const finalScore = obj * bestScore;
          if (finalScore > CONF_THRESHOLD) {
            detections.push({
              x: cx - w / 2,
              y: cy - h / 2,
              w,
              h,
              score: finalScore,
              classId: bestClass,
            });
          }
        }

        const finalDetections = nms(detections);
        setDetectionCount(finalDetections.length);

        /* -------- Draw -------- */
        ctx.clearRect(0, 0, INPUT_SIZE, INPUT_SIZE);
        ctx.drawImage(img, 0, 0, INPUT_SIZE, INPUT_SIZE);

        finalDetections.forEach((d) => {
          ctx.strokeStyle = "#00ff00";
          ctx.lineWidth = 3;
          ctx.strokeRect(d.x, d.y, d.w, d.h);

          const label = `${COCO_CLASSES[d.classId]} ${(d.score * 100).toFixed(
            1
          )}%`;
          ctx.font = "16px Arial";
          const w = ctx.measureText(label).width;

          ctx.fillStyle = "#00ff00";
          ctx.fillRect(d.x, d.y - 24, w + 8, 24);
          ctx.fillStyle = "#000";
          ctx.fillText(label, d.x + 4, d.y - 6);
        });

        setStatus(`✓ Complete! Found ${finalDetections.length} object(s)`);
      } catch (err) {
        console.error(err);
        setStatus("Error during detection");
      }
    };

    runYolo();

    return () => {
      if (imageUrl && imageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl, session]);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-white">
            YOLOv5 Object Detection
          </h1>
          <p className="text-gray-400">
            🔒 Client-side only your images never leave your browser
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-green-500 hover:bg-gray-800/50 transition-all">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-10 h-10 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, JPEG</p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>

          {/* Status */}
          <div className="bg-gray-800 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  status.includes("✓")
                    ? "bg-green-500"
                    : status.includes("Error")
                    ? "bg-red-500"
                    : "bg-yellow-500 animate-pulse"
                }`}
              />
              <span className="text-sm text-gray-300">{status}</span>
            </div>
            {detectionCount > 0 && (
              <div className="flex items-center gap-2 pt-2 border-t border-gray-700">
                <span className="text-2xl font-bold text-blue-400">
                  {detectionCount}
                </span>
                <span className="text-sm text-gray-400">
                  object{detectionCount !== 1 ? "s" : ""} detected
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Images */}
        {imageUrl && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-300">
                Original Image
              </h2>
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                <img
                  ref={imageRef}
                  src={imageUrl}
                  alt="input"
                  className="w-full rounded-lg"
                />
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-300">
                Detection Result
              </h2>
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                <canvas ref={canvasRef} className="w-full rounded-lg" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
