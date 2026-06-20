"use client";
import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import { members } from "@/data/members";
import type { Member } from "@/data/members";

const UID_KEY = "monstore_uid";

// ════════════════════════════════════════════════════════════
// 設計 Token
// ════════════════════════════════════════════════════════════
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

// ════════════════════════════════════════════════════════════
// 模擬資料
// ════════════════════════════════════════════════════════════

type FilterType = "全部" | "折價券" | "配件" | "Founder Pass" | "蝦皮";

const products = [
  // ── 蝦皮 ──
  { id: 8, name: "配合的蝦皮商城",     desc: "會員私訊都可以用更優惠的價格購買哦~",          price: 0,     tag: "蝦皮",        icon: "🛒", locked: false, href: "https://s.shopee.tw/9zvWcmlEOB" },
  // ── 折價券 ──
  { id: 1, name: "NT$250 折價券",      desc: "低消 NT$1,000 適用，每筆訂單限用一張",        price: 40,    tag: "折價券",      icon: "🎟️", locked: false },
  { id: 2, name: "NT$500 折價券",      desc: "低消 NT$2,000 適用，每筆訂單限用一張",        price: 70,    tag: "折價券",      icon: "🎫", locked: false },
  // ── 配件 ──
  { id: 3, name: "30cm Type-C 充電線", desc: "Type-C to Type-C，30cm 短線，編織材質",       price: 40,    tag: "配件",        icon: "🔌", locked: false },
  { id: 4, name: "20W 充電頭",         desc: "GaN 20W 快充充電頭，支援 PD 快充協議",         price: 100,   tag: "配件",        icon: "🔋", locked: false },
  { id: 9, name: "神秘小禮物",         desc: "敬請期待即將推出",                              price: 0,     tag: "配件",        icon: "🥃", locked: false, comingSoon: true },
  // ── Founder Pass ──
  { id: 5, name: "M Founder Pass",     desc: "Monstore 創始會員 M 等級，240 Reward Units，永久 Founder 權益", price: 12000, tag: "Founder Pass", icon: "◆", locked: false, founderTier: "M" },
  { id: 6, name: "O Founder Pass",     desc: "Monstore 創始會員 O 等級，70 Reward Units，永久 Founder 權益", price: 4000,  tag: "Founder Pass", icon: "◆", locked: false, founderTier: "O" },
  { id: 7, name: "N Founder Pass",     desc: "Monstore 創始會員 N 等級，20 Reward Units，永久 Founder 權益", price: 1200,  tag: "Founder Pass", icon: "◆", locked: false, founderTier: "N" },
];

const orders: { id: string; date: string; item: string; points: number; status: string }[] = [];

// ════════════════════════════════════════════════════════════
// 共用元件
// ════════════════════════════════════════════════════════════

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 10, letterSpacing: 3, color: C.textMuted, textTransform: "uppercase", marginBottom: 16, fontFamily: F.body }}>
      {children}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { color: string; bg: string; border: string }> = {
    "已完成":   { color: "#5ea96e", bg: "rgba(94,169,110,0.08)",  border: "rgba(94,169,110,0.25)"  },
    "審核通過": { color: C.gold,    bg: "rgba(201,168,76,0.08)",  border: "rgba(201,168,76,0.25)"  },
    "審核中":   { color: "#c9954c", bg: "rgba(201,149,76,0.08)",  border: "rgba(201,149,76,0.25)"  },
  };
  const s = map[status] ?? map["審核中"];
  return (
    <span style={{ fontSize: 11, color: s.color, background: s.bg, border: `0.5px solid ${s.border}`, padding: "3px 10px", borderRadius: 20, fontFamily: F.body }}>
      {status}
    </span>
  );
}

// ════════════════════════════════════════════════════════════
// 區塊元件
// ════════════════════════════════════════════════════════════

// 積分餘額橫幅
function PointsBanner({ member }: { member: Member | null }) {
  const pts = member ? parseFloat(member.points) || 0 : 0;
  return (
    <div style={{ background: "linear-gradient(135deg, #1a1508 0%, #0e0e12 60%, #0a0a0b 100%)", border: `0.5px solid ${C.borderMid}`, borderRadius: 16, padding: "20px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -30, right: -30, width: 160, height: 160, background: "radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div>
          <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4, fontFamily: F.body }}>可用積分</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontFamily: F.mono, fontSize: 32, fontWeight: 700, color: C.goldLight, lineHeight: 1 }}>{pts.toFixed(4)}</span>
            <span style={{ fontSize: 13, color: C.textMuted, fontFamily: F.body }}>point</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 商品列表
