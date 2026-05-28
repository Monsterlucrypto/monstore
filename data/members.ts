// ════════════════════════════════════════════════════════════
// data/members.ts
// 每週更新一次這個檔案即可
// 所有頁面都從這裡讀取資料
// ════════════════════════════════════════════════════════════

export type Member = {
  uid: string;
  name: string;
  vip: "Lu" | "M" | "O" | "N";
  tradingVolume: number;       // 交易量（數字，方便排序）
  tradingVolumeDisplay: string; // 顯示用字串
  points: string;              // 積分（等於 Commissions USDT）
  commissions: number;         // 返佣 USDT
  memberSince: string;
  treasuryParticipation: "Active" | "Pending";
  founderPass: boolean;
};

// ════════════════════════════════════════════════════════════
// ★ 每週只需更新這裡 ★
// ════════════════════════════════════════════════════════════
export const members: Member[] = [
  {
    uid: "549110911",
    name: "利寶寶",
    vip: "M",
    tradingVolume: 303505.97,
    tradingVolumeDisplay: "$303,505",
    points: "51.68",
    commissions: 51.68,
    memberSince: "2026.02.27",
    treasuryParticipation: "Active",
    founderPass: false,
  },
  {
    uid: "549044824",
    name: "Banglin",
    vip: "M",
    tradingVolume: 61364.64,
    tradingVolumeDisplay: "$61,364",
    points: "10.20",
    commissions: 10.20,
    memberSince: "2026.02.27",
    treasuryParticipation: "Active",
    founderPass: false,
  },
  {
    uid: "565008268",
    name: "郭科劼",
    vip: "N",
    tradingVolume: 21966.66,
    tradingVolumeDisplay: "$21,966",
    points: "3.67",
    commissions: 3.67,
    memberSince: "2026.05.24",
    treasuryParticipation: "Active",
    founderPass: false,
  },
  {
    uid: "546187833",
    name: "Ann",
    vip: "N",
    tradingVolume: 5946.41,
    tradingVolumeDisplay: "$5,946",
    points: "1.01",
    commissions: 1.01,
    memberSince: "2026.02.11",
    treasuryParticipation: "Active",
    founderPass: false,
  },
  {
    uid: "549046149",
    name: "海倫",
    vip: "N",
    tradingVolume: 5500.42,
    tradingVolumeDisplay: "$5,500",
    points: "0.95",
    commissions: 0.95,
    memberSince: "2026.02.27",
    treasuryParticipation: "Active",
    founderPass: false,
  },
  {
    uid: "549044820",
    name: "Shanghungx",
    vip: "N",
    tradingVolume: 5463.72,
    tradingVolumeDisplay: "$5,463",
    points: "0.94",
    commissions: 0.94,
    memberSince: "2026.02.27",
    treasuryParticipation: "Active",
    founderPass: false,
  },
  {
    uid: "545954666",
    name: "星宇",
    vip: "N",
    tradingVolume: 4911.33,
    tradingVolumeDisplay: "$4,911",
    points: "0.83",
    commissions: 0.83,
    memberSince: "2026.02.10",
    treasuryParticipation: "Active",
    founderPass: false,
  },
  {
    uid: "546872407",
    name: "Alice",
    vip: "N",
    tradingVolume: 0,
    tradingVolumeDisplay: "$0",
    points: "0",
    commissions: 0,
    memberSince: "2026.02.15",
    treasuryParticipation: "Pending",
    founderPass: false,
  },
  {
    uid: "546120888",
    name: "修",
    vip: "N",
    tradingVolume: 0,
    tradingVolumeDisplay: "$0",
    points: "0",
    commissions: 0,
    memberSince: "2026.02.11",
    treasuryParticipation: "Pending",
    founderPass: false,
  },
  {
    uid: "551559896",
    name: "張",
    vip: "N",
    tradingVolume: 0,
    tradingVolumeDisplay: "$0",
    points: "0",
    commissions: 0,
    memberSince: "2026.03.11",
    treasuryParticipation: "Pending",
    founderPass: false,
  },
  {
    uid: "565720494",
    name: "—",
    vip: "N",
    tradingVolume: 0,
    tradingVolumeDisplay: "$0",
    points: "0",
    commissions: 0,
    memberSince: "2026.05.28",
    treasuryParticipation: "Pending",
    founderPass: false,
  },
  {
    uid: "565630312",
    name: "—",
    vip: "N",
    tradingVolume: 0,
    tradingVolumeDisplay: "$0",
    points: "0",
    commissions: 0,
    memberSince: "2026.05.27",
    treasuryParticipation: "Pending",
    founderPass: false,
  },
  {
    uid: "546783969",
    name: "—",
    vip: "N",
    tradingVolume: 0,
    tradingVolumeDisplay: "$0",
    points: "0",
    commissions: 0,
    memberSince: "2026.02.14",
    treasuryParticipation: "Pending",
    founderPass: false,
  },
  {
    uid: "545118630",
    name: "—",
    vip: "N",
    tradingVolume: 0,
    tradingVolumeDisplay: "$0",
    points: "0",
    commissions: 0,
    memberSince: "2026.02.06",
    treasuryParticipation: "Pending",
    founderPass: false,
  },
];

// 依交易量排序（排行榜用）
export const leaderboard = [...members]
  .sort((a, b) => b.tradingVolume - a.tradingVolume)
  .slice(0, 10)
  .map((m, i) => ({ ...m, rank: i + 1 }));

// 總交易量
export const totalVolume = members.reduce((s, m) => s + m.tradingVolume, 0);