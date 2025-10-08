import { clsx } from "clsx";
import { useState, useEffect } from "react";
import { useParams } from "react-router";

import { LevelTabs } from "~/routes/questions/components/level-tabs";
import { Question } from "~/routes/questions/components/question/question";
import { UnlockSection } from "~/routes/questions/components/unlock-section/unlock-section";
import { PageContent } from "~/shared/components";
import {
  useReadCategoryCategoriesCategoryIdGet,
  useReadLevelsLevelsGet,
} from "~/types/client-api";
import type { LevelOut } from "~/types/client-schemas";

export default function Questions() {
  const { id } = useParams();
  const categoryId = Number(id);
  const { data } = useReadCategoryCategoriesCategoryIdGet(categoryId);
  const initialLevel = data?.currentLevel;
  const currentCategoryName = data?.name;

  const [currentLevelId, setCurrentLevelId] = useState<
    LevelOut["id"] | undefined
  >(initialLevel?.id);

  const { data: levelsData, refetch: invalidateLevels } =
    useReadLevelsLevelsGet({
      category_id: categoryId,
    });

  const updateLevels = async (newLevel: LevelOut) => {
    await invalidateLevels().then(() => {
      setCurrentLevelId(newLevel.id);
    });
  };

  useEffect(() => {
    setCurrentLevelId(initialLevel?.id);
  }, [initialLevel]);

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
            {currentLevel?.isLocked ? (
              <UnlockSection
                level={currentLevel}
                categoryId={categoryId}
                onUnlockSuccess={invalidateLevels}
              />
            ) : (
              <Question
                className="lg:pr-24"
                categoryId={categoryId}
                levelId={currentLevel?.id}
                currentCategoryName={currentCategoryName}
                invalidateLevels={updateLevels}
              />
            )}
          </div>
        </div>
      </div>
    </PageContent>
  );
}
