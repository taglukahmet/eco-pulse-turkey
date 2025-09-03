import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { cn } from '@/lib/utils';
import { PROVINCES_DATA } from '@/frontend_data/Provinces';
import { Province } from '@/types';
import { useProvinces } from '@/hooks/useBackendData';
import turkeyGeoJSON from '@/frontend_data/tr-cities-utf8.json';

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

  const handleProvinceClick = useCallback((province: Province) => {
    onProvinceClick(province);
  }, [onProvinceClick]);

  // Function to check if a province matches the filter criteria
  const getFilterMatchIntensity = (province: Province): { score: number; type: 'high' | 'medium' | 'low' | 'exists' | 'none' } => {
    if (!activeFilters || (activeFilters.hashtags.length === 0 && activeFilters.sentiment.length === 0 && activeFilters.regions.length === 0)) {
      return { score: 0, type: 'none' };
    }

    // Strict region filtering - if region filter is active, province MUST match
    if (activeFilters.regions.length > 0 && !activeFilters.regions.includes(province.region)) {
      return { score: 0, type: 'none' };
    }

    // Strict sentiment filtering - if sentiment filter is active, province MUST match
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

    // Check hashtag matches (only if hashtag filter is active)
    if (activeFilters.hashtags.length > 0) {
      totalCriteria += 1;
      const topHashtagMatches = activeFilters.hashtags.filter(hashtag => 
        province.hashtags.includes(hashtag)
      ).length;
      
      // Check if hashtag exists in expanded list (not just top 5)
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

    // Add points for sentiment match
    if (activeFilters.sentiment.length > 0) {
      totalCriteria += 1;
      matchScore += 1;
    }

    // Add points for region match
    if (activeFilters.regions.length > 0) {
      totalCriteria += 1;
      matchScore += 1;
    }

    const finalScore = totalCriteria > 0 ? matchScore / totalCriteria : 0;
    
    // Return type based on match quality
    if (finalScore >= 0.8) return { score: finalScore, type: 'high' };
    if (finalScore >= 0.5) return { score: finalScore, type: 'medium' };
    if (finalScore > 0) return { score: finalScore, type: 'low' };
    if (hasExistingHashtag) return { score: 0.2, type: 'exists' };
    
    return { score: 0, type: 'none' };
  };

  const getProvinceFillColor = (provinceId: string) => {
    const province = displayProvinces.find(p => p.id === provinceId);
    if (!province) return '#e5e7eb';

    // Filter highlighting takes precedence
    if (activeFilters && (activeFilters.hashtags.length > 0 || activeFilters.sentiment.length > 0 || activeFilters.regions.length > 0)) {
      const matchResult = getFilterMatchIntensity(province);
      if (matchResult.type !== 'none') {
        const alpha = 0.4 + (matchResult.score * 0.6);
        switch (matchResult.type) {
          case 'high':
            return `rgba(34, 197, 94, ${alpha})`; // green
          case 'medium':
            return `rgba(59, 130, 246, ${alpha})`; // blue
          case 'low':
            return `rgba(99, 102, 241, ${alpha})`; // indigo
          case 'exists':
            return 'rgba(59, 130, 246, 0.6)'; // blue
          default:
            return 'rgba(229, 231, 235, 0.3)';
        }
      }
      return 'rgba(229, 231, 235, 0.2)';
    }

    if (selectedProvinces.includes(provinceId)) {
      return '#6366f1'; // indigo
    }
    if (selectedProvince === provinceId) {
      return '#6366f1'; // indigo
    }
    return '#e5e7eb'; // gray
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

    // Hover handlers
    map.current.on('mouseenter', 'turkey-cities-fill', (e) => {
      if (!map.current || !e.features || e.features.length === 0) return;
      
      const feature = e.features[0];
      const provinceName = feature.properties?.name;
      
      if (provinceName) {
        setHoveredProvince(provinceName);
        map.current.getCanvas().style.cursor = 'pointer';
        
        if (feature.id) {
          map.current.setFeatureState(
            { source: 'turkey-cities', id: feature.id },
            { hovered: true }
          );
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
  }, [displayProvinces, selectedProvince, selectedProvinces, activeFilters, comparisonMode]);

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
                      province.inclination === 'Çok Olumlu' ? 'text-green-600' :
                      province.inclination === 'Olumlu' ? 'text-green-600' :
                      province.inclination === 'Nötr' ? 'text-blue-600' :
                      'text-red-600'
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