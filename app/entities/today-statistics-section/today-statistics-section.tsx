import { DataSection } from "~/shared/components/data-section/data-section";
import { useI18n } from "~/shared/hooks/useI18n";

type Props = {
  className?: string;
  progress?: number;
};

export const TodayStatisticsSection = ({ className, progress }: Props) => {
  const { t } = useI18n("page.statistics");

  return (
    <DataSection className={className}>
      <div className="flex flex-col justify-between gap-8">
        <h2>{t("sections.todayProgress.title")}</h2>
        {progress != undefined ? (
          <p className="self-end pr-4 pb-4 text-5xl text-emerald-500">{`${progress}%`}</p>
        ) : null}
      </div>
    </DataSection>
  );
};
