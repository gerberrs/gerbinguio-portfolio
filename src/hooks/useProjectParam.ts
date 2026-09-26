import { useCallback, useEffect, useState } from "react";

const PARAM = "project";

const read = () => new URLSearchParams(window.location.search).get(PARAM);

/**
 * The open case study lives in `?project=<slug>` so a project can be linked
 * directly, without adding routes to a one-page site.
 */
export function useProjectParam() {
  const [slug, setSlugState] = useState<string | null>(read);

  useEffect(() => {
    const onPop = () => setSlugState(read());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const setSlug = useCallback((next: string | null) => {
    const url = new URL(window.location.href);
    if (next) url.searchParams.set(PARAM, next);
    else url.searchParams.delete(PARAM);
    window.history.replaceState(window.history.state, "", url);
    setSlugState(next);
  }, []);

  return [slug, setSlug] as const;
}
