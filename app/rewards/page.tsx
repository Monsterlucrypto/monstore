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

const summary = {
  totalPoints: 12480,
  monthlyEarned: 3240,
  totalRedeemed: 4800,
  pendingPoints: 380,
};

const redeemHistory = [
  { date: "2024.12.15", item: "Founder 帽T",   points: 2400, status: "已完成" },
  { date: "2024.11.02", item: "限量鍵盤",       points: 1800, status: "已完成" },
  { date: "2024.09.28", item: "商城折扣券 15%", points: 600,  status: "已完成" },
];

const multipliers = [
  { label: "基礎交易倍率",      value: "1.0×",  desc: "所有會員基本倍率",        color: C.textSecondary },
  { label: "Gold VIP 獎勵",     value: "+1.0×", desc: "Gold 等級專屬加成",       color: C.gold },
  { label: "Founder Pass 獎勵", value: "+0.5×", desc: "持有 Founder Pass 加成",  color: C.goldLight },
  { label: "推薦獎勵",          value: "+0.1×", desc: "成功推薦會員獎勵",         color: C.textSecondary },
];

const howToBoost = [
  { icon: "◈", title: "升級至 Founder",    desc: "達到 $4M 月交易量，倍率提升至 3.0×",       action: "查看進度 →",    href: "/vip"      },
  { icon: "⟐", title: "推薦新會員",         desc: "每推薦一位新會員額外獲得 +0.1× 倍率加成",   action: "取得推薦連結 →", href: "/referral" },
  { icon: "◆", title: "Founder Membership", desc: "取得 Lu Membership，參與 Monthly Reward Pool 月回饋分配", action: "了解更多 →", href: "/founder" },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 10, letterSpacing: 3, color: C.textMuted, textTransform: "uppercase", marginBottom: 16, fontFamily: F.body }}>
      {children}
    </div>
  );
}

function PointsSummary() {
  const usdValue = (summary.totalPoints * PTS_TO_USD).toFixed(2);
  const cards = [
    { label: "目前積分餘額", value: summary.totalPoints.toLocaleString(),            unit: "pts", sub: `≈ $${usdValue} USD`,                                    subColor: "#5ea96e", icon: "✦"  },
    { label: "本月累積積分", value: summary.monthlyEarned.toLocaleString(),          unit: "pts", sub: `≈ $${(summary.monthlyEarned * PTS_TO_USD).toFixed(2)} USD`, subColor: C.textMuted, icon: "📈" },
    { label: "已兌換積分",   value: summary.totalRedeemed.toLocaleString(),          unit: "pts", sub: `≈ $${(summary.totalRedeemed * PTS_TO_USD).toFixed(2)} USD`, subColor: C.textMuted, icon: "◎"  },
    { label: "待確認積分",   value: summary.pendingPoints.toLocaleString(),          unit: "pts", sub: "結算中，24hr 內入帳",                                     subColor: "#c9954c", icon: "⟐"  },
  ];

  const [hov, setHov] = useState<number | null>(null);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="grid-4">
      {cards.map((c, i) => (
        <div key={c.label} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
          style={{ background: hov === i ? C.bgCardHover : C.bgCard, border: `0.5px solid ${hov === i ? C.borderMid : C.borderSubtle}`, borderRadius: 12, padding: 20, transition: "all 0.25s ease", transform: hov === i ? "translateY(-2px)" : "none", position: "relative", overflow: "hidden" }}
        >
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)", opacity: hov === i ? 1 : 0, transition: "opacity 0.25s" }} />
          <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(201,168,76,0.08)", border: `0.5px solid ${C.borderSubtle}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, marginBottom: 14 }}>{c.icon}</div>
          <div style={{ fontSize: 11, color: C.textMuted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6, fontFamily: F.body }}>{c.label}</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 6 }}>
            <span style={{ fontFamily: F.mono, fontSize: 24, fontWeight: 700, color: C.textPrimary, lineHeight: 1 }}>{c.value}</span>
            <span style={{ fontSize: 11, color: C.textMuted, fontFamily: F.body }}>{c.unit}</span>
          </div>
          <div style={{ fontSize: 11, color: c.subColor, fontFamily: F.body }}>{c.sub}</div>
        </div>
      ))}
    </div>
  );
}

