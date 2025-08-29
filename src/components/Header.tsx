import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Globe, BarChart3, Info, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onNationalAgendaClick: () => void;
  onAboutClick: () => void;
  comparisonMode: boolean;
  onComparisonToggle: () => void;
  showNationalPanel: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onNationalAgendaClick,
  onAboutClick,
  comparisonMode,
  onComparisonToggle,
  showNationalPanel
}) => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check if dark mode is already set
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-border/50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center glow-effect">
            <Globe className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">
              Geo-Sentistainability
            </h1>
            <p className="text-xs text-muted-foreground">
              Geopolitical Sentiment Analysis Platform
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-foreground hover:text-primary"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onComparisonToggle}
            className={cn(
              "transition-all duration-300",
              comparisonMode && "bg-primary/20 text-primary hover:bg-primary/30"
            )}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Karşılaştır
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onNationalAgendaClick}
            className={cn(
              "transition-all duration-300",
              showNationalPanel && "bg-primary/20 text-primary hover:bg-primary/30"
            )}
          >
            <Globe className="w-4 h-4 mr-2" />
            Ulusal Gündem
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onAboutClick}
          >
            <Info className="w-4 h-4 mr-2" />
            Hakkında
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;