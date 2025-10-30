"use client";

import React, { useEffect, useRef } from "react";

type MeteorShowerProps = {
  intensity?: number; // 生成間隔 (ms)；數字越小越密集
  showBackground?: boolean; // 是否顯示夜空漸層背景
};

type Meteor = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  length: number;
  width: number;
  depthLevel: number; // 0=遠,1=中,2=近
};

export default function MeteorShower({ intensity = 200, showBackground = true }: MeteorShowerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const meteorsRef = useRef<Meteor[]>([]);
  const lastSpawnRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawnMeteor = () => {
      // 出生位置：整個上方(含螢幕上方外圍)
      const startX = window.innerWidth * (-0.2 + Math.random() * 1.4); // -20% ~ 120% 螢幕寬
      const startY = -100 - Math.random() * 100; // 從畫面上緣外一點進來

      // 角度群組：有的陡、有的平，影響它會掉到左邊還是滑到很下面
      const isSteep = Math.random() < 0.5;
      const baseMin = isSteep ? 120 : 140;
      const baseMax = isSteep ? 140 : 165;
      const angleDeg = baseMin + Math.random() * (baseMax - baseMin);
      const angle = (Math.PI / 180) * angleDeg;

      // 速度：2~5 (越大越快)
      const speed = 2 + Math.random() * 3;
      const vx = Math.cos(angle) * speed; // 應該是往左
      const vy = Math.sin(angle) * speed; // 應該是往下

      // 決定這顆流星的"景深等級"
      // 0 = 很遠 (小、暗、壽命短)
      // 1 = 中 (正常)
      // 2 = 近 (大顆、亮、拖很長)
      const depthLevel = Math.random() < 0.15 ? 2   // 15% 機率：超近，很大顆主角
                        : Math.random() < 0.50 ? 1 // 35% 機率：中等
                        : 0;                       // 50% 機率：遠方小流星

      let width;
      let length;
      let maxLife;

      if (depthLevel === 0) {
        // 遠的：細、短、壽命短，像背景小塵
        width = 1 + Math.random() * 0.8;             // ~1 - 1.8
        length = 80 + Math.random() * 80;            // 比較短
        maxLife = 60 + Math.random() * 60;           // 比較快淡掉
      } else if (depthLevel === 1) {
        // 中距：一般你現在看到的那種
        width = 1.5 + Math.random() * 1.5;           // ~1.5 - 3
        length = 160 + Math.random() * 160;
        maxLife = 120 + Math.random() * 120;
      } else {
        // 近的：主角級，粗、長、留很久
        width = 2.5 + Math.random() * 2;             // ~2.5 - 4.5
        length = 240 + Math.random() * 260;          // 超長拖尾
        maxLife = 200 + Math.random() * 200;         // 可以飛到超下面才消失
      }

      meteorsRef.current.push({
        x: startX,
        y: startY,
        vx,
        vy,
        life: 0,
        maxLife,
        length,
        width,
        // ⬇ 這是新的，給 drawMeteor 用
        depthLevel,
      } as any); // 如果 TS 抱怨，先加 as any，或把型別補上
    };


    const drawBackground = () => {
      if (!showBackground) return;
      const g = ctx.createRadialGradient(canvas.width / (2 * dpr), canvas.height / (3 * dpr), 0, canvas.width / (2 * dpr), canvas.height / (2 * dpr), Math.max(canvas.width, canvas.height) / dpr);
      g.addColorStop(0, "#1a1a2f");
      g.addColorStop(1, "#050509");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const drawMeteor = (m: Meteor) => {
      const nx = m.vx / Math.hypot(m.vx, m.vy);
      const ny = m.vy / Math.hypot(m.vx, m.vy);
      const headX = m.x;
      const headY = m.y;
      const tailX = m.x - nx * m.length;
      const tailY = m.y - ny * m.length;

      // 色相：固定在藍光系，接近鎂/氧電離顏色
      const hue = 190 + Math.random() * 40;

      // 依距離等級決定亮度與發光強度
      // 遠的：暗一點、模糊小一點
      // 近的：超亮、光暈大
      const brightnessHead = m.depthLevel === 2 ? 85
                            : m.depthLevel === 1 ? 75
                            : 60;
      const brightnessTail = m.depthLevel === 2 ? 60
                            : m.depthLevel === 1 ? 55
                            : 40;

      const headColor = `hsla(${hue}, 100%, ${brightnessHead}%, 1)`;
      const tailColor = `hsla(${hue}, 100%, ${brightnessTail}%, 0)`;

      const grad = ctx.createLinearGradient(headX, headY, tailX, tailY);
      grad.addColorStop(0, headColor);
      grad.addColorStop(1, tailColor);

      // 光暈大小也依距離等級調整
      const glowSize =
        m.depthLevel === 2 ? 24 :
        m.depthLevel === 1 ? 16 :
        8;
      const glowAlpha =
        m.depthLevel === 2 ? 0.8 :
        m.depthLevel === 1 ? 0.55 :
        0.3;

      // --- 畫主尾巴線 ---
      ctx.strokeStyle = grad;
      ctx.lineWidth = m.width;
      ctx.lineCap = "round";
      ctx.shadowBlur = glowSize;
      ctx.shadowColor = `hsla(${hue}, 100%, ${brightnessHead}%, ${glowAlpha})`;

      ctx.beginPath();
      ctx.moveTo(headX, headY);
      ctx.lineTo(tailX, tailY);
      ctx.stroke();

      // --- 畫頭部亮段 (不是圓點，而是短亮段，方向跟尾巴一致) ---
      const headLength = m.width * 4; // 頭端高亮的段長度
      const midX = headX - nx * headLength;
      const midY = headY - ny * headLength;

      const headGrad = ctx.createLinearGradient(headX, headY, midX, midY);
      headGrad.addColorStop(0, `hsla(${hue}, 100%, ${brightnessHead + 10}%, 1)`);
      headGrad.addColorStop(1, `hsla(${hue}, 100%, ${brightnessHead}%, 0)`);

      // 頭部線寬：近的更粗
      const headLineWidth =
        m.depthLevel === 2 ? m.width * 2.6 :
        m.depthLevel === 1 ? m.width * 2.1 :
                            m.width * 1.6;

      ctx.strokeStyle = headGrad;
      ctx.lineWidth = headLineWidth;
      ctx.beginPath();
      ctx.moveTo(headX, headY);
      ctx.lineTo(midX, midY);
      ctx.stroke();

      // 關掉陰影，避免殘留到下一顆
      ctx.shadowBlur = 0;
      ctx.shadowColor = "transparent";
    };



    const loop = (t: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBackground();

      // 生成頻率由 intensity 控制：每 intensity ms 生成 1~2 顆
      if (t - lastSpawnRef.current >= Math.max(60, intensity)) {
        spawnMeteor();
        if (Math.random() < 0.35) spawnMeteor();
        lastSpawnRef.current = t;
      }

      // 更新 & 繪製
      meteorsRef.current.forEach((m) => {
        m.x += m.vx;
        m.y += m.vy;
        m.life += 1;
        drawMeteor(m);
      });

      // 移除離開畫面或壽命到期
      const w = window.innerWidth;
      const h = window.innerHeight;
      meteorsRef.current = meteorsRef.current.filter((m) => {
        const stillAlive = m.life < m.maxLife;
        const notTooFarLeft = m.x > -1000;   // 以前 -600，現在讓它可以飛到超左邊
        const notTooFarDown = m.y < h + 1000; // 以前 +600，現在可以掉更下面
        return stillAlive && notTooFarLeft && notTooFarDown;
      });

      rafRef.current = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener("resize", resize);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      meteorsRef.current = [];
    };
  }, [intensity, showBackground]);

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
        zIndex: 5, // above starfield (0), below content wrapper (10)
        pointerEvents: "none",
      }}
    />
  );
}


