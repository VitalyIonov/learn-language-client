import React from "react";
import { clsx } from "clsx";

type Props = {
  currentLevel?: string;
  nextLevel?: string | null;
  percent: number;
  segments?: number;
  className?: string;
};

export function ProgressBar({
  currentLevel,
  nextLevel,
  percent,
  segments = 6,
  className = "",
}: Props) {
  const pct = Math.max(0, Math.min(100, percent));
  const ticks = Array.from({ length: segments - 1 });

  return (
    <div className={clsx("w-full", className)}>
      <div className="mb-5 flex items-end justify-between">
        <div className="flex items-center gap-2">
          {currentLevel ? (
            <span className="inline-flex items-center rounded-lg bg-zinc-700 px-2.5 py-1 text-sm font-semibold text-zinc-100 shadow-inner">
              {currentLevel}
            </span>
          ) : null}
        </div>
        <div className="text-lg font-medium text-zinc-100 tabular-nums">
          {pct.toFixed(0)}%
        </div>
        <div className="flex items-center gap-2">
          {nextLevel ? (
            <span className="inline-flex items-center rounded-lg bg-zinc-700 px-2.5 py-1 text-sm font-semibold text-zinc-100 shadow-inner">
              {nextLevel}
            </span>
          ) : null}
        </div>
      </div>

      <div
        className="relative h-3 w-full rounded-full bg-zinc-600/80 shadow-inner"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pct)}
        aria-label={`Прогресс от ${currentLevel} к ${nextLevel}`}
      >
        <div
          className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-emerald-400 via-sky-400
                     to-indigo-500 transition-[width] duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />

        {ticks.map((_, i) => {
          const left = ((i + 1) * 100) / segments;
          return (
            <span
              key={i}
              className="absolute top-1/2 h-4 w-px -translate-y-1/2 bg-zinc-300/60"
              style={{ left: `${left}%` }}
            />
          );
        })}

        <div
          className="absolute top-1/2 size-5 -translate-x-1/2
                     -translate-y-1/2 rounded-full bg-white/90 shadow-md
                     ring-2 ring-white/40 transition-[left] duration-500 ease-out"
          style={{ left: `${pct}%` }}
        >
          <span className="absolute inset-0 rounded-full bg-emerald-400/40 blur-[6px]" />
        </div>
      </div>
    </div>
  );
}
