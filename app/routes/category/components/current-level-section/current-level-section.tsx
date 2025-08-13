import clsx from "clsx";
import { DataSection } from "~/shared/components/data-section/data-section";
import { AcademicCapIcon } from "@heroicons/react/24/outline";

type Props = {
  level: string;
  className?: string;
};

export const CurrentLevelSection = ({ className, level }: Props) => {
  return (
    <DataSection className={clsx(className, "p-0")}>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500/10 via-blue-500/5 to-purple-600/10" />

        <div className="relative flex flex-col justify-between gap-8 p-6">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <AcademicCapIcon className="h-6 w-6 text-emerald-400" />
            </div>
            <h2 className="text-lg font-semibold text-zinc-100">
              Текущий уровень
            </h2>
          </div>

          <div className="flex items-center justify-center">
            <div className="group relative">
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-emerald-400/20 via-blue-400/20 to-purple-400/20 blur-xl transition-all duration-300 group-hover:blur-2xl" />

              <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-emerald-400/30 bg-gradient-to-br from-emerald-500/20 via-blue-500/20 to-purple-600/20 backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
                <span className="bg-gradient-to-br from-emerald-400 via-blue-400 to-purple-500 bg-clip-text text-4xl font-bold text-transparent drop-shadow-2xl">
                  {level}
                </span>
              </div>

              <div className="absolute inset-0 animate-pulse rounded-2xl bg-gradient-to-br from-emerald-400/10 via-blue-400/10 to-purple-500/10" />
            </div>
          </div>
        </div>
      </div>
    </DataSection>
  );
};
