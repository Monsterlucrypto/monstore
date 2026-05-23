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

const user = {
  name: "Chinglu", tier: "Gold", progressPct: 62,
  current: "$2.84M", target: "$4.00M", remaining: "$1.16M", joinDate: "2023.04",
};

const tiers = [
  { id: "bronze",  name: "Bronze",  label: "銅牌",  icon: "◎",  requirement: "$0 – $500K",    color: "#cd7f32", colorDim: "rgba(205,127,50,0.15)",  colorBorder: "rgba(205,127,50,0.3)",  commission: "0.20%", pointsRate: "1.0×", discount: "0%",  support: "標準",    signals: false, manager: false, founderPass: false },
  { id: "silver",  name: "Silver",  label: "銀牌",  icon: "◈",  requirement: "$500K – $1.5M", color: "#a8a9ad", colorDim: "rgba(168,169,173,0.15)", colorBorder: "rgba(168,169,173,0.3)", commission: "0.16%", pointsRate: "1.5×", discount: "15%", support: "優先",    signals: false, manager: false, founderPass: false },
  { id: "gold",    name: "Gold",    label: "金牌",  icon: "✦",  requirement: "$1.5M – $4M",   color: "#C9A84C", colorDim: "rgba(201,168,76,0.15)",  colorBorder: "rgba(201,168,76,0.3)",  commission: "0.12%", pointsRate: "2.5×", discount: "30%", support: "優先",    signals: false, manager: false, founderPass: false, current: true },
  { id: "founder", name: "Founder", label: "創始人", icon: "🥚", requirement: "$4M+",          color: "#E8C96A", colorDim: "rgba(232,201,106,0.15)", colorBorder: "rgba(232,201,106,0.4)", commission: "0.08%", pointsRate: "3.0×", discount: "50%", support: "專屬經理", signals: true,  manager: true,  founderPass: true  },
];

const history = [
  { date: "2024.11.03", from: "Silver", to: "Gold",   volume: "$1.52M", note: "突破月交易量門檻"   },
  { date: "2024.03.18", from: "Bronze", to: "Silver", volume: "$512K",  note: "達成累計交易量目標" },
  { date: "2023.04.01", from: "—",      to: "Bronze", volume: "—",      note: "帳號建立，初始等級" },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 10, letterSpacing: 3, color: C.textMuted, textTransform: "uppercase", marginBottom: 16, fontFamily: F.body }}>
      {children}
    </div>
  );
}

function TierBadge({ tier }: { tier: typeof tiers[0] }) {
  return (
    <span style={{ fontSize: 10, letterSpacing: 1.5, padding: "3px 10px", borderRadius: 20, border: `0.5px solid ${tier.colorBorder}`, background: tier.colorDim, color: tier.color, fontFamily: F.body, fontWeight: 500, textTransform: "uppercase" }}>
      {tier.icon} {tier.name}
    </span>
  );
}

