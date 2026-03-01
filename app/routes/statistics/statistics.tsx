import { CommonStatisticsSection } from "~/routes/statistics/components/common-statistics-section/common-statistics-section";
import { CategoriesProgressSection } from "~/routes/statistics/components/categories-progress-section/categories-progress-section";
import { TodayStatisticsSection } from "~/entities/today-statistics-section/today-statistics-section";
import { useI18n } from "~/shared/hooks/useI18n";
import { getTotalProgress } from "~/routes/statistics/utils/progress";

import { PageTitle, PageContent } from "~/shared/components";
import {
  useGetStatisticsTodayProgress,
  useGetStatisticsCategoriesProgress,
} from "~/types/client-api";

export default function Statistics() {
  const { t } = useI18n("page.statistics");
  const { data: todayProgressData } = useGetStatisticsTodayProgress();
  const { data: categoriesProgressData } = useGetStatisticsCategoriesProgress();

  const categories = categoriesProgressData?.items ?? [];
  const totalProgress = getTotalProgress(categories);

  return (
    <PageContent>
      <PageTitle title={t("title")} />
      <div className="grid grid-cols-1 grid-rows-[auto_auto] gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        <CommonStatisticsSection progress={totalProgress} />
        <TodayStatisticsSection progress={todayProgressData?.progress} />
        <CategoriesProgressSection
          className="col-span-full"
          categories={categoriesProgressData?.items}
        />
      </div>
    </PageContent>
  );
}
