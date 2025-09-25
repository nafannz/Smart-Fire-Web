import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flame, AlertTriangle, Shield } from 'lucide-react';

interface FlameData {
  detected: boolean;
  intensity: number; // 0-100
  level: 'none' | 'low' | 'medium' | 'high';
  status: 'safe' | 'warning' | 'danger';
}

const FlameWidget = () => {
  const [flameData, setFlameData] = useState<FlameData>({
    detected: false,
    intensity: 0,
    level: 'none',
    status: 'safe'
  });

  const getFlameLevel = (intensity: number) => {
    if (intensity === 0) return 'none';
    if (intensity <= 30) return 'low';
    if (intensity <= 70) return 'medium';
    return 'high';
  };

  const getFlameStatus = (intensity: number) => {
    if (intensity === 0) return 'safe';
    if (intensity <= 30) return 'warning';
    return 'danger';
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'safe':
        return {
          color: 'bg-safe text-safe-foreground',
          glow: 'shadow-glow-safe',
          label: 'Aman',
          icon: Shield
        };
      case 'warning':
        return {
          color: 'bg-warning text-warning-foreground',
          glow: 'shadow-glow-warning',
          label: 'Peringatan',
          icon: AlertTriangle
        };
      case 'danger':
        return {
          color: 'bg-danger text-danger-foreground',
          glow: 'shadow-glow-danger',
          label: 'Bahaya',
          icon: AlertTriangle
        };
      default:
        return {
          color: 'bg-muted text-muted-foreground',
          glow: '',
          label: 'Unknown',
          icon: Shield
        };
    }
  };

  const getFlameIntensityColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'text-flame-low';
      case 'medium':
        return 'text-flame-medium';
      case 'high':
        return 'text-flame-high';
      default:
        return 'text-muted-foreground';
    }
  };

  // Simulate real-time flame detection updates
  useEffect(() => {
    const interval = setInterval(() => {
      setFlameData(prev => {
        // Random flame detection simulation
        const random = Math.random();
        let newIntensity = 0;
        
        if (random > 0.7) { // 30% chance of flame detection
          newIntensity = Math.round(Math.random() * 100);
        } else if (prev.intensity > 0) {
          // Gradually decrease if flame was detected before
          newIntensity = Math.max(0, prev.intensity - Math.random() * 20);
        }

        return {
          detected: newIntensity > 0,
          intensity: Math.round(newIntensity),
          level: getFlameLevel(newIntensity),
          status: getFlameStatus(newIntensity)
        };
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const statusConfig = getStatusConfig(flameData.status);
  const StatusIcon = statusConfig.icon;

  return (
    <Card className={`bg-gradient-card border-border shadow-card hover:shadow-lg transition-all duration-300 ${statusConfig.glow}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium text-card-foreground">
          Deteksi Api
        </CardTitle>
        <Flame className={`h-5 w-5 ${flameData.detected ? getFlameIntensityColor(flameData.level) : 'text-muted-foreground'}`} />
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <StatusIcon className={`h-6 w-6 ${
              flameData.status === 'safe' ? 'text-safe' : 
              flameData.status === 'warning' ? 'text-warning' : 'text-danger'
            }`} />
            <div>
              <div className="text-2xl font-bold text-card-foreground">
                {flameData.detected ? 'Terdeteksi' : 'Tidak Ada'}
              </div>
              <div className="text-sm text-muted-foreground">
                Status Api
              </div>
            </div>
          </div>
          <Badge className={statusConfig.color}>
            {statusConfig.label}
          </Badge>
        </div>

        {/* Flame intensity gauge */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Intensitas</span>
            <span>{flameData.intensity}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div 
              className={`h-full transition-all duration-700 ease-out ${
                flameData.intensity > 0 ? 'bg-gradient-flame' : 'bg-muted'
              }`}
              style={{ width: `${flameData.intensity}%` }}
            />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-muted-foreground">Level Api</div>
            <div className={`font-medium capitalize ${getFlameIntensityColor(flameData.level)}`}>
              {flameData.level === 'none' ? 'Tidak Ada' : 
               flameData.level === 'low' ? 'Rendah' :
               flameData.level === 'medium' ? 'Sedang' : 'Tinggi'}
            </div>
          </div>
          <div>
            <div className="text-muted-foreground">Sensor Status</div>
            <div className="font-medium text-primary">
              {flameData.detected ? 'Aktif' : 'Standby'}
            </div>
          </div>
        </div>

        {flameData.detected && flameData.status === 'danger' && (
          <div className="mt-4 p-2 bg-danger/10 border border-danger/20 rounded-md">
            <div className="flex items-center space-x-2 text-danger text-sm">
              <AlertTriangle className="h-4 w-4" />
              <span className="font-medium">Peringatan: Api dengan intensitas tinggi terdeteksi!</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FlameWidget;