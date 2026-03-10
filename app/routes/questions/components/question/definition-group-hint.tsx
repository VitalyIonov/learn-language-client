import { clsx } from "clsx";
import { useI18n } from "~/shared/hooks/useI18n";
import type { DefinitionGroup } from "~/types/client-schemas";

type Props = {
  group: DefinitionGroup;
};

export function DefinitionGroupHint({ group }: Props) {
  const { t } = useI18n("definitionGroup");

  return (
    <div className="mr-4 mb-8 ml-4">
      <span
        className={clsx(
          "inline-block",
          "rounded-full",
          "bg-indigo-700/30",
          "px-3 py-1",
          "text-xs font-medium text-indigo-300",
        )}
      >
        {t(`labels.${group}`)}
      </span>
      <p className="mt-2 text-sm text-gray-400">
        {t(`instructions.${group}`)}
      </p>
    </div>
  );
}
