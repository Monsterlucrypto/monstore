// ════════════════════════════════════════════════════════════
// data/members.ts
// 每週更新一次這個檔案即可
// 所有頁面都從這裡讀取資料
// ════════════════════════════════════════════════════════════

export type FounderPassTier = "Lu" | "M" | "O" | "N" | null;

export type Member = {
  uid: string;
  name: string;
  vip: "Diamond" | "Gold" | "Silver" | "Normal"; // 自動計算，不用手動填
  tradingVolume: number;         // 本月交易量（leaderboard 用）
  tradingVolumeLastMonth: number;// 上月交易量（VIP 對比用）
  tradingVolumeDisplay: string;  // 顯示用字串（本月）
  commissions: number;           // 本月手續費 USDT
  points: string;                // 積分（= 手續費 × 0.2，自動計算）
  memberSince: string;
  treasuryParticipation: "Active" | "Pending";
  founderPass: FounderPassTier;  // null = 無 Pass
  tradingRank: number;           // 自動計算，不用手動填
};

// ════════════════════════════════════════════════════════════
// Founder Pass 全域參數
// ════════════════════════════════════════════════════════════
export const REWARD_POOL_RATE = 0.2;        // 營收進入回饋池的比例
export const CAP_MULTIPLE_FOUNDING = 5;     // 創始批 · 終身回饋上限倍數
export const CAP_MULTIPLE_STANDARD = 3;     // 後續批次 · 終身回饋上限倍數
export const FOUNDER_RELEASE_RATE = 0.1;    // 目前釋出比例（第一階段 10%）
export const FOUNDER_TOTAL_UNITS = 100_000; // 長期生態總上限

export type FounderBatch = "founding" | "standard";

export type FounderTierConfig = {
  tier: string;
  rewardUnits: number;
  price: number;
  totalQuota: number;
  onSale: number;
  locked: number;
  batch: FounderBatch;
  capMultiple: number;
};

// ════════════════════════════════════════════════════════════
// Founder Pass 各級距（onSale / locked / capMultiple 皆自動計算）
// ════════════════════════════════════════════════════════════
const FOUNDER_TIER_BASE: { tier: string; rewardUnits: number; price: number; totalQuota: number; batch: FounderBatch }[] = [
  { tier: "Lu", rewardUnits: 1290, price: 5000, totalQuota: 20,  batch: "founding" },
  { tier: "M",  rewardUnits: 240,  price: 1000, totalQuota: 180, batch: "founding" },
  { tier: "O",  rewardUnits: 70,   price: 300,  totalQuota: 300, batch: "founding" },
  { tier: "N",  rewardUnits: 20,   price: 100,  totalQuota: 500, batch: "founding" },
];

export const FOUNDER_TIERS: FounderTierConfig[] = FOUNDER_TIER_BASE.map((t) => {
  const onSale = Math.round(t.totalQuota * FOUNDER_RELEASE_RATE);
  return {
    ...t,
    onSale,
    locked: t.totalQuota - onSale,
    capMultiple: t.batch === "founding" ? CAP_MULTIPLE_FOUNDING : CAP_MULTIPLE_STANDARD,
  };
});

export const FOUNDER_CONFIG: Record<string, FounderTierConfig> = Object.fromEntries(
  FOUNDER_TIERS.map((t) => [t.tier, t])
);

// 單張 Pass 的終身現金回饋上限 = 購買價 × 批次倍數
export function capAmount(cfg: FounderTierConfig): number {
  return cfg.price * cfg.capMultiple;
}

// 每張每月回饋 = 平台月營收 × 回饋池比例 × (該級距 units ÷ 流通中總 units)
export function monthlyReward(revenue: number, units: number, circulatingUnits: number): number {
  if (circulatingUnits <= 0) return 0;
  return revenue * REWARD_POOL_RATE * (units / circulatingUnits);
}

// ════════════════════════════════════════════════════════════
// VIP 自動計算：取本月與上月較大值來決定等級
// Normal <300K / Silver 300K–1M / Gold 1M–5M / Diamond 5M+
// ════════════════════════════════════════════════════════════
function calcVip(thisMonth: number, lastMonth: number): Member["vip"] {
  const vol = Math.max(thisMonth, lastMonth);
  if (vol >= 5_000_000) return "Diamond";
  if (vol >= 1_000_000) return "Gold";
  if (vol >= 300_000)   return "Silver";
  return "Normal";
}

