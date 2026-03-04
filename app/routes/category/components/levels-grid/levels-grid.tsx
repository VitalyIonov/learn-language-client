import { useI18n } from "~/shared/hooks/useI18n";
import type { AppSchemasClientLevelLevelOut } from "~/types/client-schemas";
import { LevelCard } from "~/routes/category/components/levels-grid/level-card";

type Props = {
  levels: AppSchemasClientLevelLevelOut[];
  selectedLevelId: number | undefined;
  onSelectLevel: (levelId: number) => void;
  className?: string;
};

export const LevelsGrid = ({
  levels,
  selectedLevelId,
  onSelectLevel,
  className,
}: Props) => {
  const { t } = useI18n("page.category");

  if (!levels.length) return null;

  return (
    <div className={className}>
      <h2 className="mb-4 text-lg font-semibold text-zinc-200">
        {t("sections.levels.title")}
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {levels.map((level) => (
          <LevelCard
            key={level.id}
            level={level}
            isSelected={level.id === selectedLevelId}
            onSelect={() => onSelectLevel(level.id)}
          />
        ))}
      </div>
    </div>
  );
};
