import type { Route } from "./+types/home";
import { PageTitle } from "~/shared/components/page-title/page-title";
import { useReadCategoriesCategoriesGet } from "~/types/client-api";
import { CategoryCard } from "~/entities/category-card/category-card";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const { data } = useReadCategoriesCategoriesGet();

  return (
    <div>
      <PageTitle className="mb-24" title="Categories" />
      <div className="flex">
        {data?.items.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
