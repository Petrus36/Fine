import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CookieSettingsButton } from "@/components/cookies/CookieSettingsButton";
import { cookieCategories, cookieNotes, cookiePage } from "@/data/cookies";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Súbory cookie",
  description:
    "Aké súbory cookie používa Fine Bakery & Bistro, na čo slúžia a ako zmeniť svoj výber.",
};

export default function CookiesPage() {
  return (
    <section className="bg-cream py-14 sm:py-20">
      <Container className="max-w-[760px]">
        <p className="text-[11px] font-semibold tracking-[0.2em] text-clay uppercase">
          {cookiePage.eyebrow}
        </p>
        <h1 className="font-banner mt-3 text-[32px] leading-tight font-normal text-espresso sm:text-[42px]">
          {cookiePage.title}
        </h1>
        <p className="font-body mt-5 text-[14px] leading-relaxed font-normal text-stone">
          {cookiePage.intro}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <CookieSettingsButton className="inline-flex items-center justify-center rounded-[3px] bg-clay px-5 py-3 text-[11px] font-semibold tracking-[0.14em] text-paper uppercase hover:bg-rust hover:text-paper" />
        </div>

        <div className="mt-10 space-y-4">
          {cookieCategories.map((category) => (
            <article key={category.key} className="rounded-[10px] border border-hairline bg-paper p-6 sm:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-display text-[20px] text-espresso">{category.title}</h2>
                <span className="text-[10px] font-semibold tracking-[0.16em] text-stone uppercase">
                  {category.required ? "Vždy zapnuté" : "Len so súhlasom"}
                </span>
              </div>
              <p className="font-body mt-3 text-[13px] leading-relaxed text-stone">
                {category.summary}
              </p>

              <div className="mt-5 overflow-x-auto">
                <table className="w-full min-w-[480px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-hairline">
                      {["Názov", "Účel", "Platnosť", "Poskytovateľ"].map((heading) => (
                        <th
                          key={heading}
                          className="py-2 pr-3 text-[10px] font-semibold tracking-[0.14em] text-stone uppercase"
                        >
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {category.cookies.map((cookie) => (
                      <tr key={cookie.name} className="border-b border-hairline/70 align-top">
                        <td className="py-3 pr-3 font-body text-[12px] font-medium text-espresso">
                          {cookie.name}
                        </td>
                        <td className="py-3 pr-3 font-body text-[12px] leading-relaxed text-stone">
                          {cookie.purpose}
                        </td>
                        <td className="py-3 pr-3 font-body text-[12px] text-stone">{cookie.duration}</td>
                        <td className="py-3 font-body text-[12px] text-stone">{cookie.provider}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          ))}
        </div>

        <div id="osobne-udaje" className="mt-8 space-y-6">
          {cookieNotes.map((note) => (
            <div key={note.title}>
              <h2 className="font-display text-[18px] text-espresso">{note.title}</h2>
              <p className="font-body mt-2 text-[13px] leading-relaxed text-stone">{note.body}</p>
            </div>
          ))}
        </div>

        <p className="font-body mt-10 text-[12px] leading-relaxed text-stone">
          Prevádzkovateľ: {site.legalName}, {site.address}. IČO {site.ico}, DIČ {site.dic}.{" "}
          <a href={`mailto:${site.email}`} className="text-clay hover:underline">
            {site.email}
          </a>
        </p>
      </Container>
    </section>
  );
}
