export function PreparingOverlay({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="pointer-events-none select-none blur-[6px]" aria-hidden="true">
        {children}
      </div>

      <div className="fixed inset-0 z-40 flex items-center justify-center bg-cream/50 px-6 backdrop-blur-[2px]">
        <div className="max-w-[360px] rounded-[6px] border border-hairline bg-paper px-10 py-12 text-center shadow-[0_24px_60px_-24px_rgba(39,27,16,0.35)]">
          <p className="font-display text-[28px] leading-none text-espresso">Pripravujeme</p>
          <p className="mt-4 text-[13px] leading-relaxed text-stone">
            Túto ponuku doladíme čoskoro. Ďakujeme za trpezlivosť.
          </p>
        </div>
      </div>
    </>
  );
}
