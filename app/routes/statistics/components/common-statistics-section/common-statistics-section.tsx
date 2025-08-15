import { DataSection } from "~/shared/components/data-section/data-section";

type Props = {
  progress?: number;
  className?: string;
};

export const CommonStatisticsSection = ({ className, progress }: Props) => {
  return (
    <DataSection className={className}>
      <div className="flex flex-col justify-between gap-8">
        <h2>Общий прогресс</h2>
        {progress !== undefined ? (
          <p className="self-end pr-4 pb-4 text-5xl text-emerald-500">{`${progress}%`}</p>
        ) : null}
      </div>
    </DataSection>
  );
};
