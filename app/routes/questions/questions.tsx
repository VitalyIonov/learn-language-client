import { clsx } from "clsx";
import { useCallback, useEffect } from "react";
import { useParams, useSearchParams } from "react-router";

import { LevelTabs } from "~/routes/questions/components/level-tabs";
import { Question } from "~/routes/questions/components/question/question";
import { PageContent } from "~/shared/components";
import { getActiveLevel } from "~/shared/utils/levels";
import { useGetLevelsList } from "~/types/client-api";

export default function Questions() {
  const { id } = useParams();
  const categoryId = Number(id);
  const [searchParams, setSearchParams] = useSearchParams();
  const levelIdFromUrl = searchParams.get("levelId");

  const { data: levelsData } = useGetLevelsList({
    category_id: categoryId,
  });

  const activeLevel = getActiveLevel(levelsData?.items ?? []);

  useEffect(() => {
    if (!levelIdFromUrl && activeLevel?.id) {
      setSearchParams({ levelId: String(activeLevel.id) }, { replace: true });
    }
  }, [activeLevel?.id, levelIdFromUrl, setSearchParams]);

  const currentLevelId = levelIdFromUrl ? Number(levelIdFromUrl) : activeLevel?.id;

  const currentLevel = levelsData?.items.find(
    ({ id }) => id === currentLevelId,
  );

  const handleLevelChange = useCallback(
    (id: number) => {
      setSearchParams({ levelId: String(id) });
    },
    [setSearchParams],
  );

  return (
    <PageContent>
      <div className={clsx("w-full")}>
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-24">
          <LevelTabs
            currentLevel={currentLevel}
            levelsData={levelsData}
            onCurrentLevelChange={handleLevelChange}
          />
          <div className="flex min-w-0 flex-1 items-center">
            <Question
              className="lg:pr-24"
              categoryId={categoryId}
              levelId={currentLevel?.id}
            />
          </div>
        </div>
      </div>
    </PageContent>
  );
}
