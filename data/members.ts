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
// Founder Pass 對應 Units & 價格
// ════════════════════════════════════════════════════════════
export const FOUNDER_CONFIG: Record<string, { units: number; price: number }> = {
  Lu: { units: 1290, price: 5000 },
  M:  { units: 240,  price: 1000 },
  O:  { units: 70,   price: 300  },
  N:  { units: 20,   price: 100  },
};

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
  uid: "576738861",
  name: "T stan",
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
  tradingVolume: 1839.35036,
  tradingVolumeLastMonth: 0,
  tradingVolumeDisplay: "$1,839",
  commissions: 0.37855,
  memberSince: "2026.07.19",
  treasuryParticipation: "Active" as const,
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
  tradingVolume: 167735.24918,
  tradingVolumeLastMonth: 0,
  tradingVolumeDisplay: "$167,735",
  commissions: 27.75337341,
  memberSince: "2026.07.16",
  treasuryParticipation: "Active" as const,
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
  tradingVolume: 13083.807955,
  tradingVolumeLastMonth: 0,
  tradingVolumeDisplay: "$13,083",
  commissions: 2.25413124,
  memberSince: "2026.07.03",
  treasuryParticipation: "Active" as const,
  founderPass: null as FounderPassTier,
},
{
  uid: "222",
  name: "Test222",
  tradingVolume: 0,
  tradingVolumeLastMonth: 222,
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
  tradingVolume: 1010.7544,
  tradingVolumeLastMonth: 2649.3131,
  tradingVolumeDisplay: "$1,010",
  commissions: 0.14447711,
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
  tradingVolume: 61338.151,
  tradingVolumeLastMonth: 124325.4358,
  tradingVolumeDisplay: "$61,338",
  commissions: 12.59308851,
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
  tradingVolume: 857874.11853,
  tradingVolumeLastMonth: 2313787.980605,
  tradingVolumeDisplay: "$857,874",
  commissions: 139.37573364,
  memberSince: "2026.02.27",
  treasuryParticipation: "Active" as const,
  founderPass: null as FounderPassTier,
},
{
  uid: "549046149",
  name: "海倫",
  tradingVolume: 5368.98966,
  tradingVolumeLastMonth: 31.26471,
  tradingVolumeDisplay: "$5,368",
  commissions: 0.9514356,
  memberSince: "2026.02.27",
  treasuryParticipation: "Active" as const,
  founderPass: null as FounderPassTier,
},
{
  uid: "549044824",
  name: "Banglin",
  tradingVolume: 13957.04457,
  tradingVolumeLastMonth: 14253.4622164,
  tradingVolumeDisplay: "$13,957",
  commissions: 2.42337892,
  memberSince: "2026.02.27",
  treasuryParticipation: "Active" as const,
  founderPass: null as FounderPassTier,
},
{
  uid: "549044820",
  name: "Shanghungx",
  tradingVolume: 3925.73342,
  tradingVolumeLastMonth: 0,
  tradingVolumeDisplay: "$3,925",
  commissions: 0.67797806,
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
  commissions: 0.000305,
  memberSince: "2026.02.11",
  treasuryParticipation: "Pending" as const,
  founderPass: null as FounderPassTier,
},
{
  uid: "545954666",
  name: "星辰",
  tradingVolume: 3342.0584,
  tradingVolumeLastMonth: 0,
  tradingVolumeDisplay: "$3,342",
  commissions: 0.56508693,
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
