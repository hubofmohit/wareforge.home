import { useEffect, useRef, useState } from "react";

function formatValue(current, isLarge) {
  return isLarge ? (current / 1000000).toFixed(1) + "M+" : current + "+";
}

// Animates 0 -> target with an ease-out curve once the returned ref
// scrolls into view. Mirrors the original animateCounter()/animateStats()
// pair, but as a self-contained hook per stat item.
export function useCountUp(target, { duration = 2000, suffix = "+" } = {}) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(suffix === "+" ? "0+" : "0");

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(node);

        const isLarge = target > 10000;
        const startTime = performance.now();

        function tick(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeOutQuad = progress * (2 - progress);
          const current = Math.floor(target * easeOutQuad);
          setDisplay(formatValue(current, isLarge));
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, [target, duration]);

  return [ref, display];
}
