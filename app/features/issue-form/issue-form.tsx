import { useEffect } from "react";
import { Form } from "~/shared/components/form";
import { FormFooter } from "~/shared/components/form/form-footer";
import { IssueTypeField } from "~/entities/issue-type-field/issue-type-field";
import { TextareaField } from "~/shared/components/form/textarea-field";
import { useIssueForm } from "~/features/issue-form/useIssueForm";
import { type Schema } from "~/features/issue-form/schema";

type Props = {
  id: string;
  defaultValues?: Schema;
  onSubmit: (data: Schema) => void;
};

function IssueForm({ id, defaultValues, onSubmit }: Props) {
  const { formMethods, control } = useIssueForm({ defaultValues });

  useEffect(() => {
    formMethods.reset(defaultValues);
  }, [defaultValues, formMethods]);

  return (
    <Form methods={formMethods} onSubmit={onSubmit} id={id}>
      <IssueTypeField
        name="issueTypeId"
        label="Выберите тип обращения"
        control={control}
      />
      <TextareaField
        name="text"
        label="Укажите детали (опционально)"
        control={control}
      />
      <FormFooter className="mt-4" id={id} submitLabel="Отправить" />
    </Form>
  );
}

export { type Schema, IssueForm };
