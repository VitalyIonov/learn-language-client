import { DataSection } from "~/shared/components/data-section/data-section";
import { ProgressBar } from "~/shared/components/progress-bar/progress-bar";

type Props = { className?: string; progress: number };

export const CurrentProgressSection = ({ className, progress }: Props) => {
  return (
    <DataSection className={className}>
      <div className="flex w-full flex-col justify-between gap-8">
        <h2>Текущий прогресс</h2>
        <ProgressBar currentLevel="A2" nextLevel="B1" percent={progress} />
        {/* <p className="self-end pr-4 pb-4 text-5xl">{progress}</p> */}
      </div>
    </DataSection>
  );
};