function ProductGrid({ member }: { member: Member | null }) {
  const [filter, setFilter] = useState<FilterType>("全部");
  const [hov, setHov] = useState<number | null>(null);
  const [redeemed, setRedeemed] = useState<number | null>(null);
  const userPoints = member ? parseFloat(member.points) || 0 : 0;
  const hasFounderPass = !!member?.founderPass;

  // Founder Only 商品：有 Founder Pass 才解鎖
  const resolvedProducts = products.map((p) => ({ ...p }));

  const filters: FilterType[] = ["全部", "折價券", "配件", "Founder Pass", "蝦皮"];

  const filtered = resolvedProducts.filter((p) => {
    if (filter === "全部") return true;
    return p.tag === filter;
  });

  return (
    <div>
      {/* 篩選 */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "7px 18px",
              borderRadius: 20,
              fontSize: 12,
              fontFamily: F.body,
              cursor: "pointer",
              border: `0.5px solid ${filter === f ? C.borderStrong : C.borderSubtle}`,
              background: filter === f ? "rgba(201,168,76,0.12)" : "transparent",
              color: filter === f ? C.goldLight : C.textSecondary,
              transition: "all 0.2s",
            }}
          >
            {f}
          </button>
        ))}
        <span style={{ marginLeft: "auto", fontSize: 12, color: C.textMuted, fontFamily: F.body, alignSelf: "center" }}>
          {filtered.length} 件商品
        </span>
      </div>

      {/* 商品格 */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {filtered.map((p) => (
          <div
            key={p.id}
            onMouseEnter={() => setHov(p.id)}
            onMouseLeave={() => setHov(null)}
            style={{
              background: C.bgCard,
              border: `0.5px solid ${p.locked ? C.borderMid : hov === p.id ? C.borderMid : C.borderSubtle}`,
              borderRadius: 12,
              overflow: "hidden",
              transition: "all 0.25s ease",
              transform: hov === p.id && !p.locked ? "translateY(-2px)" : "none",
            }}
          >
            {/* 商品圖片區 */}
            <div style={{ height: 140, background: p.tag === "Founder Pass" ? "linear-gradient(135deg, #1a1508, #0e0e12)" : p.locked ? "linear-gradient(135deg, #141209, #1a1810)" : "linear-gradient(135deg, #111116, #1a1a22)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 52, borderBottom: `0.5px solid ${C.borderSubtle}`, position: "relative" }}>
              {p.tag === "Founder Pass" && p.founderTier ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  {/* SVG Ticket */}
                  <svg width="110" height="46" viewBox="0 0 110 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id={`tg_${p.id}`} x1="0" y1="0" x2="110" y2="46" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#F5E070" />
                        <stop offset="45%" stopColor="#E8C96A" />
                        <stop offset="100%" stopColor="#B08020" />
                      </linearGradient>
                      <linearGradient id={`ts_${p.id}`} x1="0" y1="0" x2="0" y2="46" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.22)" />
                        <stop offset="60%" stopColor="rgba(255,255,255,0)" />
                      </linearGradient>
                    </defs>
                    <path d="M5,0 H105 Q110,0 110,5 V16 A7,7 0 0,0 110,30 V41 Q110,46 105,46 H5 Q0,46 0,41 V30 A7,7 0 0,1 0,16 V5 Q0,0 5,0 Z" fill={`url(#tg_${p.id})`} />
                    <path d="M5,0 H105 Q110,0 110,5 V16 A7,7 0 0,0 110,30 V41 Q110,46 105,46 H5 Q0,46 0,41 V30 A7,7 0 0,1 0,16 V5 Q0,0 5,0 Z" fill={`url(#ts_${p.id})`} />
                    <path d="M5,0 H105 Q110,0 110,5 V16 A7,7 0 0,0 110,30 V41 Q110,46 105,46 H5 Q0,46 0,41 V30 A7,7 0 0,1 0,16 V5 Q0,0 5,0 Z" fill="none" stroke="rgba(255,245,180,0.55)" strokeWidth="0.6" />
                    {Array.from({length: 12}).map((_,i) => <rect key={i} x={14+i*7} y={22} width={4} height={1.5} fill="rgba(80,50,5,0.3)" rx={0.5} />)}
                    <text x="55" y="17" textAnchor="middle" fontFamily="'Cormorant Garamond',Georgia,serif" fontSize="10" fontWeight="600" fill="rgba(55,35,5,0.8)" letterSpacing="3">FOUNDER</text>
                    <text x="55" y="36" textAnchor="middle" fontFamily="'DM Sans',system-ui,sans-serif" fontSize="8" fontWeight="500" fill="rgba(55,35,5,0.6)" letterSpacing="2">MEMBERSHIP</text>
                  </svg>
                  <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 13, fontWeight: 700, color: "#E8C96A", letterSpacing: 3 }}>{p.founderTier} ACCESS</span>
                </div>
              ) : (
                <span style={{ opacity: p.locked ? 0.4 : 1 }}>{p.icon}</span>
              )}
              {/* 標籤 */}
              <div style={{ position: "absolute", top: 10, left: 10, background: p.tag === "Founder Pass" ? "rgba(232,201,106,0.2)" : "rgba(201,168,76,0.12)", border: `0.5px solid ${p.tag === "Founder Pass" ? C.borderStrong : C.borderMid}`, color: p.tag === "Founder Pass" ? C.goldLight : C.gold, fontSize: 9, letterSpacing: 1.5, padding: "3px 8px", borderRadius: 4, textTransform: "uppercase" }}>
                {p.tag}
              </div>

              {/* 鎖定遮罩 */}
              {p.locked && (
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(10,10,11,0.5)" }}>
                  <span style={{ fontSize: 24 }}>🔒</span>
                </div>
              )}
            </div>

            {/* 商品資訊 */}
            <div style={{ padding: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: p.locked ? C.textMuted : C.textPrimary, marginBottom: 4, fontFamily: F.body }}>{p.name}</div>
              <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 12, lineHeight: 1.5, fontFamily: F.body }}>{p.desc}</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  {"href" in p
                    ? <div style={{ fontFamily: F.body, fontSize: 12, color: C.textMuted }}>免積分</div>
                    : "comingSoon" in p
                    ? <div style={{ fontFamily: F.mono, fontSize: 14, fontWeight: 700, color: C.textMuted }}>? pts</div>
                    : <div style={{ fontFamily: F.mono, fontSize: 14, fontWeight: 700, color: p.locked ? C.textMuted : C.goldLight }}>{p.price.toLocaleString()} pts</div>
                  }
                </div>
                {"href" in p ? (
                  <a
                    href={(p as typeof p & { href: string }).href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: 11,
                      color: C.gold,
                      background: "rgba(201,168,76,0.08)",
                      border: `0.5px solid ${C.borderMid}`,
                      padding: "6px 14px",
                      borderRadius: 6,
                      fontFamily: F.body,
                      textDecoration: "none",
                      transition: "all 0.2s",
                    }}
                  >
                    立即前往
                  </a>
                ) : "comingSoon" in p ? (
                  <button
                    disabled
                    style={{
                      fontSize: 11,
                      color: C.textMuted,
                      background: "rgba(201,168,76,0.08)",
                      border: `0.5px solid ${C.borderMid}`,
                      padding: "6px 14px",
                      borderRadius: 6,
                      cursor: "not-allowed",
                      opacity: 0.4,
                      fontFamily: F.body,
                    }}
                  >
                    不能兌換
                  </button>
                ) : (
                  <button
                    disabled={p.locked || userPoints < p.price}
                    onClick={() => !p.locked && setRedeemed(p.id)}
                    style={{
                      fontSize: 11,
                      color: p.locked ? C.textMuted : userPoints < p.price ? C.textMuted : C.gold,
                      background: "rgba(201,168,76,0.08)",
                      border: `0.5px solid ${C.borderMid}`,
                      padding: "6px 14px",
                      borderRadius: 6,
                      cursor: p.locked || userPoints < p.price ? "not-allowed" : "pointer",
                      opacity: p.locked || userPoints < p.price ? 0.4 : 1,
                      fontFamily: F.body,
                      transition: "all 0.2s",
                    }}
                  >
                    {p.locked ? "已鎖定" : userPoints < p.price ? "積分不足" : "立即兌換"}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 兌換確認 Modal */}
      {redeemed !== null && (() => {
        const p = resolvedProducts.find((x) => x.id === redeemed)!;
        return (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200 }}>
            <div style={{ background: "#141418", border: `0.5px solid ${C.borderMid}`, borderRadius: 16, padding: 32, width: 400, position: "relative" }}>
              <div style={{ fontFamily: F.display, fontSize: 22, fontWeight: 400, color: C.textPrimary, marginBottom: 8 }}>確認兌換</div>
              <div style={{ fontSize: 13, color: C.textMuted, fontFamily: F.body, marginBottom: 24 }}>請確認以下兌換資訊</div>
              <div style={{ background: "rgba(255,255,255,0.02)", border: `0.5px solid ${C.borderSubtle}`, borderRadius: 8, padding: 16, marginBottom: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: C.textMuted, fontFamily: F.body }}>商品</span>
                  <span style={{ fontSize: 13, color: C.textPrimary, fontFamily: F.body }}>{p.name}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: C.textMuted, fontFamily: F.body }}>消耗積分</span>
                  <span style={{ fontSize: 13, fontFamily: F.mono, fontWeight: 700, color: C.gold }}>-{p.price.toLocaleString()} pts</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 12, color: C.textMuted, fontFamily: F.body }}>兌換後餘額</span>
                  <span style={{ fontSize: 13, fontFamily: F.mono, color: C.goldLight }}>{(userPoints - p.price).toFixed(2)} point</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <button onClick={() => setRedeemed(null)} style={{ flex: 1, padding: "11px 0", borderRadius: 8, background: "transparent", border: `0.5px solid ${C.borderMid}`, color: C.textSecondary, fontSize: 13, cursor: "pointer", fontFamily: F.body }}>取消</button>
                <button onClick={() => setRedeemed(null)} style={{ flex: 1, padding: "11px 0", borderRadius: 8, background: `linear-gradient(135deg, ${C.goldDim}, #5a4520)`, border: `0.5px solid ${C.gold}`, color: C.goldLight, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: F.body }}>確認兌換</button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

