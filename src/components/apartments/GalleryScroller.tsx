"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

type GalleryPhoto = {
  src: string;
  alt: string;
};

const LOOP_COPIES = 3;
const photoClassName =
  "relative aspect-square w-[min(72vw,320px)] shrink-0 snap-start overflow-hidden rounded-[6px] bg-cream-dark";

export function GalleryScroller({ photos }: { photos: GalleryPhoto[] }) {
  const scroller = useRef<HTMLDivElement>(null);
  const setWidth = useRef(0);
  const jumping = useRef(false);
  const centered = useRef(false);
  const [ready, setReady] = useState(false);

  const loopedPhotos = Array.from({ length: LOOP_COPIES }, (_, copy) =>
    photos.map((photo) => ({ ...photo, copy })),
  ).flat();

  const measureSetWidth = useCallback(() => {
    const node = scroller.current;
    if (!node || photos.length === 0) return 0;
    const width = node.scrollWidth / LOOP_COPIES;
    setWidth.current = width;
    return width;
  }, [photos.length]);

  const jumpToMiddle = useCallback(
    (behavior: ScrollBehavior = "auto") => {
      const node = scroller.current;
      const width = measureSetWidth();
      if (!node || width === 0) return;

      jumping.current = true;
      node.scrollTo({ left: width, behavior });
      requestAnimationFrame(() => {
        jumping.current = false;
      });
    },
    [measureSetWidth],
  );

  useLayoutEffect(() => {
    centered.current = false;
    jumpToMiddle();
    setReady(true);
  }, [jumpToMiddle, photos]);

  function handleImageReady() {
    if (centered.current) return;
    const width = measureSetWidth();
    if (width === 0) return;
    jumpToMiddle();
    centered.current = true;
  }

  useEffect(() => {
    const node = scroller.current;
    if (!node) return;

    const onResize = () => jumpToMiddle();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [jumpToMiddle]);

  function handleScroll() {
    const node = scroller.current;
    const width = setWidth.current;
    if (!node || !ready || jumping.current || width === 0) return;

    const { scrollLeft } = node;

    if (scrollLeft <= width * 0.25) {
      jumping.current = true;
      node.scrollLeft = scrollLeft + width;
      jumping.current = false;
    } else if (scrollLeft >= width * 2.75) {
      jumping.current = true;
      node.scrollLeft = scrollLeft - width;
      jumping.current = false;
    }
  }

  function scroll(direction: -1 | 1) {
    const node = scroller.current;
    if (!node) return;

    const firstChild = node.querySelector<HTMLElement>("[data-gallery-item]");
    const gap = window.matchMedia("(min-width: 640px)").matches ? 16 : 12;
    const itemWidth = firstChild?.offsetWidth ?? 320;

    node.scrollBy({ left: direction * (itemWidth + gap), behavior: "smooth" });
  }

  if (photos.length === 0) return null;

  return (
    <div className="relative px-4 sm:px-6">
      <button
        type="button"
        onClick={() => scroll(-1)}
        aria-label="Predchádzajúca fotka"
        className="absolute top-1/2 left-2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-hairline bg-paper text-espresso shadow-sm sm:left-4"
      >
        ‹
      </button>

      <div
        ref={scroller}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-4 [&::-webkit-scrollbar]:hidden"
      >
        {loopedPhotos.map((photo, index) => (
          <div
            key={`${photo.src}-${photo.copy}-${index}`}
            data-gallery-item
            className={photoClassName}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="320px"
              className="object-cover"
              onLoad={handleImageReady}
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scroll(1)}
        aria-label="Ďalšia fotka"
        className="absolute top-1/2 right-2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-hairline bg-paper text-espresso shadow-sm sm:right-4"
      >
        ›
      </button>
    </div>
  );
}
