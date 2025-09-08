import React, { useEffect, useRef, useState } from "react";

type WaveAuraProps = {
  children: React.ReactNode;
  active?: boolean;
  color1?: string;
  color2?: string;
  strokeWidth?: number;
  rings?: number;
  duration?: number;
  spreadPx?: number;
  padding?: number;
  radius?: number | "auto";
  behind?: boolean;
};

export function SoundWaves({
  children,
  active = true,
  color1 = "#6366F1",
  color2 = "#06B6D4",
  strokeWidth = 1,
  rings = 3,
  duration = 2.5,
  spreadPx = 8,
  padding = 0,
  radius = 10,
  behind = true,
}: WaveAuraProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0, r: 0 });

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const readRadius = () => {
      if (radius === "auto") {
        const cs = getComputedStyle((el.firstElementChild as Element) || el);
        const v = parseFloat(cs.borderTopLeftRadius || "0");
        return Number.isFinite(v) ? v : 0;
      }
      return typeof radius === "number" ? radius : 0;
    };

    const ro = new ResizeObserver((entries) => {
      const e = entries[0];

      let w = 0,
        h = 0;
      if ("borderBoxSize" in e && e.borderBoxSize) {
        const size = Array.isArray(e.borderBoxSize)
          ? e.borderBoxSize[0]
          : e.borderBoxSize;
        w = Math.ceil(size.inlineSize);
        h = Math.ceil(size.blockSize);
      } else {
        w = Math.ceil(e.contentRect.width);
        h = Math.ceil(e.contentRect.height);
      }

      const r = readRadius();

      setBox((prev) =>
        prev.w === w && prev.h === h && prev.r === r ? prev : { w, h, r },
      );
    });

    ro.observe(el, { box: "border-box" });

    return () => ro.disconnect();
  }, [radius]);

  const W = box.w + padding * 2;
  const H = box.h + padding * 2;
  const ringArr = Array.from({ length: rings });

  const sx = W > 0 ? (W + 2 * spreadPx) / W : 1;
  const sy = H > 0 ? (H + 2 * spreadPx) / H : 1;

  return (
    <div
      style={{ width: "100%", position: "relative", display: "inline-block" }}
    >
      <svg
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        aria-hidden
        style={{
          position: "absolute",
          top: -padding,
          left: -padding,
          pointerEvents: "none",
          zIndex: behind ? 0 : 2,
          overflow: "visible",
        }}
      >
        <defs>
          <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color1} />
            <stop offset="100%" stopColor={color2} />
          </linearGradient>

          {/* ✅ мягкое свечение, совместимо с Safari */}
          <filter
            id="wave-soft-blur"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feGaussianBlur stdDeviation="2" result="blur" />
            {/* смешиваем размытый слой с оригиналом, чтобы линия не «терялась» */}
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <style>
            {`
              @keyframes aura-wave {
                0%   { transform: scale(1,1); opacity: 0; }
                18%  { opacity: .32; }
                70%  { opacity: .12; }
                100% { transform: scale(var(--sx,1), var(--sy,1)); opacity: 0; }
              }
              @media (prefers-reduced-motion: reduce) {
                .aura-ring { animation: none !important; opacity: .15; }
              }
            `}
          </style>
        </defs>

        {active &&
          ringArr.map((_, i) => {
            return (
              <g
                key={i}
                className="aura-ring"
                style={{
                  ["--sx" as any]: String(sx),
                  ["--sy" as any]: String(sy),
                  transformOrigin: "50% 50%",
                  animationName: "aura-wave",
                  animationDuration: `${duration}s`,
                  animationDelay: `${(duration / rings) * i}s`, // по очереди
                  animationIterationCount: "infinite",
                  animationTimingFunction: "cubic-bezier(.4,0,.2,1)",
                  animationFillMode: "both",
                  opacity: 0,
                }}
              >
                <rect
                  x={strokeWidth / 2}
                  y={strokeWidth / 2}
                  width={W - strokeWidth}
                  height={H - strokeWidth}
                  rx={Math.max(0, box.r)}
                  ry={Math.max(0, box.r)}
                  fill="none"
                  stroke="url(#wave-gradient)"
                  strokeWidth={strokeWidth}
                  filter="url(#wave-soft-blur)" // ✅ SVG-фильтр — работает в Safari
                  strokeLinecap="round" // чуть мягче края
                  strokeLinejoin="round"
                />
              </g>
            );
          })}
      </svg>

      <div
        ref={contentRef}
        style={{
          position: "relative",
          zIndex: 1,
          display: "inline-block",
          width: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
}
