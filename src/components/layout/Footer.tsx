import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { footerLinks, openingHours, site } from "@/data/site";

const columnTitle =
  "font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-paper/50";
const columnItem = "font-body text-[12px] leading-[2.1] font-normal text-paper/85";

const footerButtonClass =
  "!flex w-full max-w-full justify-center whitespace-normal px-5 py-3 text-center leading-snug sm:!inline-flex sm:w-auto sm:whitespace-nowrap sm:px-7 sm:py-3.5";

export function Footer() {
  return (
    <footer className="bg-footer-outer px-4 pt-6 pb-8 sm:px-6 sm:pb-10">
      <Container className="px-0">
        <div className="rounded-[6px] bg-footer-inner px-6 py-10 sm:px-12 sm:py-12">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr_1.3fr_1fr]">
            <div>
              <p className={columnTitle}>Otváracie hodiny</p>
              <ul className="mt-4">
                {openingHours.map((row) => (
                  <li key={row.days} className={columnItem}>
                    {row.days}: {row.hours}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className={columnTitle}>Podstránky</p>
              <ul className="mt-4">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`${columnItem} transition-colors hover:text-paper`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className={columnTitle}>Kontakt</p>
              <ul className="mt-4">
                <li className={columnItem}>
                  {site.legalName}, {site.address}
                </li>
                <li className={columnItem}>
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-paper">
                    {site.phone}
                  </a>
                </li>
                <li className={columnItem}>
                  <a href={`mailto:${site.email}`} className="hover:text-paper">
                    {site.email}
                  </a>
                </li>
                <li className={columnItem}>
                  <a href={site.facebook} className="hover:text-paper">
                    Facebook
                  </a>
                </li>
                <li className={columnItem}>
                  <a href={site.instagram} className="hover:text-paper">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>

            <div className="min-w-0">
              <p className={columnTitle}>Rezervujte / Objednajte</p>
              <div className="mt-4 flex flex-col gap-3">
                <Button href={site.orderUrl} className={footerButtonClass}>
                  Objednať jedlo online
                </Button>
                <Button href={site.reservationUrl} className={footerButtonClass}>
                  Rezervovať ubytovanie
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-12 space-y-2 border-t border-paper/10 pt-6">
            <p className="font-body text-[10px] leading-relaxed font-normal text-paper/45">
              Prístup ku gastru zostal ten istý ako za čias Fine Restaurant, len s novou vášňou
              ku remeselnému pečivu.
            </p>
            <p className="font-body text-[10px] font-normal text-paper/45">
              © {new Date().getFullYear()} Fine Bakery &amp; Bistro. Všetky práva vyhradené.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
