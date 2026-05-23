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
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setCollapsed(true);
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
        body { background: #0a0a0b; color: #f0ece0; font-family: 'DM Sans', system-ui, sans-serif; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.25); border-radius: 2px; }
        input { color-scheme: dark; }

        @media (max-width: 768px) {
          .mobile-menu-btn { display: flex !important; }
          .header-search { display: none !important; }
          .wallet-addr { display: none !important; }
          .mobile-overlay { display: block !important; }
        }

        @media (max-width: 1024px) {
          .grid-4 { grid-template-columns: repeat(2, 1fr) !important; }
          .grid-3 { grid-template-columns: repeat(2, 1fr) !important; }
          .grid-2 { grid-template-columns: 1fr !important; }
        }

        @media (max-width: 640px) {
          .grid-4 { grid-template-columns: 1fr !important; }
          .grid-3 { grid-template-columns: 1fr !important; }
          .grid-2 { grid-template-columns: 1fr !important; }
          .content-pad { padding: 16px !important; }
          .hero-row { grid-template-columns: 1fr !important; }
          .founder-benefits { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      <div style={{ display: "flex", minHeight: "100vh", background: "#0a0a0b" }}>
        {/* 手機時側欄用 overlay 方式顯示 */}
        <div style={{ position: "fixed", top: 0, left: isMobile && !mobileOpen ? -240 : 0, zIndex: 100, transition: "left 0.25s ease" }}>
          <Sidebar
            activePath={activePath}
            collapsed={isMobile ? false : collapsed}
            onToggle={() => {
              if (isMobile) setMobileOpen(false);
              else setCollapsed(!collapsed);
            }}
          />
        </div>

        {/* 手機遮罩 */}
        {isMobile && mobileOpen && (
          <div onClick={() => setMobileOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 99 }} />
        )}

        <main style={{ marginLeft: sidebarWidth, flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh", transition: "margin-left 0.25s ease" }}>
          <Header
            title={title}
            onMenuClick={isMobile ? () => setMobileOpen(true) : undefined}
          />
          <div className="content-pad" style={{ padding: 32, flex: 1 }}>
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
