import { useSyncExternalStore } from "react";

const noop = () => {};

export function useMediaQuery(query) {
  const subscribe = (cb) => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return noop;
    const mql = window.matchMedia(query);
    if (mql.addEventListener) {
      mql.addEventListener("change", cb);
      return () => mql.removeEventListener("change", cb);
    }
    mql.addListener(cb);
    return () => mql.removeListener(cb);
  };
  const getSnapshot = () =>
    typeof window !== "undefined" && typeof window.matchMedia === "function"
      ? window.matchMedia(query).matches
      : false;
  const getServerSnapshot = () => false;
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export const useIsMobile = () => useMediaQuery("(max-width: 768px)");
