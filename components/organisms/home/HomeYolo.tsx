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

export default function HomeYolo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number>(0);

  const [mode, setMode] = useState<"upload" | "camera">("upload");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [session, setSession] = useState<ort.InferenceSession | null>(null);
  const [status, setStatus] = useState("Ready to detect objects");
  const [detectionCount, setDetectionCount] = useState(0);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [fps, setFps] = useState(0);

  useEffect(() => {
    const loadModel = async () => {
      try {
        setStatus("Loading AI model...");
        const sess = await ort.InferenceSession.create("/models/yolov5n.onnx", {
          executionProviders: ["wasm"],
        });
        setSession(sess);
        setStatus("✓ Model loaded! Ready to detect");
      } catch (err) {
        console.error(err);
        setStatus("❌ Failed to load model");
      }
    };
    loadModel();
  }, []);

  const loadExampleImage = () => {
    if (imageUrl && imageUrl.startsWith("blob:")) {
      URL.revokeObjectURL(imageUrl);
    }
    setImageUrl("/images/me.JPG");
    setStatus("Loading example image...");
  };

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

  const detectOnImage = async (img: HTMLImageElement) => {
    if (!session) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    canvas.width = INPUT_SIZE;
    canvas.height = INPUT_SIZE;
    ctx.drawImage(img, 0, 0, INPUT_SIZE, INPUT_SIZE);

    const imageData = ctx.getImageData(0, 0, INPUT_SIZE, INPUT_SIZE);
    const input = new Float32Array(1 * 3 * INPUT_SIZE * INPUT_SIZE);

    for (let i = 0; i < INPUT_SIZE * INPUT_SIZE; i++) {
      input[i] = imageData.data[i * 4] / 255;
      input[i + INPUT_SIZE * INPUT_SIZE] = imageData.data[i * 4 + 1] / 255;
      input[i + 2 * INPUT_SIZE * INPUT_SIZE] = imageData.data[i * 4 + 2] / 255;
    }

    const tensor = new ort.Tensor("float32", input, [
      1,
      3,
      INPUT_SIZE,
      INPUT_SIZE,
    ]);

    const outputs = await session.run({ images: tensor });
    const output = outputs[Object.keys(outputs)[0]] as ort.Tensor;

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

    ctx.clearRect(0, 0, INPUT_SIZE, INPUT_SIZE);
    ctx.drawImage(img, 0, 0, INPUT_SIZE, INPUT_SIZE);

    finalDetections.forEach((d) => {
      ctx.strokeStyle = "#10b981";
      ctx.lineWidth = 2;
      ctx.strokeRect(d.x, d.y, d.w, d.h);

      const label = `${COCO_CLASSES[d.classId]} ${(d.score * 100).toFixed(1)}%`;
      ctx.font = "14px sans-serif";
      const w = ctx.measureText(label).width;

      ctx.fillStyle = "#10b981";
      ctx.fillRect(d.x, d.y - 20, w + 8, 20);
      ctx.fillStyle = "#fff";
      ctx.fillText(label, d.x + 4, d.y - 5);
    });

    return finalDetections.length;
  };

  useEffect(() => {
    if (!imageUrl || !session || mode !== "upload") return;

    const runYolo = async () => {
      try {
        const img = imageRef.current!;
        await new Promise((resolve) => {
          if (img.complete) resolve(null);
          else img.onload = () => resolve(null);
        });

        setStatus("Running inference...");
        const count = await detectOnImage(img);
        setStatus(`✓ Complete! Found ${count} object(s)`);
      } catch (err) {
        console.error(err);
        setStatus("❌ Error during detection");
      }
    };

    runYolo();
  }, [imageUrl, session, mode]);

  const startCamera = async () => {
    try {
      setStatus("Starting camera...");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 640, height: 480 },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraActive(true);
        setStatus("✓ Camera active");
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to access camera");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    setIsCameraActive(false);
    setStatus("Camera stopped");
  };

  useEffect(() => {
    if (!isCameraActive || !session || !videoRef.current) return;

    let lastTime = performance.now();
    let frameCount = 0;

    const detectLoop = async () => {
      try {
        const video = videoRef.current!;
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;

        if (video.readyState === video.HAVE_ENOUGH_DATA) {
          canvas.width = INPUT_SIZE;
          canvas.height = INPUT_SIZE;
          ctx.drawImage(video, 0, 0, INPUT_SIZE, INPUT_SIZE);

          const imageData = ctx.getImageData(0, 0, INPUT_SIZE, INPUT_SIZE);
          const input = new Float32Array(1 * 3 * INPUT_SIZE * INPUT_SIZE);

          for (let i = 0; i < INPUT_SIZE * INPUT_SIZE; i++) {
            input[i] = imageData.data[i * 4] / 255;
            input[i + INPUT_SIZE * INPUT_SIZE] =
              imageData.data[i * 4 + 1] / 255;
            input[i + 2 * INPUT_SIZE * INPUT_SIZE] =
              imageData.data[i * 4 + 2] / 255;
          }

          const tensor = new ort.Tensor("float32", input, [
            1,
            3,
            INPUT_SIZE,
            INPUT_SIZE,
          ]);
          const outputs = await session.run({ images: tensor });
          const output = outputs[Object.keys(outputs)[0]] as ort.Tensor;

          const detections: Detection[] = [];
          const data = output.data as Float32Array;

          for (let i = 0; i < 25200; i++) {
            const offset = i * 85;
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

          ctx.clearRect(0, 0, INPUT_SIZE, INPUT_SIZE);
          ctx.drawImage(video, 0, 0, INPUT_SIZE, INPUT_SIZE);

          finalDetections.forEach((d) => {
            ctx.strokeStyle = "#10b981";
            ctx.lineWidth = 2;
            ctx.strokeRect(d.x, d.y, d.w, d.h);

            const label = `${COCO_CLASSES[d.classId]} ${(d.score * 100).toFixed(
              1
            )}%`;
            ctx.font = "14px sans-serif";
            const w = ctx.measureText(label).width;

            ctx.fillStyle = "#10b981";
            ctx.fillRect(d.x, d.y - 20, w + 8, 20);
            ctx.fillStyle = "#fff";
            ctx.fillText(label, d.x + 4, d.y - 5);
          });

          frameCount++;
          const now = performance.now();
          if (now - lastTime >= 1000) {
            setFps(frameCount);
            frameCount = 0;
            lastTime = now;
          }
        }
      } catch (err) {
        console.error(err);
      }

      animFrameRef.current = requestAnimationFrame(detectLoop);
    };

    detectLoop();

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isCameraActive, session]);

  useEffect(() => {
    return () => {
      stopCamera();
      if (imageUrl && imageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, []);

  const switchMode = (newMode: "upload" | "camera") => {
    if (newMode === "camera") {
      stopCamera();
    }
    setMode(newMode);
    setDetectionCount(0);
  };

  return (
    <div className="min-h-screen pad-x text-white py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-5xl font-bold text-white">YOLOv5 Detection</h1>
          <p className="text-white/80">
            100% Client-side - Your privacy is protected
          </p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">{status}</span>
            {detectionCount > 0 && (
              <span className="text-sm font-mono bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded">
                {detectionCount} objects
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => switchMode("upload")}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              mode === "upload"
                ? "bg-emerald-600 text-white"
                : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
            }`}
          >
            Upload Image
          </button>
          <button
            onClick={() => switchMode("camera")}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              mode === "camera"
                ? "bg-emerald-600 text-white"
                : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
            }`}
          >
            Live Camera
          </button>
        </div>

        {/* Upload Mode */}
        {mode === "upload" && (
          <div className="space-y-6">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-emerald-500 hover:bg-gray-800/50 transition-colors">
                <div className="flex flex-col items-center justify-center">
                  <svg
                    className="w-12 h-12 mb-3 text-gray-500"
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
                  <p className="text-sm text-gray-300">Click to upload image</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG, JPEG</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>

              <div className="mt-4 text-center">
                <button
                  onClick={loadExampleImage}
                  disabled={!session}
                  className="text-sm text-emerald-400 hover:text-emerald-300 underline disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Or try example image
                </button>
              </div>
            </div>

            {imageUrl && (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h2 className="text-lg font-medium text-gray-200">
                    Original Image
                  </h2>
                  <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                    <img
                      ref={imageRef}
                      src={imageUrl || "/placeholder.svg"}
                      alt="input"
                      className="w-full rounded"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <h2 className="text-lg font-medium text-gray-200">
                    Detection Result
                  </h2>
                  <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                    <canvas ref={canvasRef} className="w-full rounded" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Camera Mode */}
        {mode === "camera" && (
          <div className="space-y-6">
            <div className="flex justify-center gap-4">
              {!isCameraActive ? (
                <button
                  onClick={startCamera}
                  disabled={!session}
                  className="px-6 py-3 bg-emerald-600 rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Start Camera
                </button>
              ) : (
                <button
                  onClick={stopCamera}
                  className="px-6 py-3 bg-red-600 rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Stop Camera
                </button>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h2 className="text-lg font-medium text-gray-200">Live Feed</h2>
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full rounded bg-black"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-200">
                    Detection Result
                  </h2>
                  {isCameraActive && fps > 0 && (
                    <span className="text-sm font-mono bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded">
                      {fps} FPS
                    </span>
                  )}
                </div>
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                  <canvas ref={canvasRef} className="w-full rounded bg-black" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
