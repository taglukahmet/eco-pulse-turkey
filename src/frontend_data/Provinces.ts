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
    mainHashtag: '#adana',
    sentiment: { positive: 45, neutral: 35, negative: 20 },
    inclination: 'Pozitif',
    hashtags: ['#adana', '#çukurova', '#mersin'],
    region: 'Akdeniz',
    d: 'M600,380 L620,390 L610,410 L580,400 Z'
  },
  {
    id: 'adiyaman',
    name: 'Adıyaman',
    mainHashtag: '#adıyaman',
    sentiment: { positive: 40, neutral: 35, negative: 25 },
    inclination: 'Nötr',
    hashtags: ['#adıyaman', '#güneydoğu', '#fırat'],
    region: 'Güneydoğu Anadolu',
    d: 'M550,320 L570,330 L560,350 L530,340 Z'
  },
  {
    id: 'afyon',
    name: 'Afyon',
    mainHashtag: '#afyon',
    sentiment: { positive: 50, neutral: 30, negative: 20 },
    inclination: 'Pozitif',
    hashtags: ['#afyon', '#termal', '#karahisar'],
    region: 'Ege',
    d: 'M350,250 L370,260 L360,280 L330,270 Z'
  },
  {
    id: 'agri',
    name: 'Ağrı',
    mainHashtag: '#ağrı',
    sentiment: { positive: 35, neutral: 40, negative: 25 },
    inclination: 'Nötr',
    hashtags: ['#ağrı', '#ararat', '#doğu'],
    region: 'Doğu Anadolu',
    d: 'M680,280 L700,290 L690,310 L660,300 Z'
  },
  {
    id: 'aksaray',
    name: 'Aksaray',
    mainHashtag: '#aksaray',
    sentiment: { positive: 45, neutral: 35, negative: 20 },
    inclination: 'Pozitif',
    hashtags: ['#aksaray', '#kapadokya', '#ihlara'],
    region: 'İç Anadolu',
    d: 'M480,290 L500,300 L490,320 L460,310 Z'
  },
  {
    id: 'amasya',
    name: 'Amasya',
    mainHashtag: '#amasya',
    sentiment: { positive: 55, neutral: 30, negative: 15 },
    inclination: 'Pozitif',
    hashtags: ['#amasya', '#yeşilırmak', '#tarihi'],
    region: 'Karadeniz',
    d: 'M480,180 L500,190 L490,210 L460,200 Z'
  },
  {
    id: 'ankara',
    name: 'Ankara',
    mainHashtag: '#EnerjiVerimliliği',
    sentiment: { positive: 55, neutral: 32, negative: 13 },
    inclination: 'Nötr',
    hashtags: ['#EnerjiVerimliliği', '#YeşilTeknoloji', '#ÇevreBilinci'],
    region: 'İç Anadolu',
    d: 'M420,220 L450,230 L440,260 L400,250 Z'
  },
  {
    id: 'antalya',
    name: 'Antalya',
    mainHashtag: '#antalya',
    sentiment: { positive: 60, neutral: 25, negative: 15 },
    inclination: 'Pozitif',
    hashtags: ['#antalya', '#turizm', '#akdeniz'],
    region: 'Akdeniz',
    d: 'M380,350 L420,360 L410,390 L370,380 Z'
  },
  {
    id: 'ardahan',
    name: 'Ardahan',
    mainHashtag: '#ardahan',
    sentiment: { positive: 40, neutral: 35, negative: 25 },
    inclination: 'Nötr',
    hashtags: ['#ardahan', '#doğu', '#kars'],
    region: 'Doğu Anadolu',
    d: 'M640,150 L660,160 L650,180 L620,170 Z'
  },
  {
    id: 'artvin',
    name: 'Artvin',
    mainHashtag: '#artvin',
    sentiment: { positive: 50, neutral: 30, negative: 20 },
    inclination: 'Pozitif',
    hashtags: ['#artvin', '#karadeniz', '#çoruh'],
    region: 'Karadeniz',
    d: 'M600,120 L620,130 L610,150 L580,140 Z'
  },
  {
    id: 'aydin',
    name: 'Aydın',
    mainHashtag: '#aydın',
    sentiment: { positive: 55, neutral: 30, negative: 15 },
    inclination: 'Pozitif',
    hashtags: ['#aydın', '#ege', '#menderes'],
    region: 'Ege',
    d: 'M280,320 L300,330 L290,350 L260,340 Z'
  },
  {
    id: 'balikesir',
    name: 'Balıkesir',
    mainHashtag: '#balıkesir',
    sentiment: { positive: 50, neutral: 35, negative: 15 },
    inclination: 'Pozitif',
    hashtags: ['#balıkesir', '#marmara', '#bandırma'],
    region: 'Marmara',
    d: 'M280,180 L320,190 L310,220 L270,210 Z'
  },
  {
    id: 'bartin',
    name: 'Bartın',
    mainHashtag: '#bartın',
    sentiment: { positive: 45, neutral: 35, negative: 20 },
    inclination: 'Pozitif',
    hashtags: ['#bartın', '#karadeniz', '#amasra'],
    region: 'Karadeniz',
    d: 'M360,120 L380,130 L370,150 L340,140 Z'
  },
  {
    id: 'batman',
    name: 'Batman',
    mainHashtag: '#batman',
    sentiment: { positive: 40, neutral: 35, negative: 25 },
    inclination: 'Nötr',
    hashtags: ['#batman', '#güneydoğu', '#dicle'],
    region: 'Güneydoğu Anadolu',
    d: 'M580,300 L600,310 L590,330 L560,320 Z'
  },
  {
    id: 'bayburt',
    name: 'Bayburt',
    mainHashtag: '#bayburt',
    sentiment: { positive: 45, neutral: 35, negative: 20 },
    inclination: 'Pozitif',
    hashtags: ['#bayburt', '#doğu', '#karadeniz'],
    region: 'Karadeniz',
    d: 'M580,160 L600,170 L590,190 L560,180 Z'
  },
  {
    id: 'bilecik',
    name: 'Bilecik',
    mainHashtag: '#bilecik',
    sentiment: { positive: 50, neutral: 30, negative: 20 },
    inclination: 'Pozitif',
    hashtags: ['#bilecik', '#marmara', '#sakarya'],
    region: 'Marmara',
    d: 'M340,200 L360,210 L350,230 L320,220 Z'
  },
  {
    id: 'bingol',
    name: 'Bingöl',
    mainHashtag: '#bingöl',
    sentiment: { positive: 40, neutral: 35, negative: 25 },
    inclination: 'Nötr',
    hashtags: ['#bingöl', '#doğu', '#murat'],
    region: 'Doğu Anadolu',
    d: 'M620,260 L640,270 L630,290 L600,280 Z'
  },
  {
    id: 'bitlis',
    name: 'Bitlis',
    mainHashtag: '#bitlis',
    sentiment: { positive: 35, neutral: 40, negative: 25 },
    inclination: 'Nötr',
    hashtags: ['#bitlis', '#doğu', '#van'],
    region: 'Doğu Anadolu',
    d: 'M640,300 L660,310 L650,330 L620,320 Z'
  },
  {
    id: 'bolu',
    name: 'Bolu',
    mainHashtag: '#bolu',
    sentiment: { positive: 55, neutral: 30, negative: 15 },
    inclination: 'Pozitif',
    hashtags: ['#bolu', '#karadeniz', '#abant'],
    region: 'Karadeniz',
    d: 'M380,160 L410,170 L400,200 L370,190 Z'
  },
  {
    id: 'burdur',
    name: 'Burdur',
    mainHashtag: '#burdur',
    sentiment: { positive: 50, neutral: 30, negative: 20 },
    inclination: 'Pozitif',
    hashtags: ['#burdur', '#göller', '#salda'],
    region: 'Akdeniz',
    d: 'M350,320 L370,330 L360,350 L330,340 Z'
  },
  {
    id: 'bursa',
    name: 'Bursa',
    mainHashtag: '#bursa',
    sentiment: { positive: 60, neutral: 25, negative: 15 },
    inclination: 'Pozitif',
    hashtags: ['#bursa', '#uludağ', '#marmara'],
    region: 'Marmara',
    d: 'M320,200 L350,210 L340,240 L310,230 Z'
  },
  {
    id: 'canakkale',
    name: 'Çanakkale',
    mainHashtag: '#çanakkale',
    sentiment: { positive: 55, neutral: 30, negative: 15 },
    inclination: 'Pozitif',
    hashtags: ['#çanakkale', '#gelibolu', '#truva'],
    region: 'Marmara',
    d: 'M220,200 L260,210 L250,240 L210,230 Z'
  },
  {
    id: 'cankiri',
    name: 'Çankırı',
    mainHashtag: '#çankırı',
    sentiment: { positive: 45, neutral: 35, negative: 20 },
    inclination: 'Pozitif',
    hashtags: ['#çankırı', '#iç anadolu', '#kızılırmak'],
    region: 'İç Anadolu',
    d: 'M420,180 L450,190 L440,220 L410,210 Z'
  },
  {
    id: 'corum',
    name: 'Çorum',
    mainHashtag: '#çorum',
    sentiment: { positive: 50, neutral: 30, negative: 20 },
    inclination: 'Pozitif',
    hashtags: ['#çorum', '#hitit', '#karadeniz'],
    region: 'Karadeniz',
    d: 'M460,180 L490,190 L480,220 L450,210 Z'
  },
  {
    id: 'denizli',
    name: 'Denizli',
    mainHashtag: '#denizli',
    sentiment: { positive: 55, neutral: 30, negative: 15 },
    inclination: 'Pozitif',
    hashtags: ['#denizli', '#pamukkale', '#ege'],
    region: 'Ege',
    d: 'M320,300 L350,310 L340,340 L310,330 Z'
  },
  {
    id: 'diyarbakir',
    name: 'Diyarbakır',
    mainHashtag: '#diyarbakır',
    sentiment: { positive: 40, neutral: 35, negative: 25 },
    inclination: 'Nötr',
    hashtags: ['#diyarbakır', '#güneydoğu', '#dicle'],
    region: 'Güneydoğu Anadolu',
    d: 'M580,320 L610,330 L600,360 L570,350 Z'
  },
  {
    id: 'duzce',
    name: 'Düzce',
    mainHashtag: '#düzce',
    sentiment: { positive: 50, neutral: 30, negative: 20 },
    inclination: 'Pozitif',
    hashtags: ['#düzce', '#karadeniz', '#bolu'],
    region: 'Karadeniz',
    d: 'M380,140 L410,150 L400,180 L370,170 Z'
  },
  {
    id: 'edirne',
    name: 'Edirne',
    mainHashtag: '#edirne',
    sentiment: { positive: 55, neutral: 30, negative: 15 },
    inclination: 'Pozitif',
    hashtags: ['#edirne', '#trakya', '#meriç'],
    region: 'Marmara',
    d: 'M200,140 L230,150 L220,180 L190,170 Z'
  },
  {
    id: 'elazig',
    name: 'Elazığ',
    mainHashtag: '#elazığ',
    sentiment: { positive: 45, neutral: 35, negative: 20 },
    inclination: 'Pozitif',
    hashtags: ['#elazığ', '#fırat', '#doğu'],
    region: 'Doğu Anadolu',
    d: 'M580,280 L610,290 L600,320 L570,310 Z'
  },
  {
    id: 'erzincan',
    name: 'Erzincan',
    mainHashtag: '#erzincan',
    sentiment: { positive: 45, neutral: 35, negative: 20 },
    inclination: 'Pozitif',
    hashtags: ['#erzincan', '#doğu', '#fırat'],
    region: 'Doğu Anadolu',
    d: 'M580,240 L610,250 L600,280 L570,270 Z'
  },
  {
    id: 'erzurum',
    name: 'Erzurum',
    mainHashtag: '#erzurum',
    sentiment: { positive: 50, neutral: 30, negative: 20 },
    inclination: 'Pozitif',
    hashtags: ['#erzurum', '#doğu', '#palandöken'],
    region: 'Doğu Anadolu',
    d: 'M620,200 L660,210 L650,250 L610,240 Z'
  },
  {
    id: 'eskisehir',
    name: 'Eskişehir',
    mainHashtag: '#eskişehir',
    sentiment: { positive: 60, neutral: 25, negative: 15 },
    inclination: 'Pozitif',
    hashtags: ['#eskişehir', '#porselen', '#iç anadolu'],
    region: 'İç Anadolu',
    d: 'M380,240 L410,250 L400,280 L370,270 Z'
  },
  {
    id: 'gaziantep',
    name: 'Gaziantep',
    mainHashtag: '#gaziantep',
    sentiment: { positive: 55, neutral: 30, negative: 15 },
    inclination: 'Pozitif',
    hashtags: ['#gaziantep', '#baklava', '#güneydoğu'],
    region: 'Güneydoğu Anadolu',
    d: 'M520,340 L550,350 L540,380 L510,370 Z'
  },
  {
    id: 'giresun',
    name: 'Giresun',
    mainHashtag: '#giresun',
    sentiment: { positive: 50, neutral: 30, negative: 20 },
    inclination: 'Pozitif',
    hashtags: ['#giresun', '#karadeniz', '#fındık'],
    region: 'Karadeniz',
    d: 'M520,120 L550,130 L540,160 L510,150 Z'
  },
  {
    id: 'gumushane',
    name: 'Gümüşhane',
    mainHashtag: '#gümüşhane',
    sentiment: { positive: 45, neutral: 35, negative: 20 },
    inclination: 'Pozitif',
    hashtags: ['#gümüşhane', '#karadeniz', '#doğu'],
    region: 'Karadeniz',
    d: 'M560,160 L590,170 L580,200 L550,190 Z'
  },
  {
    id: 'hakkari',
    name: 'Hakkari',
    mainHashtag: '#hakkari',
    sentiment: { positive: 35, neutral: 40, negative: 25 },
    inclination: 'Nötr',
    hashtags: ['#hakkari', '#doğu', '#cilo'],
    region: 'Doğu Anadolu',
    d: 'M680,320 L710,330 L700,360 L670,350 Z'
  },
  {
    id: 'hatay',
    name: 'Hatay',
    mainHashtag: '#hatay',
    sentiment: { positive: 50, neutral: 30, negative: 20 },
    inclination: 'Pozitif',
    hashtags: ['#hatay', '#antakya', '#asi'],
    region: 'Akdeniz',
    d: 'M520,380 L550,390 L540,420 L510,410 Z'
  },
  {
    id: 'igdir',
    name: 'Iğdır',
    mainHashtag: '#ığdır',
    sentiment: { positive: 40, neutral: 35, negative: 25 },
    inclination: 'Nötr',
    hashtags: ['#ığdır', '#doğu', '#ararat'],
    region: 'Doğu Anadolu',
    d: 'M680,200 L710,210 L700,240 L670,230 Z'
  },
  {
    id: 'isparta',
    name: 'Isparta',
    mainHashtag: '#isparta',
    sentiment: { positive: 55, neutral: 30, negative: 15 },
    inclination: 'Pozitif',
    hashtags: ['#isparta', '#gül', '#eğirdir'],
    region: 'Akdeniz',
    d: 'M350,300 L380,310 L370,340 L340,330 Z'
  },
  {
    id: 'istanbul',
    name: 'İstanbul',
    mainHashtag: '#istanbul',
    sentiment: { positive: 45, neutral: 35, negative: 20 },
    inclination: 'Pozitif',
    hashtags: ['#istanbul', '#boğaz', '#sultanahmet'],
    region: 'Marmara',
    d: 'M280,160 L320,170 L310,200 L270,190 Z'
  },
  {
    id: 'izmir',
    name: 'İzmir',
    mainHashtag: '#TemizHava',
    sentiment: { positive: 58, neutral: 30, negative: 12 },
    inclination: 'Olumlu',
    hashtags: ['#TemizHava', '#ÇevreKoruması', '#YeşilTeknoloji'],
    region: 'Ege',
    d: 'M240,280 L280,290 L270,320 L230,310 Z'
  },
  {
    id: 'kahramanmaras',
    name: 'Kahramanmaraş',
    mainHashtag: '#kahramanmaraş',
    sentiment: { positive: 50, neutral: 30, negative: 20 },
    inclination: 'Pozitif',
    hashtags: ['#kahramanmaraş', '#dondurma', '#akdeniz'],
    region: 'Akdeniz',
    d: 'M520,320 L550,330 L540,360 L510,350 Z'
  },
  {
    id: 'karabuk',
    name: 'Karabük',
    mainHashtag: '#karabük',
    sentiment: { positive: 50, neutral: 30, negative: 20 },
    inclination: 'Pozitif',
    hashtags: ['#karabük', '#safranbolu', '#karadeniz'],
    region: 'Karadeniz',
    d: 'M400,140 L430,150 L420,180 L390,170 Z'
  },
  {
    id: 'karaman',
    name: 'Karaman',
    mainHashtag: '#karaman',
    sentiment: { positive: 45, neutral: 35, negative: 20 },
    inclination: 'Pozitif',
    hashtags: ['#karaman', '#iç anadolu', '#ermenek'],
    region: 'İç Anadolu',
    d: 'M480,320 L510,330 L500,360 L470,350 Z'
  },
  {
    id: 'kars',
    name: 'Kars',
    mainHashtag: '#kars',
    sentiment: { positive: 40, neutral: 35, negative: 25 },
    inclination: 'Nötr',
    hashtags: ['#kars', '#ani', '#doğu'],
    region: 'Doğu Anadolu',
    d: 'M640,180 L680,190 L670,220 L630,210 Z'
  },
  {
    id: 'kastamonu',
    name: 'Kastamonu',
    mainHashtag: '#kastamonu',
    sentiment: { positive: 50, neutral: 30, negative: 20 },
    inclination: 'Pozitif',
    hashtags: ['#kastamonu', '#karadeniz', '#ilgaz'],
    region: 'Karadeniz',
    d: 'M420,140 L460,150 L450,190 L410,180 Z'
  },
  {
    id: 'kayseri',
    name: 'Kayseri',
    mainHashtag: '#kayseri',
    sentiment: { positive: 55, neutral: 30, negative: 15 },
    inclination: 'Pozitif',
    hashtags: ['#kayseri', '#erciyes', '#kapadokya'],
    region: 'İç Anadolu',
    d: 'M520,260 L550,270 L540,300 L510,290 Z'
  },
  {
    id: 'kilis',
    name: 'Kilis',
    mainHashtag: '#kilis',
    sentiment: { positive: 45, neutral: 35, negative: 20 },
    inclination: 'Pozitif',
    hashtags: ['#kilis', '#güneydoğu', '#suriye'],
    region: 'Güneydoğu Anadolu',
    d: 'M520,360 L540,370 L530,390 L510,380 Z'
  },
  {
    id: 'kirikkale',
    name: 'Kırıkkale',
    mainHashtag: '#kırıkkale',
    sentiment: { positive: 45, neutral: 35, negative: 20 },
    inclination: 'Pozitif',
    hashtags: ['#kırıkkale', '#iç anadolu', '#kızılırmak'],
    region: 'İç Anadolu',
    d: 'M460,220 L490,230 L480,260 L450,250 Z'
  },
  {
    id: 'kirklareli',
    name: 'Kırklareli',
    mainHashtag: '#kırklareli',
    sentiment: { positive: 50, neutral: 30, negative: 20 },
    inclination: 'Pozitif',
    hashtags: ['#kırklareli', '#trakya', '#marmara'],
    region: 'Marmara',
    d: 'M220,140 L250,150 L240,180 L210,170 Z'
  },
  {
    id: 'kirsehir',
    name: 'Kırşehir',
    mainHashtag: '#kırşehir',
    sentiment: { positive: 45, neutral: 35, negative: 20 },
    inclination: 'Pozitif',
    hashtags: ['#kırşehir', '#iç anadolu', '#kızılırmak'],
    region: 'İç Anadolu',
    d: 'M480,260 L510,270 L500,300 L470,290 Z'
  },
  {
    id: 'kocaeli',
    name: 'Kocaeli',
    mainHashtag: '#kocaeli',
    sentiment: { positive: 55, neutral: 30, negative: 15 },
    inclination: 'Pozitif',
    hashtags: ['#kocaeli', '#izmit', '#marmara'],
    region: 'Marmara',
    d: 'M340,160 L370,170 L360,200 L330,190 Z'
  },
  {
    id: 'konya',
    name: 'Konya',
    mainHashtag: '#konya',
    sentiment: { positive: 50, neutral: 30, negative: 20 },
    inclination: 'Pozitif',
    hashtags: ['#konya', '#mevlana', '#selçuklu'],
    region: 'İç Anadolu',
    d: 'M420,280 L480,290 L470,340 L410,330 Z'
  },
  {
    id: 'kutahya',
    name: 'Kütahya',
    mainHashtag: '#kütahya',
    sentiment: { positive: 50, neutral: 30, negative: 20 },
    inclination: 'Pozitif',
    hashtags: ['#kütahya', '#çini', '#ege'],
    region: 'Ege',
    d: 'M320,240 L360,250 L350,280 L310,270 Z'
  },
  {
    id: 'malatya',
    name: 'Malatya',
    mainHashtag: '#malatya',
    sentiment: { positive: 50, neutral: 30, negative: 20 },
    inclination: 'Pozitif',
    hashtags: ['#malatya', '#kayısı', '#fırat'],
    region: 'Doğu Anadolu',
    d: 'M560,280 L590,290 L580,320 L550,310 Z'
  },
  {
    id: 'manisa',
    name: 'Manisa',
    mainHashtag: '#manisa',
    sentiment: { positive: 55, neutral: 30, negative: 15 },
    inclination: 'Pozitif',
    hashtags: ['#manisa', '#gediz', '#ege'],
    region: 'Ege',
    d: 'M280,260 L320,270 L310,300 L270,290 Z'
  },
  {
    id: 'mardin',
    name: 'Mardin',
    mainHashtag: '#mardin',
    sentiment: { positive: 45, neutral: 35, negative: 20 },
    inclination: 'Pozitif',
    hashtags: ['#mardin', '#midyat', '#güneydoğu'],
    region: 'Güneydoğu Anadolu',
    d: 'M600,340 L630,350 L620,380 L590,370 Z'
  },
  {
    id: 'mersin',
    name: 'Mersin',
    mainHashtag: '#mersin',
    sentiment: { positive: 55, neutral: 30, negative: 15 },
    inclination: 'Pozitif',
    hashtags: ['#mersin', '#çukurova', '#akdeniz'],
    region: 'Akdeniz',
    d: 'M520,380 L560,390 L550,420 L510,410 Z'
  },
  {
    id: 'mugla',
    name: 'Muğla',
    mainHashtag: '#muğla',
    sentiment: { positive: 60, neutral: 25, negative: 15 },
    inclination: 'Pozitif',
    hashtags: ['#muğla', '#bodrum', '#marmaris'],
    region: 'Ege',
    d: 'M280,340 L330,350 L320,390 L270,380 Z'
  },
  {
    id: 'mus',
    name: 'Muş',
    mainHashtag: '#muş',
    sentiment: { positive: 40, neutral: 35, negative: 25 },
    inclination: 'Nötr',
    hashtags: ['#muş', '#doğu', '#murat'],
    region: 'Doğu Anadolu',
    d: 'M620,280 L650,290 L640,320 L610,310 Z'
  },
  {
    id: 'nevsehir',
    name: 'Nevşehir',
    mainHashtag: '#nevşehir',
    sentiment: { positive: 55, neutral: 30, negative: 15 },
    inclination: 'Pozitif',
    hashtags: ['#nevşehir', '#kapadokya', '#göreme'],
    region: 'İç Anadolu',
    d: 'M500,280 L530,290 L520,320 L490,310 Z'
  },
  {
    id: 'nigde',
    name: 'Niğde',
    mainHashtag: '#niğde',
    sentiment: { positive: 45, neutral: 35, negative: 20 },
    inclination: 'Pozitif',
    hashtags: ['#niğde', '#iç anadolu', '#aladağlar'],
    region: 'İç Anadolu',
    d: 'M500,300 L530,310 L520,340 L490,330 Z'
  },
  {
    id: 'ordu',
    name: 'Ordu',
    mainHashtag: '#ordu',
    sentiment: { positive: 50, neutral: 30, negative: 20 },
    inclination: 'Pozitif',
    hashtags: ['#ordu', '#karadeniz', '#fındık'],
    region: 'Karadeniz',
    d: 'M500,120 L540,130 L530,160 L490,150 Z'
  },
  {
    id: 'osmaniye',
    name: 'Osmaniye',
    mainHashtag: '#osmaniye',
    sentiment: { positive: 45, neutral: 35, negative: 20 },
    inclination: 'Pozitif',
    hashtags: ['#osmaniye', '#akdeniz', '#düziçi'],
    region: 'Akdeniz',
    d: 'M540,360 L570,370 L560,400 L530,390 Z'
  },
  {
    id: 'rize',
    name: 'Rize',
    mainHashtag: '#rize',
    sentiment: { positive: 55, neutral: 30, negative: 15 },
    inclination: 'Pozitif',
    hashtags: ['#rize', '#çay', '#karadeniz'],
    region: 'Karadeniz',
    d: 'M560,120 L590,130 L580,160 L550,150 Z'
  },
  {
    id: 'sakarya',
    name: 'Sakarya',
    mainHashtag: '#sakarya',
    sentiment: { positive: 55, neutral: 30, negative: 15 },
    inclination: 'Pozitif',
    hashtags: ['#sakarya', '#adapazarı', '#marmara'],
    region: 'Marmara',
    d: 'M360,160 L400,170 L390,200 L350,190 Z'
  },
  {
    id: 'samsun',
    name: 'Samsun',
    mainHashtag: '#samsun',
    sentiment: { positive: 55, neutral: 30, negative: 15 },
    inclination: 'Pozitif',
    hashtags: ['#samsun', '#karadeniz', '#ondokuz'],
    region: 'Karadeniz',
    d: 'M480,140 L520,150 L510,180 L470,170 Z'
  },
  {
    id: 'sanliurfa',
    name: 'Şanlıurfa',
    mainHashtag: '#şanlıurfa',
    sentiment: { positive: 45, neutral: 35, negative: 20 },
    inclination: 'Pozitif',
    hashtags: ['#şanlıurfa', '#abraham', '#güneydoğu'],
    region: 'Güneydoğu Anadolu',
    d: 'S560,340 L600,350 L590,390 L550,380 Z'
  },
  {
    id: 'siirt',
    name: 'Siirt',
    mainHashtag: '#siirt',
    sentiment: { positive: 40, neutral: 35, negative: 25 },
    inclination: 'Nötr',
    hashtags: ['#siirt', '#güneydoğu', '#dicle'],
    region: 'Güneydoğu Anadolu',
    d: 'M620,320 L650,330 L640,360 L610,350 Z'
  },
  {
    id: 'sinop',
    name: 'Sinop',
    mainHashtag: '#sinop',
    sentiment: { positive: 50, neutral: 30, negative: 20 },
    inclination: 'Pozitif',
    hashtags: ['#sinop', '#karadeniz', '#erfelek'],
    region: 'Karadeniz',
    d: 'M440,100 L480,110 L470,140 L430,130 Z'
  },
  {
    id: 'sirnak',
    name: 'Şırnak',
    mainHashtag: '#şırnak',
    sentiment: { positive: 35, neutral: 40, negative: 25 },
    inclination: 'Nötr',
    hashtags: ['#şırnak', '#güneydoğu', '#cizre'],
    region: 'Güneydoğu Anadolu',
    d: 'M640,340 L680,350 L670,390 L630,380 Z'
  },
  {
    id: 'sivas',
    name: 'Sivas',
    mainHashtag: '#sivas',
    sentiment: { positive: 50, neutral: 30, negative: 20 },
    inclination: 'Pozitif',
    hashtags: ['#sivas', '#kangal', '#iç anadolu'],
    region: 'İç Anadolu',
    d: 'M520,220 L570,230 L560,270 L510,260 Z'
  },
  {
    id: 'tekirdag',
    name: 'Tekirdağ',
    mainHashtag: '#tekirdağ',
    sentiment: { positive: 55, neutral: 30, negative: 15 },
    inclination: 'Pozitif',
    hashtags: ['#tekirdağ', '#marmara', '#çorlu'],
    region: 'Marmara',
    d: 'M240,160 L280,170 L270,200 L230,190 Z'
  },
  {
    id: 'tokat',
    name: 'Tokat',
    mainHashtag: '#tokat',
    sentiment: { positive: 50, neutral: 30, negative: 20 },
    inclination: 'Pozitif',
    hashtags: ['#tokat', '#niksar', '#karadeniz'],
    region: 'Karadeniz',
    d: 'M500,180 L540,190 L530,220 L490,210 Z'
  },
  {
    id: 'trabzon',
    name: 'Trabzon',
    mainHashtag: '#trabzon',
    sentiment: { positive: 55, neutral: 30, negative: 15 },
    inclination: 'Pozitif',
    hashtags: ['#trabzon', '#sumela', '#karadeniz'],
    region: 'Karadeniz',
    d: 'M580,120 L620,130 L610,160 L570,150 Z'
  },
  {
    id: 'tunceli',
    name: 'Tunceli',
    mainHashtag: '#tunceli',
    sentiment: { positive: 40, neutral: 35, negative: 25 },
    inclination: 'Nötr',
    hashtags: ['#tunceli', '#munzur', '#doğu'],
    region: 'Doğu Anadolu',
    d: 'M580,260 L610,270 L600,300 L570,290 Z'
  },
  {
    id: 'usak',
    name: 'Uşak',
    mainHashtag: '#uşak',
    sentiment: { positive: 50, neutral: 30, negative: 20 },
    inclination: 'Pozitif',
    hashtags: ['#uşak', '#ege', '#banaz'],
    region: 'Ege',
    d: 'M320,280 L350,290 L340,320 L310,310 Z'
  },
  {
    id: 'van',
    name: 'Van',
    mainHashtag: '#van',
    sentiment: { positive: 45, neutral: 35, negative: 20 },
    inclination: 'Pozitif',
    hashtags: ['#van', '#vangölü', '#doğu'],
    region: 'Doğu Anadolu',
    d: 'M660,300 L700,310 L690,350 L650,340 Z'
  },
  {
    id: 'yalova',
    name: 'Yalova',
    mainHashtag: '#yalova',
    sentiment: { positive: 55, neutral: 30, negative: 15 },
    inclination: 'Pozitif',
    hashtags: ['#yalova', '#termal', '#marmara'],
    region: 'Marmara',
    d: 'M320,170 L340,180 L330,200 L310,190 Z'
  },
  {
    id: 'yozgat',
    name: 'Yozgat',
    mainHashtag: '#yozgat',
    sentiment: { positive: 45, neutral: 35, negative: 20 },
    inclination: 'Pozitif',
    hashtags: ['#yozgat', '#iç anadolu', '#kızılırmak'],
    region: 'İç Anadolu',
    d: 'M480,240 L520,250 L510,280 L470,270 Z'
  },
  {
    id: 'zonguldak',
    name: 'Zonguldak',
    mainHashtag: '#zonguldak',
    sentiment: { positive: 50, neutral: 30, negative: 20 },
    inclination: 'Pozitif',
    hashtags: ['#zonguldak', '#kömür', '#karadeniz'],
    region: 'Karadeniz',
    d: 'M340,120 L380,130 L370,160 L330,150 Z'
  }
];