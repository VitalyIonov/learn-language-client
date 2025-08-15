import { useParams } from "react-router";

import { LevelTabs } from "~/routes/questions/components/level-tabs";
import { useReadCategoryCategoriesCategoryIdGet } from "~/types/client-api";

export default function Questions() {
  const { id } = useParams();
  const { data } = useReadCategoryCategoriesCategoryIdGet(Number(id));

  return (
    <div>
      <LevelTabs initialLevel={data?.currentLevel.id} categoryId={Number(id)} />
    </div>
  );
}