// 我的訂單
function MyOrders() {
  return (
    <div style={{ background: C.bgCard, border: `0.5px solid ${C.borderSubtle}`, borderRadius: 16, padding: 28 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div style={{ fontFamily: F.display, fontSize: 20, fontWeight: 500, color: C.textPrimary, letterSpacing: 0.5 }}>我的訂單</div>
        <span style={{ fontSize: 11, color: C.textMuted, fontFamily: F.mono }}>共 {orders.length} 筆</span>
      </div>
      {orders.length === 0 && (
        <div style={{ padding: "32px 0", textAlign: "center", fontSize: 13, color: C.textMuted, fontFamily: F.body }}>尚無兌換紀錄</div>
      )}

      {/* 表頭 */}
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 2fr 1fr 1fr", gap: 16, padding: "0 0 12px", borderBottom: `0.5px solid ${C.borderSubtle}`, marginBottom: 4 }}>
        {["訂單編號", "日期", "商品", "消耗積分", "狀態"].map((h) => (
          <div key={h} style={{ fontSize: 10, color: C.textMuted, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: F.body }}>{h}</div>
        ))}
      </div>

      {orders.map((o, i) => (
        <div key={o.id} style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 2fr 1fr 1fr", gap: 16, padding: "16px 0", borderBottom: i < orders.length - 1 ? `0.5px solid ${C.borderSubtle}` : "none", alignItems: "center" }}>
          <span style={{ fontFamily: F.mono, fontSize: 11, color: C.textMuted }}>{o.id}</span>
          <span style={{ fontFamily: F.mono, fontSize: 11, color: C.textMuted }}>{o.date}</span>
          <span style={{ fontSize: 13, color: C.textPrimary, fontFamily: F.body }}>{o.item}</span>
          <div>
            <span style={{ fontFamily: F.mono, fontSize: 13, fontWeight: 700, color: C.gold }}>-{o.points.toLocaleString()}</span>
            <span style={{ fontSize: 10, color: C.textMuted, marginLeft: 4, fontFamily: F.body }}>pts</span>
          </div>
          <StatusBadge status={o.status} />
        </div>
      ))}
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// 頁面主元件
// ════════════════════════════════════════════════════════════
export default function MarketplacePage() {
  const [member, setMember] = useState<Member | null>(null);

  useEffect(() => {
    const uid = localStorage.getItem(UID_KEY);
    if (!uid) return;
    const found = members.find((m) => m.uid === uid);
    if (found) setMember(found);
  }, []);

  return (
    <Layout activePath="/marketplace" title="會員商城">
      <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 32, maxWidth: 1200 }}>
        {!member && (
          <div style={{ padding: "16px 20px", background: "rgba(201,168,76,0.04)", border: "0.5px solid rgba(201,168,76,0.12)", borderRadius: 10, fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 13, color: "#4a4740" }}>
            ← 請先前往 <a href="/member" style={{ color: "#C9A84C", textDecoration: "none" }}>Member Access</a> 頁面輸入 UID 查詢會員資料
          </div>
        )}
        <div>
          <SectionLabel>積分概況{member ? ` · ${member.name}` : ""}</SectionLabel>
          <PointsBanner member={member} />
        </div>
        <div>
          <SectionLabel>商品列表</SectionLabel>
          <ProductGrid member={member} />
        </div>
        <div>
          <SectionLabel>我的訂單</SectionLabel>
          <MyOrders />
        </div>
        <div style={{ height: 8 }} />
      </div>
    </Layout>
  );
}