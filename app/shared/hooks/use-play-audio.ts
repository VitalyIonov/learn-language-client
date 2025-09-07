import { useRef, useCallback } from "react";

const THRESHOLD = 500;

export function usePlayAudio(url?: string) {
  const timerRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const stop = useCallback(() => {
    if (!url) return;

    clearTimer();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [url]);

  const start = useCallback(() => {
    if (!url) return;

    clearTimer();
    timerRef.current = window.setTimeout(async () => {
      if (!audioRef.current) {
        audioRef.current = new Audio();
        audioRef.current.preload = "auto";
      }
      audioRef.current.src = url;
      try {
        await audioRef.current.play();
      } catch (e) {
        console.warn("Autoplay blocked or play failed:", e);
      }
    }, THRESHOLD);
  }, [url]);

  return {
    onPointerDown: start,
    onPointerUp: stop,
    onPointerLeave: stop,
    onPointerCancel: stop,
  };
}
