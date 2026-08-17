import { Photo } from "@/components/ui/Photo";
import { cn } from "@/lib/format";

export function StoryRow({
  title,
  titleLines,
  body,
  image,
  imageAlt,
  imageSide,
  centered = false,
}: {
  title: string;
  titleLines?: Array<string | { text: string; accent?: boolean }>;
  body: string;
  image: string;
  imageAlt: string;
  imageSide: "left" | "right";
  centered?: boolean;
}) {
  const imageFirst = imageSide === "left";

  return (
    <article className="overflow-hidden rounded-[10px] bg-paper">
      <div className="grid items-center lg:grid-cols-2">
        <div
          className={cn(
            "p-8 sm:p-12",
            imageFirst ? "lg:order-2" : "lg:order-1",
            centered && "text-center",
          )}
        >
          <h3
            className={cn(
              "font-banner font-normal text-espresso",
              centered
                ? "text-[32px] leading-[1.15] sm:text-[38px]"
                : "text-[26px] leading-tight sm:text-[30px]",
            )}
          >
            {titleLines ? (
              titleLines.map((line, index) => {
                const text = typeof line === "string" ? line : line.text;
                const accent = typeof line === "object" && line.accent;

                return (
                  <span key={index} className={cn("block", accent && "text-rust")}>
                    {text}
                  </span>
                );
              })
            ) : (
              title
            )}
          </h3>
          <p
            className={cn(
              "font-body mt-4 font-normal text-stone",
              centered
                ? "mx-auto max-w-[52ch] text-[15px] leading-[1.85] sm:text-[16px]"
                : "max-w-[48ch] text-[13px] leading-[1.9]",
            )}
          >
            {body}
          </p>
        </div>
        <div className={cn(imageFirst ? "lg:order-1" : "lg:order-2")}>
          <Photo
            src={image}
            alt={imageAlt}
            className="h-[280px] w-full sm:h-[380px] lg:h-[440px]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </article>
  );
}
