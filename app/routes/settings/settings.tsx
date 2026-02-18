import { PageTitle, PageContent } from "~/shared/components";
import { useI18n } from "~/shared/hooks/useI18n";
import { InterfaceLanguageSelect } from "./components/interface-language-select/interface-language-select";
import { TargetLanguageSelect } from "./components/target-language-select/target-language-select";

export default function Settings() {
  const { t } = useI18n("page.settings");

  return (
    <PageContent>
      <PageTitle title={t("title")} />
      <div className="grid grid-cols-1 grid-rows-[auto_auto] gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        <InterfaceLanguageSelect />
        <TargetLanguageSelect />
      </div>
    </PageContent>
  );
}
