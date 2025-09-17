import { clsx } from "clsx";
import type { LevelOut } from "~/types/client-schemas";

type Props = {
  isActive?: boolean;
  isLocked?: LevelOut["isLocked"];
  name?: LevelOut["name"];
  alias?: LevelOut["alias"];
};

export const NextTab = ({ isActive = true, isLocked, name, alias }: Props) => {
  return (
    <div
      className={clsx(
        "px-3 py-2",
        "text-left font-medium text-zinc-600",
        "bg-zinc-900/30",
        "rounded-xl border-zinc-800",
        "transition-all duration-200",
        "cursor-not-allowed",
        "border",
        "focus:outline-none",
        "lg:w-36",
      )}
    >
      <div className="flex items-center gap-3 overflow-x-scroll [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0">
        <div
          className={clsx(
            "flex flex-shrink-0 items-center justify-center",
            "h-10 w-10",
            "text-sm font-bold",
            "rounded-xl",
            {
              "bg-gradient-to-br from-emerald-400 via-blue-400 to-purple-500 text-white shadow-lg":
                isActive,
              "bg-zinc-700 text-zinc-300": !isActive && !isLocked,
              "bg-zinc-800 text-zinc-600": isLocked,
            },
          )}
        >
          {!isLocked ? alias : "🔒"}
        </div>
        <div className="block">
          <div className="min-w-0 flex-1">
            <p
              className={clsx("text-sm font-semibold", {
                "text-white": isActive,
                "text-zinc-300": !isActive && !isLocked,
                "text-zinc-600": isLocked,
              })}
            >
              {alias}
            </p>
            <p
              className={clsx("truncate text-xs", {
                "text-emerald-200": isActive,
                "text-zinc-400": !isActive && !isLocked,
                "text-zinc-600": isLocked,
              })}
            >
              {name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
