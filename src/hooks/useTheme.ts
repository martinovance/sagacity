import { ThemeContext } from "@/lib/theme-context";
import { useContext } from "react";

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside theme provider");
  return ctx;
}
