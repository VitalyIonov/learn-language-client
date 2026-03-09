import type { LevelOut } from "~/types/client-schemas";

type Level = LevelOut;

export const getActiveLevel = (levels: Level[]): Level | undefined =>
  levels.find((level) => level.isActive);

export const getNextLevel = (
  levels: Level[],
  currentLevel: Level | null | undefined,
): Level | null =>
  currentLevel
    ? levels.find((level) => level.value > currentLevel.value) ?? null
    : null;
