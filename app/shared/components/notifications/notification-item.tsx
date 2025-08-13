import React from "react";
import { Transition } from "@headlessui/react";
import {
  XMarkIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { clsx } from "clsx";
import {
  type Notification,
  type NotificationType,
  useNotificationStore,
} from "~/shared/stores";

type StandardNotificationType = Exclude<NotificationType, "level-up">;

const notificationIcons: Record<StandardNotificationType, React.ElementType> = {
  success: CheckCircleIcon,
  error: XCircleIcon,
  warning: ExclamationTriangleIcon,
  info: InformationCircleIcon,
};

const notificationStyles: Record<StandardNotificationType, string> = {
  success: "bg-green-50 border-green-200 text-green-800",
  error: "bg-red-50 border-red-200 text-red-800",
  warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
  info: "bg-blue-50 border-blue-200 text-blue-800",
};

const iconStyles: Record<StandardNotificationType, string> = {
  success: "text-green-400",
  error: "text-red-400",
  warning: "text-yellow-400",
  info: "text-blue-400",
};

interface NotificationItemProps {
  notification: Notification;
  show: boolean;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  show,
}) => {
  const { removeNotification } = useNotificationStore();
  const Icon = notificationIcons[notification.type as StandardNotificationType];

  const handleClose = () => {
    removeNotification(notification.id);
  };

  return (
    <Transition
      show={show}
      appear
      enter="transform ease-out duration-1000 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className={clsx(
          "ring-opacity-5 pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg border shadow-lg ring-1 ring-black",
          notificationStyles[notification.type as StandardNotificationType],
        )}
      >
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Icon
                className={clsx(
                  "h-6 w-6",
                  iconStyles[notification.type as StandardNotificationType],
                )}
                aria-hidden="true"
              />
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium">{notification.title}</p>
              {notification.message && (
                <p className="mt-1 text-sm opacity-90">
                  {notification.message}
                </p>
              )}
            </div>
            <div className="ml-4 flex flex-shrink-0">
              <button
                type="button"
                className="inline-flex rounded-md opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                onClick={handleClose}
              >
                <span className="sr-only">Закрыть</span>
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
};
