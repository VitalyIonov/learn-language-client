import { useState, useEffect } from "react";
import { Tab, TabGroup, TabList } from "@headlessui/react";
import { clsx } from "clsx";

import { Question } from "~/routes/questions/components/question/question";
import { useReadLevelsLevelsGet } from "~/types/client-api";

interface LevelTabsProps {
  className?: string;
  initialLevel?: number;
  categoryId: number;
}

export const LevelTabs = ({
  className,
  initialLevel,
  categoryId,
}: LevelTabsProps) => {
  const [currentLevel, setCurrentLevel] = useState<number | undefined>(
    initialLevel,
  );
  const { data: levelsData, refetch: invalidateLevels } =
    useReadLevelsLevelsGet({
      category_id: categoryId,
    });

  const currentLevelIndex = levelsData?.items.findIndex(
    (level) => level.id === currentLevel,
  );

  const handleLevelSelect = (levelId: number) => {
    setCurrentLevel(levelId);
  };

  const updateLevels = async (newLevelId: number) => {
    await invalidateLevels().then(() => {
      setCurrentLevel(newLevelId);
    });
  };

  useEffect(() => {
    setCurrentLevel(initialLevel);
  }, [initialLevel]);

  return (
    <div className={clsx("w-full", className)}>
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-24">
        <TabGroup
          vertical
          selectedIndex={currentLevelIndex}
          className="max-h-[600px] overflow-y-scroll"
        >
          <TabList
            className={clsx(
              "overflow-x-scroll",
              "flex flex-shrink-0 flex-row gap-2",
              "pb-1",
              "w-full [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0",
              "[-ms-overflow-style:none] [scrollbar-width:none]",
              "lg:w-48 lg:flex-col lg:flex-wrap lg:overflow-auto lg:pb-0",
            )}
          >
            {levelsData?.items.map((level) => (
              <Tab
                key={level.id}
                disabled={Boolean(level.isLocked)}
                onClick={() => handleLevelSelect?.(level.id)}
                className={({ selected, disabled }) =>
                  clsx(
                    "cursor-pointer rounded-xl px-4 py-3 text-left font-medium transition-all duration-200 focus:outline-none lg:w-48",
                    {
                      "border border-emerald-400/30 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-600/20 text-white shadow-lg":
                        selected,
                      "border border-zinc-700/50 bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700/50 hover:text-white":
                        !selected && !disabled,
                      "cursor-not-allowed border border-zinc-800/30 bg-zinc-900/30 text-zinc-600":
                        disabled,
                    },
                  )
                }
              >
                {({ selected }) => (
                  <div className="flex items-center gap-3">
                    <div
                      className={clsx(
                        "flex flex-shrink-0 items-center justify-center",
                        "h-10 w-10",
                        "text-lg font-bold",
                        "rounded-xl",
                        {
                          "bg-gradient-to-br from-emerald-400 via-blue-400 to-purple-500 text-white shadow-lg":
                            selected,
                          "bg-zinc-700 text-zinc-300":
                            !selected && !level.isLocked,
                          "bg-zinc-800 text-zinc-600": level.isLocked,
                        },
                      )}
                    >
                      {!level.isLocked ? level.alias : "🔒"}
                    </div>
                    <div className="hidden lg:block">
                      <div className="min-w-0 flex-1">
                        <p
                          className={clsx("font-semibold", {
                            "text-white": selected,
                            "text-zinc-300": !selected && !level.isLocked,
                            "text-zinc-600": level.isLocked,
                          })}
                        >
                          {level.alias}
                        </p>
                        <p
                          className={clsx("truncate text-sm", {
                            "text-emerald-200": selected,
                            "text-zinc-400": !selected && !level.isLocked,
                            "text-zinc-600": level.isLocked,
                          })}
                        >
                          {level.name}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </Tab>
            ))}
          </TabList>
        </TabGroup>
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
  );
};
