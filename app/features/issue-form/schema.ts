import { z } from "zod";

export const schema = z.object({
  issueTypeId: z.number({
    error: "Нужно выбрать тип обращения",
  }),
  text: z.string().optional().nullish(),
});

export type Schema = z.infer<typeof schema>;
