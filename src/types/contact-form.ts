export type ContactFormState = {
  status: "idle" | "ok" | "error";
  message?: string;
};

export const contactFormIdleState: ContactFormState = { status: "idle" };
