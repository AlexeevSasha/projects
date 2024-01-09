import { Layout } from "antd";
import { accessNames } from "common/constants/accessNames";
import { routePaths } from "common/constants/routePaths";
import { haveAccess } from "common/helpers/haveAccess";
import { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store";
import { dictionaryInit } from "store/dictionary/dictionaryActionAsync";
import styled from "styled-components";
import { SidebarMenu } from "ui/Sidebar/SidebarMenu";
import { rightsSelector } from "../store/auth/authSelectors";
import { Loader } from "./Loader";
import { IMenu } from "./Sidebar/SidebarList";

export const AppLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const rights = useSelector(rightsSelector);

  const canView = (access: IMenu["policy"]) => haveAccess(rights, access);

  useEffect(() => {
    dispatch(dictionaryInit());
  }, []);

  useEffect(() => {
    pathname === routePaths.base && canView(accessNames.media) && navigate(routePaths.media);
  }, [pathname]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SidebarMenu />

      <Layout>
        <Suspense
          fallback={
            <FallBack>
              <Loader />
            </FallBack>
          }
        >
          <Outlet />
        </Suspense>
      </Layout>
    </Layout>
  );
};

const FallBack = styled.div`
  background-color: rgb(240, 242, 245);
`;
