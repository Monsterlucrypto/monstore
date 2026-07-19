"use client";

import Layout from "@/components/Layout";
import { leaderboard, totalVolume } from "@/data/members";

const C = {
  gold: "#C9A84C", goldLight: "#E8C96A", goldDim: "#7a6130",
  bgPrimary: "#0a0a0b", bgCard: "#141418", bgCardHover: "#1a1a1f",
  borderSubtle: "rgba(201,168,76,0.12)", borderMid: "rgba(201,168,76,0.25)", borderStrong: "rgba(201,168,76,0.45)",
  textPrimary: "#f0ece0", textSecondary: "#8a8578", textMuted: "#8a8578",
};

const F = {
  display: "'Cormorant Garamond', Georgia, serif",
  body: "'DM Sans', system-ui, sans-serif",
  mono: "'Space Mono', monospace",
};

const vipColors: Record<string, string> = {
  Diamond: "#E8C96A",
  Gold:    "#C9A84C",
  Silver:  "#a8a9ad",
  Normal:  "#cd7f32",
};

const vipIcon: Record<string, string> = {
  Diamond: "♦",
  Gold:    "♦",
  Silver:  "♦",
  Normal:  "♦",
};

const rankStyle = (rank: number) => {
  if (rank === 1) return { color: "#E8C96A", glow: "rgba(232,201,106,0.15)", icon: "🥇" };
  if (rank === 2) return { color: "#a8a9ad", glow: "rgba(168,169,173,0.1)",  icon: "🥈" };
  if (rank === 3) return { color: "#cd7f32", glow: "rgba(205,127,50,0.1)",   icon: "🥉" };
  return { color: C.textMuted, glow: "transparent", icon: "" };
};

function formatVolume(v: number) {
  if (v >= 1000000) return `$${(v / 1000000).toFixed(2)}M`;
  if (v >= 1000) return `$${(v / 1000).toFixed(1)}K`;
  if (v === 0) return "—";
  return `$${v.toFixed(2)}`;
}

