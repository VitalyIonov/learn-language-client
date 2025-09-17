import { TabGroup, TabList } from "@headlessui/react";
import * as Accordion from "@radix-ui/react-accordion";
import { clsx } from "clsx";

import { LevelTab } from "~/routes/questions/components/level-tabs/level-tab";
import { CurrentTab } from "~/routes/questions/components/level-tabs/current-tab";
import { NextTab } from "~/routes/questions/components/level-tabs/next-tab";
import { type LevelsListResponse, type LevelOut } from "~/types/client-schemas";

import { prepareLevels } from "~/routes/questions/utils/levels";

interface LevelTabsProps {
  levelsData?: LevelsListResponse;
  currentLevel?: LevelOut;
  onCurrentLevelChange: (newLevel: LevelOut) => void;
}

export const LevelTabs = ({
  currentLevel,
  levelsData,
  onCurrentLevelChange,
}: LevelTabsProps) => {
  const currentLevelIndex = levelsData?.items.findIndex(
    (level) => level.id === currentLevel?.id,
  );

  const handleLevelSelect = (newLevel: LevelOut) => {
    onCurrentLevelChange(newLevel);
  };

  const { unlockedLevels, nextLevel } = prepareLevels(levelsData?.items);

  return (
    <div
      className={clsx(
        "overflow-x-scroll",
        "flex flex-row items-start gap-2",
        "[&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0",
        "lg:flex-col",
      )}
    >
      <Accordion.Root type="single" collapsible>
        <Accordion.Item
          className="group flex flex-row gap-2 lg:flex-col"
          value="currentLevel"
        >
          <Accordion.Trigger className="justify-between">
            <CurrentTab
              isLocked={currentLevel?.isLocked}
              name={currentLevel?.name}
              alias={currentLevel?.alias}
            />
          </Accordion.Trigger>
          <Accordion.Content className="accordion-slide-right accordion-slide-down">
            <TabGroup
              vertical
              selectedIndex={currentLevelIndex}
              className="max-h-[600px] overflow-y-scroll [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0"
            >
              <TabList
                className={clsx(
                  "overflow-x-scroll",
                  "flex flex-shrink-0 flex-row gap-2",
                  "pb-1",
                  "w-full [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0",
                  "[-ms-overflow-style:none] [scrollbar-width:none]",
                  "lg:w-48 lg:flex-col lg:flex-wrap lg:overflow-auto lg:pr-1 lg:pb-0",
                )}
              >
                {unlockedLevels.map((level) => (
                  <LevelTab
                    key={level.id}
                    level={level}
                    onClick={handleLevelSelect}
                  />
                ))}
              </TabList>
            </TabGroup>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
      {nextLevel ? (
        <NextTab
          isLocked
          isActive={false}
          name={nextLevel.name}
          alias={nextLevel.alias}
        />
      ) : null}
    </div>
  );
};
