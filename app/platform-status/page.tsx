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
  green: "#5ea96e", greenDim: "rgba(94,169,110,0.08)", greenBorder: "rgba(94,169,110,0.25)",
};

const F = {
  display: "'Cormorant Garamond', Georgia, serif",
  body: "'DM Sans', system-ui, sans-serif",
  mono: "'Space Mono', monospace",
};

// ── Mock Data ────────────────────────────────────────────────────────────────

// 從 members 加總手續費
const totalCommissionsUSDT = members.reduce((s, m) => s + m.commissions, 0);

const overview = [
  { label: "Monthly Revenue",      sub: "本月平台總收入", value: "NT$29,760",                                          change: "+18.4%", changeLabel: "vs last month", icon: "◈", positive: true },
  { label: "Total Orders",         sub: "本月訂單總數",   value: "42 Orders",                                          change: "+12.0%", changeLabel: "vs last month", icon: "⟐", positive: true },
  { label: "Referral Commissions", sub: "累計推薦佣金",   value: `$${totalCommissionsUSDT.toFixed(2)} USDT`,           change: `${members.filter(m=>m.commissions>0).length} 位會員`, changeLabel: "有佣金", icon: "◎", positive: true },
  { label: "Treasury Balance",     sub: "財庫目前餘額",   value: "NT$10,000",                                          change: "NT$2,500", changeLabel: "this month",  icon: "◆", positive: true },
];

const revenueBreakdown = [
  { label: "交易所推薦收入", value: 18640, pct: 62.6, color: "#E8C96A" },
  { label: "商城銷售收入", value: 8256,  pct: 27.7, color: "#C9A84C" },
  { label: "其他來源收入", value: 2864,  pct: 9.6,  color: "#7a6130" },
];
const totalRevenue = revenueBreakdown.reduce((s, r) => s + r.value, 0);

const rewardPool = {
  amount: "NT$5,952",
  change: "+14.2%",
  allocation: 20,
  revenue: 29760,
};

// community 改為從 members 動態計算

const treasury = {
  balance: 10000,
  expenses: 1800,
  runway: 5.5,
};

const growthMetrics = [
  { label: "Total Trading Volume",        sub: "累計交易總量",       value: "NT$186,400", change: "+21.3%", positive: true },
  { label: "Total Commissions Generated", sub: "累計佣金總額",       value: "NT$7,832",   change: "+23.0%", positive: true },
  { label: "Avg Volume Per Member",       sub: "每位會員平均交易量", value: "NT$751",     change: "+6.1%",  positive: true },
];

const founderStatus = {
  allocatedUnits: 1860,
  totalUnits: 10000,
  holders: 5,
  progress: 18.6,
};



// ── Components ───────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 10, letterSpacing: 3, color: C.textMuted, textTransform: "uppercase", marginBottom: 16, fontFamily: F.body }}>
      {children}
    </div>
  );
}

function LiveBadge() {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: C.greenDim, border: `0.5px solid ${C.greenBorder}`, borderRadius: 20, padding: "5px 14px" }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, display: "inline-block", boxShadow: `0 0 6px ${C.green}` }} />
      <span style={{ fontSize: 10, color: C.green, fontFamily: F.body, letterSpacing: 2, textTransform: "uppercase" }}>Live · All Systems Operational</span>
    </div>
  );
}

