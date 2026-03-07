import { z } from "zod";
import { IssueTypeName } from "~/types/client-schemas";

export const schema = z.object({
  issueType: z.nativeEnum(IssueTypeName, {
    error: "Нужно выбрать тип обращения",
  }),
  text: z.string().optional().nullish(),
});

export type Schema = z.infer<typeof schema>;