function CurrentStatusCard() {
  const tier = tiers.find((t) => t.id === "gold")!;
  const nextTier = tiers.find((t) => t.id === "founder")!;
  return (
    <div style={{ background: "linear-gradient(135deg, #1a1508 0%, #0e0e12 40%, #0a0a0b 100%)", border: `0.5px solid ${C.borderMid}`, borderRadius: 16, padding: 32, position: "relative", overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }} className="grid-2">
      <div style={{ position: "absolute", top: -40, right: -40, width: 240, height: 240, background: "radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div>
        <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8, fontFamily: F.body }}>目前等級</div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ fontFamily: F.display, fontSize: 42, fontWeight: 300, color: C.goldLight, letterSpacing: 2, lineHeight: 1 }}>{tier.name}</div>
          <TierBadge tier={tier} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[{ label: "佣金費率", value: tier.commission }, { label: "積分倍率", value: tier.pointsRate }, { label: "商城折扣", value: tier.discount }].map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: 9, color: C.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4, fontFamily: F.body }}>{s.label}</div>
              <div style={{ fontFamily: F.mono, fontSize: 18, fontWeight: 700, color: C.goldLight }}>{s.value}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 12, color: C.textSecondary, fontFamily: F.body }}>距離 <span style={{ color: nextTier.color, fontFamily: F.mono }}>{nextTier.name}</span> 還差</div>
          <span style={{ fontFamily: F.mono, fontSize: 13, fontWeight: 700, color: C.gold }}>{user.remaining}</span>
        </div>
        <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 4, height: 8, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${user.progressPct}%`, background: `linear-gradient(90deg, ${C.goldDim}, ${C.gold}, ${C.goldLight})`, borderRadius: 4, transition: "width 1s ease" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.textMuted, fontFamily: F.mono }}>
          <span>目前 {user.current}</span><span>{user.progressPct}%</span><span>目標 {user.target}</span>
        </div>
        <div style={{ fontSize: 11, color: C.textMuted, fontFamily: F.body, lineHeight: 1.6 }}>
          達到 <span style={{ color: nextTier.color }}>Founder</span> 等級可獲得：專屬客戶經理、私人交易訊號、3× 積分倍率、50% 商城折扣
        </div>
      </div>
    </div>
  );
}

function TierCards() {
  const [hov, setHov] = useState<string | null>(null);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="grid-4">
      {tiers.map((tier) => {
        const isCurrent = tier.id === "gold";
        const isHov = hov === tier.id;
        return (
          <div key={tier.id} onMouseEnter={() => setHov(tier.id)} onMouseLeave={() => setHov(null)}
            style={{ background: isCurrent ? "rgba(201,168,76,0.06)" : isHov ? C.bgCardHover : C.bgCard, border: `0.5px solid ${isCurrent ? C.borderStrong : isHov ? C.borderMid : C.borderSubtle}`, borderRadius: 14, padding: 24, position: "relative", overflow: "hidden", transition: "all 0.25s ease", transform: isHov ? "translateY(-2px)" : "none" }}
          >
            {isCurrent && (
              <div style={{ position: "absolute", top: 12, right: 12, fontSize: 9, color: C.gold, background: "rgba(201,168,76,0.1)", border: `0.5px solid ${C.borderMid}`, padding: "2px 8px", borderRadius: 4, letterSpacing: 1, fontFamily: F.body }}>目前</div>
            )}
            <div style={{ marginBottom: 10 }}>
              {tier.id === "founder" ? (
                <svg width="28" height="34" viewBox="0 0 28 34" fill="none">
                  <ellipse cx="14" cy="19" rx="13" ry="15" fill="#C9A84C" opacity="0.9"/>
                  <ellipse cx="14" cy="19" rx="10" ry="12" fill="#C9A84C" opacity="0.4"/>
                </svg>
              ) : (
                <span style={{ fontSize: 28, color: tier.color }}>{tier.icon}</span>
              )}
            </div>
            <div style={{ fontFamily: F.display, fontSize: 22, fontWeight: 500, color: tier.color, letterSpacing: 1, marginBottom: 4 }}>{tier.name}</div>
            <div style={{ fontSize: 11, color: C.textMuted, fontFamily: F.body, marginBottom: 16 }}>{tier.requirement}</div>
            <div style={{ height: "0.5px", background: tier.colorBorder, marginBottom: 16 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[{ label: "佣金費率", value: tier.commission }, { label: "積分倍率", value: tier.pointsRate }, { label: "商城折扣", value: tier.discount }, { label: "客服支援", value: tier.support }].map((s) => (
                <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: C.textMuted, fontFamily: F.body }}>{s.label}</span>
                  <span style={{ fontSize: 12, fontFamily: F.mono, fontWeight: 700, color: tier.color }}>{s.value}</span>
                </div>
              ))}
              <div style={{ height: "0.5px", background: C.borderSubtle, margin: "4px 0" }} />
              {[{ label: "私人訊號", value: tier.signals }, { label: "專屬經理", value: tier.manager }, { label: "Founder Pass", value: tier.founderPass }].map((s) => (
                <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: C.textMuted, fontFamily: F.body }}>{s.label}</span>
                  <span style={{ fontSize: 13, color: s.value ? "#5ea96e" : C.textMuted }}>{s.value ? "✓" : "✗"}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function BenefitsTable() {
  const rows = [
    { label: "月交易量門檻",  values: ["$0+", "$500K+", "$1.5M+", "$4M+"] },
    { label: "佣金費率",      values: ["0.20%", "0.16%", "0.12%", "0.08%"] },
    { label: "積分倍率",      values: ["1.0×", "1.5×", "2.5×", "3.0×"] },
    { label: "商城折扣",      values: ["0%", "15%", "30%", "50%"] },
    { label: "客服支援",      values: ["標準", "優先", "優先", "專屬經理"] },
    { label: "私人交易訊號",  values: ["✗", "✗", "✗", "✓"] },
    { label: "Founder Pass",  values: ["✗", "✗", "✗", "✓"] },
    { label: "優先商品搶購",  values: ["✗", "✗", "✓", "✓"] },
    { label: "專屬活動邀請",  values: ["✗", "✗", "✓", "✓"] },
  ];
  const tierColors = ["#cd7f32", "#a8a9ad", C.gold, C.goldLight];

  return (
    <div style={{ background: C.bgCard, border: `0.5px solid ${C.borderSubtle}`, borderRadius: 16, overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: F.body }}>
        <thead>
          <tr style={{ borderBottom: `0.5px solid ${C.borderSubtle}` }}>
            <th style={{ padding: "16px 20px", textAlign: "left", fontSize: 11, color: C.textMuted, fontWeight: 400, letterSpacing: 1.5, textTransform: "uppercase", width: "30%" }}>權益項目</th>
            {tiers.map((t, i) => (
              <th key={t.id} style={{ padding: "16px 20px", textAlign: "center", fontSize: 13, color: tierColors[i], fontWeight: 600, fontFamily: F.display, letterSpacing: 1, background: t.id === "gold" ? "rgba(201,168,76,0.04)" : "transparent" }}>
                {t.icon} {t.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={row.label} style={{ borderBottom: ri < rows.length - 1 ? `0.5px solid ${C.borderSubtle}` : "none" }}>
              <td style={{ padding: "14px 20px", fontSize: 12, color: C.textSecondary, fontFamily: F.body }}>{row.label}</td>
              {row.values.map((val, vi) => {
                const isCurrent = vi === 2;
                const isCheck = val === "✓";
                const isCross = val === "✗";
                return (
                  <td key={vi} style={{ padding: "14px 20px", textAlign: "center", fontFamily: isCross || isCheck ? F.body : F.mono, fontSize: isCheck || isCross ? 14 : 12, fontWeight: 700, color: isCross ? C.textMuted : isCheck ? "#5ea96e" : isCurrent ? C.gold : tierColors[vi], background: isCurrent ? "rgba(201,168,76,0.04)" : "transparent" }}>
                    {val}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function UpgradeHistory() {
  return (
    <div style={{ background: C.bgCard, border: `0.5px solid ${C.borderSubtle}`, borderRadius: 16, padding: 28 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div style={{ fontFamily: F.display, fontSize: 20, fontWeight: 500, color: C.textPrimary, letterSpacing: 0.5 }}>升級歷史</div>
        <span style={{ fontSize: 11, color: C.textMuted, fontFamily: F.mono }}>共 {history.length} 筆紀錄</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {history.map((h, i) => {
          const toTier = tiers.find((t) => t.name === h.to);
          return (
            <div key={i} style={{ display: "flex", gap: 20, position: "relative" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: toTier ? toTier.colorDim : "rgba(255,255,255,0.04)", border: `0.5px solid ${toTier ? toTier.colorBorder : C.borderSubtle}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: toTier ? toTier.color : C.textMuted, flexShrink: 0 }}>
                  {toTier ? toTier.icon : "◎"}
                </div>
                {i < history.length - 1 && <div style={{ width: 1, flex: 1, minHeight: 32, background: C.borderSubtle, margin: "4px 0" }} />}
              </div>
              <div style={{ flex: 1, paddingBottom: i < history.length - 1 ? 24 : 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <span style={{ fontFamily: F.mono, fontSize: 11, color: C.textMuted }}>{h.date}</span>
                  {h.from !== "—" && (<><span style={{ fontSize: 11, color: C.textMuted }}>{h.from}</span><span style={{ fontSize: 11, color: C.textMuted }}>→</span></>)}
                  {toTier && <TierBadge tier={toTier} />}
                </div>
                <div style={{ fontSize: 13, color: C.textSecondary, fontFamily: F.body, marginBottom: 4 }}>{h.note}</div>
                {h.volume !== "—" && <div style={{ fontSize: 11, color: C.textMuted, fontFamily: F.mono }}>達成交易量：{h.volume}</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function VIPMembershipPage() {
  return (
    <Layout activePath="/vip" title="VIP 會員等級">
      <div style={{ display: "flex", flexDirection: "column", gap: 32, maxWidth: 1200 }}>
        <div>
          <SectionLabel>目前狀態</SectionLabel>
          <CurrentStatusCard />
        </div>
        <div>
          <SectionLabel>等級總覽</SectionLabel>
          <TierCards />
        </div>
        <div>
          <SectionLabel>權益詳細比較</SectionLabel>
          <BenefitsTable />
        </div>
        <div>
          <SectionLabel>升級歷史</SectionLabel>
          <UpgradeHistory />
        </div>
        <div style={{ height: 8 }} />
      </div>
    </Layout>
  );
}
