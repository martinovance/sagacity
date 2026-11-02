import { useEffect, useState, type ReactNode } from "react";
import { ThemeContext, type Theme } from "@/lib/theme-context";

const initialTheme = (): Theme =>
  (localStorage.getItem("theme") as Theme | null) ??
  (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
