import React from 'react';
import { X, TrendingUp, Globe, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

interface NationalData {
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
  topTopics: Array<{ name: string; mentions: number; trend: number }>;
  nationalHashtags: string[];
}

interface NationalAgendaPanelProps {
  isVisible: boolean;
  onClose: () => void;
}

const SENTIMENT_COLORS = {
  positive: 'hsl(var(--sentiment-positive))',
  neutral: 'hsl(var(--sentiment-neutral))',
  negative: 'hsl(var(--sentiment-negative))'
};

// Mock national data
const nationalData: NationalData = {
  sentiment: { positive: 64, neutral: 26, negative: 10 },
  topTopics: [
    { name: '#SıfırAtık', mentions: 12500, trend: 15 },
    { name: '#YeşilŞehir', mentions: 9800, trend: 8 },
    { name: '#TemizHava', mentions: 8200, trend: -3 },
    { name: '#SürdürülebilirTurizm', mentions: 6900, trend: 22 },
    { name: '#EnerjiVerimliliği', mentions: 5400, trend: 11 }
  ],
  nationalHashtags: [
    '#ÇevreKoruması', 
    '#İklimDeğişikliği', 
    '#YenilenebilirEnerji', 
    '#GeriDönüşüm', 
    '#YeşilTekno loji'
  ]
};

export const NationalAgendaPanel: React.FC<NationalAgendaPanelProps> = ({
  isVisible,
  onClose
}) => {
  if (!isVisible) return null;

  const sentimentData = [
    { name: 'Pozitif', value: nationalData.sentiment.positive, color: SENTIMENT_COLORS.positive },
    { name: 'Nötr', value: nationalData.sentiment.neutral, color: SENTIMENT_COLORS.neutral },
    { name: 'Negatif', value: nationalData.sentiment.negative, color: SENTIMENT_COLORS.negative }
  ];

  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-96 glass-panel panel-shadow slide-in-right z-40 overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
            <Globe className="w-6 h-6" />
            Ulusal Gündem
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* National Sentiment */}
        <Card className="bg-card/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Ulusal Duygu Durumu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sentimentData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
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

        {/* Top National Topics */}
        <Card className="bg-card/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-primary" />
              En Popüler Konular
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {nationalData.topTopics.map((topic, index) => (
                <div key={topic.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center">
                        {index + 1}
                      </div>
                      <span className="font-medium text-accent">{topic.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold">
                        {topic.mentions.toLocaleString()}
                      </div>
                      <div className={`text-xs font-medium ${
                        topic.trend > 0 ? 'text-sentiment-positive' : 
                        topic.trend < 0 ? 'text-sentiment-negative' : 
                        'text-sentiment-neutral'
                      }`}>
                        {topic.trend > 0 ? '+' : ''}{topic.trend}%
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top National Hashtags */}
        <Card className="bg-card/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Hash className="h-5 w-5 text-primary" />
              Ulusal Hashtagler
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {nationalData.nationalHashtags.map((hashtag, index) => (
                <div key={hashtag} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 text-accent text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </div>
                  <span className="font-medium text-accent">{hashtag}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="bg-card/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Hızlı İstatistikler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-primary/10 rounded-lg">
                <div className="text-2xl font-bold text-primary">81</div>
                <div className="text-xs text-muted-foreground">Analiz Edilen İl</div>
              </div>
              <div className="text-center p-3 bg-accent/10 rounded-lg">
                <div className="text-2xl font-bold text-accent">42.8K</div>
                <div className="text-xs text-muted-foreground">Toplam Tweet</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NationalAgendaPanel;