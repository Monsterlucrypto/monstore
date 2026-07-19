"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { members } from "@/data/members";

const UID_KEY = "monstore_uid";

const C = {
  gold: "#C9A84C", goldLight: "#E8C96A", goldDim: "#7a6130",
  bgPrimary: "#0a0a0b",
  borderSubtle: "rgba(201,168,76,0.12)", borderMid: "rgba(201,168,76,0.25)",
  textPrimary: "#f0ece0", textSecondary: "#8a8578", textMuted: "#8a8578",
  error: "#c96060",
};

const F = {
  display: "'Cormorant Garamond', Georgia, serif",
  body: "'DM Sans', system-ui, sans-serif",
  mono: "'Space Mono', monospace",
};

export default function MemberPage() {
  const router = useRouter();
  const [query, setQuery]       = useState("");
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [hovBtn, setHovBtn]     = useState(false);

  // 預填上次查詢的 UID
  useEffect(() => {
    const saved = localStorage.getItem(UID_KEY);
    if (saved) setQuery(saved);
  }, []);

  const handleSearch = () => {
    const q = query.trim();
    if (!q) return;
    setLoading(true);
    setNotFound(false);

    setTimeout(() => {
      const found = members.find((m) => m.uid === q);
      if (found) {
        localStorage.setItem(UID_KEY, q); // 存入 localStorage
        router.push("/dashboard");        // 不需要帶 ?uid=
      } else {
        setNotFound(true);
        setLoading(false);
      }
    }, 400);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=DM+Sans:wght@300;400;500&family=Space+Mono:wght@400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0a0b; color: #f0ece0; font-family: 'DM Sans', system-ui, sans-serif; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.25); border-radius: 2px; }
        input { color-scheme: dark; }
        input::placeholder { color: #4a4740; }
        input:focus { border-color: rgba(201,168,76,0.45) !important; }
      `}</style>

      <div style={{ minHeight: "100vh", background: C.bgPrimary }}>

        {/* Nav */}
        <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(10,10,11,0.92)", backdropFilter: "blur(20px)", borderBottom: `0.5px solid ${C.borderSubtle}`, height: 64, display: "flex", alignItems: "center", padding: "0 32px", gap: 12 }}>
          <div style={{ width: 43, height: 43, borderRadius: 8, overflow: "hidden", background: "#000", border: `0.5px solid ${C.borderMid}`, flexShrink: 0 }}>
            <img src="/logo.png" alt="logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          <a href="/" style={{ fontFamily: F.display, fontSize: 30, fontWeight: 500, color: C.textPrimary, letterSpacing: 1, textDecoration: "none" }}>
            Mon<span style={{ color: C.gold }}>store</span>
          </a>
          <div style={{ marginLeft: "auto" }}>
            <a href="/dashboard" style={{ fontSize: 12, color: C.gold, background: "rgba(201,168,76,0.08)", border: `0.5px solid ${C.borderMid}`, padding: "7px 18px", borderRadius: 8, textDecoration: "none", fontFamily: F.body }}>
              Dashboard →
            </a>
          </div>
        </nav>

        {/* Main */}
        <div style={{ maxWidth: 560, margin: "0 auto", padding: "140px 32px 80px" }}>

          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(201,168,76,0.08)", border: `0.5px solid ${C.borderMid}`, borderRadius: 20, padding: "4px 14px", marginBottom: 24 }}>
            <span style={{ fontSize: 11, color: C.gold, letterSpacing: 2, textTransform: "uppercase", fontFamily: F.body }}>✦ Member Access</span>
          </div>

          {/* Heading */}
          <h1 style={{ fontFamily: F.display, fontSize: "clamp(34px, 6vw, 64px)", fontWeight: 300, color: C.textPrimary, letterSpacing: 1, lineHeight: 1.15, marginBottom: 16 }}>
            Member<br /><span style={{ color: C.goldLight }}>Dashboard</span>
          </h1>
          <p style={{ fontSize: 15, color: C.textSecondary, fontFamily: F.body, lineHeight: 1.8, marginBottom: 40, maxWidth: 400 }}>
            輸入你的 UID，查看 Monstore 會員資料、VIP 等級與 Founder Pass 詳情。
          </p>

          {/* Search */}
          <div style={{ display: "flex", gap: 10 }}>
            <input
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setNotFound(false); }}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="輸入 UID（例如 549110911）"
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.03)",
                border: `0.5px solid ${notFound ? "rgba(201,96,96,0.5)" : C.borderMid}`,
                borderRadius: 10,
                padding: "14px 18px",
                color: C.textPrimary,
                fontSize: 15,
                fontFamily: F.mono,
                letterSpacing: 1,
                outline: "none",
                transition: "border-color 0.2s",
              }}
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              onMouseEnter={() => setHovBtn(true)}
              onMouseLeave={() => setHovBtn(false)}
              style={{
                background: hovBtn
                  ? "linear-gradient(135deg, #8a6020, #6a4a18)"
                  : "linear-gradient(135deg, #7a6130, #5a4520)",
                border: "0.5px solid #C9A84C",
                color: C.goldLight,
                padding: "14px 28px",
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 500,
                cursor: loading ? "not-allowed" : "pointer",
                fontFamily: F.body,
                letterSpacing: 0.5,
                whiteSpace: "nowrap",
                transition: "background 0.2s",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "查詢中..." : "Check Status →"}
            </button>
          </div>

          {/* Error */}
          {notFound && (
            <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 10, background: "rgba(201,96,96,0.06)", border: "0.5px solid rgba(201,96,96,0.28)", borderRadius: 10, padding: "14px 18px" }}>
              <span style={{ fontSize: 16, color: C.error }}>✕</span>
              <span style={{ fontSize: 14, color: C.error, fontFamily: F.body }}>Member not found. Please check your UID.</span>
            </div>
          )}

          {/* Hint */}
          <div style={{ marginTop: 32, padding: "16px 20px", background: "rgba(255,255,255,0.02)", border: `0.5px solid ${C.borderSubtle}`, borderRadius: 10 }}>
            <div style={{ fontSize: 10, letterSpacing: 2, color: C.textMuted, textTransform: "uppercase", marginBottom: 8, fontFamily: F.body }}>查詢後可查看</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                "會員資料 · UID · Name · Trading Volume",
                "VIP 等級 · Trading Rank · 積分",
                "Founder Pass · Reward Units · 等級權益",
              ].map((t) => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: C.gold, fontSize: 10 }}>◈</span>
                  <span style={{ fontSize: 12, color: C.textSecondary, fontFamily: F.body }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
