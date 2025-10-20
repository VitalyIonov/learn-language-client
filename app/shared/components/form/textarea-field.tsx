import type { Control, FieldValues, Path } from "react-hook-form";

import { FormField } from "~/shared/components/form/form-field";
import { FormItem } from "~/shared/components/form/form-item";
import { FormLabel } from "~/shared/components/form/form-label";
import { FormMessage } from "~/shared/components/form/form-message";
import { FormControl } from "~/shared/components/form/form-control";
import { Textarea } from "~/shared/components/textarea";

type Props<FormValues extends FieldValues> = {
  name: Path<FormValues>;
  label: string;
  control: Control<FormValues>;

  placeholder?: string;
};

export function TextareaField<FormValues extends FieldValues>({
  control,
  name,
  placeholder,
  label,
}: Props<FormValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
