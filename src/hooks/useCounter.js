import { useEffect, useState, useCallback } from 'react';

export const useCounter = (end, duration = 2000, start = 0, autoStart = false) => {
  const [count, setCount] = useState(start);
  const [isAnimating, setIsAnimating] = useState(autoStart);

  useEffect(() => {
    if (!isAnimating) return;

    let startTime = null;
    const startValue = start;
    const endValue = end;
    let animationFrameId;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(startValue + (endValue - startValue) * easeOut);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isAnimating, end, duration, start]);

  const startAnimation = useCallback(() => {
    setIsAnimating(true);
  }, []);

  return [count, startAnimation];
};

