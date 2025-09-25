import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Wifi, AlertTriangle, CheckCircle } from 'lucide-react';

interface SystemStatus {
  overall: 'safe' | 'warning' | 'danger';
  connectivity: boolean;
  lastUpdate: Date;
  alerts: number;
}

const StatusOverview = () => {
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    overall: 'safe',
    connectivity: true,
    lastUpdate: new Date(),
    alerts: 0
  });

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'safe':
        return {
          color: 'bg-safe text-safe-foreground',
          label: 'Sistem Normal',
          icon: CheckCircle,
          textColor: 'text-safe'
        };
      case 'warning':
        return {
          color: 'bg-warning text-warning-foreground',
          label: 'Perlu Perhatian',
          icon: AlertTriangle,
          textColor: 'text-warning'
        };
      case 'danger':
        return {
          color: 'bg-danger text-danger-foreground',
          label: 'Status Bahaya',
          icon: AlertTriangle,
          textColor: 'text-danger'
        };
      default:
        return {
          color: 'bg-muted text-muted-foreground',
          label: 'Unknown',
          icon: Activity,
          textColor: 'text-muted-foreground'
        };
    }
  };

  // Simulate system status updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus(prev => ({
        ...prev,
        lastUpdate: new Date(),
        connectivity: Math.random() > 0.05, // 95% uptime
        overall: Math.random() > 0.8 ? 'warning' : Math.random() > 0.95 ? 'danger' : 'safe',
        alerts: Math.floor(Math.random() * 3)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const statusConfig = getStatusConfig(systemStatus.overall);
  const StatusIcon = statusConfig.icon;

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <Card className="bg-gradient-card border-border shadow-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium text-card-foreground">
          Status Sistem
        </CardTitle>
        <Activity className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <StatusIcon className={`h-6 w-6 ${statusConfig.textColor}`} />
            <div>
              <div className="text-xl font-bold text-card-foreground">
                Monitoring Aktif
              </div>
              <div className="text-sm text-muted-foreground">
                Real-time sensor data
              </div>
            </div>
          </div>
          <Badge className={statusConfig.color}>
            {statusConfig.label}
          </Badge>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
            <div className="flex items-center space-x-2">
              <Wifi className={`h-4 w-4 ${systemStatus.connectivity ? 'text-safe' : 'text-danger'}`} />
              <span className="text-sm text-card-foreground">Konektivitas</span>
            </div>
            <Badge variant={systemStatus.connectivity ? 'secondary' : 'destructive'}>
              {systemStatus.connectivity ? 'Terhubung' : 'Terputus'}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
            <div className="flex items-center space-x-2">
              <AlertTriangle className={`h-4 w-4 ${systemStatus.alerts > 0 ? 'text-warning' : 'text-muted-foreground'}`} />
              <span className="text-sm text-card-foreground">Alert Aktif</span>
            </div>
            <Badge variant={systemStatus.alerts > 0 ? 'secondary' : 'outline'}>
              {systemStatus.alerts} Alert
            </Badge>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-border">
          <div className="text-xs text-muted-foreground">
            Update terakhir: {formatTime(systemStatus.lastUpdate)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusOverview;