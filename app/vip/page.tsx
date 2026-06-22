"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { members } from "@/data/members";
import type { Member } from "@/data/members";

const UID_KEY = "monstore_uid";

// ─── Tier definitions (static, display only) ──────────────────────────────
const TIERS = [
  {
    id: "Normal", name: "Normal", label: "Normal Access", icon: "◆",
    requirement: "50K – 300K",
    color: "#cd7f32", colorDim: "rgba(205,127,50,0.15)", colorBorder: "rgba(205,127,50,0.3)",
    signals: false,
    perks: [
      "每月抽獎資格 × 1",
      "每月 50 NTD 電商折價券（無低消）",
      "95折優惠券 × 1（低消 500）",
    ],
  },
  {
    id: "Silver", name: "Silver", label: "Silver Access", icon: "◆",
    requirement: "300K – 1M",
    color: "#a8a9ad", colorDim: "rgba(168,169,173,0.15)", colorBorder: "rgba(168,169,173,0.3)",
    signals: true,
    perks: [
      "每月抽獎資格 × 2",
      "每月 100 NTD 電商折價券（無低消）× 2",
      "9折優惠券 × 2（低消 500）",
      "私人交易訊號",
      "VIP 群組",
    ],
  },
  {
    id: "Gold", name: "Gold", label: "Gold Access", icon: "◆",
    requirement: "1M – 5M",
    color: "#C9A84C", colorDim: "rgba(201,168,76,0.15)", colorBorder: "rgba(201,168,76,0.3)",
    signals: true,
    perks: [
      "每月抽獎資格 × 3",
      "每月 100 NTD 電商折價券（無低消）× 2",
      "85折優惠券 × 2（低消 500）",
      "私人交易訊號",
      "VIP 群組",
      "專人客服",
    ],
  },
  {
    id: "Diamond", name: "Diamond", label: "Diamond Access", icon: "💎",
    requirement: "5M 以上",
    color: "#b0e0ff", colorDim: "rgba(176,224,255,0.12)", colorBorder: "rgba(176,224,255,0.35)",
    signals: true,
    perks: [
      "每月抽獎資格 × 10",
      "每月 100 NTD 電商折價券（無低消）× 5",
      "私人交易訊號",
      "VIP 群組",
      "專人客服",
    ],
  },
];

// ─── Progress calculation ──────────────────────────────────────────────────
function getProgress(vip: string, vol: number) {
  switch (vip) {
    case "Diamond": return { pct: 100, current: fmt(vol), target: "$5M+",  remaining: "—",       nextName: null };
    case "Gold":    return { pct: Math.min(99, Math.round(((vol - 1_000_000) / (5_000_000 - 1_000_000)) * 100)), current: fmt(vol), target: "$5M",   remaining: fmt(Math.max(0, 5_000_000 - vol)), nextName: "Diamond" };
    case "Silver":  return { pct: Math.min(99, Math.round(((vol - 300_000)   / (1_000_000 - 300_000))   * 100)), current: fmt(vol), target: "$1M",   remaining: fmt(Math.max(0, 1_000_000 - vol)), nextName: "Gold"    };
    default:        return { pct: Math.min(99, Math.max(0, Math.round(((vol - 50_000) / (300_000 - 50_000)) * 100))), current: fmt(vol), target: "$300K", remaining: fmt(Math.max(0, 300_000 - vol)),  nextName: "Silver"  };
  }
}

