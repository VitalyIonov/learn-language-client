import { cn } from "~/shared/lib/utils";

type Props = {
  isLast: boolean;
  wordName: string;
  level: string;
  progress: number;
  todayProgress: number;
};

export const Row = ({
  isLast,
  wordName,
  progress,
  todayProgress,
  level,
}: Props) => {
  return (
    <div
      className={cn(
        `grid grid-cols-6 ${isLast ? undefined : "border-b-1"} border-gray-700 p-4`,
      )}
    >
      <p className="col-span-3">{wordName}</p>
      <div className="col-span-3 grid grid-cols-3">
        <div className="flex gap-2">
          <p>Level:</p>
          <p className="text-emerald-600">{level}</p>
        </div>
        <div className="flex gap-2">
          <p>Progress:</p>
          <p className="text-emerald-500">{progress}%</p>
        </div>
        <div className="flex gap-2">
          <p>Today's Progress:</p>
          <p className="text-emerald-500">{todayProgress}%</p>
        </div>
      </div>
    </div>
  );
};
