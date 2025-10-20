import React from "react";

import {
  type FormItemContextValue,
  type FormFieldContextValue,
} from "~/shared/types/form";

export const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

export const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);
