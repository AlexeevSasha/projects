import { createBrowserRouter, RouterProvider } from "react-router-dom";

export const RouterCustomProvider = () => {
  return <RouterProvider router={createBrowserRouter([])} />;
};
