import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/format";

const LOGO_WIDTH = 1721;
const LOGO_HEIGHT = 875;

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Fine Bakery & Bistro & Apartments"
      className={cn("group inline-flex shrink-0", className)}
    >
      <Image
        src="/images/Logo.png"
        alt="Fine Bakery & Bistro & Apartments"
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        priority
        className="h-[52px] w-auto transition-opacity duration-200 group-hover:opacity-85 sm:h-[56px]"
      />
    </Link>
  );
}
