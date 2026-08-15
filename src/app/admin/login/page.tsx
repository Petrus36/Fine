import { redirect } from "next/navigation";
import Image from "next/image";
import { getAdminUser } from "@/lib/auth";
import { LoginForm } from "./LoginForm";

export default async function LoginPage() {
  if (await getAdminUser()) redirect("/admin");

  return (
    <div className="flex flex-1 items-center justify-center px-5 py-16">
      <div className="w-full max-w-[380px]">
        <div className="flex justify-center">
          <Image
            src="/images/Logo.png"
            alt="Fine Bakery &amp; Bistro"
            width={1721}
            height={875}
            priority
            className="h-[56px] w-auto"
          />
        </div>

        <div className="mt-8 rounded-[6px] border border-hairline bg-paper p-8">
          <h1 className="font-display text-[22px] text-espresso">Administrácia</h1>
          <p className="mt-1 text-[12px] text-stone">
            Prihláste sa a upravte menu alebo upozornenie.
          </p>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
