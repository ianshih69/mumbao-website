"use client";
import React, { useEffect, useRef } from "react";
import type { ReactElement } from "react";

type Star = { x:number; y:number; radius:number; speedY:number; driftX:number; color:string; alpha:number; };

export default function StarfieldCanvas(): ReactElement {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const starsRef = useRef<Star[]>([]);
  const isScrollingRef = useRef(false);            // ← 新增：捲動旗標
  const scrollTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return () => {};
    const ctx = canvas.getContext("2d");
    if (!ctx) return () => {};

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const isMobile = () => window.innerWidth <= 768;

    const rand = (min:number, max:number) => Math.random() * (max - min) + min;

    const createStars = (count:number, width:number, height:number) => {
      const colors = ["rgba(255,255,255,","rgba(255,238,230,","rgba(255,236,200,"];
      const stars: Star[] = [];
      for (let i = 0; i < count; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const alpha = rand(0.15, 0.45);
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: rand(0.4, 1.2),                   // 行動再小一點
          speedY: rand(0.06, 0.22),                 // 行動再慢一點
          driftX: rand(-0.06, 0.06),
          color: `${color}${alpha})`,
          alpha,
        });
      }
      return stars;
    };

    const resize = () => {
      const { innerWidth, innerHeight } = window;
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      canvas.width = Math.floor(innerWidth * dpr);
      canvas.height = Math.floor(innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const baseCount = isMobile() ? 50 : 120;     // ← 行動星數再降
      starsRef.current = createStars(baseCount, innerWidth, innerHeight);
    };

    const clear = () => { ctx.clearRect(0, 0, canvas.width, canvas.height); };

    const drawStars = () => {
      const { innerWidth, innerHeight } = window;
      for (const s of starsRef.current) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.fill();
        s.y += s.speedY; s.x += s.driftX;
        s.alpha += (Math.random() - 0.5) * 0.01;
        s.alpha = Math.max(0.1, Math.min(0.5, s.alpha));
        if (s.y - s.radius > innerHeight) { s.y = -s.radius - rand(0, 20); s.x = Math.random() * innerWidth; }
      }
    };

    const loop = () => {
      if (!isScrollingRef.current) {               // ← 捲動時跳過繪製
        clear();
        drawStars();
      }
      animationRef.current = requestAnimationFrame(loop);
    };

    // 行動裝置：捲動中暫停重繪（100~150ms）
    const onScroll = () => {
      isScrollingRef.current = true;
      if (scrollTimerRef.current) window.clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = window.setTimeout(() => { isScrollingRef.current = false; }, 120);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });       // ← passive
    animationRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize as any);
      window.removeEventListener("scroll", onScroll as any);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed-layer"                            // ← 使用合成層 class
      style={{ zIndex: 0 }}
    />
  );
}
