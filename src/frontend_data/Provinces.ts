import { Province } from '@/types';

// TODO: Backend Integration - Replace this static data with API endpoint
// This data should come from your backend database with real-time updates
// Example API structure: GET /api/provinces
// Consider caching strategy for better performance

// Complete Turkey provinces data with SVG paths for map visualization
export const PROVINCES_DATA: Province[] = [
  {
    id: 'adana',
    name: 'Adana',
    mainHashtag: '#Adana',
    sentiment: { positive: 45, neutral: 35, negative: 20 },
    inclination: 'Olumlu',
    hashtags: ['#Adana', '#Çukurova', '#Mersin'],
    region: 'Akdeniz',
    d: 'M600,380 L620,390 L610,410 L580,400 Z'
  },
  {
    id: 'adiyaman',
    name: 'Adıyaman',
    mainHashtag: '#Adıyaman',
    sentiment: { positive: 40, neutral: 35, negative: 25 },
    inclination: 'Nötr',
    hashtags: ['#Adıyaman', '#GüneydoğuAnadolu'],
    region: 'Güneydoğu Anadolu',
    d: 'M550,320 L570,330 L560,350 L530,340 Z'
  },
  {
    id: 'afyonkarahisar',
    name: 'Afyon',
    mainHashtag: '#Afyon',
    sentiment: { positive: 50, neutral: 30, negative: 20 },
    inclination: 'Olumlu',
    hashtags: ['#Afyon', '#Termal'],
    region: 'Ege',
    d: 'M350,250 L370,260 L360,280 L330,270 Z'
  },
  {
    id: 'agri',
    name: 'Ağrı',
    mainHashtag: '#Ağrı',
    sentiment: { positive: 35, neutral: 40, negative: 25 },
    inclination: 'Nötr',
    hashtags: ['#Ağrı', '#Ararat'],
    region: 'Doğu Anadolu',
    d: 'M680,280 L700,290 L690,310 L660,300 Z'
  },
  {
    id: 'aksaray',
    name: 'Aksaray',
    mainHashtag: '#Aksaray',
    sentiment: { positive: 42, neutral: 38, negative: 20 },
    inclination: 'Olumlu',
    hashtags: ['#Aksaray', '#İç Anadolu'],
    region: 'İç Anadolu',
    d: 'M480,320 L500,330 L490,350 L460,340 Z'
  },
  {
    id: 'amasya',
    name: 'Amasya',
    mainHashtag: '#Amasya',
    sentiment: { positive: 48, neutral: 32, negative: 20 },
    inclination: 'Olumlu',
    hashtags: ['#Amasya', '#Karadeniz'],
    region: 'Karadeniz',
    d: 'M450,180 L470,190 L460,210 L430,200 Z'
  },
  {
    id: 'ankara',
    name: 'Ankara',
    mainHashtag: '#Ankara',
    sentiment: { positive: 55, neutral: 28, negative: 17 },
    inclination: 'Olumlu',
    hashtags: ['#Ankara', '#Başkent', '#Metro'],
    region: 'İç Anadolu',
    d: 'M400,250 L420,260 L410,280 L380,270 Z'
  },
  {
    id: 'antalya',
    name: 'Antalya',
    mainHashtag: '#Antalya',
    sentiment: { positive: 65, neutral: 25, negative: 10 },
    inclination: 'Çok Olumlu',
    hashtags: ['#Antalya', '#Turizm', '#Akdeniz'],
    region: 'Akdeniz',
    d: 'M420,380 L440,390 L430,410 L400,400 Z'
  },
  {
    id: 'artvin',
    name: 'Artvin',
    mainHashtag: '#Artvin',
    sentiment: { positive: 40, neutral: 35, negative: 25 },
    inclination: 'Nötr',
    hashtags: ['#Artvin', '#Karadeniz'],
    region: 'Karadeniz',
    d: 'M580,120 L600,130 L590,150 L560,140 Z'
  },
  {
    id: 'aydin',
    name: 'Aydın',
    mainHashtag: '#Aydın',
    sentiment: { positive: 52, neutral: 30, negative: 18 },
    inclination: 'Olumlu',
    hashtags: ['#Aydın', '#Ege'],
    region: 'Ege',
    d: 'M250,320 L270,330 L260,350 L230,340 Z'
  },
  {
    id: 'balikesir',
    name: 'Balıkesir',
    mainHashtag: '#Balıkesir',
    sentiment: { positive: 47, neutral: 33, negative: 20 },
    inclination: 'Olumlu',
    hashtags: ['#Balıkesir', '#Marmara'],
    region: 'Marmara',
    d: 'M280,200 L300,210 L290,230 L260,220 Z'
  },
  {
    id: 'bartin',
    name: 'Bartın',
    mainHashtag: '#Bartın',
    sentiment: { positive: 43, neutral: 37, negative: 20 },
    inclination: 'Olumlu',
    hashtags: ['#Bartın', '#Karadeniz'],
    region: 'Karadeniz',
    d: 'M380,150 L400,160 L390,180 L360,170 Z'
  },
  {
    id: 'batman',
    name: 'Batman',
    mainHashtag: '#Batman',
    sentiment: { positive: 38, neutral: 40, negative: 22 },
    inclination: 'Nötr',
    hashtags: ['#Batman', '#GüneydoğuAnadolu'],
    region: 'Güneydoğu Anadolu',
    d: 'M590,300 L610,310 L600,330 L570,320 Z'
  },
  {
    id: 'bayburt',
    name: 'Bayburt',
    mainHashtag: '#Bayburt',
    sentiment: { positive: 41, neutral: 39, negative: 20 },
    inclination: 'Olumlu',
    hashtags: ['#Bayburt', '#Karadeniz'],
    region: 'Karadeniz',
    d: 'M550,160 L570,170 L560,190 L530,180 Z'
  },
  {
    id: 'bilecik',
    name: 'Bilecik',
    mainHashtag: '#Bilecik',
    sentiment: { positive: 45, neutral: 35, negative: 20 },
    inclination: 'Olumlu',
    hashtags: ['#Bilecik', '#Marmara'],
    region: 'Marmara',
    d: 'M340,220 L360,230 L350,250 L320,240 Z'
  },
  {
    id: 'bingol',
    name: 'Bingöl',
    mainHashtag: '#Bingöl',
    sentiment: { positive: 37, neutral: 41, negative: 22 },
    inclination: 'Nötr',
    hashtags: ['#Bingöl', '#DoğuAnadolu'],
    region: 'Doğu Anadolu',
    d: 'M620,260 L640,270 L630,290 L600,280 Z'
  },
  {
    id: 'bitlis',
    name: 'Bitlis',
    mainHashtag: '#Bitlis',
    sentiment: { positive: 36, neutral: 42, negative: 22 },
    inclination: 'Nötr',
    hashtags: ['#Bitlis', '#DoğuAnadolu'],
    region: 'Doğu Anadolu',
    d: 'M650,300 L670,310 L660,330 L630,320 Z'
  },
  {
    id: 'bolu',
    name: 'Bolu',
    mainHashtag: '#Bolu',
    sentiment: { positive: 49, neutral: 31, negative: 20 },
    inclination: 'Olumlu',
    hashtags: ['#Bolu', '#Karadeniz'],
    region: 'Karadeniz',
    d: 'M360,180 L380,190 L370,210 L340,200 Z'
  },
  {
    id: 'burdur',
    name: 'Burdur',
    mainHashtag: '#Burdur',
    sentiment: { positive: 44, neutral: 36, negative: 20 },
    inclination: 'Olumlu',
    hashtags: ['#Burdur', '#Göller'],
    region: 'Akdeniz',
    d: 'M380,350 L400,360 L390,380 L360,370 Z'
  },
  {
    id: 'bursa',
    name: 'Bursa',
    mainHashtag: '#Bursa',
    sentiment: { positive: 58, neutral: 27, negative: 15 },
    inclination: 'Olumlu',
    hashtags: ['#Bursa', '#Sanayi', '#Marmara'],
    region: 'Marmara',
    d: 'M320,240 L340,250 L330,270 L300,260 Z'
  },
  {
    id: 'canakkale',
    name: 'Çanakkale',
    mainHashtag: '#Çanakkale',
    sentiment: { positive: 51, neutral: 30, negative: 19 },
    inclination: 'Olumlu',
    hashtags: ['#Çanakkale', '#Gelibolu', '#Marmara'],
    region: 'Marmara',
    d: 'M220,240 L240,250 L230,270 L200,260 Z'
  },
  {
    id: 'cankiri',
    name: 'Çankırı',
    mainHashtag: '#Çankırı',
    sentiment: { positive: 43, neutral: 37, negative: 20 },
    inclination: 'Olumlu',
    hashtags: ['#Çankırı', '#İçAnadolu'],
    region: 'İç Anadolu',
    d: 'M420,220 L440,230 L430,250 L400,240 Z'
  },
  {
    id: 'corum',
    name: 'Çorum',
    mainHashtag: '#Çorum',
    sentiment: { positive: 46, neutral: 34, negative: 20 },
    inclination: 'Olumlu',
    hashtags: ['#Çorum', '#Karadeniz'],
    region: 'Karadeniz',
    d: 'M460,200 L480,210 L470,230 L440,220 Z'
  },
  {
    id: 'denizli',
    name: 'Denizli',
    mainHashtag: '#Denizli',
    sentiment: { positive: 53, neutral: 29, negative: 18 },
    inclination: 'Olumlu',
    hashtags: ['#Denizli', '#Pamukkale', '#Ege'],
    region: 'Ege',
    d: 'M320,340 L340,350 L330,370 L300,360 Z'
  },
  {
    id: 'diyarbakir',
    name: 'Diyarbakır',
    mainHashtag: '#Diyarbakır',
    sentiment: { positive: 40, neutral: 38, negative: 22 },
    inclination: 'Nötr',
    hashtags: ['#Diyarbakır', '#GüneydoğuAnadolu'],
    region: 'Güneydoğu Anadolu',
    d: 'M580,320 L600,330 L590,350 L560,340 Z'
  },
  {
    id: 'duzce',
    name: 'Düzce',
    mainHashtag: '#Düzce',
    sentiment: { positive: 47, neutral: 33, negative: 20 },
    inclination: 'Olumlu',
    hashtags: ['#Düzce', '#Karadeniz'],
    region: 'Karadeniz',
    d: 'M340,200 L360,210 L350,230 L320,220 Z'
  },
  {
    id: 'edirne',
    name: 'Edirne',
    mainHashtag: '#Edirne',
    sentiment: { positive: 49, neutral: 31, negative: 20 },
    inclination: 'Olumlu',
    hashtags: ['#Edirne', '#Marmara'],
    region: 'Marmara',
    d: 'M180,180 L200,190 L190,210 L160,200 Z'
  },
  {
    id: 'elazig',
    name: 'Elazığ',
    mainHashtag: '#Elazığ',
    sentiment: { positive: 42, neutral: 38, negative: 20 },
    inclination: 'Olumlu',
    hashtags: ['#Elazığ', '#DoğuAnadolu'],
    region: 'Doğu Anadolu',
    d: 'M570,280 L590,290 L580,310 L550,300 Z'
  },
  {
    id: 'erzincan',
    name: 'Erzincan',
    mainHashtag: '#Erzincan',
    sentiment: { positive: 41, neutral: 39, negative: 20 },
    inclination: 'Olumlu',
    hashtags: ['#Erzincan', '#DoğuAnadolu'],
    region: 'Doğu Anadolu',
    d: 'M590,240 L610,250 L600,270 L570,260 Z'
  },
  {
    id: 'erzurum',
    name: 'Erzurum',
    mainHashtag: '#Erzurum',
    sentiment: { positive: 44, neutral: 36, negative: 20 },
    inclination: 'Olumlu',
    hashtags: ['#Erzurum', '#DoğuAnadolu'],
    region: 'Doğu Anadolu',
    d: 'M630,240 L650,250 L640,270 L610,260 Z'
  },
  {
    id: 'eskisehir',
    name: 'Eskişehir',
    mainHashtag: '#Eskişehir',
    sentiment: { positive: 54, neutral: 28, negative: 18 },
    inclination: 'Olumlu',
    hashtags: ['#Eskişehir', '#Tramvay', '#İçAnadolu'],
    region: 'İç Anadolu',
    d: 'M380,270 L400,280 L390,300 L360,290 Z'
  },
  {
    id: 'gaziantep',
    name: 'Gaziantep',
    mainHashtag: '#Gaziantep',
    sentiment: { positive: 50, neutral: 30, negative: 20 },
    inclination: 'Olumlu',
    hashtags: ['#Gaziantep', '#GüneydoğuAnadolu'],
    region: 'Güneydoğu Anadolu',
    d: 'M520,340 L540,350 L530,370 L500,360 Z'
  },
  {
    id: 'giresun',
    name: 'Giresun',
    mainHashtag: '#Giresun',
    sentiment: { positive: 45, neutral: 35, negative: 20 },
    inclination: 'Olumlu',
    hashtags: ['#Giresun', '#Karadeniz'],
    region: 'Karadeniz',
    d: 'M520,140 L540,150 L530,170 L500,160 Z'
  },
  {
    id: 'gumushane',
    name: 'Gümüşhane',
    mainHashtag: '#Gümüşhane',
    sentiment: { positive: 42, neutral: 38, negative: 20 },
    inclination: 'Olumlu',
    hashtags: ['#Gümüşhane', '#Karadeniz'],
    region: 'Karadeniz',
    d: 'U540,160 L560,170 L550,190 L520,180 Z'
  },
  {
    id: 'hakkari',
    name: 'Hakkari',
    mainHashtag: '#Hakkari',
    sentiment: { positive: 34, neutral: 44, negative: 22 },
    inclination: 'Nötr',
    hashtags: ['#Hakkari', '#DoğuAnadolu'],
    region: 'Doğu Anadolu',
    d: 'M700,320 L720,330 L710,350 L680,340 Z'
  },
  {
    id: 'hatay',
    name: 'Hatay',
    mainHashtag: '#Hatay',
    sentiment: { positive: 46, neutral: 34, negative: 20 },
    inclination: 'Olumlu',
    hashtags: ['#Hatay', '#Akdeniz'],
    region: 'Akdeniz',
    d: 'M480,380 L500,390 L490,410 L460,400 Z'
  },
  {
    id: 'igdir',
    name: 'Iğdır',
    mainHashtag: '#Iğdır',
    sentiment: { positive: 38, neutral: 42, negative: 20 },
    inclination: 'Nötr',
    hashtags: ['#Iğdır', '#DoğuAnadolu'],
    region: 'Doğu Anadolu',
    d: 'M720,260 L740,270 L730,290 L700,280 Z'
  },
  {
    id: 'isparta',
    name: 'Isparta',
    mainHashtag: '#Isparta',
    sentiment: { positive: 48, neutral: 32, negative: 20 },
    inclination: 'Olumlu',
    hashtags: ['#Isparta', '#Göller'],
    region: 'Akdeniz',
    d: 'M400,340 L420,350 L410,370 L380,360 Z'
  },
  {
    id: 'istanbul',
    name: 'İstanbul',
    mainHashtag: '#İstanbul',
    sentiment: { positive: 60, neutral: 25, negative: 15 },
    inclination: 'Olumlu',
    hashtags: ['#İstanbul', '#Metro', '#Boğaz'],
    region: 'Marmara',
    d: 'M280,180 L300,190 L290,210 L260,200 Z'
  },
  {
    id: 'izmir',
    name: 'İzmir',
    mainHashtag: '#İzmir',
    sentiment: { positive: 57, neutral: 28, negative: 15 },
    inclination: 'Olumlu',
    hashtags: ['#İzmir', '#Ege', '#Metro'],
    region: 'Ege',
    d: 'M220,320 L240,330 L230,350 L200,340 Z'
  },
  {
    id: 'karabuk',
    name: 'Karabük',
    mainHashtag: '#Karabük',
    sentiment: { positive: 44, neutral: 36, negative: 20 },
    inclination: 'Olumlu',
    hashtags: ['#Karabük', '#Karadeniz'],
    region: 'Karadeniz',
    d: 'M400,160 L420,170 L410,190 L380,180 Z'
  },
  {
    id: 'karaman',
    name: 'Karaman',
    mainHashtag: '#Karaman',
    sentiment: { positive: 43, neutral: 37, negative: 20 },
    inclination: 'Olumlu',
    hashtags: ['#Karaman', '#İçAnadolu'],
    region: 'İç Anadolu',
    d: 'M460,340 L480,350 L470,370 L440,360 Z'
  },
  {
    id: 'kars',
    name: 'Kars',
    mainHashtag: '#Kars',
    sentiment: { positive: 39, neutral: 41, negative: 20 },
    inclination: 'Nötr',
    hashtags: ['#Kars', '#DoğuAnadolu'],
    region: 'Doğu Anadolu',
    d: 'M680,220 L700,230 L690,250 L660,240 Z'
  },
  {
    id: 'kastamonu',
    name: 'Kastamonu',
    mainHashtag: '#Kastamonu',
    sentiment: { positive: 45, neutral: 35, negative: 20 },
    inclination: 'Olumlu',
    hashtags: ['#Kastamonu', '#Karadeniz'],
    region: 'Karadeniz',
    d: 'M420,180 L440,190 L430,210 L400,200 Z'
  },
  {
    id: 'kayseri',
    name: 'Kayseri',
    mainHashtag: '#Kayseri',
    sentiment: { positive: 52, neutral: 30, negative: 18 },
    inclination: 'Olumlu',
    hashtags: ['#Kayseri', '#İçAnadolu'],
    region: 'İç Anadolu',
    d: 'M500,280 L520,290 L510,310 L480,300 Z'
  },
  {
    id: 'kilis',
    name: 'Kilis',
    mainHashtag: '#Kilis',
    sentiment: { positive: 41, neutral: 39, negative: 20 },
    inclination: 'Olumlu',
    hashtags: ['#Kilis', '#GüneydoğuAnadolu'],
    region: 'Güneydoğu Anadolu',
    d: 'M500,360 L520,370 L510,390 L480,380 Z'
  },
  {
    id: 'kirikkale',
    name: 'Kırıkkale',
    mainHashtag: '#Kırıkkale',
    sentiment: { positive: 44, neutral: 36, negative: 20 },
    inclination: 'Olumlu',
    hashtags: ['#Kırıkkale', '#İçAnadolu'],
    region: 'İç Anadolu',
    d: 'M440,240 L460,250 L450,270 L420,260 Z'
  },
  {
    id: 'kirklareli',
    name: 'Kırklareli',
    mainHashtag: '#Kırklareli',
    sentiment: { positive: 47, neutral: 33, negative: 20 },
    inclination: 'Olumlu',
    hashtags: ['#Kırklareli', '#Marmara'],
    region: 'Marmara',
    d: 'M200,160 L220,170 L210,190 L180,180 Z'
  },
  {
    id: 'kirsehir',
    name: 'Kırşehir',
    mainHashtag: '#Kırşehir',
    sentiment: { positive: 43, neutral: 37, negative: 20 },
    inclination: 'Olumlu',
    hashtags: ['#Kırşehir', '#İçAnadolu'],
    region: 'İç Anadolu',
    d: 'M460,260 L480,270 L470,290 L440,280 Z'
  },
  {
    id: 'kocaeli',
    name: 'Kocaeli',
    mainHashtag: '#Kocaeli',
    sentiment: { positive: 55, neutral: 28, negative: 17 },
    inclination: 'Olumlu',
    hashtags: ['#Kocaeli', '#Sanayi', '#Marmara'],
    region: 'Marmara',
    d: 'M300,200 L320,210 L310,230 L280,220 Z'
  },
  {
    id: 'konya',
    name: 'Konya',
    mainHashtag: '#Konya',
    sentiment: { positive: 50, neutral: 30, negative: 20 },
    inclination: 'Olumlu',
    hashtags: ['#Konya', '#İçAnadolu'],
    region: 'İç Anadolu',
    d: 'M440,320 L460,330 L450,350 L420,340 Z'
  },
  {
    id: 'kutahya',
    name: 'Kütahya',
    mainHashtag: '#Kütahya',
    sentiment: { positive: 46, neutral: 34, negative: 20 },
    inclination: 'Olumlu',
    hashtags: ['#Kütahya', '#Ege'],
    region: 'Ege',
    d: 'M320,280 L340,290 L330,310 L300,300 Z'
  },
  {
    id: 'malatya',
    name: 'Malatya',
    mainHashtag: '#Malatya',
    sentiment: { positive: 45, neutral: 35, negative: 20 },
    inclination: 'Olumlu',
    hashtags: ['#Malatya', '#DoğuAnadolu'],
    region: 'Doğu Anadolu',
    d: 'M540,300 L560,310 L550,330 L520,320 Z'
  },
  {
    id: 'manisa',
    name: 'Manisa',
    mainHashtag: '#Manisa',
    sentiment: { positive: 49, neutral: 31, negative: 20 },
    inclination: 'Olumlu',
    hashtags: ['#Manisa', '#Ege'],
    region: 'Ege',
    d: 'M270,300 L290,310 L280,330 L250,320 Z'
  },
  {
    id: 'mardin',
    name: 'Mardin',
    mainHashtag: '#Mardin',
    sentiment: { positive: 42, neutral: 38, negative: 20 },
    inclination: 'Olumlu',
    hashtags: ['#Mardin', '#GüneydoğuAnadolu'],
    region: 'Güneydoğu Anadolu',
    d: 'M610,340 L630,350 L620,370 L590,360 Z'
  },
  {
    id: 'mersin',
    name: 'Mersin',
    mainHashtag: '#Mersin',
    sentiment: { positive: 51, neutral: 30, negative: 19 },
    inclination: 'Olumlu',
    hashtags: ['#Mersin', '#Akdeniz'],
    region: 'Akdeniz',
    d: 'M520,380 L540,390 L530,410 L500,400 Z'
  },
  {
    id: 'mugla',
    name: 'Muğla',
    mainHashtag: '#Muğla',
    sentiment: { positive: 58, neutral: 27, negative: 15 },
    inclination: 'Olumlu',
    hashtags: ['#Muğla', '#Turizm', '#Ege'],
    region: 'Ege',
    d: 'M280,360 L300,370 L290,390 L260,380 Z'
  },
  {
    id: 'mus',
    name: 'Muş',
    mainHashtag: '#Muş',
    sentiment: { positive: 37, neutral: 43, negative: 20 },
    inclination: 'Nötr',
    hashtags: ['#Muş', '#DoğuAnadolu'],
    region: 'Doğu Anadolu',
    d: 'M610,280 L630,290 L620,310 L590,300 Z'
  },
  {
    id: 'nevsehir',
    name: 'Nevşehir',
    mainHashtag: '#Nevşehir',
    sentiment: { positive: 54, neutral: 28, negative: 18 },
    inclination: 'Olumlu',
    hashtags: ['#Nevşehir', '#Kapadokya'],
    region: 'İç Anadolu',
    d: 'M480,300 L500,310 L490,330 L460,320 Z'
  },
  {
    id: 'nigde',
    name: 'Niğde',
    mainHashtag: '#Niğde',
    sentiment: { positive: 44, neutral: 36, negative: 20 },
    inclination: 'Olumlu',
    hashtags: ['#Niğde', '#İçAnadolu'],
    region: 'İç Anadolu',
    d: 'M500,320 L520,330 L510,350 L480,340 Z'
  },
  {
    id: 'ordu',
    name: 'Ordu',
    mainHashtag: '#Ordu',
    sentiment: { positive: 47, neutral: 33, negative: 20 },
    inclination: 'Olumlu',
    hashtags: ['#Ordu', '#Karadeniz'],
    region: 'Karadeniz',
    d: 'M490,160 L510,170 L500,190 L470,180 Z'
  },
  {
    id: 'osmaniye',
    name: 'Osmaniye',
    mainHashtag: '#Osmaniye',
    sentiment: { positive: 43, neutral: 37, negative: 20 },
    inclination: 'Olumlu',
    hashtags: ['#Osmaniye', '#Akdeniz'],
    region: 'Akdeniz',
    d: 'M540,370 L560,380 L550,400 L520,390 Z'
  },
  {
    id: 'rize',
    name: 'Rize',
    mainHashtag: '#Rize',
    sentiment: { positive: 48, neutral: 32, negative: 20 },
    inclination: 'Olumlu',
    hashtags: ['#Rize', '#Çay', '#Karadeniz'],
    region: 'Karadeniz',
    d: 'M560,140 L580,150 L570,170 L540,160 Z'
  },
  {
    id: 'sakarya',
    name: 'Sakarya',
    mainHashtag: '#Sakarya',
    sentiment: { positive: 50, neutral: 30, negative: 20 },
    inclination: 'Olumlu',
    hashtags: ['#Sakarya', '#Marmara'],
    region: 'Marmara',
    d: 'M340,200 L360,210 L350,230 L320,220 Z'
  },
  {
    id: 'samsun',
    name: 'Samsun',
    mainHashtag: '#Samsun',
    sentiment: { positive: 51, neutral: 30, negative: 19 },
    inclination: 'Olumlu',
    hashtags: ['#Samsun', '#Karadeniz'],
    region: 'Karadeniz',
    d: 'M470,160 L490,170 L480,190 L450,180 Z'
  },
  {
    id: 'sanliurfa',
    name: 'Şanlıurfa',
    mainHashtag: '#Şanlıurfa',
    sentiment: { positive: 44, neutral: 36, negative: 20 },
    inclination: 'Olumlu',
    hashtags: ['#Şanlıurfa', '#GüneydoğuAnadolu'],
    region: 'Güneydoğu Anadolu',
    d: 'M560,340 L580,350 L570,370 L540,360 Z'
  },
  {
    id: 'siirt',
    name: 'Siirt',
    mainHashtag: '#Siirt',
    sentiment: { positive: 39, neutral: 41, negative: 20 },
    inclination: 'Nötr',
    hashtags: ['#Siirt', '#GüneydoğuAnadolu'],
    region: 'Güneydoğu Anadolu',
    d: 'M630,320 L650,330 L640,350 L610,340 Z'
  },
  {
    id: 'sinop',
    name: 'Sinop',
    mainHashtag: '#Sinop',
    sentiment: { positive: 46, neutral: 34, negative: 20 },
    inclination: 'Olumlu',
    hashtags: ['#Sinop', '#Karadeniz'],
    region: 'Karadeniz',
    d: 'M440,140 L460,150 L450,170 L420,160 Z'
  },
  {
    id: 'sirnak',
    name: 'Şırnak',
    mainHashtag: '#Şırnak',
    sentiment: { positive: 36, neutral: 44, negative: 20 },
    inclination: 'Nötr',
    hashtags: ['#Şırnak', '#GüneydoğuAnadolu'],
    region: 'Güneydoğu Anadolu',
    d: 'M650,340 L670,350 L660,370 L630,360 Z'
  },
  {
    id: 'sivas',
    name: 'Sivas',
    mainHashtag: '#Sivas',
    sentiment: { positive: 45, neutral: 35, negative: 20 },
    inclination: 'Olumlu',
    hashtags: ['#Sivas', '#İçAnadolu'],
    region: 'İç Anadolu',
    d: 'M520,240 L540,250 L530,270 L500,260 Z'
  },
  {
    id: 'tekirdag',
    name: 'Tekirdağ',
    mainHashtag: '#Tekirdağ',
    sentiment: { positive: 50, neutral: 30, negative: 20 },
    inclination: 'Olumlu',
    hashtags: ['#Tekirdağ', '#Marmara'],
    region: 'Marmara',
    d: 'M240,200 L260,210 L250,230 L220,220 Z'
  },
  {
    id: 'tokat',
    name: 'Tokat',
    mainHashtag: '#Tokat',
    sentiment: { positive: 45, neutral: 35, negative: 20 },
    inclination: 'Olumlu',
    hashtags: ['#Tokat', '#Karadeniz'],
    region: 'Karadeniz',
    d: 'M490,200 L510,210 L500,230 L470,220 Z'
  },
  {
    id: 'trabzon',
    name: 'Trabzon',
    mainHashtag: '#Trabzon',
    sentiment: { positive: 52, neutral: 30, negative: 18 },
    inclination: 'Olumlu',
    hashtags: ['#Trabzon', '#Karadeniz'],
    region: 'Karadeniz',
    d: 'M540,140 L560,150 L550,170 L520,160 Z'
  },
  {
    id: 'tunceli',
    name: 'Tunceli',
    mainHashtag: '#Tunceli',
    sentiment: { positive: 40, neutral: 40, negative: 20 },
    inclination: 'Nötr',
    hashtags: ['#Tunceli', '#DoğuAnadolu'],
    region: 'Doğu Anadolu',
    d: 'M550,280 L570,290 L560,310 L530,300 Z'
  },
  {
    id: 'usak',
    name: 'Uşak',
    mainHashtag: '#Uşak',
    sentiment: { positive: 46, neutral: 34, negative: 20 },
    inclination: 'Olumlu',
    hashtags: ['#Uşak', '#Ege'],
    region: 'Ege',
    d: 'M300,320 L320,330 L310,350 L280,340 Z'
  },
  {
    id: 'van',
    name: 'Van',
    mainHashtag: '#Van',
    sentiment: { positive: 41, neutral: 39, negative: 20 },
    inclination: 'Olumlu',
    hashtags: ['#Van', '#DoğuAnadolu'],
    region: 'Doğu Anadolu',
    d: 'M670,300 L690,310 L680,330 L650,320 Z'
  },
  {
    id: 'yalova',
    name: 'Yalova',
    mainHashtag: '#Yalova',
    sentiment: { positive: 52, neutral: 30, negative: 18 },
    inclination: 'Olumlu',
    hashtags: ['#Yalova', '#Marmara'],
    region: 'Marmara',
    d: 'M320,220 L340,230 L330,250 L300,240 Z'
  },
  {
    id: 'yozgat',
    name: 'Yozgat',
    mainHashtag: '#Yozgat',
    sentiment: { positive: 44, neutral: 36, negative: 20 },
    inclination: 'Olumlu',
    hashtags: ['#Yozgat', '#İçAnadolu'],
    region: 'İç Anadolu',
    d: 'M480,240 L500,250 L490,270 L460,260 Z'
  },
  {
    id: 'zonguldak',
    name: 'Zonguldak',
    mainHashtag: '#Zonguldak',
    sentiment: { positive: 44, neutral: 36, negative: 20 },
    inclination: 'Olumlu',
    hashtags: ['#Zonguldak', '#Kömür', '#Karadeniz'],
    region: 'Karadeniz',
    d: 'M410,140 L430,150 L420,170 L390,160 Z'
  },
  {
    id: 'ardahan',
    name: 'Ardahan',
    mainHashtag: '#Ardahan',
    sentiment: { positive: 38, neutral: 42, negative: 20 },
    inclination: 'Nötr',
    hashtags: ['#Ardahan', '#DoğuAnadolu'],
    region: 'Doğu Anadolu',
    d: 'M660,220 L680,230 L670,250 L640,240 Z'
  }
];