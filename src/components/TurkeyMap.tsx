import React from 'react';
import MaplibreMap from './MaplibreMap';
import { Province } from '@/types';
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
  provinces?: Province[];
  isLoading?: boolean;
}

export const TurkeyMap: React.FC<TurkeyMapProps> = (props) => {
  return <MaplibreMap {...props} />;
};

export default TurkeyMap;