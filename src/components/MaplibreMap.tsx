import React, { useEffect, useRef, useState, useCallback } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { cn } from '@/lib/utils';
import { PROVINCES_DATA } from '@/frontend_data/Provinces';
import { Province } from '@/types';
import { useProvinces } from '@/hooks/useBackendData';
import turkeyGeoJSON from '../../tr-cities-utf8.json';

interface MaplibreMapProps {
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

const getProvinceId = (name: string): string => {
  const nameMap: Record<string, string> = {
    'Adana': 'adana',
    'Adıyaman': 'adiyaman', 
    'Afyon': 'afyonkarahisar',
    'Ağrı': 'agri',
    'Aksaray': 'aksaray',
    'Amasya': 'amasya',
    'Ankara': 'ankara',
    'Antalya': 'antalya',
    'Artvin': 'artvin',
    'Aydın': 'aydin',
    'Balıkesir': 'balikesir',
    'Bilecik': 'bilecik',
    'Bingöl': 'bingol',
    'Bitlis': 'bitlis',
    'Bolu': 'bolu',
    'Burdur': 'burdur',
    'Bursa': 'bursa',
    'Çanakkale': 'canakkale',
    'Çankırı': 'cankiri',
    'Çorum': 'corum',
    'Denizli': 'denizli',
    'Diyarbakır': 'diyarbakir',
    'Edirne': 'edirne',
    'Elazığ': 'elazig',
    'Erzincan': 'erzincan',
    'Erzurum': 'erzurum',
    'Eskişehir': 'eskisehir',
    'Gaziantep': 'gaziantep',
    'Giresun': 'giresun',
    'Gümüşhane': 'gumushane',
    'Hakkari': 'hakkari',
    'Hatay': 'hatay',
    'Isparta': 'isparta',
    'Mersin': 'mersin',
    'İstanbul': 'istanbul',
    'İzmir': 'izmir',
    'Kars': 'kars',
    'Kastamonu': 'kastamonu',
    'Kayseri': 'kayseri',
    'Kırklareli': 'kirklareli',
    'Kırşehir': 'kirsehir',
    'Kocaeli': 'kocaeli',
    'Konya': 'konya',
    'Kütahya': 'kutahya',
    'Malatya': 'malatya',
    'Manisa': 'manisa',
    'Mardin': 'mardin',
    'Muğla': 'mugla',
    'Muş': 'mus',
    'Nevşehir': 'nevsehir',
    'Niğde': 'nigde',
    'Ordu': 'ordu',
    'Rize': 'rize',
    'Sakarya': 'sakarya',
    'Samsun': 'samsun',
    'Siirt': 'siirt',
    'Sinop': 'sinop',
    'Sivas': 'sivas',
    'Tekirdağ': 'tekirdag',
    'Tokat': 'tokat',
    'Trabzon': 'trabzon',
    'Tunceli': 'tunceli',
    'Şanlıurfa': 'sanliurfa',
    'Uşak': 'usak',
    'Van': 'van',
    'Yozgat': 'yozgat',
    'Zonguldak': 'zonguldak',
    'Bayburt': 'bayburt',
    'Karaman': 'karaman',
    'Kırıkkale': 'kirikkale',
    'Batman': 'batman',
    'Şırnak': 'sirnak',
    'Bartın': 'bartin',
    'Ardahan': 'ardahan',
    'Iğdır': 'igdir',
    'Yalova': 'yalova',
    'Karabük': 'karabuk',
    'Kilis': 'kilis',
    'Osmaniye': 'osmaniye',
    'Düzce': 'duzce'
  };
  return nameMap[name] || name.toLowerCase().replace(/ı/g, 'i').replace(/ş/g, 's').replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ /g, '');
};

// Add province IDs to the imported GeoJSON
const processedGeoJSON = {
  ...turkeyGeoJSON,
  features: (turkeyGeoJSON as any).features.map((feature: any) => ({
    ...feature,
    type: "Feature" as const,
    properties: {
      ...feature.properties,
      id: getProvinceId(feature.properties.name)
    }
  }))
} as GeoJSON.FeatureCollection;

