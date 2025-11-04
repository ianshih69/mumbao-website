"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Left image: 3:4 直式 */}
          <div className="relative w-full aspect-[3/4] overflow-hidden border border-[var(--border-main)]/40 bg-black/10">
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
              />
            ))}
          </div>

          {/* Right image: 5:3 橫式 */}
          <div className="relative w-full aspect-[5/3] overflow-hidden border border-[var(--border-main)]/40 bg-black/10">
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
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


