export interface Apartment {
  id: string;
  number: number;
  name: string;
  maxGuests: number;
  pricePerDay: number;
  note: string;
}

export interface ApartmentSettings {
  extraPersonPerDay: number;
  cleaningFee: number;
  validFrom: string;
}

export interface ApartmentPageData {
  apartments: Apartment[];
  settings: ApartmentSettings;
}
