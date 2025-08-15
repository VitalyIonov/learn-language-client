import { CommonStatisticsSection } from "~/routes/statistics/components/common-statistics-section/common-statistics-section";
import { TodayStatisticsSection } from "~/entities/today-statistics-section/today-statistics-section";
import { WordStatistics } from "~/features/word-statistics/word-statistics";

import { PageTitle } from "~/shared/components/page-title/page-title";
import {
  useGetProgressByUser,
  useGetTodayProgressByUser,
} from "~/types/client-api";

export default function Statistics() {
  const { data: allProgressData } = useGetProgressByUser();
  const { data: todayProgressData } = useGetTodayProgressByUser();

  return (
    <div>
      <PageTitle className="mb-24" title="Statistics" />
      <div className="grid grid-cols-3 grid-rows-[auto_auto] gap-8">
        <CommonStatisticsSection progress={allProgressData?.progress} />
        <TodayStatisticsSection progress={todayProgressData?.progress} />
        <WordStatistics className="col-span-3 p-0" />
      </div>
    </div>
  );
}
