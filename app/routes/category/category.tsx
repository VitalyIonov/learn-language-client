import { Button } from "@headlessui/react";
import { useParams, Link } from "react-router";

import {
  useReadCategoryCategoriesCategoryIdGet,
  useGetCategoryCurrentProgress,
} from "~/types/client-api";
import { CurrentLevelSection } from "~/routes/category/components/current-level-section/current-level-section";
import { CurrentProgressSection } from "~/routes/category/components/current-progress-section/current-progress-section";

import { PageTitle } from "~/shared/components/page-title/page-title";

export default function Category() {
  const { id } = useParams();

  const { data: categoryData } = useReadCategoryCategoriesCategoryIdGet(
    Number(id),
  );

  const { data: categoryCurrentProgress } = useGetCategoryCurrentProgress(
    Number(id),
  );

  return (
    <div>
      <PageTitle className="mb-24" title={categoryData?.name || ""} />
      <div className="grid grid-cols-3 grid-rows-[auto_auto] gap-8">
        {categoryData ? (
          <CurrentLevelSection level={categoryData?.currentLevel.alias || ""} />
        ) : null}
        {categoryCurrentProgress ? (
          <CurrentProgressSection
            className="col-span-2"
            progress={categoryCurrentProgress?.progress || 0}
            currentLevel={categoryCurrentProgress?.currentLevel}
            nextLevel={categoryCurrentProgress?.nextLevel}
          />
        ) : null}
      </div>
      <Button className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-indigo-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner focus:not-data-focus:outline-none data-disabled:cursor-not-allowed data-disabled:bg-slate-500 data-focus:outline data-focus:outline-white data-hover:bg-indigo-800 data-open:bg-gray-700">
        <Link to="questions">Перейти к изучению</Link>
      </Button>
    </div>
  );
}
