export interface Province {
  id: string;
  name: string;
  coordinates: { x: number; y: number };
  mainTopic: string;
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
  inclination: string;
  hashtags: string[];
  region: string;
  d: string; // SVG path data for map visualization
}

export interface CityData {
  id: string;
  name: string;
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
  topics: Array<{ text: string; value: number }>;
  hashtags: string[];
  weeklyTrend: Array<{ day: string; volume: number }>;
}

export interface FilterCriteria {
  hashtags: string[];
  sentiment: string[];
  regions: string[];
}