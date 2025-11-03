"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

type Slide = {
  alt: string;
  baseName: string; // e.g. "page1-1"
};

const SLIDES: Slide[] = [
  { alt: "MUMBAO Stay Hero 1", baseName: "page1-1" },
  { alt: "MUMBAO Stay Hero 2", baseName: "page1-2" },
  { alt: "MUMBAO Stay Hero 3", baseName: "page1-3" },
];

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
    <div className="absolute inset-0 w-full h-full">
      <div className="relative w-full h-full">
        {slides.map((s, i) => {
          const isActive = i === index;
          return (
            <div
              key={s.baseName}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <Image
                src={`/images/page1/${s.baseName}.webp`}
                alt={s.alt}
                fill
                sizes="100vw"
                priority={isActive && i === 0}
                className="object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}


