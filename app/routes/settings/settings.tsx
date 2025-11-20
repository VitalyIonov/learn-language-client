import { useRevalidator } from "react-router";

import { PageTitle, PageContent } from "~/shared/components";
import { SingleSelect } from "~/shared/components/single-select";
import { useI18n } from "~/shared/hooks/useI18n";
import { useUpdateSettingsLanguage } from "~/types/client-api";
import { type SettingsLangUpdateLang } from "~/types/client-schemas";

export default function Settings() {
  const revalidator = useRevalidator();
  const { lang, t } = useI18n("page.settings");
  const { mutateAsync: updateLanguageSettings } = useUpdateSettingsLanguage({
    mutation: { onSuccess: revalidator.revalidate },
  });

  const handleLangChange = async (lang: SettingsLangUpdateLang | null) => {
    if (lang) {
      await updateLanguageSettings({ data: { lang } });
    }
  };

  return (
    <PageContent>
      <PageTitle title={t("title")} />
      <div className="grid grid-cols-1 grid-rows-[auto_auto] gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        <SingleSelect
          label={t("fields.mainLanguage.label")}
          value={lang as SettingsLangUpdateLang}
          onChange={handleLangChange}
          options={[
            { value: "ru", label: "Русский" },
            { value: "en", label: "English" },
            { value: "es", label: "Español" },
            { value: "fr", label: "Français" },
            { value: "it", label: "Italiano" },
          ]}
        />
      </div>
    </PageContent>
  );
}
