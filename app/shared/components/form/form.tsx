import React from "react";
import type { DetailedHTMLProps, FormHTMLAttributes } from "react";
import { FormProvider } from "react-hook-form";
import type {
  FieldValues,
  UseFormReturn,
  SubmitHandler,
} from "react-hook-form";

type Props<T extends FieldValues = FieldValues> = {
  methods: UseFormReturn<T>;

  onSubmit: SubmitHandler<T>;
} & Omit<
  DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>,
  "onSubmit"
>;

export const Form = <T extends FieldValues = FieldValues>({
  id,
  children,
  methods,
  onSubmit,
  ...htmlProps
}: Props<T>) => {
  return (
    <form
      className="flex flex-col gap-4"
      noValidate
      id={id}
      onSubmit={methods.handleSubmit(onSubmit)}
      {...htmlProps}
    >
      <FormProvider {...methods}>{children}</FormProvider>
    </form>
  );
};
