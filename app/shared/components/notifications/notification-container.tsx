import React from "react";
import { useNotificationStore } from "~/shared/stores";
import { NotificationItem } from "./notification-item";
import { LevelUpNotification } from "./level-up-notification";

export const NotificationContainer: React.FC = () => {
  const { notifications } = useNotificationStore();

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 z-50 flex items-end px-4 py-6 sm:items-start sm:p-6"
    >
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        {notifications.map((notification) => {
          if (notification.type === "level-up") {
            return (
              <LevelUpNotification
                key={notification.id}
                notification={notification}
                show={true}
              />
            );
          }

          if (notification.type === "category-finished") {
            return (
              <LevelUpNotification
                key={notification.id}
                notification={notification}
                show={true}
              />
            );
          }

          return (
            <NotificationItem
              key={notification.id}
              notification={notification}
              show={true}
            />
          );
        })}
      </div>
    </div>
  );
};
