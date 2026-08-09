"use client";

import { FOUNDER_TIERS, CAP_MULTIPLE_FOUNDING } from "@/data/members";

const C = {
  gold: "#C9A84C",
  goldLight: "#E8C96A",
  goldDim: "#7a6130",
  bgPrimary: "#0a0a0b",
  bgCard: "#141418",
  bgCardHover: "#1a1a1f",
  borderSubtle: "rgba(201,168,76,0.12)",
  borderMid: "rgba(201,168,76,0.25)",
  borderStrong: "rgba(201,168,76,0.45)",
  textPrimary: "#f0ece0",
  textSecondary: "#8a8578",
  textMuted: "#8a8578",
};

const F = {
  display: "'Cormorant Garamond', Georgia, serif",
  body: "'DM Sans', system-ui, sans-serif",
  mono: "'Space Mono', monospace",
};

const BYBIT_URL = "https://partner.bybit.com/b/153866";

// ─── 訪客最在意的三件事 ─────────────────────────────────────
const trustPoints = [
  { icon: "◈", title: "不是交易所", desc: "你的帳戶開在 Bybit，Monstore 只是會員制度。" },
  { icon: "◎", title: "不保管你的資產", desc: "資金全程在你自己的交易所帳戶裡。" },
  { icon: "⟐", title: "不需要 API Key", desc: "只用 UID 對應交易量，不碰你的下單權限。" },
];

// ─── 這怎麼運作：返佣 → 福利 ────────────────────────────────
const flow = [
  {
    num: "01",
    icon: "📈",
    title: "你照常交易",
    desc: "用 Monstore 的連結註冊 Bybit，之後照你原本的方式交易。手續費跟平常一模一樣。",
  },
  {
    num: "02",
    icon: "↩",
    title: "交易所返還一部分給 Monstore",
    desc: "你付出去的手續費，交易所會依合作方案返還一部分給 Monstore。這筆錢不是從你身上多收的。",
  },
  {
    num: "03",
    icon: "✦",
    title: "我們把它變成你的福利",
    desc: "這筆收入轉成電商折價券、優惠券、每月抽獎資格與 VIP 等級，回到會員身上。",
  },
];

// ─── VIP 等級：用數字呈現差異，不再四張卡都列滿 ─────────────
const vipTiers = [
  {
    name: "Normal",
    range: "300K 以下",
    stats: [
      { label: "每月抽獎", value: "1 次" },
      { label: "每月折價券", value: "NT$50" },
      { label: "優惠券", value: "95 折 × 1" },
    ],
    extras: [] as string[],
    color: "#cd7f32", colorDim: "rgba(205,127,50,0.1)", colorBorder: "rgba(205,127,50,0.25)",
  },
  {
    name: "Silver",
    range: "300K – 1M",
    stats: [
      { label: "每月抽獎", value: "2 次" },
      { label: "每月折價券", value: "NT$200" },
      { label: "優惠券", value: "9 折 × 2" },
    ],
    extras: ["VIP 群組"],
    color: "#a8a9ad", colorDim: "rgba(168,169,173,0.1)", colorBorder: "rgba(168,169,173,0.25)",
  },
  {
    name: "Gold",
    range: "1M – 5M",
    stats: [
      { label: "每月抽獎", value: "3 次" },
      { label: "每月折價券", value: "NT$200" },
      { label: "優惠券", value: "85 折 × 2" },
    ],
    extras: ["VIP 群組"],
    color: "#C9A84C", colorDim: "rgba(201,168,76,0.1)", colorBorder: "rgba(201,168,76,0.3)",
    highlight: true,
  },
  {
    name: "Diamond",
    range: "5M 以上",
    stats: [
      { label: "每月抽獎", value: "10 次" },
      { label: "每月折價券", value: "NT$500" },
      { label: "優惠券", value: "—" },
    ],
    extras: ["VIP 群組", "專人客服"],
    color: "#E8C96A", colorDim: "rgba(232,201,106,0.1)", colorBorder: "rgba(232,201,106,0.35)",
    isTop: true,
  },
];

