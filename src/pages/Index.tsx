import Protected from '@/components/Protected';
import FlameGraph from '@/components/FlameGraph';


import FlameWidget from '@/components/FlameWidget';
import StatusOverview from '@/components/StatusOverview';
import { getESPData } from '@/services/esp';
import { Thermometer, Flame, Activity } from 'lucide-react';

const Index = () => {
  return (
  <div className='p-4'>
    <FlameGraph />
  </div>

    <div>
      

    <div className="min-h-screen bg-gradient-dashboard p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <Activity className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">
            Monitoring Sensor Dashboard
          </h1>
        </div>
        <p className="text-muted-foreground">
          Real-time monitoring suhu dan deteksi api menggunakan sensor IoT
        </p>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Temperature Widget */}
        <div className="lg:col-span-1">
          
        </div>

        {/* Flame Detection Widget */}
        <div className="lg:col-span-1">
          <FlameWidget />
        </div>

        {/* System Status Widget */}
        <div className="lg:col-span-1">
          <StatusOverview />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-card p-4 rounded-lg border border-border shadow-card">
          <div className="flex items-center space-x-3">
            <Thermometer className="h-5 w-5 text-primary" />
            <div>
              <div className="text-sm text-muted-foreground">Sensor Suhu</div>
              <div className="text-lg font-bold text-card-foreground">Online</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-card p-4 rounded-lg border border-border shadow-card">
          <div className="flex items-center space-x-3">
            <Flame className="h-5 w-5 text-primary" />
            <div>
              <div className="text-sm text-muted-foreground">Sensor Api</div>
              <div className="text-lg font-bold text-card-foreground">Online</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-card p-4 rounded-lg border border-border shadow-card">
          <div className="flex items-center space-x-3">
            <Activity className="h-5 w-5 text-primary" />
            <div>
              <div className="text-sm text-muted-foreground">Sistem</div>
              <div className="text-lg font-bold text-card-foreground">Aktif</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-muted-foreground text-sm">
        <p>© 2024 Sensor Monitoring System - Real-time IoT Dashboard</p>
      </div>
    </div>
  );
};

export default Index;