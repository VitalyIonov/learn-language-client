import { useRef, useCallback, useState } from "react";

const THRESHOLD = 500;

export function usePlayAudio(url?: string) {
  const timerRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const clearTimer = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const stop = useCallback(() => {
    if (!url) return;

    clearTimer();
    setIsPlaying(false);
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
        setIsPlaying(true);
        await audioRef.current.play();

        audioRef.current.onended = () => {
          setIsPlaying(false);
        };
      } catch (e) {
        setIsPlaying(false);
        console.warn("Autoplay blocked or play failed:", e);
      }
    }, THRESHOLD);
  }, [url]);

  return {
    isPlaying,
    onPointerDown: start,
    onPointerUp: stop,
    onPointerLeave: stop,
    onPointerCancel: stop,
    // Touch events для мобильных устройств
    onTouchStart: start,
    onTouchEnd: stop,
    onTouchCancel: stop,
    // Mouse events как fallback
    onMouseDown: start,
    onMouseUp: stop,
    // onMouseLeave: stop,
  };
}
