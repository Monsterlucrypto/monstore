"use client";

import { useState, useEffect } from "react";

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
  { label: "Dashboard",      icon: "⬡",  href: "/"            },
  { label: "VIP Membership", icon: "◈",  href: "/vip"         },
  { label: "Rewards",        icon: "✦",  href: "/rewards"     },
  { label: "Marketplace",    icon: "◻",  href: "/marketplace" },
  { label: "Founder Pass",   icon: "🥚", href: "/founder"     },
  { label: "Referral",       icon: "⟐",  href: "/referral"    },
  { label: "Settings",       icon: "⊙",  href: "/settings"    },
];

interface SidebarProps {
  activePath: string;
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ activePath, collapsed, onToggle }: SidebarProps) {
  const w = collapsed ? 64 : 240;

  return (
    <>
      {/* 手機遮罩 */}
      {!collapsed && (
        <div
          onClick={onToggle}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 99, display: "none" }}
          className="mobile-overlay"
        />
      )}

      <aside
        style={{
          width: w,
          minHeight: "100vh",
          background: "rgba(14,14,18,0.97)",
          borderRight: `0.5px solid ${C.borderSubtle}`,
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          top: 0, left: 0,
          zIndex: 100,
          paddingBottom: 24,
          transition: "width 0.25s ease",
          overflow: "hidden",
        }}
      >
        {/* Logo + 折疊按鈕 */}
        <div style={{ padding: "20px 14px 18px", borderBottom: `0.5px solid ${C.borderSubtle}`, display: "flex", alignItems: "center", gap: 10, justifyContent: collapsed ? "center" : "flex-start", minHeight: 64 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, overflow: "hidden", background: "#000", border: `0.5px solid ${C.borderMid}`, flexShrink: 0 }}>
            <img src="/logo.png" alt="logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          {!collapsed && (
            <div style={{ fontFamily: F.display, fontSize: 17, fontWeight: 500, color: C.textPrimary, letterSpacing: 1, whiteSpace: "nowrap", overflow: "hidden" }}>
              Mon<span style={{ color: C.gold }}>store</span>
            </div>
          )}
          {/* 折疊按鈕 */}
          <button
            onClick={onToggle}
            style={{ marginLeft: collapsed ? 0 : "auto", background: "transparent", border: `0.5px solid ${C.borderSubtle}`, borderRadius: 6, width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: C.textMuted, fontSize: 11, flexShrink: 0, transition: "all 0.2s" }}
          >
            {collapsed ? "▶" : "◀"}
          </button>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "16px 10px", display: "flex", flexDirection: "column", gap: 2 }}>
          {navItems.map((item) => {
            const isActive = activePath === item.href;
            return (
              <a
                key={item.label}
                href={item.href}
                title={collapsed ? item.label : undefined}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: collapsed ? 0 : 10,
                  padding: collapsed ? "10px 0" : "10px 12px",
                  justifyContent: collapsed ? "center" : "flex-start",
                  borderRadius: 8,
                  textDecoration: "none",
                  color: isActive ? C.goldLight : C.textSecondary,
                  fontSize: 13.5,
                  background: isActive ? "rgba(201,168,76,0.1)" : "transparent",
                  border: `0.5px solid ${isActive ? C.borderMid : "transparent"}`,
                  fontFamily: F.body,
                  position: "relative",
                  transition: "all 0.2s",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                {isActive && (
                  <span style={{ position: "absolute", left: -1, top: "20%", height: "60%", width: 2, background: C.gold, borderRadius: "0 2px 2px 0" }} />
                )}
                <span style={{ fontSize: 17, width: 20, textAlign: "center", flexShrink: 0 }}>{item.icon}</span>
                {!collapsed && item.label}
              </a>
            );
          })}
        </nav>

        {/* 底部使用者 */}
        {!collapsed && (
          <div style={{ padding: "16px 10px 0", borderTop: `0.5px solid ${C.borderSubtle}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, border: `0.5px solid ${C.borderSubtle}` }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #3a2f15, #7a6130)", border: "1.5px solid #7a6130", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: C.goldLight, fontFamily: F.display, flexShrink: 0 }}>CL</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 500, color: C.textPrimary, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Chinglu</div>
                <div style={{ fontSize: 10, color: C.textMuted, fontFamily: F.mono }}>0x7f4a...3d8c</div>
              </div>
            </div>
          </div>
        )}

        {/* 折疊時只顯示頭像 */}
        {collapsed && (
          <div style={{ padding: "16px 0 0", borderTop: `0.5px solid ${C.borderSubtle}`, display: "flex", justifyContent: "center" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #3a2f15, #7a6130)", border: "1.5px solid #7a6130", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: C.goldLight, fontFamily: F.display }}>CL</div>
          </div>
        )}
      </aside>
    </>
  );
}
