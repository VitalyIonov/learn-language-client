import { useState, useEffect } from "react";
import { Tab, TabGroup, TabList } from "@headlessui/react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import { clsx } from "clsx";

import { LevelTab } from "~/routes/questions/components/level-tab/level-tab";
import { type LevelsListResponse, type LevelOut } from "~/types/client-schemas";

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

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="test">
        <AccordionTrigger className="justify-between">
          <span className="flex items-center gap-2">
            <span className="font-semibold">test</span>
          </span>
        </AccordionTrigger>
        <AccordionContent>
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
              {levelsData?.items.map((level) => (
                <LevelTab
                  key={level.id}
                  level={level}
                  onClick={handleLevelSelect}
                />
              ))}
            </TabList>
          </TabGroup>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
