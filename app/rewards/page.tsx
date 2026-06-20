"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { members } from "@/data/members";
import type { Member } from "@/data/members";

const UID_KEY = "monstore_uid";

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

const PTS_TO_NTD = 1;

// ─── 根據 VIP + founderPass 計算獎勵明細 ──────────────────────────────────
function getRewardRows(member: Member) {
  const rows: { label: string; desc: string; color: string }[] = [];

  // 基礎
  rows.push({ label: "基礎交易獎勵", desc: "每筆交易皆可累積基點", color: C.textSecondary });

  // VIP 加成
  const vipBonus: Record<string, string> = {
    Silver:  "Silver 等級專屬獎勵",
    Gold:    "Gold 等級專屬獎勵",
    Diamond: "Diamond 等級專屬獎勵",
  };
  if (vipBonus[member.vip]) {
    rows.push({ label: `${member.vip} VIP 獎勵`, desc: vipBonus[member.vip], color: C.gold });
  }

  // Founder Pass 加成
  const fpDesc: Record<string, string> = { Lu: "Lu Founder Pass 持有者專屬獎勵", M: "M Founder Pass 持有者專屬獎勵", O: "O Founder Pass 持有者專屬獎勵", N: "N Founder Pass 持有者專屬獎勵" };
  if (member.founderPass && fpDesc[member.founderPass]) {
    rows.push({ label: "Founder Pass 獎勵", desc: fpDesc[member.founderPass], color: C.goldLight });
  }

  // 商城消費
  rows.push({ label: "商城消費獎勵", desc: "購買商城中的商品也可以累積基點", color: C.goldLight });

  return rows;
}

// ─── 根據 member 計算積分數據 ──────────────────────────────────────────────
function getSummary(member: Member) {
  const pts = parseFloat(member.points) || 0;
  // 模擬：本月 ≈ 積分的 26%，已兌換 ≈ 38%，待確認 ≈ 3%
  return {
    totalPoints:    pts,
    monthlyEarned:  Math.round(pts * 0.26),
    totalRedeemed:  Math.round(pts * 0.38),
    pendingPoints:  Math.round(pts * 0.03),
  };
}

const howToBoost = [
  { icon: "◈", title: "升級至更高 VIP",    desc: "交易量越高等級越高，享有更豐富的獎勵回饋",   action: "查看進度 →",    href: "/vip"      },
  { icon: "◆", title: "Founder Membership", desc: "取得 Founder Pass，參與 Monthly Reward Pool 月回饋分配", action: "了解更多 →", href: "/founder" },
  { icon: "⬡", title: "商城消費累積基點",   desc: "購買商城中的商品也可以累積基點，消費即賺點",  action: "前往商城 →",    href: "/shop"     },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 10, letterSpacing: 3, color: C.textMuted, textTransform: "uppercase", marginBottom: 16, fontFamily: F.body }}>
      {children}
    </div>
  );
}

