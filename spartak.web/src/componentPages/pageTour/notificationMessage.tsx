import React, { FC } from "react";
import styled from "styled-components";
import { theme } from "../../assets/theme/theme";
import { IconInfo } from "../../assets/icon/iconInfo";

export const NotificationMessage: FC = ({ children }) => {
  return (
    <Content>
      <IconInfo /> <P>{children}</P>
    </Content>
  );
};

const Content = styled.div`
  background: ${theme.colors.redOpacity};
  padding: 0.42vw 0.83vw;
  display: grid;
  height: fit-content;
  align-self: flex-end;
  align-items: flex-start;
  grid-template-columns: 1.25vw 1fr;
  grid-column-gap: 0.42vw;

  svg {
    width: 1.25vw;
    height: 1.25vw;
    path {
      stroke: ${theme.colors.red};
    }
  }
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 0;
    grid-template-columns: 1fr;
    grid-row-gap: 1.56vw;
    background: none;
    align-self: center;
    svg {
      display: none;
    }
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-row-gap: 3.2vw;
  }
`;

const P = styled.p`
  margin: 0;
`;
