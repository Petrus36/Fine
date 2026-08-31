"use server";

import { z } from "zod";
import { text } from "@/lib/admin-parse";
import {
  getContactEmailFrom,
  getContactEmailTo,
  getResendClient,
} from "@/lib/resend";
import type { ContactFormState } from "@/types/contact-form";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { error: "Zadajte meno." })
    .max(120, { error: "Meno je príliš dlhé." }),
  phone: z
    .string()
    .trim()
    .max(40, { error: "Telefón je príliš dlhý." })
    .optional()
    .transform((value) => value || undefined),
  email: z.email({ error: "Zadajte platný e-mail." }).trim(),
  message: z
    .string()
    .trim()
    .min(10, { error: "Správa musí mať aspoň 10 znakov." })
    .max(5000, { error: "Správa je príliš dlhá." }),
  consent: z.literal("on", { error: "Potvrďte súhlas so spracovaním údajov." }),
});

export async function submitContactForm(
  _state: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Honeypot — bots that fill hidden fields get a silent success.
  if (text(formData.get("website"))) {
    return { status: "ok", message: "Ďakujeme, správa bola odoslaná." };
  }

  const parsed = contactSchema.safeParse({
    name: text(formData.get("name")),
    phone: text(formData.get("phone")),
    email: text(formData.get("email")),
    message: text(formData.get("message")),
    consent: formData.get("consent"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Skontrolujte zadané údaje.",
    };
  }

  const resend = getResendClient();
  if (!resend) {
    console.error("Contact form: Fine_API_Resender is not configured.");
    return {
      status: "error",
      message:
        "Odosielanie správ je dočasne nedostupné. Zavolajte nám prosím telefonicky alebo e-mailom.",
    };
  }

  const { name, phone, email, message } = parsed.data;
  const phoneLine = phone ? `Telefón: ${phone}\n` : "";

  try {
    const { error } = await resend.emails.send({
      from: getContactEmailFrom(),
      to: getContactEmailTo(),
      replyTo: email,
      subject: `Kontakt z webu — ${name}`,
      text: [
        `Meno: ${name}`,
        phoneLine.trim(),
        `E-mail: ${email}`,
        "",
        "Správa:",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
      html: `
        <p><strong>Meno:</strong> ${escapeHtml(name)}</p>
        ${phone ? `<p><strong>Telefón:</strong> ${escapeHtml(phone)}</p>` : ""}
        <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
        <p><strong>Správa:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
    });

    if (error) {
      console.error("Resend contact form error:", error);
      return {
        status: "error",
        message: "Správu sa nepodarilo odoslať. Skúste to prosím znova alebo nás kontaktujte telefonicky.",
      };
    }

    return {
      status: "ok",
      message: "Ďakujeme, správa bola odoslaná. Ozveme sa vám čo najskôr.",
    };
  } catch (error) {
    console.error("Contact form send failed:", error);
    return {
      status: "error",
      message: "Správu sa nepodarilo odoslať. Skúste to prosím znova.",
    };
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
