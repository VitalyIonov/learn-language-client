import { useState } from "react";
import { clsx } from "clsx";
import { Popover, Button, Modal } from "~/shared/components";
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

  const items = [{ title: "Сообщить об ошибке", action: handleIssueModalOpen }];

  return (
    <>
      <Popover
        button={({ open }) => (
          <div className="h-full w-[24px]">
            <BugAntIcon
              className={clsx(
                "h-full w-full transition-all duration-200 hover:scale-110 hover:text-slate-200",
                {
                  ["text-slate-600"]: !open,
                  ["scale-110 text-slate-200"]: open,
                },
              )}
            />
          </div>
        )}
      >
        <div>
          {items.map(({ title, action }) => (
            <Button key={title} uiType="ghost" onClick={action}>
              {title}
            </Button>
          ))}
        </div>
      </Popover>
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
