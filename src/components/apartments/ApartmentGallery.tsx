import { Container } from "@/components/ui/Container";
import { GalleryScroller } from "./GalleryScroller";
import { apartmentGallery } from "@/data/apartments";

export function ApartmentGallery() {
  return (
    <section className="bg-cream py-14 sm:py-16">
      <Container>
        <h2 className="font-banner text-center text-[34px] font-normal text-espresso sm:text-[42px]">
          Fotogaléria
        </h2>

        <div className="mt-8 -mx-4 sm:-mx-6">
          <GalleryScroller photos={apartmentGallery} />
        </div>
      </Container>
    </section>
  );
}
