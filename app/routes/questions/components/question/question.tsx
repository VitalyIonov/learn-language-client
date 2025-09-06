import { useState, useEffect, useCallback } from "react";
import { RadioGroup } from "@headlessui/react";
import { Button } from "@headlessui/react";
import { clsx } from "clsx";
import { useCallbackDebounce } from "~/shared/hooks/use-callback-debounce";
import { useFlipAnimation } from "~/shared/hooks/useFlipAnimation";
import { useNotificationStore } from "~/shared/stores";
import {
  type CategoryOut,
  type QuestionOut,
  type LevelOut,
} from "~/types/client-schemas";
import {
  useTranslateTextTranslateGet,
  useGenerateQuestionQuestionsGeneratePost,
  useUpdateQuestionEndpointQuestionsQuestionIdPatch,
} from "~/types/client-api";
import { TextOption } from "./text-option";
import { ImageOption } from "./image-option";

type Props = {
  className?: string;
  categoryId?: CategoryOut["id"];
  levelId?: LevelOut["id"];
  invalidateLevels: (newLevelId: number) => Promise<void>;
};

export function Question({
  className,
  levelId,
  categoryId,
  invalidateLevels,
}: Props) {
  const [question, setQuestion] = useState<QuestionOut>();
  const [lastResult, setLastResult] = useState<boolean>();
  const [selected, setSelected] = useState<number>();

  const {
    isFlipped: isMeaningFlipped,
    handleDoubleClick: handleMeaningDoubleClick,
    handleClick: handleMeaningClick,
    handleTouchStart: handleMeaningTouchStart,
  } = useFlipAnimation();

  const { data: translatedMeaning, isLoading: isMeaningLoading } =
    useTranslateTextTranslateGet(
      { text: question?.meaning?.name || "" },
      { query: { enabled: isMeaningFlipped && !!question?.meaning?.name } },
    );
  const { mutateAsync: generateQuestion } =
    useGenerateQuestionQuestionsGeneratePost();
  const { mutateAsync: makeAnswer } =
    useUpdateQuestionEndpointQuestionsQuestionIdPatch();

  const { custom: customNotification } = useNotificationStore();

  const fetchQuestion = useCallback(async () => {
    const question = await generateQuestion({
      data: {
        categoryId: Number(categoryId),
        levelId: Number(levelId),
      },
    });

    setQuestion(question);
  }, [categoryId, levelId, generateQuestion]);

  const { trigger: updateQuestion, isTriggered: isQuestionUpdating } =
    useCallbackDebounce({
      callback: fetchQuestion,
      debounce: 1600,
    });

  const { trigger: updateLevels } = useCallbackDebounce({
    callback: invalidateLevels,
    debounce: 2000,
  });

  useEffect(() => {
    setSelected(undefined);
    setLastResult(undefined);
  }, [question?.id]);

  useEffect(() => {
    if (levelId) {
      fetchQuestion();
    }
  }, [fetchQuestion, levelId]);

  const handleApply = async () => {
    if (selected !== undefined && question?.id) {
      const result = await makeAnswer({
        questionId: question.id,
        data: { chosenDefinitionId: selected },
      });

      setLastResult(result.isCorrect);

      if (result?.info?.type === "level_up") {
        customNotification(
          "level-up",
          "Поздравляем!",
          `Ваш новый уровень - ${result?.info?.new_level.alias}`,
        );

        updateLevels(result?.info?.new_level.id);
      } else if (result?.info?.type === "category_finish") {
        customNotification(
          "category-finished",
          "Поздравляем!",
          `Вы полностью завершили текущую категорию`,
        );
      } else {
        updateQuestion();
      }
    }
  };

  if (!question) {
    return null;
  }

  const { meaning, definitions, type } = question;

  return (
    <div className={clsx("w-full lg:px-4", className)}>
      <div className="mx-auto">
        <div className="mb-12 space-y-6">
          <h1
            className={clsx(
              "relative",
              "text-2xl leading-none font-bold text-gray-100",
              "cursor-pointer select-none",
              "lg:text-3xl",
            )}
            onDoubleClick={handleMeaningDoubleClick}
            onClick={handleMeaningClick}
            onTouchStart={handleMeaningTouchStart}
          >
            <span
              className={clsx("absolute", {
                "opacity-100": isMeaningFlipped,
                "pointer-events-none opacity-0": !isMeaningFlipped,
              })}
            >
              {isMeaningLoading ? "" : translatedMeaning?.translation}...
            </span>
            <span
              className={clsx({
                "opacity-100": !isMeaningFlipped,
                "pointer-events-none opacity-0": isMeaningFlipped,
              })}
            >
              {meaning?.name}...
            </span>
          </h1>
        </div>
        <RadioGroup
          key={question.id}
          value={selected}
          onChange={setSelected}
          aria-label="Server size"
          className={clsx("mb-24 sm:mb-0", {
            ["mb-2 space-y-2"]: type === "text",
            ["grid grid-cols-2 gap-6 sm:grid-cols-4 lg:gap-12"]:
              type === "image",
          })}
        >
          {definitions?.map((definition) => {
            const isSelected = definition.id === selected;

            if (definition.type === "image") {
              return (
                <ImageOption
                  key={definition.id}
                  definition={definition}
                  isSelected={isSelected}
                  lastResult={lastResult}
                />
              );
            }

            if (definition.type === "text") {
              return (
                <TextOption
                  key={definition.id}
                  definition={definition}
                  isSelected={isSelected}
                  lastResult={lastResult}
                />
              );
            }
          })}
        </RadioGroup>
        <div
          className={clsx(
            "fixed right-0 bottom-0 left-0 z-50",
            "flex justify-end",
            "mt-8 p-4",
            "bg-slate-900",
            "sm:static",
          )}
        >
          <Button
            className={clsx(
              "inline-flex",
              "items-center justify-center gap-2",
              "px-3 py-1.5",
              "h-16 w-full",
              "text-base font-semibold text-white",
              "bg-indigo-700",
              "rounded-md",
              "shadow-inner",
              "cursor-pointer",
              "focus:not-data-focus:outline-none data-disabled:cursor-not-allowed data-disabled:bg-slate-500 data-focus:outline data-focus:outline-white data-hover:bg-indigo-800 data-open:bg-gray-700",
              "md:w-32",
              "lg:h-auto lg:w-24 lg:text-sm/6",
            )}
            disabled={isQuestionUpdating}
            onClick={handleApply}
          >
            Ответить
          </Button>
        </div>
      </div>
    </div>
  );
}
