import { useState, useEffect, useCallback } from "react";
import { Radio, RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Popover, Button } from "@headlessui/react";
import { clsx } from "clsx";
import { useCallbackDebounce } from "~/shared/hooks/use-callback-debounce";
import { useNotificationStore } from "~/shared/stores";
import { type CategoryOut, type QuestionOut } from "~/types/client-schemas";
import {
  useTranslateTextTranslateGet,
  useGenerateQuestionQuestionsGeneratePost,
  useUpdateQuestionEndpointQuestionsQuestionIdPatch,
} from "~/types/client-api";
import { useTextSelection } from "~/shared/hooks/use-text-selection";

type Props = {
  categoryId?: CategoryOut["id"];
};

export function Question({ categoryId }: Props) {
  const [question, setQuestion] = useState<QuestionOut>();
  const [lastResult, setLastResult] = useState<boolean>();
  const [selected, setSelected] = useState<number>();
  const { selectedText, position } = useTextSelection();
  const { data: translatedText, isLoading } = useTranslateTextTranslateGet(
    { text: selectedText },
    { query: { enabled: !!selectedText } },
  );
  const { mutateAsync: generateQuestion } =
    useGenerateQuestionQuestionsGeneratePost();
  const { mutateAsync: makeAnswer } =
    useUpdateQuestionEndpointQuestionsQuestionIdPatch();

  const { success, error } = useNotificationStore();

  const fetchQuestion = useCallback(async () => {
    const question = await generateQuestion({
      data: {
        categoryId: Number(categoryId),
      },
    });

    setQuestion(question);
  }, [categoryId, generateQuestion, selected]);

  const { trigger: updateQuestion, isTriggered: isQuestionUpdating } =
    useCallbackDebounce({
      callback: fetchQuestion,
      debounce: 2000,
    });

  useEffect(() => {
    fetchQuestion();
  }, []);

  useEffect(() => {
    setSelected(undefined);
    setLastResult(undefined);
  }, [question?.id]);

  const handleApply = async () => {
    if (selected !== undefined && question?.id) {
      const result = await makeAnswer({
        questionId: question.id,
        data: { chosenDefinitionId: selected },
      });

      if (result.isCorrect) {
        success("Ура!", "Вот это да");
      } else {
        error("Блин!", "Ну и ну...");
      }

      setLastResult(result.isCorrect);

      updateQuestion();
    }
  };

  if (!question) {
    return null;
  }

  const { meaning, definitions } = question;

  return (
    <div className="w-full px-4">
      {selectedText ? (
        <Popover
          className="absolute z-50 min-w-[120px]"
          style={{ top: position?.y, left: position?.x }}
        >
          <Popover.Panel
            className="flex flex-col rounded-lg border-1 border-gray-800 bg-slate-300 text-sm text-white shadow-lg"
            static
          >
            <div className="border-b-1 border-gray-600 px-4 pt-4 pb-4 ">
              <div className="text-xs font-semibold text-gray-950">
                Перевод:
              </div>
            </div>
            <div className="px-4 py-4">
              <p className="text-gray-900">
                {isLoading ? "..." : translatedText?.translation}
              </p>
            </div>
          </Popover.Panel>
        </Popover>
      ) : null}
      <div className="mx-auto max-w-2xl">
        <p className="mb-12 text-xl">{meaning?.name}...</p>
        <RadioGroup
          key={question.id}
          value={selected}
          onChange={setSelected}
          aria-label="Server size"
          className="mb-2 space-y-2"
        >
          {definitions?.map((definition) => (
            <Radio
              key={definition.id}
              value={definition.id}
              className={clsx(
                "group relative flex cursor-pointer rounded-lg bg-white/5 px-5 py-4  shadow-md transition focus:not-data-focus:outline-none  data-focus:outline data-focus:outline-white",
                {
                  ["data-checked:bg-emerald-300 data-checked:text-slate-800"]:
                    lastResult === true && definition.id === selected,
                  ["data-checked:bg-red-400 data-checked:text-slate-800"]:
                    lastResult === false && definition.id === selected,
                  ["data-checked:bg-white/10"]:
                    lastResult === undefined && definition.id === selected,
                },
              )}
            >
              <div className="flex w-full items-center justify-between">
                <div className="text-sm/6">
                  <p
                    className={clsx(
                      lastResult === undefined || definition.id !== selected
                        ? "text-gray-300"
                        : "font-semibold text-gray-900",
                    )}
                  >
                    {definition.text}
                  </p>
                </div>
                {selected === definition.id ? (
                  <CheckCircleIcon className="size-6 fill-white opacity-0 transition group-data-checked:opacity-100" />
                ) : null}
              </div>
            </Radio>
          ))}
        </RadioGroup>
        <div className="flex justify-end p-4">
          <Button
            className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-indigo-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner focus:not-data-focus:outline-none data-disabled:cursor-not-allowed data-disabled:bg-slate-500 data-focus:outline data-focus:outline-white data-hover:bg-indigo-800 data-open:bg-gray-700"
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
