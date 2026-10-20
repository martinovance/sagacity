import { Button } from "@/components/ui/button";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";
import Sidebar from "./Sidebar";

export function AppShell() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex h-dvh bg-background text-foreground">
      <aside className="hidden w-62 border-r border-sidebar-border lg:block">
        <Sidebar />
      </aside>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            aria-label="Close menu"
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-62 border-r border-sidebar-border bg-background">
            <Sidebar onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex justify-between items-center border-b px-4 py-2 lg:hidden">
          <Button>
            <Menu />
          </Button>
        </header>
        <span className="font-answer text-lg font-semibold">Cairn</span>
        <main className="min-h-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
