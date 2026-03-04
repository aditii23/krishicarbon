export interface User {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  state: string;
  district: string;
  farmSize: number;
}

export interface SoilData {
  soilType: string;
  pH: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  score: number;
  timestamp?: string;
}

export interface CarbonCredit {
  tonsStored: number;
  value: number;
  status: string;
  timestamp?: string;
}

export interface RainfallForecast {
  day: string;
  probability: number;
  intensity: string;
  temp: number;
}

export interface CropRecommendation {
  name: string;
  yield: string;
  income: string;
  carbonPotential: string;
  reason: string;
}

export interface SatelliteData {
  ndvi: number;
  vegetationHealth: number;
  waterStress: number;
  timestamp: string;
}

export interface FarmRecord {
  id?: number;
  userId: number;
  type: "fertilizer" | "crop" | "expense";
  details: string;
  amount?: number;
  date: string;
}

export interface GovtScheme {
  name: string;
  description: string;
  benefit: string;
  link: string;
  eligibility: string;
}

export interface ProfitEstimation {
  estimatedYield: string;
  expectedIncome: string;
  carbonBonus: string;
  totalProfit: string;
}
