import { clsx } from "clsx";
import { DataSection } from "~/shared/components/data-section/data-section";
import { useI18n } from "~/shared/hooks/useI18n";
import type { CategoryProgressOut } from "~/types/client-schemas";

type Props = {
  className?: string;
  categories?: CategoryProgressOut[];
};

export const CategoriesProgressSection = ({ className, categories }: Props) => {
  const { t } = useI18n("page.statistics");

  if (!categories?.length) return null;

  return (
    <DataSection className={className}>
      <h2>{t("sections.categoriesProgress.title")}</h2>
      <div className="flex flex-col gap-4">
        {categories.map((category) => {
          const percent =
            category.maxScore > 0
              ? Math.round((category.currentScore / category.maxScore) * 100)
              : 0;

          return (
            <div key={category.id} className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-200">
                  {category.name}
                </span>
                <span className="text-sm text-zinc-400 tabular-nums">
                  {percent}%
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-zinc-700">
                <div
                  className={clsx(
                    "h-full rounded-full",
                    "bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-500",
                    "opacity-50 transition-[width] duration-500 ease-out",
                  )}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </DataSection>
  );
};
