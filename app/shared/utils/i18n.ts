import { InterfaceLanguageCode } from "~/types/client-schemas";

export function getLangFromCookie(cookieHeader?: string | null) {
  const m = /(?:^|;\s*)interface_lang=([^;]+)/.exec(cookieHeader ?? "");
  return m ? decodeURIComponent(m[1]) : undefined;
}

const DEFAULT_LANG = InterfaceLanguageCode.EN;
const VALID_LANGS = new Set(Object.values(InterfaceLanguageCode));

export function normalizeLang(raw?: string | null) {
  const short = (raw ?? "").split(",")[0]?.split("-")[0] || DEFAULT_LANG;
  return VALID_LANGS.has(short as InterfaceLanguageCode) ? short : DEFAULT_LANG;
}

export function getDeep(obj: any, path: string) {
  return path
    .split(".")
    .reduce((acc, k) => (acc != null ? acc[k] : undefined), obj);
}

export function createTranslator(
  messages: Record<string, any>,
  prefix?: string,
) {
  return (key: string, fallback?: string) => {
    const keyWithPrefix = prefix ? `${prefix}.${key}` : key;

    const v = getDeep(messages, keyWithPrefix);
    return v ?? fallback ?? keyWithPrefix;
  };
}
