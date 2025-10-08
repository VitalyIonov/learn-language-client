import { useState, useRef, useEffect } from "react";

export function useFlipAnimation(timerTrigger: boolean) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const animEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoFlipTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastTouchRef = useRef<number>(0);

  useEffect(() => {
    if (!timerTrigger || !isFlipped) return;

    if (autoFlipTimerRef.current) clearTimeout(autoFlipTimerRef.current);
    autoFlipTimerRef.current = setTimeout(() => {
      setIsFlipped(false);
      setIsAnimating(true); // старт анимации скрытия
    }, 3000);

    return () => {
      if (autoFlipTimerRef.current) clearTimeout(autoFlipTimerRef.current);
    };
  }, [timerTrigger, isFlipped]);

  useEffect(() => {
    if (!isAnimating) return;
    if (animEndTimerRef.current) clearTimeout(animEndTimerRef.current);
    animEndTimerRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, 500);
    return () => {
      if (animEndTimerRef.current) clearTimeout(animEndTimerRef.current);
    };
  }, [isAnimating]);

  const toggleFlipped = () => {
    if (isAnimating) return;
    setIsFlipped((v) => !v);
    setIsAnimating(true);
    if (autoFlipTimerRef.current) clearTimeout(autoFlipTimerRef.current);
  };

  const resetFlipped = () => {
    if (isAnimating || !isFlipped) return;
    setIsFlipped(false);
    setIsAnimating(true);
    if (autoFlipTimerRef.current) clearTimeout(autoFlipTimerRef.current);
  };

  const handleDoubleClick = () => toggleFlipped();
  const handleClick = () => resetFlipped();

  const handleTouchStart = () => {
    const now = Date.now();
    const diff = now - lastTouchRef.current;
    if (diff > 0 && diff < 300) {
      toggleFlipped();
    } else if (isFlipped) {
      resetFlipped();
    }
    lastTouchRef.current = now;
  };

  return {
    isFlipped,
    isAnimating,
    onDoubleClick: handleDoubleClick,
    onClick: handleClick,
    onTouchStart: handleTouchStart,
  };
}
