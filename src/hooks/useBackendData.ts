import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { provinceService } from '@/services/provinceService';
import { socialMediaService } from '@/services/socialMediaService';
import { nationalAgendaService } from '@/services/nationalAgendaService';
import { FilterCriteria } from '@/types';

// TODO: Custom hooks for backend data fetching

// Hook for fetching all provinces
export const useProvinces = () => {
  const query = useQuery({
    queryKey: ['provinces'],
    queryFn: provinceService.getAllProvinces,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false, // Don't retry failed requests
  });
  
  React.useEffect(() => {
    if (query.error) {
      console.log('Backend provinces fetch failed:', query.error);
    }
    if (query.data) {
      console.log('Backend provinces fetched successfully:', query.data);
    }
  }, [query.error, query.data]);
  
  return query;
};

// Hook for fetching specific province data
export const useProvinceData = (provinceId: string | null) => {
  // Only make backend call if provinceId looks like a UUID (contains hyphens)
  const isBackendId = provinceId && provinceId.includes('-');
  
  return useQuery({
    queryKey: ['provinceData', provinceId],
    queryFn: () => provinceService.getProvinceData(provinceId!),
    enabled: !!provinceId && isBackendId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Hook for filtering provinces
export const useFilterProvinces = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (criteria: FilterCriteria) => provinceService.getFilteredProvinces(criteria),
    onSuccess: (data) => {
      queryClient.setQueryData(['filteredProvinces'], data);
    },
  });
};

// Hook for comparative data
export const useComparativeData = (provinceIds: string[]) => {
  // Only make backend call if provinceIds look like UUIDs (contain hyphens)
  const backendIds = provinceIds.filter(id => id.includes('-'));
  
  return useQuery({
    queryKey: ['comparativeData', backendIds],
    queryFn: () => provinceService.getComparativeData(backendIds),
    enabled: backendIds.length > 0,
    staleTime: 3 * 60 * 1000, // 3 minutes
  });
};

// Hook for social media data
export const useSocialMediaData = (cityID: string | null) => {
  return useQuery({
    queryKey: ['socialMediaData', cityID],
    queryFn: () => socialMediaService.getCitySocialMediaData(cityID!),
    enabled: !!cityID,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

// Hook for national agenda data
export const useNationalData = () => {
  return useQuery({
    queryKey: ['nationalData'],
    queryFn: nationalAgendaService.getNationalData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useWeeklyTrends = () => {
  return useQuery({
    queryKey: ['nationalTrends'],
    queryFn: nationalAgendaService.getWeeklyTrends,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useRegionalPerformance = () => {
  return useQuery({
    queryKey: ['regionalPerformance'],
    queryFn: nationalAgendaService.getRegionalPerformance,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook for national platform comparison
export const useNationalPlatformComparison = () => {
  return useQuery({
    queryKey: ['nationalPlatformComparison'],
    queryFn: nationalAgendaService.getNationalPlatformComparison,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};