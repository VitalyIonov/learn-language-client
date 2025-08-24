import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { XMarkIcon, TrophyIcon } from "@heroicons/react/24/outline";
import { type Notification, useNotificationStore } from "~/shared/stores";

interface LevelUpNotificationProps {
  notification: Notification;
  show: boolean;
}

export const LevelUpNotification: React.FC<LevelUpNotificationProps> = ({
  notification,
  show,
}) => {
  const { removeNotification } = useNotificationStore();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (show) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  const handleClose = () => {
    removeNotification(notification.id);
  };

  return (
    <Transition
      show={show}
      appear
      enter="transform ease-out duration-700 transition"
      enterFrom="scale-50 opacity-0 rotate-12"
      enterTo="scale-100 opacity-100 rotate-0"
      leave="transition ease-in duration-300"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <div className="pointer-events-auto relative w-full max-w-md overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-600 shadow-2xl ring-2 ring-emerald-400/30">
        {showConfetti && (
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="confetti animate-confetti absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        )}

        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-yellow-200/20 to-orange-200/20" />

        <div className="relative p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="relative">
                <TrophyIcon className="h-10 w-10 animate-bounce text-white drop-shadow-lg" />
                <div className="absolute inset-0 animate-ping">
                  <TrophyIcon className="h-10 w-10 text-emerald-200 opacity-75" />
                </div>
              </div>
            </div>

            <div className="ml-4 flex-1">
              <div className="text-center">
                <h3 className="animate-pulse text-2xl font-bold text-white drop-shadow-md">
                  🎉 {notification.title}
                </h3>
                {notification.message && (
                  <p className="mt-2 text-lg font-medium text-white/90 drop-shadow-sm">
                    {notification.message}
                  </p>
                )}
              </div>
            </div>

            <div className="ml-4 flex flex-shrink-0">
              <button
                type="button"
                className="inline-flex rounded-full bg-white/20 p-1.5 text-white transition-all hover:bg-white/30 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-orange-500 focus:outline-none"
                onClick={handleClose}
              >
                <span className="sr-only">Закрыть</span>
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div className="absolute top-2 left-2 h-3 w-3 animate-ping rounded-full bg-white/30" />
        <div className="absolute right-4 bottom-3 h-2 w-2 animate-pulse rounded-full bg-white/40" />
        <div className="absolute top-4 right-8 h-1 w-1 animate-bounce rounded-full bg-white/50" />
      </div>
    </Transition>
  );
};
