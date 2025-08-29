import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

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

interface TurkeyMapProps {
  onProvinceClick: (province: Province) => void;
  selectedProvince?: string | null;
  comparisonMode: boolean;
  selectedProvinces: string[];
}

// Simplified SVG paths for major Turkish provinces
const PROVINCES_DATA: Province[] = [
  {
    id: 'istanbul',
    name: 'İstanbul',
    path: 'M180,120 L220,115 L225,140 L200,145 L175,135 Z',
    mainTopic: '#SıfırAtık',
    sentiment: { positive: 65, neutral: 25, negative: 10 }
  },
  {
    id: 'ankara',
    name: 'Ankara',
    path: 'M240,180 L280,175 L285,205 L250,210 L235,195 Z',
    mainTopic: '#YeşilŞehir',
    sentiment: { positive: 72, neutral: 20, negative: 8 }
  },
  {
    id: 'izmir',
    name: 'İzmir',
    path: 'M120,200 L160,195 L165,225 L130,230 L115,215 Z',
    mainTopic: '#TemizHava',
    sentiment: { positive: 58, neutral: 30, negative: 12 }
  },
  {
    id: 'antalya',
    name: 'Antalya',
    path: 'M200,250 L240,245 L245,275 L210,280 L195,265 Z',
    mainTopic: '#SürdürülebilirTurizm',
    sentiment: { positive: 68, neutral: 22, negative: 10 }
  },
  {
    id: 'bursa',
    name: 'Bursa',
    path: 'M160,150 L200,145 L205,175 L170,180 L155,165 Z',
    mainTopic: '#YeşilSanayi',
    sentiment: { positive: 70, neutral: 20, negative: 10 }
  },
  {
    id: 'adana',
    name: 'Adana',
    path: 'M280,220 L320,215 L325,245 L290,250 L275,235 Z',
    mainTopic: '#TarımselSürdürülebilirlik',
    sentiment: { positive: 60, neutral: 28, negative: 12 }
  },
  {
    id: 'gaziantep',
    name: 'Gaziantep',
    path: 'M320,200 L360,195 L365,225 L330,230 L315,215 Z',
    mainTopic: '#EnerjiVerimliliği',
    sentiment: { positive: 55, neutral: 32, negative: 13 }
  },
  {
    id: 'konya',
    name: 'Konya',
    path: 'M220,220 L260,215 L265,245 L230,250 L215,235 Z',
    mainTopic: '#SularınKorunması',
    sentiment: { positive: 63, neutral: 25, negative: 12 }
  }
];

export const TurkeyMap: React.FC<TurkeyMapProps> = ({
  onProvinceClick,
  selectedProvince,
  comparisonMode,
  selectedProvinces
}) => {
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);

  const handleProvinceClick = useCallback((province: Province) => {
    onProvinceClick(province);
  }, [onProvinceClick]);

  const getProvinceFill = (provinceId: string) => {
    if (selectedProvinces.includes(provinceId)) {
      return 'hsl(var(--primary))';
    }
    if (selectedProvince === provinceId) {
      return 'hsl(var(--primary))';
    }
    return 'hsl(var(--muted))';
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 500 350"
        className="w-full h-full max-w-4xl"
        style={{ filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.3))' }}
      >
        {/* Background shape representing Turkey's outline */}
        <path
          d="M50,150 Q100,80 200,90 Q300,85 450,120 Q480,140 470,200 Q460,250 400,280 Q300,300 200,290 Q100,280 70,220 Q40,180 50,150 Z"
          fill="hsl(var(--card))"
          stroke="hsl(var(--border))"
          strokeWidth="2"
          className="opacity-60"
        />
        
        {/* Province paths */}
        {PROVINCES_DATA.map((province) => (
          <g key={province.id}>
            <path
              d={province.path}
              fill={getProvinceFill(province.id)}
              stroke="hsl(var(--border))"
              strokeWidth="1.5"
              className={cn(
                "map-province transition-all duration-300",
                {
                  "selected": selectedProvince === province.id || selectedProvinces.includes(province.id),
                  "opacity-70 hover:opacity-100": !selectedProvince && !selectedProvinces.includes(province.id),
                }
              )}
              onMouseEnter={() => setHoveredProvince(province.id)}
              onMouseLeave={() => setHoveredProvince(null)}
              onClick={() => handleProvinceClick(province)}
            />
            
            {/* Province labels */}
            <text
              x={parseFloat(province.path.split(' ')[1].split(',')[0]) + 30}
              y={parseFloat(province.path.split(' ')[1].split(',')[1]) + 20}
              className="text-xs font-medium fill-current pointer-events-none"
              textAnchor="middle"
            >
              {province.name}
            </text>
          </g>
        ))}
        
        {/* Tooltip for hovered province */}
        {hoveredProvince && (
          <g>
            {(() => {
              const province = PROVINCES_DATA.find(p => p.id === hoveredProvince);
              if (!province) return null;
              
              const x = parseFloat(province.path.split(' ')[1].split(',')[0]) + 40;
              const y = parseFloat(province.path.split(' ')[1].split(',')[1]) - 10;
              
              return (
                <g className="pointer-events-none">
                  <rect
                    x={x}
                    y={y - 25}
                    width="140"
                    height="35"
                    rx="6"
                    fill="hsl(var(--popover))"
                    stroke="hsl(var(--border))"
                    className="drop-shadow-lg"
                  />
                  <text
                    x={x + 10}
                    y={y - 12}
                    className="text-sm font-semibold fill-current"
                  >
                    {province.name}
                  </text>
                  <text
                    x={x + 10}
                    y={y - 2}
                    className="text-xs fill-current opacity-80"
                  >
                    {province.mainTopic}
                  </text>
                </g>
              );
            })()}
          </g>
        )}
      </svg>
      
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