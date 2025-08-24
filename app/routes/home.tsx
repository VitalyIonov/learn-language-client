import type { Route } from "./+types/home";
import { PageContent, PageTitle } from "~/shared/components";
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
      <PageContent>
        <PageTitle title="Categories" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {data?.items.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </PageContent>
    </div>
  );
}
