"use client";

import { useState } from "react";
import { members } from "@/data/members";
import type { Member } from "@/data/members";

const C = {
  gold: "#C9A84C", goldLight: "#E8C96A", goldDim: "#7a6130",
  bgPrimary: "#0a0a0b", bgCard: "#141418", bgCardHover: "#1a1a1f",
  borderSubtle: "rgba(201,168,76,0.12)", borderMid: "rgba(201,168,76,0.25)", borderStrong: "rgba(201,168,76,0.45)",
  textPrimary: "#f0ece0", textSecondary: "#8a8578", textMuted: "#4a4740",
};

const F = {
  display: "'Cormorant Garamond', Georgia, serif",
  body: "'DM Sans', system-ui, sans-serif",
  mono: "'Space Mono', monospace",
};

const vipColors: Record<string, { color: string; colorDim: string; colorBorder: string }> = {
  Lu: { color: "#E8C96A", colorDim: "rgba(232,201,106,0.12)", colorBorder: "rgba(232,201,106,0.35)" },
  M:  { color: "#C9A84C", colorDim: "rgba(201,168,76,0.1)",   colorBorder: "rgba(201,168,76,0.3)"   },
  O:  { color: "#a8a9ad", colorDim: "rgba(168,169,173,0.1)",  colorBorder: "rgba(168,169,173,0.25)" },
  N:  { color: "#cd7f32", colorDim: "rgba(205,127,50,0.1)",   colorBorder: "rgba(205,127,50,0.25)"  },
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 12, letterSpacing: 3, color: C.textMuted, textTransform: "uppercase", marginBottom: 16, fontFamily: F.body }}>
      {children}
    </div>
  );
}

