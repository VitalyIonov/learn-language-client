import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/statistics", "routes/statistics/statistics.tsx"),
  route("/settings", "routes/settings/settings.tsx"),
  route("/category/:id", "routes/category/category.tsx"),
  route("/category/:id/questions", "routes/questions/questions.tsx"),
] satisfies RouteConfig;
