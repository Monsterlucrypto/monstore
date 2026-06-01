// ════════════════════════════════════════════════════════════
// data/members.ts
// 每週更新一次這個檔案即可
// 所有頁面都從這裡讀取資料
// ════════════════════════════════════════════════════════════

export type FounderPassTier = "Lu" | "M" | "O" | "N" | null;

export type Member = {
  uid: string;
  name: string;
  vip: "Diamond" | "Gold" | "Silver" | "Normal";
  tradingVolume: number;        // 交易量（數字，方便排序）
  tradingVolumeDisplay: string; // 顯示用字串
  points: string;               // 積分（等於 Commissions USDT）
  commissions: number;          // 返佣 USDT
  memberSince: string;
  treasuryParticipation: "Active" | "Pending";
  founderPass: FounderPassTier; // null = 無 Pass
  tradingRank: number;          // 自動計算，不用手動填
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
// ★ 每週只需更新這裡 ★
// VIP 等級門檻：Normal 50K–300K / Silver 300K–1M / Gold 1M–5M / Diamond 5M+
// founderPass: null = 無 Pass，"Lu" / "M" / "O" / "N" = 對應等級
// tradingRank 不用填，系統自動計算
// ════════════════════════════════════════════════════════════
const rawMembers = [

{
  uid: "222",
  name: "測試用",
  vip: "Normal" as const,
  tradingVolume: 222 ,
  tradingVolumeDisplay: "$222",
  points: "0.022",
  commissions: 0.022,
  memberSince: "2026.02.22",
  treasuryParticipation: "Active" as const,
  founderPass: "N" as FounderPassTier,
},

 {
  uid: "565008268",
  name: "老豆",
  vip: "Normal" as const,
  tradingVolume: 21966.66,
  tradingVolumeDisplay: "$21,966",
  points: "3.67",
  commissions: 3.67,
  memberSince: "2026.05.24",
  treasuryParticipation: "Active" as const,
  founderPass: null as FounderPassTier,
},
{
  uid: "549110911",
  name: "利寶寶",
  vip: "Silver" as const,
  tradingVolume: 413519.82,
  tradingVolumeDisplay: "$413,519",
  points: "71.46",
  commissions: 71.46,
  memberSince: "2026.02.27",
  treasuryParticipation: "Active" as const,
  founderPass: null as FounderPassTier,
},
{
  uid: "549046149",
  name: "海倫",
  vip: "Normal" as const,
  tradingVolume: 5500.42,
  tradingVolumeDisplay: "$5,500",
  points: "0.95",
  commissions: 0.95,
  memberSince: "2026.02.27",
  treasuryParticipation: "Active" as const,
  founderPass: null as FounderPassTier,
},
{
  uid: "549044824",
  name: "Banglin",
  vip: "Normal" as const,
  tradingVolume: 62094.26,
  tradingVolumeDisplay: "$62,094",
  points: "10.33",
  commissions: 10.33,
  memberSince: "2026.02.27",
  treasuryParticipation: "Active" as const,
  founderPass: null as FounderPassTier,
},
{
  uid: "549044820",
  name: "Shanghungx",
  vip: "Normal" as const,
  tradingVolume: 5463.72,
  tradingVolumeDisplay: "$5,463",
  points: "0.94",
  commissions: 0.94,
  memberSince: "2026.02.27",
  treasuryParticipation: "Active" as const,
  founderPass: null as FounderPassTier,
},
{
  uid: "546872407",
  name: "Alice",
  vip: "Normal" as const,
  tradingVolume: 0,
  tradingVolumeDisplay: "$0",
  points: "0",
  commissions: 0,
  memberSince: "2026.02.15",
  treasuryParticipation: "Pending" as const,
  founderPass: null as FounderPassTier,
},
{
  uid: "546187833",
  name: "Ann",
  vip: "Normal" as const,
  tradingVolume: 5946.41,
  tradingVolumeDisplay: "$5,946",
  points: "1.01",
  commissions: 1.01,
  memberSince: "2026.02.11",
  treasuryParticipation: "Active" as const,
  founderPass: "Lu" as FounderPassTier,
},
{
  uid: "546120888",
  name: "修",
  vip: "Normal" as const,
  tradingVolume: 0,
  tradingVolumeDisplay: "$0",
  points: "0",
  commissions: 0,
  memberSince: "2026.02.11",
  treasuryParticipation: "Pending" as const,
  founderPass: null as FounderPassTier,
},
{
  uid: "545954666",
  name: "星辰",
  vip: "Normal" as const,
  tradingVolume: 4911.33,
  tradingVolumeDisplay: "$4,911",
  points: "0.83",
  commissions: 0.83,
  memberSince: "2026.02.10",
  treasuryParticipation: "Active" as const,
  founderPass: null as FounderPassTier,
},
{
  uid: "551559896",
  name: "張宜",
  vip: "Normal" as const,
  tradingVolume: 0,
  tradingVolumeDisplay: "$0",
  points: "0",
  commissions: 0,
  memberSince: "2026.03.11",
  treasuryParticipation: "Pending" as const,
  founderPass: null as FounderPassTier,
},
{
  uid: "565720494",
  name: "—",
  vip: "Normal" as const,
  tradingVolume: 0,
  tradingVolumeDisplay: "$0",
  points: "0",
  commissions: 0,
  memberSince: "2026.05.28",
  treasuryParticipation: "Pending" as const,
  founderPass: null as FounderPassTier,
},
{
  uid: "565630312",
  name: "—",
  vip: "Normal" as const,
  tradingVolume: 0,
  tradingVolumeDisplay: "$0",
  points: "0",
  commissions: 0,
  memberSince: "2026.05.27",
  treasuryParticipation: "Pending" as const,
  founderPass: null as FounderPassTier,
},
{
  uid: "566012493",
  name: "—",
  vip: "Normal" as const,
  tradingVolume: 0,
  tradingVolumeDisplay: "$0",
  points: "0",
  commissions: 0,
  memberSince: "2026.05.29",
  treasuryParticipation: "Pending" as const,
  founderPass: null as FounderPassTier,
},
{
  uid: "566012108",
  name: "—",
  vip: "Normal" as const,
  tradingVolume: 0,
  tradingVolumeDisplay: "$0",
  points: "0",
  commissions: 0,
  memberSince: "2026.05.29",
  treasuryParticipation: "Pending" as const,
  founderPass: null as FounderPassTier,
},
{
  uid: "31260502",
  name: "MonsterLu",
  vip: "Normal" as const,
  tradingVolume: 3000,
  tradingVolumeDisplay: "$3,000",
  points: "1",
  commissions: 1,
  memberSince: "2026.04.07",
  treasuryParticipation: "Active" as const,
  founderPass: "Lu" as FounderPassTier,
},
];

// ════════════════════════════════════════════════════════════
// 自動計算 tradingRank（交易量由大到小排名，同量同名）
// ════════════════════════════════════════════════════════════
const sorted = [...rawMembers].sort((a, b) => b.tradingVolume - a.tradingVolume);

export const members: Member[] = rawMembers.map((m) => ({
  ...m,
  tradingRank: sorted.findIndex((s) => s.uid === m.uid) + 1,
}));

// ════════════════════════════════════════════════════════════
// 排行榜（前 10）
// ════════════════════════════════════════════════════════════
export const leaderboard = [...members]
  .sort((a, b) => b.tradingVolume - a.tradingVolume)
  .slice(0, 10)
  .map((m, i) => ({ ...m, rank: i + 1 }));

// 總交易量
export const totalVolume = members.reduce((s, m) => s + m.tradingVolume, 0);