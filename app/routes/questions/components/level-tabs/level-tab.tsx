import { Tab } from "@headlessui/react";
import { clsx } from "clsx";

import type { LevelOut } from "~/types/client-schemas";

type Props = {
  level?: LevelOut;
  isSelected: boolean;
  onClick?: (newLevel: LevelOut) => void;
};

export const LevelTab = ({ level, isSelected, onClick }: Props) => {
  if (!level) {
    return null;
  }

  const { name, alias } = level;

  return (
    <Tab
      onClick={() => onClick?.(level)}
      className={clsx(
        "px-3 py-2",
        "text-left font-medium",
        "rounded-xl",
        "transition-all duration-200",
        "cursor-pointer",
        "focus:outline-none",
        "lg:w-36",
        {
          "border border-emerald-400/30 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-600/20 text-white shadow-lg":
            isSelected,
          "border border-zinc-700/50 bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700/50 hover:text-white":
            !isSelected,
        },
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
                isSelected,
              "bg-zinc-700 text-zinc-300": !isSelected,
            },
          )}
        >
          {alias}
        </div>
        <div className="hidden lg:block">
          <div className="min-w-0 flex-1">
            <p
              className={clsx("text-sm font-semibold", {
                "text-white": isSelected,
                "text-zinc-300": !isSelected,
              })}
            >
              {alias}
            </p>
            <p
              className={clsx("truncate text-xs", {
                "text-emerald-200": isSelected,
                "text-zinc-400": !isSelected,
              })}
            >
              {name}
            </p>
          </div>
        </div>
      </div>
    </Tab>
  );
};
