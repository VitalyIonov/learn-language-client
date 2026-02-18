export function getLangFromCookie(cookieHeader?: string | null) {
  const m = /(?:^|;\s*)interface_lang=([^;]+)/.exec(cookieHeader ?? "");
  return m ? decodeURIComponent(m[1]) : undefined;
}

export function normalizeLang(raw?: string | null) {
  const short = (raw ?? "").toLowerCase().split(",")[0]?.split("-")[0] || "en";
  return ["en", "ru", "es", "fr", "it"].includes(short) ? short : "en";
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
