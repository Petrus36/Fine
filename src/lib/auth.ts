import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { getPrisma } from "@/lib/prisma";
import { readSession } from "@/lib/session";

export interface AdminUser {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

/**
 * Resolves the signed-in admin against the database on every render pass, so a
 * deleted account cannot keep using an old cookie.
 */
export const getAdminUser = cache(async (): Promise<AdminUser | null> => {
  const session = await readSession();
  if (!session) return null;

  try {
    const user = await getPrisma().user.findUnique({
      where: { id: session.userId },
      select: { id: true, email: true, name: true, role: true },
    });
    return user;
  } catch (error) {
    console.error("Could not verify the admin session.", error);
    return null;
  }
});

/**
 * Guard for every admin page, server action and route handler. Server actions
 * are reachable by direct POST, so this must be called inside each one.
 */
export async function requireAdmin(): Promise<AdminUser> {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");
  return user;
}
