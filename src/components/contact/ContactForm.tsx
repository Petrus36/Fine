const fieldClass =
  "w-full rounded-[6px] border border-hairline bg-cream px-4 py-3 font-body text-[14px] font-normal text-ink outline-none placeholder:text-stone/70";

export function ContactForm() {
  return (
    <div className="relative overflow-hidden rounded-[10px] bg-paper px-6 py-8 sm:px-10 sm:py-12">
      <div className="pointer-events-none select-none blur-[6px]" aria-hidden="true">
        <h2 className="font-banner text-[28px] font-normal text-espresso sm:text-[34px]">
          Napíšte nám
        </h2>
        <form className="mt-8 space-y-4">
          <input type="text" placeholder="Meno" className={fieldClass} tabIndex={-1} />
          <input type="tel" placeholder="Telefón" className={fieldClass} tabIndex={-1} />
          <input type="email" placeholder="E-mail" className={fieldClass} tabIndex={-1} />
          <textarea
            placeholder="Správa"
            rows={7}
            className={`${fieldClass} resize-none`}
            tabIndex={-1}
          />
          <button
            type="button"
            tabIndex={-1}
            className="inline-flex items-center justify-center rounded-[3px] bg-clay px-7 py-3.5 text-[11px] font-semibold tracking-[0.14em] text-paper uppercase"
          >
            Odoslať správu
          </button>
        </form>
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-center bg-cream/35 px-6 backdrop-blur-[2px]">
        <p className="font-banner text-[32px] font-normal tracking-[0.02em] text-espresso sm:text-[40px]">
          Pripravujeme
        </p>
      </div>
    </div>
  );
}
