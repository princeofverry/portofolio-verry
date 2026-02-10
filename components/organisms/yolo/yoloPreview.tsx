import type React from "react";

export function YoloPreview({
  imageUrl,
  imageRef,
  canvasRef,
}: {
  imageUrl: string;
  imageRef: React.RefObject<HTMLImageElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}) {
  return (
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
        <canvas ref={canvasRef} className="rounded bg-black w-full" />
      </div>
    </div>
  );
}
