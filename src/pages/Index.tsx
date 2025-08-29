import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import TurkeyMap from '@/components/TurkeyMap';
import CityDetailPanel from '@/components/CityDetailPanel';
import NationalAgendaPanel from '@/components/NationalAgendaPanel';
import ComparisonView from '@/components/ComparisonView';

interface Province {
  id: string;
  name: string;
  path: string;
  mainTopic: string;
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

interface CityData {
  id: string;
  name: string;
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
  topics: Array<{ text: string; value: number }>;
  hashtags: string[];
  weeklyTrend: Array<{ day: string; volume: number }>;
}

// Mock data generator for cities
const generateCityData = (province: Province): CityData => ({
  id: province.id,
  name: province.name,
  sentiment: province.sentiment,
  topics: [
    { text: province.mainTopic, value: 85 },
    { text: '#ÇevreKoruması', value: 72 },
    { text: '#YeşilTeknoloji', value: 65 },
    { text: '#SürdürülebilirKalkınma', value: 58 },
    { text: '#İklimDeğişikliği', value: 45 },
    { text: '#GeriDönüşüm', value: 38 },
    { text: '#YenilenebilirEnerji', value: 32 }
  ],
  hashtags: [
    province.mainTopic,
    '#ÇevreKoruması',
    '#YeşilŞehir',
    '#TemizEnerji',
    '#SürdürülebilirŞehir'
  ],
  weeklyTrend: [
    { day: 'Pzt', volume: Math.floor(Math.random() * 1000) + 500 },
    { day: 'Sal', volume: Math.floor(Math.random() * 1000) + 600 },
    { day: 'Çar', volume: Math.floor(Math.random() * 1000) + 750 },
    { day: 'Per', volume: Math.floor(Math.random() * 1000) + 800 },
    { day: 'Cum', volume: Math.floor(Math.random() * 1000) + 900 },
    { day: 'Cmt', volume: Math.floor(Math.random() * 1000) + 650 },
    { day: 'Paz', volume: Math.floor(Math.random() * 1000) + 550 }
  ]
});

const Index = () => {
  const navigate = useNavigate();
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedCityData, setSelectedCityData] = useState<CityData | null>(null);
  const [showNationalPanel, setShowNationalPanel] = useState(false);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [selectedCitiesForComparison, setSelectedCitiesForComparison] = useState<CityData[]>([]);
  const [showComparisonView, setShowComparisonView] = useState(false);

  const handleProvinceClick = useCallback((province: Province) => {
    if (comparisonMode) {
      const cityData = generateCityData(province);
      
      if (selectedCitiesForComparison.find(city => city.id === province.id)) {
        // Remove from comparison if already selected
        setSelectedCitiesForComparison(prev => 
          prev.filter(city => city.id !== province.id)
        );
      } else if (selectedCitiesForComparison.length < 3) {
        // Add to comparison if not at limit
        setSelectedCitiesForComparison(prev => [...prev, cityData]);
      }
    } else {
      // Normal mode - show city detail panel
      const cityData = generateCityData(province);
      setSelectedProvince(province.id);
      setSelectedCityData(cityData);
    }
  }, [comparisonMode, selectedCitiesForComparison]);

  const handleCloseDetailPanel = useCallback(() => {
    setSelectedProvince(null);
    setSelectedCityData(null);
  }, []);

  const handleNationalAgendaClick = useCallback(() => {
    setShowNationalPanel(!showNationalPanel);
    // Close other panels
    setSelectedProvince(null);
    setSelectedCityData(null);
  }, [showNationalPanel]);

  const handleAboutClick = useCallback(() => {
    navigate('/about');
  }, [navigate]);

  const handleComparisonToggle = useCallback(() => {
    setComparisonMode(!comparisonMode);
    if (!comparisonMode) {
      // Entering comparison mode
      setSelectedCitiesForComparison([]);
      setSelectedProvince(null);
      setSelectedCityData(null);
      setShowNationalPanel(false);
    } else {
      // Exiting comparison mode
      if (selectedCitiesForComparison.length >= 2) {
        setShowComparisonView(true);
      }
      setSelectedCitiesForComparison([]);
    }
  }, [comparisonMode, selectedCitiesForComparison]);

  const handleCloseComparison = useCallback(() => {
    setShowComparisonView(false);
    setComparisonMode(false);
    setSelectedCitiesForComparison([]);
  }, []);

  return (
    <div className="min-h-screen dashboard-gradient relative overflow-hidden">
      {/* Header */}
      <Header
        onNationalAgendaClick={handleNationalAgendaClick}
        onAboutClick={handleAboutClick}
        comparisonMode={comparisonMode}
        onComparisonToggle={handleComparisonToggle}
        showNationalPanel={showNationalPanel}
      />

      {/* Main Content */}
      <main className="pt-16 h-screen">
        <div className="h-full relative">
          {/* Turkey Map */}
          <div className="h-full p-8">
            <TurkeyMap
              onProvinceClick={handleProvinceClick}
              selectedProvince={selectedProvince}
              comparisonMode={comparisonMode}
              selectedProvinces={selectedCitiesForComparison.map(city => city.id)}
            />
          </div>

          {/* Comparison Mode Instructions */}
          {comparisonMode && !showComparisonView && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 glass-panel rounded-lg px-6 py-4 panel-shadow">
              <p className="text-center text-primary font-medium">
                Karşılaştırmak için haritadan 2-3 şehir seçin
              </p>
              {selectedCitiesForComparison.length >= 2 && (
                <div className="mt-3 text-center">
                  <button
                    onClick={() => setShowComparisonView(true)}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    Karşılaştırmayı Görüntüle
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Panels */}
      {selectedCityData && !comparisonMode && (
        <CityDetailPanel
          cityData={selectedCityData}
          onClose={handleCloseDetailPanel}
          isVisible={!!selectedCityData}
        />
      )}

      <NationalAgendaPanel
        isVisible={showNationalPanel}
        onClose={() => setShowNationalPanel(false)}
      />

      <ComparisonView
        selectedCities={selectedCitiesForComparison}
        onClose={handleCloseComparison}
        isVisible={showComparisonView}
      />
    </div>
  );
};

export default Index;