export default function LeaderboardPage() {
  const top3 = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  return (
    <Layout activePath="/leaderboard" title="交易量排行榜">
      <div style={{ display: "flex", flexDirection: "column", gap: 28, maxWidth: 1200 }}>

        {/* 頁面標題 */}
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(201,168,76,0.08)", border: `0.5px solid ${C.borderMid}`, borderRadius: 20, padding: "4px 14px", marginBottom: 16 }}>
            <span style={{ fontSize: 10, color: C.gold, letterSpacing: 2, textTransform: "uppercase", fontFamily: F.body }}>✦ 本月交易排行榜</span>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 20, flexWrap: "wrap" }}>
            <div style={{ fontFamily: F.display, fontSize: 32, fontWeight: 300, color: C.textPrimary, letterSpacing: 0.5 }}>本月交易排行榜</div>
            <div style={{ fontFamily: F.mono, fontSize: 13, color: C.textMuted }}>
              總交易量 {formatVolume(totalVolume)} · 前十名
            </div>
          </div>
        </div>

        {/* 前三名大卡 */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="grid-3">
          {top3.map((m) => {
            const rs = rankStyle(m.rank);
            return (
              <div key={m.uid} style={{ background: `linear-gradient(135deg, ${rs.glow} 0%, rgba(20,20,24,0.8) 100%)`, border: `0.5px solid ${rs.color}40`, borderRadius: 16, padding: "28px 24px", position: "relative", overflow: "hidden", textAlign: "center" }}>
                <div style={{ position: "absolute", top: -20, left: "50%", transform: "translateX(-50%)", width: 120, height: 120, background: `radial-gradient(circle, ${rs.glow} 0%, transparent 70%)`, pointerEvents: "none" }} />
                <div style={{ fontSize: 32, marginBottom: 8 }}>{rs.icon}</div>
                <div style={{ fontSize: 11, color: rs.color, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4, fontFamily: F.body }}>Rank #{m.rank}</div>
                <div style={{ fontFamily: F.display, fontSize: 28, fontWeight: 400, color: C.textPrimary, marginBottom: 4 }}>{m.name}</div>
                <div style={{ fontFamily: F.mono, fontSize: 24, fontWeight: 700, color: rs.color, marginBottom: 20 }}>{formatVolume(m.tradingVolume)}</div>
                <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: vipColors[m.vip], background: `${vipColors[m.vip]}20`, border: `1px solid ${vipColors[m.vip]}60`, padding: "6px 16px", borderRadius: 20, fontFamily: F.body, letterSpacing: 1 }}>
                    <span style={{ marginRight: 5, color: vipColors[m.vip] }}>{vipIcon[m.vip]}</span>{m.vip}
                  </span>
                  <span style={{ fontSize: 13, color: m.founderPass ? "#5ea96e" : C.textMuted, background: m.founderPass ? "rgba(94,169,110,0.1)" : "rgba(255,255,255,0.03)", border: `0.5px solid ${m.founderPass ? "rgba(94,169,110,0.3)" : C.borderSubtle}`, padding: "6px 14px", borderRadius: 20, fontFamily: F.body }}>
                    {m.founderPass ? "✦ Founder" : "No Pass"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4-10 名列表 */}
        <div style={{ background: C.bgCard, border: `0.5px solid ${C.borderSubtle}`, borderRadius: 16, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "60px 1fr 1fr 80px 100px", gap: 16, padding: "14px 24px", borderBottom: `0.5px solid ${C.borderSubtle}` }}>
            {["Rank", "暱稱", "交易量", "VIP", "Founder Pass"].map((h) => (
              <div key={h} style={{ fontSize: 10, color: C.textMuted, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: F.body }}>{h}</div>
            ))}
          </div>
          {rest.map((m, i) => {
            return (
              <div
                key={m.uid}
                style={{ display: "grid", gridTemplateColumns: "60px 1fr 1fr 80px 100px", gap: 16, padding: "16px 24px", borderBottom: i < rest.length - 1 ? `0.5px solid ${C.borderSubtle}` : "none", alignItems: "center", transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.background = C.bgCardHover)}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <div style={{ fontFamily: F.mono, fontSize: 16, fontWeight: 700, color: C.textMuted }}>#{m.rank}</div>
                <div>
                  <div style={{ fontFamily: F.display, fontSize: 18, fontWeight: 400, color: C.textPrimary, marginBottom: 2 }}>{m.name}</div>
                </div>
                <div>
                  <div style={{ fontFamily: F.mono, fontSize: 16, fontWeight: 700, color: m.tradingVolume > 0 ? C.textPrimary : C.textMuted }}>{formatVolume(m.tradingVolume)}</div>
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: vipColors[m.vip], background: `${vipColors[m.vip]}20`, border: `1px solid ${vipColors[m.vip]}60`, padding: "5px 12px", borderRadius: 20, fontFamily: F.body, display: "inline-block" }}>
                  <span style={{ marginRight: 4 }}>{vipIcon[m.vip]}</span>{m.vip}
                </span>
                <span style={{ fontSize: 11, color: m.founderPass ? "#5ea96e" : C.textMuted, fontFamily: F.body }}>
                  {m.founderPass ? "✦ Founder" : "—"}
                </span>
              </div>
            );
          })}
        </div>

        {/* 說明 */}
        <div style={{ background: "rgba(201,168,76,0.04)", border: `0.5px solid ${C.borderSubtle}`, borderRadius: 10, padding: "12px 20px", fontSize: 12, color: C.textMuted, fontFamily: F.body, lineHeight: 1.7 }}>
          ✦ 排行榜數據每月更新 · 交易量來自綁定 UID 的 Bybit 返佣資料 · Founder Pass 狀態以購買記錄為準
        </div>

        <div style={{ height: 8 }} />
      </div>
    </Layout>
  );
}
