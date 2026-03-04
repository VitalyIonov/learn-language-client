import { clsx } from "clsx";
import { Button } from "@headlessui/react";
import { useParams, Link } from "react-router";

import { useGetCategory, useGetLevelsList } from "~/types/client-api";
import { LevelsGrid } from "~/routes/category/components/levels-grid/levels-grid";

import { PageTitle, PageContent } from "~/shared/components";
import { useI18n } from "~/shared/hooks/useI18n";

export default function Category() {
  const { t } = useI18n("page.category");
  const { id } = useParams();

  const { data: categoryData } = useGetCategory(Number(id));
  const { data: levelsData } = useGetLevelsList({ category_id: Number(id) });

  const levels = levelsData?.items ?? [];

  return (
    <PageContent>
      <PageTitle title={categoryData?.name || ""} />
      <LevelsGrid levels={levels} className="mb-24 sm:mb-0" />
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
            "flex items-center justify-center gap-2",
            "px-3 py-1.5",
            "h-16 w-full",
            "text-base font-semibold text-white",
            "bg-indigo-700",
            "rounded-md",
            "shadow-inner",
            "cursor-pointer",
            "focus:not-data-focus:outline-none data-disabled:cursor-not-allowed data-disabled:bg-slate-500 data-focus:outline data-focus:outline-white data-hover:bg-indigo-800 data-open:bg-gray-700",
            "lg:h-auto lg:w-auto lg:text-sm/6",
          )}
        >
          <Link to="questions">{t("buttons.startLearn")}</Link>
        </Button>
      </div>
    </PageContent>
  );
}
