import { Province } from '@/types';
import { getSentimentColorWithAlpha } from '@/utils/sentimentUtils';

interface FilterMatchResult {
  score: number;
  type: 'high' | 'medium' | 'low' | 'none';
  isVisible: boolean;
}

export const getProvinceFillColor = (
  province: Province,
  matchResult: FilterMatchResult,
  hasActiveFilters: boolean,
  isSelected: boolean,
  isInComparison: boolean
): string => {
  // Selection states take precedence
  if (isInComparison || isSelected) {
    return 'hsl(var(--primary))';
  }

  // Filter highlighting
  if (hasActiveFilters) {
    if (!matchResult.isVisible) {
      return 'hsl(var(--muted))'; // Unmatched provinces stay normal
    }
    
    // Color based on backend score intensity
    const intensity = Math.max(0.4, Math.min(matchResult.score, 1.0)); // Min 0.4 alpha for visibility
    return getSentimentColorWithAlpha(province.inclination, intensity);
  }

  return 'hsl(var(--muted))';
};

export const getProvinceStyles = (isHovered: boolean, hasActiveFilters: boolean, provinceId: string) => ({
  transform: isHovered ? 'translateY(-3px) scale(1.01)' : 'translateY(0) scale(1)',
  animationDelay: hasActiveFilters ? `${(provinceId.charCodeAt(0) % 10) * 0.2}s` : '0s',
});