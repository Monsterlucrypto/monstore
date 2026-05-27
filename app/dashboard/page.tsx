"use client";

import { useState } from "react";
import Layout from "@/components/Layout";

const user = {
  name: "Chinglu",
  wallet: "0x7f4a...3d8c",
  initials: "CL",
  tier: "Lu",
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

const stats = [
  { label: "本月交易量", value: "$2.84M", change: "+18.4% 本月", up: true,  icon: "📈" },
  { label: "累計交易量", value: "$14.2M", change: "+6.1% 累計",  up: true,  icon: "⬡" },
  { label: "已賺取佣金", value: "$3,408", change: "+22.1% 本月", up: true,  icon: "💎" },
  { label: "獎勵積分",   value: "12,480", change: "-340 已兌換", up: false, icon: "✦" },
];


const tierBenefits = [
  { label: "優先客服支援",  active: true,  tier: "" },
  { label: "商城 30% 折扣", active: true,  tier: "" },
  { label: "私人交易訊號",  active: false, tier: "Lu" },
  { label: "專屬客戶經理",  active: false, tier: "Lu" },
];

const products = [
  { name: "Founder 帽T",  desc: "限量重磅刺繡 Logo 連帽衫",          price: "2,400 pts",  value: "≈ $96 · 享 30% 折扣",  tag: "Gold+",        icon: "🧥", locked: false },
  { name: "限量鍵盤",      desc: "Keychron 聯名款，金色專屬鍵帽，65% 配列", price: "5,800 pts", value: "≈ $232 · 享 30% 折扣", tag: "Gold+",        icon: "⌨️", locked: false },
  { name: "VIP 黑卡",      desc: "金屬質感實體會員卡，附禮賓服務",      price: "12,000 pts", value: "需達 Founder 等級",    tag: "Founder Only", icon: "🃏", locked: true  },
];

const founderBenefits = [
  { icon: "◈",  name: "永久 VIP",          desc: "無論月交易量，永遠鎖定 Lu 等級" },
  { icon: "⟐",  name: "專屬存取權",        desc: "私人訊號頻道、優先搶購、Alpha 群組" },
  { icon: "◎",  name: "1,000 Reward Units", desc: "參與 Monthly Reward Pool 月回饋分配" },
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

function MemberCard() {
  return (
    <div style={{ background: "linear-gradient(135deg, #1a1508 0%, #0e0e12 40%, #0a0a0b 100%)", border: `0.5px solid ${C.borderMid}`, borderRadius: 16, padding: 32, position: "relative", overflow: "hidden", minHeight: 240, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div style={{ fontFamily: F.display, fontSize: 22, fontWeight: 300, color: C.goldLight, letterSpacing: 2 }}>Monstore</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {user.isFounder && <span style={{ background: "rgba(201,168,76,0.15)", border: `0.5px solid ${C.borderStrong}`, color: C.gold, fontSize: 9, letterSpacing: 1.5, padding: "4px 10px", borderRadius: 20, textTransform: "uppercase", fontWeight: 500 }}>◈ Founder</span>}
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
            <div style={{ fontFamily: F.display, fontSize: 18, fontWeight: 500, color: C.goldLight, letterSpacing: 1 }}>Lu Membership</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["N", "O", "M", "Lu"].map((t, i) => (
            <div key={t} title={t} style={{ height: 4, width: 28, borderRadius: 2, background: i < 3 ? C.gold : `linear-gradient(90deg, ${C.gold}, ${C.goldLight})`, border: `0.5px solid ${C.gold}` }} />
          ))}
        </div>
      </div>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
          <div style={{ fontSize: 12, color: C.textSecondary, fontFamily: F.body }}>已達最高 Lu Membership 等級 <strong style={{ color: C.gold, fontFamily: F.mono }}>✓</strong></div>
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
      </div>
    </div>
  );
}

function StatCards() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="grid-4">
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
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="grid-3">
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
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width={114} height={60} viewBox="0 0 114 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="dp_gt" x1="0" y1="0" x2="114" y2="60" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#F5E070"/><stop offset="45%" stopColor="#E8C96A"/><stop offset="100%" stopColor="#B08020"/>
              </linearGradient>
              <linearGradient id="dp_shine" x1="0" y1="0" x2="0" y2="60" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="rgba(255,255,255,0.22)"/><stop offset="60%" stopColor="rgba(255,255,255,0)"/>
              </linearGradient>
            </defs>
            <path d="M 5,0 H 109 Q 114,0 114,5 V 20 A 10,10 0 0,0 114,40 V 55 Q 114,60 109,60 H 5 Q 0,60 0,55 V 40 A 10,10 0 0,1 0,20 V 5 Q 0,0 5,0 Z" fill="url(#dp_gt)"/>
            <path d="M 5,0 H 109 Q 114,0 114,5 V 20 A 10,10 0 0,0 114,40 V 55 Q 114,60 109,60 H 5 Q 0,60 0,55 V 40 A 10,10 0 0,1 0,20 V 5 Q 0,0 5,0 Z" fill="url(#dp_shine)"/>
            <path d="M 5,0 H 109 Q 114,0 114,5 V 20 A 10,10 0 0,0 114,40 V 55 Q 114,60 109,60 H 5 Q 0,60 0,55 V 40 A 10,10 0 0,1 0,20 V 5 Q 0,0 5,0 Z" fill="none" stroke="rgba(255,245,180,0.5)" strokeWidth="0.75"/>
            {[14,21,28,35,42,49,56,63,70,77,84,91,98].map((x,i) => <rect key={i} x={x} y={29.25} width={4} height={1.5} fill="rgba(80,50,5,0.3)" rx={0.5}/>)}
            <text x="57" y="22" textAnchor="middle" fontFamily="'Cormorant Garamond',Georgia,serif" fontSize="13" fontWeight="600" fill="rgba(55,35,5,0.8)" letterSpacing="3">FOUNDER</text>
            <text x="57" y="44" textAnchor="middle" fontFamily="'DM Sans',system-ui,sans-serif" fontSize="7" fontWeight="500" fill="rgba(55,35,5,0.6)" letterSpacing="2">MEMBERSHIP</text>
          </svg>
          <div>
            <div style={{ fontFamily: F.display, fontSize: 13, color: C.gold, letterSpacing: 4, textTransform: "uppercase", marginBottom: 8 }}>Founder Membership</div>
            <div style={{ fontFamily: F.display, fontSize: 26, fontWeight: 300, color: C.textPrimary, letterSpacing: 1, marginBottom: 6 }}>Lu · M · O · N</div>
            <div style={{ fontSize: 12, color: C.textMuted, letterSpacing: 0.5, fontFamily: F.body }}>Reward Weight · Monthly Reward Pool · Ecosystem Growth</div>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: F.display, fontSize: 36, fontWeight: 300, color: C.gold, lineHeight: 1 }}>500</div>
          <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 2, textTransform: "uppercase", marginTop: 4, fontFamily: F.body }}>Genesis Units</div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, position: "relative", zIndex: 1 }} className="grid-4">
        {founderBenefits.map((b) => (
          <div key={b.name} style={{ background: "rgba(255,255,255,0.02)", border: `0.5px solid ${C.borderSubtle}`, borderRadius: 10, padding: 16 }}>
            <span style={{ fontSize: 20, marginBottom: 10, color: C.gold, display: "block" }}>{b.icon}</span>
            <div style={{ fontSize: 12.5, fontWeight: 500, color: C.textPrimary, marginBottom: 4, fontFamily: F.body }}>{b.name}</div>
            <div style={{ fontSize: 11, color: C.textMuted, lineHeight: 1.5, fontFamily: F.body }}>{b.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16, position: "relative", zIndex: 1, fontSize: 11, color: C.textMuted, fontFamily: F.body }}>
        <span style={{ whiteSpace: "nowrap" }}>Genesis Release 開放中</span>
        <div style={{ flex: 1, height: 3, background: "rgba(255,255,255,0.04)", borderRadius: 2, overflow: "hidden" }}>
          <div style={{ height: "100%", width: "5%", background: `linear-gradient(90deg, ${C.goldDim}, ${C.gold})` }} />
        </div>
        <span style={{ whiteSpace: "nowrap", color: C.gold }}>500 / 10,000 Units</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 24, position: "relative", zIndex: 1 }}>
        <a href="/founder" style={{ background: `linear-gradient(135deg, ${C.goldDim}, #5a4520)`, border: `0.5px solid ${C.gold}`, color: C.goldLight, padding: "11px 28px", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: F.body, letterSpacing: 0.5, textDecoration: "none", display: "inline-block" }}>了解 Founder Membership →</a>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Layout activePath="/dashboard" title="Dashboard">
      <div style={{ display: "flex", flexDirection: "column", gap: 32, maxWidth: 1400 }}>
        <div>
          <SectionLabel>會員總覽</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 24, alignItems: "start" }} className="grid-2">
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
          <BenefitsPanel />
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
    </Layout>
  );
}
