"use client";

import { useCallback, useEffect, useState } from "react";

export function useYoloImage(examplePath: string) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const cleanup = useCallback(() => {
    setImageUrl((prev) => {
      if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
      return prev;
    });
  }, []);

  useEffect(() => cleanup, [cleanup]);

  const loadExample = useCallback(() => {
    cleanup();
    setImageUrl(examplePath);
  }, [cleanup, examplePath]);

  const onUpload = useCallback(
    (file?: File) => {
      if (!file) return;
      cleanup();
      setImageUrl(URL.createObjectURL(file));
    },
    [cleanup]
  );

  return { imageUrl, setImageUrl, loadExample, onUpload };
}
