"use client";
import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import {
  members,
  FOUNDER_CONFIG,
  FOUNDER_TIERS,
  REWARD_POOL_RATE,
  FOUNDER_RELEASE_RATE,
  capAmount,
  monthlyReward,
} from "@/data/members";
import type { Member, FounderTierConfig } from "@/data/members";
import {
  CAP_NOTE,
  SCENARIO_TIER,
  SCENARIO_REVENUES,
  SCENARIO_CIRCULATING_UNITS,
  SCENARIO_NOTE,
  GIFT_INTRO,
  GIFT_ITEMS,
  GIFT_NOTE,
  FOUNDER_TERMS,
} from "@/data/founderContent";

const UID_KEY = "monstore_uid";

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

// 解析 founderPass 字串為各等級持有數量
// 支援格式："Lu" / "Lu,M" / "Lu,Lu,M" 等多張
function parseFounderPasses(fp: string | null | undefined): Record<string, number> {
  if (!fp) return {};
  const counts: Record<string, number> = {};
  fp.split(",").map(s => s.trim()).filter(Boolean).forEach(tier => {
    counts[tier] = (counts[tier] || 0) + 1;
  });
  return counts;
}

function totalFounderUnits(fp: string | null | undefined): number {
  const counts = parseFounderPasses(fp);
  return Object.entries(counts).reduce((sum, [tier, qty]) => {
    const cfg = FOUNDER_CONFIG[tier];
    return sum + (cfg ? cfg.rewardUnits * qty : 0);
  }, 0);
}

// 各級距僅在此定義視覺樣式，數值一律取自 FOUNDER_CONFIG
const TIER_STYLE: Record<string, { label: string; color: string; colorDim: string; colorBorder: string }> = {
  Lu: { label: "Lu Access", color: "#E8C96A", colorDim: "rgba(232,201,106,0.12)", colorBorder: "rgba(232,201,106,0.35)" },
  M:  { label: "M Access",  color: "#C9A84C", colorDim: "rgba(201,168,76,0.12)",  colorBorder: "rgba(201,168,76,0.3)"  },
  O:  { label: "O Access",  color: "#a8a9ad", colorDim: "rgba(168,169,173,0.1)",  colorBorder: "rgba(168,169,173,0.25)" },
  N:  { label: "N Access",  color: "#cd7f32", colorDim: "rgba(205,127,50,0.1)",   colorBorder: "rgba(205,127,50,0.25)" },
};

const benefits = [
  {
    icon: "◈", name: "永久 VIP",
    desc: "無論月交易量多寡，永遠鎖定最高會員等級，不受升降級影響。",
    detail: "一般會員每月需達到交易量門檻才能維持等級，Lu Membership 持有者永久豁免此限制。",
  },
  {
    icon: "⟐", name: "專屬存取權",
    desc: "私人訊號頻道、產品優先搶購資格、Alpha 測試群組邀請。",
    detail: "包含每週市場分析報告、新功能 Beta 測試優先資格、線下活動優先入場。",
  },
  {
    icon: "◎", name: "專屬客戶經理",
    desc: "分配個人帳戶經理，24/7 直線聯繫，優先處理所有問題。",
    detail: "客戶經理將在 2 小時內回覆所有請求，提供專屬優化建議與帳戶分析報告。",
  },
];

const faqs = [
  { q: "Founder Membership 是 NFT 嗎？", a: "不是。Founder Membership 是平台會員資格憑證，與帳號綁定，不可轉讓或交易。這確保了每位成員都是真實的活躍會員。" },
  { q: "Reward Weight 等同於平台股份嗎？", a: "不是。Reward Weight（以 Units 計）代表你在 Monthly Reward Pool 中的分配比例，並非公司股權、股票或任何形式的證券。Monthly Reward Pool 來自平台後續真實營運收益。" },
  { q: "購買後可以退款嗎？", a: "Founder Membership 為一次性永久升級，購買後不提供退款。建議在購買前確認資格與權益說明。" },
  { q: "如果平台關閉，Membership 還有效嗎？", a: "平台營運期間，所有 Founder Membership 權益永久有效。我們承諾在任何重大變更前至少提前 180 天通知所有成員。" },
  { q: "名額售完後還能取得嗎？", a: "Genesis Release 採嚴格限量，售完即止。未來不排除特殊活動贈送，但不會額外銷售。" },
  { q: "會員購買的金額會進入 Monthly Reward Pool 嗎？", a: "不會。會員購買 Membership / Reward Weight 的收入屬於平台發展資金，用於營運、Treasury、開發與社群建設，不列入當月 Monthly Reward Pool 分配。" },
];

const poolMembers = [
  { nickname: "Chinglu", tier: "Lu", units: 1290, lastAirdrop: "NT$4,128", color: "#E8C96A", colorDim: "rgba(232,201,106,0.15)", colorGlow: "rgba(232,201,106,0.4)" },
  { nickname: "Rex",     tier: "M",  units: 240,  lastAirdrop: "NT$768",   color: "#C9A84C", colorDim: "rgba(201,168,76,0.12)",  colorGlow: "rgba(201,168,76,0.3)"  },
  { nickname: "Yuki",    tier: "M",  units: 240,  lastAirdrop: "NT$768",   color: "#C9A84C", colorDim: "rgba(201,168,76,0.12)",  colorGlow: "rgba(201,168,76,0.3)"  },
  { nickname: "Nana",    tier: "O",  units: 70,   lastAirdrop: "NT$224",   color: "#a8a9ad", colorDim: "rgba(168,169,173,0.1)",  colorGlow: "rgba(168,169,173,0.2)" },
  { nickname: "Marcus",  tier: "N",  units: 20,   lastAirdrop: "NT$64",    color: "#cd7f32", colorDim: "rgba(205,127,50,0.1)",   colorGlow: "rgba(205,127,50,0.2)"  },
];
function GoldenTicket({ size = 80, passId }: { size?: number; passId?: string }) {
  const w = Math.round(size * 1.9);
  const h = size;
  const cr = Math.max(5, Math.round(size * 0.085));
  const nr = Math.round(size * 0.165);
  const ny = Math.round(h / 2);
  const ticketPath = `M ${cr},0 H ${w - cr} Q ${w},0 ${w},${cr} V ${ny - nr} A ${nr},${nr} 0 0,0 ${w},${ny + nr} V ${h - cr} Q ${w},${h} ${w - cr},${h} H ${cr} Q 0,${h} 0,${h - cr} V ${ny + nr} A ${nr},${nr} 0 0,1 0,${ny - nr} V ${cr} Q 0,0 ${cr},0 Z`;
  const dashCount = Math.floor((w - 28) / 7);
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gt_main" x1="0" y1="0" x2={w} y2={h} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F5E070" />
          <stop offset="45%" stopColor="#E8C96A" />
          <stop offset="100%" stopColor="#B08020" />
        </linearGradient>
        <linearGradient id="gt_shine" x1="0" y1="0" x2="0" y2={h} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgba(255,255,255,0.22)" />
          <stop offset="60%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
      <path d={ticketPath} fill="url(#gt_main)" />
      <path d={ticketPath} fill="url(#gt_shine)" />
      <path d={ticketPath} fill="none" stroke="rgba(255,245,180,0.6)" strokeWidth="0.75" />
      {Array.from({ length: dashCount }).map((_, i) => (
        <rect key={i} x={14 + i * 7} y={ny - 0.75} width={4} height={1.5} fill="rgba(80,50,5,0.3)" rx={0.5} />
      ))}
      <text x={w / 2} y={ny - Math.round(size * 0.1)} textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize={Math.round(size * 0.2)} fontWeight="600" fill="rgba(55,35,5,0.8)" letterSpacing={Math.round(size * 0.04)}>FOUNDER</text>
      <text x={w / 2} y={ny + Math.round(size * 0.22)} textAnchor="middle" fontFamily="'DM Sans', system-ui, sans-serif" fontSize={Math.round(size * 0.1)} fontWeight="500" fill="rgba(55,35,5,0.6)" letterSpacing={Math.round(size * 0.025)}>MEMBERSHIP</text>
      {([[cr + 5, cr + 5], [w - cr - 5, cr + 5], [cr + 5, h - cr - 5], [w - cr - 5, h - cr - 5]] as [number,number][]).map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={1.5} fill="rgba(55,35,5,0.2)" />
      ))}
      {passId && (
        <text x={w - cr - 8} y={ny + Math.round(size * 0.22)} textAnchor="end" fontFamily="'Space Mono', monospace" fontSize={Math.round(size * 0.09)} fill="rgba(55,35,5,0.45)">{passId}</text>
      )}
    </svg>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 12, letterSpacing: 3, color: C.textMuted, textTransform: "uppercase", marginBottom: 16, fontFamily: F.body }}>
      {children}
    </div>
  );
}

