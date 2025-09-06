import { Radio } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { clsx } from "clsx";
import type { TextDefinitionOut } from "~/types/client-schemas";

type Props = {
  definition: TextDefinitionOut;
  isSelected: boolean;
  lastResult?: boolean;
};

export function TextOption({ definition, isSelected, lastResult }: Props) {
  return (
    <Radio
      key={definition.id}
      value={definition.id}
      className={clsx(
        "relative",
        "flex",
        "px-8 py-6",
        "bg-white/5",
        "rounded-lg",
        "shadow-md",
        "transition",
        "cursor-pointer",
        "group",
        "focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white",
        {
          ["data-checked:bg-emerald-300 data-checked:text-slate-800"]:
            lastResult === true && isSelected,
          ["data-checked:bg-red-400 data-checked:text-slate-800"]:
            lastResult === false && isSelected,
          ["data-checked:bg-white/10"]: lastResult === undefined && isSelected,
        },
      )}
    >
      <div className="flex w-full items-center justify-between">
        <div className="text-lg/8">
          <p
            className={clsx(
              lastResult === undefined || !isSelected
                ? "text-gray-100"
                : "font-semibold text-gray-900",
            )}
          >
            {definition.text}
          </p>
        </div>
        {isSelected ? (
          <CheckCircleIcon className="size-6 fill-white opacity-0 transition group-data-checked:opacity-100" />
        ) : null}
      </div>
    </Radio>
  );
}
