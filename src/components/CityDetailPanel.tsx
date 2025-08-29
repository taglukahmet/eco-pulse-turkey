import React from 'react';
import { X, TrendingUp, Hash, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

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

interface CityDetailPanelProps {
  cityData: CityData;
  onClose: () => void;
  isVisible: boolean;
}

const SENTIMENT_COLORS = {
  positive: 'hsl(var(--sentiment-positive))',
  neutral: 'hsl(var(--sentiment-neutral))',
  negative: 'hsl(var(--sentiment-negative))'
};

export const CityDetailPanel: React.FC<CityDetailPanelProps> = ({
  cityData,
  onClose,
  isVisible
}) => {
  if (!isVisible) return null;

  const sentimentData = [
    { name: 'Pozitif', value: cityData.sentiment.positive, color: SENTIMENT_COLORS.positive },
    { name: 'Nötr', value: cityData.sentiment.neutral, color: SENTIMENT_COLORS.neutral },
    { name: 'Negatif', value: cityData.sentiment.negative, color: SENTIMENT_COLORS.negative }
  ];

  return (
    <div className="fixed right-0 top-0 h-full w-96 glass-panel panel-shadow slide-in-right z-50 overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-primary">{cityData.name}</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Sentiment Analysis */}
        <Card className="bg-card/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <BarChart3 className="h-5 w-5 text-primary" />
              Duygu Analizi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sentimentData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={35}
                      outerRadius={55}
                      paddingAngle={2}
                    >
                      {sentimentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-2">
                {sentimentData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    <span className="text-sm font-bold">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Topic Word Cloud */}
        <Card className="bg-card/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Hash className="h-5 w-5 text-primary" />
              Konu Bulutu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 justify-center">
              {cityData.topics.map((topic) => (
                <span
                  key={topic.text}
                  className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium"
                  style={{
                    fontSize: `${Math.max(12, Math.min(18, topic.value / 5))}px`
                  }}
                >
                  {topic.text}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Trending Hashtags */}
        <Card className="bg-card/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-primary" />
              Trend Hashtagler
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {cityData.hashtags.map((hashtag, index) => (
                <div key={hashtag} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </div>
                  <span className="font-medium text-accent">{hashtag}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Trend */}
        <Card className="bg-card/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Haftalık Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cityData.weeklyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="day" 
                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="volume" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CityDetailPanel;