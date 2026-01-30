
export interface FoodItem {
  name: string;
  category: string;
  recommendation: 'always' | 'moderate' | 'avoid';
  reason?: string;
}

export interface WaterLog {
  id: string;
  amount: number; // in ml
  timestamp: number;
}

export enum AppTab {
  DASHBOARD = 'dashboard',
  WATER = 'water',
  DIET_PLAN = 'diet_plan',
  GUIDE = 'guide',
  ASSISTANT = 'assistant'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface MealSuggestion {
  time: string;
  meal: string;
  items: string[];
  tip?: string;
}

export interface WeeklyDiet {
  [key: string]: MealSuggestion[];
}