const steps = [
  { num: "01", title: "用 Monstore 連結註冊 Bybit", desc: "已經有帳戶也可以，聯繫我們協助轉入。" },
  { num: "02", title: "綁定你的 UID", desc: "只需要 UID，不用提供 API Key 或密碼。" },
  { num: "03", title: "照常交易", desc: "交易量自動累積，達門檻自動晉升 VIP 等級。" },
  { num: "04", title: "領取會員福利", desc: "折價券、優惠券、每月抽獎與 VIP 群組。" },
];

// 級距顏色（數值一律取自 FOUNDER_CONFIG）
const FOUNDER_TIER_COLOR: Record<string, string> = {
  Lu: "#E8C96A", M: "#C9A84C", O: "#a8a9ad", N: "#cd7f32",
};

function Navbar() {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(10,10,11,0.92)", backdropFilter: "blur(20px)",
      borderBottom: `0.5px solid ${C.borderSubtle}`,
      height: 64, display: "flex", alignItems: "center", padding: "0 32px", gap: 16,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0 }}>
        <div style={{ width: 43, height: 43, borderRadius: 8, overflow: "hidden", background: "#000", border: `0.5px solid ${C.borderMid}`, flexShrink: 0 }}>
          <img src="/logo.png" alt="logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
        <div style={{ fontFamily: F.display, fontSize: 30, fontWeight: 500, color: C.textPrimary, letterSpacing: 1 }}>
          Mon<span style={{ color: C.gold }}>store</span>
        </div>
      </div>

      <a href="/founder" className="nav-founder" style={{ fontSize: 12, color: C.textSecondary, padding: "7px 14px", borderRadius: 8, textDecoration: "none", fontFamily: F.body }}>
        Founder Pass
      </a>
      <a href="/member" style={{ fontSize: 12, color: C.gold, background: "rgba(201,168,76,0.1)", border: `0.5px solid ${C.borderMid}`, padding: "7px 18px", borderRadius: 8, textDecoration: "none", fontFamily: F.body, whiteSpace: "nowrap" }}>
        Member →
      </a>
    </nav>
  );
}

