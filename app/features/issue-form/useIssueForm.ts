import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type Schema, schema } from "~/features/issue-form/schema";

type Props = {
  defaultValues?: Schema;
};

export const useIssueForm = ({ defaultValues }: Props) => {
  const formMethods = useForm<Schema>({
    mode: "onSubmit",
    defaultValues,
    resolver: async (data, context, options) => {
      return zodResolver(schema)(data, context, options);
    },
  });

  const { watch, control } = formMethods;

  const formValues = watch();

  return {
    formMethods,
    control,
    formValues,
  };
};
