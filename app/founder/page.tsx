"use client";
import Layout from "@/components/Layout";
import { useState } from "react";

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

const userFounder = {
  hasPass: true,
  passId: "FOUNDER-0291",
  acquiredDate: "2024.03.18",
  wallet: "0x7f4a...3d8c",
};

const founderTiers = [
  {
    name: "Founder Tier",
    price: 5000,
    slots: 20,
    remaining: 3,
    weight: "1.29%",
    color: "#E8C96A",
    colorDim: "rgba(232,201,106,0.12)",
    colorBorder: "rgba(232,201,106,0.35)",
  },
  {
    name: "Gold Tier",
    price: 1000,
    slots: 180,
    remaining: 47,
    weight: "0.24%",
    color: "#C9A84C",
    colorDim: "rgba(201,168,76,0.12)",
    colorBorder: "rgba(201,168,76,0.3)",
  },
  {
    name: "Silver Tier",
    price: 300,
    slots: 300,
    remaining: 112,
    weight: "0.07%",
    color: "#a8a9ad",
    colorDim: "rgba(168,169,173,0.1)",
    colorBorder: "rgba(168,169,173,0.25)",
  },
  {
    name: "Bronze Tier",
    price: 100,
    slots: 500,
    remaining: 284,
    weight: "0.02%",
    color: "#cd7f32",
    colorDim: "rgba(205,127,50,0.1)",
    colorBorder: "rgba(205,127,50,0.25)",
  },
];
const benefits = [
  {
    icon: "🥚", name: "永久 VIP",
    desc: "無論月交易量多寡，永遠鎖定 Founder 等級，不受升降級影響。",
    detail: "一般會員每月需達到交易量門檻才能維持等級，Founder Pass 持有者永久豁免此限制。",
  },
  {
    icon: "✦", name: "3× 積分倍率",
    desc: "所有交易量享最高積分倍率，永久生效，不限時間。",
    detail: "相比 Gold 等級的 2.5×，Founder 持有者享有 3.0× 倍率，每月可多累積約 20% 積分。",
  },
  {
    icon: "⟐", name: "專屬存取權",
    desc: "私人訊號頻道、產品優先搶購資格、Alpha 測試群組邀請。",
    detail: "包含每週市場分析報告、新功能 Beta 測試優先資格、線下活動優先入場。",
  },
  {
    icon: "◎", name: "專屬客戶經理",
    desc: "分配個人帳戶經理，24/7 直線聯繫，優先處理所有問題。",
    detail: "客戶經理將在 2 小時內回覆所有請求，提供專屬優化建議與帳戶分析報告。",
  },
  {
    icon: "◻", name: "商城 50% 折扣",
    desc: "所有商城商品享有 50% 積分折扣，包含限量商品。",
    detail: "包含 Founder Only 專屬商品的兌換資格，以及每季限量商品的優先兌換權。",
  },
  {
    icon: "◈", name: "VIP 黑卡",
    desc: "實體金屬會員卡，全球禮賓服務資格，機場貴賓室免費使用。",
    detail: "卡片採用 316L 不鏽鋼製作，雷射雕刻專屬編號，附全球 30+ 城市禮賓服務。",
  },
];

const faqs = [
  { q: "Founder Pass 是 NFT 嗎？", a: "不是。Founder Pass 是平台會員資格憑證，與帳號綁定，不可轉讓或交易。這確保了每位 Founder 都是真實的活躍會員。" },
  { q: "購買後可以退款嗎？", a: "Founder Pass 為一次性永久升級，購買後不提供退款。建議在購買前確認積分餘額充足。" },
  { q: "如果平台關閉，Pass 還有效嗎？", a: "平台運營期間，所有 Founder 權益永久有效。我們承諾在任何重大變更前至少提前 180 天通知所有 Founder。" },
  { q: "1,000 張上限賣完後還能取得嗎？", a: "目前計劃嚴格限量 1,000 張，售完即止。未來不排除特殊活動贈送，但不會額外銷售。" },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 10, letterSpacing: 3, color: C.textMuted, textTransform: "uppercase", marginBottom: 16, fontFamily: F.body }}>
      {children}
    </div>
  );
}