// ════════════════════════════════════════════════════════════
// ★ 每週只需更新這裡 ★
// tradingVolume        = 本月交易量
// tradingVolumeLastMonth = 上月交易量
// vip / tradingRank / points 不用填，系統自動計算
// founderPass: null = 無 Pass，"Lu" / "M" / "O" / "N" = 對應等級
// ════════════════════════════════════════════════════════════
type RawMember = Omit<Member, "vip" | "points" | "tradingRank">;
const rawMembers: RawMember[] = [

{
  uid: "582899120",
  name: "哇勒",
  tradingVolume: 35558.767168,
  tradingVolumeLastMonth: 0,
  tradingVolumeDisplay: "$35,558",
  commissions: 5.84304098,
  memberSince: "2026.08.21",
  treasuryParticipation: "Active" as const,
  founderPass: null as FounderPassTier,
},
{
  uid: "582884139",
  name: "—",
  tradingVolume: 0,
  tradingVolumeLastMonth: 0,
  tradingVolumeDisplay: "$0",
  commissions: 0,
  memberSince: "2026.08.21",
  treasuryParticipation: "Pending" as const,
  founderPass: null as FounderPassTier,
},

{
  uid: "582062890",
  name: "—",
  tradingVolume: 0,
  tradingVolumeLastMonth: 0,
  tradingVolumeDisplay: "$0",
  commissions: 0,
  memberSince: "2026.08.17",
  treasuryParticipation: "Pending" as const,
  founderPass: null as FounderPassTier,
},

{
  uid: "576738861",
  name: "stan",
  tradingVolume: 0,
  tradingVolumeLastMonth: 0,
  tradingVolumeDisplay: "$0",
  commissions: 0,
  memberSince: "2026.07.19",
  treasuryParticipation: "Pending" as const,
  founderPass: null as FounderPassTier,
},
{
  uid: "576687508",
  name: "張志宇",
  tradingVolume: 0,
  tradingVolumeLastMonth: 1839.35036,
  tradingVolumeDisplay: "$0",
  commissions: 0,
  memberSince: "2026.07.19",
  treasuryParticipation: "Pending" as const,
  founderPass: null as FounderPassTier,
},
{
  uid: "576354180",
  name: "—",
  tradingVolume: 0,
  tradingVolumeLastMonth: 0,
  tradingVolumeDisplay: "$0",
  commissions: 0,
  memberSince: "2026.07.17",
  treasuryParticipation: "Pending" as const,
  founderPass: null as FounderPassTier,
},
{
  uid: "576272755",
  name: "—",
  tradingVolume: 0,
  tradingVolumeLastMonth: 0,
  tradingVolumeDisplay: "$0",
  commissions: 0,
  memberSince: "2026.07.16",
  treasuryParticipation: "Pending" as const,
  founderPass: null as FounderPassTier,
},
{
  uid: "576234324",
  name: "IG林逸凱",
  tradingVolume: 0,
  tradingVolumeLastMonth: 167735.24918,
  tradingVolumeDisplay: "$0",
  commissions: 0,
  memberSince: "2026.07.16",
  treasuryParticipation: "Pending" as const,
  founderPass: null as FounderPassTier,
},
{
  uid: "576039187",
  name: "—",
  tradingVolume: 0,
  tradingVolumeLastMonth: 0,
  tradingVolumeDisplay: "$0",
  commissions: 0,
  memberSince: "2026.07.15",
  treasuryParticipation: "Pending" as const,
  founderPass: null as FounderPassTier,
},
{
  uid: "573606265",
  name: "p.h5.12",
  tradingVolume: 40626.581076,
  tradingVolumeLastMonth: 12014.966,
  tradingVolumeDisplay: "$40,626",
  commissions: 6.85562944,
  memberSince: "2026.07.03",
  treasuryParticipation: "Active" as const,
  founderPass: null as FounderPassTier,
},
{
  uid: "222",
  name: "Test222",
  tradingVolume: 0,
  tradingVolumeLastMonth: 0,
  tradingVolumeDisplay: "$0",
  commissions: 0,
  memberSince: "2026.02.22",
  treasuryParticipation: "Active" as const,
  founderPass: "N" as FounderPassTier,
},
{
  uid: "566012493",
  name: "—",
  tradingVolume: 0,
  tradingVolumeLastMonth: 0,
  tradingVolumeDisplay: "$0",
  commissions: 0,
  memberSince: "2026.05.29",
  treasuryParticipation: "Pending" as const,
  founderPass: null as FounderPassTier,
},
{
  uid: "566012108",
  name: "—",
  tradingVolume: 0,
  tradingVolumeLastMonth: 0,
  tradingVolumeDisplay: "$0",
  commissions: 0,
  memberSince: "2026.05.29",
  treasuryParticipation: "Pending" as const,
  founderPass: null as FounderPassTier,
},
{
  uid: "565720494",
  name: "林庭",
  tradingVolume: 38772.6448,
  tradingVolumeLastMonth: 1010.7544,
  tradingVolumeDisplay: "$38,772",
  commissions: 7.63776326,
  memberSince: "2026.05.28",
  treasuryParticipation: "Active" as const,
  founderPass: null as FounderPassTier,
},
{
  uid: "565630312",
  name: "—",
  tradingVolume: 0,
  tradingVolumeLastMonth: 0,
  tradingVolumeDisplay: "$0",
  commissions: 0,
  memberSince: "2026.05.27",
  treasuryParticipation: "Pending" as const,
  founderPass: null as FounderPassTier,
},
{
  uid: "565008268",
  name: "老豆",
  tradingVolume: 8577.2704,
  tradingVolumeLastMonth: 64267.9322,
  tradingVolumeDisplay: "$8,577",
  commissions: 1.81389463,
  memberSince: "2026.05.24",
  treasuryParticipation: "Active" as const,
  founderPass: null as FounderPassTier,
},
{
  uid: "551559896",
  name: "張宜",
  tradingVolume: 0,
  tradingVolumeLastMonth: 0,
  tradingVolumeDisplay: "$0",
  commissions: 0,
  memberSince: "2026.03.11",
  treasuryParticipation: "Pending" as const,
  founderPass: null as FounderPassTier,
},
{
  uid: "549110911",
  name: "利寶寶",
  tradingVolume: 432161.5686,
  tradingVolumeLastMonth: 857874.11853,
  tradingVolumeDisplay: "$432,161",
  commissions: 59.60780502,
  memberSince: "2026.02.27",
  treasuryParticipation: "Active" as const,
  founderPass: null as FounderPassTier,
},
{
  uid: "549046149",
  name: "海倫",
  tradingVolume: 37460.48269,
  tradingVolumeLastMonth: 6149.54211,
  tradingVolumeDisplay: "$37,460",
  commissions: 7.4199871,
  memberSince: "2026.02.27",
  treasuryParticipation: "Active" as const,
  founderPass: null as FounderPassTier,
},
{
  uid: "549044824",
  name: "Banglin",
  tradingVolume: 66144.05974,
  tradingVolumeLastMonth: 14896.17349,
  tradingVolumeDisplay: "$66,144",
  commissions: 13.08563153,
  memberSince: "2026.02.27",
  treasuryParticipation: "Active" as const,
  founderPass: null as FounderPassTier,
},
{
  uid: "549044820",
  name: "Shanghungx",
  tradingVolume: 30068.18699,
  tradingVolumeLastMonth: 4666.98692,
  tradingVolumeDisplay: "$30,068",
  commissions: 5.97094268,
  memberSince: "2026.02.27",
  treasuryParticipation: "Active" as const,
  founderPass: null as FounderPassTier,
},
{
  uid: "546872407",
  name: "Alice",
  tradingVolume: 0,
  tradingVolumeLastMonth: 0,
  tradingVolumeDisplay: "$0",
  commissions: 0,
  memberSince: "2026.02.15",
  treasuryParticipation: "Pending" as const,
  founderPass: null as FounderPassTier,
},
{
  uid: "546783969",
  name: "—",
  tradingVolume: 0,
  tradingVolumeLastMonth: 0,
  tradingVolumeDisplay: "$0",
  commissions: 0,
  memberSince: "2026.02.14",
  treasuryParticipation: "Pending" as const,
  founderPass: null as FounderPassTier,
},
{
  uid: "546187833",
  name: "Ann",
  tradingVolume: 0,
  tradingVolumeLastMonth: 0,
  tradingVolumeDisplay: "$0",
  commissions: 0,
  memberSince: "2026.02.11",
  treasuryParticipation: "Pending" as const,
  founderPass: "Lu" as FounderPassTier,
},
{
  uid: "546120888",
  name: "修",
  tradingVolume: 0,
  tradingVolumeLastMonth: 0,
  tradingVolumeDisplay: "$0",
  commissions: 0.0004,
  memberSince: "2026.02.11",
  treasuryParticipation: "Active" as const,
  founderPass: null as FounderPassTier,
},
{
  uid: "545954666",
  name: "星辰",
  tradingVolume: 25942.65142,
  tradingVolumeLastMonth: 4065.60632,
  tradingVolumeDisplay: "$25,942",
  commissions: 5.17398543,
  memberSince: "2026.02.10",
  treasuryParticipation: "Active" as const,
  founderPass: null as FounderPassTier,
},
{
  uid: "545118630",
  name: "—",
  tradingVolume: 0,
  tradingVolumeLastMonth: 0,
  tradingVolumeDisplay: "$0",
  commissions: 0,
  memberSince: "2026.02.06",
  treasuryParticipation: "Pending" as const,
  founderPass: null as FounderPassTier,
},

];

// ════════════════════════════════════════════════════════════
// 自動計算 vip / points / tradingRank
// ════════════════════════════════════════════════════════════
const sorted = [...rawMembers].sort((a, b) => b.tradingVolume - a.tradingVolume);

export const members: Member[] = rawMembers.map((m) => ({
  ...m,
  vip: calcVip(m.tradingVolume, m.tradingVolumeLastMonth),
  points: (m.commissions * 0.2).toFixed(4),
  tradingRank: sorted.findIndex((s) => s.uid === m.uid) + 1,
}));

// ════════════════════════════════════════════════════════════
// 排行榜（前 10，依本月交易量排序）
// ════════════════════════════════════════════════════════════
export const leaderboard = [...members]
  .filter((m) => m.tradingVolume > 0)
  .sort((a, b) => b.tradingVolume - a.tradingVolume)
  .slice(0, 10)
  .map((m, i) => ({ ...m, rank: i + 1 }));

// 總交易量（本月）
export const totalVolume = members.reduce((s, m) => s + m.tradingVolume, 0);
