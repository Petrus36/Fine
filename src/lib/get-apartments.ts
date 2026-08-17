import { getPrisma } from "@/lib/prisma";
import {
  apartmentFallback,
  apartmentSettingsFallback,
} from "@/data/apartments";
import type { Apartment, ApartmentPageData, ApartmentSettings } from "@/types/apartments";

const defaultApartments = apartmentFallback.map(({ number, name, maxGuests, pricePerDay, note }) => ({
  number,
  name,
  maxGuests,
  pricePerDay,
  note,
  position: number,
}));

function mapApartment(row: {
  id: string;
  number: number;
  name: string;
  maxGuests: number;
  pricePerDay: { toNumber(): number };
  note: string;
}): Apartment {
  return {
    id: row.id,
    number: row.number,
    name: row.name,
    maxGuests: row.maxGuests,
    pricePerDay: row.pricePerDay.toNumber(),
    note: row.note,
  };
}

async function ensureRecords(): Promise<void> {
  const prisma = getPrisma();
  const count = await prisma.apartment.count();

  if (count === 0) {
    await prisma.apartment.createMany({ data: defaultApartments });
  }

  await prisma.apartmentSettings.upsert({
    where: { id: "default" },
    create: {
      id: "default",
      extraPersonPerDay: apartmentSettingsFallback.extraPersonPerDay,
      cleaningFee: apartmentSettingsFallback.cleaningFee,
      validFrom: apartmentSettingsFallback.validFrom,
    },
    update: {},
  });
}

export async function getApartmentPage(): Promise<ApartmentPageData> {
  try {
    await ensureRecords();
    const prisma = getPrisma();
    const [rows, settingsRow] = await Promise.all([
      prisma.apartment.findMany({ orderBy: { position: "asc" } }),
      prisma.apartmentSettings.findUnique({ where: { id: "default" } }),
    ]);

    const settings: ApartmentSettings = settingsRow
      ? {
          extraPersonPerDay: settingsRow.extraPersonPerDay.toNumber(),
          cleaningFee: settingsRow.cleaningFee.toNumber(),
          validFrom: settingsRow.validFrom,
        }
      : apartmentSettingsFallback;

    return {
      apartments: rows.length > 0 ? rows.map(mapApartment) : apartmentFallback,
      settings,
    };
  } catch (error) {
    console.error("Failed to load apartments, using fallback.", error);
    return { apartments: apartmentFallback, settings: apartmentSettingsFallback };
  }
}
