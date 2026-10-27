"use client";

import { useSyncExternalStore } from "react";

/** Server and first client render report `false`, so markup always starts in its stacked/static form. */
export function useMedia(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
