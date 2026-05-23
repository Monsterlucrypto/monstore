"use client";

import { useState } from "react";

const user = {
  name: "Chinglu",
  wallet: "0x7f4a...3d8c",
  initials: "CL",
  tier: "Gold",
  isFounder: true,
  monthlyVolume: "$2.84M",
  totalVolume: "$14.2M",
  totalPoints: 12480,
  commissionEarned: "$3,408",
  memberSince: "2023.04",
  progressPct: 62,
  remaining: "$1.16M",
  target: "$4.00M",
  current: "$2.84M",
};

const navItems = [
  { label: "Dashboard",      icon: "⬡",  href: "/",            active: true,  badge: null },
  { label: "VIP Membership", icon: "◈",  href: "/vip",         active: false, badge: null },
  { label: "Rewards",        icon: "✦",  href: "/rewards",     active: false, badge: null },
  { label: "Marketplace",    icon: "◻",  href: "/marketplace", active: false, badge: null },
  { label: "Founder Pass",   icon: "🥚", href: "/founder",     active: false, badge: null },
  { label: "Referral",       icon: "⟐",  href: "/referral",    active: false, badge: null },
  { label: "Settings",       icon: "⊙",  href: "/settings",    active: false, badge: null },
];

const stats = [
  { label: "本月交易量",  value: "$2.84M", change: "+18.4% 本月", up: true,  icon: "📈" },
  { label: "累計交易量",  value: "$14.2M", change: "+6.1% 累計",  up: true,  icon: "⬡" },
  { label: "已賺取佣金",  value: "$3,408", change: "+22.1% 本月", up: true,  icon: "💎" },
  { label: "獎勵積分",    value: "12,480", change: "-340 已兌換", up: false, icon: "✦" },
];

const multipliers = [
  { label: "基礎交易倍率",       value: "1.0×",  highlight: false },
  { label: "Gold VIP 獎勵",      value: "+1.0×", highlight: false },
  { label: "Founder Pass 獎勵",  value: "+0.5×", highlight: true  },
  { label: "推薦獎勵",           value: "+0.1×", highlight: false },
];

const tierBenefits = [
  { label: "優先客服支援",  active: true,  tier: "" },
  { label: "商城 30% 折扣", active: true,  tier: "" },
  { label: "2.5× 積分倍率", active: true,  tier: "" },
  { label: "私人交易訊號",  active: false, tier: "Founder" },
  { label: "專屬客戶經理",  active: false, tier: "Founder" },
];

const products = [
  { name: "Founder 帽T",   desc: "限量重磅刺繡 Logo 連帽衫", price: "2,400 pts", value: "≈ $96 · 享 30% 折扣",  tag: "Gold+",        icon: "🧥", locked: false },
  { name: "限量鍵盤",       desc: "Keychron 聯名款，金色專屬鍵帽，65% 配列", price: "5,800 pts", value: "≈ $232 · 享 30% 折扣", tag: "Gold+", icon: "⌨️", locked: false },
  { name: "VIP 黑卡",       desc: "金屬質感實體會員卡，附禮賓服務", price: "12,000 pts", value: "需達 Founder 等級", tag: "Founder Only", icon: "🃏", locked: true },
];

const founderBenefits = [
  { icon: "🥚", name: "永久 VIP",     desc: "無論月交易量，永遠鎖定 Founder 等級" },
  { icon: "⟐",  name: "專屬存取權",   desc: "私人訊號頻道、優先搶購、Alpha 群組" },
  { icon: "✦",  name: "3× 積分倍率",  desc: "所有交易量享最高倍率，永久生效" },
  { icon: "◎",  name: "專屬客戶經理", desc: "個人帳戶經理，24/7 直線支援" },
];

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

