"use client";

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
  activePath: string;
  title: string;
}

export default function Layout({ children, activePath, title }: LayoutProps) {
  const [collapsed, setCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setMobileOpen(false);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const sidebarWidth = isMobile ? 0 : collapsed ? 64 : 240;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=DM+Sans:wght@300;400;500&family=Space+Mono:wght@400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0a0b; color: #f0ece0; font-family: 'DM Sans', system-ui, sans-serif; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.25); border-radius: 2px; }
        input { color-scheme: dark; }

        html { font-size: 16px; }
        @media (max-width: 1024px) { html { font-size: 15px; } }
        @media (max-width: 768px)  { html { font-size: 14px; } }
        @media (max-width: 480px)  { html { font-size: 13px; } }

        @media (max-width: 1024px) {
          .grid-4 { grid-template-columns: repeat(2, 1fr) !important; }
          .grid-3 { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .grid-4 { grid-template-columns: 1fr !important; }
          .grid-3 { grid-template-columns: 1fr !important; }
          .grid-2 { grid-template-columns: 1fr !important; }
          .content-pad { padding: 16px !important; }
        }

        @media (max-width: 768px) {
          .header-search { display: none !important; }
          .wallet-addr { display: none !important; }
        }
      `}</style>

      <div style={{ display: "flex", minHeight: "100vh", background: "#0a0a0b", overflowX: "hidden" }}>

        {/* 手機遮罩 — 點擊關閉側欄 */}
        {isMobile && mobileOpen && (
          <div
            onClick={() => setMobileOpen(false)}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(0,0,0,0.7)",
              zIndex: 99,
              backdropFilter: "blur(3px)",
            }}
          />
        )}

        {/* Sidebar */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: isMobile ? (mobileOpen ? 0 : -300) : 0,
            zIndex: 100,
            height: "100vh",
            transition: "left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <Sidebar
            activePath={activePath}
            collapsed={isMobile ? false : collapsed}
            onToggle={() => {
              if (isMobile) setMobileOpen(false);
              else setCollapsed(!collapsed);
            }}
            isMobile={isMobile}
          />
        </div>

        {/* 主內容 */}
        <main
          style={{
            marginLeft: sidebarWidth,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            transition: "margin-left 0.25s ease",
            minWidth: 0,
            overflowX: "hidden",
          }}
        >
          <Header
            title={title}
            onMenuClick={isMobile ? () => setMobileOpen(true) : undefined}
          />
          <div
            className="content-pad"
            style={{ padding: 32, flex: 1, overflowX: "hidden" }}
          >
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
