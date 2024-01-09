import { theme } from "common/styles/theme";
import React, { useEffect, useState } from "react";
import { MetaTags } from "react-meta-tags";
import { useHistory } from "react-router-dom";
import { IconArrowViolation } from "common/components/Icon/IconArrowViolation";
import styled from "styled-components";
import { WorkSection } from "common/components/Container/WorkSection";
import { RegistryPlatformRequest } from "../../api/registryPlatformRequest";
import { ManualUser } from "./components/ManualUser";
import { useDispatch } from "react-redux";
import { authorizationThunk } from "../../module/authorization/authorizationThunk";

export const PageVersion = () => {
  const [state, setState] = useState({ version: "", bdVersion: "" });
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authorizationThunk());
    new RegistryPlatformRequest().getVersion().then(setState);
  }, [dispatch]);

  return (
    <>
      <MetaTags>
        <title>Версии</title>
      </MetaTags>
      <WorkSection hideLeftMenu>
        <BackBtn onClick={() => history.goBack()}>
          <IconArrowViolation rotate="90deg" /> Назад
        </BackBtn>
        <div>
          <Name>Версия фронта: {""}</Name>
          <span>{process.env.REACT_APP_VERSION}</span>
        </div>
        <div>
          <Name>Версия бэка: {""}</Name>
          <span>{state.version}</span>
        </div>
        <div>
          <Name>Версия DB: {""}</Name>
          <span>{state.bdVersion}</span>
        </div>
        <ManualUser />
      </WorkSection>
    </>
  );
};
const Name = styled.span`
  color: ${theme.colors.hightBlue};
`;

const BackBtn = styled.div`
  color: ${theme.colors.black};
  margin: 50px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
`;
