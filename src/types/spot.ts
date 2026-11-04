export type District = 'Toul Kork' | 'Boeng Keng Kang (BKK)' | 'Sen Sok' | 'Daun Penh' | 'Chamkarmon / TTP';

export type PriceLevel = '$' | '$$' | '$$$';

export type NoiseLevel = 'quiet' | 'moderate' | 'lively';

export type PlugRating = 'plenty' | 'moderate' | 'limited';

export interface University {
  id: string;
  name: string;
  nameKh: string;
  shortName: string;
  lat: number;
  lng: number;
  district: string;
}

export interface Review {
  id: string;
  author: string;
  university: string;
  rating: number;
  comment: string;
  commentKh?: string;
  date: string;
  highlight?: string;
}

export interface StudySpot {
  id: string;
  name: string;
  nameKh: string;
  tagline: string;
  taglineKh: string;
  district: District;
  address: string;
  addressKh: string;
  lat: number;
  lng: number;
  images: string[];
  priceLevel: PriceLevel;
  avgDrinkPrice: string;
  coffeePriceRange: string;
  wifiSpeedMbps: number;
  wifiPingMs: number;
  wifiVerified: boolean;
  noiseLevel: NoiseLevel;
  plugRating: PlugRating;
  plugDescription: string;
  plugDescriptionKh: string;
  seatingStyle: 'ergonomic' | 'mixed' | 'sofas';
  seatingCapacity: number;
  airConditioning: boolean;
  lateNight: boolean;
  isOpen24Hours: boolean;
  openingHoursText: string;
  openingHoursTextKh: string;
  openTime: number; // e.g. 7.0 for 07:00
  closeTime: number; // e.g. 22.0 for 22:00, 24 for 24h
  parking: {
    moto: 'free' | 'paid' | 'limited';
    car: boolean;
    notes: string;
    notesKh: string;
  };
  amenities: string[];
  amenitiesKh: string[];
  rating: number;
  reviewCount: number;
  reviews: Review[];
  featured?: boolean;
}

export interface FilterState {
  searchQuery: string;
  district: string;
  priceLevel: string;
  noiseLevel: string;
  minWifiSpeed: number;
  onlyPlugs: boolean;
  onlyQuiet: boolean;
  onlyUnder2: boolean;
  onlyLateNight: boolean;
  onlyAc: boolean;
  onlyFreeMotoParking: boolean;
  onlyErgonomic: boolean;
  sortBy: 'distance' | 'wifi' | 'price' | 'rating';
}

export type Language = 'en' | 'kh';
