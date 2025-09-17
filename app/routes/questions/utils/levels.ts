import type { LevelOut } from "~/types/client-schemas";

type PreparedLevels = {
  unlockedLevels: LevelOut[];
  nextLevel: LevelOut | null;
};

export const prepareLevels = (levels?: LevelOut[]): PreparedLevels => {
  const unlockedLevels: LevelOut[] = [];
  const lockedLevels: LevelOut[] = [];

  levels?.forEach((item) => {
    const { isLocked } = item;

    if (isLocked) {
      lockedLevels.push(item);
    } else {
      unlockedLevels.push(item);
    }
  });

  return {
    unlockedLevels,
    nextLevel: lockedLevels[0] || null,
  };
};
