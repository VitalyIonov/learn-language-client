import { useCallback, useEffect, useRef } from "react";

type Params<T extends (...args: any[]) => any> = {
  callback: T;
  debounce?: number;
};

const DEFAULT_DEBOUNCE = 1000;

export const useCallbackDebounce = <T extends (...args: any[]) => any>({
  callback,
  debounce = DEFAULT_DEBOUNCE,
}: Params<T>) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cbRef = useRef<T>(callback);

  const resetTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    cbRef.current = callback;
  }, [callback]);

  const trigger = useCallback(
    (...args: Parameters<T>): void => {
      resetTimer();
      timeoutRef.current = setTimeout(() => {
        cbRef.current(...args);
        resetTimer();
      }, debounce);
    },
    [debounce, resetTimer],
  );

  useEffect(() => {
    return () => {
      resetTimer();
    };
  }, [resetTimer]);

  return {
    trigger,
    isTriggered: !!timeoutRef.current,
  };
};
