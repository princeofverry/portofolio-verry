"use client";

import { useEffect, useState } from "react";
import * as ort from "onnxruntime-web";

export function useOnnxSession(modelPath: string) {
  const [session, setSession] = useState<ort.InferenceSession | null>(null);
  const [status, setStatus] = useState("Ready");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setStatus("Loading AI model...");
        const sess = await ort.InferenceSession.create(modelPath, {
          executionProviders: ["wasm"],
        });
        if (cancelled) return;
        setSession(sess);
        setStatus("Model loaded");
      } catch {
        if (cancelled) return;
        setStatus("Failed to load model");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [modelPath]);

  return { session, status, setStatus };
}