function Sidebar() {
  return (
    <aside style={{ width: 240, minHeight: "100vh", background: "rgba(14,14,18,0.97)", borderRight: `0.5px solid ${C.borderSubtle}`, display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, zIndex: 100, paddingBottom: 24 }}>
      <div style={{ padding: "20px 20px 18px", borderBottom: `0.5px solid ${C.borderSubtle}`, display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 38, height: 38, borderRadius: 8, overflow: "hidden", background: "#000", border: `0.5px solid ${C.borderMid}`, flexShrink: 0 }}>
          <img src="/logo.png" alt="logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
        <div style={{ fontFamily: F.display, fontSize: 18, fontWeight: 500, color: C.textPrimary, letterSpacing: 1 }}>
          Mon<span style={{ color: C.gold }}>store</span>
        </div>
      </div>
      <nav style={{ flex: 1, padding: "20px 12px", display: "flex", flexDirection: "column", gap: 2 }}>
        {navItems.map((item) => (
          <a key={item.label} href={item.href} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, textDecoration: "none", color: item.active ? C.goldLight : C.textSecondary, fontSize: 13.5, background: item.active ? "rgba(201,168,76,0.1)" : "transparent", border: `0.5px solid ${item.active ? C.borderMid : "transparent"}`, fontFamily: F.body, position: "relative", transition: "all 0.2s" }}>
            {item.active && <span style={{ position: "absolute", left: -1, top: "20%", height: "60%", width: 2, background: C.gold, borderRadius: "0 2px 2px 0" }} />}
            <span style={{ fontSize: 16, width: 20, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{item.icon}</span>
            {item.label}
          </a>
        ))}
      </nav>
      <div style={{ padding: "16px 12px 0", borderTop: `0.5px solid ${C.borderSubtle}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, border: `0.5px solid ${C.borderSubtle}` }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #3a2f15, #7a6130)", border: `1.5px solid ${C.goldDim}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 500, color: C.goldLight, fontFamily: F.display, flexShrink: 0 }}>{user.initials}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12.5, fontWeight: 500, color: C.textPrimary, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.name}</div>
            <div style={{ fontSize: 10, color: C.textMuted, fontFamily: F.mono }}>{user.wallet}</div>
          </div>
          <span style={{ color: C.textMuted, fontSize: 14 }}>⋯</span>
        </div>
      </div>
    </aside>
  );
}

function Header() {
  return (
    <header style={{ height: 64, borderBottom: `0.5px solid ${C.borderSubtle}`, display: "flex", alignItems: "center", padding: "0 32px", gap: 16, position: "sticky", top: 0, zIndex: 50, background: "rgba(10,10,11,0.92)", backdropFilter: "blur(20px)" }}>
      <div style={{ flex: 1, maxWidth: 400, position: "relative" }}>
        <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: C.textMuted }}>⌕</span>
        <input type="text" placeholder="搜尋會員、獎勵、商品..." style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: `0.5px solid ${C.borderSubtle}`, borderRadius: 8, padding: "8px 12px 8px 36px", color: C.textPrimary, fontSize: 13, fontFamily: F.body, outline: "none" }} />
      </div>
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, border: `0.5px solid ${C.borderSubtle}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 16, position: "relative", color: C.textSecondary }}>
          🔔
          <div style={{ position: "absolute", top: 7, right: 7, width: 6, height: 6, background: C.gold, borderRadius: "50%", border: `1.5px solid ${C.bgPrimary}` }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", borderRadius: 8, border: `0.5px solid ${C.borderSubtle}`, cursor: "pointer" }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #3a2f15, #7a6130)", border: `1.5px solid ${C.goldDim}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 500, color: C.goldLight, fontFamily: F.display }}>{user.initials}</div>
          <span style={{ fontFamily: F.mono, fontSize: 11, color: C.textSecondary }}>{user.wallet}</span>
        </div>
      </div>
    </header>
  );
}

