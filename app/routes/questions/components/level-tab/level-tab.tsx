import { Tab } from "@headlessui/react";
import { clsx } from "clsx";

import type { LevelOut } from "~/types/client-schemas";

type Props = {
  key: number;
  level: LevelOut;
  onClick: (newLevel: LevelOut) => void;
};

export const LevelTab = ({ key, level, onClick }: Props) => {
  return (
    <Tab
      key={key}
      disabled={Boolean(level.isLocked)}
      onClick={() => onClick?.(level)}
      className={({ selected, disabled }) =>
        clsx(
          "cursor-pointer rounded-xl px-4 py-3 text-left font-medium transition-all duration-200 focus:outline-none lg:w-48",
          {
            "border border-emerald-400/30 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-600/20 text-white shadow-lg":
              selected,
            "border border-zinc-700/50 bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700/50 hover:text-white":
              !selected && !disabled,
            "cursor-not-allowed border border-zinc-800/30 bg-zinc-900/30 text-zinc-600":
              disabled,
          },
        )
      }
    >
      {({ selected }) => (
        <div className="flex items-center gap-3">
          <div
            className={clsx(
              "flex flex-shrink-0 items-center justify-center",
              "h-10 w-10",
              "text-lg font-bold",
              "rounded-xl",
              {
                "bg-gradient-to-br from-emerald-400 via-blue-400 to-purple-500 text-white shadow-lg":
                  selected,
                "bg-zinc-700 text-zinc-300": !selected && !level.isLocked,
                "bg-zinc-800 text-zinc-600": level.isLocked,
              },
            )}
          >
            {!level.isLocked ? level.alias : "🔒"}
          </div>
          <div className="hidden lg:block">
            <div className="min-w-0 flex-1">
              <p
                className={clsx("font-semibold", {
                  "text-white": selected,
                  "text-zinc-300": !selected && !level.isLocked,
                  "text-zinc-600": level.isLocked,
                })}
              >
                {level.alias}
              </p>
              <p
                className={clsx("truncate text-sm", {
                  "text-emerald-200": selected,
                  "text-zinc-400": !selected && !level.isLocked,
                  "text-zinc-600": level.isLocked,
                })}
              >
                {level.name}
              </p>
            </div>
          </div>
        </div>
      )}
    </Tab>
  );
};