// 頂部英雄區塊
function HeroBanner() {
  return (
    <div style={{ background: "linear-gradient(135deg, #1a1508 0%, #0e0e12 50%, #0a0a0b 100%)", border: `0.5px solid ${C.borderMid}`, borderRadius: 20, padding: "48px 40px", position: "relative", overflow: "hidden", textAlign: "center" }}>
      <div style={{ position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)", width: 400, height: 400, background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 20, right: 20, fontSize: 10, color: C.textMuted, letterSpacing: 2, fontFamily: F.body, textTransform: "uppercase" }}>限量發行</div>

      <div style={{ fontSize: 52, marginBottom: 16 }}>🥚</div>
      <div style={{ fontFamily: F.display, fontSize: 42, fontWeight: 300, color: C.textPrimary, letterSpacing: 2, marginBottom: 8, position: "relative", zIndex: 1 }}>
        Founder Pass
      </div>
      <div style={{ fontSize: 14, color: C.textMuted, fontFamily: F.body, marginBottom: 32, letterSpacing: 0.5, position: "relative", zIndex: 1 }}>
        一次性永久升級 · 無月費 · 終身所有權益
      </div>

      {/* 剩餘張數 */}
      <div style={{ display: "inline-flex", alignItems: "center", gap: 24, background: "rgba(255,255,255,0.02)", border: `0.5px solid ${C.borderMid}`, borderRadius: 12, padding: "20px 32px", marginBottom: 32, position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: F.display, fontSize: 48, fontWeight: 300, color: C.gold, lineHeight: 1 }}>273</div>
          <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 2, textTransform: "uppercase", marginTop: 4, fontFamily: F.body }}>剩餘張數</div>
        </div>
        <div style={{ width: "0.5px", height: 50, background: C.borderMid }} />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: F.display, fontSize: 48, fontWeight: 300, color: C.textSecondary, lineHeight: 1 }}>727</div>
          <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 2, textTransform: "uppercase", marginTop: 4, fontFamily: F.body }}>已售出</div>
        </div>
        <div style={{ width: "0.5px", height: 50, background: C.borderMid }} />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: F.display, fontSize: 48, fontWeight: 300, color: C.textSecondary, lineHeight: 1 }}>1,000</div>
          <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 2, textTransform: "uppercase", marginTop: 4, fontFamily: F.body }}>總發行量</div>
        </div>
      </div>

      {/* 進度條 */}
      <div style={{ maxWidth: 500, margin: "0 auto 32px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.textMuted, fontFamily: F.mono, marginBottom: 8 }}>
          <span>0</span>
          <span style={{ color: C.gold }}>72.7% 已售出</span>
          <span>1,000</span>
        </div>
        <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 4, height: 8, overflow: "hidden" }}>
          <div style={{ height: "100%", width: "72.7%", background: `linear-gradient(90deg, ${C.goldDim}, ${C.gold}, ${C.goldLight})`, borderRadius: 4, transition: "width 1s ease" }} />
        </div>
      </div>

      {/* CTA */}
      {userFounder.hasPass ? (
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(94,169,110,0.08)", border: "0.5px solid rgba(94,169,110,0.3)", borderRadius: 10, padding: "14px 28px", position: "relative", zIndex: 1 }}>
          <span style={{ fontSize: 16, color: "#5ea96e" }}>✓</span>
          <span style={{ fontSize: 14, color: "#5ea96e", fontFamily: F.body, fontWeight: 500 }}>你已持有 Founder Pass</span>
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, position: "relative", zIndex: 1 }}>
          <button style={{ background: `linear-gradient(135deg, ${C.goldDim}, #5a4520)`, border: `0.5px solid ${C.gold}`, color: C.goldLight, padding: "13px 32px", borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: F.body, letterSpacing: 0.5 }}>
            立即取得 — 8,000 積分
          </button>
          <button style={{ background: "transparent", border: `0.5px solid ${C.borderMid}`, color: C.textSecondary, padding: "13px 24px", borderRadius: 10, fontSize: 14, cursor: "pointer", fontFamily: F.body }}>
            了解更多
          </button>
        </div>
      )}
    </div>
  );
}

