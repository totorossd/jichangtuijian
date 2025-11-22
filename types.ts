export interface PricingPlan {
  name: string;
  price: number;
  period: string; // '月付', '季付', '年付'
  traffic: string;
  features: string[];
}

export interface Review {
  user: string;
  rating: number;
  date: string;
  content: string;
}

export interface Provider {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  tags: string[];
  rating: number;
  startPrice: number; // Monthly price in CNY
  speedScore: number; // 0-100
  stabilityScore: number; // 0-100
  logoUrl: string;
  features: string[];
  plans?: PricingPlan[];
  reviews?: Review[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export enum FilterType {
  ALL = 'ALL',
  BUDGET = 'BUDGET',
  PREMIUM = 'PREMIUM',
  STREAMING = 'STREAMING',
}