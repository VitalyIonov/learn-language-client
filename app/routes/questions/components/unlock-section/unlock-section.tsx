import { Button } from "~/shared/components";
import type { LevelOut } from "~/types/client-schemas";
import { useUnlockLevelLevelsUnlockPost } from "~/types/client-api";
import { useNotificationStore } from "~/shared/stores";

type Props = {
  level: LevelOut;
  categoryId: number;
  onUnlockSuccess: () => void;
};

export const UnlockSection = ({
  level,
  categoryId,
  onUnlockSuccess,
}: Props) => {
  const { mutateAsync: unlockLevel } = useUnlockLevelLevelsUnlockPost();
  const { success } = useNotificationStore();

  const handleUnlock = async () => {
    await unlockLevel(
      { params: { level_id: level.id, category_id: categoryId } },
      {
        onSuccess: () => {
          success(`Вы разблокировали новый уровень - ${level.alias}`);

          onUnlockSuccess();
        },
      },
    );
  };

  const title = `Разблокировать ${level.alias}`;

  return (
    <div className="flex w-full flex-col items-center justify-center py-48">
      <Button onClick={handleUnlock}>{title}</Button>
    </div>
  );
};
