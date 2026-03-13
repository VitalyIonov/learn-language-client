import { clsx } from "clsx";
import { DataSection } from "~/shared/components/data-section/data-section";
import { ScoreBar } from "~/shared/components/score-bar/score-bar";
import type { LevelOut } from "~/types/client-schemas";

type Props = {
  level: LevelOut;
  isSelected: boolean;
  onSelect: () => void;
};

export const LevelCard = ({ level, isSelected, onSelect }: Props) => {
  const percent =
    level.maxScore > 0
      ? Math.round((level.currentScore / level.maxScore) * 100)
      : 0;

  return (
    <DataSection
      className={clsx(
        "cursor-pointer border border-transparent",
        isSelected
          ? "border-emerald-400/30 bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-600/10 transition-colors duration-300"
          : "",
      )}
      onClick={onSelect}
    >
      <div className="flex items-baseline justify-between">
        <span
          className={clsx(
            "text-3xl font-bold",
            isSelected ? "text-zinc-100" : "text-zinc-300",
          )}
        >
          {level.alias}
        </span>
        <span className="text-sm text-zinc-400 tabular-nums">{percent}%</span>
      </div>
      <span className="text-sm text-zinc-400">{level.name}</span>
      <ScoreBar currentScore={level.currentScore} maxScore={level.maxScore} />
    </DataSection>
  );
};
