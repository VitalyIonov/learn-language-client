import { SingleSelect } from "~/shared/components/single-select";
import { useI18n } from "~/shared/hooks/useI18n";
import {
  useGetTargetLanguagesList,
  useGetCurrentUser,
} from "~/types/client-api";

export function TargetLanguageSelect() {
  const { t } = useI18n("page.settings");
  const { data: targetLanguages, isLoading } = useGetTargetLanguagesList();
  const { data: currentUser } = useGetCurrentUser();

  const currentValue = currentUser?.targetLanguage ?? null;
  const isDisabled = !currentValue || isLoading;

  return (
    <SingleSelect
      label={t("fields.targetLanguage.label")}
      value={currentUser?.targetLanguage ?? null}
      disabled={isDisabled}
      onChange={() => {}}
      options={
        targetLanguages?.items.map((item) => ({
          value: item.code,
          label: item.displayName,
        })) ?? []
      }
    />
  );
}
