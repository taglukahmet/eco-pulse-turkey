import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { PROVINCES_DATA } from '@/frontend_data/Provinces';
import { Province } from '@/types';
import { useProvinces } from '@/hooks/useBackendData';
import { useMapFiltering } from '@/hooks/useMapFiltering';
import { MapTooltip } from '@/components/ui/MapTooltip';
import { getProvinceFillColor, getProvinceStyles } from '@/utils/mapUtils';
// TODO: Backend integration - Real-time updates via WebSocket can be added here

// TODO: Backend Integration - Replace with API call to fetch provinces data from backend
// Example: const response = await fetch('/api/provinces');
// This will allow real-time updates of province sentiment and topics

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
  // TODO: Backend integration - Real-time updates can be implemented with WebSocket
  const { data: backendProvinces, isLoading } = useProvinces();
  
  // Use backend data if available, fallback to local data
  const displayProvinces = backendProvinces || PROVINCES_DATA;
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);
  const [animationKey, setAnimationKey] = useState<number>(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleProvinceClick = useCallback((province: Province) => {
    onProvinceClick(province);
  }, [onProvinceClick]);

  // Reset animation when filters change
  React.useEffect(() => {
    if (activeFilters && (activeFilters.hashtags.length > 0 || activeFilters.sentiment.length > 0 || activeFilters.regions.length > 0)) {
      setAnimationKey(prev => prev + 1);
    }
  }, [activeFilters]);

  // Track mouse position for tooltip (only when hovering a province)
  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    if (hoveredProvince) {
      setMousePosition({ x: event.clientX, y: event.clientY });
    }
  }, [hoveredProvince]);

  // Use custom filtering hook
  const { getFilterMatch } = useMapFiltering(displayProvinces, activeFilters);

  const getProvinceFill = (provinceId: string) => {
    const province = displayProvinces.find(p => p.id === provinceId);
    if (!province) return 'hsl(var(--muted))';

    const matchResult = getFilterMatch(provinceId);
    const hasActiveFilters = activeFilters && (activeFilters.hashtags.length > 0 || activeFilters.sentiment.length > 0 || activeFilters.regions.length > 0);
    const isSelected = selectedProvince === provinceId;
    const isInComparison = selectedProvinces.includes(provinceId);

    return getProvinceFillColor(province, matchResult, !!hasActiveFilters, isSelected, isInComparison);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-[500px]" onMouseMove={handleMouseMove}>
      {/* Turkey Map Background */}
      <div className="relative w-full h-full flex items-center justify-center">
        <svg 
          id="svg-turkey-map" 
          xmlns="http://www.w3.org/2000/svg" 
          version="1.1" 
          viewBox="0 0 800 350" 
          className="w-full h-auto max-w-6xl max-h-[700px]"
        >
          <g>
            {displayProvinces.map((province) => {
              const isSelected = selectedProvince === province.id || selectedProvinces.includes(province.id);
              const isHovered = hoveredProvince === province.id;
              const hasActiveFilters = activeFilters && (activeFilters.hashtags.length > 0 || activeFilters.sentiment.length > 0 || activeFilters.regions.length > 0);
            
              return(
                <g key={province.id}>
                  <path 
                    className={cn(
                      "cursor-pointer transition-all duration-300 stroke-border stroke-[1.5] hover:stroke-[2]",
                      {
                        "drop-shadow-lg brightness-110": isHovered,
                      }
                    )}
                    style={{
                      fill: getProvinceFill(province.id),
                      ...getProvinceStyles(isHovered, !!hasActiveFilters, province.id)
                    }}
                    key={`${province.id}-${animationKey}`}
                    onMouseEnter={() => setHoveredProvince(province.id)}
                    onMouseLeave={() => setHoveredProvince(null)}
                    onClick={() => handleProvinceClick(province)}
                    id={province.id} 
                    data-name={province.name} 
                    data-sentiment={province.sentiment}
                    data-inclination={province.inclination}
                    data-hashtags={province.hashtags}
                    data-region={province.region}
                    d={province.d}  
                  />
                </g>
              )})}
          </g>
        </svg>
      </div>
      
      {/* Tooltip */}
      {hoveredProvince && (() => {
        const province = displayProvinces.find(p => p.id === hoveredProvince);
        return province ? (
          <MapTooltip 
            province={province} 
            position={mousePosition}
          />
        ) : null;
      })()}
      
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