import { useEffect } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";

import { SingleSelectField } from "~/shared/components/form/single-select-field";
import { useGetIssueTypesIssueTypesGet } from "~/types/client-api";

type Props<FormValues extends FieldValues> = {
  name: Path<FormValues>;
  label: string;
  control: Control<FormValues>;

  placeholder?: string;
  setValue?: (name: Path<FormValues>, value: number) => void;
};

export function IssueTypeField<FormValues extends FieldValues>({
  control,
  name,
  placeholder,
  label,
  setValue,
}: Props<FormValues>) {
  const { data: issueTypes } = useGetIssueTypesIssueTypesGet();

  const preparedItems = issueTypes?.items.map(({ name, id }) => ({
    value: id,
    label: name,
  }));

  useEffect(() => {
    if (preparedItems?.[0] && !control.getFieldState(name).isTouched) {
      setValue?.(name, preparedItems?.[0].value);
    }
  }, [issueTypes]);

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
