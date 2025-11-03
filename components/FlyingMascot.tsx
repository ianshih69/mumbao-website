"use client";
import { useEffect, useRef } from "react";

export default function FlyingMascot() {
  const mascotRef = useRef<HTMLDivElement>(null);

  // 你可以調整「活動區域」的邊界：
  // x 在 5vw ~ 75vw 之間亂飛
  // y 在 30vh ~ 75vh 之間亂飛
  const MIN_X = 5;   // vw
  const MAX_X = 75;  // vw
  const MIN_Y = 30;  // vh
  const MAX_Y = 75;  // vh

  // 每次移動花多久飛到下一個點（毫秒）
  const TRAVEL_TIME = 5000; // 5秒一段，越大=飛比較慢、越優雅

  useEffect(() => {
    const el = mascotRef.current;
    if (!el) return;

    let frameId: number;
    let lastTs = performance.now();

    // 目前位置（用vw/vh的百分比表示）
    let currentX = 10;
    let currentY = 70;

    // 目標位置
    let targetX = randomBetween(MIN_X, MAX_X);
    let targetY = randomBetween(MIN_Y, MAX_Y);

    // 我們要記錄這一段旅程開始的時間點
    let segmentStartTs = performance.now();

    function randomBetween(min: number, max: number) {
      return min + Math.random() * (max - min);
    }

    function pickNewTarget() {
      targetX = randomBetween(MIN_X, MAX_X);
      targetY = randomBetween(MIN_Y, MAX_Y);
      segmentStartTs = performance.now();
    }

    function animate(now: number) {
      const dt = now - lastTs;
      lastTs = now;

      // 我們算這一段旅程走了多少比例
      const segElapsed = now - segmentStartTs;
      let t = segElapsed / TRAVEL_TIME; // 0 -> 1

      if (t >= 1) {
        // 抵達了，直接把 current 放到 target
        currentX = targetX;
        currentY = targetY;
        // 換下一個目標
        pickNewTarget();
        t = 0;
      }

      // 用平滑補間 (ease in-out-ish)
      // 我們做一個簡單平滑函數讓路徑更柔：smoothstep
      const smoothT = t * t * (3 - 2 * t);

      // 要往 target 飛，先計算這一段理論上的中間位置
      const nextX = currentX + (targetX - currentX) * smoothT;
      const nextY = currentY + (targetY - currentY) * smoothT;

      // 更新 DOM transform
      if (mascotRef.current) {
        mascotRef.current.style.transform = `translate3d(${nextX}vw, ${nextY}vh, 0)`;
      }

      frameId = requestAnimationFrame(animate);
    }

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div
      ref={mascotRef}
      className="fixed top-0 left-0 z-20 pointer-events-none will-change-transform"
      style={{
        transform: "translate3d(10vw,70vh,0)",
      }}
    >
      <div className="relative w-32 sm:w-40 md:w-48">
        {/* 雲：慢速上下飄，保留可愛感 */}
        <img
          src="/images/cloud.png"
          alt="cloud"
          className="block w-[65%] h-auto mx-auto animate-pulse-slow"
        />
        {/* 角色：站在雲上 */}
        <img
          src="/images/dog.png"
          alt="dog"
          className="absolute left-1/2 bottom-[50%] w-[50%] h-auto"
          style={{ transform: "translateX(-50%)" }}
        />
      </div>
    </div>
  );
}
