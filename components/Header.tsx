"use client";

const C = {
  gold: "#C9A84C", goldLight: "#E8C96A", goldDim: "#7a6130",
  borderSubtle: "rgba(201,168,76,0.12)", borderMid: "rgba(201,168,76,0.25)",
  textPrimary: "#f0ece0", textSecondary: "#8a8578", textMuted: "#4a4740",
};

const F = {
  display: "'Cormorant Garamond', Georgia, serif",
  body: "'DM Sans', system-ui, sans-serif",
  mono: "'Space Mono', monospace",
};

interface HeaderProps {
  title: string;
  onMenuClick?: () => void;
}

export default function Header({ title, onMenuClick }: HeaderProps) {
  return (
    <header
      style={{
        height: 64,
        borderBottom: `0.5px solid ${C.borderSubtle}`,
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        gap: 10,
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(10,10,11,0.95)",
        backdropFilter: "blur(20px)",
        flexShrink: 0,
      }}
    >
      {/* 漢堡按鈕 — 只在手機傳入 onMenuClick 時顯示 */}
      {onMenuClick && (
        <button
          onClick={onMenuClick}
          style={{
            background: "transparent",
            border: `0.5px solid ${C.borderSubtle}`,
            borderRadius: 8,
            width: 36, height: 36,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
            color: C.textSecondary,
            fontSize: 18,
            flexShrink: 0,
          }}
        >
          ☰
        </button>
      )}

      {/* 頁面標題 */}
      <div style={{ fontFamily: F.display, fontSize: 20, fontWeight: 400, color: C.textPrimary, letterSpacing: 0.5, whiteSpace: "nowrap" }}>
        {title}
      </div>

      {/* 搜尋欄 — 手機隱藏 */}
      <div className="header-search" style={{ flex: 1, maxWidth: 360, position: "relative", marginLeft: 12 }}>
        <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: C.textMuted }}>⌕</span>
        <input
          type="text"
          placeholder="搜尋..."
          style={{
            width: "100%",
            background: "rgba(255,255,255,0.03)",
            border: `0.5px solid ${C.borderSubtle}`,
            borderRadius: 8,
            padding: "8px 12px 8px 34px",
            color: C.textPrimary,
            fontSize: 13,
            fontFamily: F.body,
            outline: "none",
          }}
        />
      </div>

      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
        {/* 通知 */}
        <div style={{
          width: 36, height: 36,
          borderRadius: 8,
          border: `0.5px solid ${C.borderSubtle}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", fontSize: 16,
          position: "relative", color: C.textSecondary,
          flexShrink: 0,
        }}>
          🔔
          <div style={{ position: "absolute", top: 7, right: 7, width: 6, height: 6, background: C.gold, borderRadius: "50%", border: "1.5px solid #0a0a0b" }} />
        </div>

        {/* 使用者 */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "6px 10px",
          borderRadius: 8,
          border: `0.5px solid ${C.borderSubtle}`,
          cursor: "pointer",
          flexShrink: 0,
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: "50%",
            background: "linear-gradient(135deg, #3a2f15, #7a6130)",
            border: "1.5px solid #7a6130",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, color: C.goldLight, fontFamily: F.display,
          }}>CL</div>
          <span className="wallet-addr" style={{ fontFamily: F.mono, fontSize: 11, color: C.textSecondary }}>0x7f4a...3d8c</span>
        </div>
      </div>
    </header>
  );
}
