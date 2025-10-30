"use client";

import React, { useEffect, useRef } from "react";
import type { ReactElement } from "react";

type Star = {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  driftX: number;
  color: string;
  alpha: number;
};

// Meteors removed per request – keep only gentle drifting stardust

export default function StarfieldCanvas(): ReactElement {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const starsRef = useRef<Star[]>([]);
  // meteor removed

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return () => {};
    const ctx = canvas.getContext("2d");
    if (!ctx) return () => {};

    const colors = [
      "rgba(255,255,255,", // white
      "rgba(255,238,230,", // warm pinkish (very soft)
      "rgba(255,236,200,", // pale gold
    ];

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const isMobile = () => window.innerWidth <= 768;

    const resize = () => {
      const { innerWidth, innerHeight } = window;
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      canvas.width = Math.floor(innerWidth * dpr);
      canvas.height = Math.floor(innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Recreate stars on resize to fill new space
      const baseCount = isMobile() ? 70 : 130;
      starsRef.current = createStars(baseCount, innerWidth, innerHeight);
    };

    const rand = (min: number, max: number) => Math.random() * (max - min) + min;

    const createStars = (count: number, width: number, height: number) => {
      const stars: Star[] = [];
      for (let i = 0; i < count; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const alpha = rand(0.15, 0.45);
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: rand(0.4, 1.4),
          speedY: rand(0.08, 0.28),
          driftX: rand(-0.08, 0.08),
          color: `${color}${alpha})`,
          alpha,
        });
      }
      return stars;
    };

    // meteor spawning removed

    const clear = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const drawStars = () => {
      const { innerWidth, innerHeight } = window;
      for (const s of starsRef.current) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.fill();

        // update
        s.y += s.speedY;
        s.x += s.driftX;

        // gentle twinkle
        s.alpha += (Math.random() - 0.5) * 0.01;
        s.alpha = Math.max(0.1, Math.min(0.5, s.alpha));

        // recycle
        if (s.y - s.radius > innerHeight) {
          s.y = -s.radius - rand(0, 20);
          s.x = Math.random() * innerWidth;
        }
      }
    };

    // meteor drawing removed

    const loop = (t: number) => {
      clear();
      drawStars();

      animationRef.current = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener("resize", resize);
    animationRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