function USDConverter() {
  const [pts, setPts] = useState(1000);
  const usd = (pts * PTS_TO_USD).toFixed(2);

  return (
    <div style={{ background: "linear-gradient(135deg, #1a1508 0%, #0e0e12 60%, #0a0a0b 100%)", border: `0.5px solid ${C.borderMid}`, borderRadius: 16, padding: 28, position: "relative", overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "center" }} className="grid-2">
      <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div>
        <div style={{ fontFamily: F.display, fontSize: 22, fontWeight: 300, color: C.textPrimary, letterSpacing: 0.5, marginBottom: 8 }}>積分折合美金</div>
        <div style={{ fontSize: 12, color: C.textMuted, fontFamily: F.body, marginBottom: 16, lineHeight: 1.7 }}>
          目前匯率：<span style={{ color: C.gold, fontFamily: F.mono }}>1 pt = ${PTS_TO_USD} USD</span><br />可於商城兌換商品或折抵消費
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ background: "rgba(201,168,76,0.08)", border: `0.5px solid ${C.borderMid}`, borderRadius: 8, padding: "8px 16px" }}>
            <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 1.5, marginBottom: 4, fontFamily: F.body }}>我的積分</div>
            <div style={{ fontFamily: F.mono, fontSize: 18, fontWeight: 700, color: C.goldLight }}>{summary.totalPoints.toLocaleString()} pts</div>
          </div>
          <span style={{ color: C.textMuted, fontSize: 18 }}>→</span>
          <div style={{ background: "rgba(94,169,110,0.08)", border: "0.5px solid rgba(94,169,110,0.25)", borderRadius: 8, padding: "8px 16px" }}>
            <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 1.5, marginBottom: 4, fontFamily: F.body }}>折合美金</div>
            <div style={{ fontFamily: F.mono, fontSize: 18, fontWeight: 700, color: "#5ea96e" }}>${(summary.totalPoints * PTS_TO_USD).toFixed(2)}</div>
          </div>
        </div>
      </div>
      <div style={{ background: "rgba(255,255,255,0.02)", border: `0.5px solid ${C.borderSubtle}`, borderRadius: 12, padding: 20 }}>
        <div style={{ fontSize: 11, color: C.textMuted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 16, fontFamily: F.body }}>自訂計算</div>
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: C.textSecondary, fontFamily: F.body }}>積分數量</span>
            <span style={{ fontFamily: F.mono, fontSize: 13, fontWeight: 700, color: C.goldLight }}>{pts.toLocaleString()} pts</span>
          </div>
          <input type="range" min={100} max={20000} step={100} value={pts} onChange={(e) => setPts(Number(e.target.value))} style={{ width: "100%", accentColor: C.gold }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: C.textMuted, fontFamily: F.mono, marginTop: 4 }}>
            <span>100</span><span>20,000</span>
          </div>
        </div>
        <div style={{ background: "rgba(201,168,76,0.06)", border: `0.5px solid ${C.borderMid}`, borderRadius: 8, padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 6, fontFamily: F.body }}>折合美金</div>
          <div style={{ fontFamily: F.mono, fontSize: 28, fontWeight: 700, color: "#5ea96e" }}>${usd}</div>
          <div style={{ fontSize: 10, color: C.textMuted, marginTop: 4, fontFamily: F.body }}>匯率 1 pt = $0.0666 USD</div>
        </div>
      </div>
    </div>
  );
}

