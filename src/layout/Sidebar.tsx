import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { NAV } from "@/constants/sidebar";
import { Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
// import ThemeToggle from "./ThemeToggle";

export default function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav aria-label="Workspace" className="flex h-full flex-col gap-1 p-3.5">
      <div className="font-answer px-2.5 pb-3.5 text-xl font-semibold">
        Cairn
      </div>
      {/* TODO: workspace switcher (Acme Finance, members) */}
      <div className="mb-3.5 rounded-lg border bg-card px-3 py-2 text-sm">
        Acme Finance
      </div>

      {NAV.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground",
              isActive && "bg-card text-foreground ring-1 ring-border",
            )
          }
        >
          <Icon className="size-4" />
          {label}
        </NavLink>
      ))}

      <div className="px-3 pt-5 pb-1 text-xs text-muted-foreground">Recent</div>
      {/* TODO: recent conversations list (QUERY_KEYS.conversations) */}

      <div className="mt-auto">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle theme"
          // onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {/* {theme === "dark" ? <Sun /> : <Moon />} */}
          <Moon />
        </Button>
      </div>
    </nav>
  );
}
