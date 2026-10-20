import { BookOpen, Gauge, MessageSquare, Settings } from "lucide-react";
import { ROUTES } from ".";

export const NAV = [
  { to: ROUTES.chat, label: "Chat", icon: MessageSquare, end: true },
  { to: ROUTES.library, label: "Library", icon: BookOpen },
  { to: ROUTES.quality, label: "Quality", icon: Gauge },
  { to: ROUTES.settings, label: "Settings", icon: Settings },
];
