"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { members, FOUNDER_CONFIG } from "@/data/members";
import type { Member } from "@/data/members";

const UID_KEY = "monstore_uid";

// ─── VIP tier colors ───────────────────────────────────────────────────────
const TIER_ORDER = ["Normal", "Silver", "Gold", "Diamond"] as const;
const TIER_COLORS: Record<string, string> = {
  Normal: "#8a8578", Silver: "#a8b8c8", Gold: "#C9A84C", Diamond: "#b0e0ff",
};

// ─── VIP progress bar calculation ─────────────────────────────────────────
function getProgressInfo(vip: string, vol: number): { progressPct: number; currentLabel: string; targetLabel: string; isMax: boolean } {
  switch (vip) {
    case "Diamond": return { progressPct: 100, currentLabel: formatVol(vol), targetLabel: "",      isMax: true  };
    case "Gold":    return { progressPct: Math.min(99, Math.round(((vol - 1_000_000) / (5_000_000 - 1_000_000)) * 100)), currentLabel: formatVol(vol), targetLabel: "$5M",   isMax: false };
    case "Silver":  return { progressPct: Math.min(99, Math.round(((vol -   300_000) / (1_000_000 -   300_000)) * 100)), currentLabel: formatVol(vol), targetLabel: "$1M",   isMax: false };
    default:        return { progressPct: Math.min(99, Math.max(0, Math.round(((vol - 50_000) / (300_000 - 50_000)) * 100))), currentLabel: formatVol(vol), targetLabel: "$300K", isMax: false };
  }
}

