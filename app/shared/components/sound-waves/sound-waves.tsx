import React, { useLayoutEffect, useRef, useState } from "react";

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
  const wrapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0, r: 0 });

  useLayoutEffect(() => {
    const wrap = contentRef.current;
    if (!wrap) return;
    const measure = () => {
      const rect = wrap.getBoundingClientRect();
      let r = 0;
      if (radius === "auto") {
        const cs = getComputedStyle(
          (wrap.firstElementChild as Element) || wrap,
        );
        const tl = parseFloat(cs.borderTopLeftRadius || "0");
        r = Number.isFinite(tl) ? tl : 0;
      } else if (typeof radius === "number") {
        r = radius;
      }
      setBox({ w: Math.ceil(rect.width), h: Math.ceil(rect.height), r });
    };
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    measure();
    return () => ro.disconnect();
  }, [radius]);

  const W = box.w + padding * 2;
  const H = box.h + padding * 2;
  const ringArr = Array.from({ length: rings });

  const sx = W > 0 ? (W + 2 * spreadPx) / W : 1;
  const sy = H > 0 ? (H + 2 * spreadPx) / H : 1;

  return (
    <div
      ref={wrapRef}
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
                  // filter: "blur(2px)",  // ⛔️ убрать
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
