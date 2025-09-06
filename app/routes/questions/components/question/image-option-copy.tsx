import { useState, useRef } from "react";
import { Radio } from "@headlessui/react";
import { clsx } from "clsx";
import type { ImageDefinitionOut } from "~/types/client-schemas";

type Props = {
  definition: ImageDefinitionOut;
  isSelected: boolean;
  lastResult?: boolean;
};

export function ImageOption({ definition, isSelected, lastResult }: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handlePressStart = () => {
    timerRef.current = setTimeout(() => {
      setShowTranslation(true);
    }, 1000);
  };

  const handlePressEnd = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setShowTranslation(false);
  };

  const handleMouseDown = () => {
    handlePressStart();
  };

  const handleMouseUp = () => {
    handlePressEnd();
  };

  const handleMouseLeave = () => {
    handlePressEnd();
  };

  const handleTouchStart = () => {
    handlePressStart();
  };

  const handleTouchEnd = () => {
    handlePressEnd();
  };

  const handleTouchCancel = () => {
    handlePressEnd();
  };

  return (
    <Radio
      key={definition.id}
      value={definition.id}
      className={clsx(
        "group relative cursor-pointer transition-all duration-200 focus:not-data-focus:outline-none",
        { "animate-pulse": !isLoaded },
      )}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
    >
      {/* Текст перевода */}
      <div
        className={clsx(
          "absolute top-0 right-0 bottom-0 left-0 z-20",
          "flex items-center justify-center",
          "p-4",
          "text-lg font-semibold text-white",
          "bg-black/80",
          "rounded-xl",
          "transition-opacity duration-300",
          "select-none",
          {
            "opacity-100": showTranslation,
            "pointer-events-none opacity-0": !showTranslation,
          },
        )}
      >
        traduccion
      </div>

      <div className="relative h-full w-full overflow-hidden rounded-xl bg-gray-200">
        <img
          src={definition.image.imageUrl}
          alt="Вариант ответа"
          className={clsx(
            "object-cover",
            "h-full w-full",
            "bg-gray-200",
            "scale-70",
            "transition-all duration-300",
            "group-hover:scale-75",
            {
              "opacity-0": showTranslation,
              "opacity-100": !showTranslation,
            },
          )}
          onLoad={() => setIsLoaded(true)}
        />

        <div
          className={clsx(
            "absolute inset-0 bg-black/20 transition-opacity duration-200",
            {
              "opacity-100": !showTranslation && "group-hover:opacity-100",
              "opacity-0": showTranslation,
            },
          )}
        />

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
