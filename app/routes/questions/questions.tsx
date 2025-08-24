import { useParams } from "react-router";

import { LevelTabs } from "~/routes/questions/components/level-tabs";
import { PageContent } from "~/shared/components";
import { useReadCategoryCategoriesCategoryIdGet } from "~/types/client-api";

export default function Questions() {
  const { id } = useParams();
  const { data } = useReadCategoryCategoriesCategoryIdGet(Number(id));

  return (
    <PageContent>
      <LevelTabs initialLevel={data?.currentLevel.id} categoryId={Number(id)} />
    </PageContent>
  );
}
