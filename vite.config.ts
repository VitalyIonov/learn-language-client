import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import devtoolsJson from "vite-plugin-devtools-json";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    base: "/",
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths(), devtoolsJson()],
    define: {
      "process.env.VITE_API_URL": JSON.stringify(env.VITE_API_URL),
    },
    server: {
      host: true,
      port: 5174,
    },
  };
});
