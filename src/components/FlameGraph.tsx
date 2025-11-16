import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function FlameGraph() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    load();

    const channel = supabase
      .channel('public:flame_logs')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'flame_logs' }, (payload) => {
        setData((d) => [...d.slice(-99), { ...payload.new }]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function load() {
    const { data: rows } = await supabase.from('flame_logs').select('*').order('created_at', { ascending: true }).limit(100);
    setData(rows || []);
  }

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="created_at" />
          <YAxis />
          <Tooltip />
          <Line dataKey="intensity" stroke="#ff0000" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
