import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppShell } from "./layout/AppShell";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
