import { DataSection } from "~/shared/components/data-section/data-section";

type Props = {
  className?: string;
};

export const CommonStatisticsSection = ({ className }: Props) => {
  return (
    <DataSection className={className}>
      <div className="flex flex-col justify-between gap-8">
        <h2>Общий прогресс</h2>
        <p className="self-end pr-4 pb-4 text-5xl text-emerald-500">13%</p>
      </div>
    </DataSection>
  );
};
