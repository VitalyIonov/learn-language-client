import type { CategoryProgressOut } from "~/types/client-schemas";

type TotalProgress = {
  progress: number | undefined;
  totalMaxScore: number;
};

export const getTotalProgress = (
  categories: CategoryProgressOut[],
): TotalProgress => {
  const totalScore = categories.reduce((sum, c) => sum + c.currentScore, 0);
  const totalMaxScore = categories.reduce((sum, c) => sum + c.maxScore, 0);
  const progress =
    totalMaxScore > 0
      ? Number(((totalScore / totalMaxScore) * 100).toFixed(2))
      : undefined;
  return { progress, totalMaxScore };
};

export const getTodayProgress = (
  todayScore: number | undefined,
  totalMaxScore: number,
): number | undefined => {
  if (todayScore === undefined || totalMaxScore <= 0) return undefined;
  return Number(((todayScore / totalMaxScore) * 100).toFixed(2));
};