export const MaplibreMap: React.FC<MaplibreMapProps> = ({
  onProvinceClick,
  selectedProvince,
  comparisonMode,
  selectedProvinces,
  activeFilters
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Use backend data if available, fallback to local data
  const { data: backendProvinces } = useProvinces();
  const displayProvinces = backendProvinces || PROVINCES_DATA;

  const handleProvinceClick = useCallback((province: Province) => {
    onProvinceClick(province);
  }, [onProvinceClick]);

  // Function to check if a province matches the filter criteria
  const getFilterMatchIntensity = (province: Province): { score: number; type: 'high' | 'medium' | 'low' | 'exists' | 'none' } => {
    if (!activeFilters || (activeFilters.hashtags.length === 0 && activeFilters.sentiment.length === 0 && activeFilters.regions.length === 0)) {
      return { score: 0, type: 'none' };
    }

    // Strict region filtering
    if (activeFilters.regions.length > 0 && !activeFilters.regions.includes(province.region)) {
      return { score: 0, type: 'none' };
    }

    // Strict sentiment filtering  
    if (activeFilters.sentiment.length > 0) {
      const dominantSentiment = 
        province.inclination === "Çok Olumlu" ? 'positive':
        province.inclination === "Olumlu" ? 'positive':
        province.inclination === "Nötr" ? 'neutral' : 
        province.inclination === "Olumsuz" ? 'negative' : 'negative'
      
      if (!activeFilters.sentiment.includes(dominantSentiment)) {
        return { score: 0, type: 'none' };
      }
    }

    let matchScore = 0;
    let totalCriteria = 0;
    let hasExistingHashtag = false;

    // Check hashtag matches
    if (activeFilters.hashtags.length > 0) {
      totalCriteria += 1;
      const topHashtagMatches = activeFilters.hashtags.filter(hashtag => 
        province.hashtags.includes(hashtag)
      ).length;
      
      const expandedHashtags = [
        ...province.hashtags,
        '#EkolojikDenge', '#TemizHava', '#GeriDönüşüm', '#ÇevreBilinci', 
        '#DoğaDostu', '#SürdürülebilirŞehir', '#KarbonAyakİzi', '#İklimDeğişikliği'
      ];
      
      const existsButNotTop = activeFilters.hashtags.some(hashtag => 
        expandedHashtags.includes(hashtag) && !province.hashtags.includes(hashtag)
      );
      
      if (topHashtagMatches > 0) {
        const hashtagScore = topHashtagMatches / activeFilters.hashtags.length;
        matchScore += hashtagScore;
      } else if (existsButNotTop) {
        hasExistingHashtag = true;
      } else {
        return { score: 0, type: 'none' };
      }
    }

    // Add points for sentiment and region matches
    if (activeFilters.sentiment.length > 0) {
      totalCriteria += 1;
      matchScore += 1;
    }

    if (activeFilters.regions.length > 0) {
      totalCriteria += 1;
      matchScore += 1;
    }

    const finalScore = totalCriteria > 0 ? matchScore / totalCriteria : 0;
    
    if (finalScore >= 0.8) return { score: finalScore, type: 'high' };
    if (finalScore >= 0.5) return { score: finalScore, type: 'medium' };
    if (finalScore > 0) return { score: finalScore, type: 'low' };
    if (hasExistingHashtag) return { score: 0.2, type: 'exists' };
    
    return { score: 0, type: 'none' };
  };

  const getProvinceColor = (provinceId: string): string => {
    const province = displayProvinces.find(p => p.id === provinceId);
    if (!province) return '#e5e7eb';

    // Filter highlighting takes precedence
    if (activeFilters && (activeFilters.hashtags.length > 0 || activeFilters.sentiment.length > 0 || activeFilters.regions.length > 0)) {
      const matchResult = getFilterMatchIntensity(province);
      if (matchResult.type !== 'none') {
        const opacity = 0.4 + (matchResult.score * 0.6);
        switch (matchResult.type) {
          case 'high': return `rgba(34, 197, 94, ${opacity})`; // Green
          case 'medium': return `rgba(59, 130, 246, ${opacity})`; // Blue  
          case 'low': return `rgba(168, 85, 247, ${opacity})`; // Purple
          case 'exists': return `rgba(59, 130, 246, 0.6)`; // Blue
          default: return 'rgba(156, 163, 175, 0.3)';
        }
      }
      return 'rgba(156, 163, 175, 0.2)';
    }

    if (selectedProvinces.includes(provinceId) || selectedProvince === provinceId) {
      return '#3b82f6'; // Blue
    }
    
    return '#e5e7eb'; // Default gray
  };

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          'osm': {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors'
          }
        },
        layers: [
          {
            id: 'osm',
            type: 'raster',
            source: 'osm'
          }
        ]
      },
      center: [35, 39], // Turkey center
      zoom: 5.5,
      minZoom: 4,
      maxZoom: 10
    });

    map.current.on('load', () => {
      // Add Turkey provinces source
      map.current!.addSource('turkey-provinces', {
        type: 'geojson',
        data: processedGeoJSON
      });

      // Add provinces fill layer
      map.current!.addLayer({
        id: 'provinces-fill',
        type: 'fill',
        source: 'turkey-provinces',
        paint: {
          'fill-color': '#e5e7eb',
          'fill-opacity': 0.7
        }
      });

      // Add provinces border layer
      map.current!.addLayer({
        id: 'provinces-border',
        type: 'line', 
        source: 'turkey-provinces',
        paint: {
          'line-color': '#374151',
          'line-width': 2
        }
      });

      // Add hover effect
      map.current!.on('mouseenter', 'provinces-fill', (e) => {
        map.current!.getCanvas().style.cursor = 'pointer';
        const feature = e.features?.[0];
        if (feature?.properties?.id) {
          setHoveredProvince(feature.properties.id);
          
          // Update hover styling
          map.current!.setPaintProperty('provinces-fill', 'fill-opacity', [
            'case',
            ['==', ['get', 'id'], feature.properties.id],
            0.9,
            0.7
          ]);
        }
      });

      map.current!.on('mouseleave', 'provinces-fill', () => {
        map.current!.getCanvas().style.cursor = '';
        setHoveredProvince(null);
        map.current!.setPaintProperty('provinces-fill', 'fill-opacity', 0.7);
      });

      map.current!.on('mousemove', (e) => {
        setMousePosition({ x: e.point.x, y: e.point.y });
      });

      // Add click handler
      map.current!.on('click', 'provinces-fill', (e) => {
        const feature = e.features?.[0];
        if (feature?.properties?.id) {
          const province = displayProvinces.find(p => p.id === feature.properties.id);
          if (province) {
            handleProvinceClick(province);
          }
        }
      });
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  // Update province colors when filters or selections change
  useEffect(() => {
    if (!map.current || !map.current.isStyleLoaded()) return;

    const colors = ['match', ['get', 'id']];
    
    processedGeoJSON.features.forEach(feature => {
      const provinceId = feature.properties.id;
      colors.push(provinceId, getProvinceColor(provinceId));
    });
    
    colors.push('#e5e7eb'); // fallback color

    map.current.setPaintProperty('provinces-fill', 'fill-color', colors);
  }, [activeFilters, selectedProvince, selectedProvinces, displayProvinces]);

  return (
    <div className="relative w-full h-full min-h-[500px]">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg shadow-lg" />
      
      {/* Tooltip */}
      {hoveredProvince && (
        <div
          className="absolute z-50 bg-popover border border-border rounded-lg p-3 shadow-xl min-w-[200px] pointer-events-none"
          style={{
            left: mousePosition.x,
            top: mousePosition.y - 120,
            transform: 'translateX(-50%)',
          }}
        >
          <div className="space-y-1">
            {(() => {
              const province = displayProvinces.find(p => p.id === hoveredProvince);
              if (!province) return null;
              
              return (
                <>
                  <h4 className="font-semibold text-foreground">{province.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Eğilim: <span className={cn(
                      "font-medium",
                      province.inclination === 'Çok Olumlu' ? 'text-green-600' :
                      province.inclination === 'Olumlu' ? 'text-green-500' :
                      province.inclination === 'Nötr' ? 'text-blue-500' :
                      'text-red-500'
                    )}>{province.inclination}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Popüler: <span className="text-blue-600 font-medium">{province.mainHashtag}</span>
                  </p>
                </>
              );
            })()}
          </div>
        </div>
      )}
      
      {comparisonMode && (
        <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm border border-border rounded-lg px-4 py-2">
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

export default MaplibreMap;