function fmt(v: number): string {
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(2)}M`;
  if (v >= 1_000)     return `$${Math.round(v / 1_000)}K`;
  return `$${v.toLocaleString()}`;
}

// ─── Styles ────────────────────────────────────────────────────────────────
const C = {
  gold: "#C9A84C", goldLight: "#E8C96A", goldDim: "#7a6130",
  bgPrimary: "#0a0a0b", bgCard: "#141418", bgCardHover: "#1a1a1f",
  borderSubtle: "rgba(201,168,76,0.12)", borderMid: "rgba(201,168,76,0.25)", borderStrong: "rgba(201,168,76,0.45)",
  textPrimary: "#f0ece0", textSecondary: "#8a8578", textMuted: "#4a4740",
};
const F = {
  display: "'Cormorant Garamond', Georgia, serif",
  body:    "'DM Sans', system-ui, sans-serif",
  mono:    "'Space Mono', monospace",
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 10, letterSpacing: 3, color: C.textMuted, textTransform: "uppercase", marginBottom: 16, fontFamily: F.body }}>
      {children}
    </div>
  );
}

function TierBadge({ tier }: { tier: typeof TIERS[0] }) {
  return (
    <span style={{ fontSize: 10, letterSpacing: 1.5, padding: "3px 10px", borderRadius: 20, border: `0.5px solid ${tier.colorBorder}`, background: tier.colorDim, color: tier.color, fontFamily: F.body, fontWeight: 500, textTransform: "uppercase" }}>
      {tier.icon} {tier.name}
    </span>
  );
}

// ─── Current Status Card ───────────────────────────────────────────────────
function CurrentStatusCard({ member }: { member: Member }) {
  const tier     = TIERS.find((t) => t.id === member.vip) ?? TIERS[0];
  const nextTier = TIERS[TIERS.indexOf(tier) + 1] ?? null;
  const prog     = getProgress(member.vip, member.tradingVolume);

  return (
    <div style={{ background: "linear-gradient(135deg, #1a1508 0%, #0e0e12 40%, #0a0a0b 100%)", border: `0.5px solid ${C.borderMid}`, borderRadius: 16, padding: 32, position: "relative", overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }} className="grid-2">
      <div style={{ position: "absolute", top: -40, right: -40, width: 240, height: 240, background: "radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Left: current tier */}
      <div>
        <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8, fontFamily: F.body }}>目前等級</div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ fontFamily: F.display, fontSize: 42, fontWeight: 300, color: tier.color, letterSpacing: 2, lineHeight: 1 }}>{tier.name}</div>
          <TierBadge tier={tier} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { label: "Trading Vol", value: member.tradingVolumeDisplay },
            { label: "Rank",        value: `#${member.tradingRank}` },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: 9, color: C.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 3, fontFamily: F.body }}>{s.label}</div>
              <div style={{ fontFamily: F.mono, fontSize: 16, fontWeight: 700, color: C.goldLight }}>{s.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: progress to next */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
        {nextTier ? (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 12, color: C.textSecondary, fontFamily: F.body }}>
                距離 <span style={{ color: nextTier.color, fontFamily: F.mono }}>{nextTier.name}</span> 還差
              </div>
              <span style={{ fontFamily: F.mono, fontSize: 13, fontWeight: 700, color: C.gold }}>{prog.remaining}</span>
            </div>
            <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 4, height: 8, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${prog.pct}%`, background: `linear-gradient(90deg, ${C.goldDim}, ${C.gold}, ${tier.color})`, borderRadius: 4, transition: "width 1s ease" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.textMuted, fontFamily: F.mono }}>
              <span>目前 {prog.current}</span><span>{prog.pct}%</span><span>目標 {prog.target}</span>
            </div>
            <div style={{ fontSize: 11, color: C.textMuted, fontFamily: F.body, lineHeight: 1.6 }}>
              達到 <span style={{ color: nextTier.color }}>{nextTier.name}</span> 等級可獲得：
              {nextTier.signals && !tier.signals && " 私人交易訊號、"}
              {" 更多月度抽獎與折價券權益"}
            </div>
            <a href="/founder" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, color: C.gold, fontFamily: F.body, textDecoration: "none" }}>
              ◆ 了解 Founder Membership →
            </a>
          </>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontFamily: F.display, fontSize: 18, color: tier.color, letterSpacing: 1 }}>已達最高等級 ✓</div>
            <div style={{ fontSize: 12, color: C.textMuted, fontFamily: F.body, lineHeight: 1.7 }}>
              你已達到 Diamond 最高等級，享有所有專屬權益。
            </div>
            <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 4, height: 8, overflow: "hidden" }}>
              <div style={{ height: "100%", width: "100%", background: `linear-gradient(90deg, ${C.goldDim}, ${tier.color})`, borderRadius: 4 }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Tier Cards ────────────────────────────────────────────────────────────
function TierCards({ currentVip }: { currentVip: string }) {
  const [hov, setHov] = useState<string | null>(null);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="grid-4">
      {TIERS.map((tier) => {
        const isCurrent = tier.id === currentVip;
        const isHov     = hov === tier.id;
        return (
          <div key={tier.id}
            onMouseEnter={() => setHov(tier.id)}
            onMouseLeave={() => setHov(null)}
            style={{ background: isCurrent ? "rgba(201,168,76,0.06)" : isHov ? C.bgCardHover : C.bgCard, border: `0.5px solid ${isCurrent ? C.borderStrong : isHov ? C.borderMid : C.borderSubtle}`, borderRadius: 14, padding: 24, position: "relative", overflow: "hidden", transition: "all 0.25s ease", transform: isHov ? "translateY(-2px)" : "none" }}
          >
            {isCurrent && (
              <div style={{ position: "absolute", top: 12, right: 12, fontSize: 9, color: C.gold, background: "rgba(201,168,76,0.1)", border: `0.5px solid ${C.borderMid}`, padding: "2px 8px", borderRadius: 4, letterSpacing: 1, fontFamily: F.body }}>目前</div>
            )}
            <div style={{ marginBottom: 10 }}>
              <span style={{ fontSize: 28, color: tier.color }}>{tier.icon}</span>
            </div>
            <div style={{ fontFamily: F.display, fontSize: 30, fontWeight: 300, color: tier.color, letterSpacing: 2, marginBottom: 2 }}>{tier.name}</div>
            <div style={{ fontSize: 10, color: C.textMuted, fontFamily: F.body, marginBottom: 4, letterSpacing: 1, textTransform: "uppercase" }}>{tier.label}</div>
            <div style={{ fontSize: 11, color: C.textMuted, fontFamily: F.body, marginBottom: 16, lineHeight: 1.5 }}>{tier.requirement}</div>
            <div style={{ height: "0.5px", background: tier.colorBorder, marginBottom: 16 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {tier.perks.map((perk) => (
                <div key={perk} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <span style={{ fontSize: 12, color: tier.color, flexShrink: 0, marginTop: 1 }}>✓</span>
                  <span style={{ fontSize: 11, color: C.textSecondary, fontFamily: F.body, lineHeight: 1.6 }}>{perk}</span>
                </div>
              ))}
            </div>
            {tier.id === "Diamond" && (
              <div style={{ marginTop: 14, padding: "8px 12px", background: "rgba(176,224,255,0.05)", border: `0.5px solid ${tier.colorBorder}`, borderRadius: 6 }}>
                <div style={{ fontSize: 10, color: tier.color, fontFamily: F.body, lineHeight: 1.5 }}>可透過 Founder Membership 永久達成，無需月交易量門檻</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Benefits Table ────────────────────────────────────────────────────────
function BenefitsTable({ currentVip }: { currentVip: string }) {
  const rows = [
    { label: "累積交易量門檻",           values: ["50K – 300K", "300K – 1M", "1M – 5M", "5M 以上"] },
    { label: "每月電商折價券",            values: ["50 NTD × 1", "100 NTD × 2", "100 NTD × 2", "100 NTD × 5"] },
    { label: "每月優惠券",                values: ["95折 × 1", "9折 × 2", "85折 × 2", "—"] },
    { label: "優惠券低消",                values: ["$500", "$500", "$500", "—"] },
    { label: "每月抽獎資格",              values: ["× 1", "× 2", "× 3", "× 10"] },
    { label: "私人交易訊號",              values: ["✗", "✓", "✓", "✓"] },
    { label: "VIP 群組",                  values: ["✗", "✓", "✓", "✓"] },
    { label: "專人客服",                  values: ["✗", "✗", "✓", "✓"] },
  ];
  const currentIdx = TIERS.findIndex((t) => t.id === currentVip);

  return (
    <div style={{ background: C.bgCard, border: `0.5px solid ${C.borderSubtle}`, borderRadius: 16, overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: F.body }}>
        <thead>
          <tr style={{ borderBottom: `0.5px solid ${C.borderSubtle}` }}>
            <th style={{ padding: "16px 20px", textAlign: "left", fontSize: 11, color: C.textMuted, fontWeight: 400, letterSpacing: 1.5, textTransform: "uppercase", width: "28%" }}>權益項目</th>
            {TIERS.map((t, i) => (
              <th key={t.id} style={{ padding: "16px 20px", textAlign: "center", fontSize: 18, color: t.color, fontWeight: 300, fontFamily: F.display, letterSpacing: 2, background: i === currentIdx ? "rgba(201,168,76,0.04)" : "transparent" }}>
                {t.name}
                {i === currentIdx && (
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: F.body, letterSpacing: 1, marginTop: 4, textTransform: "uppercase" }}>目前</div>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={row.label} style={{ borderBottom: ri < rows.length - 1 ? `0.5px solid ${C.borderSubtle}` : "none" }}>
              <td style={{ padding: "14px 20px", fontSize: 12, color: C.textSecondary, fontFamily: F.body }}>{row.label}</td>
              {row.values.map((val, vi) => {
                const isCurrent = vi === currentIdx;
                const isCheck   = val === "✓";
                const isCross   = val === "✗";
                const isDash    = val === "—";
                return (
                  <td key={vi} style={{ padding: "14px 20px", textAlign: "center", fontFamily: isCross || isCheck ? F.body : F.mono, fontSize: isCheck || isCross ? 14 : 12, fontWeight: 700, color: isCross || isDash ? C.textMuted : isCheck ? "#5ea96e" : isCurrent ? C.gold : TIERS[vi].color, background: isCurrent ? "rgba(201,168,76,0.04)" : "transparent" }}>
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

// ─── Upgrade History ───────────────────────────────────────────────────────
// 自動從 member 資料推算升級歷史（帳號建立 → 目前等級）
function UpgradeHistory({ member }: { member: Member }) {
  const tierOrder = ["Normal", "Silver", "Gold", "Diamond"];
  const currentIdx = tierOrder.indexOf(member.vip);

  // 建立一個簡單的歷史：帳號建立 + 每次升級（根據目前等級推算）
  const history: { date: string; from: string; to: string; volume: string; note: string }[] = [
    { date: member.memberSince, from: "—", to: "Normal", volume: "—", note: "帳號建立，初始等級" },
  ];
  if (currentIdx >= 1) history.push({ date: "—", from: "Normal", to: "Silver",  volume: "$300K+", note: "突破 Silver 門檻" });
  if (currentIdx >= 2) history.push({ date: "—", from: "Silver",  to: "Gold",    volume: "$1M+",   note: "突破 Gold 門檻"   });
  if (currentIdx >= 3) history.push({ date: "—", from: "Gold",    to: "Diamond", volume: "$5M+",   note: "突破 Diamond 門檻" });

  // 最新的在上面
  const reversed = [...history].reverse();

  return (
    <div style={{ background: C.bgCard, border: `0.5px solid ${C.borderSubtle}`, borderRadius: 16, padding: 28 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div style={{ fontFamily: F.display, fontSize: 20, fontWeight: 500, color: C.textPrimary, letterSpacing: 0.5 }}>升級歷史</div>
        <span style={{ fontSize: 11, color: C.textMuted, fontFamily: F.mono }}>共 {reversed.length} 筆紀錄</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {reversed.map((h, i) => {
          const toTier = TIERS.find((t) => t.name === h.to);
          return (
            <div key={i} style={{ display: "flex", gap: 20, position: "relative" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: toTier ? toTier.colorDim : "rgba(255,255,255,0.04)", border: `0.5px solid ${toTier ? toTier.colorBorder : C.borderSubtle}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: toTier ? toTier.color : C.textMuted, flexShrink: 0 }}>
                  {toTier ? toTier.icon : "◎"}
                </div>
                {i < reversed.length - 1 && <div style={{ width: 1, flex: 1, minHeight: 32, background: C.borderSubtle, margin: "4px 0" }} />}
              </div>
              <div style={{ flex: 1, paddingBottom: i < reversed.length - 1 ? 24 : 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <span style={{ fontFamily: F.mono, fontSize: 11, color: C.textMuted }}>{h.date}</span>
                  {h.from !== "—" && (
                    <><span style={{ fontSize: 11, color: C.textMuted }}>{h.from}</span><span style={{ fontSize: 11, color: C.textMuted }}>→</span></>
                  )}
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

// ─── Page ──────────────────────────────────────────────────────────────────
export default function VIPMembershipPage() {
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
    <Layout activePath="/vip" title="VIP Membership">
      <div style={{ display: "flex", flexDirection: "column", gap: 32, maxWidth: 1200 }}>

        {/* 未帶 UID */}
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

        {/* 主體 */}
        {member && (
          <>
            <div>
              <SectionLabel>目前狀態 · {member.name} · {member.uid}</SectionLabel>
              <CurrentStatusCard member={member} />
            </div>
            <div>
              <SectionLabel>等級總覽 · Normal · Silver · Gold · Diamond</SectionLabel>
              <TierCards currentVip={member.vip} />
            </div>
            <div>
              <SectionLabel>權益詳細比較</SectionLabel>
              <BenefitsTable currentVip={member.vip} />
            </div>
            <div>
              <SectionLabel>升級歷史</SectionLabel>
              <UpgradeHistory member={member} />
            </div>
          </>
        )}

        {/* 沒有 UID 時仍顯示靜態等級總覽供參考 */}
        {!member && !notFound && (
          <>
            <div>
              <SectionLabel>等級總覽 · Normal · Silver · Gold · Diamond</SectionLabel>
              <TierCards currentVip="" />
            </div>
            <div>
              <SectionLabel>權益詳細比較</SectionLabel>
              <BenefitsTable currentVip="" />
            </div>
          </>
        )}

        <div style={{ height: 8 }} />
      </div>
    </Layout>
  );
}
