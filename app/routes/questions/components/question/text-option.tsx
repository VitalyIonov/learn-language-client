import { useState, useRef } from "react";

import { Radio } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { clsx } from "clsx";
import { useTranslateTextTranslateGet } from "~/types/client-api";
import type { TextDefinitionOut } from "~/types/client-schemas";

type Props = {
  definition: TextDefinitionOut;
  isSelected: boolean;
  lastResult?: boolean;
};

export function TextOption({ definition, isSelected, lastResult }: Props) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastTouchRef = useRef<number>(0);

  const { data: translatedText, isLoading } = useTranslateTextTranslateGet(
    { text: definition.text },
    { query: { enabled: isFlipped } },
  );

  const toggleFlipped = () => {
    if (isAnimating) return;

    setIsFlipped((state) => !state);
    setIsAnimating(true);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const resetFlipped = () => {
    if (isAnimating) return;

    if (isFlipped) {
      setIsFlipped(false);
      setIsAnimating(true);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }
  };

  const handleDoubleClick = () => {
    toggleFlipped();
  };

  const handleClick = () => {
    resetFlipped();
  };

  const handleTouchStart = () => {
    const now = Date.now();
    const timeDiff = now - lastTouchRef.current;

    if (timeDiff < 300 && timeDiff > 0) {
      toggleFlipped();
    } else if (isFlipped) {
      resetFlipped();
    }

    lastTouchRef.current = now;
  };

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