// ─── Points Summary ────────────────────────────────────────────────────────
function PointsSummary({ member }: { member: Member }) {
  const s = getSummary(member);
  const [hov, setHov] = useState<number | null>(null);

  const cards = [
    { label: "目前積分餘額", value: s.totalPoints.toFixed(2),                unit: "point", sub: `≈ NT$${Math.round(s.totalPoints * PTS_TO_NTD).toLocaleString()}`,                subColor: "#5ea96e", icon: "✦"  },
    { label: "本月累積積分", value: s.monthlyEarned.toFixed(2),              unit: "point", sub: `≈ NT$${Math.round(s.monthlyEarned * PTS_TO_NTD).toLocaleString()}`,               subColor: C.textMuted, icon: "📈" },
    { label: "已兌換積分",   value: s.totalRedeemed.toFixed(2),              unit: "point", sub: `≈ NT$${Math.round(s.totalRedeemed * PTS_TO_NTD).toLocaleString()}`,               subColor: C.textMuted, icon: "◎"  },
    { label: "待確認積分",   value: s.pendingPoints.toFixed(2),              unit: "point", sub: "結算中，24hr 內入帳",                                                              subColor: "#c9954c", icon: "⟐"  },
  ];

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

// ─── NTD Converter ─────────────────────────────────────────────────────────
function NTDConverter({ member }: { member: Member }) {
  const s = getSummary(member);
  const [pts, setPts] = useState(Math.min(Math.round(s.totalPoints), 20000));
  const ntd = Math.round(pts * PTS_TO_NTD).toLocaleString();

  return (
    <div style={{ background: "linear-gradient(135deg, #1a1508 0%, #0e0e12 60%, #0a0a0b 100%)", border: `0.5px solid ${C.borderMid}`, borderRadius: 16, padding: 28, position: "relative", overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "center" }} className="grid-2">
      <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div>
        <div style={{ fontFamily: F.display, fontSize: 22, fontWeight: 300, color: C.textPrimary, letterSpacing: 0.5, marginBottom: 8 }}>積分折合台幣</div>
        <div style={{ fontSize: 12, color: C.textMuted, fontFamily: F.body, marginBottom: 16, lineHeight: 1.7 }}>
          目前匯率：<span style={{ color: C.gold, fontFamily: F.mono }}>1 point = NT$1</span><br />可於商城兌換商品或折抵消費
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ background: "rgba(201,168,76,0.08)", border: `0.5px solid ${C.borderMid}`, borderRadius: 8, padding: "8px 16px" }}>
            <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 1.5, marginBottom: 4, fontFamily: F.body }}>我的積分</div>
            <div style={{ fontFamily: F.mono, fontSize: 18, fontWeight: 700, color: C.goldLight }}>{s.totalPoints.toFixed(2)} point</div>
          </div>
          <span style={{ color: C.textMuted, fontSize: 18 }}>→</span>
          <div style={{ background: "rgba(94,169,110,0.08)", border: "0.5px solid rgba(94,169,110,0.25)", borderRadius: 8, padding: "8px 16px" }}>
            <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 1.5, marginBottom: 4, fontFamily: F.body }}>折合台幣</div>
            <div style={{ fontFamily: F.mono, fontSize: 18, fontWeight: 700, color: "#5ea96e" }}>NT${Math.round(s.totalPoints * PTS_TO_NTD).toLocaleString()}</div>
          </div>
        </div>
      </div>
      <div style={{ background: "rgba(255,255,255,0.02)", border: `0.5px solid ${C.borderSubtle}`, borderRadius: 12, padding: 20 }}>
        <div style={{ fontSize: 11, color: C.textMuted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 16, fontFamily: F.body }}>自訂計算</div>
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: C.textSecondary, fontFamily: F.body }}>積分數量</span>
            <span style={{ fontFamily: F.mono, fontSize: 13, fontWeight: 700, color: C.goldLight }}>{pts.toLocaleString()} point</span>
          </div>
          <input type="range" min={1} max={20000} step={1} value={pts} onChange={(e) => setPts(Number(e.target.value))} style={{ width: "100%", accentColor: C.gold }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: C.textMuted, fontFamily: F.mono, marginTop: 4 }}>
            <span>1</span><span>20,000</span>
          </div>
        </div>
        <div style={{ background: "rgba(201,168,76,0.06)", border: `0.5px solid ${C.borderMid}`, borderRadius: 8, padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 6, fontFamily: F.body }}>折合台幣</div>
          <div style={{ fontFamily: F.mono, fontSize: 28, fontWeight: 700, color: "#5ea96e" }}>NT${ntd}</div>
          <div style={{ fontSize: 10, color: C.textMuted, marginTop: 4, fontFamily: F.body }}>匯率 1 point = NT$1</div>
        </div>
      </div>
    </div>
  );
}

// ─── Reward Breakdown ──────────────────────────────────────────────────────
function MultiplierBreakdown({ member }: { member: Member }) {
  const rows = getRewardRows(member);
  return (
    <div style={{ background: C.bgCard, border: `0.5px solid ${C.borderSubtle}`, borderRadius: 16, padding: 28 }}>
      <div style={{ fontFamily: F.display, fontSize: 20, fontWeight: 500, color: C.textPrimary, letterSpacing: 0.5, marginBottom: 24 }}>獎勵明細</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {rows.map((m, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: m.color, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: C.textSecondary, fontFamily: F.body, marginBottom: 2 }}>{m.label}</div>
              <div style={{ fontSize: 11, color: C.textMuted, fontFamily: F.body }}>{m.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── How To Boost ──────────────────────────────────────────────────────────
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

// ─── Page ──────────────────────────────────────────────────────────────────
export default function RewardsPage() {
  const [member, setMember] = useState<Member | null>(null);

  useEffect(() => {
    const uid = localStorage.getItem(UID_KEY);
    if (!uid) return;
    const found = members.find((m) => m.uid === uid);
    if (found) setMember(found);
  }, []);

  return (
    <Layout activePath="/rewards" title="獎勵積分">
      <div style={{ display: "flex", flexDirection: "column", gap: 32, maxWidth: 1200 }}>

        {/* 未登入提示 */}
        {!member && (
          <div style={{ padding: "16px 20px", background: "rgba(201,168,76,0.04)", border: `0.5px solid rgba(201,168,76,0.12)`, borderRadius: 10, fontFamily: F.body, fontSize: 13, color: C.textMuted }}>
            ← 請先前往 <a href="/member" style={{ color: C.gold, textDecoration: "none" }}>Member Access</a> 頁面輸入 UID 查詢會員資料
          </div>
        )}

        {member && (
          <>
            <div>
              <SectionLabel>積分總覽 · {member.name} · {member.uid}</SectionLabel>
              <PointsSummary member={member} />
            </div>
            <div>
              <SectionLabel>積分折合台幣</SectionLabel>
              <NTDConverter member={member} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="grid-2">
              <div>
                <SectionLabel>獎勵明細</SectionLabel>
                <MultiplierBreakdown member={member} />
              </div>
              <div>
                <SectionLabel>如何提升獎勵</SectionLabel>
                <HowToBoost />
              </div>
            </div>
          </>
        )}

        <div style={{ height: 8 }} />
      </div>
    </Layout>
  );
}
