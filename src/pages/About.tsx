import React from 'react';
import { ArrowLeft, Users, Target, Database, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen dashboard-gradient">
      {/* Header */}
      <header className="glass-panel border-b border-border/50">
        <div className="container mx-auto px-6 h-16 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="hover:bg-muted"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-primary">Hakkında</h1>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 space-y-12">
        {/* Mission */}
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Target className="w-7 h-7 text-primary" />
              Proje Misyonu
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg leading-relaxed">
              <strong>Geo-Sentistainability</strong>, Türkiye Cumhuriyeti Çevre, Şehircilik ve İklim Değişikliği Bakanlığı'nın 
              çevre politikalarına yönelik halkın duygusal tepkilerini ve katılımını görselleştiren kapsamlı bir platform olarak 
              TEKNOFEST "Geleceğin Sürdürülebilir Şehirleri" hackathonu için geliştirilmiştir.
            </p>
            <p className="text-muted-foreground">
              Amacımız, sosyal medya verilerini analiz ederek politika yapıcıların halkın çevre konularındaki algısını 
              daha iyi anlamalarını sağlamak ve veri odaklı karar verme süreçlerini desteklemektir.
            </p>
          </CardContent>
        </Card>

        {/* Methodology */}
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Database className="w-7 h-7 text-primary" />
              Metodoloji
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-lg text-accent">Veri Kaynağı</h4>
                <p className="text-sm text-muted-foreground">
                  X (Twitter) platformundan çevre, şehircilik ve iklim değişikliği ile ilgili hashtagler 
                  (#SıfırAtık, #YeşilŞehir, #TemizHava vb.) kullanılarak gerçek zamanlı veri toplama.
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-lg text-accent">Analiz Yöntemi</h4>
                <p className="text-sm text-muted-foreground">
                  Doğal dil işleme ve makine öğrenmesi teknikleri kullanılarak duygu analizi, 
                  trend analizi ve coğrafi haritalama işlemleri gerçekleştirilmektedir.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg text-accent">Teknik Özellikler</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-primary/10 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-primary mb-2">81</div>
                  <div className="text-sm text-muted-foreground">İl Kapsamı</div>
                </div>
                <div className="bg-accent/10 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-accent mb-2">Real-time</div>
                  <div className="text-sm text-muted-foreground">Veri Güncelleme</div>
                </div>
                <div className="bg-sentiment-positive/10 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-sentiment-positive mb-2">3D</div>
                  <div className="text-sm text-muted-foreground">Analiz Boyutu</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* TEKNOFEST */}
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Award className="w-7 h-7 text-primary" />
              TEKNOFEST 2024
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg leading-relaxed">
              Bu proje, TEKNOFEST 2024 "Geleceğin Sürdürülebilir Şehirleri" kategorisi için özel olarak geliştirilmiş 
              bir Minimum Viable Product (MVP) olarak tasarlanmıştır.
            </p>
            <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg p-6">
              <h4 className="font-semibold text-lg mb-3">Hedef Kitle</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-sm font-medium">Politika Yapıcılar</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Database className="w-6 h-6 text-accent" />
                  </div>
                  <div className="text-sm font-medium">Araştırmacılar</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-sentiment-positive/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Award className="w-6 h-6 text-sentiment-positive" />
                  </div>
                  <div className="text-sm font-medium">Hackathon Jürisi</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team */}
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Users className="w-7 h-7 text-primary" />
              Takım
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <p className="text-lg font-medium text-accent">
                Geo-Sentistainability Geliştirme Takımı
              </p>
              <p className="text-muted-foreground">
                Çevre mühendisliği, bilgisayar bilimleri ve veri analizi alanlarında uzman 
                multidisipliner bir takım tarafından geliştirilmektedir.
              </p>
              <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
                <p className="text-sm text-muted-foreground italic">
                  "Sürdürülebilir bir gelecek için veri odaklı çözümler geliştiriyoruz."
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default About;