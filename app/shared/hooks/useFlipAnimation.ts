import { useState, useRef } from "react";

export function useFlipAnimation() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastTouchRef = useRef<number>(0);

  const toggleFlipped = () => {
    if (isAnimating) return;

    setIsFlipped((state) => !state);
    setIsAnimating(true);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const resetFlipped = () => {
    if (isAnimating) return;

    if (isFlipped) {
      setIsFlipped(false);
      setIsAnimating(true);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }
  };

  const handleDoubleClick = () => {
    toggleFlipped();
  };

  const handleClick = () => {
    resetFlipped();
  };

  const handleTouchStart = () => {
    const now = Date.now();
    const timeDiff = now - lastTouchRef.current;

    if (timeDiff < 300 && timeDiff > 0) {
      toggleFlipped();
    } else if (isFlipped) {
      resetFlipped();
    }

    lastTouchRef.current = now;
  };

  return {
    isFlipped,
    isAnimating,
    handleDoubleClick,
    handleClick,
    handleTouchStart,
  };
}
