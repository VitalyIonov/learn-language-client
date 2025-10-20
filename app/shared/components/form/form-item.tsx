import React from "react";
import { clsx } from "clsx";

import { FormItemContext } from "~/shared/context/form";

export const FormItem = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={clsx("grid gap-3", className)}
        {...props}
      />
    </FormItemContext.Provider>
  );
};
