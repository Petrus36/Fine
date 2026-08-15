"use client";

import { useState } from "react";
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_BYTES } from "@/lib/upload-limits";

/**
 * Rejects oversized files in the browser — a request larger than the Server
 * Action body limit would otherwise fail before the action can explain why.
 */
export function ImageInput({ id, name }: { id: string; name: string }) {
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      <input
        id={id}
        name={name}
        type="file"
        accept="image/*"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (!file) return setError(null);

          if (!ACCEPTED_IMAGE_TYPES[file.type]) {
            event.target.value = "";
            return setError("Nepodporovaný formát. Použite JPG, PNG, WEBP, AVIF alebo GIF.");
          }
          if (file.size > MAX_IMAGE_BYTES) {
            event.target.value = "";
            return setError(
              `Obrázok má ${(file.size / 1024 / 1024).toFixed(1)} MB — maximum je 3 MB.`,
            );
          }
          setError(null);
        }}
        className="block w-full text-[12px] text-stone file:mr-4 file:rounded-[3px] file:border-0 file:bg-clay file:px-4 file:py-2 file:text-[11px] file:font-semibold file:uppercase file:tracking-[0.14em] file:text-paper hover:file:bg-rust"
      />
      {error ? <p className="text-[12px] text-red-700">{error}</p> : null}
    </div>
  );
}
