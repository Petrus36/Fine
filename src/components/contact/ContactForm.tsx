"use client";

import { useActionState } from "react";
import { submitContactForm } from "@/app/(site)/kontakt/actions";
import { contactFormIdleState } from "@/types/contact-form";

const fieldClass =
  "w-full rounded-[6px] border border-hairline bg-cream px-4 py-3 font-body text-[14px] font-normal text-ink outline-none placeholder:text-stone/70 focus:border-clay";

const buttonClass =
  "inline-flex items-center justify-center rounded-[3px] bg-clay px-7 py-3.5 text-[11px] font-semibold tracking-[0.14em] text-paper uppercase transition-colors hover:bg-rust disabled:opacity-60";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactForm, contactFormIdleState);

  if (state.status === "ok") {
    return (
      <div className="rounded-[10px] bg-paper px-6 py-10 text-center sm:px-10 sm:py-14">
        <h2 className="font-banner text-[28px] font-normal text-espresso sm:text-[34px]">
          Napíšte nám
        </h2>
        <p className="font-body mt-6 text-[14px] leading-relaxed font-normal text-stone">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[10px] bg-paper px-6 py-8 sm:px-10 sm:py-12">
      <h2 className="font-banner text-[28px] font-normal text-espresso sm:text-[34px]">
        Napíšte nám
      </h2>

      <form action={formAction} className="mt-8 space-y-4">
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <input
          type="text"
          name="name"
          placeholder="Meno"
          required
          autoComplete="name"
          className={fieldClass}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Telefón"
          autoComplete="tel"
          className={fieldClass}
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          required
          autoComplete="email"
          className={fieldClass}
        />
        <textarea
          name="message"
          placeholder="Správa"
          rows={7}
          required
          className={`${fieldClass} resize-none`}
        />

        <label className="flex items-start gap-3 text-left">
          <input
            type="checkbox"
            name="consent"
            value="on"
            required
            className="mt-1 size-4 shrink-0 accent-clay"
          />
          <span className="font-body text-[12px] leading-relaxed font-normal text-stone">
            Súhlasím so spracovaním osobných údajov.
          </span>
        </label>

        <button type="submit" className={buttonClass} disabled={pending}>
          {pending ? "Odosielam…" : "Odoslať správu"}
        </button>

        {state.status === "error" && state.message ? (
          <p className="font-body text-[12px] text-red-700">{state.message}</p>
        ) : null}
      </form>
    </div>
  );
}