function PlatformOverview() {
  const [hov, setHov] = useState<number | null>(null);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="grid-4">
      {overview.map((o, i) => (
        <div key={o.label}
          onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
          style={{ background: hov === i ? C.bgCardHover : C.bgCard, border: `0.5px solid ${hov === i ? C.borderMid : C.borderSubtle}`, borderRadius: 14, padding: 22, transition: "all 0.2s ease", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)", opacity: hov === i ? 1 : 0, transition: "opacity 0.2s" }} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontSize: 11, color: C.textMuted, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: F.body }}>{o.label}</span>
            <span style={{ fontSize: 18, color: C.gold }}>{o.icon}</span>
          </div>
          <div style={{ fontSize: 12, color: C.textSecondary, fontFamily: F.body, marginBottom: 14 }}>{o.sub}</div>
          <div style={{ fontFamily: F.mono, fontSize: 24, fontWeight: 700, color: C.textPrimary, marginBottom: 8, lineHeight: 1 }}>{o.value}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: o.positive ? C.green : "#c95e5e", fontFamily: F.mono }}>{o.change}</span>
            <span style={{ fontSize: 11, color: C.textMuted, fontFamily: F.body }}>{o.changeLabel}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function RevenueBreakdown() {
  const [hov, setHov] = useState<number | null>(null);

  // Simple donut via conic-gradient
  const conicStops = revenueBreakdown.reduce<{ stops: string[]; offset: number }>(
    (acc, r) => {
      const start = acc.offset;
      const end = start + r.pct;
      acc.stops.push(`${r.color} ${start.toFixed(1)}% ${end.toFixed(1)}%`);
      acc.offset = end;
      return acc;
    },
    { stops: [], offset: 0 }
  );

  return (
    <div style={{ background: C.bgCard, border: `0.5px solid ${C.borderSubtle}`, borderRadius: 16, padding: 28 }}>
      <div style={{ fontFamily: F.display, fontSize: 20, fontWeight: 500, color: C.textPrimary, letterSpacing: 0.5, marginBottom: 6 }}>Revenue Breakdown</div>
      <div style={{ fontSize: 12, color: C.textMuted, fontFamily: F.body, marginBottom: 24 }}>本月收入來源分佈</div>
      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 40, alignItems: "center" }} className="grid-2">
        {/* Donut */}
        <div style={{ position: "relative", width: 160, height: 160, flexShrink: 0 }}>
          <div style={{
            width: 160, height: 160, borderRadius: "50%",
            background: `conic-gradient(${conicStops.stops.join(", ")})`,
            mask: "radial-gradient(circle at center, transparent 54px, black 55px)",
            WebkitMask: "radial-gradient(circle at center, transparent 54px, black 55px)",
          }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontFamily: F.mono, fontSize: 13, fontWeight: 700, color: C.goldLight }}>NT${totalRevenue.toLocaleString()}</div>
            <div style={{ fontSize: 9, color: C.textMuted, fontFamily: F.body, letterSpacing: 1.5, textTransform: "uppercase", marginTop: 2 }}>Total</div>
          </div>
        </div>
        {/* Bars */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {revenueBreakdown.map((r, i) => (
            <div key={r.label}
              onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
              style={{ opacity: hov !== null && hov !== i ? 0.4 : 1, transition: "opacity 0.2s", cursor: "default" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: r.color, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 12, color: C.textSecondary, fontFamily: F.body }}>{r.label}</div>
                    <div style={{ fontSize: 11, color: C.textMuted, fontFamily: F.body }}>{r.sub}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <span style={{ fontFamily: F.mono, fontSize: 12, color: C.textPrimary }}>NT${r.value.toLocaleString()}</span>
                  <span style={{ fontFamily: F.mono, fontSize: 11, color: r.color, minWidth: 36, textAlign: "right" }}>{r.pct}%</span>
                </div>
              </div>
              <div style={{ height: 4, background: "rgba(255,255,255,0.04)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${r.pct}%`, background: `linear-gradient(90deg, ${r.color}80, ${r.color})`, borderRadius: 2 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RewardPoolStatus() {
  const poolAmt = Math.round(rewardPool.revenue * rewardPool.allocation / 100);
  return (
    <div style={{ background: "linear-gradient(135deg, #0f0d07 0%, #0a0a0b 100%)", border: `0.5px solid ${C.borderMid}`, borderRadius: 16, padding: 28, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -60, right: -60, width: 240, height: 240, background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8, fontFamily: F.body }}>Monthly Reward Pool</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6 }}>
        <span style={{ fontFamily: F.mono, fontSize: 36, fontWeight: 700, color: C.goldLight, lineHeight: 1 }}>{rewardPool.amount}</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: C.green, fontFamily: F.mono }}>{rewardPool.change}</span>
        <span style={{ fontSize: 11, color: C.textMuted, fontFamily: F.body }}>vs last month</span>
      </div>
      <div style={{ fontSize: 12, color: C.textMuted, fontFamily: F.body, marginBottom: 28 }}>本月 Reward Pool 已提撥金額</div>

      {/* Flow diagram */}
      <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
        <div style={{ background: "rgba(201,168,76,0.06)", border: `0.5px solid ${C.borderMid}`, borderRadius: 10, padding: "12px 18px", textAlign: "center" }}>
          <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 2, fontFamily: F.body }}>Revenue</div>
          <div style={{ fontSize: 10, color: C.textMuted, fontFamily: F.body, marginBottom: 4 }}>平台月收入</div>
          <div style={{ fontFamily: F.mono, fontSize: 14, fontWeight: 700, color: C.textPrimary }}>NT${rewardPool.revenue.toLocaleString()}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 12px" }}>
          <div style={{ fontSize: 18, color: C.gold }}>→</div>
          <div style={{ fontSize: 9, color: C.gold, fontFamily: F.mono, letterSpacing: 1 }}>{rewardPool.allocation}%</div>
        </div>
        <div style={{ background: "rgba(201,168,76,0.06)", border: `0.5px solid ${C.borderMid}`, borderRadius: 10, padding: "12px 18px", textAlign: "center" }}>
          <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 2, fontFamily: F.body }}>Allocation</div>
          <div style={{ fontSize: 10, color: C.textMuted, fontFamily: F.body, marginBottom: 4 }}>提撥比例</div>
          <div style={{ fontFamily: F.mono, fontSize: 14, fontWeight: 700, color: C.gold }}>{rewardPool.allocation}%</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 12px" }}>
          <div style={{ fontSize: 18, color: C.gold }}>→</div>
        </div>
        <div style={{ background: "rgba(232,201,106,0.1)", border: `0.5px solid rgba(232,201,106,0.4)`, borderRadius: 10, padding: "12px 18px", textAlign: "center" }}>
          <div style={{ fontSize: 10, color: C.goldLight, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 2, fontFamily: F.body }}>Reward Pool</div>
          <div style={{ fontSize: 10, color: C.goldLight, fontFamily: F.body, marginBottom: 4, opacity: 0.7 }}>本月獎勵池</div>
          <div style={{ fontFamily: F.mono, fontSize: 14, fontWeight: 700, color: C.goldLight }}>NT${poolAmt.toLocaleString()}</div>
        </div>
      </div>
      <div style={{ marginTop: 16, fontSize: 11, color: C.textMuted, fontFamily: F.body, lineHeight: 1.6 }}>
        ✦ 平台每月淨收益的 {rewardPool.allocation}% 提撥至 Monthly Reward Pool，按 Founder Units 比例分配
      </div>
    </div>
  );
}

