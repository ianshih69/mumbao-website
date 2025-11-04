import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import OverlayCard from "@/components/OverlayCard";

const NEWS_ITEMS = [
  { image: "/images/page3/page3-1.webp", title: "灣臥・世界百大建築", date: "2022.11.08" },
  { image: "/images/page3/page3-2.webp", title: "灣臥生日獻禮", date: "2025.08.13" },
  { image: "/images/page3/page3-3.webp", title: "灣臥・晚餐", date: "2025.08.01" },
  { image: "/images/page3/page3-4.webp", title: "最新消息標題", date: "2025.03.15" },
  { image: "/images/page3/page3-5.webp", title: "最新消息標題", date: "2025.03.10" },
];

export default function LatestNewsSection() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(1); // 1 on mobile, up to 3 on desktop
  const intervalRef = useRef<number | null>(null);

  const total = useMemo(() => NEWS_ITEMS.length, []);

  useEffect(() => {
    const apply = () => {
      const w = window.innerWidth;
      setVisible(w >= 1024 ? 3 : w >= 768 ? 2 : 1);
    };
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);

  useEffect(() => {
    const setupTimer = () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      intervalRef.current = window.setInterval(() => {
        setCurrent((c) => {
          const maxStart = Math.max(0, total - visible);
          return c < maxStart ? c + 1 : 0; // 循環回到開頭，不會出現空白
        });
      }, 3000);
    };
    setupTimer();
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [visible, total]);

  const restartTimer = () => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      setCurrent((c) => {
        const maxStart = Math.max(0, total - visible);
        return c < maxStart ? c + 1 : 0;
      });
    }, 3000);
  };

  const goPrev = () => {
    setCurrent((c) => {
      const maxStart = Math.max(0, total - visible);
      return Math.max(0, Math.min(maxStart, c - 1)); // 最多停在第一頁
    });
    restartTimer(); // 手動操作後重新計時
  };
  const goNext = () => {
    setCurrent((c) => {
      const maxStart = Math.max(0, total - visible);
      return Math.max(0, Math.min(maxStart, c + 1)); // 最多停在最後一頁
    });
    restartTimer(); // 手動操作後重新計時
  };

  // Track translate percentage based on visible slots
  const translatePct = (current * 100) / visible;

  return (
    <section className="bg-[#A4835E] py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-white font-normal text-center tracking-[0.4em] text-xl md:text-2xl mb-12 md:mb-14">
          最 新 消 息
        </h2>

        <div className="relative select-none">
          {/* Arrow controls */}
          <button
            type="button"
            aria-label="上一張"
            onClick={goPrev}
            className="flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 md:w-10 md:h-10 items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/45"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="下一張"
            onClick={goNext}
            className="flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 md:w-10 md:h-10 items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/45"
          >
            ›
          </button>

          {/* Carousel viewport */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out items-stretch"
              style={{ transform: `translateX(-${translatePct}%)` }}
            >
              {NEWS_ITEMS.map((item, idx) => (
                <div key={item.image} style={{ width: `${100 / visible}%` }} className="shrink-0 flex flex-col px-2 md:px-3">
                  {/* 圖片容器：固定高度 */}
                  <div className="relative w-full aspect-[7/8] overflow-hidden border border-[var(--border-main)]/40 bg-black/10 shrink-0">
                    <OverlayCard
                      href="/news"
                      ariaLabel={`詳細內容：${item.title}`}
                      className="relative w-full h-full"
                      zoomOnHover={false}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </OverlayCard>
                  </div>
                  {/* 圖片下方文字：標題和日期（固定高度確保位置一致） */}
                  <div className="mt-3 text-white h-[3.5rem] md:h-[4rem] flex flex-col justify-start">
                    <h3 className="text-sm md:text-base font-normal leading-tight line-clamp-2">{item.title}</h3>
                    <p className="text-xs md:text-sm text-white/70 mt-1">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-2.5 md:mt-10">
          <a href="/news" className="inline-flex items-center gap-1 text-white leading-none text-sm md:text-base">
            更多 ＋
          </a>
        </div>
      </div>
    </section>
  );
}

