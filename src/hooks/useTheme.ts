import { useCallback, useEffect, useState } from "react";
import { flushSync } from "react-dom";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";
const THEME_COLORS: Record<Theme, string> = { light: "#ffffff", dark: "#111113" };

const readTheme = (): Theme =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";

const storedTheme = (): Theme | null => {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
};

const applyTheme = (theme: Theme) => {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLORS[theme]);
};

/**
 * Light/dark theme. The initial class is set before paint by the inline
 * script in index.html (stored choice, else the OS setting); this hook keeps
 * React in sync, persists explicit choices, and follows OS changes until the
 * visitor picks a theme themselves.
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(readTheme);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event: MediaQueryListEvent) => {
      if (storedTheme()) return;
      const next: Theme = event.matches ? "dark" : "light";
      applyTheme(next);
      setThemeState(next);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  /**
   * Switches theme. Given the point the visitor clicked, the new theme grows
   * out of it as a circle (View Transitions API); browsers without it, and
   * reduced-motion visitors, switch instantly.
   */
  const toggleTheme = useCallback((origin?: { x: number; y: number }) => {
    const next: Theme = readTheme() === "dark" ? "light" : "dark";
    const commit = () => {
      applyTheme(next);
      setThemeState(next);
    };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!origin || reduced || !document.startViewTransition) {
      commit();
    } else {
      // flushSync so the "new" snapshot already has the swapped toggle icon.
      const transition = document.startViewTransition(() => flushSync(commit));
      transition.ready
        .then(() => {
          const { x, y } = origin;
          const radius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y),
          );
          document.documentElement.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
            {
              duration: 700,
              easing: "cubic-bezier(0.65, 0, 0.35, 1)",
              pseudoElement: "::view-transition-new(root)",
            },
          );
        })
        .catch(() => {
          // Transition skipped (e.g. another one started): the theme is applied anyway.
        });
    }

    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Private mode / blocked storage: the choice just won't persist.
    }
  }, []);

  return { theme, toggleTheme };
}
