import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Thermometer, TrendingUp, TrendingDown } from 'lucide-react';

interface TemperatureData {
  current: number;
  previous: number;
  status: 'safe' | 'warning' | 'danger';
  trend: 'up' | 'down' | 'stable';
}

const TemperatureWidget = () => {
  const [tempData, setTempData] = useState<TemperatureData>({
    current: 25,
    previous: 24,
    status: 'safe',
    trend: 'stable'
  });

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'safe':
        return {
          color: 'bg-safe text-safe-foreground',
          glow: 'shadow-glow-safe',
          label: 'Normal'
        };
      case 'warning':
        return {
          color: 'bg-warning text-warning-foreground',
          glow: 'shadow-glow-warning',
          label: 'Tinggi'
        };
      case 'danger':
        return {
          color: 'bg-danger text-danger-foreground',
          glow: 'shadow-glow-danger',
          label: 'Bahaya'
        };
      default:
        return {
          color: 'bg-muted text-muted-foreground',
          glow: '',
          label: 'Unknown'
        };
    }
  };

  const getTemperatureStatus = (temp: number) => {
    if (temp <= 30) return 'safe';
    if (temp <= 50) return 'warning';
    return 'danger';
  };

  const getTrend = (current: number, previous: number) => {
    if (current > previous + 1) return 'up';
    if (current < previous - 1) return 'down';
    return 'stable';
  };

  // Simulate real-time temperature updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTempData(prev => {
        const newTemp = Math.max(15, Math.min(80, prev.current + (Math.random() - 0.5) * 6));
        return {
          current: Math.round(newTemp * 10) / 10,
          previous: prev.current,
          status: getTemperatureStatus(newTemp),
          trend: getTrend(newTemp, prev.current)
        };
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const statusConfig = getStatusConfig(tempData.status);
  const tempPercentage = Math.min(100, (tempData.current / 80) * 100);

  return (
    <Card className={`bg-gradient-card border-border shadow-card hover:shadow-lg transition-all duration-300 ${statusConfig.glow}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium text-card-foreground">
          Monitor Suhu
        </CardTitle>
        <Thermometer className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="text-3xl font-bold text-card-foreground">
              {tempData.current}°C
            </div>
            {tempData.trend === 'up' && (
              <TrendingUp className="h-4 w-4 text-danger" />
            )}
            {tempData.trend === 'down' && (
              <TrendingDown className="h-4 w-4 text-temp-cold" />
            )}
          </div>
          <Badge className={statusConfig.color}>
            {statusConfig.label}
          </Badge>
        </div>
        
        {/* Temperature gauge */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0°C</span>
            <span>80°C</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-temp transition-all duration-700 ease-out"
              style={{ width: `${tempPercentage}%` }}
            />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-muted-foreground">Sebelumnya</div>
            <div className="font-medium text-card-foreground">{tempData.previous}°C</div>
          </div>
          <div>
            <div className="text-muted-foreground">Perubahan</div>
            <div className={`font-medium ${
              tempData.current > tempData.previous ? 'text-danger' : 'text-temp-cold'
            }`}>
              {tempData.current > tempData.previous ? '+' : ''}
              {(tempData.current - tempData.previous).toFixed(1)}°C
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TemperatureWidget;