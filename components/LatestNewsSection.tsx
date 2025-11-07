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
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchCurrentX = useRef<number | null>(null);
  const isDragging = useRef(false);
  const mouseStartX = useRef<number | null>(null);
  const mouseCurrentX = useRef<number | null>(null);
  const mouseStartOffsetX = useRef<number | null>(null); // 點擊時游標相對於容器的位置
  const [dragOffset, setDragOffset] = useState(0);
  const [isDraggingState, setIsDraggingState] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const lastMoveTime = useRef<number | null>(null);
  const lastMoveX = useRef<number | null>(null);
  const velocity = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const inertiaVelocity = useRef(0);
  const isAnimating = useRef(false);
  const currentDragOffsetRef = useRef(0);

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
      // 只有在沒有拖動且沒有動畫時才啟動自動播放
      if (!isDragging.current && !isAnimating.current) {
        if (intervalRef.current) window.clearInterval(intervalRef.current);
        intervalRef.current = window.setInterval(() => {
          // 再次檢查是否正在拖動或動畫中
          if (!isDragging.current && !isAnimating.current) {
            setCurrent((c) => {
              const maxStart = Math.max(0, total - visible);
              return c < maxStart ? c + 1 : 0; // 循環回到開頭，不會出現空白
            });
          }
        }, 3000);
      }
    };
    setupTimer();
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [visible, total]);

  const restartTimer = () => {
    // 只有在沒有拖動且沒有動畫時才重新開始自動播放
    if (!isDragging.current && !isAnimating.current) {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      intervalRef.current = window.setInterval(() => {
        // 再次檢查是否正在拖動或動畫中
        if (!isDragging.current && !isAnimating.current) {
          setCurrent((c) => {
            const maxStart = Math.max(0, total - visible);
            return c < maxStart ? c + 1 : 0;
          });
        }
      }, 3000);
    }
  };

  const goPrev = () => {
    setCurrent((c) => {
      const maxStart = Math.max(0, total - visible);
      return Math.max(0, Math.min(maxStart, c - 1)); // 最多停在第一頁
    });
  };
  const goNext = () => {
    setCurrent((c) => {
      const maxStart = Math.max(0, total - visible);
      return Math.max(0, Math.min(maxStart, c + 1)); // 最多停在最後一頁
    });
  };

  // 觸控滑動處理
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchCurrentX.current = e.touches[0].clientX;
    isDragging.current = false;
    setIsDraggingState(false); // 觸控開始時先不設置，等確定是水平滑動再設置
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
      setIsDraggingState(true); // 確定是水平滑動時禁用 hover
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
        // 左滑 → 下一張
        goNext();
      } else {
        // 右滑 → 上一張
        goPrev();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
    touchCurrentX.current = null;
    isDragging.current = false;
    setIsDraggingState(false); // 恢復 hover 功能
  };

  // 滑鼠拖動處理
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // 只處理左鍵
    e.preventDefault();
    mouseStartX.current = e.clientX;
    mouseCurrentX.current = e.clientX;
    
    // 記錄點擊時游標相對於容器的位置
    if (carouselRef.current) {
      const rect = carouselRef.current.getBoundingClientRect();
      mouseStartOffsetX.current = e.clientX - rect.left;
    }
    
    setDragOffset(0);
    isDragging.current = true;
    setIsDraggingState(true); // 更新 state 以禁用其他圖片的 hover
    
    // 找到被點擊的圖片索引
    const target = e.target as HTMLElement;
    const cardElement = target.closest('[data-card-index]') as HTMLElement;
    if (cardElement) {
      const index = parseInt(cardElement.getAttribute('data-card-index') || '-1');
      if (index >= 0) {
        setHoveredIndex(index); // 保持被點擊的圖片顯示"詳細內容"
      }
    }
    
    // 停止自動播放
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    if (carouselRef.current) {
      carouselRef.current.style.cursor = 'grabbing';
      carouselRef.current.style.userSelect = 'none';
    }
    
    // 綁定到 document 以確保滑鼠移出容器時仍能追蹤
    document.addEventListener('mousemove', handleMouseMoveGlobal);
    document.addEventListener('mouseup', handleMouseUpGlobal);
  };

  const handleMouseMoveGlobal = (e: MouseEvent) => {
    if (!isDragging.current || mouseStartX.current === null || mouseStartOffsetX.current === null) return;
    
    e.preventDefault();
    mouseCurrentX.current = e.clientX;
    
    // 計算游標移動的絕對距離（像素）
    const deltaX = e.clientX - mouseStartX.current;
    
    // 計算速度（用於慣性效果）- 使用更精確的速度計算
    const now = performance.now();
    if (lastMoveTime.current !== null && lastMoveX.current !== null) {
      const timeDelta = now - lastMoveTime.current;
      const xDelta = e.clientX - lastMoveX.current;
      if (timeDelta > 0) {
        // 使用加權平均來平滑速度計算
        velocity.current = velocity.current * 0.7 + (xDelta / timeDelta) * 0.3;
      }
    }
    lastMoveTime.current = now;
    lastMoveX.current = e.clientX;
    
    if (carouselRef.current && sliderRef.current) {
      const containerWidth = carouselRef.current.offsetWidth;
      const itemWidth = containerWidth / visible;
      
      // 計算當前游標相對於容器的位置
      const rect = carouselRef.current.getBoundingClientRect();
      const currentOffsetX = e.clientX - rect.left;
      
      // 計算游標移動的距離（相對於點擊時在容器內的位置，單位：像素）
      const mouseDeltaX = currentOffsetX - mouseStartOffsetX.current;
      
      // 1:1 跟隨：游標移動多少像素，圖片就移動多少像素
      // 將像素移動轉換為 offset（offset 是相對於 itemWidth 的比例）
      // 游標往左移動（mouseDeltaX 為負），圖片往左移動（offset 為正）
      let offset = -mouseDeltaX / itemWidth;
      
      // 計算邊界限制 - 允許延伸顯示部分相鄰圖片
      const maxStart = Math.max(0, total - visible);
      const extendLimit = 0.3; // 允許延伸顯示30%的相鄰圖片
      const minOffset = current === 0 ? -extendLimit : -Infinity; // 第一頁時允許往右拖動顯示部分右邊圖片
      const maxOffset = current >= maxStart ? extendLimit : Infinity; // 最後一頁時允許往左拖動顯示部分左邊圖片
      
      // 限制 offset 範圍
      offset = Math.max(minOffset, Math.min(maxOffset, offset));
      currentDragOffsetRef.current = offset;
      
      // 直接操作 DOM，避免 React 重新渲染延遲
      // 使用像素值確保 1:1 跟隨：滑鼠移動多少像素，圖片就移動多少像素
      // 注意：需要考慮 slider 的 paddingLeft (5px)
      const baseTranslatePx = (current * itemWidth); // 當前頁面的基礎位置（像素）
      const dragTranslatePx = offset * itemWidth; // 拖動偏移（像素）
      const totalTranslatePx = baseTranslatePx + dragTranslatePx; // 總位置（像素）
      
      sliderRef.current.style.transform = `translateX(-${totalTranslatePx}px)`;
      sliderRef.current.style.transition = 'none';
    }
  };

  const handleMouseUpGlobal = () => {
    if (!isDragging.current || mouseStartX.current === null) return;
    
    const currentDragOffset = currentDragOffsetRef.current; // 保存當前拖動偏移量
    const currentVelocity = velocity.current; // 保存當前速度（px/ms）
    
    // 停止拖動狀態
    isDragging.current = false;
    setIsDraggingState(false); // 恢復 hover 功能
    setHoveredIndex(null); // 清除被點擊的圖片索引
    
    // 同步 state 以便後續計算
    setDragOffset(currentDragOffset);
    
    // 計算慣性速度（轉換為 offset/ms）
    if (carouselRef.current && sliderRef.current) {
      const containerWidth = carouselRef.current.offsetWidth;
      const itemWidth = containerWidth / visible;
      
      // 將速度從 px/ms 轉換為 offset/ms
      const velocityInOffset = currentVelocity / itemWidth;
      inertiaVelocity.current = velocityInOffset;
      
      // 基於速度和距離的動態閾值
      const speedThreshold = Math.abs(velocityInOffset) > 0.008; // 速度閾值
      const distanceThreshold = Math.abs(currentDragOffset) > 0.12; // 距離閾值
      
      // 計算邊界限制 - 允許延伸顯示部分相鄰圖片
      const maxStart = Math.max(0, total - visible);
      const extendLimit = 0.3; // 允許延伸顯示30%的相鄰圖片
      const minOffset = current === 0 ? -extendLimit : -Infinity; // 第一頁時允許往右拖動顯示部分右邊圖片
      const maxOffset = current >= maxStart ? extendLimit : Infinity; // 最後一頁時允許往左拖動顯示部分左邊圖片
      
      // 確保在慣性動畫期間也停止自動播放
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      
      // 使用 requestAnimationFrame 處理慣性動畫
      isAnimating.current = true;
      let lastTime = performance.now();
      let currentOffset = currentDragOffset; // 從當前位置開始
      const friction = 0.95; // 摩擦係數（更平滑的減速）
      
      const animate = (currentTime: number) => {
        if (!isAnimating.current || !sliderRef.current) return;
        
        const deltaTime = Math.min(currentTime - lastTime, 50); // 限制最大 deltaTime 避免跳躍
        lastTime = currentTime;
        
        // 應用摩擦，讓慣性逐漸減速
        inertiaVelocity.current *= Math.pow(friction, deltaTime / 16); // 標準化到16ms一幀
        
        // 累積位置更新
        currentOffset += inertiaVelocity.current * deltaTime;
        
        // 限制 offset 範圍，防止超出邊界（但允許延伸顯示部分相鄰圖片）
        currentOffset = Math.max(minOffset, Math.min(maxOffset, currentOffset));
        
        // 如果到達邊界，停止慣性動畫
        if ((currentOffset <= minOffset && inertiaVelocity.current < 0) || 
            (currentOffset >= maxOffset && inertiaVelocity.current > 0)) {
          inertiaVelocity.current = 0;
        }
        
        // 直接操作 DOM，避免 React 重新渲染延遲
        // 使用像素值確保 1:1 跟隨
        const baseTranslatePx = (current * itemWidth); // 當前頁面的基礎位置（像素）
        const dragTranslatePx = currentOffset * itemWidth; // 拖動偏移（像素）
        const totalTranslatePx = baseTranslatePx + dragTranslatePx; // 總位置（像素）
        
        sliderRef.current.style.transform = `translateX(-${totalTranslatePx}px)`;
        sliderRef.current.style.transition = 'none';
        
        // 如果速度太小，停止動畫並判斷是否切換
        if (Math.abs(inertiaVelocity.current) < 0.0001) {
          isAnimating.current = false;
          const finalOffset = currentOffset;
          
          // 判斷是否切換頁面（基於最終位置或速度）
          // 在邊界時，需要考慮延伸限制
          const isAtLeftBoundary = current === 0;
          const isAtRightBoundary = current >= maxStart;
          const shouldSwitch = speedThreshold || distanceThreshold || Math.abs(finalOffset) > 0.12;
          
          // 恢復 transition 以便後續動畫
          if (sliderRef.current) {
            sliderRef.current.style.transition = 'transform 450ms cubic-bezier(0.25, 0.46, 0.45, 0.94)';
          }
          
          // 先重置 offset，避免位置計算錯誤
          setDragOffset(0);
          
          if (shouldSwitch) {
            if (finalOffset > 0 || (Math.abs(finalOffset) < 0.05 && currentVelocity > 0)) {
              // 往左拖動，切換到下一頁（但如果在右邊界，不切換）
              if (!isAtRightBoundary) {
                goNext(); // 切換頁面，useEffect 會自動更新位置
              } else {
                // 在右邊界，彈回原位置
                if (sliderRef.current && carouselRef.current) {
                  const containerWidth = carouselRef.current.offsetWidth;
                  const itemWidth = containerWidth / visible;
                  const translatePx = current * itemWidth;
                  sliderRef.current.style.transform = `translateX(-${translatePx}px)`;
                }
              }
            } else if (finalOffset < 0 || (Math.abs(finalOffset) < 0.05 && currentVelocity < 0)) {
              // 往右拖動，切換到上一頁（但如果在左邊界，不切換）
              if (!isAtLeftBoundary) {
                goPrev(); // 切換頁面，useEffect 會自動更新位置
              } else {
                // 在左邊界，彈回原位置
                if (sliderRef.current && carouselRef.current) {
                  const containerWidth = carouselRef.current.offsetWidth;
                  const itemWidth = containerWidth / visible;
                  const translatePx = current * itemWidth;
                  sliderRef.current.style.transform = `translateX(-${translatePx}px)`;
                }
              }
            }
          } else {
            // 如果不需要切換，也要更新到正確位置（彈回原位置）
            if (sliderRef.current && carouselRef.current) {
              const containerWidth = carouselRef.current.offsetWidth;
              const itemWidth = containerWidth / visible;
              const translatePx = current * itemWidth;
              sliderRef.current.style.transform = `translateX(-${translatePx}px)`;
            }
          }
          
          // 放開後重新開始3秒自動換頁計時
          restartTimer();
        } else {
          animationFrameRef.current = requestAnimationFrame(animate);
        }
      };
      
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      // 如果沒有容器引用，直接判斷
      const threshold = 0.12;
      if (Math.abs(currentDragOffset) > threshold) {
        if (currentDragOffset > 0) {
          goNext();
        } else {
          goPrev();
        }
      }
      setDragOffset(0);
      restartTimer();
    }
    
    mouseStartX.current = null;
    mouseCurrentX.current = null;
    mouseStartOffsetX.current = null;
    lastMoveTime.current = null;
    lastMoveX.current = null;
    velocity.current = 0;
    
    if (carouselRef.current) {
      carouselRef.current.style.cursor = 'grab';
      carouselRef.current.style.userSelect = '';
    }
    
    // 移除全局事件監聽
    document.removeEventListener('mousemove', handleMouseMoveGlobal);
    document.removeEventListener('mouseup', handleMouseUpGlobal);
  };

  // 清理事件監聽和動畫
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMoveGlobal);
      document.removeEventListener('mouseup', handleMouseUpGlobal);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      isAnimating.current = false;
    };
  }, []);

  // Track translate percentage based on visible slots (已改用像素值，此變數保留用於其他用途)
  const translatePct = (current * 100) / visible + dragOffset * 100;
  
  // 當 current 改變時，更新 DOM（自動切換時）
  useEffect(() => {
    // 只有在不是拖動狀態且不是慣性動畫狀態時，才更新位置（自動切換）
    if (sliderRef.current && !isDragging.current && !isAnimating.current && carouselRef.current) {
      const containerWidth = carouselRef.current.offsetWidth;
      const itemWidth = containerWidth / visible;
      const translatePx = current * itemWidth;
      sliderRef.current.style.transform = `translateX(-${translatePx}px)`;
      sliderRef.current.style.transition = 'transform 450ms cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }
  }, [current, visible]);
  

  return (
    <section className="bg-[#A4835E] py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-white font-normal text-center tracking-[0.4em] text-xl md:text-2xl mb-12 md:mb-14">
          最 新 消 息
        </h2>
      </div>

      <div className="relative select-none px-[10px]">
        {/* Carousel viewport */}
        <div 
          ref={carouselRef}
          className="overflow-hidden cursor-grab active:cursor-grabbing" 
          style={{ touchAction: 'pan-y' }}
          onMouseDown={handleMouseDown}
        >
          <div
            ref={sliderRef}
            className="flex items-stretch"
              style={{ 
                transform: 'translateX(0px)',
                transition: 'transform 450ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transformStyle: 'preserve-3d'
              }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {NEWS_ITEMS.map((item, idx) => (
              <div key={item.image} data-card-index={idx} style={{ width: `${100 / visible}%` }} className="shrink-0 flex flex-col px-[10px]">
                  {/* 圖片容器：固定高度 */}
                  <div className="relative w-full aspect-[7/8] overflow-hidden border border-[var(--border-main)]/40 bg-black/10 shrink-0">
                    <OverlayCard
                      href="/news"
                      ariaLabel={`詳細內容：${item.title}`}
                      className={`relative w-full h-full ${isDraggingState && hoveredIndex !== idx ? 'pointer-events-none' : ''}`}
                      zoomOnHover={false}
                      disableHover={isDraggingState && hoveredIndex !== idx}
                      forceShow={isDraggingState && hoveredIndex === idx}
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

        <div className="text-center mt-2.5 md:mt-10">
          <a href="/news" className="inline-flex items-center gap-1 text-white leading-none text-sm md:text-base">
            更多 ＋
          </a>
        </div>
      </div>
    </section>
  );
}

