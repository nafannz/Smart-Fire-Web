import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { getESPData } from "@/services/esp";

export default function StatusOverview() {
  const [safe, setSafe] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function poll() {
      const d = await getESPData();
      if (!mounted) return;

      // --- FIX: tidak boleh ada "d." tanpa property ---
      // Asumsi field dari ESP:
      // d.flame → boolean
      // d.temperature → number
      // d.gas → number

      const flameDetected = d?.flame === true;
      const highTemp = d?.temperature ? d.temperature > 60 : false;
      const highGas = d?.gas ? d.gas > 300 : false; // threshold contoh

      const isSafe = !(flameDetected || highTemp || highGas);

      setSafe(isSafe);
    }

    poll();
    const id = setInterval(poll, 5000);

    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Status</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-4">
          {safe ? (
            <CheckCircle className="text-green-500" />
          ) : (
            <AlertTriangle className="text-red-500" />
          )}
          <div>
            <div className="font-semibold">{safe ? "Safe" : "Warning"}</div>
            <div className="text-sm">Auto-updates every 5s</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
