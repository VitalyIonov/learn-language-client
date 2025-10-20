import React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { clsx } from "clsx";

import { useFormField } from "~/shared/hooks/use-form-field";

export const FormLabel = ({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) => {
  const { error, formItemId } = useFormField();

  return (
    <LabelPrimitive.Root
      data-slot="form-label"
      data-error={!!error}
      className={clsx(
        "flex items-center gap-2",
        "text-sm leading-none font-medium",
        "select-none",
        "data-[error=true]:text-destructive group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      htmlFor={formItemId}
      {...props}
    />
  );
};
