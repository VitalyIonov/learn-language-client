import React from "react";
import { Slot } from "@radix-ui/react-slot";

import { useFormField } from "~/shared/hooks/use-form-field";

type Props = React.ComponentProps<typeof Slot> & {
  hasError?: boolean;
};

export const FormControl = ({ ...props }: Props) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      hasError={Boolean(error)}
      {...props}
    />
  );
};
