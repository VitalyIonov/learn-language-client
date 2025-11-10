import { useContext } from "react";
import { I18nContext } from "~/shared/context/i18n";

export function useI18n(prefix?: string) {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");

  const { getT, ...restParams } = ctx;

  return {
    ...restParams,
    t: getT(prefix),
  };
}
