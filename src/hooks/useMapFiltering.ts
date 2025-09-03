import { useMemo } from 'react';
import { Province } from '@/types';
import { getSentimentType } from '@/utils/sentimentUtils';
import { EXPANDED_HASHTAGS } from '@/utils/constants';

interface FilterCriteria {
  hashtags: string[];
  sentiment: string[];
  regions: string[];
}

interface FilterMatchResult {
  score: number;
  type: 'high' | 'medium' | 'low' | 'exists' | 'none';
}

export const useMapFiltering = (provinces: Province[], activeFilters?: FilterCriteria) => {
  const filterMatchResults = useMemo(() => {
    if (!activeFilters || (activeFilters.hashtags.length === 0 && activeFilters.sentiment.length === 0 && activeFilters.regions.length === 0)) {
      return new Map<string, FilterMatchResult>();
    }

    const results = new Map<string, FilterMatchResult>();

    provinces.forEach(province => {
      const matchResult = getFilterMatchIntensity(province, activeFilters);
      results.set(province.id, matchResult);
    });

    return results;
  }, [provinces, activeFilters]);

  const getFilterMatchIntensity = (province: Province, filters: FilterCriteria): FilterMatchResult => {
    // Strict region filtering - if region filter is active, province MUST match
    if (filters.regions.length > 0 && !filters.regions.includes(province.region)) {
      return { score: 0, type: 'none' };
    }

    // Strict sentiment filtering - if sentiment filter is active, province MUST match
    if (filters.sentiment.length > 0) {
      const dominantSentiment = getSentimentType(province.inclination);
      if (!filters.sentiment.includes(dominantSentiment)) {
        return { score: 0, type: 'none' };
      }
    }

    // Strict hashtag filtering - if hashtag filter is active, province MUST match
    if (filters.hashtags.length > 0) {
      const topHashtagMatches = filters.hashtags.filter(hashtag => 
        province.hashtags.includes(hashtag)
      ).length;
      
      // Check if hashtag exists in expanded list (not just top 5)
      const expandedHashtags = [...province.hashtags, ...EXPANDED_HASHTAGS];
      const existsButNotTop = filters.hashtags.some(hashtag => 
        expandedHashtags.includes(hashtag) && !province.hashtags.includes(hashtag)
      );
      
      if (topHashtagMatches === 0 && !existsButNotTop) {
        return { score: 0, type: 'none' };
      }
      
      // Calculate match quality for provinces that passed all filters
      if (topHashtagMatches > 0) {
        const hashtagScore = topHashtagMatches / filters.hashtags.length;
        if (hashtagScore >= 0.8) return { score: hashtagScore, type: 'high' };
        if (hashtagScore >= 0.5) return { score: hashtagScore, type: 'medium' };
        return { score: hashtagScore, type: 'low' };
      } else if (existsButNotTop) {
        return { score: 0.2, type: 'exists' };
      }
    }

    // If we reach here, province matches all active filters
    return { score: 1.0, type: 'high' };
  };

  return {
    filterMatchResults,
    getFilterMatch: (provinceId: string) => filterMatchResults.get(provinceId) || { score: 0, type: 'none' as const }
  };
};