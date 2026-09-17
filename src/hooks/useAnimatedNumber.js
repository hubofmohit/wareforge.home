import { useEffect, useRef, useState } from "react";

// Animates from 0 to `target` (a plain integer, e.g. a visit count) any
// time `target` changes from null/undefined to a real number. Used by
// LiveAnalysis once the Supabase RPC resolves.
export function useAnimatedNumber(target, duration = 1400) {
  const [value, setValue] = useState(null);
  const frame = useRef(null);

  useEffect(() => {
    if (target === null || target === undefined) return undefined;

    const startTime = performance.now();
    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuad = progress * (2 - progress);
      setValue(Math.floor(target * easeOutQuad));
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    }
    frame.current = requestAnimationFrame(tick);

    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [target, duration]);

  return value;
}
