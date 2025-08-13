import { Button } from "@headlessui/react";
import { useParams, Link } from "react-router";

import {
  useReadCategoryCategoriesCategoryIdGet,
  useGetCategoryCurrentProgress,
} from "~/types/client-api";
import { CurrentLevelSection } from "~/routes/questions/components/current-level-section/current-level-section";
import { CurrentProgressSection } from "~/routes/questions/components/current-progress-section/current-progress-section";
import { useNotificationStore } from "~/shared/stores";

import { PageTitle } from "~/shared/components/page-title/page-title";

export default function Category() {
  const { id } = useParams();
  const { notifications, levelUp } = useNotificationStore();

  console.log("notifications", notifications);

  const { data: categoryData } = useReadCategoryCategoriesCategoryIdGet(
    Number(id),
  );

  const { data: categoryCurrentProgress } = useGetCategoryCurrentProgress(
    Number(id),
  );

  const handleClick = () => {
    levelUp("Урра", "Вот повезло!");
  };

  return (
    <div>
      <PageTitle className="mb-24" title={categoryData?.name || ""} />
      <div className="grid grid-cols-3 grid-rows-[auto_auto] gap-8">
        <CurrentLevelSection level={categoryData?.currentLevel || ""} />
        <CurrentProgressSection
          className="col-span-2"
          progress={categoryCurrentProgress?.progress || 0}
        />
      </div>
      <Button className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-indigo-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner focus:not-data-focus:outline-none data-disabled:cursor-not-allowed data-disabled:bg-slate-500 data-focus:outline data-focus:outline-white data-hover:bg-indigo-800 data-open:bg-gray-700">
        <Link to="questions">Перейти к изучению</Link>
      </Button>
      <Button
        className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-indigo-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner focus:not-data-focus:outline-none data-disabled:cursor-not-allowed data-disabled:bg-slate-500 data-focus:outline data-focus:outline-white data-hover:bg-indigo-800 data-open:bg-gray-700"
        onClick={handleClick}
      >
        Нотификация
      </Button>
    </div>
  );
}
