import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { PROVINCES_DATA } from '@/frontend_data/Provinces';
import { Province } from '@/types';
import { useProvinces } from '@/hooks/useBackendData';
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

  // Function to check if a province matches the filter criteria with strict matching
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
        // No hashtag match found - return none for strict hashtag filtering
        return { score: 0, type: 'none' };
      }
    }

    // Add points for sentiment match (already verified above if filter is active)
    if (activeFilters.sentiment.length > 0) {
      totalCriteria += 1;
      matchScore += 1;
    }

    // Add points for region match (already verified above if filter is active)
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

  const getProvinceFill = (provinceId: string) => {
    const province = displayProvinces.find(p => p.id === provinceId);
    if (!province) return 'hsl(var(--muted))';

    // Filter highlighting takes precedence
    if (activeFilters && (activeFilters.hashtags.length > 0 || activeFilters.sentiment.length > 0 || activeFilters.regions.length > 0)) {
      const matchResult = getFilterMatchIntensity(province);
      if (matchResult.type !== 'none') {
        // Color coding based on match type
        const alpha = 0.4 + (matchResult.score * 0.6); // 0.4 to 1.0 alpha
        switch (matchResult.type) {
          case 'high':
            return `hsl(var(--sentiment-positive) / ${alpha})`;
          case 'medium':
            return `hsl(var(--sentiment-neutral) / ${alpha})`;
          case 'low':
            return `hsl(var(--primary) / ${alpha})`;
          case 'exists':
            return `hsl(220 91% 58% / 0.6)`; // Blue for existing hashtags
          default:
            return 'hsl(var(--muted) / 0.3)';
        }
      }
      return 'hsl(var(--muted) / 0.2)'; // More faded for non-matching provinces
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
              const matchResult = getFilterMatchIntensity(province);
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
                      transform: isHovered ? 'translateY(-3px) scale(1.01)' : 'translateY(0) scale(1)',
                      animationDelay: hasActiveFilters ? `${(province.id.charCodeAt(0) % 10) * 0.2}s` : '0s',
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
              const province = displayProvinces.find(p => p.id === hoveredProvince);
              if (!province) return null;
              
              return (
                <>
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
                    Popüler: <span className="text-primary font-medium">{province.mainHashtag}</span>
                  </p>
                </>
              );
            })()}
          </div>
        </div>
      )}
      
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