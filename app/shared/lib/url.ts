export const buildUrlWithParams = (
  url: string,
  params?: Record<string, string | number | boolean | undefined | null>,
): string => {
  if (!params) return url;

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `${url}?${queryString}` : url;
};