function CommunityGrowth() {
  const now = new Date();
  const thisYear  = now.getFullYear();
  const thisMonth = now.getMonth() + 1; // 1-12

  // 上個月的年月
  const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastYear  = lastMonthDate.getFullYear();
  const lastMonth = lastMonthDate.getMonth() + 1;

  // 解析 memberSince "2026.05.24" → { year, month }
  const parseSince = (s: string) => {
    const [y, m] = s.split(".").map(Number);
    return { year: y, month: m };
  };

  // 本月新加入
  const joinedThisMonth = members.filter(m => {
    const { year, month } = parseSince(m.memberSince);
    return year === thisYear && month === thisMonth;
  }).length;

  // 上個月加入
  const joinedLastMonth = members.filter(m => {
    const { year, month } = parseSince(m.memberSince);
    return year === lastYear && month === lastMonth;
  }).length;

  const totalMembers   = members.length;
  const founderHolders = members.filter(m => m.founderPass !== null).length;
  const activeMembers  = members.filter(m => m.tradingVolume > 0).length;

  // 上個月底的總會員數（= 今天總數 - 本月新加入）
  const lastMonthTotal = totalMembers - joinedThisMonth;
  const memberGrowthPct = lastMonthTotal > 0
    ? ((joinedThisMonth / lastMonthTotal) * 100).toFixed(1)
    : null;

  const stats = [
    {
      label: "Current Members", sub: "目前總會員數",
      value: totalMembers, color: C.gold,
      newThisMonth: joinedThisMonth,
      growthPct: memberGrowthPct,
    },
    {
      label: "Founder Holders", sub: "創始會員持有人數",
      value: founderHolders, color: "#E8C96A",
      newThisMonth: null, growthPct: null,
    },
    {
      label: "Active Members", sub: "活躍中的會員",
      value: activeMembers, color: C.green,
      newThisMonth: null, growthPct: null,
    },
  ];

  return (
    <div style={{ background: C.bgCard, border: `0.5px solid ${C.borderSubtle}`, borderRadius: 16, padding: 28 }}>
      <div style={{ fontFamily: F.display, fontSize: 20, fontWeight: 500, color: C.textPrimary, letterSpacing: 0.5, marginBottom: 24 }}>Community Growth</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="grid-3">
        {stats.map((c) => (
          <div key={c.label} style={{ background: "rgba(255,255,255,0.02)", border: `0.5px solid ${C.borderSubtle}`, borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4, fontFamily: F.body }}>{c.label}</div>
            <div style={{ fontSize: 12, color: C.textSecondary, fontFamily: F.body, marginBottom: 12 }}>{c.sub}</div>
            <div style={{ fontFamily: F.mono, fontSize: 32, fontWeight: 700, color: c.color, lineHeight: 1, marginBottom: c.newThisMonth !== null ? 10 : 0 }}>{c.value.toLocaleString()}</div>
            {c.newThisMonth !== null && (
              <>
                <div style={{ height: "0.5px", background: C.borderSubtle, marginBottom: 10 }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: C.textMuted, fontFamily: F.body }}>+{c.newThisMonth} 本月新增</span>
                  {c.growthPct !== null && (
                    <span style={{ fontSize: 11, fontWeight: 600, color: C.green, fontFamily: F.mono }}>+{c.growthPct}%</span>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function TreasuryHealth() {
  const runwayPct = Math.min((treasury.runway / 12) * 100, 100);
  const runwayColor = treasury.runway >= 6 ? C.green : treasury.runway >= 3 ? "#c9954c" : "#c95e5e";
  return (
    <div style={{ background: "linear-gradient(135deg, #0a1208 0%, #0a0a0b 100%)", border: `0.5px solid ${C.greenBorder}`, borderRadius: 16, padding: 28, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, background: "radial-gradient(circle, rgba(94,169,110,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ fontFamily: F.display, fontSize: 20, fontWeight: 500, color: C.textPrimary, letterSpacing: 0.5, marginBottom: 24 }}>Treasury Health</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }} className="grid-3">
        {[
          { label: "Treasury Balance",  sub: "財庫目前餘額", value: `NT$${treasury.balance.toLocaleString()}`,   color: C.goldLight },
          { label: "Monthly Expenses",  sub: "每月固定支出", value: `NT$${treasury.expenses.toLocaleString()}`,  color: C.textPrimary },
          { label: "Runway",            sub: "預計可維運月數", value: `${treasury.runway} Months`,               color: runwayColor  },
        ].map((s) => (
          <div key={s.label} style={{ background: "rgba(255,255,255,0.02)", border: `0.5px solid ${C.borderSubtle}`, borderRadius: 10, padding: 18 }}>
            <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4, fontFamily: F.body }}>{s.label}</div>
            <div style={{ fontSize: 11, color: C.textSecondary, fontFamily: F.body, marginBottom: 8 }}>{s.sub}</div>
            <div style={{ fontFamily: F.mono, fontSize: 18, fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: C.textMuted, fontFamily: F.mono, marginBottom: 6 }}>
          <span>Runway Progress</span>
          <span style={{ color: runwayColor }}>{treasury.runway} / 12 Months</span>
        </div>
        <div style={{ height: 6, background: "rgba(255,255,255,0.04)", borderRadius: 3, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${runwayPct}%`, background: `linear-gradient(90deg, ${runwayColor}80, ${runwayColor})`, borderRadius: 3 }} />
        </div>
      </div>
    </div>
  );
}

function GrowthMetrics() {
  return (
    <div style={{ background: C.bgCard, border: `0.5px solid ${C.borderSubtle}`, borderRadius: 16, padding: 28 }}>
      <div style={{ fontFamily: F.display, fontSize: 20, fontWeight: 500, color: C.textPrimary, letterSpacing: 0.5, marginBottom: 24 }}>Growth Metrics</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {growthMetrics.map((g, i) => (
          <div key={g.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 0", borderBottom: i < growthMetrics.length - 1 ? `0.5px solid ${C.borderSubtle}` : "none" }}>
            <div>
              <div style={{ fontSize: 13, color: C.textSecondary, fontFamily: F.body }}>{g.label}</div>
              <div style={{ fontSize: 11, color: C.textMuted, fontFamily: F.body, marginTop: 2 }}>{g.sub}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ fontFamily: F.mono, fontSize: 16, fontWeight: 700, color: C.textPrimary }}>{g.value}</span>
              <span style={{ fontFamily: F.mono, fontSize: 12, fontWeight: 600, color: g.positive ? C.green : "#c95e5e", minWidth: 56, textAlign: "right" }}>{g.change}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GenesisFounderStatus() {
  const pct = founderStatus.progress;
  return (
    <div style={{ background: "linear-gradient(135deg, #1a1508 0%, #0e0e12 60%, #0a0a0b 100%)", border: `0.5px solid ${C.borderMid}`, borderRadius: 16, padding: 28, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -40, right: -40, width: 220, height: 220, background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ fontFamily: F.display, fontSize: 20, fontWeight: 500, color: C.textPrimary, letterSpacing: 0.5, marginBottom: 6 }}>Genesis Founder Status</div>
      <div style={{ fontSize: 12, color: C.textMuted, fontFamily: F.body, marginBottom: 24 }}>Phase One · Genesis Release 開放進度</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }} className="grid-3">
        {[
          { label: "Allocated Units",    sub: "已分配 Reward Units", value: `${founderStatus.allocatedUnits.toLocaleString()} Units`, color: C.goldLight },
          { label: "Founder Holders",    sub: "創始會員持有人數",    value: `${founderStatus.holders} Members`,                       color: C.textPrimary },
          { label: "Release Progress",   sub: "第一階段開放進度",    value: `${founderStatus.progress}%`,                              color: C.gold },
        ].map((s) => (
          <div key={s.label} style={{ background: "rgba(201,168,76,0.04)", border: `0.5px solid ${C.borderSubtle}`, borderRadius: 10, padding: 18 }}>
            <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4, fontFamily: F.body }}>{s.label}</div>
            <div style={{ fontSize: 11, color: C.textSecondary, fontFamily: F.body, marginBottom: 8 }}>{s.sub}</div>
            <div style={{ fontFamily: F.mono, fontSize: 18, fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: C.textMuted, fontFamily: F.mono, marginBottom: 8 }}>
          <span>0 Units</span>
          <span style={{ color: C.gold }}>Genesis Release · {pct}% Allocated</span>
          <span>10,000 Units</span>
        </div>
        <div style={{ height: 8, background: "rgba(255,255,255,0.04)", borderRadius: 4, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${C.goldDim}, ${C.gold}, ${C.goldLight})`, borderRadius: 4 }} />
        </div>
        <div style={{ marginTop: 10, fontSize: 11, color: C.textMuted, fontFamily: F.body }}>
          ✦ 已分配 {founderStatus.allocatedUnits.toLocaleString()} / {founderStatus.totalUnits.toLocaleString()} Units · 剩餘 {(founderStatus.totalUnits - founderStatus.allocatedUnits).toLocaleString()} Units 尚未開放
        </div>
      </div>
    </div>
  );
}


// ── Page ─────────────────────────────────────────────────────────────────────

export default function PlatformStatusPage() {
  const [member, setMember] = useState<Member | null>(null);

  useEffect(() => {
    const uid = localStorage.getItem(UID_KEY);
    if (!uid) return;
    const found = members.find((m) => m.uid === uid);
    if (found) setMember(found);
  }, []);

  return (
    <Layout activePath="/platform-status" title="Platform Status">
      <div style={{ display: "flex", flexDirection: "column", gap: 32, maxWidth: 1200 }}>

        {/* 未登入提示 */}
        {!member && (
          <div style={{ padding: "16px 20px", background: "rgba(201,168,76,0.04)", border: `0.5px solid rgba(201,168,76,0.12)`, borderRadius: 10, fontFamily: F.body, fontSize: 13, color: C.textMuted }}>
            ← 請先前往 <a href="/member" style={{ color: C.gold, textDecoration: "none" }}>Member Access</a> 頁面輸入 UID 查詢會員資料
          </div>
        )}

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontFamily: F.display, fontSize: 32, fontWeight: 300, color: C.textPrimary, letterSpacing: 1, marginBottom: 6 }}>Platform Status</div>
            <div style={{ fontSize: 12, color: C.textMuted, fontFamily: F.body }}>
              Monstore · 營運狀態與成長數據儀表板{member ? ` · ${member.name}` : ""}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            {member && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(201,168,76,0.06)", border: `0.5px solid ${C.borderMid}`, borderRadius: 8, padding: "6px 14px" }}>
                <span style={{ fontSize: 10, color: C.textMuted, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: F.body }}>VIP</span>
                <span style={{ fontFamily: F.mono, fontSize: 12, fontWeight: 700, color: C.goldLight }}>{member.vip}</span>
                {member.founderPass && (
                  <>
                    <span style={{ fontSize: 10, color: C.textMuted }}>·</span>
                    <span style={{ fontSize: 10, color: C.gold, fontFamily: F.body }}>Founder {member.founderPass}</span>
                  </>
                )}
              </div>
            )}
            <LiveBadge />
          </div>
        </div>

        <div>
          <SectionLabel>Platform Overview · 平台概覽</SectionLabel>
          <PlatformOverview />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="grid-2">
          <div>
            <SectionLabel>Revenue Breakdown · 收入分佈</SectionLabel>
            <RevenueBreakdown />
          </div>
          <div>
            <SectionLabel>Reward Pool Status · 獎勵池狀態</SectionLabel>
            <RewardPoolStatus />
          </div>
        </div>

        <div>
          <SectionLabel>Community Growth · 社群成長</SectionLabel>
          <CommunityGrowth />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="grid-2">
          <div>
            <SectionLabel>Treasury Health · 財庫健康度</SectionLabel>
            <TreasuryHealth />
          </div>
          <div>
            <SectionLabel>Growth Metrics · 成長指標</SectionLabel>
            <GrowthMetrics />
          </div>
        </div>

        <div>
          <SectionLabel>Genesis Founder Status · 創始會員進度</SectionLabel>
          <GenesisFounderStatus />
        </div>


        <div style={{ height: 8 }} />
      </div>
    </Layout>
  );
}
