import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flame, AlertTriangle, Shield } from 'lucide-react';
import { getESPData } from '@/services/esp';

interface FlameData { detected?: boolean; intensity?: number; }

export default function FlameWidget() {
  const [data, setData] = useState<FlameData>({ detected: false, intensity: 0 });
  useEffect(() => {
    let mounted = true;
    async function fetchOnce() {
      const d = await getESPData();
      if (!mounted) return;
      if (d) setData({ detected: d.flame ?? false, intensity: d.intensity ?? 0 });
    }
    fetchOnce();
    const id = setInterval(fetchOnce, 5000);
    return () => { mounted = false; clearInterval(id); };
  }, []);

  return (
    <Card>
      <CardHeader><CardTitle>Flame</CardTitle></CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <Flame />
          <div>
            <div className="text-xl">{data.detected ? 'Detected' : 'No flame'}</div>
            <div className="text-sm">Intensity: {data.intensity}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}