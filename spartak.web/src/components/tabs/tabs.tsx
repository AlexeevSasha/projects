import React from "react";
import styled from "styled-components";
import { theme } from "../../assets/theme/theme";

export type TabItem =
  | {
      key: string | number;
      label?: string | JSX.Element;
    }
  | string
  | number;

type Props = {
  tabs: TabItem[];
  active: string | number;
  onClick: (key: string | number) => void;
};

export const Tabs = ({ tabs, active, onClick }: Props) => (
  <TabBlock>
    {tabs.map((tab) => {
      const key = typeof tab === "object" ? tab.key : tab;

      return (
        <Tab key={key} active={active === key} onClick={() => onClick(key)}>
          {typeof tab === "object" && tab.label ? tab.label : key}
        </Tab>
      );
    })}
  </TabBlock>
);

const TabBlock = styled.div`
  margin: 0;
  display: flex;
  width: max-content;
  max-width: 100%;
  font-weight: 600;
  border: ${({ theme }) => `1px solid ${theme.colors.grayDark_grayLight}`};
`;

const Tab = styled.span<{ active: boolean }>`
  min-width: 13.28vw;
  cursor: pointer;
  font-size: 0.73vw;
  font-family: "FCSM Text", sans-serif;
  background-color: ${(props) => (props.active ? theme.colors.red : props.theme.colors.blackLight_grayLightest)};
  color: ${(props) => (props.active ? theme.colors.white : props.theme.colors.white_black)};
  text-transform: uppercase;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.4vw;
  padding: 0 0.73vw;
  box-sizing: border-box;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    min-width: 23.6vw;
    font-size: 1.83vw;
    padding: 0 1.3vw;
    height: 6vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    min-width: 50%;
    font-size: 3.2vw;
    height: 10.13vw;
    padding: 0 3.2vw;
  }
`;
