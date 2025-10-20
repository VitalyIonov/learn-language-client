import { clsx } from "clsx";
import React, { Fragment, useRef } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
  Transition,
  Description,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  /** sm | md | lg */
  size?: "sm" | "md" | "lg";
  /** показать футер с кнопками */
  footer?: React.ReactNode;
};

const sizeMap = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  size = "md",
  footer,
}: ModalProps) {
  const initialFocusRef = useRef<HTMLButtonElement | null>(null);

  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={onClose}
        initialFocus={initialFocusRef}
      >
        {/* overlay */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DialogBackdrop className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm" />
        </TransitionChild>

        {/* container */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            {/* panel */}
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 translate-y-2 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-2 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                className={[
                  "w-full",
                  sizeMap[size],
                  // визуальный стиль под скрин
                  "rounded-2xl border border-slate-700/70",
                  "bg-slate-800 text-slate-200",
                  "shadow-[0_10px_30px_-5px_rgba(0,0,0,0.6)]",
                ].join(" ")}
              >
                {/* header */}
                <div
                  className={clsx(
                    "flex items-start justify-between gap-4",
                    "mb-4 p-5 pb-3",
                    "border-b border-slate-700/60",
                  )}
                >
                  <div>
                    {title && (
                      <DialogTitle className="text-lg font-semibold text-slate-100">
                        {title}
                      </DialogTitle>
                    )}
                    {description && (
                      <Description className="mt-1 text-sm text-slate-400">
                        {description}
                      </Description>
                    )}
                  </div>

                  <button
                    ref={initialFocusRef}
                    onClick={onClose}
                    aria-label="Close"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-xl
                               text-slate-300 hover:bg-slate-700/60 hover:text-white
                               focus:ring-2 focus:ring-indigo-400/50 focus:outline-none"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </div>

                {/* body */}
                <div className="px-5 pt-2 pb-5">{children}</div>

                {/* footer */}
                {footer && (
                  <div className="flex items-center justify-end gap-3 border-t border-slate-700/60 px-5 py-4">
                    {footer}
                  </div>
                )}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
