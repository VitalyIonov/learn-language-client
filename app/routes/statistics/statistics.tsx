import { CommonStatisticsSection } from "~/routes/statistics/components/common-statistics-section/common-statistics-section";
import { TodayStatisticsSection } from "~/entities/today-statistics-section/today-statistics-section";
// import { WordStatistics } from "~/features/word-statistics/word-statistics";
import { useI18n } from "~/shared/hooks/useI18n";

import { PageTitle, PageContent } from "~/shared/components";
import {
  useGetStatisticsProgress,
  useGetStatisticsTodayProgress,
} from "~/types/client-api";

export default function Statistics() {
  const { t } = useI18n("page.statistics");
  const { data: allProgressData } = useGetStatisticsProgress();
  const { data: todayProgressData } = useGetStatisticsTodayProgress();

  return (
    <PageContent>
      <PageTitle title={t("title")} />
      <div className="grid grid-cols-1 grid-rows-[auto_auto] gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        <CommonStatisticsSection progress={allProgressData?.progress} />
        <TodayStatisticsSection progress={todayProgressData?.progress} />
        {/* <WordStatistics className="col-span-3 p-0" /> */}
      </div>
    </PageContent>
  );
}
