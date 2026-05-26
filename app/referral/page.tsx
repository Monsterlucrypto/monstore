"use client";

import { useState } from "react";
import Layout from "@/components/Layout";

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

const PTS_TO_USD = 0.0666;
const REFERRAL_RATE = 0.1;

const founderTiers = [
  { name: "Lu", price: 5000, reward: 5000 * REFERRAL_RATE, pts: Math.round(5000 * REFERRAL_RATE / PTS_TO_USD), color: "#E8C96A", colorDim: "rgba(232,201,106,0.12)", colorBorder: "rgba(232,201,106,0.35)" },
  { name: "M",  price: 1000, reward: 1000 * REFERRAL_RATE, pts: Math.round(1000 * REFERRAL_RATE / PTS_TO_USD), color: "#C9A84C", colorDim: "rgba(201,168,76,0.12)", colorBorder: "rgba(201,168,76,0.3)"  },
  { name: "O",  price: 300,  reward: 300  * REFERRAL_RATE, pts: Math.round(300  * REFERRAL_RATE / PTS_TO_USD), color: "#a8a9ad", colorDim: "rgba(168,169,173,0.1)",  colorBorder: "rgba(168,169,173,0.25)" },
  { name: "N",  price: 100,  reward: 100  * REFERRAL_RATE, pts: Math.round(100  * REFERRAL_RATE / PTS_TO_USD), color: "#cd7f32", colorDim: "rgba(205,127,50,0.1)",   colorBorder: "rgba(205,127,50,0.25)"  },
];

const userReferral = {
  code: "CLINGLU2024",
  link: "https://goldenegg.io/r/CHINGLU2024",
  totalReferred: 8,
  totalEarned: 14280,
  pendingPts: 1502,
};

const referralHistory = [
  { date: "2024.12.10", wallet: "0x3a9f...8b2c", tier: "M",  amount: 1000, pts: 1502, status: "已確認" },
  { date: "2024.11.28", wallet: "0x7c1d...4e9a", tier: "O",  amount: 300,  pts: 451,  status: "已確認" },
  { date: "2024.11.15", wallet: "0x2f8e...1d7b", tier: "N",  amount: 100,  pts: 150,  status: "已確認" },
  { date: "2024.10.30", wallet: "0x9b4a...6c3f", tier: "Lu", amount: 5000, pts: 7519, status: "已確認" },
  { date: "2024.10.12", wallet: "0x5e2c...9a1d", tier: "M",  amount: 1000, pts: 1502, status: "已確認" },
  { date: "2024.09.05", wallet: "0x1d7b...3f8e", tier: "O",  amount: 300,  pts: 451,  status: "待確認"  },
  { date: "2024.08.22", wallet: "0x8c3f...2a9b", tier: "N",  amount: 100,  pts: 150,  status: "待確認"  },
  { date: "2024.07.14", wallet: "0x4e9a...7c1d", tier: "M",  amount: 1000, pts: 1502, status: "已確認" },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 10, letterSpacing: 3, color: C.textMuted, textTransform: "uppercase", marginBottom: 16, fontFamily: F.body }}>
      {children}
    </div>
  );
}

