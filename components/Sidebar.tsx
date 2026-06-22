"use client";
import { useState, useEffect } from "react";
import { members } from "@/data/members";

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

const navItems = [
  { label: "Dashboard",       icon: "⬡",  href: "/dashboard"        },
  { label: "Platform Status", icon: "◎",  href: "/platform-status"  },
  { label: "Leaderboard",     icon: "🏆", href: "/leaderboard"      },
  { label: "VIP Membership",  icon: "◈",  href: "/vip"              },
  { label: "Founder Pass",    icon: "◆",  href: "/founder"          },
  { label: "Marketplace",     icon: "◻",  href: "/marketplace"      },
];

interface SidebarProps {
  activePath: string;
  collapsed: boolean;
  onToggle: () => void;
  isMobile?: boolean;
}

export default function Sidebar({ activePath, collapsed, onToggle, isMobile = false }: SidebarProps) {
  const w = isMobile ? 260 : collapsed ? 64 : 240;

  const [uid, setUid] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const storedUid = localStorage.getItem("monstore_uid") ?? "";
    setUid(storedUid);
    const member = members.find((m) => m.uid === storedUid);
    setName(member?.name ?? storedUid);
  }, []);

  const initials = name ? name.slice(0, 2).toUpperCase() : "??";

  return (
    <aside
      style={{
        width: w,
        minHeight: "100vh",
        height: "100%",
        background: "rgba(14,14,18,0.99)",
        borderRight: `0.5px solid ${C.borderSubtle}`,
        display: "flex",
        flexDirection: "column",
        paddingBottom: 24,
        overflow: "hidden",
        transition: "width 0.25s ease",
      }}
    >
      {/* Logo + 按鈕 */}
      <div style={{
        padding: "18px 14px",
        borderBottom: `0.5px solid ${C.borderSubtle}`,
        display: "flex",
        alignItems: "center",
        gap: 10,
        justifyContent: collapsed && !isMobile ? "center" : "flex-start",
        minHeight: 64,
        flexShrink: 0,
      }}>
        {/* Logo 圖片 */}
       <div
  onClick={collapsed && !isMobile ? onToggle : undefined}
  style={{ width: 43, height: 43, borderRadius: 8, overflow: "hidden", background: "#000", border: `0.5px solid ${C.borderMid}`, flexShrink: 0, cursor: collapsed && !isMobile ? "pointer" : "default" }}
>
  <img src="/logo.png" alt="logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
</div>

        {/* 品牌名稱 */}
        {(!collapsed || isMobile) && (
          <a href="/" style={{ fontFamily: F.display, fontSize: 30, fontWeight: 500, color: C.textPrimary, letterSpacing: 1, whiteSpace: "nowrap", flex: 1, textDecoration: "none", cursor: "pointer" }}>
  Mon<span style={{ color: C.gold }}>store</span>
</a>
        )}

        {/* 按鈕：手機顯示 ✕，桌機顯示 ◀/▶ */}
       {(!collapsed || isMobile) && (
  <button
    onClick={onToggle}
    style={{
      background: "transparent",
      border: `0.5px solid ${C.borderSubtle}`,
      borderRadius: 6,
      width: 28, height: 28,
      display: "flex", alignItems: "center", justifyContent: "center",
      cursor: "pointer",
      color: C.textMuted,
      fontSize: isMobile ? 14 : 11,
      flexShrink: 0,
      marginLeft: "auto",
    }}
  >
    {isMobile ? "✕" : "◀"}
  </button>
)}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "14px 8px", display: "flex", flexDirection: "column", gap: 2, overflowY: "auto" }}>
        {navItems.map((item) => {
          const isActive = activePath === item.href;
          return (
            <a
              key={item.label}
              href={item.href}
              title={collapsed && !isMobile ? item.label : undefined}
              style={{
                display: "flex",
                alignItems: "center",
                gap: collapsed && !isMobile ? 0 : 10,
                padding: collapsed && !isMobile ? "10px 0" : "10px 12px",
                justifyContent: collapsed && !isMobile ? "center" : "flex-start",
                borderRadius: 8,
                textDecoration: "none",
                color: isActive ? C.goldLight : C.textSecondary,
                fontSize: 16,
                background: isActive ? "rgba(201,168,76,0.1)" : "transparent",
                border: `0.5px solid ${isActive ? C.borderMid : "transparent"}`,
                fontFamily: F.body,
                position: "relative",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              {isActive && (
                <span style={{ position: "absolute", left: -1, top: "20%", height: "60%", width: 2, background: C.gold, borderRadius: "0 2px 2px 0" }} />
              )}
              <span style={{ fontSize: 17, width: 22, textAlign: "center", flexShrink: 0 }}>{item.icon}</span>
              {(!collapsed || isMobile) && item.label}
            </a>
          );
        })}
      </nav>

      {/* 底部使用者 */}
      {(!collapsed || isMobile) && (
        <div style={{ padding: "14px 8px 0", borderTop: `0.5px solid ${C.borderSubtle}`, flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, border: `0.5px solid ${C.borderSubtle}` }}>
            <div style={{ width: 30, height: 30, borderRadius: 6, background: "linear-gradient(135deg, #3a2f15, #7a6130)", border: "1.5px solid #7a6130", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: C.goldLight, fontFamily: F.display, flexShrink: 0 }}>{initials}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12.5, fontWeight: 500, color: C.textPrimary, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{name || "—"}</div>
              <div style={{ fontSize: 10, color: C.textMuted, fontFamily: F.mono }}>{uid || "—"}</div>
            </div>
          </div>
        </div>
      )}

      {/* 折疊時只顯示頭像 */}
      {collapsed && !isMobile && (
        <div style={{ padding: "14px 0 0", borderTop: `0.5px solid ${C.borderSubtle}`, display: "flex", justifyContent: "center", flexShrink: 0 }}>
          <div style={{ width: 30, height: 30, borderRadius: 6, background: "linear-gradient(135deg, #3a2f15, #7a6130)", border: "1.5px solid #7a6130", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: C.goldLight, fontFamily: F.display }}>{initials}</div>
        </div>
      )}
    </aside>
  );
}
