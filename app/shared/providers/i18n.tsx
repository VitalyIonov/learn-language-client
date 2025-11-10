import React, { useMemo } from "react";

import { type Messages } from "~/shared/types/i18n";
import { type Context, I18nContext } from "~/shared/context/i18n";
import { createTranslator } from "~/shared/utils/i18n";

export function I18nProvider({
  lang,
  messages,
  children,
}: {
  lang: string;
  messages: Messages;
  children: React.ReactNode;
}) {
  const value = useMemo<Context>(
    () => ({
      lang,
      messages,
      getT: (prefix?: string) => createTranslator(messages, prefix),
    }),
    [lang, messages],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
