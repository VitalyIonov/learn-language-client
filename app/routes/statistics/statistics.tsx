import { CommonStatisticsSection } from "~/routes/statistics/components/common-statistics-section/common-statistics-section";
import { TodayStatisticsSection } from "~/entities/today-statistics-section/today-statistics-section";
import { WordStatistics } from "~/features/word-statistics/word-statistics";

import { PageTitle, PageContent } from "~/shared/components";
import {
  useGetProgressByUser,
  useGetTodayProgressByUser,
} from "~/types/client-api";

export default function Statistics() {
  const { data: allProgressData } = useGetProgressByUser();
  const { data: todayProgressData } = useGetTodayProgressByUser();

  return (
    <PageContent>
      <PageTitle title="Statistics" />
      <div className="grid grid-cols-1 grid-rows-[auto_auto] gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        <CommonStatisticsSection progress={allProgressData?.progress} />
        <TodayStatisticsSection progress={todayProgressData?.progress} />
        {/* <WordStatistics className="col-span-3 p-0" /> */}
      </div>
    </PageContent>
  );
}
