import { useRevalidator } from "react-router";

import { SingleSelect } from "~/shared/components/single-select";
import { useI18n } from "~/shared/hooks/useI18n";
import {
  useGetInterfaceLanguagesList,
  useUpdateSettingsInterfaceLanguage,
} from "~/types/client-api";
import type { InterfaceLanguageCode } from "~/types/client-schemas";

export function InterfaceLanguageSelect() {
  const revalidator = useRevalidator();
  const { lang, t } = useI18n("page.settings");
  const { data: interfaceLanguages, isLoading } =
    useGetInterfaceLanguagesList();

  const { mutateAsync: updateInterfaceLanguage, isPending } =
    useUpdateSettingsInterfaceLanguage({
      mutation: { onSuccess: revalidator.revalidate },
    });

  const isDisabled = isLoading || isPending;

  const handleChange = async (value: InterfaceLanguageCode | null) => {
    if (value && value !== lang) {
      await updateInterfaceLanguage({ data: { interfaceLang: value } });
    }
  };

  return (
    <SingleSelect
      label={t("fields.mainLanguage.label")}
      value={lang as InterfaceLanguageCode}
      disabled={isDisabled}
      onChange={handleChange}
      options={
        interfaceLanguages?.items.map((item) => ({
          value: item.code,
          label: item.displayName,
        })) ?? []
      }
    />
  );
}
