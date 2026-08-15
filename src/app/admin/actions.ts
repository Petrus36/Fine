"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { getPrisma } from "@/lib/prisma";
import { createSession, destroySession } from "@/lib/session";
import { text } from "@/lib/admin-parse";
import type { LoginState } from "./login/LoginForm";

const loginSchema = z.object({
  email: z.email({ error: "Zadajte platný e-mail." }).trim(),
  password: z.string().min(1, { error: "Zadajte heslo." }),
});

// Compared against when the e-mail is unknown, so both paths take the same time.
const DUMMY_HASH = "$2b$12$C6UzMDM.H6dfI/f/IKcEe.7fnPvFxIkFHNKl9IHyKzOFwfBaewz2C";

export async function login(
  _state: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = text(formData.get("email"));
  const parsed = loginSchema.safeParse({ email, password: formData.get("password") });

  if (!parsed.success) {
    return {
      email,
      message: parsed.error.issues[0]?.message ?? "Skontrolujte zadané údaje.",
    };
  }

  let user: { id: string; email: string; role: string; passwordHash: string } | null;
  try {
    user = await getPrisma().user.findUnique({
      where: { email: parsed.data.email.toLowerCase() },
      select: { id: true, email: true, role: true, passwordHash: true },
    });
  } catch (error) {
    console.error("Login lookup failed.", error);
    return { email, message: "Prihlásenie zlyhalo, skúste to znova." };
  }

  const passwordMatches = await bcrypt.compare(
    parsed.data.password,
    user?.passwordHash ?? DUMMY_HASH,
  );

  if (!user || !passwordMatches) {
    return { email, message: "Nesprávny e-mail alebo heslo." };
  }

  await createSession(user);
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}
