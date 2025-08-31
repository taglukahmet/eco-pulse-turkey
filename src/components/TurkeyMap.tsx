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

  // Track mouse position for tooltip
  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  }, []);

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
    <div className="relative w-full h-full flex items-center justify-center min-h-[400px]" onMouseMove={handleMouseMove}>
      {/* Turkey Map Background */}
      <div className="relative w-full h-full flex items-center justify-center">
        <svg 
          id="svg-turkey-map" 
          xmlns="http://www.w3.org/2000/svg" 
          version="1.1" 
          viewBox="0 0 800 350" 
          className="w-full h-auto max-w-5xl max-h-[600px]"
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
                      "cursor-pointer transition-all duration-500 stroke-border stroke-[1]",
                      {
                        "drop-shadow-lg scale-[1.02] brightness-110": isHovered,
                        "animate-[pulse_3s_ease-in-out_infinite]": hasActiveFilters && (
                          matchResult.type === 'high' || 
                          matchResult.type === 'medium' || 
                          matchResult.type === 'low' || 
                          matchResult.type === 'exists'
                        ),
                      }
                    )}
                    style={{
                      fill: getProvinceFill(province.id),
                      transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                      animationDelay: hasActiveFilters ? `${Math.random() * 0.5}s` : '0s',
                    }}
                    key={`${province.id}-${animationKey}`}
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
        </svg>
      </div>
      
      {/* Tooltip */}
      {hoveredProvince && (
        <div
          className="fixed z-50 bg-popover border border-border rounded-lg p-3 shadow-xl min-w-[200px] pointer-events-none"
          style={{
            left: mousePosition.x,
            top: mousePosition.y - 80, // 80px above cursor
            transform: 'translateX(-50%)',
          }}
        >
          <div className="space-y-10">
            {(() => {
              const province = PROVINCES_DATA.find(p => p.id === hoveredProvince);
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
                    Popüler: <span className="text-primary font-medium">{province.mainTopic}</span>
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