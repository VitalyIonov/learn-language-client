import { clsx } from "clsx";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";

import { getActiveLevel } from "~/shared/utils/levels";
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
  const activeLevel = getActiveLevel(levels);

  const [selectedLevelId, setSelectedLevelId] = useState<number>();

  useEffect(() => {
    setSelectedLevelId(activeLevel?.id);
  }, [activeLevel?.id]);

  const questionsUrl = selectedLevelId
    ? `questions?levelId=${selectedLevelId}`
    : "questions";

  return (
    <PageContent>
      <div className="mb-12 flex items-center justify-between lg:mb-24">
        <PageTitle
          title={categoryData?.name || ""}
          className="mb-0 lg:mb-0"
        />
        <Link
          to={questionsUrl}
          className={clsx(
            "hidden",
            "items-center justify-center gap-2",
            "rounded-md px-3 py-1.5",
            "text-sm/6 font-semibold text-white",
            "bg-indigo-700 shadow-inner",
            "cursor-pointer",
            "hover:bg-indigo-800",
            "focus:outline focus:outline-white",
            "sm:inline-flex",
          )}
        >
          {t("buttons.startLearn")}
        </Link>
      </div>
      <LevelsGrid
        levels={levels}
        selectedLevelId={selectedLevelId}
        onSelectLevel={setSelectedLevelId}
        className="mb-24 sm:mb-0"
      />
      <div
        className={clsx(
          "fixed right-0 bottom-0 left-0",
          "flex justify-center",
          "p-4",
          "bg-slate-900",
          "sm:hidden",
        )}
      >
        <Link
          to={questionsUrl}
          className={clsx(
            "inline-flex",
            "items-center justify-center gap-2",
            "px-3 py-1.5",
            "h-16 w-full",
            "text-base font-semibold text-white",
            "bg-indigo-700",
            "rounded-md",
            "shadow-inner",
          )}
        >
          {t("buttons.startLearn")}
        </Link>
      </div>
    </PageContent>
  );
}
