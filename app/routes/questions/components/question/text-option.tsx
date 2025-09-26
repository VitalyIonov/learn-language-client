import { Radio } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { clsx } from "clsx";
import { useFlipAnimation } from "~/shared/hooks/use-flip-animation";
import { usePlayAudio } from "~/shared/hooks/use-play-audio";
import { useTranslateTextTranslateGet } from "~/types/client-api";
import type { TextDefinitionOut } from "~/types/client-schemas";
import { SoundWaves } from "~/shared/components/sound-waves/sound-waves";

type Props = {
  definition: TextDefinitionOut;
  isSelected: boolean;
  lastResult?: boolean;
};

export function TextOption({ definition, isSelected, lastResult }: Props) {
  const {
    isFlipped,
    onTouchStart: onFlipAnimationTouchStart,
    ...restFlipEvents
  } = useFlipAnimation();
  const {
    isPlaying,
    onTouchStart: onPlayAudioTouchStart,
    ...restAudioEvents
  } = usePlayAudio(definition?.audio?.url);

  const { data: translatedText, isLoading } = useTranslateTextTranslateGet(
    { text: definition.text },
    { query: { enabled: isFlipped } },
  );

  const handleTouchStart = () => {
    onFlipAnimationTouchStart();
    onPlayAudioTouchStart();
  };

  const translationText = isLoading ? "..." : translatedText?.translation;

  return (
    <Radio
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
      onTouchStart={handleTouchStart}
      {...restFlipEvents}
      {...restAudioEvents}
    >
      <SoundWaves className="w-full" active={isPlaying}>
        <div
          className={clsx(
            "flex items-center justify-between",
            "px-6 py-6",
            "w-full",
            "text-lg/8",
            "lg:px-8",
            lastResult === undefined || !isSelected
              ? "text-gray-100"
              : "font-semibold text-gray-900",
          )}
        >
          <p className={clsx("text-inherit")}>
            {isFlipped ? translationText : definition.text}
          </p>
          {isSelected ? (
            <CheckCircleIcon className="size-6 fill-white opacity-0 transition group-data-checked:opacity-100" />
          ) : null}
        </div>
      </SoundWaves>
    </Radio>
  );
}