function MemberCard() {
  return (
    <div style={{ background: "linear-gradient(135deg, #1a1508 0%, #0e0e12 40%, #0a0a0b 100%)", border: `0.5px solid ${C.borderMid}`, borderRadius: 16, padding: 32, position: "relative", overflow: "hidden", minHeight: 240, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div style={{ fontFamily: F.display, fontSize: 22, fontWeight: 300, color: C.goldLight, letterSpacing: 2 }}>金色的蛋</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {user.isFounder && <span style={{ background: "rgba(201,168,76,0.15)", border: `0.5px solid ${C.borderStrong}`, color: C.gold, fontSize: 9, letterSpacing: 1.5, padding: "4px 10px", borderRadius: 20, textTransform: "uppercase", fontWeight: 500 }}>🥚 Founder</span>}
            <span style={{ fontFamily: F.display, fontSize: 13, fontWeight: 600, color: C.gold, letterSpacing: 2 }}>{user.tier.toUpperCase()}</span>
          </div>
        </div>
        <div style={{ marginTop: 12 }}>
          <div style={{ width: 36, height: 28, background: "linear-gradient(135deg, #c9a84c, #7a6130)", borderRadius: 5, marginBottom: 20 }} />
          <div style={{ fontFamily: F.display, fontSize: 26, fontWeight: 400, color: C.textPrimary, letterSpacing: 0.5 }}>{user.name}</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 32, marginTop: 24 }}>
        {[{ label: "本月交易量", value: user.monthlyVolume }, { label: "總積分", value: user.totalPoints.toLocaleString() }, { label: "加入時間", value: user.memberSince }].map((s) => (
          <div key={s.label}>
            <div style={{ fontSize: 9, letterSpacing: 2, color: C.textMuted, textTransform: "uppercase", marginBottom: 4, fontFamily: F.body }}>{s.label}</div>
            <div style={{ fontFamily: F.mono, fontSize: 14, fontWeight: 700, color: C.goldLight }}>{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VIPProgress() {
  return (
    <div style={{ background: C.bgCard, border: `0.5px solid ${C.borderSubtle}`, borderRadius: 16, padding: 28, display: "flex", flexDirection: "column", gap: 20, minHeight: 240 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(201,168,76,0.1)", border: `0.5px solid ${C.borderMid}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🏆</div>
          <div>
            <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: F.body }}>目前等級</div>
            <div style={{ fontFamily: F.display, fontSize: 18, fontWeight: 500, color: C.goldLight, letterSpacing: 1 }}>Gold 會員</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["Bronze", "Silver", "Gold", "Founder"].map((t, i) => (
            <div key={t} title={t} style={{ height: 4, width: 28, borderRadius: 2, background: i < 2 ? C.gold : i === 2 ? `linear-gradient(90deg, ${C.gold} 60%, transparent)` : "rgba(255,255,255,0.04)", border: i < 3 ? `0.5px solid ${C.gold}` : `0.5px solid ${C.borderSubtle}` }} />
          ))}
        </div>
      </div>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
          <div style={{ fontSize: 12, color: C.textSecondary, fontFamily: F.body }}>距離 Founder 還差 <strong style={{ color: C.gold, fontFamily: F.mono }}>{user.remaining}</strong></div>
          <span style={{ fontFamily: F.mono, fontSize: 12, color: C.gold }}>{user.progressPct}%</span>
        </div>
        <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 4, height: 6, overflow: "hidden" }}>
          <div style={{ height: "100%", background: `linear-gradient(90deg, ${C.goldDim}, ${C.gold}, ${C.goldLight})`, borderRadius: 4, width: `${user.progressPct}%`, transition: "width 1s ease" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.textMuted, fontFamily: F.mono, marginTop: 8 }}>
          <span>目前 {user.current}</span><span>目標 {user.target}</span>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {[{ label: "佣金費率", value: "0.12%" }, { label: "積分倍率", value: "2.5×" }].map((s) => (
          <div key={s.label} style={{ background: "rgba(255,255,255,0.02)", border: `0.5px solid ${C.borderSubtle}`, borderRadius: 8, padding: 12 }}>
            <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 1.5, marginBottom: 4, textTransform: "uppercase", fontFamily: F.body }}>{s.label}</div>
            <div style={{ fontFamily: F.mono, fontSize: 20, fontWeight: 700, color: C.goldLight }}>{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCards() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
      {stats.map((s, i) => (
        <div key={s.label} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} style={{ background: hovered === i ? C.bgCardHover : C.bgCard, border: `0.5px solid ${hovered === i ? C.borderMid : C.borderSubtle}`, borderRadius: 12, padding: 20, transition: "all 0.25s ease", transform: hovered === i ? "translateY(-2px)" : "none", cursor: "default", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)", opacity: hovered === i ? 1 : 0, transition: "opacity 0.25s" }} />
          <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(201,168,76,0.08)", border: `0.5px solid ${C.borderSubtle}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, marginBottom: 14 }}>{s.icon}</div>
          <div style={{ fontSize: 11, color: C.textMuted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6, fontFamily: F.body }}>{s.label}</div>
          <div style={{ fontFamily: F.mono, fontSize: 22, fontWeight: 700, color: C.textPrimary, lineHeight: 1, marginBottom: 6 }}>{s.value}</div>
          <div style={{ fontSize: 11, color: s.up ? "#5ea96e" : "#c96060" }}>{s.up ? "▲" : "▼"} {s.change}</div>
        </div>
      ))}
    </div>
  );
}

function RewardsPanel() {
  return (
    <div style={{ background: C.bgCard, border: `0.5px solid ${C.borderSubtle}`, borderRadius: 16, padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ fontFamily: F.display, fontSize: 17, fontWeight: 500, color: C.textPrimary, letterSpacing: 0.5 }}>積分倍率</div>
        <span style={{ fontSize: 11, color: C.gold, cursor: "pointer" }}>查看全部 →</span>
      </div>
      {multipliers.map((m) => (
        <div key={m.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: `0.5px solid ${C.borderSubtle}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: m.highlight ? C.goldLight : C.gold, flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: C.textSecondary, fontFamily: F.body }}>{m.label}</span>
          </div>
          <span style={{ fontFamily: F.mono, fontSize: 13, fontWeight: 700, color: C.goldLight }}>{m.value}</span>
        </div>
      ))}
      <div style={{ background: "rgba(201,168,76,0.04)", borderRadius: 8, padding: 12, border: `0.5px solid ${C.borderSubtle}`, marginTop: 4, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: C.gold, flexShrink: 0 }} />
          <span style={{ fontSize: 13, fontWeight: 500, color: C.textPrimary, fontFamily: F.body }}>總倍率</span>
        </div>
        <span style={{ fontFamily: F.mono, fontSize: 18, fontWeight: 700, color: C.goldLight }}>2.6×</span>
      </div>
    </div>
  );
}

function BenefitsPanel() {
  return (
    <div style={{ background: C.bgCard, border: `0.5px solid ${C.borderSubtle}`, borderRadius: 16, padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ fontFamily: F.display, fontSize: 17, fontWeight: 500, color: C.textPrimary, letterSpacing: 0.5 }}>等級權益</div>
        <span style={{ fontSize: 11, color: C.gold, cursor: "pointer" }}>比較等級 →</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {tierBenefits.map((b, i) => (
          <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: i < tierBenefits.length - 1 ? `0.5px solid ${C.borderSubtle}` : "none" }}>
            <span style={{ fontSize: 14, color: b.active ? C.gold : C.textMuted }}>{b.active ? "✓" : "◯"}</span>
            <span style={{ fontSize: 13, color: b.active ? C.textSecondary : C.textMuted, fontFamily: F.body }}>{b.label}</span>
            <span style={{ marginLeft: "auto", fontSize: 10, color: b.active ? C.gold : C.textMuted, background: b.active ? "rgba(201,168,76,0.08)" : "rgba(255,255,255,0.03)", border: `0.5px solid ${C.borderSubtle}`, padding: "2px 8px", borderRadius: 4, letterSpacing: 1, fontFamily: F.body, flexShrink: 0 }}>
              {b.active ? "啟用中" : b.tier}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Marketplace() {
  const [hov, setHov] = useState<number | null>(null);
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ fontFamily: F.display, fontSize: 22, fontWeight: 300, color: C.textPrimary, letterSpacing: 0.5 }}>會員專屬商城</div>
        <a href="/marketplace" style={{ fontSize: 12, color: C.gold, cursor: "pointer", textDecoration: "none" }}>瀏覽全部商品 →</a>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {products.map((p, i) => (
          <div key={p.name} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)} style={{ background: C.bgCard, border: `0.5px solid ${i === 2 || hov === i ? C.borderMid : C.borderSubtle}`, borderRadius: 12, overflow: "hidden", transition: "all 0.25s ease", transform: hov === i ? "translateY(-2px)" : "none", cursor: "pointer" }}>
            <div style={{ height: 140, background: i === 2 ? "linear-gradient(135deg, #141209, #1a1810)" : "linear-gradient(135deg, #111116, #1a1a22)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, borderBottom: `0.5px solid ${C.borderSubtle}`, position: "relative" }}>
              {p.icon}
              <div style={{ position: "absolute", top: 10, left: 10, background: "rgba(201,168,76,0.15)", border: `0.5px solid ${C.borderMid}`, color: C.gold, fontSize: 9, letterSpacing: 1.5, padding: "3px 8px", borderRadius: 4, textTransform: "uppercase" }}>{p.tag}</div>
            </div>
            <div style={{ padding: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: C.textPrimary, marginBottom: 4, fontFamily: F.body }}>{p.name}</div>
              <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 10, fontFamily: F.body }}>{p.desc}</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontFamily: F.mono, fontSize: 13, fontWeight: 700, color: C.goldLight }}>{p.price}</div>
                  <div style={{ fontSize: 10, color: C.textMuted, fontFamily: F.body }}>{p.value}</div>
                </div>
                <button disabled={p.locked} style={{ fontSize: 11, color: p.locked ? C.textMuted : C.gold, background: "rgba(201,168,76,0.08)", border: `0.5px solid ${C.borderMid}`, padding: "5px 12px", borderRadius: 6, cursor: p.locked ? "not-allowed" : "pointer", opacity: p.locked ? 0.5 : 1, fontFamily: F.body }}>
                  {p.locked ? "已鎖定" : "立即兌換"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FounderPass() {
  return (
    <div style={{ background: "linear-gradient(135deg, #0f0d07 0%, #0a0a0b 60%, #0d0d12 100%)", border: `0.5px solid ${C.borderMid}`, borderRadius: 16, padding: 32, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -60, right: -60, width: 260, height: 260, background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28, position: "relative", zIndex: 1 }}>
        <div>
          <div style={{ fontFamily: F.display, fontSize: 26, fontWeight: 300, color: C.textPrimary, letterSpacing: 1, marginBottom: 6 }}>加入核心圈子</div>
          <div style={{ fontSize: 12, color: C.textMuted, letterSpacing: 0.5, fontFamily: F.body }}>一次性永久升級 · 無月費 · 終身權益</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: F.display, fontSize: 36, fontWeight: 300, color: C.gold, lineHeight: 1 }}>273</div>
          <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 2, textTransform: "uppercase", marginTop: 4, fontFamily: F.body }}>剩餘張數</div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, position: "relative", zIndex: 1 }}>
        {founderBenefits.map((b) => (
          <div key={b.name} style={{ background: "rgba(255,255,255,0.02)", border: `0.5px solid ${C.borderSubtle}`, borderRadius: 10, padding: 16 }}>
            <span style={{ fontSize: 20, marginBottom: 10, color: C.gold, display: "block" }}>{b.icon}</span>
            <div style={{ fontSize: 12.5, fontWeight: 500, color: C.textPrimary, marginBottom: 4, fontFamily: F.body }}>{b.name}</div>
            <div style={{ fontSize: 11, color: C.textMuted, lineHeight: 1.5, fontFamily: F.body }}>{b.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16, position: "relative", zIndex: 1, fontSize: 11, color: C.textMuted, fontFamily: F.body }}>
        <span style={{ whiteSpace: "nowrap" }}>727 / 1,000 已售出</span>
        <div style={{ flex: 1, height: 3, background: "rgba(255,255,255,0.04)", borderRadius: 2, overflow: "hidden" }}>
          <div style={{ height: "100%", width: "72.7%", background: `linear-gradient(90deg, ${C.goldDim}, ${C.gold})` }} />
        </div>
        <span style={{ whiteSpace: "nowrap", color: C.gold }}>剩 273 張</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 24, position: "relative", zIndex: 1 }}>
        <button style={{ background: `linear-gradient(135deg, ${C.goldDim}, #5a4520)`, border: `0.5px solid ${C.gold}`, color: C.goldLight, padding: "11px 28px", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: F.body, letterSpacing: 0.5 }}>取得 Founder Pass — 8,000 積分</button>
        <button style={{ background: "transparent", border: `0.5px solid ${C.borderMid}`, color: C.textSecondary, padding: "11px 24px", borderRadius: 8, fontSize: 13, cursor: "pointer", fontFamily: F.body }}>了解更多</button>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=DM+Sans:wght@300;400;500&family=Space+Mono:wght@400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0a0b; color: #f0ece0; font-family: 'DM Sans', system-ui, sans-serif; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.25); border-radius: 2px; }
        input { color-scheme: dark; }
      `}</style>
      <div style={{ display: "flex", minHeight: "100vh", background: "#0a0a0b" }}>
        <Sidebar />
        <main style={{ marginLeft: 240, flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <Header />
          <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 32, maxWidth: 1200 }}>
            <div>
              <SectionLabel>會員總覽</SectionLabel>
              <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 24, alignItems: "start" }}>
                <MemberCard />
                <VIPProgress />
              </div>
            </div>
            <div>
              <SectionLabel>交易統計</SectionLabel>
              <StatCards />
            </div>
            <div>
              <SectionLabel>獎勵與權益</SectionLabel>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                <RewardsPanel />
                <BenefitsPanel />
              </div>
            </div>
            <div>
              <SectionLabel>商城預覽</SectionLabel>
              <Marketplace />
            </div>
            <div>
              <SectionLabel>Founder Pass</SectionLabel>
              <FounderPass />
            </div>
            <div style={{ height: 8 }} />
          </div>
        </main>
      </div>
    </>
  );
}