function RedeemHistory() {
  return (
    <div style={{ background: C.bgCard, border: `0.5px solid ${C.borderSubtle}`, borderRadius: 16, padding: 28 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div style={{ fontFamily: F.display, fontSize: 20, fontWeight: 500, color: C.textPrimary, letterSpacing: 0.5 }}>兌換紀錄</div>
        <span style={{ fontSize: 11, color: C.textMuted, fontFamily: F.mono }}>共 {redeemHistory.length} 筆</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 2fr 1fr 1fr", gap: 16, padding: "0 0 12px", borderBottom: `0.5px solid ${C.borderSubtle}`, marginBottom: 4 }}>
        {["日期", "兌換品項", "消耗積分", "狀態"].map((h) => (
          <div key={h} style={{ fontSize: 10, color: C.textMuted, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: F.body }}>{h}</div>
        ))}
      </div>
      {redeemHistory.map((r, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "1.5fr 2fr 1fr 1fr", gap: 16, padding: "16px 0", borderBottom: i < redeemHistory.length - 1 ? `0.5px solid ${C.borderSubtle}` : "none", alignItems: "center" }}>
          <span style={{ fontFamily: F.mono, fontSize: 12, color: C.textMuted }}>{r.date}</span>
          <span style={{ fontSize: 13, color: C.textPrimary, fontFamily: F.body }}>{r.item}</span>
          <div>
            <span style={{ fontFamily: F.mono, fontSize: 13, fontWeight: 700, color: C.gold }}>-{r.points.toLocaleString()}</span>
            <span style={{ fontSize: 10, color: C.textMuted, fontFamily: F.body, marginLeft: 4 }}>pts</span>
          </div>
          <span style={{ fontSize: 11, color: "#5ea96e", background: "rgba(94,169,110,0.08)", border: "0.5px solid rgba(94,169,110,0.2)", padding: "3px 10px", borderRadius: 20, fontFamily: F.body, display: "inline-block" }}>{r.status}</span>
        </div>
      ))}
    </div>
  );
}

function MultiplierBreakdown() {
  return (
    <div style={{ background: C.bgCard, border: `0.5px solid ${C.borderSubtle}`, borderRadius: 16, padding: 28 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div style={{ fontFamily: F.display, fontSize: 20, fontWeight: 500, color: C.textPrimary, letterSpacing: 0.5 }}>獎勵明細</div>
        <div style={{ fontFamily: F.mono, fontSize: 28, fontWeight: 700, color: C.goldLight }}>2.6×</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
        {multipliers.map((m, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: m.color, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                <span style={{ fontSize: 13, color: C.textSecondary, fontFamily: F.body }}>{m.label}</span>
                <span style={{ fontFamily: F.mono, fontSize: 13, fontWeight: 700, color: m.color }}>{m.value}</span>
              </div>
              <div style={{ fontSize: 11, color: C.textMuted, fontFamily: F.body }}>{m.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ background: "rgba(201,168,76,0.06)", border: `0.5px solid ${C.borderMid}`, borderRadius: 8, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: C.textPrimary, fontFamily: F.body }}>總倍率</span>
        <span style={{ fontFamily: F.mono, fontSize: 20, fontWeight: 700, color: C.goldLight }}>2.6×</span>
      </div>
    </div>
  );
}

function HowToBoost() {
  const [hov, setHov] = useState<number | null>(null);
  return (
    <div style={{ background: C.bgCard, border: `0.5px solid ${C.borderSubtle}`, borderRadius: 16, padding: 28 }}>
      <div style={{ fontFamily: F.display, fontSize: 20, fontWeight: 500, color: C.textPrimary, letterSpacing: 0.5, marginBottom: 20 }}>如何提升獎勵</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="grid-3">
        {howToBoost.map((b, i) => (
          <div key={i} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
            style={{ background: hov === i ? "rgba(201,168,76,0.06)" : "rgba(255,255,255,0.02)", border: `0.5px solid ${hov === i ? C.borderMid : C.borderSubtle}`, borderRadius: 12, padding: 20, transition: "all 0.2s", cursor: "pointer" }}
          >
            <div style={{ fontSize: 24, color: C.gold, marginBottom: 12 }}>{b.icon}</div>
            <div style={{ fontSize: 14, fontWeight: 500, color: C.textPrimary, marginBottom: 6, fontFamily: F.body }}>{b.title}</div>
            <div style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.6, marginBottom: 14, fontFamily: F.body }}>{b.desc}</div>
            <a href={b.href} style={{ fontSize: 11, color: C.gold, fontFamily: F.body, textDecoration: "none" }}>{b.action}</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function RewardsPage() {
  return (
    <Layout activePath="/rewards" title="獎勵積分">
      <div style={{ display: "flex", flexDirection: "column", gap: 32, maxWidth: 1200 }}>
        <div>
          <SectionLabel>積分總覽</SectionLabel>
          <PointsSummary />
        </div>
        <div>
          <SectionLabel>積分折合美金</SectionLabel>
          <USDConverter />
        </div>
        <div>
          <SectionLabel>兌換紀錄</SectionLabel>
          <RedeemHistory />
        </div>
        <div style={{ height: 8 }} />
      </div>
    </Layout>
  );
}
