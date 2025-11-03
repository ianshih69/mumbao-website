"use client";

import type { ReactNode } from "react";

type OverlayCardProps = {
  href?: string;
  ariaLabel: string;
  children: ReactNode; // Usually an <img /> filling the container
  className?: string; // container sizing/aspect classes from parent layout
  zoomOnHover?: boolean;
};

/**
 * OverlayCard: wraps media and shows a black overlay + white outlined box with text on hover/focus.
 * - Pure CSS (Tailwind) using group-hover and focus-within
 * - Mobile: first tap focuses (shows overlay), second tap follows the link
 * - Accessibility: focusable container (<a> or <div tabIndex=0>) with aria-label
 */
export default function OverlayCard({ href, ariaLabel, children, className = "", zoomOnHover = true }: OverlayCardProps) {
  const mediaWrapperZoom = zoomOnHover ? "group-hover:scale-[1.02] group-focus-within:scale-[1.02]" : "";

  const content = (
    <div
      className={[
        "group relative overflow-hidden",
        "cursor-pointer",
        className,
      ].join(" ")}
      aria-label={ariaLabel}
    >
      {/* Media */}
      <div className={["transition-transform duration-300 will-change-transform", mediaWrapperZoom].join(" ")}>{children}</div>

      {/* Overlay */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
        <div className="border border-white text-white text-base md:text-lg font-normal px-6 py-3 tracking-wide">
          詳細內容 ＋
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} aria-label={ariaLabel} className="block outline-none focus:outline-none focus-visible:ring-0">
        {content}
      </a>
    );
  }

  return (
    <div tabIndex={0} aria-label={ariaLabel} className="block outline-none focus:outline-none focus-visible:ring-0">
      {content}
    </div>
  );
}


