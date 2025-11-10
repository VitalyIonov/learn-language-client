import { createContext } from "react";
import { type Messages } from "~/shared/types/i18n";

export type Context = {
  lang: string;
  messages: Messages;
  t: (key: string) => string;
};

export const I18nContext = createContext<Context | null>(null);
