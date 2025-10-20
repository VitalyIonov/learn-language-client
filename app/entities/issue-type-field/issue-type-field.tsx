import type { Control, FieldValues, Path } from "react-hook-form";

import { SingleSelectField } from "~/shared/components/form/single-select-field";
import { useGetIssueTypesIssueTypesGet } from "~/types/client-api";

type Props<FormValues extends FieldValues> = {
  name: Path<FormValues>;
  label: string;
  control: Control<FormValues>;

  placeholder?: string;
};

export function IssueTypeField<FormValues extends FieldValues>({
  control,
  name,
  placeholder,
  label,
}: Props<FormValues>) {
  const { data: issueTypes } = useGetIssueTypesIssueTypesGet();

  const preparedItems = issueTypes?.items.map(({ name, id }) => ({
    value: id,
    label: name,
  }));

  return (
    <SingleSelectField
      control={control}
      options={preparedItems || []}
      label={label}
      name={name}
      placeholder={placeholder}
    />
  );
}
