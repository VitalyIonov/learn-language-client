import type { Route } from "./+types/home";
import { PageContent, PageTitle } from "~/shared/components";
import { useReadCategoriesCategoriesGet } from "~/types/client-api";
import { CategoryCard } from "~/entities/category-card/category-card";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Learn Language – Изучай языки легко" },
    {
      name: "description",
      content: "Платформа для изучения иностранных языков. Учись эффективно!",
    },

    // Open Graph
    { property: "og:title", content: "Learn Language – Изучай языки легко" },
    {
      property: "og:description",
      content: "Сервис для изучения иностранных языков.",
    },
    { property: "og:image", content: "https://learn-language.es/preview.png" },
    { property: "og:url", content: "https://learn-language.es/" },
    { property: "og:type", content: "website" },

    // Twitter Cards
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Learn Language – Изучай языки легко" },
    {
      name: "twitter:description",
      content: "Онлайн-платформа для изучения языков.",
    },
    { name: "twitter:image", content: "https://learn-language.es/preview.png" },
  ];
}

export default function Home() {
  const { data } = useReadCategoriesCategoriesGet();

  return (
    <div>
      <PageContent>
        <PageTitle title="Категории" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {data?.items.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </PageContent>
    </div>
  );
}
