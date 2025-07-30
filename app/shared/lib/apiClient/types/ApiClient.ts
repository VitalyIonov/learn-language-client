export type ApiClientConfig = {
  customOptions: Record<string, boolean>;
  onError?: (error: any, apiClientConfig: ApiClientConfig) => void;
  onSuccess?: (response: any) => void;
};
