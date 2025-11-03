"use client";
import React, { useEffect, useRef } from "react";

type MeteorShowerProps = { intensity?: number; showBackground?: boolean };
type Meteor = {
  x: number; y: number; vx: number; vy: number;
  life: number; maxLife: number; length: number; width: number; depthLevel: number;
};

export default function MeteorShower({ intensity = 200, showBackground = true }: MeteorShowerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const meteorsRef = useRef<Meteor[]>([]);
  const lastSpawnRef = useRef<number>(0);
  const lastRenderRef = useRef<number>(0);

  // 「最近一次捲動時間」→ 用來動態降幀/降載（不是停）
  const lastScrollTsRef = useRef<number>(-1);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dprBase = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const isMobile = () => window.innerWidth <= 768;

    const resize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.width = Math.floor(w * dprBase);
      canvas.height = Math.floor(h * dprBase);
      ctx.setTransform(dprBase, 0, 0, dprBase, 0, 0);
    };

    const spawnMeteor = () => {
      const w = window.innerWidth, h = window.innerHeight;
      const startX = w * (-0.2 + Math.random() * 1.4);
      const startY = -100 - Math.random() * 100;

      const isSteep = Math.random() < 0.5;
      const baseMin = isSteep ? 120 : 140;
      const baseMax = isSteep ? 140 : 165;
      const angle = ((baseMin + Math.random() * (baseMax - baseMin)) * Math.PI) / 180;

      const speed = (isMobile() ? 1.6 : 2.0) + Math.random() * (isMobile() ? 2.6 : 3.0);
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;

      const depthLevel = Math.random() < 0.15 ? 2 : Math.random() < 0.5 ? 1 : 0;

      let width: number, length: number, maxLife: number;
      if (depthLevel === 0) {
        width = 1 + Math.random() * 0.8;
        length = (isMobile() ? 60 : 80) + Math.random() * (isMobile() ? 60 : 80);
        maxLife = (isMobile() ? 45 : 60) + Math.random() * (isMobile() ? 45 : 60);
      } else if (depthLevel === 1) {
        width = 1.5 + Math.random() * 1.5;
        length = (isMobile() ? 120 : 160) + Math.random() * (isMobile() ? 120 : 160);
        maxLife = (isMobile() ? 90 : 120) + Math.random() * (isMobile() ? 90 : 120);
      } else {
        width = 2.5 + Math.random() * 2;
        length = (isMobile() ? 200 : 240) + Math.random() * (isMobile() ? 200 : 260);
        maxLife = (isMobile() ? 160 : 200) + Math.random() * (isMobile() ? 160 : 200);
      }

      meteorsRef.current.push({ x: startX, y: startY, vx, vy, life: 0, maxLife, length, width, depthLevel });
    };

    const drawBackground = () => {
      if (!showBackground) return;
      const g = ctx.createRadialGradient(
        canvas.width / (2 * dprBase),
        canvas.height / (3 * dprBase),
        0,
        canvas.width / (2 * dprBase),
        canvas.height / (2 * dprBase),
        Math.max(canvas.width, canvas.height) / dprBase
      );
      g.addColorStop(0, "#1a1a2f");
      g.addColorStop(1, "#050509");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const drawStar = (cx: number, cy: number, size: number, color: string) => {
      const spikes = 5, outerRadius = size, innerRadius = size * 0.45;
      let rot = (Math.PI / 2) * 3, x = cx, y = cy, step = Math.PI / spikes;

      ctx.save();
      ctx.shadowBlur = size * 3;
      ctx.shadowColor = color;
      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius; y = cy + Math.sin(rot) * outerRadius; ctx.lineTo(x, y); rot += step;
        x = cx + Math.cos(rot) * innerRadius; y = cy + Math.sin(rot) * innerRadius; ctx.lineTo(x, y); rot += step;
      }
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      ctx.restore();
    };

    const drawTaperedTail = (
      headX: number, headY: number,
      nx: number, ny: number,
      length: number, baseWidth: number,
      hue: number, brightnessHead: number
    ) => {
      const tailX = headX - nx * length;
      const tailY = headY - ny * length;
      const px = -ny, py = nx;
      const headHalfW = baseWidth * 0.6, tailHalfW = baseWidth * 0.15;

      const hx1 = headX + px * headHalfW, hy1 = headY + py * headHalfW;
      const hx2 = headX - px * headHalfW, hy2 = headY - py * headHalfW;
      const tx1 = tailX + px * tailHalfW, ty1 = tailY + py * tailHalfW;
      const tx2 = tailX - px * tailHalfW, ty2 = tailY - py * tailHalfW;

      const grad = ctx.createLinearGradient(headX, headY, tailX, tailY);
      grad.addColorStop(0, `hsla(${hue}, 90%, ${brightnessHead - 5}%, 1)`);
      grad.addColorStop(1, `hsla(${hue}, 95%, ${brightnessHead + 25}%, 0)`);

      ctx.save();
      ctx.shadowBlur = baseWidth * 4.5;
      ctx.shadowColor = `hsla(${hue}, 100%, ${brightnessHead}%, 0.9)`;
      ctx.beginPath();
      ctx.moveTo(hx1, hy1); ctx.lineTo(tx1, ty1); ctx.lineTo(tx2, ty2); ctx.lineTo(hx2, hy2);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();
    };

    const drawMeteor = (m: Meteor, tailScale = 1) => {
      const speedLen = Math.hypot(m.vx, m.vy);
      const nx = m.vx / speedLen, ny = m.vy / speedLen;

      const hue = 45 + Math.random() * 5;
      const brightnessHead = m.depthLevel === 2 ? 85 : m.depthLevel === 1 ? 75 : 60;

      const baseWidth =
        m.depthLevel === 2 ? m.width * 4.0 :
        m.depthLevel === 1 ? m.width * 3.5 : m.width * 3.0;

      // 滑動時暫時減少尾長（避免畫太長的漸層負擔）
      drawTaperedTail(m.x, m.y, nx, ny, m.length * tailScale, baseWidth, hue, brightnessHead);

      const starSizeBase =
        m.depthLevel === 2 ? m.width * 3.2 :
        m.depthLevel === 1 ? m.width * 2.4 : m.width * 1.8;
      const starSize = starSizeBase * 3;
      drawStar(m.x, m.y, starSize, `hsla(${hue}, 90%, ${brightnessHead - 10}%, 1)`);
    };

    const loop = (now: number) => {
      // 根據「距離上次捲動多久」決定降幀與降載強度
      const sinceScroll = lastScrollTsRef.current < 0 ? 1e9 : now - lastScrollTsRef.current;
      // 0~1：0=完全沒在捲，1=剛捲完
      const scrollLoad = Math.max(0, Math.min(1, Math.exp(-sinceScroll / 300) * 1.0));

      // 目標幀率：平時 60fps；剛捲動時 ~24fps
      const targetFps = scrollLoad > 0.2 ? 24 : 60;
      const minDelta = 1000 / targetFps;
      if (now - lastRenderRef.current < minDelta) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }
      lastRenderRef.current = now;

      // 生成頻率：滑動時放大間隔（=變少顆）
      const spawnGap = (isMobile() ? Math.max(240, intensity * 1.4) : intensity) * (1 + 1.2 * scrollLoad);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBackground();

      if (now - lastSpawnRef.current >= spawnGap) {
        spawnMeteor();
        if (!isMobile() && Math.random() < 0.35 && scrollLoad < 0.3) spawnMeteor(); // 桌機偶爾多生一顆（捲動時暫停加碼）
        lastSpawnRef.current = now;
      }

      // 尾巴縮短比例：滑動時 70% 長度，平時 100%
      const tailScale = 1 - 0.3 * scrollLoad;

      const h = window.innerHeight;
      for (const m of meteorsRef.current) {
        m.x += m.vx; m.y += m.vy; m.life += 1;
        drawMeteor(m, tailScale);
      }
      meteorsRef.current = meteorsRef.current.filter(m => m.life < m.maxLife && m.x > -1000 && m.y < h + 1000);

      rafRef.current = requestAnimationFrame(loop);
    };

    const onScroll = () => {
      lastScrollTsRef.current = performance.now(); // 標記「剛捲」
    };

    const onResize = () => resize();

    resize();
    // 初始先放幾顆，避免空景
    for (let i = 0; i < (isMobile() ? 1 : 3); i++) spawnMeteor();

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchmove", onScroll, { passive: true });

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchmove", onScroll);
      meteorsRef.current = [];
    };
  }, [intensity, showBackground]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 15,
        pointerEvents: "none",
        willChange: "transform",
        transform: "translateZ(0)",
        width: "100vw",
        height: "100vh",
      }}
    />
  );
}
