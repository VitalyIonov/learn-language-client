import type { CategoryProgressOut } from "~/types/client-schemas";

export const getTotalProgress = (
  categories: CategoryProgressOut[],
): number | undefined => {
  const totalScore = categories.reduce((sum, c) => sum + c.currentScore, 0);
  const totalMaxScore = categories.reduce((sum, c) => sum + c.maxScore, 0);
  return totalMaxScore > 0
    ? Number(((totalScore / totalMaxScore) * 100).toFixed(2))
    : undefined;
};
