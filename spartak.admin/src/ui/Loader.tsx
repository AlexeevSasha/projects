import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { theme } from "../assets/theme/theme";

export const Loader = () => (
  <ContainerLoader>
    <LoadingOutlined />
  </ContainerLoader>
);

const ContainerLoader = styled.div`
  position: fixed;
  z-index: 100;
  top: 0;
  left: calc(50% - 35px);

  & svg:first-child {
    width: 70px;
    height: 70px;
    fill: ${theme.colors.middleGray};
  }

  & > svg:last-child {
    position: absolute;
    width: 35px;
    height: 35px;
    top: calc(50% - 17.5px);
    left: calc(50% - 17.5px);
  }
`;
