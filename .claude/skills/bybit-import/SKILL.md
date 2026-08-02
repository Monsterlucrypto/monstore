---
name: bybit-import
description: 把 Bybit 聯盟 CSV 匯入 data/members.ts。使用者貼上 Clients_0_All_*.csv 或 Commission_1_All_*.csv 並說「更新」「導入資料」「更新這個月」時使用。處理同月更新、跨月結轉、新會員新增。
---

# Bybit CSV → members.ts

`data/members.ts` 是全站唯一資料來源。只手動填 `rawMembers` 內的欄位；`vip` / `points` / `tradingRank` 由檔案底部自動計算，**絕不手填**。

## 兩種 CSV

| 檔名 | 內容 | 取值方式 |
|------|------|---------|
| `Clients_0_All_*.csv` | 每個 UID 一列的月結總表 | 直接讀 `TradingAmount`、`Commissions` |
| `Commission_1_All_*.csv` | 逐日逐幣種明細 | 需按 UID 加總：交易量 = Σ(`TakerVolume` + `MakerVolume`)、佣金 = Σ(`Commissions`) |

明細檔用 PowerShell 加總（勿手算）：

```powershell
function Aggregate($path) {
  $t = @{}
  foreach ($r in (Import-Csv $path)) {
    $uid = $r.UID.Trim()
    if (-not $t.ContainsKey($uid)) { $t[$uid] = @{vol=0.0; comm=0.0} }
    $t[$uid].vol  += [double]$r.TakerVolume + [double]$r.MakerVolume
    $t[$uid].comm += [double]$r.Commissions
  }
  $t
}
$a = Aggregate "路徑.csv"
$a.Keys | Sort-Object | ForEach-Object { "{0,-12} {1,18:F6} {2,14:F8}" -f $_, $a[$_].vol, $a[$_].comm }
```

## 判斷同月還是跨月

看 CSV 檔名的日期區間，跟 members.ts 現有的本月資料比對：

- **同月更新**（例如已有 7/1–7/22，新檔是 7/1–7/31）：只覆寫 `tradingVolume`、`tradingVolumeDisplay`、`commissions`。**`tradingVolumeLastMonth` 完全不動。**
- **跨月結轉**（新檔是下一個月）：先把每位會員現有的 `tradingVolume` 搬到 `tradingVolumeLastMonth`，再填入新月份數字。CSV 沒出現的會員（例如測試帳號 `222`）也要結轉，本月歸 0。
- 若使用者同時給兩份不同月份的 CSV：較新的月份 → 本月欄位，較舊的 → `tradingVolumeLastMonth`。

## 欄位對應

| members.ts | 來源 |
|-----------|------|
| `uid` | `UID` |
| `name` | `Remarks`，去掉前綴的 `T` 和多餘空白；空值填 `"—"` |
| `tradingVolume` | 本月交易量，保留完整小數 |
| `tradingVolumeDisplay` | `"$" + 整數部分加千分位`，例如 `857874.11853` → `"$857,874"` |
| `commissions` | 本月佣金，保留完整小數 |
| `memberSince` | `Joined BYBIT` 轉 `YYYY.MM.DD` |
| `treasuryParticipation` | 有交易量或佣金 → `"Active"`，否則 `"Pending"` |
| `founderPass` | **保留現有值**；新會員一律 `null as FounderPassTier` |

## 新會員

CSV 有但 members.ts 沒有的 UID 就是新會員，插到陣列最前面（依 `Joined BYBIT` 由新到舊排）。跨月結轉時新會員的 `tradingVolumeLastMonth` 為 0。

## 自動計算的邏輯（不用改，知道即可）

- **VIP**：`calcVip(thisMonth, lastMonth)` 取 `Math.max` 後分級 — Normal <300K / Silver 300K–1M / Gold 1M–5M / Diamond 5M+。這代表本月量掉了也不會馬上降級，會看上個月。
- **points**：`commissions × 0.2`
- **tradingRank**：依本月 `tradingVolume` 由大到小
- **leaderboard**：`filter(tradingVolume > 0)` → 依本月交易量排序 → 取前 10。交易量 0 的會員不進榜，避免出現空白名次。

## 收尾

改完回報一張表：哪些會員變動、本月交易量與佣金的前後值、新增了誰、VIP 有無升降。不要重述沒變的會員。
