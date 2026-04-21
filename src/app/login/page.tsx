"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* Ambient glow */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse 700px 500px at 50% 30%, rgba(255,76,0,0.06), transparent 70%)",
        }}
      />

      <div className="w-full max-w-[360px] relative">
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-8 justify-center">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: "var(--metal)",
              boxShadow:
                "0 0 0 1px rgba(255,76,0,0.45), 0 4px 14px rgba(255,76,0,0.28), inset 0 1px 0 rgba(255,255,255,0.16)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M3 12 8 2l5 10H3z"
                fill="white"
                opacity=".9"
              />
            </svg>
          </div>
          <span className="text-[15px] font-semibold tracking-tight">BeautyRise CRM</span>
        </div>

        <div
          className="rounded-xl p-7"
          style={{
            background: "var(--panel-solid)",
            border: "1px solid var(--border-strong)",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          <h1 className="text-[15px] font-semibold text-center mb-6 tracking-tight">
            Zaloguj się
          </h1>

          {error && (
            <div
              className="text-[13px] mb-4 px-3 py-2.5 rounded-lg"
              style={{
                color: "#fca5a5",
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.2)",
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-medium text-[var(--muted)]">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-md px-3 py-2 text-[13.5px] outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid var(--border-strong)",
                  color: "var(--text)",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,76,0,0.5)";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255,76,0,0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-strong)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                placeholder="ty@example.com"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-medium text-[var(--muted)]">
                Hasło
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-md px-3 py-2 text-[13.5px] outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid var(--border-strong)",
                  color: "var(--text)",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,76,0,0.5)";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255,76,0,0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-strong)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-1 btn-primary rounded-md py-2.5 text-[13.5px] font-semibold disabled:opacity-50"
            >
              {loading ? "Logowanie…" : "Zaloguj się"}
            </button>
          </form>
        </div>

        <p className="text-center text-[11.5px] text-[var(--muted)]/55 mt-5">
          BeautyRise © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
