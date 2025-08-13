import { create } from "zustand";

export type NotificationType =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "level-up";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
  timestamp: number;
}

interface NotificationStore {
  notifications: Notification[];
  addNotification: (
    notification: Omit<Notification, "id" | "timestamp">,
  ) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
  success: (title: string, message?: string, duration?: number) => void;
  error: (title: string, message?: string, duration?: number) => void;
  warning: (title: string, message?: string, duration?: number) => void;
  info: (title: string, message?: string, duration?: number) => void;
  levelUp: (title: string, message?: string, duration?: number) => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [],

  addNotification: (notificationData) => {
    const notification: Notification = {
      id: generateId(),
      timestamp: Date.now(),
      duration: 5000,
      ...notificationData,
    };

    set((state) => ({
      notifications: [...state.notifications, notification],
    }));

    if (notification.duration) {
      setTimeout(() => {
        get().removeNotification(notification.id);
      }, notification.duration);
    }
  },

  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },

  clearAll: () => {
    set({ notifications: [] });
  },

  success: (title, message, duration = 4000) => {
    get().addNotification({
      type: "success",
      title,
      message,
      duration,
    });
  },

  error: (title, message, duration = 5000) => {
    get().addNotification({
      type: "error",
      title,
      message,
      duration,
    });
  },

  warning: (title, message, duration = 4000) => {
    get().addNotification({
      type: "warning",
      title,
      message,
      duration,
    });
  },

  info: (title, message, duration = 4000) => {
    get().addNotification({
      type: "info",
      title,
      message,
      duration,
    });
  },

  levelUp: (title, message, duration = 4000) => {
    get().addNotification({
      type: "level-up",
      title,
      message,
      duration,
    });
  },
}));
