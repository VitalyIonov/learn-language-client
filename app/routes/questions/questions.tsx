import { clsx } from "clsx";
import { useState, useEffect } from "react";
import { useParams } from "react-router";

import { LevelTabs } from "~/routes/questions/components/level-tabs";
import { Question } from "~/routes/questions/components/question/question";
import { PageContent } from "~/shared/components";
import { useGetLevelsList } from "~/types/client-api";

export default function Questions() {
  const { id } = useParams();
  const categoryId = Number(id);

  const [currentLevelId, setCurrentLevelId] = useState<number>();

  const { data: levelsData, refetch: invalidateLevels } = useGetLevelsList({
    category_id: categoryId,
  });

  const activeLevel = levelsData?.items.find(({ isActive }) => isActive);

  useEffect(() => {
    setCurrentLevelId(activeLevel?.id);
  }, [activeLevel?.id]);

  const currentLevel = levelsData?.items.find(
    ({ id }) => id === currentLevelId,
  );

  return (
    <PageContent>
      <div className={clsx("w-full")}>
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-24">
          <LevelTabs
            currentLevel={currentLevel}
            levelsData={levelsData}
            onCurrentLevelChange={setCurrentLevelId}
          />
          <div className="flex min-w-0 flex-1 items-center">
            <Question
              className="lg:pr-24"
              categoryId={categoryId}
              levelId={currentLevel?.id}
              invalidateLevels={invalidateLevels}
            />
          </div>
        </div>
      </div>
    </PageContent>
  );
}
