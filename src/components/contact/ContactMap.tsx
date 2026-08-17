"use client";

import { useEffect, useState } from "react";
import { contactMap } from "@/data/contact";

export function ContactMap() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <section className="bg-cream pb-16">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="relative block w-full cursor-pointer overflow-hidden"
          aria-label="Otvoriť mapu Fine restaurant & apartmens"
        >
          <iframe
            title={contactMap.title}
            src={contactMap.embedSrc}
            className="pointer-events-none h-[320px] w-full border-0 sm:h-[420px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            tabIndex={-1}
          />
          <span className="absolute inset-0 bg-transparent" />
        </button>
      </section>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-espresso/55 p-4 backdrop-blur-[3px] sm:p-8"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-map-title"
            className="relative flex h-[min(86vh,720px)] w-full max-w-[1100px] flex-col overflow-hidden rounded-[10px] bg-paper shadow-[0_28px_80px_-28px_rgba(39,27,16,0.55)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-hairline px-5 py-3">
              <p
                id="contact-map-title"
                className="font-banner text-[16px] font-normal text-espresso sm:text-[18px]"
              >
                {contactMap.title}
              </p>
              <div className="flex items-center gap-3">
                <a
                  href={contactMap.placeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-body text-[11px] font-semibold tracking-[0.12em] text-clay uppercase hover:text-rust"
                >
                  Otvoriť v Google Maps
                </a>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex size-8 items-center justify-center rounded-full border border-hairline text-espresso hover:bg-cream"
                  aria-label="Zavrieť mapu"
                >
                  ×
                </button>
              </div>
            </div>
            <iframe
              title={`${contactMap.title} — veľká mapa`}
              src={contactMap.embedSrc}
              className="h-full w-full flex-1 border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
