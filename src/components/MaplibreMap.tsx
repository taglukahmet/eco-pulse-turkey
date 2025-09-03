import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { cn } from '@/lib/utils';
import { PROVINCES_DATA } from '@/frontend_data/Provinces';
import { Province } from '@/types';
import { useProvinces } from '@/hooks/useBackendData';
import { useMapFiltering } from '@/hooks/useMapFiltering';
import { getSentimentColorWithAlpha, getSentimentType } from '@/utils/sentimentUtils';
import turkeyGeoJSON from '@/frontend_data/tr-cities-utf8.json';

const SENTIMENT_COLORS = {
  positive: 'text-[hsl(var(--sentiment-positive))]',
  neutral: 'text-[hsl(var(--sentiment-neutral))]',
  negative: 'text-[hsl(var(--sentiment-negative))]'
};

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

export const TurkeyMap: React.FC<TurkeyMapProps> = ({
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
  const { data: backendProvinces, isLoading } = useProvinces();
  const displayProvinces = backendProvinces || PROVINCES_DATA;
  
  // Use the new filtering system
  const { getFilterMatch, isLoadingHashtagData } = useMapFiltering(displayProvinces, activeFilters);

  // Create a robust mapping between GeoJSON province names and backend province IDs
  const createProvinceNameMapping = useCallback(() => {
    const nameToIdMap = new Map<string, string>();
    
    displayProvinces.forEach(province => {
      // Add direct name mapping
      nameToIdMap.set(province.name, province.id);
      nameToIdMap.set(province.name.toLowerCase(), province.id);
      
      // Add normalized versions (remove Turkish characters)
      const normalized = province.name
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ı/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/Ğ/g, 'G')
        .replace(/Ü/g, 'U')
        .replace(/Ş/g, 'S')
        .replace(/İ/g, 'I')
        .replace(/Ö/g, 'O')
        .replace(/Ç/g, 'C');
      
      nameToIdMap.set(normalized, province.id);
      nameToIdMap.set(normalized.toLowerCase(), province.id);
      
      // Handle specific problematic names
      if (province.name === 'Gümüşhane') {
        nameToIdMap.set('Gumushane', province.id);
        nameToIdMap.set('gumushane', province.id);
      }
      if (province.name === 'Afyonkarahisar') {
        nameToIdMap.set('Afyon', province.id);
        nameToIdMap.set('afyon', province.id);
      }
    });
    
    return nameToIdMap;
  }, [displayProvinces]);

  // Function to find province by GeoJSON name
  const findProvinceByGeoJSONName = useCallback((geoJSONName: string): Province | null => {
    const nameMapping = createProvinceNameMapping();
    
    // Try exact match first
    let provinceId = nameMapping.get(geoJSONName);
    if (provinceId) {
      return displayProvinces.find(p => p.id === provinceId) || null;
    }
    
    // Try lowercase match
    provinceId = nameMapping.get(geoJSONName.toLowerCase());
    if (provinceId) {
      return displayProvinces.find(p => p.id === provinceId) || null;
    }
    
    // Try partial matches for complex names
    for (const [mappedName, id] of nameMapping.entries()) {
      if (mappedName.includes(geoJSONName.toLowerCase()) || geoJSONName.toLowerCase().includes(mappedName)) {
        return displayProvinces.find(p => p.id === id) || null;
      }
    }
    
    return null;
  }, [displayProvinces, createProvinceNameMapping]);

  const handleProvinceClick = useCallback((province: Province) => {
    console.log('Clicking province:', province.name, 'Backend ID:', province.id);
    onProvinceClick(province);
  }, [onProvinceClick]);


  const getProvinceFillColor = (provinceId: string) => {
    const province = displayProvinces.find(p => p.id === provinceId);
    if (!province) return 'hsl(220, 15%, 20%)'; // --muted

    // Selection states take precedence
    if (selectedProvinces.includes(provinceId) || selectedProvince === provinceId) {
      return 'hsl(195, 85%, 35%)'; // --primary
    }

    // Filter highlighting
    if (activeFilters && (activeFilters.hashtags.length > 0 || activeFilters.sentiment.length > 0 || activeFilters.regions.length > 0)) {
      // Don't apply filter colors if hashtag data is still loading
      if (isLoadingHashtagData) {
        return 'hsl(220, 15%, 20%)'; // Default muted color while loading
      }
      
      const matchResult = getFilterMatch(provinceId);
      
      // Debug logging for color application
      if (matchResult.score > 0) {
        console.log(`Applying color to ${province.name}: score=${matchResult.score}, visible=${matchResult.isVisible}, sentiment=${province.inclination}`);
      }
      
      if (matchResult.isVisible && matchResult.score > 0) {
        // Use sentiment-based colors with score-based alpha
        const alpha = Math.max(0.4, Math.min(matchResult.score, 1.0)); // Min 0.4 alpha for visibility
        const sentimentType = getSentimentType(province.inclination);
        
        // Convert sentiment to actual HSL values MapLibre can parse
        switch (sentimentType) {
          case 'positive':
            return `hsla(142, 70%, 50%, ${alpha})`;
          case 'neutral':
            return `hsla(45, 85%, 55%, ${alpha})`;
          case 'negative':
            return `hsla(0, 75%, 55%, ${alpha})`;
          default:
            return `hsla(220, 15%, 20%, ${alpha})`;
        }
      }
      
      // Hide non-matching provinces when filters are active
      return 'hsla(220, 15%, 20%, 0.3)'; // --muted with alpha
    }

    // Default state - use muted color
    return 'hsl(220, 15%, 20%)'; // --muted
  };

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://demotiles.maplibre.org/style.json', // OpenStreetMap style
      center: [35.2433, 38.9637], // Turkey center
      zoom: 6.2, // Better zoom for Turkey
      maxBounds: [
        [25.0, 35.0], // Southwest coordinates
        [45.0, 43.0]  // Northeast coordinates
      ]
    });

    // Add GeoJSON source and layer when map loads
    map.current.on('load', () => {
      if (!map.current) return;

      // Add Turkey cities source
      map.current.addSource('turkey-cities', {
        type: 'geojson',
        data: turkeyGeoJSON as any
      });

      // Add fill layer
      map.current.addLayer({
        id: 'turkey-cities-fill',
        type: 'fill',
        source: 'turkey-cities',
        paint: {
          'fill-color': [
            'case',
            ['boolean', ['feature-state', 'selected'], false],
            '#6366f1',
            ['boolean', ['feature-state', 'hovered'], false],
            '#8b5cf6',
            '#e5e7eb'
          ],
          'fill-opacity': 0.8
        }
      });

      // Add border layer
      map.current.addLayer({
        id: 'turkey-cities-border',
        type: 'line',
        source: 'turkey-cities',
        paint: {
          'line-color': '#374151',
          'line-width': 1
        }
      });

      // Update colors based on current state
      updateMapColors();
    });

    // Click handler
    map.current.on('click', 'turkey-cities-fill', (e) => {
      if (!e.features || e.features.length === 0) return;
      
      const feature = e.features[0];
      const provinceName = feature.properties?.name;
      
      if (provinceName) {
        // Find province by matching name from GeoJSON to province data
        const province = displayProvinces.find(p => 
          p.name === provinceName || 
          p.name.toLowerCase() === provinceName.toLowerCase() ||
          // Handle potential name variations in the GeoJSON
          provinceName.toLowerCase().includes(p.name.toLowerCase()) ||
          p.name.toLowerCase().includes(provinceName.toLowerCase())
        );
        if (province) {
          console.log('Clicking province:', province.name, 'Backend ID:', province.id);
          handleProvinceClick(province);
        } else {
          console.warn('Province not found in backend data:', provinceName);
        }
      }
    });

    // Hover handlers with improved province detection
    map.current.on('mouseenter', 'turkey-cities-fill', (e) => {
      if (!map.current || !e.features || e.features.length === 0) return;
      
      const feature = e.features[0];
      const geoJsonProvinceName = feature.properties?.name;
      
      if (geoJsonProvinceName) {
        // Use the robust province mapping to find the correct province
        const province = findProvinceByGeoJSONName(geoJsonProvinceName);
        
        if (province) {
          setHoveredProvince(province.name);
          map.current.getCanvas().style.cursor = 'pointer';
          
          if (feature.id) {
            map.current.setFeatureState(
              { source: 'turkey-cities', id: feature.id },
              { hovered: true }
            );
          }
        }
      }
    });

    map.current.on('mouseleave', 'turkey-cities-fill', () => {
      if (!map.current) return;
      
      setHoveredProvince(null);
      map.current.getCanvas().style.cursor = '';
      
      // Remove hover state from all features
      map.current.querySourceFeatures('turkey-cities').forEach(feature => {
        if (feature.id) {
          map.current!.setFeatureState(
            { source: 'turkey-cities', id: feature.id },
            { hovered: false }
          );
        }
      });
    });

    // Add mousemove handler to detect province changes while hovering
    map.current.on('mousemove', 'turkey-cities-fill', (e) => {
      if (!map.current || !e.features || e.features.length === 0) return;
      
      const feature = e.features[0];
      const geoJsonProvinceName = feature.properties?.name;
      
      if (geoJsonProvinceName) {
        const province = findProvinceByGeoJSONName(geoJsonProvinceName);
        
        if (province && hoveredProvince !== province.name) {
          // Clear previous hover state
          map.current.querySourceFeatures('turkey-cities').forEach(f => {
            if (f.id) {
              map.current!.setFeatureState(
                { source: 'turkey-cities', id: f.id },
                { hovered: false }
              );
            }
          });
          
          // Set new hover state
          setHoveredProvince(province.name);
          if (feature.id) {
            map.current.setFeatureState(
              { source: 'turkey-cities', id: feature.id },
              { hovered: true }
            );
          }
        }
      }
    });

    // Track mouse position for tooltip
    map.current.on('mousemove', (e) => {
      setMousePosition({ x: e.point.x, y: e.point.y });
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  // Function to update map colors
  const updateMapColors = useCallback(() => {
    if (!map.current || !map.current.getSource('turkey-cities')) return;

    // Update fill colors based on current state
    const fillExpression: any[] = ['case'];
    
    displayProvinces.forEach(province => {
      const color = getProvinceFillColor(province.id);
      fillExpression.push(['==', ['get', 'name'], province.name], color);
    });
    
    fillExpression.push('#e5e7eb'); // default color

    map.current.setPaintProperty('turkey-cities-fill', 'fill-color', fillExpression);
    
    // Update selected states for comparison mode
    if (map.current.getSource('turkey-cities')) {
      map.current.querySourceFeatures('turkey-cities').forEach(feature => {
        if (feature.id && feature.properties?.name) {
          const province = displayProvinces.find(p => p.name === feature.properties.name);
          if (province) {
            const isSelected = selectedProvinces.includes(province.id) || (selectedProvince === province.id && !comparisonMode);
            map.current!.setFeatureState(
              { source: 'turkey-cities', id: feature.id },
              { selected: isSelected }
            );
          }
        }
      });
    }
  }, [displayProvinces, selectedProvince, selectedProvinces, activeFilters, comparisonMode, getFilterMatch, isLoadingHashtagData]);

  // Update map colors when dependencies change
  useEffect(() => {
    updateMapColors();
  }, [updateMapColors]);

  // Track mouse position for tooltip
  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    if (hoveredProvince) {
      setMousePosition({ x: event.clientX, y: event.clientY });
    }
  }, [hoveredProvince]);

  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-[500px]" onMouseMove={handleMouseMove}>
      <div 
        ref={mapContainer} 
        className="w-full h-full min-h-[500px] rounded-lg border border-border"
        style={{ minHeight: '500px' }}
      />
      
      {/* Tooltip */}
      {hoveredProvince && (
        <div
          className="fixed z-50 bg-popover border border-border rounded-lg p-3 shadow-xl min-w-[200px] pointer-events-none"
          style={{
            left: mousePosition.x,
            top: mousePosition.y - 120,
            transform: 'translateX(-50%)',
          }}
        >
          <div className="space-y-1">
            {(() => {
              const province = displayProvinces.find(p => p.name === hoveredProvince);
              if (!province) return null;
              
              return (
                <>
                  <h4 className="font-semibold text-foreground">{province.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Eğilim: <span className={cn(
                      "font-medium",
                      province.inclination === 'Çok Olumlu' ?  SENTIMENT_COLORS.positive:
                      province.inclination === 'Olumlu' ? SENTIMENT_COLORS.positive :
                      province.inclination === 'Nötr' ? SENTIMENT_COLORS.neutral :
                      SENTIMENT_COLORS.negative
                    )}>{province.inclination}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Popüler: <span className="text-primary font-medium">{province.mainHashtag}</span>
                  </p>
                </>
              );
            })()}
          </div>
        </div>
      )}
      
      {comparisonMode && (
        <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg px-4 py-2 border">
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