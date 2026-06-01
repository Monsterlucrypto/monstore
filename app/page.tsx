"use client";


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
  textMuted: "#4a4740",
};

const F = {
  display: "'Cormorant Garamond', Georgia, serif",
  body: "'DM Sans', system-ui, sans-serif",
  mono: "'Space Mono', monospace",
};

const vipTiers = [
  {
    name: "Normal",
    range: "50K – 300K",
    perks: [
      "每月 50 NTD 電商折價券（無低消）",
      "95折優惠券 × 1（低消 500）",
    ],
    color: "#cd7f32", colorDim: "rgba(205,127,50,0.1)", colorBorder: "rgba(205,127,50,0.25)",
  },
  {
    name: "Silver",
    range: "300K – 1M",
    perks: [
      "每月抽獎資格 × 1",
      "每月 100 NTD 電商折價券（無低消）× 2",
      "9折優惠券 × 2（低消 500）",
      "VIP 群組",
    ],
    color: "#a8a9ad", colorDim: "rgba(168,169,173,0.1)", colorBorder: "rgba(168,169,173,0.25)",
  },
  {
    name: "Gold",
    range: "1M – 5M",
    perks: [
      "每月抽獎資格 × 3",
      "每月 100 NTD 電商折價券（無低消）× 2",
      "85折優惠券 × 2（低消 500）",
      "VIP 群組",
    ],
    color: "#C9A84C", colorDim: "rgba(201,168,76,0.1)", colorBorder: "rgba(201,168,76,0.3)",
    highlight: true,
  },
  {
    name: "Diamond",
    range: "5M 以上",
    perks: [
      "每月抽獎資格 × 10",
      "每月 100 NTD 電商折價券（無低消）× 5",
      "VIP 群組",
      "專人客服",
    ],
    color: "#E8C96A", colorDim: "rgba(232,201,106,0.1)", colorBorder: "rgba(232,201,106,0.35)",
    isTop: true,
  },
];
const steps = [
  { num: "01", title: "加入 Monstore 會員", desc: "完成基本會員註冊，取得專屬會員 ID。" },
  { num: "02", title: "綁定交易 UID", desc: "透過 UID 綁定建立交易量追蹤，無需提供 API Key。" },
  { num: "03", title: "累積交易量", desc: "交易量自動累積，達到門檻後晉升對應 VIP 等級。" },
  { num: "04", title: "解鎖專屬會員權益", desc: "享受電商折價券、優惠券、每月抽獎資格與 VIP 群組等專屬福利。" },
];

const features = [
  { icon: "📈", title: "Trading Rewards", desc: "交易量自動累積 VIP 進度，每一筆交易都在為你的會員等級加分。" },
  { icon: "◈", title: "Membership System", desc: "Normal 到 Diamond 四個等級，依累積交易量門檻解鎖不同等級的電商折價券、優惠券與抽獎資格。" },
  { icon: "◻", title: "Exclusive Benefits", desc: "電商折價券無最低消費限制，優惠券享折扣優惠，高等級會員更可加入 VIP 群組並享有專人客服。" },
];

const pools = [
  {
    label: "Platform Operations",
    pct: 80,
    color: C.textSecondary,
    colorBar: "rgba(138,133,120,0.4)",
    desc: "平台日常營運、技術開發、市場推廣、長期金庫與生態建設。",
    detail: ["日常營運與技術開發", "市場推廣與合作拓展", "長期金庫與回購預備金", "生態基礎建設"],
  },
  {
    label: "Monthly Reward Pool",
    pct: 20,
    color: C.gold,
    colorBar: C.gold,
    desc: "每月從真實營運收益中提撥，依據會員 Reward Units 權重分配參與資格。",
    detail: ["依 Reward Units 權重分配", "每月從真實收益提撥", "Founder 享最高參與權重", "透明公開分配機制"],
  },
];

