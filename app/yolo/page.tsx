"use client";

import { useRef } from "react";
import { COCO_CLASSES } from "@/data/yolo";
import { useOnnxSession } from "@/hooks/useOnnxSession";
import { useYoloImage } from "@/hooks/useYoloImage";
import { useYoloDetect } from "@/hooks/useYoloDetect";
import { YoloHeader } from "@/components/organisms/yolo/yoloHeader";
import { YoloStatus } from "@/components/organisms/yolo/yoloStatus";
import { YoloUploadBox } from "@/components/organisms/yolo/yoloUploadBox";
import { YoloPreview } from "@/components/organisms/yolo/yoloPreview";

export default function HomeYolo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const { session, status, setStatus } = useOnnxSession("/models/yolov5n.onnx");
  const { imageUrl, loadExample, onUpload } = useYoloImage("/images/me.JPG");

  const { detectionCount, setDetectionCount } = useYoloDetect({
    imageUrl,
    session,
    canvasRef,
    imageRef,
    classes: COCO_CLASSES,
    setStatus,
  });

  const handleExample = () => {
    setDetectionCount(0);
    loadExample();
  };

  return (
    <section id="yolo" className="pad-x pt-28 pb-16 text-white">
      <div className="max-w-6xl mx-auto space-y-8">
        <YoloHeader />

        <YoloStatus status={status} detectionCount={detectionCount} />

        <YoloUploadBox
          onUpload={(file) => {
            setDetectionCount(0);
            onUpload(file);
            setStatus("Running inference...");
          }}
        />

        <div className="text-center">
          <button
            onClick={handleExample}
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
          <YoloPreview
            imageUrl={imageUrl}
            imageRef={imageRef}
            canvasRef={canvasRef}
          />
        )}
      </div>
    </section>
  );
}
