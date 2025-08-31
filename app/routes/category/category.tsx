import { clsx } from "clsx";
import { Button } from "@headlessui/react";
import { useParams, Link } from "react-router";

import {
  useReadCategoryCategoriesCategoryIdGet,
  useGetCategoryCurrentProgress,
} from "~/types/client-api";
import { CurrentLevelSection } from "~/routes/category/components/current-level-section/current-level-section";
import { CurrentProgressSection } from "~/routes/category/components/current-progress-section/current-progress-section";

import { PageTitle, PageContent } from "~/shared/components";

export default function Category() {
  const { id } = useParams();

  const { data: categoryData } = useReadCategoryCategoriesCategoryIdGet(
    Number(id),
  );

  const { data: categoryCurrentProgress } = useGetCategoryCurrentProgress(
    Number(id),
  );

  return (
    <PageContent>
      <PageTitle title={categoryData?.name || ""} />
      <div
        className={clsx(
          "grid grid-cols-1 gap-6",
          "mb-24",
          "sm:mb-0",
          "md:grid-cols-2",
          "lg:grid-cols-3 lg:gap-8",
        )}
      >
        {categoryData ? (
          <CurrentLevelSection level={categoryData?.currentLevel.alias || ""} />
        ) : null}
        {categoryCurrentProgress ? (
          <CurrentProgressSection
            className="col-span-1 lg:col-span-2"
            progress={categoryCurrentProgress?.progress || 0}
            currentLevel={categoryCurrentProgress?.currentLevel}
            nextLevel={categoryCurrentProgress?.nextLevel}
          />
        ) : null}
      </div>
      <div
        className={clsx(
          "fixed right-0 bottom-0 left-0",
          "flex justify-center",
          "mt-8 p-4",
          "bg-slate-900",
          "sm:static sm:justify-end",
        )}
      >
        <Button
          className={clsx(
            "inline-flex",
            "flex items-center gap-2",
            "px-3 py-1.5",
            "h-16 w-full",
            "text-sm/6 font-semibold text-white",
            "bg-indigo-700",
            "rounded-md",
            "shadow-inner",
            "cursor-pointer",
            "focus:not-data-focus:outline-none data-disabled:cursor-not-allowed data-disabled:bg-slate-500 data-focus:outline data-focus:outline-white data-hover:bg-indigo-800 data-open:bg-gray-700",
            "lg:h-auto lg:w-auto",
          )}
        >
          <Link to="questions">Перейти к изучению</Link>
        </Button>
      </div>
    </PageContent>
  );
}
