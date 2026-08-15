import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { cn } from "@/lib/format";

/**
 * Renders a photo from /public when the file has been added, otherwise a warm
 * placeholder naming the missing file. Keeps the layout intact while the real
 * photography is still being collected.
 */
export function Photo({
  src,
  alt,
  className,
  sizes = "100vw",
  priority = false,
  overlayClassName,
  imageClassName,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  overlayClassName?: string;
  imageClassName?: string;
}) {
  const exists = fs.existsSync(path.join(process.cwd(), "public", src));

  return (
    <div className={cn("relative overflow-hidden bg-cream-dark", className)}>
      {exists ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", imageClassName)}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(135deg,#e8ddc7_0%,#d9c9ad_45%,#c9b493_100%)]">
          <span className="px-4 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-espresso/45">
            {src.replace(/^\/images\//, "")}
          </span>
        </div>
      )}
      {overlayClassName ? <div className={cn("absolute inset-0", overlayClassName)} /> : null}
    </div>
  );
}
