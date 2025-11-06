"use client";

import { useState, useRef, useEffect } from "react";
import MobileMenu from "./MobileMenu";
import Link from "next/link";

export default function Header() {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("TW");
  const langMenuRef = useRef<HTMLDivElement>(null);

  // 點擊外部關閉選單
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };

    if (isLangOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLangOpen]);

  const languages = [
    { code: "TW", label: "繁體中文" },
    { code: "JP", label: "日本語" },
    { code: "KR", label: "한국어" },
    { code: "US", label: "English" },
  ];

  const handleLanguageSelect = (code: string) => {
    setCurrentLang(code);
    setIsLangOpen(false);
    // 這裡可以添加語言切換邏輯
    console.log("Selected language:", code);
  };
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
          <div className="relative flex items-center justify-end gap-2" ref={langMenuRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="text-[var(--text-main)] hover:opacity-70 transition-opacity"
              aria-label="語言"
            >
              <img src="/images/globe.webp" alt="語言" className="w-5 h-5" />
            </button>

            <span className="text-sm text-[var(--text-main)] whitespace-nowrap">
              {currentLang}
            </span>

            {/* 語言下拉選單 */}
            {isLangOpen && (
              <div className="absolute right-0 top-full mt-2 w-36 bg-white border border-[var(--border-main)]/30 shadow-lg rounded-sm overflow-hidden z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageSelect(lang.code)}
                    className="w-full text-left px-4 py-3 text-sm text-[var(--text-main)] hover:bg-[var(--bg-card)] transition-colors border-b border-[var(--border-main)]/10 last:border-b-0"
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
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

          <div className="relative flex items-center gap-2">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="text-[var(--text-main)] hover:opacity-70 transition-opacity"
              aria-label="語言"
            >
              <img src="/images/globe.webp" alt="語言" className="w-4 h-4" />
            </button>

            <span className="text-xs text-[var(--text-main)] whitespace-nowrap">
              {currentLang}
            </span>

            {/* 手機版語言下拉選單 */}
            {isLangOpen && (
              <div className="absolute right-0 top-full mt-2 w-36 bg-white border border-[var(--border-main)]/30 shadow-lg rounded-sm overflow-hidden z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageSelect(lang.code)}
                    className="w-full text-left px-4 py-3 text-sm text-[var(--text-main)] hover:bg-[var(--bg-card)] transition-colors border-b border-[var(--border-main)]/10 last:border-b-0"
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
