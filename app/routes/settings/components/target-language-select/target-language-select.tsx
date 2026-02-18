import { SingleSelect } from "~/shared/components/single-select";
import { useI18n } from "~/shared/hooks/useI18n";
import {
  useGetTargetLanguagesList,
  useGetCurrentUser,
  useUpdateSettingsTargetLanguage,
} from "~/types/client-api";
import type { TargetLanguageCode } from "~/types/client-schemas";

export function TargetLanguageSelect() {
  const { t } = useI18n("page.settings");
  const { data: targetLanguages, isLoading } = useGetTargetLanguagesList();
  const { data: currentUser, refetch: invalidateCurrentUser } =
    useGetCurrentUser();

  const { mutateAsync: updateTargetLanguage, isPending } =
    useUpdateSettingsTargetLanguage();

  const currentValue = currentUser?.targetLanguage ?? null;
  const isDisabled = !currentValue || isLoading || isPending;

  const handleChange = async (value: TargetLanguageCode | null) => {
    if (value && value !== currentValue) {
      await updateTargetLanguage(
        {
          data: { targetLanguage: value },
        },
        { onSuccess: () => invalidateCurrentUser() },
      );
    }
  };

  return (
    <SingleSelect
      label={t("fields.targetLanguage.label")}
      value={currentValue}
      disabled={isDisabled}
      onChange={handleChange}
      options={
        targetLanguages?.items.map((item) => ({
          value: item.code,
          label: item.displayName,
        })) ?? []
      }
    />
  );
}
