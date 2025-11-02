"use client";

import { useState } from "react";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { href: "/about", label: "關於我們" },
    { href: "/news", label: "最新消息" },
    { href: "/rooms", label: "房間" },
    { href: "#booking", label: "線上訂房" },
    { href: "/privacy", label: "隱私政策" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* 菜单按钮 */}
      <button
        onClick={toggleMenu}
        className="flex items-center gap-2 text-[var(--text-main)] hover:opacity-70"
        aria-label="開啟選單"
      >
        <span className="text-xl">☰</span>
        <span className="text-sm hidden md:inline">選單</span>
      </button>

      {/* Offcanvas 侧边菜单 */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-[var(--bg-header)] border-r border-[var(--border-main)] shadow-xl transform transition-transform duration-300 ease-in-out z-[60] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          {/* 关闭按钮 */}
          <div className="flex justify-end mb-6">
            <button
              onClick={closeMenu}
              className="text-[var(--text-main)] hover:opacity-70 text-2xl"
              aria-label="關閉選單"
            >
              ×
            </button>
          </div>

          {/* 菜单项 */}
          <nav className="flex flex-col gap-4">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="text-[var(--text-main)] hover:text-[var(--accent-main)] transition-colors py-2 border-b border-[var(--border-main)]/20"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* 遮罩层 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-[55]"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
}

