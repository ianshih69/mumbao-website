"use client";

import type { ReactNode } from "react";

type OverlayCardProps = {
  href: string;            // 導向連結（點白框才會前往）
  ariaLabel: string;       // 無障礙說明
  children: ReactNode;     // 通常放 <img>（你已經有 srcSet / sizes）
  className?: string;      // 讓你外部控制尺寸/比例
  zoomOnHover?: boolean;   // 桌機 hover 輕微放大
};

export default function OverlayCard({
  href,
  ariaLabel,
  children,
  className = "",
  zoomOnHover = true,
}: OverlayCardProps) {
  return (
    <div
      // 外層可聚焦容器（手機第一次點 → focus，顯示覆蓋）
      tabIndex={0}
      aria-label={ariaLabel}
      className={[
        "group relative overflow-hidden cursor-pointer outline-none focus:outline-none focus-visible:ring-0",
        className,
      ].join(" ")}
      // 移除行動裝置點擊時的高亮邊框
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {/* 圖片本體 */}
      <div
        className={[
          "transition-transform duration-300 will-change-transform",
          zoomOnHover
            ? "group-hover:scale-[1.02] group-focus:scale-[1.02] group-focus-within:scale-[1.02]"
            : "",
        ].join(" ")}
      >
        {children}
      </div>

      {/* 反黑遮罩（只在 hover / focus / focus-within 顯示） */}
      <div
        className="pointer-events-none absolute inset-0 bg-black/45 opacity-0
                   transition-opacity duration-200 ease-out
                   group-hover:opacity-100 group-focus:opacity-100 group-focus-within:opacity-100"
      />

      {/* 中央白框 + 文字（覆蓋層內放可點擊的 <a>，其餘區域不吃點擊） */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0
                   transition-opacity duration-200 ease-out
                   group-hover:opacity-100 group-focus:opacity-100 group-focus-within:opacity-100"
      >
        <a
          href={href}
          aria-label={ariaLabel}
          className="pointer-events-auto border border-white text-white px-5 py-2 md:px-6 md:py-2.5
                     text-sm md:text-base tracking-widest select-none"
        >
          詳細內容 ＋
        </a>
      </div>
    </div>
  );
}
