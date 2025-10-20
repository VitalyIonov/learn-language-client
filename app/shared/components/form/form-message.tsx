import { clsx } from "clsx";
import React from "react";

import { useFormField } from "~/shared/hooks/use-form-field";

export const FormMessage = ({
  className,
  ...props
}: React.ComponentProps<"p">) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? "") : props.children;

  if (!body) {
    return null;
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={clsx("text-destructive text-sm text-red-400", className)}
      {...props}
    >
      {body}
    </p>
  );
};
