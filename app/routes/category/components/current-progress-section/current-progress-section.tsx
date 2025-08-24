import { BeakerIcon } from "@heroicons/react/24/outline";
import { DataSection } from "~/shared/components/data-section/data-section";
import { ProgressBar } from "~/shared/components/progress-bar/progress-bar";

type Props = {
  className?: string;
  progress: number;
  currentLevel?: string;
  nextLevel?: string | null;
};

export const CurrentProgressSection = ({
  className,
  currentLevel,
  nextLevel,
  progress,
}: Props) => {
  return (
    <DataSection className={className}>
      <div className="flex h-full w-full flex-col justify-between gap-8 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <BeakerIcon className="h-6 w-6 text-emerald-400" />
          </div>
          <h2 className="text-base font-semibold text-zinc-100 md:text-lg">
            Текущий прогресс
          </h2>
        </div>
        <ProgressBar
          currentLevel={currentLevel}
          nextLevel={nextLevel}
          percent={progress}
        />
      </div>
    </DataSection>
  );
};