function ReferralSummary() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(userReferral.link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="grid-2">
      <div style={{ background: "linear-gradient(135deg, #1a1508 0%, #0e0e12 60%, #0a0a0b 100%)", border: `0.5px solid ${C.borderMid}`, borderRadius: 16, padding: 28, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -30, right: -30, width: 160, height: 160, background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12, fontFamily: F.body }}>你的推薦碼</div>
        <div style={{ fontFamily: F.mono, fontSize: 28, fontWeight: 700, color: C.goldLight, letterSpacing: 3, marginBottom: 16 }}>{userReferral.code}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.03)", border: `0.5px solid ${C.borderSubtle}`, borderRadius: 8, padding: "10px 14px", marginBottom: 16 }}>
          <span style={{ flex: 1, fontSize: 11, color: C.textMuted, fontFamily: F.mono, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{userReferral.link}</span>
          <button onClick={handleCopy} style={{ fontSize: 11, color: copied ? "#5ea96e" : C.gold, background: "transparent", border: "none", cursor: "pointer", fontFamily: F.body, flexShrink: 0, padding: "2px 8px" }}>
            {copied ? "✓ 已複製" : "複製連結"}
          </button>
        </div>
        <div style={{ fontSize: 11, color: C.textMuted, fontFamily: F.body, lineHeight: 1.6 }}>
          分享此連結，對方購買任何 Founder Membership 後，<br />
          你將獲得其<span style={{ color: C.gold }}> 購買金額 10% </span>的積分回饋
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="grid-2">
        {[
          { label: "已推薦人數",   value: `${userReferral.totalReferred} 人`,                sub: "成功購買會員",          color: C.textPrimary },
          { label: "累計獎勵積分", value: `${userReferral.totalEarned.toLocaleString()} pts`, sub: `≈ $${(userReferral.totalEarned * PTS_TO_USD).toFixed(2)} USD`, color: C.goldLight },
          { label: "待確認積分",   value: `${userReferral.pendingPts.toLocaleString()} pts`,  sub: "審核中，7 天內入帳",    color: "#c9954c" },
          { label: "推薦回饋率",   value: "10%",                                               sub: "購買金額折合積分",     color: C.gold },
        ].map((s) => (
          <div key={s.label} style={{ background: C.bgCard, border: `0.5px solid ${C.borderSubtle}`, borderRadius: 12, padding: 18, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8, fontFamily: F.body }}>{s.label}</div>
            <div style={{ fontFamily: F.mono, fontSize: 20, fontWeight: 700, color: s.color, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: C.textMuted, fontFamily: F.body }}>{s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RewardRules() {
  return (
    <div style={{ background: C.bgCard, border: `0.5px solid ${C.borderSubtle}`, borderRadius: 16, padding: 28 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
        <div style={{ fontFamily: F.display, fontSize: 20, fontWeight: 500, color: C.textPrimary, letterSpacing: 0.5 }}>推薦獎勵規則</div>
        <div style={{ fontSize: 11, color: C.textMuted, fontFamily: F.body }}>回饋率：購買金額 × 10%</div>
      </div>
      <div style={{ fontSize: 12, color: C.textMuted, fontFamily: F.body, marginBottom: 20 }}>
        被推薦人購買任何 Founder Membership 後，你立即獲得其購買金額 10% 折合積分
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }} className="grid-4">
        {founderTiers.map((t) => (
          <div key={t.name} style={{ background: t.colorDim, border: `0.5px solid ${t.colorBorder}`, borderRadius: 12, padding: 18 }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: t.color, marginBottom: 12, fontFamily: F.body }}>{t.name}</div>
            <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4, fontFamily: F.body }}>對方付款</div>
            <div style={{ fontFamily: F.mono, fontSize: 16, fontWeight: 700, color: C.textPrimary, marginBottom: 12 }}>${t.price.toLocaleString()}</div>
            <div style={{ height: "0.5px", background: t.colorBorder, marginBottom: 12 }} />
            <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4, fontFamily: F.body }}>你獲得</div>
            <div style={{ fontFamily: F.mono, fontSize: 18, fontWeight: 700, color: t.color }}>{t.pts.toLocaleString()}</div>
            <div style={{ fontSize: 10, color: C.textMuted, fontFamily: F.body, marginTop: 2 }}>pts ≈ ${t.reward}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 20, background: "rgba(201,168,76,0.04)", border: `0.5px solid ${C.borderSubtle}`, borderRadius: 8, padding: "12px 16px", fontSize: 12, color: C.textMuted, fontFamily: F.body, lineHeight: 1.7 }}>
        ✦ 積分換算匯率：1 pt = $0.0666 USD &nbsp;·&nbsp; 推薦獎勵於對方購買確認後 7 個工作天內入帳 &nbsp;·&nbsp; 無推薦人數上限
      </div>
    </div>
  );
}

function ReferralHistory() {
  const statusColor = (s: string) => s === "已確認"
    ? { color: "#5ea96e", bg: "rgba(94,169,110,0.08)", border: "rgba(94,169,110,0.25)" }
    : { color: "#c9954c", bg: "rgba(201,149,76,0.08)", border: "rgba(201,149,76,0.25)" };

  return (
    <div style={{ background: C.bgCard, border: `0.5px solid ${C.borderSubtle}`, borderRadius: 16, padding: 28 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div style={{ fontFamily: F.display, fontSize: 20, fontWeight: 500, color: C.textPrimary, letterSpacing: 0.5 }}>推薦紀錄</div>
        <span style={{ fontSize: 11, color: C.textMuted, fontFamily: F.mono }}>共 {referralHistory.length} 筆</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 1.2fr 1fr 1fr 1fr", gap: 12, padding: "0 0 12px", borderBottom: `0.5px solid ${C.borderSubtle}`, marginBottom: 4 }}>
        {["日期", "錢包地址", "購買方案", "購買金額", "獲得積分", "狀態"].map((h) => (
          <div key={h} style={{ fontSize: 10, color: C.textMuted, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: F.body }}>{h}</div>
        ))}
      </div>
      {referralHistory.map((r, i) => {
        const sc = statusColor(r.status);
        return (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 1.2fr 1fr 1fr 1fr", gap: 12, padding: "14px 0", borderBottom: i < referralHistory.length - 1 ? `0.5px solid ${C.borderSubtle}` : "none", alignItems: "center" }}>
            <span style={{ fontFamily: F.mono, fontSize: 11, color: C.textMuted }}>{r.date}</span>
            <span style={{ fontFamily: F.mono, fontSize: 11, color: C.textSecondary }}>{r.wallet}</span>
            <span style={{ fontSize: 12, color: C.textPrimary, fontFamily: F.body }}>{r.tier}</span>
            <span style={{ fontFamily: F.mono, fontSize: 12, color: C.textSecondary }}>${r.amount.toLocaleString()}</span>
            <div>
              <span style={{ fontFamily: F.mono, fontSize: 13, fontWeight: 700, color: C.goldLight }}>+{r.pts.toLocaleString()}</span>
              <span style={{ fontSize: 10, color: C.textMuted, marginLeft: 4, fontFamily: F.body }}>pts</span>
            </div>
            <span style={{ fontSize: 11, color: sc.color, background: sc.bg, border: `0.5px solid ${sc.border}`, padding: "3px 10px", borderRadius: 20, fontFamily: F.body, display: "inline-block" }}>{r.status}</span>
          </div>
        );
      })}
    </div>
  );
}

function HowItWorks() {
  const steps = [
    { num: "01", title: "複製推薦連結", desc: "在上方複製你的專屬推薦連結或推薦碼" },
    { num: "02", title: "分享給朋友",   desc: "透過任何管道分享給有興趣的朋友或社群" },
    { num: "03", title: "對方購買會員", desc: "對方透過你的連結購買任何 Founder Membership 方案" },
    { num: "04", title: "自動獲得積分", desc: "購買確認後 7 天內，10% 折合積分自動入帳到你的帳戶" },
  ];

  return (
    <div style={{ background: C.bgCard, border: `0.5px solid ${C.borderSubtle}`, borderRadius: 16, padding: 28 }}>
      <div style={{ fontFamily: F.display, fontSize: 20, fontWeight: 500, color: C.textPrimary, letterSpacing: 0.5, marginBottom: 24 }}>推薦流程</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="grid-4">
        {steps.map((s, i) => (
          <div key={s.num} style={{ position: "relative" }}>
            {i < steps.length - 1 && (
              <div style={{ position: "absolute", top: 20, left: "calc(100% - 8px)", width: "16px", height: "0.5px", background: C.borderMid, zIndex: 1 }} />
            )}
            <div style={{ background: "rgba(255,255,255,0.02)", border: `0.5px solid ${C.borderSubtle}`, borderRadius: 12, padding: 20 }}>
              <div style={{ fontFamily: F.mono, fontSize: 11, color: C.gold, marginBottom: 12, letterSpacing: 1 }}>{s.num}</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: C.textPrimary, marginBottom: 8, fontFamily: F.body }}>{s.title}</div>
              <div style={{ fontSize: 11, color: C.textMuted, lineHeight: 1.6, fontFamily: F.body }}>{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ReferralPage() {
  return (
    <Layout activePath="/referral" title="推薦計畫">
      <div style={{ display: "flex", flexDirection: "column", gap: 32, maxWidth: 1200 }}>
        <div>
          <SectionLabel>推薦總覽</SectionLabel>
          <ReferralSummary />
        </div>
        <div>
          <SectionLabel>各方案推薦獎勵</SectionLabel>
          <RewardRules />
        </div>
        <div>
          <SectionLabel>推薦流程</SectionLabel>
          <HowItWorks />
        </div>
        <div>
          <SectionLabel>推薦紀錄</SectionLabel>
          <ReferralHistory />
        </div>
        <div style={{ height: 8 }} />
      </div>
    </Layout>
  );
}
