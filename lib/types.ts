export type Ecosystem = "apple" | "android" | "universal";
export type UseCase = "sport" | "office" | "travel" | "casual" | "calls";
export type Budget = "budget" | "mid" | "premium";
export type ScoreKey = "sound" | "anc" | "battery" | "sport" | "mic" | "comfort";

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  budget: Budget;
  ecosystem: Ecosystem;
  useCases: UseCase[];
  battery: number;
  sport: number;
  sound: number;
  anc: number;
  mic: number;
  comfort: number;
  note: string;
  why: string;
  category: string;
  affiliate_url: string | null;
}

export interface Category {
  slug: string;
  nameDe: string;
  nameEn: string;
  nameFr: string;
  descriptionDe: string;
  descriptionEn: string;
  descriptionFr: string;
  icon: string;
  active: boolean;
}