function Navbar() {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(10,10,11,0.92)", backdropFilter: "blur(20px)",
      borderBottom: `0.5px solid ${C.borderSubtle}`,
      height: 64, display: "flex", alignItems: "center", padding: "0 32px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
        <div style={{ width: 34, height: 34, borderRadius: 8, overflow: "hidden", background: "#000", border: `0.5px solid ${C.borderMid}`, flexShrink: 0 }}>
          <img src="/logo.png" alt="logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
        <div style={{ fontFamily: F.display, fontSize: 18, fontWeight: 500, color: C.textPrimary, letterSpacing: 1 }}>
          Mon<span style={{ color: C.gold }}>store</span>
        </div>
      </div>

      <a href="/member" style={{ fontSize: 12, color: C.gold, background: "rgba(201,168,76,0.1)", border: `0.5px solid ${C.borderMid}`, padding: "7px 18px", borderRadius: 8, textDecoration: "none", fontFamily: F.body }}>
        Member →
      </a>
    </nav>
  );
}

function HeroCard() {
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
        {[{ label: "Reward Units", value: "1,000" }, { label: "VIP Level", value: "Founder" }, { label: "Access", value: "Max" }].map((s) => (
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


        .hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
        .feature-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .steps-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .vip-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .pool-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
        .founder-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }

        @media (max-width: 1024px) {
          .vip-grid { grid-template-columns: repeat(2, 1fr); }
          .steps-grid { grid-template-columns: repeat(2, 1fr); }
          .pool-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr; gap: 40px; }
          .feature-grid { grid-template-columns: 1fr; }
          .steps-grid { grid-template-columns: 1fr; }
          .vip-grid { grid-template-columns: 1fr; }
          .founder-grid { grid-template-columns: 1fr; }
          section { padding: 64px 0 !important; }
          div[style*="maxWidth: 1100"] { padding: 0 20px !important; }
        }
      `}</style>

      <Navbar />

      {/* ── HERO ── */}
      <section style={{ paddingTop: 160, paddingBottom: 96, background: `radial-gradient(ellipse 60% 40% at 70% 40%, rgba(201,168,76,0.06) 0%, transparent 70%), ${C.bgPrimary}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>
          <div className="hero-grid">
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(201,168,76,0.08)", border: `0.5px solid ${C.borderMid}`, borderRadius: 20, padding: "4px 14px", marginBottom: 24 }}>
                <span style={{ fontSize: 10, color: C.gold, letterSpacing: 2, textTransform: "uppercase", fontFamily: F.body }}>✦ Web3 Membership Platform</span>
              </div>
              <h1 style={{ fontFamily: F.display, fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 300, color: C.textPrimary, letterSpacing: 1, lineHeight: 1.1, marginBottom: 16 }}>
                Trade More.<br />
                <span style={{ color: C.goldLight }}>Unlock More.</span>
              </h1>
              <p style={{ fontSize: 16, color: C.textSecondary, fontFamily: F.body, lineHeight: 1.8, marginBottom: 36, maxWidth: 460 }}>
                讓交易量、消費與推薦貢獻，轉化為會員積分、VIP 等級與專屬權益。
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href="https://partner.bybit.com/b/153866" target="_blank" rel="noopener noreferrer" style={{ background: `linear-gradient(135deg, ${C.goldDim}, #5a4520)`, border: `0.5px solid ${C.gold}`, color: C.goldLight, padding: "13px 28px", borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: F.body, letterSpacing: 0.5, textDecoration: "none", display: "inline-block" }}>
                  Join Membership
                </a>
                <a href="#founder" style={{ background: "transparent", border: `0.5px solid ${C.borderMid}`, color: C.textSecondary, padding: "13px 24px", borderRadius: 10, fontSize: 14, cursor: "pointer", fontFamily: F.body, textDecoration: "none", display: "inline-block" }}>
                  Explore Founder Access →
                </a>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <HeroCard />
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT IS MONSTORE ── */}
      <SectionWrapper id="about" style={{ borderTop: `0.5px solid ${C.borderSubtle}` }}>
        <SectionTag>What is Monstore</SectionTag>
        <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, color: C.textPrimary, letterSpacing: 0.5, marginBottom: 16, maxWidth: 600 }}>
          Web3 會員經濟平台
        </h2>
        <p style={{ fontSize: 15, color: C.textSecondary, fontFamily: F.body, lineHeight: 1.8, marginBottom: 48, maxWidth: 600 }}>
          Monstore 將交易返佣與會員制度結合，讓會員的交易量累積成可見的 VIP 等級與專屬電商福利。平台不是交易所，不保管用戶資產，也不要求 API Key。
        </p>
        <div className="feature-grid">
          {features.map((f) => (
            <div key={f.title}
              style={{ background: C.bgCard, border: `0.5px solid ${C.borderSubtle}`, borderRadius: 16, padding: 28, transition: "border-color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = C.borderMid)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = C.borderSubtle)}
            >
              <div style={{ fontSize: 28, marginBottom: 16 }}>{f.icon}</div>
              <div style={{ fontFamily: F.display, fontSize: 20, fontWeight: 500, color: C.textPrimary, marginBottom: 10, letterSpacing: 0.5 }}>{f.title}</div>
              <div style={{ fontSize: 13, color: C.textSecondary, fontFamily: F.body, lineHeight: 1.7 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ── HOW IT WORKS ── */}
      <SectionWrapper id="how" style={{ background: "rgba(255,255,255,0.01)", borderTop: `0.5px solid ${C.borderSubtle}`, borderBottom: `0.5px solid ${C.borderSubtle}` }}>
        <SectionTag>How It Works</SectionTag>
        <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, color: C.textPrimary, letterSpacing: 0.5, marginBottom: 48 }}>
          四步驟開始累積會員價值
        </h2>
        <div className="steps-grid">
          {steps.map((s, i) => (
            <div key={s.num} style={{ position: "relative" }}>
              <div style={{ background: C.bgCard, border: `0.5px solid ${C.borderSubtle}`, borderRadius: 14, padding: 24 }}>
                <div style={{ fontFamily: F.mono, fontSize: 12, color: C.gold, marginBottom: 14, letterSpacing: 2 }}>{s.num}</div>
                <div style={{ fontSize: 15, fontWeight: 500, color: C.textPrimary, marginBottom: 8, fontFamily: F.body }}>{s.title}</div>
                <div style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.7, fontFamily: F.body }}>{s.desc}</div>
              </div>
              {i < steps.length - 1 && (
                <div style={{ position: "absolute", top: "50%", right: -10, fontSize: 16, color: C.borderMid, transform: "translateY(-50%)" }}>→</div>
              )}
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ── VIP MEMBERSHIP ── */}
      <SectionWrapper id="vip">
        <SectionTag>VIP Membership</SectionTag>
        <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, color: C.textPrimary, letterSpacing: 0.5, marginBottom: 12 }}>
          四個會員等級
        </h2>
        <p style={{ fontSize: 14, color: C.textSecondary, fontFamily: F.body, marginBottom: 48, maxWidth: 500 }}>
          依據累積交易量晉升等級，享有電商折價券、優惠券與抽獎等專屬會員福利。
        </p>
        <div className="vip-grid">
          {vipTiers.map((tier) => (
            <div key={tier.name}
              style={{ background: tier.highlight ? "rgba(201,168,76,0.06)" : tier.isTop ? "rgba(232,201,106,0.05)" : C.bgCard, border: `0.5px solid ${tier.isTop ? tier.colorBorder : tier.highlight ? C.borderStrong : C.borderSubtle}`, borderRadius: 16, padding: 24, position: "relative", overflow: "hidden", transition: "transform 0.2s", cursor: "default" }}
              onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-4px)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "none")}
            >
              {tier.isTop && (
                <div style={{ position: "absolute", top: 12, right: 12, fontSize: 9, color: tier.color, background: tier.colorDim, border: `0.5px solid ${tier.colorBorder}`, padding: "2px 8px", borderRadius: 4, letterSpacing: 1, fontFamily: F.body, textTransform: "uppercase" }}>Top</div>
              )}
              <div style={{ fontFamily: F.display, fontSize: 24, fontWeight: 500, color: tier.color, letterSpacing: 1, marginBottom: 4 }}>{tier.name}</div>
              <div style={{ fontFamily: F.mono, fontSize: 13, fontWeight: 700, color: tier.color, marginBottom: 4 }}>{tier.range}</div>
              <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: F.body, marginBottom: 20 }}>累積交易量</div>
              <div style={{ height: "0.5px", background: tier.colorBorder, marginBottom: 16 }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {tier.perks.map((p) => (
                  <div key={p} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                    <span style={{ fontSize: 12, color: tier.color, flexShrink: 0, marginTop: 1 }}>✓</span>
                    <span style={{ fontSize: 11, color: C.textSecondary, fontFamily: F.body, lineHeight: 1.6 }}>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ── TREASURY & REWARD POOL ── */}
      <SectionWrapper id="treasury" style={{ background: "rgba(255,255,255,0.01)", borderTop: `0.5px solid ${C.borderSubtle}`, borderBottom: `0.5px solid ${C.borderSubtle}` }}>
        <SectionTag>Treasury & Reward Pool</SectionTag>
        <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, color: C.textPrimary, letterSpacing: 0.5, marginBottom: 12 }}>
          雙池模型
        </h2>
        <p style={{ fontSize: 14, color: C.textSecondary, fontFamily: F.body, marginBottom: 48, maxWidth: 520 }}>
          Monstore 採用透明的雙池架構，平衡平台長期發展與會員月度回饋。
        </p>
        <div className="pool-grid">
          {pools.map((pool) => (
            <div key={pool.label} style={{ background: C.bgCard, border: `0.5px solid ${pool.label === "Monthly Reward Pool" ? C.borderMid : C.borderSubtle}`, borderRadius: 16, padding: 28 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <div>
                  <div style={{ fontFamily: F.display, fontSize: 22, fontWeight: 500, color: pool.color, letterSpacing: 0.5, marginBottom: 4 }}>{pool.label}</div>
                  <div style={{ fontSize: 12, color: C.textMuted, fontFamily: F.body, lineHeight: 1.7, maxWidth: 300 }}>{pool.desc}</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 16 }}>
                  <div style={{ fontFamily: F.mono, fontSize: 40, fontWeight: 700, color: pool.color, lineHeight: 1 }}>{pool.pct}%</div>
                  <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: F.body, marginTop: 4 }}>of Revenue</div>
                </div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 4, height: 6, overflow: "hidden", marginBottom: 20 }}>
                <div style={{ height: "100%", width: `${pool.pct}%`, background: pool.label === "Monthly Reward Pool" ? `linear-gradient(90deg, ${C.goldDim}, ${C.gold})` : "rgba(138,133,120,0.35)", borderRadius: 4 }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {pool.detail.map((d) => (
                  <div key={d} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 12, color: pool.color, flexShrink: 0 }}>◎</span>
                    <span style={{ fontSize: 12, color: C.textSecondary, fontFamily: F.body }}>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 20, background: "rgba(201,168,76,0.04)", border: `0.5px solid ${C.borderSubtle}`, borderRadius: 10, padding: "14px 20px", fontSize: 12, color: C.textMuted, fontFamily: F.body, lineHeight: 1.7 }}>
          ✦ Reward Units 代表你在 Monthly Reward Pool 中的參與權重，非股權、非保證收益產品。月度回饋來自真實平台收益，無保底金額。
        </div>
      </SectionWrapper>

      {/* ── FOUNDER MEMBERSHIP ── */}
      <SectionWrapper id="founder">
        <SectionTag>Founder Access</SectionTag>
        <div className="founder-grid">
          <div>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, color: C.textPrimary, letterSpacing: 0.5, marginBottom: 16 }}>
              Limited Founder<br /><span style={{ color: C.goldLight }}>Membership</span>
            </h2>
            <p style={{ fontSize: 14, color: C.textSecondary, fontFamily: F.body, lineHeight: 1.8, marginBottom: 24 }}>
              Founder 不是股權，不是股票，不是保證收益產品。Founder 是早期生態參與身份，擁有最高 Reward Units、永久 VIP、Founder Badge 與未來平台優先權益。
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
              {["1,290 Reward Units", "Permanent VIP Status", "Founder Badge", "Ecosystem Priority", "Monthly Reward Pool 最高權重"].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 14, color: C.gold }}>✦</span>
                  <span style={{ fontSize: 13, color: C.textSecondary, fontFamily: F.body }}>{item}</span>
                </div>
              ))}
            </div>
            <button style={{ background: `linear-gradient(135deg, ${C.goldDim}, #5a4520)`, border: `0.5px solid ${C.gold}`, color: C.goldLight, padding: "12px 28px", borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: F.body }}>
              Founder Access — $5,000
            </button>
            <div style={{ marginTop: 12, fontSize: 11, color: C.textMuted, fontFamily: F.body }}>限量 20 席 · 售完即止</div>
          </div>

          <div style={{ background: "linear-gradient(135deg, #1a1508 0%, #0e0e12 60%, #0a0a0b 100%)", border: `0.5px solid ${C.borderMid}`, borderRadius: 16, padding: 28, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -30, right: -30, width: 180, height: 180, background: "radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
            <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12, fontFamily: F.body }}>Founder Tier</div>
            <div style={{ fontFamily: F.display, fontSize: 36, fontWeight: 300, color: C.gold, lineHeight: 1, marginBottom: 4 }}>1,290</div>
            <div style={{ fontSize: 11, color: C.textMuted, fontFamily: F.body, marginBottom: 24, letterSpacing: 1.5 }}>REWARD UNITS</div>
            <div style={{ height: "0.5px", background: C.borderMid, marginBottom: 20 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { label: "Reward Pool Weight", value: "Max" },
                { label: "積分倍率", value: "3.0×" },
                { label: "商城折扣", value: "50%" },
                { label: "VIP 等級", value: "Permanent" },
              ].map((s) => (
                <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: C.textMuted, fontFamily: F.body }}>{s.label}</span>
                  <span style={{ fontFamily: F.mono, fontSize: 13, fontWeight: 700, color: C.goldLight }}>{s.value}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20, background: "rgba(201,168,76,0.06)", border: `0.5px solid ${C.borderMid}`, borderRadius: 8, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 11, color: C.textMuted, fontFamily: F.body }}>剩餘名額</span>
              <span style={{ fontFamily: F.mono, fontSize: 16, fontWeight: 700, color: C.gold }}>17 / 20</span>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ── CTA ── */}
      <section style={{ padding: "96px 0", borderTop: `0.5px solid ${C.borderSubtle}`, background: "linear-gradient(135deg, #0f0d07 0%, #0a0a0b 60%, #0d0d12 100%)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 300, color: C.textPrimary, letterSpacing: 1, lineHeight: 1.2, marginBottom: 16 }}>
              Become an Early<br /><span style={{ color: C.goldLight }}>Monstore Member</span>
            </h2>
            <p style={{ fontSize: 15, color: C.textSecondary, fontFamily: F.body, lineHeight: 1.8, marginBottom: 40 }}>
              加入早期會員，參與 Monstore 交易會員經濟的第一階段。
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="https://partner.bybit.com/b/153866" target="_blank" rel="noopener noreferrer" style={{ background: `linear-gradient(135deg, ${C.goldDim}, #5a4520)`, border: `0.5px solid ${C.gold}`, color: C.goldLight, padding: "14px 32px", borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: F.body, letterSpacing: 0.5, textDecoration: "none", display: "inline-block" }}>
  Join Community
</a>
              <button style={{ background: "transparent", border: `0.5px solid ${C.borderMid}`, color: C.textSecondary, padding: "14px 28px", borderRadius: 10, fontSize: 14, cursor: "pointer", fontFamily: F.body }}>
                Founder Access →
              </button>
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
            © 2025 Monstore. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
