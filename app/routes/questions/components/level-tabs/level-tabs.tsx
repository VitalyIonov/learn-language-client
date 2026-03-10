import { useState } from "react";
import { TabGroup, TabList } from "@headlessui/react";
import * as Accordion from "@radix-ui/react-accordion";
import { clsx } from "clsx";

import { LevelTab } from "~/routes/questions/components/level-tabs/level-tab";
import { CurrentTab } from "~/routes/questions/components/level-tabs/current-tab";
import { getNextLevel } from "~/shared/utils/levels";
import { type LevelsListResponse, type LevelOut } from "~/types/client-schemas";

interface LevelTabsProps {
  levelsData?: LevelsListResponse;
  currentLevel?: LevelOut;
  onCurrentLevelChange: (newLevelId: LevelOut["id"]) => void;
}

export const LevelTabs = ({
  currentLevel,
  levelsData,
  onCurrentLevelChange,
}: LevelTabsProps) => {
  const [accordionValue, setAccordionValue] = useState("");
  const isAccordionOpen = accordionValue === "levels";

  const currentLevelIndex = levelsData?.items.findIndex(
    (level) => level.id === currentLevel?.id,
  );

  const handleLevelSelect = (newLevel: LevelOut) => {
    onCurrentLevelChange(newLevel.id);
  };

  const levels = levelsData?.items ?? [];
  const nextLevel = getNextLevel(levels, currentLevel);

  return (
    <div
      className={clsx(
        "overflow-x-scroll",
        "flex flex-row items-start gap-2",
        "[&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0",
        "[-ms-overflow-style:none] [scrollbar-width:none]",
        "lg:flex-col",
      )}
    >
      <Accordion.Root
        type="single"
        collapsible
        value={accordionValue}
        onValueChange={setAccordionValue}
        className="[&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0"
      >
        <Accordion.Item
          className="group flex flex-row gap-2 lg:flex-col"
          value="levels"
        >
          <Accordion.Trigger className="justify-between">
            <CurrentTab name={currentLevel?.name} alias={currentLevel?.alias} />
          </Accordion.Trigger>
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
              <Accordion.Content className="accordion-slide-right accordion-slide-down flex flex-shrink-0 flex-row gap-2 lg:flex-col">
                {levels.map((level) => (
                  <LevelTab
                    key={level.id}
                    isSelected={level.id === currentLevel?.id}
                    level={level}
                    onClick={handleLevelSelect}
                  />
                ))}
              </Accordion.Content>
              {nextLevel && !isAccordionOpen ? (
                <LevelTab
                  key={`${nextLevel.id}-next`}
                  level={nextLevel}
                  isSelected={nextLevel.id === currentLevel?.id}
                  onClick={handleLevelSelect}
                />
              ) : null}
            </TabList>
          </TabGroup>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  );
};
