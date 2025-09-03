/**
 * Application constants
 */

export const SENTIMENT_OPTIONS = [
  { 
    value: 'positive', 
    label: 'Olumlu', 
    icon: '😊',
    color: 'text-sentiment-positive' 
  },
  { 
    value: 'neutral', 
    label: 'Nötr', 
    icon: '😐',
    color: 'text-sentiment-neutral' 
  },
  { 
    value: 'negative', 
    label: 'Olumsuz', 
    icon: '😞',
    color: 'text-sentiment-negative' 
  }
] as const;

export const REGION_OPTIONS = [
  'Marmara',
  'Ege',
  'Akdeniz',
  'İç Anadolu',
  'Karadeniz',
  'Doğu Anadolu',
  'Güneydoğu Anadolu'
] as const;

export const EXPANDED_HASHTAGS = [
  '#EkolojikDenge',
  '#TemizHava', 
  '#GeriDönüşüm',
  '#ÇevreBilinci',
  '#DoğaDostu',
  '#SürdürülebilirŞehir',
  '#KarbonAyakİzi',
  '#İklimDeğişikliği'
] as const;

export const COMPARISON_LIMITS = {
  MAX_CITIES: 3,
  MIN_CITIES: 2
} as const;

export const CHART_COLORS = {
  primary: 'hsl(var(--primary))',
  secondary: 'hsl(var(--secondary))',
  accent: 'hsl(var(--accent))',
  muted: 'hsl(var(--muted))'
} as const;