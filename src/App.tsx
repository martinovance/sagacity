import { createBrowserRouter, RouterProvider } from "react-router-dom";
import type { ComponentType } from "react";
import AppShell from "./layout/AppShell";
import ThemeProvider from "./context/ThemeProvider";

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
    ],
  },
]);

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
