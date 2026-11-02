import { createBrowserRouter, RouterProvider } from "react-router-dom";
import type { ComponentType } from "react";
import AppShell from "./layout/AppShell";

const page = (load: () => Promise<{ default: ComponentType }>) => ({
  lazy: async () => ({ Component: (await load()).default }),
});

const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      {
        index: true,
        ...page(() => import("@/pages/Chat")),
      },
      {
        path: "library",
        ...page(() => import("@/pages/Library")),
      },
      {
        path: "quality",
        ...page(() => import("@/pages/Quality")),
      },
      {
        path: "settings",
        ...page(() => import("@/pages/Settings")),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
