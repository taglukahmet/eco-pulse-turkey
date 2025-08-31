import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { PROVINCES_DATA } from '@/frontend_data/Provinces';

interface Province {
  id: string;
  name: string;
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
  d: string;
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
  const getFilterMatchIntensity = (province: Province): { score: number; type: 'high' | 'medium' | 'low' | 'exists' | 'none' } => {
    if (!activeFilters || (activeFilters.hashtags.length === 0 && activeFilters.sentiment.length === 0 && activeFilters.regions.length === 0)) {
      return { score: 0, type: 'none' };
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
      }
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

    const finalScore = totalCriteria > 0 ? matchScore / totalCriteria : 0;
    
    // Return type based on match quality
    if (finalScore >= 0.8) return { score: finalScore, type: 'high' };
    if (finalScore >= 0.5) return { score: finalScore, type: 'medium' };
    if (finalScore > 0) return { score: finalScore, type: 'low' };
    if (hasExistingHashtag) return { score: 0.2, type: 'exists' };
    
    return { score: 0, type: 'none' };
  };

  const getProvinceFill = (provinceId: string) => {
    const province = PROVINCES_DATA.find(p => p.id === provinceId);
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
    <div className="relative w-full h-full flex items-center justify-center min-h-[400px]">
      {/* Turkey Map Background */}
      <div className="relative w-full h-full flex items-center justify-center">
        <svg 
          id="svg-turkey-map" 
          xmlns="http://www.w3.org/2000/svg" 
          version="1.1" 
          viewBox="0 0 800 350" 
          className="w-full h-auto max-w-4xl max-h-[500px]"
        >
          <g>
            {PROVINCES_DATA.map((province) => {
              const isSelected = selectedProvince === province.id || selectedProvinces.includes(province.id);
              const isHovered = hoveredProvince === province.id;
              const matchResult = getFilterMatchIntensity(province);
              const hasActiveFilters = activeFilters && (activeFilters.hashtags.length > 0 || activeFilters.sentiment.length > 0 || activeFilters.regions.length > 0);
            
              return(
                <g key={province.id}>
                  <path 
                    className={cn(
                      "cursor-pointer transition-all duration-300 stroke-border stroke-[0.5]",
                      {
                        "drop-shadow-sm": isHovered,
                        "animate-pulse": hasActiveFilters && (
                          matchResult.type === 'high' || 
                          matchResult.type === 'medium' || 
                          matchResult.type === 'low' || 
                          matchResult.type === 'exists'
                        ),
                      }
                    )}
                    style={{
                      fill: getProvinceFill(province.id),
                      transform: isHovered ? 'translateY(-1px)' : 'translateY(0)',
                    }}
                    onMouseEnter={() => setHoveredProvince(province.id)}
                    onMouseLeave={() => setHoveredProvince(null)}
                    onClick={() => handleProvinceClick(province)}
                    id={province.id} 
                    data-name={province.name} 
                    data-coordinates={province.coordinates}
                    data-sentiment={province.sentiment}
                    data-inclination={province.inclination}
                    data-hashtags={province.hashtags}
                    data-region={province.region}
                    d={province.d}  
                  />
                </g>
              )})}
          </g>
          
          {/* Tooltip */}
          {hoveredProvince && (
            <foreignObject x="0" y="0" width="100%" height="100%" className="pointer-events-none">
              <div className="relative w-full h-full">
                {(() => {
                  const province = PROVINCES_DATA.find(p => p.id === hoveredProvince);
                  if (!province) return null;
                  
                  return (
                    <div
                      className="absolute z-50 bg-popover border border-border rounded-lg p-3 shadow-xl min-w-[200px]"
                      style={{
                        left: `${province.coordinates.x}%`,
                        top: `${province.coordinates.y}%`,
                        transform: 'translate(-50%, -100%)',
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
                  );
                })()}
              </div>
            </foreignObject>
          )}
        </svg>
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