function HeroBanner({ member }: { member: Member | null }) {
  return (
    <div style={{ background: "linear-gradient(135deg, #1a1508 0%, #0e0e12 50%, #0a0a0b 100%)", border: `0.5px solid ${C.borderMid}`, borderRadius: 20, padding: "48px 40px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -80, left: "30%", transform: "translateX(-50%)", width: 400, height: 400, background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 20, right: 20, fontSize: 12, color: C.textMuted, letterSpacing: 2, fontFamily: F.body, textTransform: "uppercase" }}>Phase One</div>

      {/* 左右並排 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>

        {/* 左側：原有 hero 內容 */}
        <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ marginBottom: 20, display: "flex", justifyContent: "center" }}>
            <GoldenTicket size={72} />
          </div>
          <div style={{ fontFamily: F.display, fontSize: 16, fontWeight: 400, color: C.gold, letterSpacing: 4, marginBottom: 12, textTransform: "uppercase" }}>Founder Membership</div>
          <div style={{ fontFamily: F.display, fontSize: 46, fontWeight: 300, color: C.textPrimary, letterSpacing: 2, marginBottom: 8 }}>
            Lu · M · O · N
          </div>
          <div style={{ fontSize: 16, color: C.textMuted, fontFamily: F.body, marginBottom: 32, letterSpacing: 0.5 }}>
            Reward Weight · Monthly Reward Pool · Ecosystem Growth
          </div>

          <div style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: 24, background: "rgba(255,255,255,0.02)", border: `0.5px solid ${C.borderMid}`, borderRadius: 12, padding: "20px 32px", marginBottom: 32 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: F.display, fontSize: 44, fontWeight: 300, color: C.textSecondary, lineHeight: 1 }}>10,000</div>
              <div style={{ fontSize: 12, color: C.textMuted, letterSpacing: 2, textTransform: "uppercase", marginTop: 4, fontFamily: F.body }}>Total Future Supply</div>
            </div>
            <div style={{ width: "0.5px", height: 50, background: C.borderMid }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: F.display, fontSize: 44, fontWeight: 300, color: C.textSecondary, lineHeight: 1 }}>10%</div>
              <div style={{ fontSize: 12, color: C.textMuted, letterSpacing: 2, textTransform: "uppercase", marginTop: 4, fontFamily: F.body }}>Phase One Release</div>
            </div>
          </div>

          <div style={{ maxWidth: 400, margin: "0 auto 32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: C.textMuted, fontFamily: F.mono, marginBottom: 8 }}>
              <span>0 Units</span>
              <span style={{ color: C.gold }}>Genesis Release 開放中</span>
              <span>10,000 Units</span>
            </div>
            <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 4, height: 8, overflow: "hidden" }}>
              <div style={{ height: "100%", width: "10%", background: `linear-gradient(90deg, ${C.goldDim}, ${C.gold}, ${C.goldLight})`, borderRadius: 4 }} />
            </div>
          </div>

          {member?.founderPass ? (
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(94,169,110,0.08)", border: "0.5px solid rgba(94,169,110,0.3)", borderRadius: 10, padding: "14px 28px", flexWrap: "wrap", justifyContent: "center" }}>
              <span style={{ fontSize: 16, color: "#5ea96e" }}>✓</span>
              <span style={{ fontSize: 14, color: "#5ea96e", fontFamily: F.body, fontWeight: 500 }}>
                已持有：{Object.entries(parseFounderPasses(member.founderPass ?? undefined)).map(([tier, qty]) => `${tier} ×${qty}`).join("　")}
              </span>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
              <button style={{ background: `linear-gradient(135deg, ${C.goldDim}, #5a4520)`, border: `0.5px solid ${C.gold}`, color: C.goldLight, padding: "13px 32px", borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: F.body, letterSpacing: 0.5 }}>
                立即申請 Founder Membership
              </button>
            </div>
          )}
        </div>

        {/* 右側：泡泡圖 */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <RewardPoolBubbles />
        </div>

      </div>
    </div>
  );
}

