import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useMemo } from "react";
import { AuthProviderPaths, PrivateProviderPaths } from "@/common/constants/routers";
import { useUserStore } from "@/modules/user/user.store";

export const RouterCustomProvider = () => {
  const user = useUserStore((state) => state.user);

  const router = useMemo(() => createBrowserRouter(user?.id ? PrivateProviderPaths : AuthProviderPaths), [user?.id]);

  return <RouterProvider router={router} />;
};
