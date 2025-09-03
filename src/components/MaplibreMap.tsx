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
  const [selectedFeatures, setSelectedFeatures] = useState<any[]>([]);
  
  // Use backend data if available, fallback to local data
  const { data: backendProvinces, isLoading } = useProvinces();
  const displayProvinces = backendProvinces || PROVINCES_DATA;

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
    
    if (comparisonMode) {
      // In comparison mode, handle multi-selection with separate layer
      const isAlreadySelected = selectedProvinces.includes(province.id);
      
      if (isAlreadySelected) {
        // Remove from selected features - call parent first to update selectedProvinces
        onProvinceClick(province);
      } else if (selectedProvinces.length < 3) {
        // Add to selection - call parent first to update selectedProvinces  
        onProvinceClick(province);
        
        // Find the feature in the original GeoJSON and add to selected features
        const originalFeatures = (turkeyGeoJSON as any).features;
        const feature = originalFeatures.find((f: any) => {
          const featureName = f.properties?.name;
          return featureName === province.name || 
                 featureName?.toLowerCase() === province.name.toLowerCase() ||
                 findProvinceByGeoJSONName(featureName)?.id === province.id;
        });
        
        if (feature) {
          console.log('Adding feature to selected layer for:', province.name);
          const selectedFeature = {
            ...feature,
            properties: {
              ...feature.properties,
              provinceId: province.id
            }
          };
          setSelectedFeatures(prev => {
            const updated = [...prev, selectedFeature];
            console.log('Updated selected features:', updated.length);
            return updated;
          });
        } else {
          console.warn('Feature not found in GeoJSON for province:', province.name);
        }
      }
      // If already at 3 provinces and trying to select new one, ignore
    } else {
      // Normal single selection mode
      onProvinceClick(province);
    }
  }, [onProvinceClick, comparisonMode, selectedProvinces, findProvinceByGeoJSONName]);

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

    // Comparison mode - show selected provinces
    if (comparisonMode && selectedProvinces.includes(provinceId)) {
      return '#dc2626'; // red for selected in comparison mode
    }
    
    // Normal single selection mode
    if (!comparisonMode && selectedProvince === provinceId) {
      return '#6366f1'; // indigo for single selection
    }
    
    return '#e5e7eb'; // gray for unselected
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

      // Add source for selected provinces in comparison mode
      map.current.addSource('selected-provinces', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
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

      // Add selected provinces layer (comparison mode)
      map.current.addLayer({
        id: 'selected-provinces-fill',
        type: 'fill',
        source: 'selected-provinces',
        paint: {
          'fill-color': '#dc2626',
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

      // Add selected provinces border layer
      map.current.addLayer({
        id: 'selected-provinces-border',
        type: 'line',
        source: 'selected-provinces',
        paint: {
          'line-color': '#991b1b',
          'line-width': 2
        }
      });

      // Update colors based on current state
      updateMapColors();
    });

    // Click handler for main layer
    const handleLayerClick = (e: any) => {
      if (!e.features || e.features.length === 0) return;
      
      const feature = e.features[0];
      const provinceName = feature.properties?.name;
      
      if (provinceName) {
        console.log('Layer clicked, province name:', provinceName);
        // Use robust province finding
        const province = findProvinceByGeoJSONName(provinceName);
        if (province) {
          console.log('Found province:', province.name, 'Backend ID:', province.id);
          handleProvinceClick(province);
        } else {
          console.warn('Province not found in backend data:', provinceName);
        }
      }
    };

    map.current.on('click', 'turkey-cities-fill', handleLayerClick);
    map.current.on('click', 'selected-provinces-fill', handleLayerClick);

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
  }, [displayProvinces, selectedProvince, selectedProvinces, activeFilters, comparisonMode]);

  // Update selected provinces layer when selectedFeatures changes
  useEffect(() => {
    if (map.current && map.current.getSource('selected-provinces')) {
      const source = map.current.getSource('selected-provinces') as maplibregl.GeoJSONSource;
      source.setData({
        type: 'FeatureCollection',
        features: selectedFeatures
      });
    }
  }, [selectedFeatures]);

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