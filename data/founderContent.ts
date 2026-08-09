// ════════════════════════════════════════════════════════════
// data/founderContent.ts
// Founder Pass 頁面文案（條款、創始禮、回饋試算設定）
// 文字集中放這裡，要改文案只動這個檔
// ════════════════════════════════════════════════════════════

import { REWARD_POOL_RATE, CAP_MULTIPLE_FOUNDING, CAP_MULTIPLE_STANDARD } from "./members";

// ─── 級距卡片下方註記 ───────────────────────────────────────
export const CAP_NOTE = "各批次上限倍數於發售時公告，發售後不追溯調整。";

// ─── 回饋試算 ───────────────────────────────────────────────
// 以 N 級距為基準，數值一律由公式計算，不寫死
export const SCENARIO_TIER = "N";
export const SCENARIO_REVENUES: { revenue: number; label?: string }[] = [
  { revenue: 167, label: "目前" },
  { revenue: 500 },
  { revenue: 1500 },
  { revenue: 5000 },
];
export const SCENARIO_CIRCULATING_UNITS: { units: number; label?: string }[] = [
  { units: 20, label: "你獨得" },
  { units: 200 },
  { units: 1000 },
];

export const SCENARIO_NOTE =
  "上表為試算，非承諾。實際回饋金額依當期平台實際營收與流通中總 units 計算。流通 units 增加時，單張回饋比例下降；平台會員規模擴大時，營收亦隨之成長，兩者互為連動。";

// ─── 創始成員禮 ─────────────────────────────────────────────
export const GIFT_INTRO =
  "創始批成員限定，採用金屬轉印貼工藝、印製 Monstore 標誌的實體紀念品。";

export const GIFT_ITEMS: { icon: string; name: string; desc: string }[] = [
  { icon: "◍", name: "杯套", desc: "金屬轉印貼 · Monstore 標誌" },
  { icon: "▤", name: "卡片夾", desc: "金屬轉印貼 · Monstore 標誌" },
  { icon: "▭", name: "名片", desc: "金屬轉印貼 · Monstore 標誌" },
];

export const GIFT_NOTE =
  "創始批限定。實體禮品項與寄送方式將另行通知，數量有限、贈完為止。";

// ─── 回饋發放 ───────────────────────────────────────────────
export const PAYOUT_DAY = 1;          // 每月發放日
export const PAYOUT_CUTOFF_DAY = 10;  // 當月生效的購買截止日

// ─── Founder Pass 條款 ──────────────────────────────────────
export const FOUNDER_TERMS: { title: string; body: string }[] = [
  {
    title: "回饋機制",
    body: `平台營收之 ${REWARD_POOL_RATE * 100}% 進入回饋池，由 Founder Pass 持有者依其 Reward Units 佔流通中總 units 之比例分配。`,
  },
  {
    title: "回饋發放",
    body: `Founder Pass 會員專屬回饋於每月 ${PAYOUT_DAY} 號統一發放至持有者的 UID 帳戶。當月 ${PAYOUT_CUTOFF_DAY} 號（含）以前購買者，自次月 ${PAYOUT_DAY} 號起首次發放；${PAYOUT_CUTOFF_DAY} 號以後購買者，併入下一個月起算。例：8/9 購買於 9/${PAYOUT_DAY} 發放，8/11 購買於 10/${PAYOUT_DAY} 發放。`,
  },
  {
    title: "回饋上限",
    body: `每張 Founder Pass 之累計現金回饋，以其購買價之對應倍數為上限（創始批 ${CAP_MULTIPLE_FOUNDING} 倍，後續批次 ${CAP_MULTIPLE_STANDARD} 倍）。達上限後，現金回饋停止，其餘會員權益終身有效。各批次倍數於發售時公告，發售後不追溯調整。`,
  },
  {
    title: "轉讓",
    body: "Founder Pass 目前暫不開放轉讓，未來將視營運情況調整，調整前另行公告。",
  },
  {
    title: "其他",
    body: "Founder Pass 為平台會員資格與營收回饋方案，非投資商品，不保證任何金額之回饋。平台保留調整未發售批次條件之權利。",
  },
];
