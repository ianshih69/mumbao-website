import React, { useEffect, useMemo, useRef, useState } from "react";

const IMAGES = [
  "/images/page3/page3-1.webp",
  "/images/page3/page3-2.webp",
  "/images/page3/page3-3.webp",
  "/images/page3/page3-4.webp",
  "/images/page3/page3-5.webp",
];

export default function LatestNewsSection() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(1); // 1 on mobile, up to 3 on desktop
  const intervalRef = useRef<number | null>(null);

  const total = useMemo(() => IMAGES.length, []);

  useEffect(() => {
    const apply = () => {
      const w = window.innerWidth;
      setVisible(w >= 1024 ? 3 : 1);
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
      <div className="mx-auto max-w-[1280px] px-4">
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
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${translatePct}%)` }}
            >
              {IMAGES.map((src) => (
                <div key={src} style={{ width: `${100 / visible}%` }} className="shrink-0 px-2 md:px-3">
                  <div className="relative w-full aspect-[86/100] overflow-hidden border border-[var(--border-main)]/40 bg-black/10">
                    <img
                      src={src}
                      alt="最新消息"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <a href="/news" className="inline-flex items-center gap-1 text-white leading-none text-sm md:text-base">
            更多 ＋
          </a>
        </div>
      </div>
    </section>
  );
}

