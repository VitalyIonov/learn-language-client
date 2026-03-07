import { useEffect } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";

import { SingleSelectField } from "~/shared/components/form/single-select-field";
import { useI18n } from "~/shared/hooks/useI18n";
import { useGetIssueTypesList } from "~/types/client-api";

type Props<FormValues extends FieldValues> = {
  name: Path<FormValues>;
  label: string;
  control: Control<FormValues>;

  placeholder?: string;
  setValue?: (name: Path<FormValues>, value: string) => void;
};

export function IssueTypeField<FormValues extends FieldValues>({
  control,
  name,
  placeholder,
  label,
  setValue,
}: Props<FormValues>) {
  const { t } = useI18n("issueTypes");
  const { data: issueTypes } = useGetIssueTypesList();

  const preparedItems = issueTypes?.items.map(({ name }) => ({
    value: name,
    label: t(name),
  }));

  useEffect(() => {
    if (preparedItems?.[0] && !control.getFieldState(name).isTouched) {
      setValue?.(name, preparedItems?.[0].value);
    }
  }, [issueTypes]);

  return (
    <SingleSelectField<FormValues, string>
      control={control}
      options={preparedItems || []}
      label={label}
      name={name}
      placeholder={placeholder}
    />
  );
}
