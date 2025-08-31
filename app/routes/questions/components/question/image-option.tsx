import { Radio } from "@headlessui/react";
import { clsx } from "clsx";
import type { ImageDefinitionOut } from "~/types/client-schemas";

type Props = {
  definition: ImageDefinitionOut;
  isSelected: boolean;
  lastResult?: boolean;
};

export function ImageOption({ definition, isSelected, lastResult }: Props) {
  return (
    <Radio
      key={definition.id}
      value={definition.id}
      className={clsx(
        "group relative cursor-pointer transition-all duration-200 focus:not-data-focus:outline-none",
      )}
    >
      <div className="relative overflow-hidden rounded-xl bg-gray-200">
        <img
          src={definition.image.imageUrl}
          alt="Вариант ответа"
          className={clsx(
            "object-cover",
            "h-full w-full",
            "bg-gray-200",
            "scale-70",
            "transition-transform duration-200",
            "group-hover:scale-75",
          )}
        />

        <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

        <div
          className={clsx(
            "absolute inset-0 rounded-xl border-4 transition-all duration-200",
            {
              "border-emerald-400 shadow-lg shadow-emerald-400/25":
                lastResult === true && isSelected,
              "border-red-400 shadow-lg shadow-red-400/25":
                lastResult === false && isSelected,
              "border-blue-400 shadow-lg shadow-blue-400/25":
                lastResult === undefined && isSelected,
              "border-transparent": !isSelected,
            },
          )}
        />

        {/* Индикатор выбора */}
        {isSelected && (
          <div className="absolute top-2 right-2">
            <div
              className={clsx("h-3 w-3 rounded-full", {
                "bg-emerald-400": lastResult === true,
                "bg-red-400": lastResult === false,
                "bg-blue-400": lastResult === undefined,
              })}
            />
          </div>
        )}
      </div>
    </Radio>
  );
}
