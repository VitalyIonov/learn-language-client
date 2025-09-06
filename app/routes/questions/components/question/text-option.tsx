import { Radio } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { clsx } from "clsx";
import { useFlipAnimation } from "~/shared/hooks/useFlipAnimation";
import { useTranslateTextTranslateGet } from "~/types/client-api";
import type { TextDefinitionOut } from "~/types/client-schemas";

type Props = {
  definition: TextDefinitionOut;
  isSelected: boolean;
  lastResult?: boolean;
};

export function TextOption({ definition, isSelected, lastResult }: Props) {
  const { isFlipped, handleDoubleClick, handleClick, handleTouchStart } =
    useFlipAnimation();

  const { data: translatedText, isLoading } = useTranslateTextTranslateGet(
    { text: definition.text },
    { query: { enabled: isFlipped } },
  );

  return (
    <Radio
      key={definition.id}
      value={definition.id}
      className={clsx(
        "relative",
        "flex",
        "rounded-lg",
        "shadow-md",
        "transition",
        "cursor-pointer select-none",
        "group",
        "focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white",
        {
          ["bg-white/5"]: lastResult === undefined || !isSelected,
          ["bg-emerald-300 text-slate-800"]: lastResult === true && isSelected,
          ["bg-red-400 text-slate-800"]: lastResult === false && isSelected,
          ["bg-white/10"]: lastResult === undefined && isSelected,
        },
      )}
      onDoubleClick={handleDoubleClick}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
    >
      <div
        className={clsx(
          "flex w-full items-center justify-between px-8 py-6 text-lg/8",
          lastResult === undefined || !isSelected
            ? "text-gray-100"
            : "font-semibold text-gray-900",
        )}
      >
        <p
          className={clsx("absolute text-inherit", {
            "opacity-100": isFlipped,
            "pointer-events-none opacity-0": !isFlipped,
          })}
        >
          {isLoading ? "..." : translatedText?.translation}
        </p>
        <p
          className={clsx("text-inherit", {
            "opacity-100": !isFlipped,
            "pointer-events-none opacity-0": isFlipped,
          })}
        >
          {definition.text}
        </p>
        {isSelected ? (
          <CheckCircleIcon className="size-6 fill-white opacity-0 transition group-data-checked:opacity-100" />
        ) : null}
      </div>
    </Radio>
  );
}
