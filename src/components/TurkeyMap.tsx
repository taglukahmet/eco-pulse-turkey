import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface Province {
  id: string;
  name: string;
  path: string;
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
}

interface TurkeyMapProps {
  onProvinceClick: (province: Province) => void;
  selectedProvince?: string | null;
  comparisonMode: boolean;
  selectedProvinces: string[];
  activeFilters?: {
    hashtags: string[];
    sentiment: string[];
    regions: string[];
  };
}

// Enhanced province data with comprehensive hashtag lists
const PROVINCES_DATA: Province[] = [
  {
    id: 'istanbul',
    name: 'İstanbul',
    path: '', // Not needed anymore
    coordinates: { x: 28.8, y: 40.2 }, // Longitude, Latitude converted to percentage
    mainTopic: '#SıfırAtık',
    sentiment: { positive: 65, neutral: 25, negative: 10 },
    inclination: 'Çok Olumlu',
    hashtags: ['#SıfırAtık', '#ÇevreKoruması', '#YeşilŞehir', '#GeriDönüşüm', '#SürdürülebilirŞehir'],
    region: 'Marmara Bölgesi'
  },
  {
    id: 'ankara',
    name: 'Ankara',
    path: '',
    coordinates: { x: 39.5, y: 41.5 },
    mainTopic: '#YeşilŞehir',
    sentiment: { positive: 72, neutral: 20, negative: 8 },
    inclination: 'Çok Olumlu',
    hashtags: ['#YeşilŞehir', '#TemizEnerji', '#İklimDeğişikliği', '#ÇevreBilinci', '#DoğaDostu'],
    region: 'İç Anadolu Bölgesi'
  },
  {
    id: 'izmir',
    name: 'İzmir',
    path: '',
    coordinates: { x: 16.5, y: 50.8 },
    mainTopic: '#TemizHava',
    sentiment: { positive: 58, neutral: 30, negative: 12 },
    inclination: 'Olumlu',
    hashtags: ['#TemizHava', '#ÇevreKoruması', '#YeşilTeknoloji', '#EkolojikDenge', '#KarbonAyakİzi'],
    region: 'Ege Bölgesi'
  },
  {
    id: 'antalya',
    name: 'Antalya',
    path: '',
    coordinates: { x: 38.2, y: 72.5 },
    mainTopic: '#SürdürülebilirTurizm',
    sentiment: { positive: 68, neutral: 22, negative: 10 },
    inclination: 'Çok Olumlu',
    hashtags: ['#SürdürülebilirTurizm', '#DoğaDostu', '#TemizEnerji', '#ÇevreBilinci', '#YeşilŞehir'],
    region: 'Akdeniz Bölgesi'
  },
  {
    id: 'bursa',
    name: 'Bursa',
    path: '',
    coordinates: { x: 32.8, y: 45.2 },
    mainTopic: '#YeşilSanayi',
    sentiment: { positive: 70, neutral: 20, negative: 10 },
    inclination: 'Çok Olumlu',
    hashtags: ['#YeşilSanayi', '#SürdürülebilirŞehir', '#YeşilTeknoloji', '#TemizEnerji', '#GeriDönüşüm'],
    region: 'Marmara Bölgesi'
  },
  {
    id: 'adana',
    name: 'Adana',
    path: '',
    coordinates: { x: 48.5, y: 68.2 },
    mainTopic: '#TarımselSürdürülebilirlik',
    sentiment: { positive: 60, neutral: 28, negative: 12 },
    inclination: 'Olumlu',
    hashtags: ['#TarımselSürdürülebilirlik', '#ÇevreKoruması', '#DoğaDostu', '#EkolojikDenge', '#TemizEnerji'],
    region: 'Akdeniz Bölgesi'
  },
  {
    id: 'gaziantep',
    name: 'Gaziantep',
    path: '',
    coordinates: { x: 52.8, y: 65.5 },
    mainTopic: '#EnerjiVerimliliği',
    sentiment: { positive: 55, neutral: 32, negative: 13 },
    inclination: 'Nötr',
    hashtags: ['#EnerjiVerimliliği', '#YeşilTeknoloji', '#ÇevreBilinci', '#SürdürülebilirŞehir', '#KarbonAyakİzi'],
    region: 'Güneydoğu Anadolu Bölgesi'
  },
  {
    id: 'konya',
    name: 'Konya',
    path: '',
    coordinates: { x: 44.2, y: 58.8 },
    mainTopic: '#SularınKorunması',
    sentiment: { positive: 63, neutral: 25, negative: 12 },
    inclination: 'Olumlu',
    hashtags: ['#SularınKorunması', '#ÇevreKoruması', '#DoğaDostu', '#EkolojikDenge', '#İklimDeğişikliği'],
    region: 'İç Anadolu Bölgesi'
  },
  {
    id: 'trabzon',
    name: 'Trabzon',
    path: '',
    coordinates: { x: 52.5, y: 30.2 },
    mainTopic: '#KaradenizEkolojisi',
    sentiment: { positive: 58, neutral: 30, negative: 12 },
    inclination: 'Olumlu',
    hashtags: ['#KaradenizEkolojisi', '#ÇevreKoruması', '#EkolojikDenge', '#DoğaDostu', '#TemizHava'],
    region: 'Karadeniz Bölgesi'
  },
  {
    id: 'van',
    name: 'Van',
    path: '',
    coordinates: { x: 68.2, y: 52.8 },
    mainTopic: '#GölEkosistemleri',
    sentiment: { positive: 52, neutral: 35, negative: 13 },
    inclination: 'Nötr',
    hashtags: ['#GölEkosistemleri', '#ÇevreKoruması', '#SularınKorunması', '#EkolojikDenge', '#DoğaDostu'],
    region: 'Doğu Anadolu Bölgesi'
  }
];

