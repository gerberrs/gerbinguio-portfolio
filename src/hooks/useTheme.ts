import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";

const getInitialTheme = (): Theme =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";

/** Reads/writes the `.dark` class set by the blocking script in index.html. */
export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const setThemeExplicit = useCallback((next: Theme) => setTheme(next), []);

  return { theme, setTheme: setThemeExplicit };
};
