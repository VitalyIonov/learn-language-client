import { CommonStatisticsSection } from "~/entities/common-statistics-section/common-statistics-section";
import { TodayStatisticsSection } from "~/entities/today-statistics-section/today-statistics-section";
import { WordStatistics } from "~/features/word-statistics/word-statistics";

import { PageTitle } from "~/shared/components/page-title/page-title";

export default function Statistics() {
  return (
    <div>
      <PageTitle className="mb-24" title="Statistics" />
      <div className="grid grid-cols-3 grid-rows-[auto_auto] gap-8">
        <CommonStatisticsSection />
        <TodayStatisticsSection />
        <WordStatistics className="col-span-3 p-0" />
      </div>
    </div>
  );
}