export const TurkeyMap: React.FC<TurkeyMapProps> = ({
  onProvinceClick,
  selectedProvince,
  comparisonMode,
  selectedProvinces,
  activeFilters
}) => {
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);

  const handleProvinceClick = useCallback((province: Province) => {
    onProvinceClick(province);
  }, [onProvinceClick]);

  // Function to check if a province matches the filter criteria
  const getFilterMatchIntensity = (province: Province): number => {
    if (!activeFilters || (activeFilters.hashtags.length === 0 && activeFilters.sentiment.length === 0 && activeFilters.regions.length === 0)) {
      return 0;
    }

    let matchScore = 0;
    let totalCriteria = 0;

    // Check hashtag matches - count exact matches in province's hashtag list
    if (activeFilters.hashtags.length > 0) {
      totalCriteria += 1;
      const hashtagMatches = activeFilters.hashtags.filter(hashtag => 
        province.hashtags.includes(hashtag)
      ).length;
      // Score based on percentage of searched hashtags found in province
      const hashtagScore = hashtagMatches / activeFilters.hashtags.length;
      matchScore += hashtagScore;
    }

    // Check sentiment matches
    if (activeFilters.sentiment.length > 0) {
      totalCriteria += 1;
      const dominantSentiment = province.sentiment.positive > province.sentiment.negative ? 
        (province.sentiment.positive > province.sentiment.neutral ? 'positive' : 'neutral') :
        (province.sentiment.negative > province.sentiment.neutral ? 'negative' : 'neutral');
      
      if (activeFilters.sentiment.includes(dominantSentiment)) {
        matchScore += 1;
      }
    }

    // Check region matches
    if (activeFilters.regions.length > 0) {
      totalCriteria += 1;
      if (activeFilters.regions.includes(province.region)) {
        matchScore += 1;
      }
    }

    return totalCriteria > 0 ? matchScore / totalCriteria : 0;
  };

  const getProvinceFill = (provinceId: string) => {
    const province = PROVINCES_DATA.find(p => p.id === provinceId);
    if (!province) return 'hsl(var(--muted))';

    // Filter highlighting takes precedence
    if (activeFilters && (activeFilters.hashtags.length > 0 || activeFilters.sentiment.length > 0)) {
      const intensity = getFilterMatchIntensity(province);
      if (intensity > 0) {
        // Color coding based on match intensity
        const alpha = 0.3 + (intensity * 0.7); // 0.3 to 1.0 alpha
        if (intensity >= 0.8) {
          return `hsl(var(--sentiment-positive) / ${alpha})`;
        } else if (intensity >= 0.5) {
          return `hsl(var(--sentiment-neutral) / ${alpha})`;
        } else {
          return `hsl(var(--primary) / ${alpha})`;
        }
      }
      return 'hsl(var(--muted) / 0.3)'; // Faded for non-matching provinces
    }

    if (selectedProvinces.includes(provinceId)) {
      return 'hsl(var(--primary))';
    }
    if (selectedProvince === provinceId) {
      return 'hsl(var(--primary))';
    }
    return 'hsl(var(--muted))';
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Turkey Map Background */}
      <div className="relative w-full h-full max-w-6xl">
        <img 
          src="/lovable-uploads/53f0d7e9-bcad-40c0-8f17-6df68993047e.png" 
          alt="Turkey Map"
          className="w-full h-full object-contain"
          style={{ filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.3))' }}
        />
        
        {/* City Pinpoints */}
        {PROVINCES_DATA.map((province) => {
          const isSelected = selectedProvince === province.id || selectedProvinces.includes(province.id);
          const isHovered = hoveredProvince === province.id;
          const filterIntensity = getFilterMatchIntensity(province);
          const hasActiveFilters = activeFilters && (activeFilters.hashtags.length > 0 || activeFilters.sentiment.length > 0);
          
          return (
            <div key={province.id}>
              {/* City Pin */}
              <div
                className={cn(
                  "absolute w-4 h-4 rounded-full cursor-pointer transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2",
                  "border-2 border-white shadow-lg hover:scale-125",
                  {
                    "bg-primary scale-110": isSelected,
                    "bg-primary/70": !isSelected && selectedProvinces.includes(province.id),
                    "bg-muted-foreground": !isSelected && !selectedProvinces.includes(province.id) && !hasActiveFilters,
                    "animate-pulse": isSelected,
                    // Filter-based styling
                    "bg-sentiment-positive scale-110 animate-pulse": hasActiveFilters && filterIntensity >= 0.8,
                    "bg-sentiment-neutral scale-105": hasActiveFilters && filterIntensity >= 0.5 && filterIntensity < 0.8,
                    "bg-primary/60": hasActiveFilters && filterIntensity > 0 && filterIntensity < 0.5,
                    "bg-muted-foreground/30": hasActiveFilters && filterIntensity === 0
                  }
                )}
                style={{
                  left: `${province.coordinates.x}%`,
                  top: `${province.coordinates.y}%`,
                  backgroundColor: !hasActiveFilters ? getProvinceFill(province.id) : undefined
                }}
                onMouseEnter={() => setHoveredProvince(province.id)}
                onMouseLeave={() => setHoveredProvince(null)}
                onClick={() => handleProvinceClick(province)}
              />
              
              {/* Hover Tooltip */}
              {isHovered && (
                <div
                  className="absolute z-50 bg-popover border border-border rounded-lg p-3 shadow-xl pointer-events-none min-w-[200px]"
                  style={{
                    left: `${province.coordinates.x}%`,
                    top: `${Math.max(0, province.coordinates.y - 15)}%`,
                    transform: 'translateX(-50%)'
                  }}
                >
                  <div className="space-y-1">
                    <h4 className="font-semibold text-foreground">{province.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Eğilim: <span className={cn(
                        "font-medium",
                        province.inclination === 'Çok Olumlu' ? 'text-sentiment-positive' :
                        province.inclination === 'Olumlu' ? 'text-sentiment-positive' :
                        province.inclination === 'Nötr' ? 'text-sentiment-neutral' :
                        'text-sentiment-negative'
                      )}>{province.inclination}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Popüler: <span className="text-primary font-medium">{province.mainTopic}</span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {comparisonMode && (
        <div className="absolute top-4 left-4 glass-panel rounded-lg px-4 py-2">
          <p className="text-sm font-medium text-primary">
            Comparison Mode: Select up to 3 cities
          </p>
          <p className="text-xs text-muted-foreground">
            {selectedProvinces.length}/3 selected
          </p>
        </div>
      )}
    </div>
  );
};

export default TurkeyMap;