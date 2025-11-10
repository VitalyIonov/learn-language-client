import { useRevalidator } from "react-router";

import { PageTitle, PageContent } from "~/shared/components";
import { SingleSelect } from "~/shared/components/single-select";
import { useI18n } from "~/shared/hooks/useI18n";
import { useUpdateLanguageSettingsLangPatch } from "~/types/client-api";

export default function Settings() {
  const revalidator = useRevalidator();
  const { lang } = useI18n();
  const { mutateAsync: updateLanguageSettings } =
    useUpdateLanguageSettingsLangPatch({
      mutation: { onSuccess: revalidator.revalidate },
    });

  const handleLangChange = async (lang: string | null) => {
    if (lang) {
      await updateLanguageSettings({ data: { lang } });
    }
  };

  return (
    <PageContent>
      <PageTitle title="Настройки" />
      <div className="grid grid-cols-1 grid-rows-[auto_auto] gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        <SingleSelect
          value={lang}
          onChange={handleLangChange}
          options={[
            { value: "ru", label: "Русский" },
            { value: "en", label: "English" },
          ]}
        />
      </div>
    </PageContent>
  );
}
