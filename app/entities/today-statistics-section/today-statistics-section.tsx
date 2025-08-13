import { DataSection } from "~/shared/components/data-section/data-section";

type Props = {
  className?: string;
};

export const TodayStatisticsSection = ({ className }: Props) => {
  return (
    <DataSection className={className}>
      <div className="flex flex-col justify-between gap-8">
        <h2>Прогресс за сегодня</h2>
        <p className="self-end pr-4 pb-4 text-5xl text-emerald-500">0.405%</p>
      </div>
    </DataSection>
  );
};
