"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

export type EmailDailyPoint = { date: string; opens: number; clicks: number };

export function EmailCampaignChart({ data }: { data: EmailDailyPoint[] }) {
  if (data.length === 0) {
    return (
      <div className="h-40 flex items-center justify-center text-sm" style={{ color: "var(--muted)" }}>
        Brak danych — wyślij kampanię aby zobaczyć statystyki.
      </div>
    );
  }

  return (
    <div className="h-52">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: -16 }}>
          <CartesianGrid stroke="rgba(0,0,0,0.06)" strokeDasharray="4 4" />
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
          <Line type="monotone" dataKey="opens" name="Otwarcia" stroke="#FF4C00" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="clicks" name="Kliknięcia" stroke="#3b82f6" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
