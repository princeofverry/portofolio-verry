import * as ort from "onnxruntime-web";
import { INPUT_SIZE } from "./constants";

export function prepareCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context not available");
  canvas.width = INPUT_SIZE;
  canvas.height = INPUT_SIZE;
  return ctx;
}

export function imageToTensor(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement
) {
  ctx.drawImage(img, 0, 0, INPUT_SIZE, INPUT_SIZE);
  const imgData = ctx.getImageData(0, 0, INPUT_SIZE, INPUT_SIZE);

  const input = new Float32Array(3 * INPUT_SIZE * INPUT_SIZE);
  const size = INPUT_SIZE * INPUT_SIZE;

  for (let i = 0; i < size; i++) {
    const base = i * 4;
    input[i] = imgData.data[base] / 255;
    input[i + size] = imgData.data[base + 1] / 255;
    input[i + 2 * size] = imgData.data[base + 2] / 255;
  }

  return new ort.Tensor("float32", input, [1, 3, INPUT_SIZE, INPUT_SIZE]);
}
