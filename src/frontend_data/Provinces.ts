import { Province } from '@/types';

// TODO: Backend Integration - Replace this static data with API endpoint
// This data should come from your backend database with real-time updates
// Example API structure: GET /api/provinces
// Consider caching strategy for better performance

// Simple mock data - will be replaced by backend
export const PROVINCES_DATA: Province[] = [
  {
    id: 'istanbul',
    name: 'İstanbul',
    mainHashtag: '#istanbul',
    sentiment: { positive: 45, neutral: 35, negative: 20 },
    inclination: 'Pozitif',
    hashtags: ['#istanbul', '#boğaz', '#sultanahmet'],
    region: 'Marmara',
    d: 'M200,120 L220,130 L210,150 Z'
  },
  {
    id: 'ankara',
    name: 'Ankara',
    mainHashtag: '#EnerjiVerimliliği',
    sentiment: { positive: 55, neutral: 32, negative: 13 },
    inclination: 'Nötr',
    hashtags: ['#EnerjiVerimliliği', '#YeşilTeknoloji', '#ÇevreBilinci'],
    region: 'İç Anadolu',
    d: 'M284.94,76.9L287.51,76.52L288.86,76.63L296.2,80.95Z'
  },
  {
    id: 'izmir',
    name: 'İzmir',
    mainHashtag: '#TemizHava',
    sentiment: { positive: 58, neutral: 30, negative: 12 },
    inclination: 'Olumlu',
    hashtags: ['#TemizHava', '#ÇevreKoruması', '#YeşilTeknoloji'],
    region: 'Ege',
    d: 'M150,200 L170,210 L160,230 Z'
  }
];