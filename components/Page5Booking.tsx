"use client";

import Link from "next/link";

export default function Page5Booking() {
  return (
    <section className="relative w-full pb-16 md:pb-24 bg-[#A4835E] -mt-[46px] md:-mt-[54px]">
      {/* 對齊第四圖頁的內容寬度 */}
      <div className="mx-auto max-w-6xl px-4">
        {/* 外層容器：3:1 比例，對齊第四圖頁的圖片區域，添加 border 確保對齊 */}
        {/* 移動端和桌面端都需要對齊第四圖頁的兩圖+gap區域，移動端和桌面端都使用 gap-6 (24px) */}
        {/* 移動端：grid-cols-2 兩欄各 50%，gap-6 在內部，所以 grid 容器總寬度是 100% */}
        {/* 桌面端：md:grid-cols-[40%_60%]，gap-6 在內部，所以 grid 容器總寬度是 100% + gap = 100% + 24px */}
        <div className="relative w-full md:w-[calc(100%+1.5rem)] aspect-[3/1] overflow-hidden border border-[var(--border-main)]/40 bg-black/10">
          {/* 背景圖片 */}
          <img
            src="/images/page5/page5.webp"
            alt="線上訂房"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />

          {/* 深色半透明遮罩 */}
          <div className="absolute inset-0 bg-black/40 z-0"></div>

          {/* 中間內容：文字和按鈕 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            {/* 上方文字：預定您的假期 */}
            <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-normal mb-6 md:mb-8">
              預定您的假期
            </h2>

            {/* 按鈕：白色邊框，半透明背景，左邊日曆圖標，右邊文字 */}
            <Link
              href="#booking"
              className="inline-flex items-center gap-3 border border-white bg-white/10 backdrop-blur-sm px-6 py-3 md:px-8 md:py-4 hover:bg-white/20 transition-colors"
            >
              {/* 日曆圖標 */}
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {/* 按鈕文字 */}
              <span className="text-white text-sm md:text-base tracking-widest">
                線上訂房
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

