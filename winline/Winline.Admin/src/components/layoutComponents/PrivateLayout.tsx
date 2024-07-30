import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { FallBack } from "../../ui/commonComponents";
import { Loader } from "../../ui/Loader";
import { SidebarMenu } from "../SidebarMenu";

export const PrivateLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SidebarMenu />
      <Layout>
        <React.Suspense
          fallback={
            <FallBack>
              <Loader />
            </FallBack>
          }
        >
          <Outlet />
        </React.Suspense>
      </Layout>
    </Layout>
  );
};
