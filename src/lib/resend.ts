import "server-only";
import { Resend } from "resend";

export function getResendClient(): Resend | null {
  const apiKey = process.env.Fine_API_Resender?.trim();
  if (!apiKey) return null;
  return new Resend(apiKey);
}

export function getContactEmailTo(): string {
  return process.env.CONTACT_EMAIL_TO?.trim() || "fine@finerestaurant.sk";
}

export function getContactEmailFrom(): string {
  return process.env.RESEND_FROM_EMAIL?.trim() || "Fine Bakery & Bistro <onboarding@resend.dev>";
}
