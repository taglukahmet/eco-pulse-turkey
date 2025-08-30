import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Hash, Heart, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FilterCriteria {
  hashtags: string[];
  sentiment: string[];
  regions: string[];
}

interface FilterInterfaceProps {
  isVisible: boolean;
  onClose: () => void;
  onFilterApply: (criteria: FilterCriteria) => void;
}

const PREDEFINED_HASHTAGS = [
  '#ÇevreKoruması', '#YeşilŞehir', '#TemizEnerji', '#SürdürülebilirŞehir',
  '#SıfırAtık', '#İklimDeğişikliği', '#GeriDönüşüm', '#DoğaDostu',
  '#YeşilTeknoloji', '#KarbonAyakİzi', '#ÇevreBilinci', '#EkolojikDenge'
];

const SENTIMENT_OPTIONS = [
  { value: 'positive', label: 'Pozitif', icon: '😊' },
  { value: 'neutral', label: 'Nötr', icon: '😐' },
  { value: 'negative', label: 'Negatif', icon: '😞' }
];

const REGION_OPTIONS = [
  'Marmara Bölgesi', 'Ege Bölgesi', 'İç Anadolu Bölgesi', 
  'Akdeniz Bölgesi', 'Karadeniz Bölgesi', 'Doğu Anadolu Bölgesi', 
  'Güneydoğu Anadolu Bölgesi'
];

const FilterInterface: React.FC<FilterInterfaceProps> = ({
  isVisible,
  onClose,
  onFilterApply
}) => {
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([]);
  const [selectedSentiments, setSelectedSentiments] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [customHashtag, setCustomHashtag] = useState('');

  const handleHashtagAdd = (hashtag: string) => {
    if (selectedHashtags.length < 3 && !selectedHashtags.includes(hashtag)) {
      setSelectedHashtags([...selectedHashtags, hashtag]);
    }
  };

  const handleHashtagRemove = (hashtag: string) => {
    setSelectedHashtags(selectedHashtags.filter(h => h !== hashtag));
  };

  const handleCustomHashtagAdd = () => {
    if (customHashtag.trim() && selectedHashtags.length < 3) {
      const formattedHashtag = customHashtag.startsWith('#') ? customHashtag : `#${customHashtag}`;
      if (!selectedHashtags.includes(formattedHashtag)) {
        setSelectedHashtags([...selectedHashtags, formattedHashtag]);
        setCustomHashtag('');
      }
    }
  };

  const handleSentimentToggle = (sentiment: string) => {
    if (selectedSentiments.includes(sentiment)) {
      setSelectedSentiments(selectedSentiments.filter(s => s !== sentiment));
    } else {
      setSelectedSentiments([...selectedSentiments, sentiment]);
    }
  };

  const handleRegionToggle = (region: string) => {
    if (selectedRegions.includes(region)) {
      setSelectedRegions(selectedRegions.filter(r => r !== region));
    } else {
      setSelectedRegions([...selectedRegions, region]);
    }
  };

  const handleApply = () => {
    onFilterApply({
      hashtags: selectedHashtags,
      sentiment: selectedSentiments,
      regions: selectedRegions
    });
  };

  const handleClear = () => {
    setSelectedHashtags([]);
    setSelectedSentiments([]);
    setSelectedRegions([]);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center">
      <div className="glass-panel rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto panel-shadow">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Hash className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Gelişmiş Filtreleme</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Hashtag Section */}
        <div className="mb-6">
          <Label className="text-base font-medium mb-3 block flex items-center gap-2">
            <Hash className="w-4 h-4" />
            Hashtag Filtreleri (Maksimum 3)
          </Label>
          
          {/* Custom Hashtag Input */}
          <div className="flex gap-2 mb-3">
            <Input
              placeholder="Özel hashtag ekle..."
              value={customHashtag}
              onChange={(e) => setCustomHashtag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCustomHashtagAdd()}
              disabled={selectedHashtags.length >= 3}
            />
            <Button 
              onClick={handleCustomHashtagAdd}
              disabled={!customHashtag.trim() || selectedHashtags.length >= 3}
            >
              Ekle
            </Button>
          </div>

          {/* Selected Hashtags */}
          {selectedHashtags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {selectedHashtags.map((hashtag) => (
                <Badge key={hashtag} variant="secondary" className="flex items-center gap-1">
                  {hashtag}
                  <X 
                    className="w-3 h-3 cursor-pointer hover:text-destructive" 
                    onClick={() => handleHashtagRemove(hashtag)}
                  />
                </Badge>
              ))}
            </div>
          )}

          {/* Predefined Hashtags */}
          <div className="grid grid-cols-2 gap-2">
            {PREDEFINED_HASHTAGS.map((hashtag) => (
              <Button
                key={hashtag}
                variant={selectedHashtags.includes(hashtag) ? "default" : "outline"}
                size="sm"
                onClick={() => selectedHashtags.includes(hashtag) ? handleHashtagRemove(hashtag) : handleHashtagAdd(hashtag)}
                disabled={!selectedHashtags.includes(hashtag) && selectedHashtags.length >= 3}
                className="justify-start"
              >
                {hashtag}
              </Button>
            ))}
          </div>
        </div>

        {/* Sentiment Section */}
        <div className="mb-6">
          <Label className="text-base font-medium mb-3 block flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Duygu Analizi Filtreleri
          </Label>
          <div className="grid grid-cols-3 gap-2">
            {SENTIMENT_OPTIONS.map((option) => (
              <Button
                key={option.value}
                variant={selectedSentiments.includes(option.value) ? "default" : "outline"}
                onClick={() => handleSentimentToggle(option.value)}
                className="flex items-center gap-2"
              >
                <span>{option.icon}</span>
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Region Section */}
        <div className="mb-6">
          <Label className="text-base font-medium mb-3 block flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Bölgesel Filtreler
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {REGION_OPTIONS.map((region) => (
              <Button
                key={region}
                variant={selectedRegions.includes(region) ? "default" : "outline"}
                size="sm"
                onClick={() => handleRegionToggle(region)}
                className="justify-start text-sm"
              >
                {region}
              </Button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button onClick={handleApply} className="flex-1">
            Filtreleri Uygula
          </Button>
          <Button variant="outline" onClick={handleClear}>
            Temizle
          </Button>
          <Button variant="ghost" onClick={onClose}>
            İptal
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterInterface;