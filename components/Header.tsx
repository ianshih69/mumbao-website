"use client";

import MobileMenu from "./MobileMenu";
import Link from "next/link";

export default function Header() {
  return (
    <header
      className="
        sticky top-0 z-50
        border-b border-[var(--border-main)]/30
        bg-cover bg-center bg-no-repeat
        relative
      "
      style={{ backgroundImage: "url('/images/background.jpg')" }}
    >
      {/* 淡淡遮罩，讓字可讀，但不蓋掉背景圖 */}
      <div className="absolute inset-0 bg-[var(--bg-header)]/10 pointer-events-none"></div>

      {/* 導覽列內容 */}
      <div className="relative mx-auto max-w-7xl px-4 h-16 flex items-center">
        {/* 桌面版：三欄 */}
        <div className="hidden md:grid md:grid-cols-3 w-full items-center">
          {/* 左：選單 */}
          <div className="flex items-center">
            <MobileMenu />
          </div>

          {/* 中：Logo */}
          <div className="text-center leading-tight select-none">
            <Link href="/" className="inline-block">
              <div className="tracking-[0.2em] text-[var(--title-main)] font-semibold">
                <div className="text-lg leading-none">MUMBAO STAY</div>
                <div className="text-xs mt-0.5 leading-none text-[var(--text-main)]">
                  慢慢蒔光
                </div>
              </div>
            </Link>
          </div>

          {/* 右：語言 */}
          <div className="flex items-center justify-end gap-4">
            <button
              className="text-[var(--text-main)] hover:opacity-70"
              aria-label="語言"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 002 2h2.945M11 20v-1.5a2 2 0 012-2h2.055M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>

            <span className="text-sm text-[var(--text-main)] whitespace-nowrap">
              Tw | En
            </span>
          </div>
        </div>

        {/* 手機版：壓成一列 */}
        <div className="md:hidden flex justify-between items-center w-full">
          <MobileMenu />

          <Link href="/" className="flex-1 text-center select-none">
            <div className="tracking-wide text-[var(--title-main)] font-semibold text-sm leading-none">
              MUMBAO STAY
              <div className="text-[10px] mt-0.5 leading-none text-[var(--text-main)]">
                慢慢蒔光
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--text-main)] whitespace-nowrap">
              Tw|En
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
