"use client";
import Layout from "@/components/Layout";
import { useState } from "react";

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

const userPoints = 12480;

type FilterType = "全部" | "Gold+" | "Founder Only";

const products = [
  { id: 1, name: "Founder 帽T",       desc: "限量重磅刺繡 Logo 連帽衫，黑金配色",      price: 2400,  value: "$96",  tag: "Gold+",        icon: "🧥", locked: false, stock: 48  },
  { id: 2, name: "限量鍵盤",           desc: "Keychron 聯名款，金色專屬鍵帽，65% 配列", price: 5800,  value: "$232", tag: "Gold+",        icon: "⌨️", locked: false, stock: 12  },
  { id: 3, name: "黃銅桌墊",           desc: "極厚皮革桌墊，燙金 Logo，限量 200 件",    price: 3200,  value: "$128", tag: "Gold+",        icon: "🟫", locked: false, stock: 67  },
  { id: 4, name: "精緻徽章組",         desc: "三件組金屬琺瑯徽章，收藏級工藝",          price: 800,   value: "$32",  tag: "Gold+",        icon: "🏅", locked: false, stock: 200 },
  { id: 5, name: "VIP 黑卡",           desc: "金屬質感實體會員卡，附禮賓服務資格",      price: 12000, value: "$480", tag: "Founder Only", icon: "🃏", locked: true,  stock: 50  },
  { id: 6, name: "私人活動邀請券",      desc: "線下 VIP 晚宴入場資格，含伴侶票",        price: 8000,  value: "$320", tag: "Founder Only", icon: "🎫", locked: true,  stock: 20  },
  { id: 7, name: "Founder 帽子",       desc: "羊毛混紡六片帽，刺繡金色 Logo",           price: 1600,  value: "$64",  tag: "Gold+",        icon: "🧢", locked: false, stock: 89  },
  { id: 8, name: "限量香氛蠟燭",       desc: "聯名調香師製作，檀香木質調，附禮盒",      price: 2000,  value: "$80",  tag: "Gold+",        icon: "🕯️", locked: false, stock: 35  },
  { id: 9, name: "專屬桌曆",           desc: "2025 限量精裝桌曆，燙金封面",             price: 600,   value: "$24",  tag: "Gold+",        icon: "📅", locked: false, stock: 150 },
];

const orders = [
  { id: "ORD-2024-008", date: "2024.12.15", item: "Founder 帽T",   points: 2400, status: "已完成" },
  { id: "ORD-2024-005", date: "2024.11.02", item: "限量鍵盤",       points: 5800, status: "審核通過" },
  { id: "ORD-2024-003", date: "2024.09.28", item: "精緻徽章組",     points: 800,  status: "審核中" },
];

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
function PointsBanner() {
  return (
    <div style={{ background: "linear-gradient(135deg, #1a1508 0%, #0e0e12 60%, #0a0a0b 100%)", border: `0.5px solid ${C.borderMid}`, borderRadius: 16, padding: "20px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -30, right: -30, width: 160, height: 160, background: "radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div>
          <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4, fontFamily: F.body }}>可用積分</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontFamily: F.mono, fontSize: 32, fontWeight: 700, color: C.goldLight, lineHeight: 1 }}>{userPoints.toLocaleString()}</span>
            <span style={{ fontSize: 13, color: C.textMuted, fontFamily: F.body }}>pts</span>
          </div>
        </div>
        <div style={{ width: "0.5px", height: 40, background: C.borderMid }} />
        <div>
          <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4, fontFamily: F.body }}>折合美金</div>
          <div style={{ fontFamily: F.mono, fontSize: 20, fontWeight: 700, color: "#5ea96e" }}>${(userPoints * 0.0666).toFixed(2)}</div>
        </div>
      </div>
      <div style={{ fontSize: 12, color: C.textMuted, fontFamily: F.body, textAlign: "right" }}>
        <div>Gold 會員享 <span style={{ color: C.gold }}>30% 折扣</span></div>
      </div>
    </div>
  );
}

// 商品列表
function ProductGrid() {
  const [filter, setFilter] = useState<FilterType>("全部");
  const [hov, setHov] = useState<number | null>(null);
  const [redeemed, setRedeemed] = useState<number | null>(null);

  const filters: FilterType[] = ["全部", "Gold+", "Founder Only"];

  const filtered = products.filter((p) => {
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
            <div style={{ height: 140, background: p.locked ? "linear-gradient(135deg, #141209, #1a1810)" : "linear-gradient(135deg, #111116, #1a1a22)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 52, borderBottom: `0.5px solid ${C.borderSubtle}`, position: "relative" }}>
              <span style={{ opacity: p.locked ? 0.4 : 1 }}>{p.icon}</span>
              {/* 標籤 */}
              <div style={{ position: "absolute", top: 10, left: 10, background: "rgba(201,168,76,0.15)", border: `0.5px solid ${C.borderMid}`, color: C.gold, fontSize: 9, letterSpacing: 1.5, padding: "3px 8px", borderRadius: 4, textTransform: "uppercase" }}>
                {p.tag}
              </div>
              {/* 庫存 */}
              <div style={{ position: "absolute", top: 10, right: 10, fontSize: 10, color: C.textMuted, fontFamily: F.mono }}>
                剩 {p.stock}
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
                  <div style={{ fontFamily: F.mono, fontSize: 14, fontWeight: 700, color: p.locked ? C.textMuted : C.goldLight }}>{p.price.toLocaleString()} pts</div>
                  <div style={{ fontSize: 10, color: C.textMuted, fontFamily: F.body }}>市值 {p.value} · Gold 享 30% off</div>
                </div>
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
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 兌換確認 Modal */}
      {redeemed !== null && (() => {
        const p = products.find((x) => x.id === redeemed)!;
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
                  <span style={{ fontSize: 13, fontFamily: F.mono, color: C.goldLight }}>{(userPoints - p.price).toLocaleString()} pts</span>
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
  return (
    <Layout activePath="/marketplace" title="會員商城">
      <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 32, maxWidth: 1200 }}>
        <div>
          <SectionLabel>積分概況</SectionLabel>
          <PointsBanner />
        </div>
        <div>
          <SectionLabel>商品列表</SectionLabel>
          <ProductGrid />
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