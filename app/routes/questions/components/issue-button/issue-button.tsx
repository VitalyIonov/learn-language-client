import { useState } from "react";
import { clsx } from "clsx";
import { Button, Modal } from "~/shared/components";
import { BugAntIcon } from "@heroicons/react/24/outline";
import { useAddIssueIssuesPost } from "~/types/client-api";
import type { QuestionOut } from "~/types/client-schemas";

import { IssueForm, type Schema } from "~/features/issue-form/issue-form";

const FORM_ID = "create-issue-form";

type Props = {
  question: QuestionOut;
};

export const IssueButton = ({ question }: Props) => {
  const [isIssueModalOpened, setIsIssueModalOpened] = useState(false);

  const { mutateAsync: addIssue } = useAddIssueIssuesPost();

  const handleIssueModalOpen = () => {
    setIsIssueModalOpened(true);
  };

  const handleIssueCreate = async ({ text, issueTypeId }: Schema) => {
    await addIssue(
      {
        data: {
          text,
          typeId: issueTypeId,
          questionId: question.id,
          meaning: question.meaning?.name,
          definitions: question.definitions.map((item) =>
            item.type === "text" ? item.text : (item.image.alt ?? ""),
          ),
        },
      },
      { onSuccess: () => setIsIssueModalOpened(false) },
    );
  };

  return (
    <>
      <Button
        className="h-[24px] w-[24px]"
        uiType="ghost"
        onClick={handleIssueModalOpen}
      >
        <BugAntIcon
          className={clsx(
            "h-full w-full text-slate-600 transition-all duration-200 hover:scale-110 hover:text-slate-200",
          )}
        />
      </Button>
      <Modal
        open={isIssueModalOpened}
        onClose={() => setIsIssueModalOpened(false)}
        title="Сообщить об ошибке"
      >
        <IssueForm id={FORM_ID} onSubmit={handleIssueCreate} />
      </Modal>
    </>
  );
};
