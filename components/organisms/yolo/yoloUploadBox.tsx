import type React from "react";

export function YoloUploadBox({
  onUpload,
}: {
  onUpload: (file?: File) => void;
}) {
  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpload(e.target.files?.[0]);
  };

  return (
    <label className="block border-2 border-dashed border-gray-700 rounded p-10 text-center cursor-pointer hover:border-emerald-500 transition">
      Click to upload image
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handle}
      />
    </label>
  );
}
