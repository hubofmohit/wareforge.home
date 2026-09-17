import { useEffect, useRef } from "react";

// Reusable perspective-tilt-on-hover, used by expertise items, contact
// cards, project cards, and the "Get Access" card in the original site.
// `strength` divides the rotation (higher = subtler tilt); `lift` adds a
// translateY/translateZ on hover.
export function useTilt({ strength = 15, translateY = -10, translateZ = 20 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    function handleMove(e) {
      const rect = node.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateY = (x - centerX) / strength;
      const rotateX = (centerY - y) / strength;

      node.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${translateY}px) translateZ(${translateZ}px)`;
    }

    function handleLeave() {
      node.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) translateY(0) translateZ(0)";
    }

    node.addEventListener("mousemove", handleMove);
    node.addEventListener("mouseleave", handleLeave);
    return () => {
      node.removeEventListener("mousemove", handleMove);
      node.removeEventListener("mouseleave", handleLeave);
    };
  }, [strength, translateY, translateZ]);

  return ref;
}
