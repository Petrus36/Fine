"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  CONSENT_CHANGED_EVENT,
  OPEN_COOKIE_SETTINGS_EVENT,
  defaultConsent,
  readConsent,
  writeConsent,
  type CookieConsent,
} from "@/lib/cookie-consent";
import { cookieCategories } from "@/data/cookies";
import { cn } from "@/lib/format";

const primaryButton =
  "inline-flex items-center justify-center rounded-[3px] bg-clay px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-paper transition-colors hover:bg-rust";
const outlineButton =
  "inline-flex items-center justify-center rounded-[3px] border border-hairline bg-paper/90 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:border-clay hover:text-clay";
const ghostButton =
  "inline-flex items-center justify-center text-[11px] font-semibold uppercase tracking-[0.14em] text-stone transition-colors hover:text-clay";

export function CookieBanner() {
  const [ready, setReady] = useState(false);
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [functional, setFunctional] = useState(false);

  const refresh = useCallback(() => {
    const stored = readConsent();
    setConsent(stored);
    setFunctional(stored?.functional ?? false);
  }, []);

  useEffect(() => {
    refresh();
    setReady(true);

    function onConsent() {
      refresh();
    }
    function onOpenSettings() {
      const stored = readConsent();
      setFunctional(stored?.functional ?? false);
      setSettingsOpen(true);
    }

    window.addEventListener(CONSENT_CHANGED_EVENT, onConsent);
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, onOpenSettings);
    return () => {
      window.removeEventListener(CONSENT_CHANGED_EVENT, onConsent);
      window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, onOpenSettings);
    };
  }, [refresh]);

  const save = useCallback((next: CookieConsent) => {
    writeConsent(next);
    setConsent(next);
    setFunctional(next.functional);
    setSettingsOpen(false);
  }, []);

  useEffect(() => {
    if (!settingsOpen) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setSettingsOpen(false);
    }

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [settingsOpen]);

  if (!ready) return null;

  const showBanner = !consent && !settingsOpen;

  return (
    <>
      {showBanner ? (
        <div
          role="dialog"
          aria-labelledby="cookie-banner-title"
          aria-describedby="cookie-banner-text"
          className="fixed inset-x-0 bottom-0 z-[120] p-4 sm:p-6"
        >
          <div className="mx-auto max-w-[1180px] rounded-[6px] border border-hairline bg-paper px-5 py-5 shadow-[0_24px_60px_-28px_rgba(39,27,16,0.55)] sm:px-8 sm:py-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-[720px]">
                <p className="text-[10px] font-semibold tracking-[0.2em] text-clay uppercase">
                  Súbory cookie
                </p>
                <h2
                  id="cookie-banner-title"
                  className="font-banner mt-1.5 text-[22px] leading-tight font-normal text-espresso sm:text-[26px]"
                >
                  Váš výber, náš kľudný web
                </h2>
                <p
                  id="cookie-banner-text"
                  className="font-body mt-3 text-[13px] leading-relaxed font-normal text-stone"
                >
                  Nevyhnutné cookie potrebujeme na beh stránky a zapamätanie súhlasu. Mapa na
                  Kontakte používa Google a načíta sa až po vašom súhlase. Analytiku ani reklamu
                  na webe nemáme.{" "}
                  <Link href="/cookies" className="text-clay underline-offset-2 hover:underline">
                    Viac informácií
                  </Link>
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
                <button
                  type="button"
                  className={ghostButton}
                  onClick={() => save(defaultConsent(false))}
                >
                  Len nevyhnutné
                </button>
                <button
                  type="button"
                  className={outlineButton}
                  onClick={() => {
                    setFunctional(false);
                    setSettingsOpen(true);
                  }}
                >
                  Nastavenia
                </button>
                <button
                  type="button"
                  className={primaryButton}
                  onClick={() => save(defaultConsent(true))}
                >
                  Prijať všetky
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {settingsOpen ? (
        <div
          className="fixed inset-0 z-[130] flex items-end justify-center bg-espresso/55 p-4 backdrop-blur-[3px] sm:items-center sm:p-8"
          onClick={() => setSettingsOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-settings-title"
            className="relative w-full max-w-[560px] overflow-hidden rounded-[10px] bg-paper shadow-[0_28px_80px_-28px_rgba(39,27,16,0.55)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-hairline px-6 py-5">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.2em] text-clay uppercase">
                  Nastavenia
                </p>
                <h2
                  id="cookie-settings-title"
                  className="font-banner mt-1 text-[22px] font-normal text-espresso"
                >
                  Súbory cookie
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSettingsOpen(false)}
                className="flex size-8 shrink-0 items-center justify-center rounded-full border border-hairline text-espresso hover:bg-cream"
                aria-label="Zavrieť nastavenia"
              >
                ×
              </button>
            </div>

            <div className="max-h-[min(60vh,480px)] space-y-4 overflow-y-auto px-6 py-5">
              {cookieCategories.map((category) => {
                const enabled = category.required || functional;
                return (
                  <div key={category.key} className="rounded-[6px] border border-hairline bg-cream/50 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-display text-[16px] text-espresso">{category.title}</p>
                        <p className="font-body mt-1 text-[12px] leading-relaxed text-stone">
                          {category.summary}
                        </p>
                      </div>
                      {category.required ? (
                        <span className="shrink-0 pt-1 text-[10px] font-semibold tracking-[0.14em] text-stone uppercase">
                          Vždy zapnuté
                        </span>
                      ) : (
                        <button
                          type="button"
                          role="switch"
                          aria-checked={enabled}
                          aria-label={`${category.title} cookies`}
                          onClick={() => setFunctional((value) => !value)}
                          className={cn(
                            "relative mt-1 h-6 w-11 shrink-0 rounded-full transition-colors",
                            enabled ? "bg-clay" : "bg-hairline",
                          )}
                        >
                          <span
                            className={cn(
                              "absolute top-0.5 left-0.5 size-5 rounded-full bg-paper shadow-sm transition-transform",
                              enabled && "translate-x-5",
                            )}
                          />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col-reverse gap-2 border-t border-hairline px-6 py-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                className={outlineButton}
                onClick={() => save(defaultConsent(false))}
              >
                Len nevyhnutné
              </button>
              <button
                type="button"
                className={primaryButton}
                onClick={() => save(defaultConsent(functional))}
              >
                Uložiť výber
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
