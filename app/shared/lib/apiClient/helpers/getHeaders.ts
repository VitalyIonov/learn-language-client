type Headers = Record<string, string>;

export function getHeaders() {
  const headers: Headers = {
    Accept: "*/*",
  };

  return headers;
}
