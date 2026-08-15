import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";

const gallery = [
  {
    src: "/images/hf_20260808_115640_909f4759-533f-47d3-b22e-0c5c8829563a.png",
    alt: "Bao buns s karamelizovaným mäsom",
    tilt: "-rotate-[3deg]",
    offset: "translate-y-3",
  },
  {
    src: "/images/hf_20260808_115628_f72d9396-3aae-4a69-ab0e-436a5ac19201.png",
    alt: "Poké bowl s avokádom, mangom a edamame",
    tilt: "rotate-[2deg]",
    offset: "-translate-y-2",
  },
  {
    src: "/images/hf_20260808_115618_64597245-3246-40c9-a262-cb512fb5163d.png",
    alt: "Hovädzie na zelených fazuľkách s ryžou",
    tilt: "-rotate-[2deg]",
    offset: "translate-y-2",
  },
  {
    src: "/images/hf_20260808_115437_902a5753-bbcd-40d9-8b9d-b504b06c4e9e.png",
    alt: "Steak s bylinkovým maslom a špargľou",
    tilt: "rotate-[3deg]",
    offset: "-translate-y-1",
  },
];

export function TasteSection() {
  return (
    <section className="bg-cream py-20">
      <Container>
        <div className="mx-auto max-w-[620px] text-center">
          <p className="font-display text-[12px] font-semibold tracking-[0.16em] text-rust uppercase italic">
            Rozdiel v chuti
          </p>
          <h2 className="font-display mt-4 text-[32px] leading-[1.15] font-normal tracking-[0.01em] text-ink uppercase sm:text-[38px]">
            Poznáte to hneď na prvom súste
          </h2>
          <p className="mt-5 text-[12px] leading-[1.9] text-stone">
            Pripravujeme pre vás pestré kulinárske špeciality z rôznych kútov sveta, ale tradičné
            jedlá nie sú výnimkou. Vyberáme len kvalitné a čerstvé suroviny. Zárukou kvality našich
            jedál je aj najmodernejšia gastrotechnológia a skúsený tím kuchárov.
          </p>
        </div>
      </Container>

      {/* Photos bleed past both edges, as in the design. */}
      <div className="mt-16 overflow-hidden py-4">
        <div className="flex items-center justify-center gap-1.5 sm:gap-2">
          {gallery.map((item) => (
            <Photo
              key={item.src}
              src={item.src}
              alt={item.alt}
              sizes="(max-width: 768px) 50vw, 26vw"
              className={`aspect-[7/6] w-[26%] shrink-0 rounded-[2px] shadow-[0_22px_45px_-28px_rgba(39,27,16,0.55)] transition-[transform,box-shadow] duration-500 ease-out hover:z-10 hover:rotate-0 hover:shadow-[0_28px_55px_-26px_rgba(39,27,16,0.6)] ${item.tilt} ${item.offset}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
