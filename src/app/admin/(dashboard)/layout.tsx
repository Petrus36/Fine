import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { logout } from "../actions";
import { AdminNav } from "@/components/admin/AdminNav";
import { ghostButtonClass } from "@/components/admin/styles";

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await requireAdmin();

  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-hairline bg-paper">
        <div className="mx-auto flex w-full max-w-[1100px] flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div>
            <p className="font-display text-[18px] leading-none text-espresso">
              Fine — administrácia
            </p>
            <p className="mt-1 text-[11px] text-stone">{user.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className={ghostButtonClass} target="_blank">
              Zobraziť web
            </Link>
            <form action={logout}>
              <button type="submit" className={ghostButtonClass}>
                Odhlásiť sa
              </button>
            </form>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[1100px] px-5 pb-3 sm:px-8">
          <AdminNav />
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1100px] flex-1 px-5 py-10 sm:px-8">
        {children}
      </main>
    </div>
  );
}
