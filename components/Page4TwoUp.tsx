"use client";

import { useEffect, useState } from "react";

// Four groups, each with two images side-by-side
const GROUPS = [
  { left: "/images/page4/page4-1-1.jpg", right: "/images/page4/page4-1-2.jpg" },
  { left: "/images/page4/page4-2-1.jpg", right: "/images/page4/page4-2-2.jpg" },
  { left: "/images/page4/page4-3-1.jpg", right: "/images/page4/page4-3-2.jpg" },
  { left: "/images/page4/page4-4-1.jpg", right: "/images/page4/page4-4-2.jpg" },
];

export default function Page4TwoUp() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => {
      setIdx((i) => (i + 1) % GROUPS.length);
    }, 3000);
    return () => window.clearInterval(t);
  }, []);

  return (
    <section className="bg-[var(--bg-card)] py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left image: width:height = 0.78 : 1 (height ≈ 1.28 x width) */}
          <div className="relative w-full aspect-[78/100] overflow-hidden border border-[var(--border-main)]/40 bg-black/10">
            {GROUPS.map((g, i) => (
              <img
                key={`left-${i}`}
                src={g.left}
                alt="圖頁左圖"
                loading={i === idx ? "eager" : "lazy"}
                decoding="async"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                  i === idx ? "opacity-100" : "opacity-0"
                }`}
              />)
            )}
          </div>

          {/* Right image: width:height = 1.66 : 1 (width ≈ 1.66 x height) */}
          <div className="relative w-full aspect-[166/100] overflow-hidden border border-[var(--border-main)]/40 bg-black/10">
            {GROUPS.map((g, i) => (
              <img
                key={`right-${i}`}
                src={g.right}
                alt="圖頁右圖"
                loading={i === idx ? "eager" : "lazy"}
                decoding="async"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                  i === idx ? "opacity-100" : "opacity-0"
                }`}
              />)
            )}
          </div>
        </div>
      </div>
    </section>
  );
}


