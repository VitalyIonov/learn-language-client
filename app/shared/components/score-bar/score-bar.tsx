import { clsx } from "clsx";

type Props = {
  currentScore: number;
  maxScore: number;
  className?: string;
};

export function ScoreBar({ currentScore, maxScore, className }: Props) {
  const percent =
    maxScore > 0 ? Math.round((currentScore / maxScore) * 100) : 0;

  return (
    <div className={clsx("flex flex-col gap-2", className)}>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-zinc-700">
        <div
          className={clsx(
            "absolute inset-0",
            "bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-500",
            "opacity-80 transition-[clip-path] duration-500 ease-out",
          )}
          style={{ clipPath: `inset(0 ${100 - percent}% 0 0)` }}
        />
      </div>
      <span className="text-xs text-zinc-500 tabular-nums">
        {currentScore} / {maxScore}
      </span>
    </div>
  );
}
