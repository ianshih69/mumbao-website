"use client";

import { useEffect, useMemo, useState } from "react";

type Slide = {
  alt: string;
  baseName: string; // e.g. "page1-1"
};

const SLIDES: Slide[] = [
  { alt: "MUMBAO Stay Hero 1", baseName: "page1-1" },
  { alt: "MUMBAO Stay Hero 2", baseName: "page1-2" },
  { alt: "MUMBAO Stay Hero 3", baseName: "page1-3" },
];

function buildSrcSet(baseName: string) {
  const prefix = `/images/page1/${baseName}`;
  return [
    `${prefix}-360.webp 360w`,
    `${prefix}-720.webp 720w`,
    `${prefix}-1280.webp 1280w`,
    `${prefix}-1920.webp 1920w`,
  ].join(", ");
}

const DEFAULT_SIZES = "100vw";

export default function HeroRotator() {
  const [index, setIndex] = useState(0);

  const slides = useMemo(() => SLIDES, []);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 3000);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <div className="absolute inset-0">
      <div className="relative w-full h-full">
        {slides.map((s, i) => {
          const isActive = i === index;
          const srcSet = buildSrcSet(s.baseName);
          const src = `/images/page1/${s.baseName}-1280.webp`;
          return (
            <img
              key={s.baseName}
              src={src}
              srcSet={srcSet}
              sizes={DEFAULT_SIZES}
              alt={s.alt}
              loading={isActive ? "eager" : "lazy"}
              decoding="async"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}


