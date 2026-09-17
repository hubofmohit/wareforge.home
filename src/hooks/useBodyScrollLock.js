import { useEffect, useRef } from "react";

// Locks background scroll behind a modal in a way that also works on iOS
// Safari, where `overflow: hidden` on <body> alone doesn't prevent the
// page scrolling underneath a fixed-position modal. Pinning the body at
// its current scroll offset avoids that. Call with `active = true` while
// a modal/lightbox is open.
export function useBodyScrollLock(active) {
  const offsetRef = useRef(0);

  useEffect(() => {
    if (!active) return undefined;

    offsetRef.current = window.pageYOffset || document.documentElement.scrollTop || 0;
    const body = document.body;
    body.style.position = "fixed";
    body.style.top = `-${offsetRef.current}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      window.scrollTo(0, offsetRef.current);
    };
  }, [active]);
}
