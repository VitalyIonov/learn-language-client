import { defineConfig } from "orval";

export default defineConfig({
  clientApi: {
    input: {
      target: "http://localhost:8000/api/v1/client/openapi.json",
    },
    output: {
      target: "app/types/client-api.ts",
      schemas: "app/types/client-schemas",
      client: "react-query",
      override: {
        mutator: {
          path: "./app/shared/lib/apiClient/apiClient.ts",
          name: "request",
        },
      },
    },
  },
});
