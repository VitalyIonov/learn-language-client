import { clsx } from "clsx";
import { DataSection } from "~/shared/components/data-section/data-section";
import { AcademicCapIcon } from "@heroicons/react/24/outline";

type Props = {
  level: string;
  className?: string;
};

export const CurrentLevelSection = ({ className, level }: Props) => {
  return (
    <DataSection className={clsx(className, "p-0")}>
      <div className="relative h-full overflow-hidden">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500/10 via-blue-500/5 to-purple-600/10" />

        <div
          className={clsx(
            "relative",
            "flex flex-col justify-between gap-4",
            "p-4",
            "md:gap-6",
            "lg:gap-8 lg:p-6",
          )}
        >
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <AcademicCapIcon className="h-6 w-6 text-emerald-400" />
            </div>
            <h2 className="text-base font-semibold text-zinc-100 md:text-lg">
              Текущий уровень
            </h2>
          </div>

          <div className="flex items-center justify-center">
            <div className="group relative">
              <div
                className={clsx(
                  "absolute",
                  "bg-gradient-to-r from-emerald-400/20 via-blue-400/20 to-purple-400/20",
                  "rounded-2xl",
                  "blur-xl",
                  "transition-all duration-300",
                  "-inset-2",
                  "group-hover:blur-2xl",
                )}
              />

              <div
                className={clsx(
                  "relative",
                  "flex items-center justify-center",
                  "h-24 w-24",
                  "bg-gradient-to-br from-emerald-500/20 via-blue-500/20 to-purple-600/20",
                  "rounded-2xl border-emerald-400/30",
                  "backdrop-blur-sm",
                  "transition-transform duration-300",
                  "border",
                  "group-hover:scale-105",
                )}
              >
                <span
                  className={clsx(
                    "text-4xl font-bold text-transparent",
                    "bg-gradient-to-br from-emerald-400 via-blue-400 to-purple-500 bg-clip-text",
                    "drop-shadow-2xl",
                  )}
                >
                  {level}
                </span>
              </div>

              <div
                className={clsx(
                  "absolute inset-0",
                  "bg-gradient-to-br from-emerald-400/10 via-blue-400/10 to-purple-500/10",
                  "rounded-2xl",
                  "animate-pulse",
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </DataSection>
  );
};
