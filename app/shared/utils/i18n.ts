export function getLangFromCookie(cookieHeader?: string | null) {
  const m = /(?:^|;\s*)lang=([^;]+)/.exec(cookieHeader ?? "");
  return m ? decodeURIComponent(m[1]) : undefined;
}

export function normalizeLang(raw?: string | null) {
  const short = (raw ?? "").toLowerCase().split(",")[0]?.split("-")[0] || "ru";
  return ["en", "ru", "es"].includes(short) ? short : "ru";
}

export function getDeep(obj: any, path: string) {
  return path
    .split(".")
    .reduce((acc, k) => (acc != null ? acc[k] : undefined), obj);
}

export function createTranslator(messages: Record<string, any>) {
  return (key: string, fallback?: string) => {
    const v = getDeep(messages, key);
    return v ?? fallback ?? key; // никогда не возвращаем undefined
  };
}
