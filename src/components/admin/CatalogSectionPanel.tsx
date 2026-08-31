import { cardClass } from "@/components/admin/styles";

export function CatalogSectionPanel({
  title,
  itemCount,
  defaultOpen = false,
  children,
}: {
  title: string;
  itemCount: number;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const countLabel =
    itemCount === 1 ? "1 položka" : itemCount < 5 ? `${itemCount} položky` : `${itemCount} položiek`;

  return (
    <details
      className={`${cardClass} group p-0 [&_summary::-webkit-details-marker]:hidden`}
      open={defaultOpen || undefined}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-cream/40">
        <div className="min-w-0">
          <h2 className="font-display text-[18px] text-espresso">{title}</h2>
          <p className="mt-0.5 text-[12px] text-stone">
            {countLabel} · kliknite pre úpravu alebo pridanie
          </p>
        </div>
        <svg
          aria-hidden
          viewBox="0 0 20 20"
          className="size-5 shrink-0 text-stone transition-transform duration-200 group-open:rotate-180"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
        >
          <path d="M5 7.5 10 12.5 15 7.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>

      <div className="space-y-4 border-t border-hairline px-6 pb-6 pt-4">{children}</div>
    </details>
  );
}
