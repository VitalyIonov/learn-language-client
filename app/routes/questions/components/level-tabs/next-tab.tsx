import { clsx } from "clsx";
import { Tab } from "@headlessui/react";
import type { LevelOut } from "~/types/client-schemas";

type Props = {
  isActive?: boolean;
  isLocked?: LevelOut["isLocked"];
  level?: LevelOut;
  onClick?: (newLevel: LevelOut) => void;
};

export const NextTab = ({
  isActive = true,
  isLocked,
  level,
  onClick,
}: Props) => {
  if (!level) {
    return null;
  }

  return (
    <Tab
      className={clsx(
        "px-3 py-2",
        "text-left font-medium text-zinc-600",
        "bg-zinc-900/30",
        "rounded-xl border-zinc-800",
        "transition-all duration-200",
        "cursor-pointer",
        "border",
        "focus:outline-none",
        "lg:w-36",
      )}
      onClick={() => onClick?.(level)}
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
          {!isLocked ? level.alias : "🔒"}
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
              {level.alias}
            </p>
            <p
              className={clsx("truncate text-xs", {
                "text-emerald-200": isActive,
                "text-zinc-400": !isActive && !isLocked,
                "text-zinc-600": isLocked,
              })}
            >
              {level.name}
            </p>
          </div>
        </div>
      </div>
    </Tab>
  );
};