function MemberDashboard({ member }: { member: Member }) {
  const tier = vipColors[member.vip] ?? vipColors["N"];

  const stats = [
    { label: "Trading Volume", value: member.tradingVolumeDisplay, icon: "📈", change: "累計交易量" },
    { label: "Reward Points",  value: member.points,               icon: "✦",  change: "可用積分"   },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>

      {/* 會員卡 */}
      <div>
        <SectionLabel>Member Overview</SectionLabel>
        <div style={{ background: "linear-gradient(135deg, #1a1508 0%, #0e0e12 40%, #0a0a0b 100%)", border: `0.5px solid ${C.borderMid}`, borderRadius: 16, padding: 32, position: "relative", overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }} className="grid-2">
          <div style={{ position: "absolute", top: -40, right: -40, width: 220, height: 220, background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontFamily: F.display, fontSize: 24, fontWeight: 300, color: C.goldLight, letterSpacing: 2 }}>MONSTORE</div>
              <span style={{ fontSize: 11, color: tier.color, background: tier.colorDim, border: `0.5px solid ${tier.colorBorder}`, padding: "4px 12px", borderRadius: 20, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: F.body }}>✦ {member.vip}</span>
            </div>
            <div>
              <div style={{ width: 43, height: 34, background: "linear-gradient(135deg, #c9a84c, #7a6130)", borderRadius: 5, marginBottom: 16 }} />
              <div style={{ fontFamily: F.display, fontSize: 38, fontWeight: 400, color: C.textPrimary, letterSpacing: 0.5 }}>{member.name}</div>
              <div style={{ fontSize: 13, color: C.textMuted, fontFamily: F.mono, marginTop: 4 }}>UID: {member.uid}</div>
            </div>
            <div style={{ display: "flex", gap: 24 }}>
              {[{ label: "Member Since", value: member.memberSince }, { label: "VIP Level", value: member.vip }].map((s) => (
                <div key={s.label}>
                  <div style={{ fontSize: 10, letterSpacing: 2, color: C.textMuted, textTransform: "uppercase", marginBottom: 3, fontFamily: F.body }}>{s.label}</div>
                  <div style={{ fontFamily: F.mono, fontSize: 15, fontWeight: 700, color: C.goldLight }}>{s.value}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
            <div style={{ background: tier.colorDim, border: `0.5px solid ${tier.colorBorder}`, borderRadius: 12, padding: 24, textAlign: "center" }}>
              <div style={{ fontSize: 12, color: C.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8, fontFamily: F.body }}>Founder Pass</div>
              <div style={{ fontFamily: F.mono, fontSize: 24, fontWeight: 700, color: member.founderPass ? "#5ea96e" : C.textMuted, lineHeight: 1 }}>
                {member.founderPass ? "✦ Active" : "Not Purchased"}
              </div>
            </div>
            <div style={{ background: "rgba(94,169,110,0.08)", border: "0.5px solid rgba(94,169,110,0.25)", borderRadius: 10, padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 14, color: C.textSecondary, fontFamily: F.body }}>Treasury Participation</span>
              <span style={{ fontSize: 14, color: "#5ea96e", fontFamily: F.mono, fontWeight: 700 }}>● {member.treasuryParticipation}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 統計卡 */}
      <div>
        <SectionLabel>Trading & Reward Stats</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {stats.map((s) => (
            <div key={s.label} style={{ background: C.bgCard, border: `0.5px solid ${C.borderSubtle}`, borderRadius: 12, padding: 28, textAlign: "center" }}>
              <div style={{ width: 44, height: 44, borderRadius: 8, background: "rgba(201,168,76,0.08)", border: `0.5px solid ${C.borderSubtle}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, margin: "0 auto 16px" }}>{s.icon}</div>
              <div style={{ fontSize: 13, color: C.textMuted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8, fontFamily: F.body }}>{s.label}</div>
              <div style={{ fontFamily: F.mono, fontSize: 32, fontWeight: 700, color: C.textPrimary, lineHeight: 1, marginBottom: 8 }}>{s.value}</div>
              <div style={{ fontSize: 13, color: C.textSecondary, fontFamily: F.body }}>{s.change}</div>
            </div>
          ))}
        </div>
      </div>

      {/* VIP 資訊 */}
      <div>
        <SectionLabel>VIP Membership</SectionLabel>
        <div style={{ background: C.bgCard, border: `0.5px solid ${tier.colorBorder}`, borderRadius: 16, padding: 28, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="grid-2">
          {[
            { label: "VIP Level",            value: member.vip,                   color: tier.color },
            { label: "Participation Status", value: member.treasuryParticipation, color: "#5ea96e"  },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 12, color: C.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10, fontFamily: F.body }}>{s.label}</div>
              <div style={{ fontFamily: F.mono, fontSize: 26, fontWeight: 700, color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 返回按鈕 */}
      <div style={{ display: "flex", gap: 12 }}>
        <a href="/" style={{ background: "transparent", border: `0.5px solid ${C.borderMid}`, color: C.textSecondary, padding: "13px 28px", borderRadius: 8, fontSize: 15, cursor: "pointer", fontFamily: F.body, textDecoration: "none" }}>
          ← Back to Home
        </a>
        <a href="/dashboard" style={{ background: `linear-gradient(135deg, ${C.goldDim}, #5a4520)`, border: `0.5px solid ${C.gold}`, color: C.goldLight, padding: "13px 28px", borderRadius: 8, fontSize: 15, fontWeight: 500, cursor: "pointer", fontFamily: F.body, textDecoration: "none" }}>
          Enter Dashboard →
        </a>
      </div>
    </div>
  );
}

export default function MemberPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<Member | null | "not_found">(null);

  const handleSearch = () => {
    const q = query.trim();
    const found = members.find((m) => m.uid === q);
    setResult(found ?? "not_found");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=DM+Sans:wght@300;400;500&family=Space+Mono:wght@400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { font-size: 19.2px; }
        @media (max-width: 768px) { html { font-size: 16px; } }
        body { background: #0a0a0b; color: #f0ece0; font-family: 'DM Sans', system-ui, sans-serif; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.25); border-radius: 2px; }
        input { color-scheme: dark; outline: none; }
        @media (max-width: 768px) {
          .grid-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: C.bgPrimary }}>
        <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(10,10,11,0.92)", backdropFilter: "blur(20px)", borderBottom: `0.5px solid rgba(201,168,76,0.12)`, height: 64, display: "flex", alignItems: "center", padding: "0 32px", gap: 12 }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, overflow: "hidden", background: "#000", border: `0.5px solid rgba(201,168,76,0.25)`, flexShrink: 0 }}>
            <img src="/logo.png" alt="logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          <a href="/" style={{ fontFamily: F.display, fontSize: 18, fontWeight: 500, color: C.textPrimary, letterSpacing: 1, textDecoration: "none" }}>
            Mon<span style={{ color: C.gold }}>store</span>
          </a>
          <div style={{ marginLeft: "auto" }}>
            <a href="/dashboard" style={{ fontSize: 12, color: C.gold, background: "rgba(201,168,76,0.1)", border: `0.5px solid rgba(201,168,76,0.25)`, padding: "7px 18px", borderRadius: 8, textDecoration: "none", fontFamily: F.body }}>
              Dashboard →
            </a>
          </div>
        </nav>

        <div style={{ maxWidth: 900, margin: "0 auto", padding: "120px 32px 64px" }}>
          <div style={{ marginBottom: 48 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(201,168,76,0.08)", border: `0.5px solid rgba(201,168,76,0.25)`, borderRadius: 20, padding: "4px 14px", marginBottom: 20 }}>
              <span style={{ fontSize: 12, color: C.gold, letterSpacing: 2, textTransform: "uppercase", fontFamily: F.body }}>✦ Member Access</span>
            </div>
            <h1 style={{ fontFamily: F.display, fontSize: "clamp(32px, 5vw, 62px)", fontWeight: 300, color: C.textPrimary, letterSpacing: 1, lineHeight: 1.2, marginBottom: 12 }}>
              Member Access
            </h1>
            <p style={{ fontSize: 17, color: C.textSecondary, fontFamily: F.body, lineHeight: 1.8, marginBottom: 32, maxWidth: 480 }}>
              Enter your UID to view your Monstore membership dashboard.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="UID"
                style={{ flex: 1, minWidth: 240, background: "rgba(255,255,255,0.03)", border: `0.5px solid rgba(201,168,76,0.25)`, borderRadius: 10, padding: "14px 20px", color: C.textPrimary, fontSize: 17, fontFamily: F.body }}
              />
              <button
                onClick={handleSearch}
                style={{ background: `linear-gradient(135deg, ${C.goldDim}, #5a4520)`, border: `0.5px solid ${C.gold}`, color: C.goldLight, padding: "14px 32px", borderRadius: 10, fontSize: 17, fontWeight: 500, cursor: "pointer", fontFamily: F.body, letterSpacing: 0.5, whiteSpace: "nowrap" }}
              >
                Check Status
              </button>
            </div>
          </div>

          {result === "not_found" && (
            <div style={{ background: "rgba(201,96,96,0.06)", border: "0.5px solid rgba(201,96,96,0.25)", borderRadius: 12, padding: "22px 28px", display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 20, color: "#c96060" }}>✕</span>
              <span style={{ fontSize: 17, color: "#c96060", fontFamily: F.body }}>Member not found. Please check your UID.</span>
            </div>
          )}

          {result && result !== "not_found" && (
            <MemberDashboard member={result} />
          )}
        </div>
      </div>
    </>
  );
}