function formatVol(v: number): string {
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(2)}M`;
  if (v >= 1_000)     return `$${(v / 1_000).toFixed(1)}K`;
  return `$${v.toLocaleString()}`;
}

// ─── Style constants ───────────────────────────────────────────────────────
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

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 10, letterSpacing: 3, color: C.textMuted, textTransform: "uppercase", marginBottom: 16, fontFamily: F.body }}>
      {children}
    </div>
  );
}

// ─── MemberCard ────────────────────────────────────────────────────────────
function MemberCard({ member }: { member: Member }) {
  const tierColor = TIER_COLORS[member.vip] ?? C.gold;
  const fp        = member.founderPass;

  return (
    <div style={{ background: "linear-gradient(135deg, #1a1508 0%, #0e0e12 40%, #0a0a0b 100%)", border: `0.5px solid ${C.borderMid}`, borderRadius: 16, padding: 32, position: "relative", overflow: "hidden", minHeight: 240, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div style={{ fontFamily: F.display, fontSize: 22, fontWeight: 300, color: C.goldLight, letterSpacing: 2 }}>Monstore</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {fp && (
              <span style={{ background: "rgba(201,168,76,0.15)", border: `0.5px solid ${C.borderStrong}`, color: C.gold, fontSize: 9, letterSpacing: 1.5, padding: "4px 10px", borderRadius: 20, textTransform: "uppercase", fontWeight: 500 }}>◈ Founder</span>
            )}
            <span style={{ fontFamily: F.display, fontSize: 13, fontWeight: 600, color: tierColor, letterSpacing: 2 }}>{member.vip.toUpperCase()}</span>
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <div style={{ width: 36, height: 28, background: "linear-gradient(135deg, #c9a84c, #7a6130)", borderRadius: 5, marginBottom: 20 }} />
          <div style={{ fontFamily: F.display, fontSize: 26, fontWeight: 400, color: C.textPrimary, letterSpacing: 0.5 }}>{member.name}</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 28, marginTop: 24, flexWrap: "wrap" }}>
        {[
          { label: "UID",          value: member.uid },
          { label: "Trading Vol",  value: member.tradingVolumeDisplay },
          { label: "Points",       value: member.points },
          { label: "Rank",         value: `#${member.tradingRank}` },
          { label: "Member Since", value: member.memberSince },
        ].map((s) => (
          <div key={s.label}>
            <div style={{ fontSize: 9, letterSpacing: 2, color: C.textMuted, textTransform: "uppercase", marginBottom: 4, fontFamily: F.body }}>{s.label}</div>
            <div style={{ fontFamily: F.mono, fontSize: 13, fontWeight: 700, color: C.goldLight }}>{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── VIPProgress ───────────────────────────────────────────────────────────
function VIPProgress({ member }: { member: Member }) {
  const tierColor   = TIER_COLORS[member.vip] ?? C.gold;
  const tierIndex   = TIER_ORDER.indexOf(member.vip as typeof TIER_ORDER[number]);
  const { progressPct, currentLabel, targetLabel, isMax } = getProgressInfo(member.vip, member.tradingVolume);

  return (
    <div style={{ background: C.bgCard, border: `0.5px solid ${C.borderSubtle}`, borderRadius: 16, padding: 28, display: "flex", flexDirection: "column", gap: 20, minHeight: 240 }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(201,168,76,0.1)", border: `0.5px solid ${C.borderMid}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🏆</div>
          <div>
            <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: F.body }}>目前等級</div>
            <div style={{ fontFamily: F.display, fontSize: 18, fontWeight: 500, color: tierColor, letterSpacing: 1 }}>{member.vip} Membership</div>
          </div>
        </div>
        {/* Tier dots */}
        <div style={{ display: "flex", gap: 6 }}>
          {TIER_ORDER.map((t, i) => (
            <div key={t} title={t} style={{ height: 4, width: 28, borderRadius: 2, background: i < tierIndex ? TIER_COLORS[t] : i === tierIndex ? `linear-gradient(90deg, ${TIER_COLORS[t]}, ${TIER_COLORS[t]}88)` : "rgba(255,255,255,0.05)", border: `0.5px solid ${i <= tierIndex ? TIER_COLORS[t] : "transparent"}`, transition: "all 0.3s" }} />
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
          <div style={{ fontSize: 12, color: C.textSecondary, fontFamily: F.body }}>
            {isMax
              ? <>已達最高 <strong style={{ color: tierColor }}>Diamond</strong> 等級 ✓</>
              : <>距離下一等級 <strong style={{ color: TIER_COLORS[TIER_ORDER[tierIndex + 1]] }}>{targetLabel}</strong></>
            }
          </div>
          <span style={{ fontFamily: F.mono, fontSize: 12, color: C.gold }}>{progressPct}%</span>
        </div>
        <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 4, height: 6, overflow: "hidden" }}>
          <div style={{ height: "100%", background: `linear-gradient(90deg, ${C.goldDim}, ${tierColor})`, borderRadius: 4, width: `${progressPct}%`, transition: "width 1s ease" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.textMuted, fontFamily: F.mono, marginTop: 8 }}>
          <span>目前 {currentLabel}</span>
          {!isMax && <span>目標 {targetLabel}</span>}
        </div>
      </div>

      {/* Rank + Points + VIP */}
      <div style={{ borderTop: `0.5px solid ${C.borderSubtle}`, paddingTop: 16, display: "flex", gap: 28 }}>
        {[
          { label: "Trading Rank", value: `#${member.tradingRank}`, color: C.goldLight },
          { label: "Points (USDT)", value: member.points,          color: C.goldLight },
          { label: "VIP Tier",     value: member.vip,              color: tierColor   },
        ].map((s) => (
          <div key={s.label}>
            <div style={{ fontSize: 9, letterSpacing: 2, color: C.textMuted, textTransform: "uppercase", marginBottom: 4, fontFamily: F.body }}>{s.label}</div>
            <div style={{ fontFamily: F.mono, fontSize: 18, fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── StatCards ─────────────────────────────────────────────────────────────
function StatCards({ member }: { member: Member }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const fp  = member.founderPass;
  const cfg = fp ? FOUNDER_CONFIG[fp] : null;

  const stats = [
    { label: "Trading Volume", value: member.tradingVolumeDisplay,                    change: "累計交易量",                                   up: member.tradingVolume > 0, icon: "📈" },
    { label: "Trading Rank",   value: `#${member.tradingRank}`,                       change: "全會員排名",                                     up: true,                     icon: "⬡"  },
    { label: "Points (USDT)",  value: member.points,                                  change: "等於返佣 USDT",                                up: parseFloat(member.points) > 0, icon: "✦" },
    { label: "Founder Pass",   value: fp ?? "—",                                      change: cfg ? `${cfg.units.toLocaleString()} Units` : "無 Pass", up: !!fp,          icon: "💎" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="grid-4">
      {stats.map((s, i) => (
        <div key={s.label} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} style={{ background: hovered === i ? C.bgCardHover : C.bgCard, border: `0.5px solid ${hovered === i ? C.borderMid : C.borderSubtle}`, borderRadius: 12, padding: 20, transition: "all 0.25s ease", transform: hovered === i ? "translateY(-2px)" : "none", cursor: "default", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)", opacity: hovered === i ? 1 : 0, transition: "opacity 0.25s" }} />
          <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(201,168,76,0.08)", border: `0.5px solid ${C.borderSubtle}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, marginBottom: 14 }}>{s.icon}</div>
          <div style={{ fontSize: 11, color: C.textMuted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6, fontFamily: F.body }}>{s.label}</div>
          <div style={{ fontFamily: F.mono, fontSize: 22, fontWeight: 700, color: C.textPrimary, lineHeight: 1, marginBottom: 6 }}>{s.value}</div>
          <div style={{ fontSize: 11, color: s.up ? "#5ea96e" : C.textMuted }}>{s.up ? "▲" : "◎"} {s.change}</div>
        </div>
      ))}
    </div>
  );
}

// ─── CouponPanel ────────────────────────────────────────────────────────────
// 每個 VIP 等級每月可兌換的折價券數量上限
const COUPON_QUOTA: Record<string, { c250: number; c500: number }> = {
  Normal:  { c250: 1, c500: 0 },
  Silver:  { c250: 2, c500: 1 },
  Gold:    { c250: 3, c500: 2 },
  Diamond: { c250: 5, c500: 3 },
};

function BenefitsPanel({ member }: { member: Member }) {
  const quota = COUPON_QUOTA[member.vip] ?? COUPON_QUOTA["Normal"];
  // mock: 假設已使用 0 張（實際應從訂單紀錄計算）
  const used250 = 0;
  const used500 = 0;
  const remain250 = Math.max(0, quota.c250 - used250);
  const remain500 = Math.max(0, quota.c500 - used500);

  const tierColor = TIER_COLORS[member.vip] ?? C.gold;

  const coupons = [
    {
      name: "NT$250 折價券",
      desc: "低消 NT$1,000 適用",
      pts: 200,
      quota: quota.c250,
      remain: remain250,
      available: quota.c250 > 0,
    },
    {
      name: "NT$500 折價券",
      desc: "低消 NT$2,000 適用",
      pts: 350,
      quota: quota.c500,
      remain: remain500,
      available: quota.c500 > 0,
    },
  ];

  return (
    <div style={{ background: C.bgCard, border: `0.5px solid ${C.borderSubtle}`, borderRadius: 16, padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
        <div style={{ fontFamily: F.display, fontSize: 17, fontWeight: 500, color: C.textPrimary, letterSpacing: 0.5 }}>優惠券</div>
        <span style={{ fontSize: 10, color: tierColor, background: "rgba(201,168,76,0.08)", border: `0.5px solid ${C.borderMid}`, padding: "3px 10px", borderRadius: 20, fontFamily: F.body, letterSpacing: 1 }}>{member.vip} 方案</span>
      </div>
      <div style={{ fontSize: 11, color: C.textMuted, fontFamily: F.body, marginBottom: 18 }}>本月可兌換數量（依 VIP 等級）</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {coupons.map((c) => (
          <div key={c.name} style={{ background: c.available ? "rgba(201,168,76,0.04)" : "rgba(255,255,255,0.02)", border: `0.5px solid ${c.available ? C.borderMid : C.borderSubtle}`, borderRadius: 10, padding: "14px 16px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: c.available ? C.textPrimary : C.textMuted, fontFamily: F.body }}>{c.name}</div>
                <div style={{ fontSize: 11, color: C.textMuted, fontFamily: F.body, marginTop: 2 }}>{c.desc} · {c.pts} pts</div>
              </div>
              {c.available ? (
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: F.mono, fontSize: 22, fontWeight: 700, color: remain250 > 0 || c.name.includes("500") && remain500 > 0 ? C.goldLight : C.textMuted, lineHeight: 1 }}>{c.remain}</div>
                  <div style={{ fontSize: 10, color: C.textMuted, fontFamily: F.body, marginTop: 2 }}>/ {c.quota} 張剩餘</div>
                </div>
              ) : (
                <span style={{ fontSize: 10, color: C.textMuted, background: "rgba(255,255,255,0.03)", border: `0.5px solid ${C.borderSubtle}`, padding: "3px 10px", borderRadius: 4, fontFamily: F.body }}>需升級 Silver+</span>
              )}
            </div>
            {c.available && (
              <div style={{ height: 4, background: "rgba(255,255,255,0.04)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${(c.remain / c.quota) * 100}%`, background: `linear-gradient(90deg, ${C.goldDim}, ${C.gold})`, borderRadius: 2, transition: "width 0.5s ease" }} />
              </div>
            )}
          </div>
        ))}
      </div>
      <a href="/marketplace" style={{ display: "block", marginTop: 14, fontSize: 11, color: C.gold, fontFamily: F.body, textDecoration: "none", textAlign: "right" }}>前往商城兌換 →</a>
    </div>
  );
}

// ─── Marketplace ───────────────────────────────────────────────────────────
const products = [
  { name: "NT$250 折價券",      desc: "低消 NT$1,000 適用，每筆訂單限用一張", price: "200 pts",   tag: "折價券",      icon: "🎟️", isFounderPass: false, founderTier: null },
  { name: "NT$500 折價券",      desc: "低消 NT$2,000 適用，每筆訂單限用一張", price: "350 pts",   tag: "折價券",      icon: "🎫", isFounderPass: false, founderTier: null },
  { name: "30cm Type-C 充電線", desc: "Type-C to Type-C，30cm 短線，編織材質", price: "200 pts",   tag: "配件",        icon: "🔌", isFounderPass: false, founderTier: null },
  { name: "20W 充電頭",         desc: "GaN 20W 快充，支援 PD 快充協議",        price: "500 pts",   tag: "配件",        icon: "🔋", isFounderPass: false, founderTier: null },
  { name: "N Founder Pass",     desc: "20 Reward Units，永久 Founder 權益",    price: "6,000 pts", tag: "Founder Pass", icon: "◆", isFounderPass: true,  founderTier: "N"  },
  { name: "O Founder Pass",     desc: "70 Reward Units，永久 Founder 權益",    price: "20,000 pts",tag: "Founder Pass", icon: "◆", isFounderPass: true,  founderTier: "O"  },
];

function Marketplace() {
  const [hov, setHov] = useState<number | null>(null);
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ fontFamily: F.display, fontSize: 22, fontWeight: 300, color: C.textPrimary, letterSpacing: 0.5 }}>會員專屬商城</div>
        <a href="/marketplace" style={{ fontSize: 12, color: C.gold, cursor: "pointer", textDecoration: "none" }}>瀏覽全部商品 →</a>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="grid-3">
        {products.map((p, i) => (
          <div key={p.name} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
            style={{ background: C.bgCard, border: `0.5px solid ${hov === i ? C.borderMid : C.borderSubtle}`, borderRadius: 12, overflow: "hidden", transition: "all 0.25s ease", transform: hov === i ? "translateY(-2px)" : "none", cursor: "pointer" }}>
            {/* Image area */}
            <div style={{ height: 130, background: p.isFounderPass ? "linear-gradient(135deg, #1a1508, #0e0e12)" : "linear-gradient(135deg, #111116, #1a1a22)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: p.isFounderPass ? 6 : 0, borderBottom: `0.5px solid ${C.borderSubtle}`, position: "relative" }}>
              {p.isFounderPass ? (
                <>
                  <svg width="96" height="40" viewBox="0 0 96 40" fill="none">
                    <defs>
                      <linearGradient id={`tg_${i}`} x1="0" y1="0" x2="96" y2="40" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#F5E070"/>
                        <stop offset="45%" stopColor="#E8C96A"/>
                        <stop offset="100%" stopColor="#B08020"/>
                      </linearGradient>
                    </defs>
                    <path d="M5,0 H91 Q96,0 96,5 V13 A6,6 0 0,0 96,27 V35 Q96,40 91,40 H5 Q0,40 0,35 V27 A6,6 0 0,1 0,13 V5 Q0,0 5,0 Z" fill={`url(#tg_${i})`}/>
                    <path d="M5,0 H91 Q96,0 96,5 V13 A6,6 0 0,0 96,27 V35 Q96,40 91,40 H5 Q0,40 0,35 V27 A6,6 0 0,1 0,13 V5 Q0,0 5,0 Z" fill="none" stroke="rgba(255,245,180,0.5)" strokeWidth="0.6"/>
                    {Array.from({length:10}).map((_,k)=><rect key={k} x={13+k*7} y={19} width={4} height={1.5} fill="rgba(80,50,5,0.3)" rx={0.5}/>)}
                    <text x="48" y="14" textAnchor="middle" fontFamily="'Cormorant Garamond',Georgia,serif" fontSize="9" fontWeight="600" fill="rgba(55,35,5,0.8)" letterSpacing="3">FOUNDER</text>
                    <text x="48" y="30" textAnchor="middle" fontFamily="'DM Sans',system-ui,sans-serif" fontSize="7" fill="rgba(55,35,5,0.6)" letterSpacing="2">MEMBERSHIP</text>
                  </svg>
                  <span style={{ fontFamily: F.mono, fontSize: 11, fontWeight: 700, color: "#E8C96A", letterSpacing: 2 }}>{p.founderTier} ACCESS</span>
                </>
              ) : (
                <span style={{ fontSize: 44 }}>{p.icon}</span>
              )}
              <div style={{ position: "absolute", top: 8, left: 8, background: p.isFounderPass ? "rgba(232,201,106,0.2)" : "rgba(201,168,76,0.12)", border: `0.5px solid ${p.isFounderPass ? C.borderStrong : C.borderMid}`, color: p.isFounderPass ? C.goldLight : C.gold, fontSize: 9, letterSpacing: 1.5, padding: "3px 8px", borderRadius: 4, textTransform: "uppercase" }}>{p.tag}</div>
            </div>
            {/* Info */}
            <div style={{ padding: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: C.textPrimary, marginBottom: 4, fontFamily: F.body }}>{p.name}</div>
              <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 10, fontFamily: F.body }}>{p.desc}</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ fontFamily: F.mono, fontSize: 13, fontWeight: 700, color: C.goldLight }}>{p.price}</div>
                <button style={{ fontSize: 11, color: C.gold, background: "rgba(201,168,76,0.08)", border: `0.5px solid ${C.borderMid}`, padding: "5px 12px", borderRadius: 6, cursor: "pointer", fontFamily: F.body }}>
                  立即兌換
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── FounderPass ───────────────────────────────────────────────────────────
function FounderPass({ member }: { member: Member }) {
  const fp  = member.founderPass;
  const cfg = fp ? FOUNDER_CONFIG[fp] : null;

  // No Pass
  if (!fp) {
    return (
      <div style={{ background: "linear-gradient(135deg, #0f0d07 0%, #0a0a0b 60%, #0d0d12 100%)", border: `0.5px solid ${C.borderSubtle}`, borderRadius: 16, padding: 32, display: "flex", alignItems: "center", gap: 28 }}>
        <svg width={114} height={60} viewBox="0 0 114 60" fill="none">
          <path d="M 5,0 H 109 Q 114,0 114,5 V 20 A 10,10 0 0,0 114,40 V 55 Q 114,60 109,60 H 5 Q 0,60 0,55 V 40 A 10,10 0 0,1 0,20 V 5 Q 0,0 5,0 Z" fill="rgba(60,50,20,0.25)"/>
          <path d="M 5,0 H 109 Q 114,0 114,5 V 20 A 10,10 0 0,0 114,40 V 55 Q 114,60 109,60 H 5 Q 0,60 0,55 V 40 A 10,10 0 0,1 0,20 V 5 Q 0,0 5,0 Z" fill="none" stroke="rgba(201,168,76,0.18)" strokeWidth="0.75"/>
          <text x="57" y="22" textAnchor="middle" fontFamily="'Cormorant Garamond',Georgia,serif" fontSize="13" fontWeight="600" fill="rgba(201,168,76,0.25)" letterSpacing="3">FOUNDER</text>
          <text x="57" y="44" textAnchor="middle" fontFamily="'DM Sans',system-ui,sans-serif" fontSize="7" fontWeight="500" fill="rgba(201,168,76,0.18)" letterSpacing="2">MEMBERSHIP</text>
        </svg>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: F.display, fontSize: 22, fontWeight: 300, color: C.textMuted, letterSpacing: 1, marginBottom: 6 }}>No Founder Pass</div>
          <div style={{ fontSize: 13, color: C.textMuted, fontFamily: F.body, marginBottom: 20 }}>此會員尚未持有任何 Founder Pass</div>
          <a href="/founder" style={{ background: `linear-gradient(135deg, ${C.goldDim}, #5a4520)`, border: `0.5px solid ${C.gold}`, color: C.goldLight, padding: "10px 24px", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: F.body, letterSpacing: 0.5, textDecoration: "none", display: "inline-block" }}>了解 Founder Membership →</a>
        </div>
      </div>
    );
  }

  // Has Pass
  const dynamicBenefits = [
    { icon: "◈", name: "永久 VIP",                              desc: "無論月交易量，永遠鎖定 Founder 等級" },
    { icon: "⟐", name: "專屬存取權",                            desc: "私人訊號頻道、優先搶購、Alpha 群組" },
    { icon: "◎", name: `${cfg!.units.toLocaleString()} Reward Units`, desc: "參與 Monthly Reward Pool 月回饋分配" },
  ];

  return (
    <div style={{ background: "linear-gradient(135deg, #0f0d07 0%, #0a0a0b 60%, #0d0d12 100%)", border: `0.5px solid ${C.borderMid}`, borderRadius: 16, padding: 32, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -60, right: -60, width: 260, height: 260, background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28, position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width={114} height={60} viewBox="0 0 114 60" fill="none">
            <defs>
              <linearGradient id="fp_gt" x1="0" y1="0" x2="114" y2="60" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#F5E070"/><stop offset="45%" stopColor="#E8C96A"/><stop offset="100%" stopColor="#B08020"/>
              </linearGradient>
              <linearGradient id="fp_shine" x1="0" y1="0" x2="0" y2="60" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="rgba(255,255,255,0.22)"/><stop offset="60%" stopColor="rgba(255,255,255,0)"/>
              </linearGradient>
            </defs>
            <path d="M 5,0 H 109 Q 114,0 114,5 V 20 A 10,10 0 0,0 114,40 V 55 Q 114,60 109,60 H 5 Q 0,60 0,55 V 40 A 10,10 0 0,1 0,20 V 5 Q 0,0 5,0 Z" fill="url(#fp_gt)"/>
            <path d="M 5,0 H 109 Q 114,0 114,5 V 20 A 10,10 0 0,0 114,40 V 55 Q 114,60 109,60 H 5 Q 0,60 0,55 V 40 A 10,10 0 0,1 0,20 V 5 Q 0,0 5,0 Z" fill="url(#fp_shine)"/>
            <path d="M 5,0 H 109 Q 114,0 114,5 V 20 A 10,10 0 0,0 114,40 V 55 Q 114,60 109,60 H 5 Q 0,60 0,55 V 40 A 10,10 0 0,1 0,20 V 5 Q 0,0 5,0 Z" fill="none" stroke="rgba(255,245,180,0.5)" strokeWidth="0.75"/>
            {[14,21,28,35,42,49,56,63,70,77,84,91,98].map((x, i) => <rect key={i} x={x} y={29.25} width={4} height={1.5} fill="rgba(80,50,5,0.3)" rx={0.5}/>)}
            <text x="57" y="22" textAnchor="middle" fontFamily="'Cormorant Garamond',Georgia,serif" fontSize="13" fontWeight="600" fill="rgba(55,35,5,0.8)" letterSpacing="3">FOUNDER</text>
            <text x="57" y="44" textAnchor="middle" fontFamily="'DM Sans',system-ui,sans-serif" fontSize="7" fontWeight="500" fill="rgba(55,35,5,0.6)" letterSpacing="2">MEMBERSHIP</text>
          </svg>
          <div>
            <div style={{ fontFamily: F.display, fontSize: 13, color: C.gold, letterSpacing: 4, textTransform: "uppercase", marginBottom: 8 }}>Founder Membership</div>
            <div style={{ fontFamily: F.display, fontSize: 26, fontWeight: 300, color: C.textPrimary, letterSpacing: 1, marginBottom: 6 }}>Pass · {fp}</div>
            <div style={{ fontSize: 12, color: C.textMuted, letterSpacing: 0.5, fontFamily: F.body }}>Reward Weight · Monthly Reward Pool · Ecosystem Growth</div>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: F.display, fontSize: 36, fontWeight: 300, color: C.gold, lineHeight: 1 }}>{cfg!.units.toLocaleString()}</div>
          <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 2, textTransform: "uppercase", marginTop: 4, fontFamily: F.body }}>Reward Units</div>
          <div style={{ fontFamily: F.mono, fontSize: 13, color: C.goldLight, marginTop: 6 }}>${cfg!.price.toLocaleString()}</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, position: "relative", zIndex: 1 }}>
        {dynamicBenefits.map((b) => (
          <div key={b.name} style={{ background: "rgba(255,255,255,0.02)", border: `0.5px solid ${C.borderSubtle}`, borderRadius: 10, padding: 16 }}>
            <span style={{ fontSize: 20, marginBottom: 10, color: C.gold, display: "block" }}>{b.icon}</span>
            <div style={{ fontSize: 12.5, fontWeight: 500, color: C.textPrimary, marginBottom: 4, fontFamily: F.body }}>{b.name}</div>
            <div style={{ fontSize: 11, color: C.textMuted, lineHeight: 1.5, fontFamily: F.body }}>{b.desc}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 24, position: "relative", zIndex: 1 }}>
        <a href="/founder" style={{ background: `linear-gradient(135deg, ${C.goldDim}, #5a4520)`, border: `0.5px solid ${C.gold}`, color: C.goldLight, padding: "11px 28px", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: F.body, letterSpacing: 0.5, textDecoration: "none", display: "inline-block" }}>了解 Founder Membership →</a>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [member, setMember] = useState<Member | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const uid = localStorage.getItem(UID_KEY);
    if (!uid) { setMember(null); setNotFound(false); return; }
    const found = members.find((m) => m.uid === uid);
    if (found) { setMember(found); setNotFound(false); }
    else       { setMember(null); setNotFound(true);  }
  }, []);

  return (
    <Layout activePath="/dashboard" title="Dashboard">
      <div style={{ display: "flex", flexDirection: "column", gap: 32, maxWidth: 1400 }}>

        {/* 未帶 UID 提示 */}
        {!member && !notFound && (
          <div style={{ padding: "16px 20px", background: "rgba(201,168,76,0.04)", border: `0.5px solid ${C.borderSubtle}`, borderRadius: 10, fontFamily: F.body, fontSize: 13, color: C.textMuted }}>
            ← 請先前往 <a href="/member" style={{ color: C.gold, textDecoration: "none" }}>Member Access</a> 頁面輸入 UID 查詢會員資料
          </div>
        )}

        {/* 找不到 */}
        {notFound && (
          <div style={{ padding: "16px 20px", background: "rgba(201,96,96,0.06)", border: "0.5px solid rgba(201,96,96,0.28)", borderRadius: 10, fontFamily: F.mono, fontSize: 13, color: "#c96060" }}>
            ✕ Member not found — 查無此 UID 資料
          </div>
        )}

        {/* Dashboard 主體 */}
        {member && (
          <>
            <div>
              <SectionLabel>會員總覽</SectionLabel>
              <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 24, alignItems: "start" }} className="grid-2">
                <MemberCard member={member} />
                <VIPProgress member={member} />
              </div>
            </div>

            <div>
              <SectionLabel>交易統計</SectionLabel>
              <StatCards member={member} />
            </div>

            <div>
              <SectionLabel>獎勵與權益</SectionLabel>
              <BenefitsPanel member={member} />
            </div>

            <div>
              <SectionLabel>商城預覽</SectionLabel>
              <Marketplace />
            </div>

            <div>
              <SectionLabel>Founder Pass</SectionLabel>
              <FounderPass member={member} />
            </div>
          </>
        )}

        <div style={{ height: 8 }} />
      </div>
    </Layout>
  );
}