// 我的 Founder 狀態
function MyFounderStatus() {
  if (!userFounder.hasPass) return null;
  return (
    <div style={{ background: "linear-gradient(135deg, #0a1208 0%, #0a0a0b 100%)", border: "0.5px solid rgba(94,169,110,0.25)", borderRadius: 16, padding: 28, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -30, right: -30, width: 160, height: 160, background: "radial-gradient(circle, rgba(94,169,110,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(94,169,110,0.1)", border: "0.5px solid rgba(94,169,110,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>🥚</div>
        <div>
          <div style={{ fontFamily: F.display, fontSize: 20, fontWeight: 500, color: "#5ea96e", letterSpacing: 0.5 }}>已持有 Founder Pass</div>
          <div style={{ fontSize: 12, color: C.textMuted, fontFamily: F.body, marginTop: 2 }}>所有 Founder 權益已啟用</div>
        </div>
        <div style={{ marginLeft: "auto", background: "rgba(94,169,110,0.08)", border: "0.5px solid rgba(94,169,110,0.25)", borderRadius: 8, padding: "6px 14px" }}>
          <div style={{ fontSize: 9, color: "#5ea96e", letterSpacing: 2, textTransform: "uppercase", fontFamily: F.body, marginBottom: 2 }}>Pass ID</div>
          <div style={{ fontFamily: F.mono, fontSize: 13, fontWeight: 700, color: "#5ea96e" }}>{userFounder.passId}</div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {[
          { label: "取得日期",  value: userFounder.acquiredDate },
          { label: "綁定錢包",  value: userFounder.wallet },
          { label: "剩餘效期",  value: "永久" },
        ].map((s) => (
          <div key={s.label} style={{ background: "rgba(255,255,255,0.02)", border: `0.5px solid ${C.borderSubtle}`, borderRadius: 8, padding: 14 }}>
            <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6, fontFamily: F.body }}>{s.label}</div>
            <div style={{ fontFamily: F.mono, fontSize: 13, fontWeight: 700, color: C.textPrimary }}>{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 六項權益卡片
function BenefitCards() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [hov, setHov] = useState<number | null>(null);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
      {benefits.map((b, i) => (
        <div
          key={b.name}
          onMouseEnter={() => setHov(i)}
          onMouseLeave={() => setHov(null)}
          onClick={() => setExpanded(expanded === i ? null : i)}
          style={{ background: expanded === i ? "rgba(201,168,76,0.06)" : hov === i ? C.bgCardHover : C.bgCard, border: `0.5px solid ${expanded === i ? C.borderStrong : hov === i ? C.borderMid : C.borderSubtle}`, borderRadius: 14, padding: 22, cursor: "pointer", transition: "all 0.25s ease" }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontSize: 28, color: C.gold }}>{b.icon}</span>
            <span style={{ fontSize: 12, color: C.textMuted, transition: "transform 0.2s", display: "inline-block", transform: expanded === i ? "rotate(180deg)" : "none" }}>▾</span>
          </div>
          <div style={{ fontSize: 15, fontWeight: 500, color: C.textPrimary, marginBottom: 6, fontFamily: F.body }}>{b.name}</div>
          <div style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.6, fontFamily: F.body }}>{b.desc}</div>
          {expanded === i && (
            <div style={{ marginTop: 14, paddingTop: 14, borderTop: `0.5px solid ${C.borderSubtle}`, fontSize: 12, color: C.textSecondary, lineHeight: 1.7, fontFamily: F.body }}>
              {b.detail}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// 積分兌換說明
function PricingSection() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* 說明文字 */}
      <div style={{ background: "rgba(201,168,76,0.04)", border: `0.5px solid ${C.borderSubtle}`, borderRadius: 10, padding: "12px 18px", fontSize: 12, color: C.textMuted, fontFamily: F.body, lineHeight: 1.7 }}>
        ✦ 此為平台生態權益，非公司股權、股票或證券 &nbsp;·&nbsp; Founder Pool 最多占平台總生態收益 20% &nbsp;·&nbsp; Reward Weight 代表你在 Founder Pool 中的分潤比例
      </div>

      {/* 四個階層卡片 */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {founderTiers.map((t) => {
          const soldPct = Math.round(((t.slots - t.remaining) / t.slots) * 100);
          return (
            <div key={t.name} style={{ background: t.colorDim, border: `0.5px solid ${t.colorBorder}`, borderRadius: 14, padding: 22, display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: t.color, marginBottom: 4, fontFamily: F.body, letterSpacing: 0.5 }}>{t.name}</div>
                <div style={{ fontFamily: F.mono, fontSize: 26, fontWeight: 700, color: C.textPrimary, lineHeight: 1 }}>${t.price.toLocaleString()}</div>
                <div style={{ fontSize: 11, color: C.textMuted, fontFamily: F.body, marginTop: 2 }}>一次性永久會員</div>
              </div>

              <div style={{ height: "0.5px", background: t.colorBorder }} />

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 11, color: C.textMuted, fontFamily: F.body }}>Reward Weight</span>
                  <span style={{ fontFamily: F.mono, fontSize: 12, fontWeight: 700, color: t.color }}>{t.weight}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 11, color: C.textMuted, fontFamily: F.body }}>總名額</span>
                  <span style={{ fontFamily: F.mono, fontSize: 12, color: C.textSecondary }}>{t.slots}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 11, color: C.textMuted, fontFamily: F.body }}>剩餘名額</span>
                  <span style={{ fontFamily: F.mono, fontSize: 12, fontWeight: 700, color: t.remaining < 20 ? "#c96060" : C.textPrimary }}>{t.remaining}</span>
                </div>
              </div>

              {/* 售出進度 */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: C.textMuted, fontFamily: F.mono, marginBottom: 6 }}>
                  <span>已售出</span>
                  <span>{soldPct}%</span>
                </div>
                <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 3, height: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${soldPct}%`, background: `linear-gradient(90deg, ${t.color}80, ${t.color})`, borderRadius: 3 }} />
                </div>
              </div>

              <button style={{ width: "100%", padding: "10px 0", borderRadius: 8, background: `linear-gradient(135deg, ${t.color}30, ${t.color}15)`, border: `0.5px solid ${t.colorBorder}`, color: t.color, fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: F.body, letterSpacing: 0.5 }}>
                立即加入
              </button>
            </div>
          );
        })}
      </div>

      {/* 重要說明 */}
      <div style={{ background: C.bgCard, border: `0.5px solid ${C.borderSubtle}`, borderRadius: 14, padding: 24 }}>
        <div style={{ fontFamily: F.display, fontSize: 17, fontWeight: 500, color: C.textPrimary, marginBottom: 16 }}>重要說明</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { icon: "◎", text: "Founder Membership 與帳號永久綁定，不可轉讓" },
            { icon: "✦", text: "Reward Weight 代表你在 Founder Pool 的分潤權重，非公司股份" },
            { icon: "◈", text: "Founder Pool 最多占平台總生態收益的 20%，每月自動分配" },
            { icon: "⟐", text: "所有權益自購買當日起立即生效，月回饋次月開始計算" },
            { icon: "◆", text: "各階層名額售完即止，不追加發行" },
          ].map((n, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <span style={{ fontSize: 14, color: C.gold, flexShrink: 0, marginTop: 1 }}>{n.icon}</span>
              <span style={{ fontSize: 13, color: C.textSecondary, fontFamily: F.body, lineHeight: 1.6 }}>{n.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
// FAQ
function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div style={{ background: C.bgCard, border: `0.5px solid ${C.borderSubtle}`, borderRadius: 16, padding: 28 }}>
      <div style={{ fontFamily: F.display, fontSize: 20, fontWeight: 500, color: C.textPrimary, letterSpacing: 0.5, marginBottom: 20 }}>常見問題</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {faqs.map((f, i) => (
          <div key={i} style={{ borderBottom: i < faqs.length - 1 ? `0.5px solid ${C.borderSubtle}` : "none" }}>
            <div onClick={() => setOpen(open === i ? null : i)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 0", cursor: "pointer" }}>
              <span style={{ fontSize: 14, color: C.textPrimary, fontFamily: F.body, fontWeight: 500 }}>{f.q}</span>
              <span style={{ fontSize: 12, color: C.textMuted, transition: "transform 0.2s", display: "inline-block", transform: open === i ? "rotate(180deg)" : "none", flexShrink: 0, marginLeft: 16 }}>▾</span>
            </div>
            {open === i && (
              <div style={{ paddingBottom: 18, fontSize: 13, color: C.textSecondary, fontFamily: F.body, lineHeight: 1.7 }}>{f.a}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FounderPassPage() {
  return (
    <Layout activePath="/founder" title="Founder Pass">
      <div style={{ display: "flex", flexDirection: "column", gap: 32, maxWidth: 1200 }}>
        <HeroBanner />
        {userFounder.hasPass && (
          <div>
            <SectionLabel>我的狀態</SectionLabel>
            <MyFounderStatus />
          </div>
        )}
        <div>
          <SectionLabel>專屬權益</SectionLabel>
          <BenefitCards />
        </div>
        <div>
          <SectionLabel>取得方式與說明</SectionLabel>
          <PricingSection />
        </div>
        <div>
          <SectionLabel>常見問題</SectionLabel>
          <FAQ />
        </div>
        <div style={{ height: 8 }} />
      </div>
    </Layout>
  );
}
    