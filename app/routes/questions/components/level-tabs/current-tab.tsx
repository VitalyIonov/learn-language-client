import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";
import type { LevelOut } from "~/types/client-schemas";

type Props = {
  isActive?: boolean;
  isLocked?: LevelOut["isLocked"];
  name?: LevelOut["name"];
  alias?: LevelOut["alias"];
};

export const CurrentTab = ({
  isActive = true,
  isLocked,
  name,
  alias,
}: Props) => {
  return (
    <div
      className={clsx(
        "flex items-center gap-4",
        "px-4 py-3",
        "text-left font-medium text-white",
        "bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-600/20",
        "rounded-xl border-emerald-400/30",
        "shadow-lg",
        "transition-all duration-200",
        "cursor-pointer",
        "border",
        "focus:outline-none",
        "lg:w-48",
      )}
    >
      <div className="flex items-center gap-4 overflow-x-scroll [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0">
        <div
          className={clsx(
            "flex flex-shrink-0 items-center justify-center",
            "h-12 w-12",
            "text-lg font-bold",
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
              className={clsx("font-semibold", {
                "text-white": isActive,
                "text-zinc-300": !isActive && !isLocked,
                "text-zinc-600": isLocked,
              })}
            >
              {alias}
            </p>
            <p
              className={clsx("truncate text-sm", {
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
      <ChevronDownIcon
        className={clsx(
          "ml-4",
          "h-5 w-5",
          "max-lg:group-data-[state=closed]:rotate-270 max-lg:group-data-[state=open]:rotate-90",
          "transition-transform duration-200",
          "shrink-0",
          "lg:ml-auto lg:group-data-[state=open]:rotate-180",
        )}
        aria-hidden="true"
      />
    </div>
  );
};
