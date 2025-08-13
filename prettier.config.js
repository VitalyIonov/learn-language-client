/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindStylesheet: "./app/app.css",
  printWidth: 80,
  tailwindPreserveWhitespace: true,
};
