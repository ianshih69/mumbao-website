"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

// Four groups, each with two images side-by-side
const GROUPS = [
  { left: "/images/page4/page4-1-1.webp", right: "/images/page4/page4-1-2.webp" },
  { left: "/images/page4/page4-2-1.webp", right: "/images/page4/page4-2-2.webp" },
  { left: "/images/page4/page4-3-1.webp", right: "/images/page4/page4-3-2.webp" },
  { left: "/images/page4/page4-4-1.webp", right: "/images/page4/page4-4-2.webp" },
];

export default function RoomsMosaic() {
  const [idx, setIdx] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchCurrentX = useRef<number | null>(null);
  const isDragging = useRef(false);

  const restartTimer = () => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      setIdx((i) => (i + 1) % GROUPS.length);
    }, 3000);
  };

  useEffect(() => {
    restartTimer();
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, []);

  const goToPage = (pageIdx: number) => {
    setIdx(pageIdx);
    restartTimer(); // 手動點擊後重新計時
  };

  const goPrev = () => {
    setIdx((i) => (i - 1 + GROUPS.length) % GROUPS.length);
    restartTimer();
  };

  const goNext = () => {
    setIdx((i) => (i + 1) % GROUPS.length);
    restartTimer();
  };

  // 觸控滑動處理
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchCurrentX.current = e.touches[0].clientX;
    isDragging.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = touchStartX.current - currentX;
    const deltaY = touchStartY.current - currentY;

    // 如果已經確定是水平滑動，持續阻止預設行為
    if (isDragging.current) {
      e.preventDefault();
      touchCurrentX.current = currentX;
      return;
    }

    // 如果確定是垂直滑動，允許預設行為（不阻止）
    if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 10) {
      // 這是垂直滑動，允許滾動
      return;
    }

    // 只在確定是水平滑動時才阻止預設行為
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
      isDragging.current = true;
      // 只阻止水平滾動，不影響垂直滾動
      e.preventDefault();
      touchCurrentX.current = currentX;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {

    if (touchStartX.current === null || touchStartY.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchStartX.current - touchEndX;
    const deltaY = touchStartY.current - touchEndY;

    // 只處理水平滑動（水平距離大於垂直距離，且水平距離大於 50px）
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        // 左滑 → 上一組
        goPrev();
      } else {
        // 右滑 → 下一組
        goNext();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
    touchCurrentX.current = null;
    isDragging.current = false;
  };

  return (
    <section className="bg-[#A4835E] py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        {/* 桌面端標題列：上左圓圈、上中標題、上右更多連結 */}
        <div className="hidden md:flex relative items-center justify-between mb-1">
          {/* 上左：4個圓圈分頁指示器 */}
          <div className="flex items-center gap-1.5">
            {GROUPS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goToPage(i)}
                aria-label={`切換到第 ${i + 1} 頁`}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === idx
                    ? "bg-white scale-125"
                    : "bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          {/* 上中：房型標題（絕對居中） */}
          <h2 className="absolute left-1/2 -translate-x-1/2 -translate-y-[40px] text-3xl font-normal tracking-[0.15em] text-white">
            房型
          </h2>

          {/* 上右：更多+連結 */}
          <Link
            href="/rooms"
            className="text-white hover:opacity-80 transition-opacity text-base"
          >
            更多 ＋
          </Link>
        </div>

        {/* 移動端：房型標題、四個點置中 */}
        <div className="md:hidden mb-2 -mt-10">
          {/* 房型標題 */}
          <h2 className="text-center text-2xl font-normal tracking-[0.15em] text-white mb-2">
            房型
          </h2>
          {/* 四個點置中 */}
          <div className="flex items-center justify-center gap-1.5 mt-2.5">
            {GROUPS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goToPage(i)}
                aria-label={`切換到第 ${i + 1} 頁`}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === idx
                    ? "bg-white scale-125"
                    : "bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>

        {/* 兩欄圖片：左邊直式（3:4），右邊橫式（5:3），高度一致（右圖決定高度） */}
        {/* 移動端：上下堆疊（grid-cols-1），第二張圖高度比第一張圖大1/3（3:4比例） */}
        {/* 桌面端：左右並排（md:grid-cols-[40%_60%]） */}
        <div 
          className="grid grid-cols-1 md:grid-cols-[40%_60%] grid-rows-[3fr_4fr] md:grid-rows-none gap-3 md:gap-6"
          style={{ touchAction: 'pan-y' }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Left image: 3:4 直式（高於寬），移動端高度由 grid-rows 控制（3:4比例），桌面端與右圖高度一致 */}
          <div className="relative w-full min-w-0 aspect-[5/3] md:aspect-[3/4] overflow-hidden border border-[var(--border-main)]/40 bg-black/10 rooms-mosaic-left" style={{ height: '100%' }}>
            {GROUPS.map((g, i) => (
              <img
                key={`left-${i}`}
                src={g.left}
                alt={`房型圖片 ${i + 1} - 左`}
                loading={i === idx ? "eager" : "lazy"}
                decoding="async"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                  i === idx ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>

          {/* Right image: 5:3 橫式（寬於高），移動端高度由 grid-rows 控制，桌面端佔60%寬度 */}
          <div className="relative w-full min-w-0 aspect-[5/3] overflow-hidden border border-[var(--border-main)]/40 bg-black/10" style={{ height: '100%' }}>
            {GROUPS.map((g, i) => (
              <img
                key={`right-${i}`}
                src={g.right}
                alt={`房型圖片 ${i + 1} - 右`}
                loading={i === idx ? "eager" : "lazy"}
                decoding="async"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                  i === idx ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
        </div>

        {/* 移動端：更多+連結在第二張圖下方，置中 */}
        <div className="md:hidden flex justify-center mt-2.5">
          <Link
            href="/rooms"
            className="text-white hover:opacity-80 transition-opacity text-sm"
          >
            更多 ＋
          </Link>
        </div>
      </div>
    </section>
  );
}

