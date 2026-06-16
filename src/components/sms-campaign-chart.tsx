"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

export type SmsDailyPoint = { date: string; sent: number; replied: number };

export function SmsCampaignChart({ data }: { data: SmsDailyPoint[] }) {
  if (data.length === 0) {
    return (
      <div className="h-40 flex items-center justify-center text-sm" style={{ color: "var(--muted)" }}>
        Brak danych do wyświetlenia.
      </div>
    );
  }

  return (
    <div className="h-52">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: -16 }}>
          <CartesianGrid stroke="rgba(0,0,0,0.06)" strokeDasharray="4 4" vertical={false} />
          <XAxis dataKey="date" stroke="#78716C" style={{ fontSize: 11 }} />
          <YAxis stroke="#78716C" style={{ fontSize: 11 }} allowDecimals={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              fontSize: 12,
              boxShadow: "var(--shadow-sm)",
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12, color: "var(--muted)" }} />
          <Bar dataKey="sent" name="Wysłane" fill="#FF4C00" radius={[3, 3, 0, 0]} />
          <Bar dataKey="replied" name="Odpowiedzi" fill="#FF4C00" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