function RewardPoolBubbles() {
  const [hov, setHov] = useState<number | null>(null);
  const totalUnits = poolMembers.reduce((s, m) => s + m.units, 0);
  const maxUnits = Math.max(...poolMembers.map(m => m.units));
  // 計算總分潤與各會員回饋總額
  const totalAirdrop = poolMembers.reduce((s, m) => {
    const num = parseInt(m.lastAirdrop.replace(/[^0-9]/g, ""), 10);
    return s + (isNaN(num) ? 0 : num);
  }, 0);

  // 泡泡大小：最大 unit 對應最大半徑 64px，最小 28px
  const getR = (units: number) => {
    const min = 28, max = 64;
    return Math.round(min + (units / maxUnits) * (max - min));
  };

  // 固定排版位置（SVG 600×300）
  const positions = [
    { x: 110, y: 130 },
    { x: 260, y: 90  },
    { x: 400, y: 120 },
    { x: 200, y: 220 },
    { x: 490, y: 220 },
  ];

  return (
    <div style={{ background: "linear-gradient(135deg, #0f0d07 0%, #0a0a0b 100%)", border: `0.5px solid rgba(201,168,76,0.2)`, borderRadius: 16, padding: 24, height: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <div style={{ fontSize: 12, letterSpacing: 3, color: "#4a4740", textTransform: "uppercase", marginBottom: 8, fontFamily: "'DM Sans', system-ui, sans-serif" }}>Reward Pool Allocation</div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 20, fontWeight: 700, color: "#E8C96A" }}>{totalUnits.toLocaleString()}</span>
              <span style={{ fontSize: 12, color: "#4a4740", fontFamily: "'DM Sans', system-ui, sans-serif" }}>Units · {poolMembers.length} Members</span>
            </div>
          </div>
          <div style={{ width: "0.5px", height: 28, background: "rgba(201,168,76,0.2)", flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: 11, color: "#4a4740", letterSpacing: 2, textTransform: "uppercase", fontFamily: "'DM Sans', system-ui, sans-serif", marginBottom: 2 }}>本月分潤池</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 20, fontWeight: 700, color: "#5ea96e" }}>NT${totalAirdrop.toLocaleString()}</span>
              <span style={{ fontSize: 12, color: "#4a4740", fontFamily: "'DM Sans', system-ui, sans-serif" }}>已分配回饋</span>
            </div>
          </div>
        </div>
      </div>

      {/* SVG 泡泡圖 */}
      <div style={{ flex: 1, position: "relative" }}>
        <svg
          viewBox="0 0 600 300"
          style={{ width: "100%", height: "auto", overflow: "visible" }}
        >
          <defs>
            {poolMembers.map((m, i) => (
              <radialGradient key={i} id={`glow_${i}`} cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor={m.color} stopOpacity="0.25" />
                <stop offset="100%" stopColor={m.color} stopOpacity="0" />
              </radialGradient>
            ))}
          </defs>

          {poolMembers.map((m, i) => {
            const r = getR(m.units);
            const { x, y } = positions[i];
            const pct = ((m.units / totalUnits) * 100).toFixed(1);
            const isHov = hov === i;
            const isLu = m.tier === "Lu";

            return (
              <g
                key={i}
                onMouseEnter={() => setHov(i)}
                onMouseLeave={() => setHov(null)}
                style={{ cursor: "pointer" }}
              >
                {/* 外圈光暈 */}
                <circle
                  cx={x} cy={y}
                  r={isHov ? r + 18 : isLu ? r + 12 : r + 6}
                  fill={`url(#glow_${i})`}
                  style={{ transition: "all 0.3s ease" }}
                />
                {/* 主泡泡 */}
                <circle
                  cx={x} cy={y} r={isHov ? r + 4 : r}
                  fill={m.colorDim}
                  stroke={m.color}
                  strokeWidth={isLu ? 1.5 : 0.75}
                  strokeOpacity={isHov ? 1 : 0.6}
                  style={{ transition: "all 0.3s ease" }}
                />
                {/* Lu 皇冠 */}
                {isLu && (
                  <text x={x} y={y - r + 14} textAnchor="middle" fontSize="14" fill={m.color}>♔</text>
                )}
                {/* 暱稱 */}
                <text
                  x={x} y={isLu ? y - 6 : y - 4}
                  textAnchor="middle"
                  fontFamily="'DM Sans', system-ui, sans-serif"
                  fontSize={isHov ? 13 : 12}
                  fontWeight="600"
                  fill={m.color}
                  style={{ transition: "all 0.3s ease" }}
                >
                  {m.nickname}
                </text>
                {/* Units */}
                <text
                  x={x} y={isLu ? y + 10 : y + 10}
                  textAnchor="middle"
                  fontFamily="'Space Mono', monospace"
                  fontSize={10}
                  fill={m.color}
                  fillOpacity={0.7}
                >
                  {m.units.toLocaleString()} u
                </text>
                {/* Hover 時顯示 % */}
                {isHov && (
                  <text
                    x={x} y={y + 24}
                    textAnchor="middle"
                    fontFamily="'Space Mono', monospace"
                    fontSize={10}
                    fill="#E8C96A"
                  >
                    {pct}% of Pool
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* 圖例列表 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {poolMembers.map((m, i) => {
          const pct = ((m.units / totalUnits) * 100).toFixed(1);
          const barW = `${(m.units / totalUnits) * 100}%`;
          return (
            <div key={i}
              onMouseEnter={() => setHov(i)}
              onMouseLeave={() => setHov(null)}
              style={{ cursor: "pointer", transition: "opacity 0.2s", opacity: hov !== null && hov !== i ? 0.4 : 1 }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: m.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: "#f0ece0", fontFamily: "'DM Sans', system-ui, sans-serif" }}>{m.nickname}</span>
                  <span style={{ fontSize: 12, color: m.color, background: m.colorDim, border: `0.5px solid ${m.color}40`, padding: "1px 6px", borderRadius: 4, fontFamily: "'DM Sans', system-ui, sans-serif" }}>{m.tier}</span>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: "#8a8578" }}>{m.units.toLocaleString()} u</span>
<span style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: "#5ea96e" }}>{m.lastAirdrop}</span>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: m.color, minWidth: 40, textAlign: "right" }}>{pct}%</span>
                </div>
              </div>
              <div style={{ height: 3, background: "rgba(255,255,255,0.04)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", width: barW, background: `linear-gradient(90deg, ${m.color}80, ${m.color})`, borderRadius: 2, transition: "opacity 0.2s" }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MyFounderStatus({ member }: { member: Member }) {
  const counts = parseFounderPasses(member.founderPass ?? undefined);
  const totalUnits = totalFounderUnits(member.founderPass ?? undefined);
  const tierEntries = Object.entries(counts); // [["Lu",1],["M",2], ...]
  const primaryTier = tierEntries[0]?.[0] ?? "N";

  return (
    <div style={{ background: "linear-gradient(135deg, #0a1208 0%, #0a0a0b 100%)", border: "0.5px solid rgba(94,169,110,0.25)", borderRadius: 16, padding: 32, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -40, right: -40, width: 260, height: 260, background: "radial-gradient(circle, rgba(94,169,110,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <GoldenTicket size={56} passId={`${primaryTier}-${member.uid.slice(-4)}`} />
        </div>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 24, fontWeight: 500, color: "#5ea96e", letterSpacing: 0.5 }}>
            Founder Membership 持有狀態
          </div>
          <div style={{ fontSize: 16, color: "#4a4740", fontFamily: "'DM Sans', system-ui, sans-serif", marginTop: 4 }}>
            累計 {totalUnits.toLocaleString()} Reward Units · 所有 Founder 權益已啟用
          </div>
        </div>
        <div style={{ marginLeft: "auto", background: "rgba(94,169,110,0.08)", border: "0.5px solid rgba(94,169,110,0.25)", borderRadius: 10, padding: "10px 20px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: "#5ea96e", letterSpacing: 2, textTransform: "uppercase", fontFamily: "'DM Sans', system-ui, sans-serif", marginBottom: 4 }}>Total Passes</div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 18, fontWeight: 700, color: "#5ea96e" }}>{tierEntries.reduce((s,[,q])=>s+q,0)}</div>
        </div>
      </div>

      {/* Per-tier pass badges */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 24 }}>
        {tierEntries.map(([tier, qty]) => (
          <div key={tier} style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(232,201,106,0.08)", border: "0.5px solid rgba(232,201,106,0.3)", borderRadius: 8, padding: "8px 16px" }}>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 14, fontWeight: 700, color: "#E8C96A" }}>{tier}</span>
            <span style={{ fontSize: 14, color: "#8a8578", fontFamily: "'DM Sans', system-ui, sans-serif" }}>×{qty}</span>
            <span style={{ fontSize: 13, color: "#4a4740", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
              ({((FOUNDER_CONFIG[tier]?.rewardUnits ?? 0) * qty).toLocaleString()} Units)
            </span>
          </div>
        ))}
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        {[
          { label: "會員名稱",     value: member.name },
          { label: "Member Since", value: member.memberSince },
          { label: "Reward Units", value: `${totalUnits.toLocaleString()} Units` },
        ].map((s) => (
          <div key={s.label} style={{ background: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(201,168,76,0.15)", borderRadius: 12, padding: "22px 24px" }}>
            <div style={{ fontSize: 12, color: "#4a4740", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12, fontFamily: "'DM Sans', system-ui, sans-serif" }}>{s.label}</div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 22, fontWeight: 700, color: "#f0ece0", lineHeight: 1 }}>{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CapBadge({ cfg, color }: { cfg: FounderTierConfig; color: string }) {
  const batchLabel = cfg.batch === "founding" ? "創始批" : "後續批次";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${color}14`, border: `0.5px solid ${color}55`, borderRadius: 6, padding: "3px 9px", fontSize: 11, fontFamily: F.body, letterSpacing: 0.5, color, whiteSpace: "nowrap", flexShrink: 0 }}>
      {batchLabel} · {cfg.capMultiple}x 上限
    </span>
  );
}

function MembershipUnits() {
  const [hov, setHov] = useState<number | null>(null);
  const releasePct = `${Math.round(FOUNDER_RELEASE_RATE * 100)}%`;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="grid-4">
        {FOUNDER_TIERS.map((t, i) => {
          const s = TIER_STYLE[t.tier];
          const cap = capAmount(t);
          return (
            <div
              key={t.tier}
              onMouseEnter={() => setHov(i)}
              onMouseLeave={() => setHov(null)}
              style={{ background: hov === i ? s.colorDim : "rgba(255,255,255,0.015)", border: `0.5px solid ${hov === i ? s.colorBorder : C.borderSubtle}`, borderRadius: 14, padding: 24, display: "flex", flexDirection: "column", gap: 16, transition: "all 0.25s ease" }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 6 }}>
                  <div style={{ fontFamily: F.display, fontSize: 32, fontWeight: 300, color: s.color, letterSpacing: 2, lineHeight: 1 }}>{t.tier}</div>
                  <CapBadge cfg={t} color={s.color} />
                </div>
                <div style={{ fontSize: 13, color: C.textMuted, fontFamily: F.body, letterSpacing: 1, textTransform: "uppercase" }}>{s.label}</div>
              </div>
              <div style={{ height: "0.5px", background: s.colorBorder }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontSize: 13, color: C.textMuted, fontFamily: F.body }}>Reward Units</span>
                  <span style={{ fontFamily: F.mono, fontSize: 20, fontWeight: 700, color: s.color }}>{t.rewardUnits.toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 13, color: C.textMuted, fontFamily: F.body }}>參考價格</span>
                  <span style={{ fontFamily: F.mono, fontSize: 14, color: C.textSecondary }}>${t.price.toLocaleString()} USDT</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 13, color: C.textMuted, fontFamily: F.body }}>總名額</span>
                  <span style={{ fontFamily: F.mono, fontSize: 14, color: C.textPrimary }}>{t.totalQuota}</span>
                </div>
                <div style={{ height: "0.5px", background: C.borderSubtle }} />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 13, color: "#5ea96e", fontFamily: F.body }}>販售中</span>
                  <span style={{ fontFamily: F.mono, fontSize: 14, fontWeight: 700, color: "#5ea96e" }}>{t.onSale}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 13, color: C.textMuted, fontFamily: F.body }}>鎖定中</span>
                  <span style={{ fontFamily: F.mono, fontSize: 14, color: C.textMuted }}>{t.locked}</span>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "8px 12px", background: `${s.color}0d`, border: `0.5px solid ${s.color}33`, borderRadius: 8 }}>
                  <span style={{ fontSize: 13, color: C.textMuted, fontFamily: F.body }}>回饋上限</span>
                  <span style={{ fontFamily: F.mono, fontSize: 14, fontWeight: 700, color: s.color }}>
                    {t.capMultiple}x · ${cap.toLocaleString()} USDT
                  </span>
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: C.textMuted, fontFamily: F.mono, marginBottom: 6 }}>
                    <span>販售中比例</span><span style={{ color: s.color }}>{releasePct}</span>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 3, height: 4, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: releasePct, background: `linear-gradient(90deg, ${s.color}80, ${s.color})`, borderRadius: 3 }} />
                  </div>
                </div>
              </div>
              <button style={{ width: "100%", padding: "10px 0", borderRadius: 8, background: `linear-gradient(135deg, ${s.color}25, ${s.color}10)`, border: `0.5px solid ${s.colorBorder}`, color: s.color, fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: F.body, letterSpacing: 0.5 }}>
                申請加入
              </button>
            </div>
          );
        })}
      </div>
      <div style={{ padding: "12px 18px", background: "rgba(201,168,76,0.04)", border: `0.5px solid ${C.borderSubtle}`, borderRadius: 8, fontSize: 13, color: C.textMuted, fontFamily: F.body, lineHeight: 1.7 }}>
        ✦ 每張 Founder Pass 之累計現金回饋以購買價的對應倍數為上限；達上限後現金回饋停止，會員權益終身保留（創始畢業成員）。{CAP_NOTE}
      </div>
    </div>
  );
}

function ScenarioTable() {
  const cfg = FOUNDER_CONFIG[SCENARIO_TIER];
  const fmt = (n: number) => `$${n.toFixed(2)}`;
  return (
    <div style={{ background: C.bgCard, border: `0.5px solid ${C.borderSubtle}`, borderRadius: 16, padding: 32 }} className="content-pad">
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: F.display, fontSize: 22, fontWeight: 300, color: C.textPrimary, letterSpacing: 0.5, marginBottom: 6 }}>回饋試算</div>
        <div style={{ fontSize: 14, color: C.textMuted, fontFamily: F.body, lineHeight: 1.7 }}>
          以 {cfg.tier} 級距（{cfg.rewardUnits} units · ${cfg.price.toLocaleString()} USDT）為例，
          每張每月回饋 = 平台月營收 × {REWARD_POOL_RATE * 100}% ×（{cfg.rewardUnits} ÷ 流通中總 units）。
        </div>
      </div>

      <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
        <table style={{ width: "100%", minWidth: 560, borderCollapse: "collapse", fontFamily: F.body }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "10px 14px", fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", color: C.textMuted, fontWeight: 500, borderBottom: `0.5px solid ${C.borderMid}`, whiteSpace: "nowrap" }}>
                平台月營收
              </th>
              {SCENARIO_CIRCULATING_UNITS.map((u) => (
                <th key={u} style={{ textAlign: "right", padding: "10px 14px", fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", color: C.textMuted, fontWeight: 500, borderBottom: `0.5px solid ${C.borderMid}`, whiteSpace: "nowrap" }}>
                  流通 {u.toLocaleString()} units
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SCENARIO_REVENUES.map((r) => (
              <tr key={r.revenue}>
                <td style={{ padding: "12px 14px", borderBottom: `0.5px solid ${C.borderSubtle}`, whiteSpace: "nowrap" }}>
                  <span style={{ fontFamily: F.mono, fontSize: 14, color: C.textPrimary }}>${r.revenue.toLocaleString()}</span>
                  {r.label && (
                    <span style={{ fontSize: 12, color: C.gold, marginLeft: 8, fontFamily: F.body }}>（{r.label}）</span>
                  )}
                </td>
                {SCENARIO_CIRCULATING_UNITS.map((u) => (
                  <td key={u} style={{ padding: "12px 14px", textAlign: "right", borderBottom: `0.5px solid ${C.borderSubtle}`, fontFamily: F.mono, fontSize: 14, color: C.goldLight, whiteSpace: "nowrap" }}>
                    {fmt(monthlyReward(r.revenue, cfg.rewardUnits, u))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 20, padding: "12px 18px", background: "rgba(201,168,76,0.03)", border: `0.5px solid ${C.borderSubtle}`, borderRadius: 8, fontSize: 13, color: C.textMuted, fontFamily: F.body, lineHeight: 1.8 }}>
        ✦ {SCENARIO_NOTE}
      </div>
    </div>
  );
}

function FounderGiftSection() {
  return (
    <div style={{ background: C.bgCard, border: `0.5px solid ${C.borderSubtle}`, borderRadius: 16, padding: 32 }} className="content-pad">
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: F.display, fontSize: 22, fontWeight: 300, color: C.textPrimary, letterSpacing: 0.5, marginBottom: 6 }}>創始成員禮</div>
        <div style={{ fontSize: 14, color: C.textMuted, fontFamily: F.body, lineHeight: 1.7 }}>{GIFT_INTRO}</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="grid-3">
        {GIFT_ITEMS.map((g) => (
          <div key={g.name} style={{ background: "rgba(255,255,255,0.02)", border: `0.5px solid ${C.borderSubtle}`, borderRadius: 12, padding: 22, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ height: 96, borderRadius: 10, background: "linear-gradient(135deg, rgba(201,168,76,0.10) 0%, rgba(10,10,11,0.6) 100%)", border: `0.5px solid ${C.borderSubtle}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, color: C.gold }}>
              {g.icon}
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 500, color: C.textPrimary, fontFamily: F.body, marginBottom: 4 }}>{g.name}</div>
              <div style={{ fontSize: 13, color: C.textMuted, fontFamily: F.body, lineHeight: 1.6 }}>{g.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 20, padding: "12px 18px", background: "rgba(201,168,76,0.04)", border: `0.5px solid ${C.borderSubtle}`, borderRadius: 8, fontSize: 13, color: C.textMuted, fontFamily: F.body, lineHeight: 1.7 }}>
        ✦ {GIFT_NOTE}
      </div>
    </div>
  );
}

function TermsSection() {
  return (
    <div style={{ background: C.bgCard, border: `0.5px solid ${C.borderSubtle}`, borderRadius: 16, padding: 32 }} className="content-pad">
      <div style={{ fontFamily: F.display, fontSize: 22, fontWeight: 300, color: C.textPrimary, letterSpacing: 0.5, marginBottom: 20 }}>Founder Pass 條款</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {FOUNDER_TERMS.map((t) => (
          <div key={t.title} style={{ padding: "16px 18px", background: "rgba(255,255,255,0.02)", border: `0.5px solid ${C.borderSubtle}`, borderRadius: 10 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.goldLight, fontFamily: F.body, letterSpacing: 0.5, marginBottom: 8 }}>{t.title}</div>
            <div style={{ fontSize: 14, color: C.textSecondary, fontFamily: F.body, lineHeight: 1.8 }}>{t.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GenesisRelease() {
  return (
    <div style={{ background: "linear-gradient(135deg, #0f0d07 0%, #0a0a0b 60%, #0d0d12 100%)", border: `0.5px solid ${C.borderMid}`, borderRadius: 16, padding: 32, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -60, right: -60, width: 260, height: 260, background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28, position: "relative", zIndex: 1 }}>
        <div style={{ flex: 1, marginRight: 24 }}>
          <div style={{ fontSize: 12, letterSpacing: 3, color: C.textMuted, textTransform: "uppercase", marginBottom: 8, fontFamily: F.body }}>Phase One</div>
          <div style={{ fontFamily: F.display, fontSize: 26, fontWeight: 300, color: C.textPrimary, letterSpacing: 1, marginBottom: 10 }}>Genesis Release</div>
          <div style={{ fontSize: 16, color: C.textMuted, fontFamily: F.body, lineHeight: 1.7 }}>
            Founder Membership 不會一次全部開放。第一階段僅釋出總量的 10%，確保早期成員具備稀缺性與完整的 Ecosystem 參與價值。
          </div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, position: "relative", zIndex: 1 }}>
        {[
          { label: "Total Future Supply", value: "100,000 Units", sub: "長期生態總上限" },
          { label: "Genesis Release", value: "10,000 Units", sub: "第一階段開放量" },
          { label: "未開放 Units", value: "不參與分配", sub: "僅已啟用 Units 計入回饋" },
        ].map((s) => (
          <div key={s.label} style={{ background: "rgba(255,255,255,0.02)", border: `0.5px solid ${C.borderSubtle}`, borderRadius: 10, padding: 18 }}>
            <div style={{ fontSize: 12, color: C.textMuted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8, fontFamily: F.body }}>{s.label}</div>
            <div style={{ fontFamily: F.mono, fontSize: 15, fontWeight: 700, color: C.goldLight, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 13, color: C.textMuted, fontFamily: F.body }}>{s.sub}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 20, padding: "14px 18px", background: "rgba(201,168,76,0.04)", border: `0.5px solid ${C.borderSubtle}`, borderRadius: 8, fontSize: 14, color: C.textMuted, fontFamily: F.body, lineHeight: 1.7, position: "relative", zIndex: 1 }}>
        ✦ 只有已售出 / 已啟用的 Units 才能參與每月 Monthly Reward Pool 分配。未開放的 Units 不計入分配基數。
      </div>
    </div>
  );
}

function TreasurySection() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="grid-2">
      <div style={{ background: C.bgCard, border: `0.5px solid ${C.borderSubtle}`, borderRadius: 16, padding: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(201,168,76,0.08)", border: `0.5px solid ${C.borderMid}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>◈</div>
          <div>
            <div style={{ fontFamily: F.display, fontSize: 18, fontWeight: 500, color: C.goldLight, letterSpacing: 0.5 }}>Monstore Treasury</div>
            <div style={{ fontSize: 13, color: C.textMuted, fontFamily: F.body, marginTop: 2 }}>平台長期金庫</div>
          </div>
        </div>
        <div style={{ fontSize: 16, color: C.textSecondary, fontFamily: F.body, lineHeight: 1.8, marginBottom: 18 }}>
          Treasury 是 Monstore 平台的長期金庫，用於支撐平台穩定運作與生態持續成長。Treasury 不直接分配給會員，而是作為平台發展的戰略儲備。
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {["平台營運與基礎建設", "生態成長與合作佈局", "預備金與風險緩衝", "回購機制預備資金", "活動、行銷與會員權益"].map((item) => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.goldDim, flexShrink: 0 }} />
              <span style={{ fontSize: 14, color: C.textMuted, fontFamily: F.body }}>{item}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 18, padding: "10px 14px", background: "rgba(201,168,76,0.04)", borderRadius: 8, border: `0.5px solid ${C.borderSubtle}` }}>
          <div style={{ fontSize: 12, color: C.textMuted, fontFamily: F.body, letterSpacing: 0.3, lineHeight: 1.6 }}>
            Reward Weight represents participation in the Monthly Reward Pool, not ownership of the Treasury.
          </div>
        </div>
      </div>

      <div style={{ background: C.bgCard, border: `0.5px solid ${C.borderSubtle}`, borderRadius: 16, padding: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(201,168,76,0.08)", border: `0.5px solid ${C.borderMid}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>✦</div>
          <div>
            <div style={{ fontFamily: F.display, fontSize: 18, fontWeight: 500, color: C.goldLight, letterSpacing: 0.5 }}>Monthly Reward Pool</div>
            <div style={{ fontSize: 13, color: C.textMuted, fontFamily: F.body, marginTop: 2 }}>每月會員回饋池</div>
          </div>
        </div>
        <div style={{ fontSize: 16, color: C.textSecondary, fontFamily: F.body, lineHeight: 1.8, marginBottom: 18 }}>
          Monthly Reward Pool 是每月可分配給 Founder Membership 持有者的回饋池，來源為平台後續<strong style={{ color: C.textPrimary }}>真實營運收益</strong>（返佣收入、電商毛利等）。
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { label: "Pool 來源", value: "真實營運收益 20%", highlight: false },
            { label: "分配基準", value: "Reward Units 比例", highlight: false },
            { label: "不包含", value: "會員購買金額", highlight: true },
          ].map((row) => (
            <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", background: "rgba(201,168,76,0.04)", borderRadius: 8, border: `0.5px solid ${C.borderSubtle}` }}>
              <span style={{ fontSize: 14, color: C.textMuted, fontFamily: F.body }}>{row.label}</span>
              <span style={{ fontSize: 14, color: row.highlight ? "#c96060" : C.textPrimary, fontFamily: F.body, fontWeight: 500 }}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RevenueAllocation() {
  const segments = [
    { label: "Platform Operations", labelZh: "平台營運與成長", pct: 80, color: C.goldDim, desc: "用於技術開發、合作拓展、品牌建設、團隊運作、平台基礎設施維護及長期金庫儲備。" },
    { label: "Monthly Reward Pool", labelZh: "每月會員回饋池", pct: 20, color: C.gold, desc: "每月自動分配給 Founder Membership 持有者，依 Reward Units 比例計算。" },
  ];
  return (
    <div style={{ background: C.bgCard, border: `0.5px solid ${C.borderSubtle}`, borderRadius: 16, padding: 32 }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: F.display, fontSize: 22, fontWeight: 300, color: C.textPrimary, letterSpacing: 0.5, marginBottom: 6 }}>Revenue Allocation</div>
        <div style={{ fontSize: 14, color: C.textMuted, fontFamily: F.body, lineHeight: 1.6 }}>
          以下比例適用於平台後續真實營運收益（返佣收入、電商毛利等）。<strong style={{ color: C.textSecondary }}>不包含</strong> Founder Membership / Reward Weight 購買收入。
        </div>
      </div>
      <div style={{ display: "flex", borderRadius: 8, overflow: "hidden", height: 12, marginBottom: 24 }}>
        <div style={{ width: "80%", background: `linear-gradient(90deg, ${C.goldDim}, #8a6030)` }} />
        <div style={{ width: "20%", background: `linear-gradient(90deg, ${C.gold}, ${C.goldLight})` }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {segments.map((s) => (
          <div key={s.label} style={{ background: "rgba(255,255,255,0.02)", border: `0.5px solid ${C.borderSubtle}`, borderRadius: 12, padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
              <span style={{ fontFamily: F.mono, fontSize: 22, fontWeight: 700, color: s.color }}>{s.pct}%</span>
            </div>
            <div style={{ fontSize: 16, fontWeight: 600, color: C.textPrimary, marginBottom: 2, fontFamily: F.body }}>{s.label}</div>
            <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 10, fontFamily: F.body }}>{s.labelZh}</div>
            <div style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.7, fontFamily: F.body }}>{s.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 20, padding: "12px 18px", background: "rgba(201,168,76,0.04)", border: `0.5px solid ${C.borderSubtle}`, borderRadius: 8 }}>
        <div style={{ fontSize: 13, color: C.textMuted, fontFamily: F.body, lineHeight: 1.7 }}>
          ✦ 會員購買 Membership / Reward Weight 的收入屬於<strong style={{ color: C.textSecondary }}>平台發展資金</strong>，可用於營運、開發、品牌與社群建設，不列入當月 Monthly Reward Pool 分配。
        </div>
      </div>
    </div>
  );
}

function RewardDistributionExample() {
  const totalRevenue = 30000;
  const pool = totalRevenue * 0.20;
  const aUnits = 1000, bUnits = 500, totalUnits = 1500;
  const aReward = Math.round(pool * (aUnits / totalUnits));
  const bReward = Math.round(pool * (bUnits / totalUnits));

  return (
    <div style={{ background: C.bgCard, border: `0.5px solid ${C.borderSubtle}`, borderRadius: 16, padding: 32 }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
        <div>
          <div style={{ fontFamily: F.display, fontSize: 22, fontWeight: 300, color: C.textPrimary, letterSpacing: 0.5, marginBottom: 6 }}>Reward Distribution Example</div>
          <div style={{ fontSize: 14, color: C.textMuted, fontFamily: F.body }}>以下為假設情境，用於說明分配邏輯</div>
        </div>
        <div style={{ background: "rgba(201,168,76,0.08)", border: `0.5px solid ${C.borderMid}`, borderRadius: 8, padding: "6px 14px", textAlign: "center", flexShrink: 0 }}>
          <div style={{ fontSize: 11, color: C.textMuted, letterSpacing: 2, textTransform: "uppercase", fontFamily: F.body }}>假設情境</div>
          <div style={{ fontFamily: F.mono, fontSize: 14, color: C.gold, marginTop: 2 }}>Example Only</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 0, marginBottom: 28 }}>
        <div style={{ paddingRight: 28 }}>
          <div style={{ fontSize: 12, color: C.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16, fontFamily: F.body }}>本月平台真實營運收益</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "rgba(255,255,255,0.02)", borderRadius: 8, border: `0.5px solid ${C.borderSubtle}` }}>
              <span style={{ fontSize: 16, color: C.textSecondary, fontFamily: F.body }}>總營運收益</span>
              <span style={{ fontFamily: F.mono, fontSize: 16, fontWeight: 700, color: C.textPrimary }}>NT${totalRevenue.toLocaleString()}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "rgba(201,168,76,0.06)", borderRadius: 8, border: `0.5px solid ${C.borderMid}` }}>
              <span style={{ fontSize: 16, color: C.textSecondary, fontFamily: F.body }}>Monthly Reward Pool <span style={{ color: C.gold }}>(20%)</span></span>
              <span style={{ fontFamily: F.mono, fontSize: 16, fontWeight: 700, color: C.goldLight }}>NT${pool.toLocaleString()}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[{ l: "Platform Operations (80%)", v: "NT$24,000" }].map((r) => (
                <div key={r.l} style={{ display: "flex", justifyContent: "space-between", padding: "8px 16px", background: "rgba(255,255,255,0.01)", borderRadius: 6 }}>
                  <span style={{ fontSize: 13, color: C.textMuted, fontFamily: F.body }}>{r.l}</span>
                  <span style={{ fontFamily: F.mono, fontSize: 13, color: C.textMuted }}>{r.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ width: "0.5px", background: C.borderSubtle }} />

        <div style={{ paddingLeft: 28 }}>
          <div style={{ fontSize: 12, color: C.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16, fontFamily: F.body }}>Reward Units 分配</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 12 }}>
            {[
              { who: "Member A", units: aUnits, reward: aReward, pct: "66.7%" },
              { who: "Member B", units: bUnits, reward: bReward, pct: "33.3%" },
            ].map((m) => (
              <div key={m.who} style={{ padding: "14px 16px", background: "rgba(255,255,255,0.02)", borderRadius: 8, border: `0.5px solid ${C.borderSubtle}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 16, color: C.textPrimary, fontFamily: F.body, fontWeight: 500 }}>{m.who}</span>
                  <span style={{ fontFamily: F.mono, fontSize: 14, fontWeight: 700, color: C.goldLight }}>NT${m.reward.toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: C.textMuted, fontFamily: F.body }}>{m.units.toLocaleString()} Units</span>
                  <span style={{ fontSize: 13, color: C.gold, fontFamily: F.mono }}>{m.pct} of Pool</span>
                </div>
                <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 3, height: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: m.pct, background: C.gold, borderRadius: 3 }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: "10px 14px", background: "rgba(201,168,76,0.04)", borderRadius: 8, border: `0.5px solid ${C.borderSubtle}` }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, color: C.textMuted, fontFamily: F.body }}>已售出 Units 總計</span>
              <span style={{ fontFamily: F.mono, fontSize: 13, color: C.textSecondary }}>{totalUnits.toLocaleString()} Units</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "12px 18px", background: "rgba(201,168,76,0.03)", border: `0.5px solid ${C.borderSubtle}`, borderRadius: 8, fontSize: 14, color: C.textMuted, fontFamily: F.body, lineHeight: 1.7 }}>
        ✦ 此為示意計算，不代表實際收益承諾。Monthly Reward Pool 僅分配 Pool 部分，不分配 Treasury。未開放 Units 不計入分配基數。
      </div>
    </div>
  );
}

function TreasurySeed() {
  return (
    <div style={{ background: C.bgCard, border: `0.5px solid ${C.borderSubtle}`, borderRadius: 16, padding: 28 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(94,169,110,0.08)", border: "0.5px solid rgba(94,169,110,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>◎</div>
        <div>
          <div style={{ fontFamily: F.display, fontSize: 18, fontWeight: 500, color: C.textPrimary, letterSpacing: 0.5 }}>Initial Treasury Seed</div>
          <div style={{ fontSize: 13, color: C.textMuted, fontFamily: F.body, marginTop: 2 }}>平台基礎資金說明</div>
        </div>
      </div>
      <div style={{ fontSize: 16, color: C.textSecondary, fontFamily: F.body, lineHeight: 1.8, marginBottom: 18 }}>
        Monstore 平台的初始啟動資金，由 Founder 團隊及早期支持者贊助投入，作為 Treasury Seed 使用。此部分屬於<strong style={{ color: C.textPrimary }}>平台基礎發展資金</strong>，不對應任何 Reward Weight，亦不計入 Monthly Reward Pool 分配。
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", background: "rgba(94,169,110,0.04)", border: "0.5px solid rgba(94,169,110,0.2)", borderRadius: 10 }}>
        <div>
          <div style={{ fontSize: 12, color: C.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4, fontFamily: F.body }}>Initial Treasury Seed</div>
          <div style={{ fontFamily: F.mono, fontSize: 18, fontWeight: 700, color: "#5ea96e" }}>10,000 USDT</div>
        </div>
        <div style={{ marginLeft: "auto", fontSize: 13, color: C.textMuted, fontFamily: F.body, textAlign: "right", lineHeight: 1.6 }}>
          不對應 Reward Weight<br />不計入回饋分配
        </div>
      </div>
    </div>
  );
}

function BuybackRight() {
  return (
    <div style={{ background: "linear-gradient(135deg, #0a0a0b 0%, #0d0d0f 100%)", border: `0.5px solid ${C.borderSubtle}`, borderRadius: 16, padding: 32 }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 20, marginBottom: 24 }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(201,168,76,0.06)", border: `0.5px solid ${C.borderMid}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>◆</div>
        <div>
          <div style={{ fontFamily: F.display, fontSize: 22, fontWeight: 300, color: C.textPrimary, letterSpacing: 0.5, marginBottom: 6 }}>Buyback Right</div>
          <div style={{ fontSize: 16, color: C.textMuted, fontFamily: F.body, lineHeight: 1.7 }}>
            Monstore 保留未來依照平台發展狀況，對 Founder Membership / Reward Weight 進行回購的權利。回購並非義務，亦不代表 Weight 的清算價值等同 Treasury 的直接比例所有權。
          </div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 13, color: C.textMuted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12, fontFamily: F.body }}>回購評估依據</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {["平台成長與盈利能力", "Monstore Treasury 狀態", "活躍會員數與交易量", "每月真實營運收益", "Founder Access 稀缺性"].map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.gold, flexShrink: 0 }} />
                <span style={{ fontSize: 14, color: C.textSecondary, fontFamily: F.body }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 13, color: C.textMuted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12, fontFamily: F.body }}>重要說明</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ padding: "12px 14px", background: "rgba(201,168,76,0.04)", border: `0.5px solid ${C.borderSubtle}`, borderRadius: 8 }}>
              <div style={{ fontSize: 14, color: C.textSecondary, fontFamily: F.body, lineHeight: 1.6 }}>
                Reward Weight 代表參與 Monthly Reward Pool 的權重，<strong style={{ color: C.textPrimary }}>不等於</strong> Monstore Treasury 的直接所有權比例。
              </div>
            </div>
            <div style={{ padding: "12px 14px", background: "rgba(201,168,76,0.04)", border: `0.5px solid ${C.borderSubtle}`, borderRadius: 8 }}>
              <div style={{ fontSize: 14, color: C.textSecondary, fontFamily: F.body, lineHeight: 1.6 }}>
                回購時機與條件由平台綜合評估後決定，不具有強制執行義務。
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ padding: "12px 18px", background: "rgba(255,255,255,0.02)", border: `0.5px solid ${C.borderSubtle}`, borderRadius: 8 }}>
        <div style={{ fontFamily: F.mono, fontSize: 13, color: C.textMuted, lineHeight: 1.7 }}>
          Reward Weight represents participation in the Monthly Reward Pool, not ownership of the Treasury. Any future buyback valuation is based on ecosystem health, not a fixed Treasury percentage.
        </div>
      </div>
    </div>
  );
}

function BenefitCards() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [hov, setHov] = useState<number | null>(null);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
      {benefits.map((b, i) => (
        <div
          key={b.name}
          onMouseEnter={() => setHov(i)}
          onMouseLeave={() => setHov(null)}
          onClick={() => setExpanded(expanded === i ? null : i)}
          style={{ background: expanded === i ? "rgba(201,168,76,0.06)" : hov === i ? C.bgCardHover : C.bgCard, border: `0.5px solid ${expanded === i ? C.borderStrong : hov === i ? C.borderMid : C.borderSubtle}`, borderRadius: 14, padding: 22, cursor: "pointer", transition: "all 0.25s ease" }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontSize: 26, color: C.gold }}>{b.icon}</span>
            <span style={{ fontSize: 14, color: C.textMuted, transition: "transform 0.2s", display: "inline-block", transform: expanded === i ? "rotate(180deg)" : "none" }}>▾</span>
          </div>
          <div style={{ fontSize: 15, fontWeight: 500, color: C.textPrimary, marginBottom: 6, fontFamily: F.body }}>{b.name}</div>
          <div style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.6, fontFamily: F.body }}>{b.desc}</div>
          {expanded === i && (
            <div style={{ marginTop: 14, paddingTop: 14, borderTop: `0.5px solid ${C.borderSubtle}`, fontSize: 14, color: C.textSecondary, lineHeight: 1.7, fontFamily: F.body }}>
              {b.detail}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function ImportantNotes() {
  return (
    <div style={{ background: C.bgCard, border: `0.5px solid ${C.borderSubtle}`, borderRadius: 14, padding: 24 }}>
      <div style={{ fontFamily: F.display, fontSize: 17, fontWeight: 500, color: C.textPrimary, marginBottom: 16 }}>重要說明 · Important Notice</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {[
          { icon: "◎", text: "Founder Membership 與帳號永久綁定，不可轉讓" },
          { icon: "✦", text: "Reward Weight（Units）代表你在 Monthly Reward Pool 的分配比例，非公司股份或任何形式的證券" },
          { icon: "◈", text: "Monthly Reward Pool 來自平台後續真實營運收益，不包含會員購買 Membership 的金額" },
          { icon: "⟐", text: "所有 Membership 權益自購買當日起立即生效，月回饋次月開始計算" },
          { icon: "◆", text: "Genesis Release 各階層名額售完即止，不追加發行" },
          { icon: "⬡", text: "未開放 Units 不計入 Monthly Reward Pool 分配基數" },
        ].map((n, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <span style={{ fontSize: 14, color: C.gold, flexShrink: 0, marginTop: 1 }}>{n.icon}</span>
            <span style={{ fontSize: 16, color: C.textSecondary, fontFamily: F.body, lineHeight: 1.6 }}>{n.text}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 18, padding: "10px 14px", background: "rgba(255,255,255,0.02)", border: `0.5px solid ${C.borderSubtle}`, borderRadius: 8 }}>
        <div style={{ fontSize: 13, color: C.textMuted, fontFamily: F.body, lineHeight: 1.7 }}>
          此為平台生態權益計劃，非公司股權、股票、證券或任何受監管金融商品。Monstore 不承諾任何固定或保證的回報。
        </div>
      </div>
    </div>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div style={{ background: C.bgCard, border: `0.5px solid ${C.borderSubtle}`, borderRadius: 16, padding: 28 }}>
      <div style={{ fontFamily: F.display, fontSize: 20, fontWeight: 500, color: C.textPrimary, letterSpacing: 0.5, marginBottom: 20 }}>常見問題</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {faqs.map((f, i) => (
          <div key={i} style={{ borderBottom: i < faqs.length - 1 ? `0.5px solid ${C.borderSubtle}` : "none" }}>
            <div onClick={() => setOpen(open === i ? null : i)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 0", cursor: "pointer" }}>
              <span style={{ fontSize: 14, color: C.textPrimary, fontFamily: F.body, fontWeight: 500 }}>{f.q}</span>
              <span style={{ fontSize: 14, color: C.textMuted, transition: "transform 0.2s", display: "inline-block", transform: open === i ? "rotate(180deg)" : "none", flexShrink: 0, marginLeft: 16 }}>▾</span>
            </div>
            {open === i && (
              <div style={{ paddingBottom: 18, fontSize: 16, color: C.textSecondary, fontFamily: F.body, lineHeight: 1.7 }}>{f.a}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FounderPassPage() {
  const [member, setMember] = useState<Member | null>(null);

  useEffect(() => {
    const uid = localStorage.getItem(UID_KEY);
    if (!uid) return;
    const found = members.find((m) => m.uid === uid);
    if (found) setMember(found);
  }, []);

  return (
    <Layout activePath="/founder" title="Founder Membership">
      <div style={{ display: "flex", flexDirection: "column", gap: 32, maxWidth: 1200 }}>
        <HeroBanner member={member} />
        {member?.founderPass && (
          <div>
            <SectionLabel>我的狀態 · {member.name}</SectionLabel>
            <MyFounderStatus member={member} />
          </div>
        )}
        <div>
          <SectionLabel>Membership Reward Units</SectionLabel>
          <MembershipUnits />
        </div>
        <div>
          <SectionLabel>回饋試算 · Reward Scenarios</SectionLabel>
          <ScenarioTable />
        </div>
        <div>
          <SectionLabel>創始成員禮 · Founder Gift</SectionLabel>
          <FounderGiftSection />
        </div>
        <div>
          <SectionLabel>Phase One · 第一階段開放</SectionLabel>
          <GenesisRelease />
        </div>
        <div>
          <SectionLabel>Treasury · Monthly Reward Pool</SectionLabel>
          <TreasurySection />
        </div>
        <div>
          <SectionLabel>Revenue Allocation · 收益分配模型</SectionLabel>
          <RevenueAllocation />
        </div>
        <div>
          <SectionLabel>Reward Distribution Example · 分配示例</SectionLabel>
          <RewardDistributionExample />
        </div>
        <div>
          <SectionLabel>Initial Treasury Seed</SectionLabel>
          <TreasurySeed />
        </div>
        <div>
          <SectionLabel>Buyback Right · 回購機制</SectionLabel>
          <BuybackRight />
        </div>
        <div>
          <SectionLabel>Membership Privileges · 會員專屬權益</SectionLabel>
          <BenefitCards />
        </div>
        <div>
          <SectionLabel>Important Notice</SectionLabel>
          <ImportantNotes />
        </div>
        <div>
          <SectionLabel>常見問題</SectionLabel>
          <FAQ />
        </div>
        <div>
          <SectionLabel>Founder Pass 條款</SectionLabel>
          <TermsSection />
        </div>
        <div style={{ height: 8 }} />
      </div>
    </Layout>
  );
}
