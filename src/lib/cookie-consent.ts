export const CONSENT_COOKIE = "fine_cookie_consent";
export const CONSENT_VERSION = 1;
export const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;
export const CONSENT_CHANGED_EVENT = "fine-cookie-consent";
export const OPEN_COOKIE_SETTINGS_EVENT = "fine-open-cookie-settings";

export interface CookieConsent {
  version: number;
  necessary: true;
  functional: boolean;
  updatedAt: string;
}

export function defaultConsent(functional: boolean): CookieConsent {
  return {
    version: CONSENT_VERSION,
    necessary: true,
    functional,
    updatedAt: new Date().toISOString(),
  };
}

export function parseConsent(raw: string | null | undefined): CookieConsent | null {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Partial<CookieConsent>;
    if (parsed.version !== CONSENT_VERSION) return null;
    if (parsed.necessary !== true) return null;
    if (typeof parsed.functional !== "boolean") return null;

    return {
      version: CONSENT_VERSION,
      necessary: true,
      functional: parsed.functional,
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export function readConsent(): CookieConsent | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=([^;]*)`));
  if (!match?.[1]) return null;

  return parseConsent(decodeURIComponent(match[1]));
}

export function writeConsent(consent: CookieConsent) {
  if (typeof document === "undefined") return;

  const value = encodeURIComponent(JSON.stringify(consent));
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${value}; Path=/; Max-Age=${CONSENT_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
  window.dispatchEvent(new Event(CONSENT_CHANGED_EVENT));
}

export function hasFunctionalConsent(consent: CookieConsent | null = readConsent()) {
  return consent?.functional === true;
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT));
}
