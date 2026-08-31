"use client";

import { useCallback, useEffect, useState } from "react";
import { UploadedImage } from "@/components/ui/UploadedImage";
import Link from "next/link";

const STORAGE_KEY = "fine-alert-dismissed";

export function AlertModal({
  version,
  title,
  body,
  imageUrl,
  buttonLabel,
  buttonUrl,
}: {
  version: string;
  title: string;
  body: string;
  imageUrl: string | null;
  buttonLabel: string | null;
  buttonUrl: string | null;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem(STORAGE_KEY) === version) return;
    const timer = window.setTimeout(() => setOpen(true), 600);
    return () => window.clearTimeout(timer);
  }, [version]);

  const dismiss = useCallback(() => {
    window.localStorage.setItem(STORAGE_KEY, version);
    setOpen(false);
  }, [version]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") dismiss();
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, dismiss]);

  if (!open) return null;

  const hasButton = Boolean(buttonLabel && buttonUrl);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="fine-alert-title"
      className="fixed inset-0 z-[100] flex items-center justify-center px-5 py-8"
    >
      <button
        type="button"
        aria-label="Zavrieť upozornenie"
        onClick={dismiss}
        className="absolute inset-0 cursor-default bg-espresso/60 backdrop-blur-[2px]"
      />

      <div className="relative w-full max-w-[420px] overflow-hidden rounded-[6px] bg-paper shadow-[0_40px_80px_-30px_rgba(39,27,16,0.7)]">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Zavrieť"
          className="absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-full bg-paper/85 text-[16px] leading-none text-espresso transition-colors hover:bg-paper"
        >
          ×
        </button>

        {imageUrl ? (
          <div className="relative aspect-[4/3] w-full">
            <UploadedImage src={imageUrl} alt="" fill sizes="420px" className="object-cover" />
          </div>
        ) : null}

        <div className="px-7 py-7">
          <h2
            id="fine-alert-title"
            className="font-display text-[22px] leading-tight text-espresso"
          >
            {title}
          </h2>
          <p className="mt-3 whitespace-pre-line text-[13px] leading-relaxed text-stone">
            {body}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {hasButton ? (
              <Link
                href={buttonUrl as string}
                onClick={dismiss}
                className="inline-flex items-center justify-center rounded-[3px] bg-clay px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-paper transition-colors hover:bg-rust"
              >
                {buttonLabel}
              </Link>
            ) : null}
            <button
              type="button"
              onClick={dismiss}
              className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone transition-colors hover:text-clay"
            >
              Zavrieť
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
