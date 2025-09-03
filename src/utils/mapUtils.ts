import { Province } from '@/types';
import { getSentimentColorWithAlpha } from '@/utils/sentimentUtils';

interface FilterMatchResult {
  score: number;
  type: 'high' | 'medium' | 'low' | 'exists' | 'none';
}

export const getProvinceFillColor = (
  province: Province,
  matchResult: FilterMatchResult,
  hasActiveFilters: boolean,
  isSelected: boolean,
  isInComparison: boolean
): string => {
  // Filter highlighting takes precedence
  if (hasActiveFilters && matchResult.type !== 'none') {
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

  // Don't color non-matching provinces when filters are active
  if (hasActiveFilters && matchResult.type === 'none') {
    return 'hsl(var(--muted))';
  }

  // Selection states
  if (isInComparison || isSelected) {
    return 'hsl(var(--primary))';
  }

  return 'hsl(var(--muted))';
};

export const getProvinceStyles = (isHovered: boolean, hasActiveFilters: boolean, provinceId: string) => ({
  transform: isHovered ? 'translateY(-3px) scale(1.01)' : 'translateY(0) scale(1)',
  animationDelay: hasActiveFilters ? `${(provinceId.charCodeAt(0) % 10) * 0.2}s` : '0s',
});