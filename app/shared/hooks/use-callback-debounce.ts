import { useEffect, useRef } from "react";

type Params<Callback extends () => void> = {
  callback: Callback;
  debounce: number;
};

const DEFAULT_DEBOUNCE = 1000;

export const useCallbackDebounce = <Callback extends () => void>({
  callback,
  debounce = DEFAULT_DEBOUNCE,
}: Params<Callback>) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cbRef = useRef<() => void>(callback);

  const resetTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => {
    cbRef.current = () => {
      callback();
      resetTimer();
    };
  }, [callback, timeoutRef]);

  const trigger = () => {
    resetTimer();
    timeoutRef.current = setTimeout(() => cbRef.current(), debounce);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    trigger,
    isTriggered: !!timeoutRef.current,
  };
};