function HeroCard() {
  const lu = FOUNDER_TIERS.find((t) => t.tier === "Lu")!;
  return (
    <div style={{
      background: "linear-gradient(135deg, #1a1508 0%, #0e0e12 50%, #0a0a0b 100%)",
      border: `0.5px solid ${C.borderMid}`, borderRadius: 20,
      padding: "36px 32px", position: "relative", overflow: "hidden",
      minHeight: 280, display: "flex", flexDirection: "column", justifyContent: "space-between",
      maxWidth: 360, width: "100%",
    }}>
      <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, background: "radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ fontFamily: F.display, fontSize: 20, fontWeight: 300, color: C.goldLight, letterSpacing: 2 }}>MONSTORE</div>
        <span style={{ fontSize: 9, color: C.gold, background: "rgba(201,168,76,0.12)", border: `0.5px solid ${C.borderStrong}`, padding: "3px 10px", borderRadius: 20, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: F.body }}>✦ Founder</span>
      </div>
      <div>
        <div style={{ width: 36, height: 28, background: "linear-gradient(135deg, #c9a84c, #7a6130)", borderRadius: 5, marginBottom: 20 }} />
        <div style={{ fontFamily: F.display, fontSize: 24, fontWeight: 400, color: C.textPrimary, letterSpacing: 0.5 }}>Monstore Black</div>
        <div style={{ fontSize: 11, color: C.textMuted, fontFamily: F.body, marginTop: 2, letterSpacing: 0.5 }}>Founder Access · Permanent VIP</div>
      </div>
      <div style={{ display: "flex", gap: 24, marginTop: 24 }}>
        {[
          { label: "Reward Units", value: lu.rewardUnits.toLocaleString() },
          { label: "VIP Level", value: "Founder" },
          { label: "Access", value: "Max" },
        ].map((s) => (
          <div key={s.label}>
            <div style={{ fontSize: 8, letterSpacing: 2, color: C.textMuted, textTransform: "uppercase", marginBottom: 3, fontFamily: F.body }}>{s.label}</div>
            <div style={{ fontFamily: F.mono, fontSize: 13, fontWeight: 700, color: C.goldLight }}>{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionWrapper({ id, children, style }: { id?: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <section id={id} style={{ padding: "96px 0", ...style }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>
        {children}
      </div>
    </section>
  );
}

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(201,168,76,0.08)", border: `0.5px solid ${C.borderMid}`, borderRadius: 20, padding: "4px 14px", marginBottom: 16 }}>
      <span style={{ fontSize: 10, color: C.gold, letterSpacing: 2, textTransform: "uppercase", fontFamily: F.body }}>{children}</span>
    </div>
  );
}

export default function LandingPage() {
  const minFounderPrice = Math.min(...FOUNDER_TIERS.map((t) => t.price));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=DM+Sans:wght@300;400;500&family=Space+Mono:wght@400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #0a0a0b; color: #f0ece0; font-family: 'DM Sans', system-ui, sans-serif; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.25); border-radius: 2px; }

        .nav-founder:hover { color: #E8C96A !important; }

        .hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
        .trust-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .flow-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .steps-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .vip-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .ftier-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .founder-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }

        @media (max-width: 1024px) {
          .vip-grid { grid-template-columns: repeat(2, 1fr); }
          .steps-grid { grid-template-columns: repeat(2, 1fr); }
          .ftier-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr; gap: 40px; }
          .trust-grid { grid-template-columns: 1fr; }
          .flow-grid { grid-template-columns: 1fr; }
          .steps-grid { grid-template-columns: 1fr; }
          .vip-grid { grid-template-columns: 1fr; }
          .ftier-grid { grid-template-columns: 1fr; }
          .founder-grid { grid-template-columns: 1fr; }
          .nav-founder { display: none; }
          .flow-arrow { display: none; }
          section { padding: 64px 0 !important; }
          div[style*="maxWidth: 1100"] { padding: 0 20px !important; }
        }
      `}</style>

      <Navbar />

      {/* ── HERO ── */}
      <section style={{ paddingTop: 160, paddingBottom: 72, background: `radial-gradient(ellipse 60% 40% at 70% 40%, rgba(201,168,76,0.06) 0%, transparent 70%), ${C.bgPrimary}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>
          <div className="hero-grid">
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(201,168,76,0.08)", border: `0.5px solid ${C.borderMid}`, borderRadius: 20, padding: "4px 14px", marginBottom: 24 }}>
                <span style={{ fontSize: 10, color: C.gold, letterSpacing: 2, textTransform: "uppercase", fontFamily: F.body }}>✦ Web3 Membership Platform</span>
              </div>
              <h1 style={{ fontFamily: F.display, fontSize: "clamp(36px, 5.2vw, 60px)", fontWeight: 300, color: C.textPrimary, letterSpacing: 1, lineHeight: 1.2, marginBottom: 20 }}>
                Trade More.<br />
                <span style={{ color: C.goldLight }}>Unlock More.</span>
              </h1>
              <p style={{ fontSize: 19, color: C.textSecondary, fontFamily: F.body, lineHeight: 1.8, marginBottom: 32, maxWidth: 480 }}>
                免費加入。交易量自動累積 VIP 等級，每月領電商折價券、優惠券與抽獎資格。
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href={BYBIT_URL} target="_blank" rel="noopener noreferrer" style={{ background: `linear-gradient(135deg, ${C.goldDim}, #5a4520)`, border: `0.5px solid ${C.gold}`, color: C.goldLight, padding: "13px 28px", borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: F.body, letterSpacing: 0.5, textDecoration: "none", display: "inline-block" }}>
                  免費加入會員
                </a>
                <a href="#vip" style={{ background: "transparent", border: `0.5px solid ${C.borderMid}`, color: C.textSecondary, padding: "13px 24px", borderRadius: 10, fontSize: 14, cursor: "pointer", fontFamily: F.body, textDecoration: "none", display: "inline-block" }}>
                  看會員福利 ↓
                </a>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <HeroCard />
            </div>
          </div>
        </div>
      </section>

      {/* ── 信任三點 ── */}
      <section style={{ paddingBottom: 24 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>
          <div className="trust-grid">
            {trustPoints.map((t) => (
              <div key={t.title} style={{ background: "rgba(255,255,255,0.015)", border: `0.5px solid ${C.borderSubtle}`, borderRadius: 12, padding: "18px 20px", display: "flex", alignItems: "flex-start", gap: 12 }}>
                <span style={{ fontSize: 16, color: C.gold, flexShrink: 0, marginTop: 2 }}>{t.icon}</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 500, color: C.textPrimary, fontFamily: F.body, marginBottom: 4 }}>{t.title}</div>
                  <div style={{ fontSize: 14, color: C.textMuted, fontFamily: F.body, lineHeight: 1.6 }}>{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 這怎麼運作 ── */}
      <SectionWrapper id="how" style={{ background: "rgba(255,255,255,0.01)", borderTop: `0.5px solid ${C.borderSubtle}`, borderBottom: `0.5px solid ${C.borderSubtle}` }}>
        <SectionTag>How It Works</SectionTag>
        <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, color: C.textPrimary, letterSpacing: 0.5, marginBottom: 12 }}>
          這筆福利是哪來的？
        </h2>
        <p style={{ fontSize: 19, color: C.textSecondary, fontFamily: F.body, marginBottom: 40, maxWidth: 560, lineHeight: 1.8 }}>
          Monstore 不靠會員費賺錢，也不是交易所。收入來自交易所的合作返佣 —— 就是你本來就要付的那筆手續費。
        </p>
        <div className="flow-grid">
          {flow.map((f, i) => (
            <div key={f.num} style={{ position: "relative" }}>
              <div style={{ background: C.bgCard, border: `0.5px solid ${i === 2 ? C.borderMid : C.borderSubtle}`, borderRadius: 16, padding: 28, height: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 11, background: "rgba(201,168,76,0.08)", border: `0.5px solid ${C.borderMid}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{f.icon}</div>
                  <div style={{ fontFamily: F.mono, fontSize: 12, color: C.gold, letterSpacing: 2 }}>{f.num}</div>
                </div>
                <div style={{ fontFamily: F.display, fontSize: 21, fontWeight: 500, color: C.textPrimary, marginBottom: 10, letterSpacing: 0.5, lineHeight: 1.3 }}>{f.title}</div>
                <div style={{ fontSize: 16, color: C.textSecondary, fontFamily: F.body, lineHeight: 1.7 }}>{f.desc}</div>
              </div>
              {i < flow.length - 1 && (
                <div className="flow-arrow" style={{ position: "absolute", top: "50%", right: -14, fontSize: 18, color: C.borderMid, transform: "translateY(-50%)", zIndex: 1 }}>→</div>
              )}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 20, background: "rgba(201,168,76,0.05)", border: `0.5px solid ${C.borderMid}`, borderRadius: 12, padding: "18px 22px", fontSize: 17, color: C.textSecondary, fontFamily: F.body, lineHeight: 1.8 }}>
          ✦ 所以你不需要多付任何費用，也不需要把資產或 API Key 交給 Monstore。你唯一要做的，是用我們的連結註冊、綁定 UID，然後照常交易。
        </div>
      </SectionWrapper>

      {/* ── VIP MEMBERSHIP ── */}
      <SectionWrapper id="vip">
        <SectionTag>VIP Membership</SectionTag>
        <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, color: C.textPrimary, letterSpacing: 0.5, marginBottom: 12 }}>
          你能拿到什麼
        </h2>
        <p style={{ fontSize: 19, color: C.textSecondary, fontFamily: F.body, marginBottom: 40, maxWidth: 560, lineHeight: 1.8 }}>
          依累積交易量自動晉升，交易量愈高，每月拿到的折價券、抽獎次數與折扣愈多。等級不用申請，系統自動計算。
        </p>
        <div className="vip-grid">
          {vipTiers.map((tier) => (
            <div key={tier.name}
              style={{ background: tier.highlight ? "rgba(201,168,76,0.06)" : tier.isTop ? "rgba(232,201,106,0.05)" : C.bgCard, border: `0.5px solid ${tier.isTop ? tier.colorBorder : tier.highlight ? C.borderStrong : C.borderSubtle}`, borderRadius: 16, padding: 24, position: "relative", overflow: "hidden", transition: "transform 0.2s", cursor: "default", display: "flex", flexDirection: "column" }}
              onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-4px)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "none")}
            >
              {tier.isTop && (
                <div style={{ position: "absolute", top: 12, right: 12, fontSize: 9, color: tier.color, background: tier.colorDim, border: `0.5px solid ${tier.colorBorder}`, padding: "2px 8px", borderRadius: 4, letterSpacing: 1, fontFamily: F.body, textTransform: "uppercase" }}>Top</div>
              )}
              <div style={{ fontFamily: F.display, fontSize: 24, fontWeight: 500, color: tier.color, letterSpacing: 1, marginBottom: 4 }}>{tier.name}</div>
              <div style={{ fontFamily: F.mono, fontSize: 13, fontWeight: 700, color: tier.color, marginBottom: 4 }}>{tier.range}</div>
              <div style={{ fontSize: 13, color: C.textMuted, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: F.body, marginBottom: 20 }}>累積交易量</div>
              <div style={{ height: "0.5px", background: tier.colorBorder, marginBottom: 16 }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
                {tier.stats.map((s) => (
                  <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
                    <span style={{ fontSize: 14, color: C.textMuted, fontFamily: F.body }}>{s.label}</span>
                    <span style={{ fontFamily: F.mono, fontSize: 15, fontWeight: 700, color: tier.color, whiteSpace: "nowrap" }}>{s.value}</span>
                  </div>
                ))}
              </div>
              {tier.extras.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 18, paddingTop: 16, borderTop: `0.5px solid ${C.borderSubtle}` }}>
                  {tier.extras.map((e) => (
                    <span key={e} style={{ fontSize: 12, color: tier.color, background: tier.colorDim, border: `0.5px solid ${tier.colorBorder}`, padding: "3px 10px", borderRadius: 6, fontFamily: F.body, whiteSpace: "nowrap" }}>✓ {e}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ── 四步驟 ── */}
      <SectionWrapper id="start" style={{ background: "rgba(255,255,255,0.01)", borderTop: `0.5px solid ${C.borderSubtle}`, borderBottom: `0.5px solid ${C.borderSubtle}` }}>
        <SectionTag>Get Started</SectionTag>
        <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, color: C.textPrimary, letterSpacing: 0.5, marginBottom: 40 }}>
          四步驟開始
        </h2>
        <div className="steps-grid">
          {steps.map((s) => (
            <div key={s.num} style={{ borderLeft: `1px solid ${C.borderMid}`, paddingLeft: 20 }}>
              <div style={{ fontFamily: F.mono, fontSize: 12, color: C.gold, marginBottom: 10, letterSpacing: 2 }}>{s.num}</div>
              <div style={{ fontSize: 16, fontWeight: 500, color: C.textPrimary, marginBottom: 8, fontFamily: F.body, lineHeight: 1.4 }}>{s.title}</div>
              <div style={{ fontSize: 15, color: C.textMuted, lineHeight: 1.7, fontFamily: F.body }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ── FOUNDER PASS ── */}
      <SectionWrapper id="founder">
        <SectionTag>Founder Pass</SectionTag>
        <div className="founder-grid">
          <div>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, color: C.textPrimary, letterSpacing: 0.5, marginBottom: 16 }}>
              想更深度<br /><span style={{ color: C.goldLight }}>參與這個平台？</span>
            </h2>
            <p style={{ fontSize: 18, color: C.textSecondary, fontFamily: F.body, lineHeight: 1.8, marginBottom: 20 }}>
              一般會員完全免費，上面的福利照拿。Founder Pass 是給想再往前一步的人 —— 早期參與身分，持有者依 Reward Units 佔流通中總 units 的比例，參與平台營收回饋池的分配。
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
              {[
                `${minFounderPrice} USDT 起，四個級距可選`,
                "永久 VIP，不受升降級影響",
                "依 Reward Units 比例參與營收回饋池",
                `創始批設 ${CAP_MULTIPLE_FOUNDING} 倍終身回饋上限，達上限後會員權益終身保留`,
                "創始批限定實體紀念品",
              ].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span style={{ fontSize: 14, color: C.gold, flexShrink: 0, marginTop: 3 }}>✦</span>
                  <span style={{ fontSize: 16, color: C.textSecondary, fontFamily: F.body, lineHeight: 1.6 }}>{item}</span>
                </div>
              ))}
            </div>
            <a href="/founder" style={{ background: `linear-gradient(135deg, ${C.goldDim}, #5a4520)`, border: `0.5px solid ${C.gold}`, color: C.goldLight, padding: "13px 28px", borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: F.body, textDecoration: "none", display: "inline-block" }}>
              查看完整級距與條款 →
            </a>
            <div style={{ marginTop: 12, fontSize: 14, color: C.textMuted, fontFamily: F.body }}>
              非投資商品，不保證任何金額之回饋。
            </div>
          </div>

          <div>
            <div className="ftier-grid">
              {FOUNDER_TIERS.map((t) => {
                const color = FOUNDER_TIER_COLOR[t.tier] ?? C.gold;
                return (
                  <div key={t.tier} style={{ background: C.bgCard, border: `0.5px solid ${C.borderSubtle}`, borderRadius: 14, padding: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ fontFamily: F.display, fontSize: 26, fontWeight: 300, color, letterSpacing: 1, lineHeight: 1 }}>{t.tier}</div>
                    <div>
                      <div style={{ fontFamily: F.mono, fontSize: 16, fontWeight: 700, color: C.textPrimary }}>${t.price.toLocaleString()}</div>
                      <div style={{ fontSize: 12, color: C.textMuted, fontFamily: F.body, letterSpacing: 1 }}>USDT</div>
                    </div>
                    <div style={{ height: "0.5px", background: C.borderSubtle }} />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <span style={{ fontSize: 12, color: C.textMuted, fontFamily: F.body }}>Units</span>
                      <span style={{ fontFamily: F.mono, fontSize: 13, color }}>{t.rewardUnits.toLocaleString()}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <span style={{ fontSize: 12, color: C.textMuted, fontFamily: F.body }}>販售中</span>
                      <span style={{ fontFamily: F.mono, fontSize: 13, color: "#5ea96e" }}>{t.onSale} 席</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: 16, background: "rgba(201,168,76,0.04)", border: `0.5px solid ${C.borderSubtle}`, borderRadius: 10, padding: "14px 18px", fontSize: 15, color: C.textMuted, fontFamily: F.body, lineHeight: 1.7 }}>
              ✦ 目前為創始批，各級距先釋出總名額的一部分。Reward Units 代表回饋池的分配權重，非股權、非證券，回饋金額依當期平台實際營收計算。
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ── CTA ── */}
      <section style={{ padding: "96px 0", borderTop: `0.5px solid ${C.borderSubtle}`, background: "linear-gradient(135deg, #0f0d07 0%, #0a0a0b 60%, #0d0d12 100%)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 300, color: C.textPrimary, letterSpacing: 1, lineHeight: 1.2, marginBottom: 16 }}>
              免費加入，<br /><span style={{ color: C.goldLight }}>從你的下一筆交易開始。</span>
            </h2>
            <p style={{ fontSize: 19, color: C.textSecondary, fontFamily: F.body, lineHeight: 1.8, marginBottom: 36 }}>
              不用會員費、不用 API Key、不用把資產交給任何人。
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href={BYBIT_URL} target="_blank" rel="noopener noreferrer" style={{ background: `linear-gradient(135deg, ${C.goldDim}, #5a4520)`, border: `0.5px solid ${C.gold}`, color: C.goldLight, padding: "14px 32px", borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: F.body, letterSpacing: 0.5, textDecoration: "none", display: "inline-block" }}>
                免費加入會員
              </a>
              <a href="/founder" style={{ background: "transparent", border: `0.5px solid ${C.borderMid}`, color: C.textSecondary, padding: "14px 28px", borderRadius: 10, fontSize: 14, cursor: "pointer", fontFamily: F.body, textDecoration: "none", display: "inline-block" }}>
                了解 Founder Pass →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: `0.5px solid ${C.borderSubtle}`, padding: "40px 32px", background: C.bgPrimary }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 30, height: 30, borderRadius: 6, overflow: "hidden", background: "#000", border: `0.5px solid ${C.borderMid}` }}>
              <img src="/logo.png" alt="logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <div style={{ fontFamily: F.display, fontSize: 16, fontWeight: 500, color: C.textPrimary, letterSpacing: 1 }}>
              Mon<span style={{ color: C.gold }}>store</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
            {["Discord", "Telegram", "X", "Contact"].map((item) => (
              <a key={item} href="#"
                style={{ fontSize: 12, color: C.textMuted, textDecoration: "none", fontFamily: F.body, letterSpacing: 0.3 }}
                onMouseEnter={e => (e.currentTarget.style.color = C.textSecondary)}
                onMouseLeave={e => (e.currentTarget.style.color = C.textMuted)}
              >{item}</a>
            ))}
          </div>
          <div style={{ fontSize: 11, color: C.textMuted, fontFamily: F.body }}>
            © {new Date().getFullYear()} Monstore. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
