import { clsx } from "clsx";
import { useState, useEffect } from "react";
import { useParams } from "react-router";

import { LevelTabs } from "~/routes/questions/components/level-tabs";
import { Question } from "~/routes/questions/components/question/question";
import { PageContent } from "~/shared/components";
import {
  useReadCategoryCategoriesCategoryIdGet,
  useReadLevelsLevelsGet,
} from "~/types/client-api";

export default function Questions() {
  const { id } = useParams();
  const categoryId = Number(id);
  const { data } = useReadCategoryCategoriesCategoryIdGet(categoryId);
  const initialLevel = data?.currentLevel.id;

  const [currentLevel, setCurrentLevel] = useState<number | undefined>(
    initialLevel,
  );
  const { data: levelsData, refetch: invalidateLevels } =
    useReadLevelsLevelsGet({
      category_id: categoryId,
    });

  const updateLevels = async (newLevelId: number) => {
    await invalidateLevels().then(() => {
      setCurrentLevel(newLevelId);
    });
  };

  useEffect(() => {
    setCurrentLevel(initialLevel);
  }, [initialLevel]);

  return (
    <PageContent>
      <div className={clsx("w-full")}>
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-24">
          <LevelTabs initialLevel={initialLevel} levelsData={levelsData} />
          <div className="flex min-w-0 flex-1 items-center">
            <Question
              className="lg:pr-24"
              categoryId={categoryId}
              levelId={currentLevel}
              invalidateLevels={updateLevels}
            />
          </div>
        </div>
      </div>
    </PageContent>
  );
}
