import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../../assets/theme/theme";
import { DropDownTabMenu } from "./dropDownTabMenu";

export interface IItemMenu {
  onclick: () => void;
  isActive: boolean;
  text: string;
  child?: { label: string; link: string }[];
}

interface IProps {
  title: string;
  itemsMenu: IItemMenu[];
  className?: string;
}

export const TabMenu = (props: IProps) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const changePage = (handler: () => void) => () => {
    handler();
    setShowMenu(!showMenu);
  };

  return (
    <Container
      onBlur={(event: any) => !event.currentTarget.contains(event.relatedTarget) && setShowMenu(false)}
      tabIndex={-1}
      className={props.className}
    >
      <TitleButtons onClick={() => setShowMenu(!showMenu)}>
        <TitleHeader>{props.title}</TitleHeader>

        <Arrow showMenu={showMenu} />
      </TitleButtons>

      <ButtonsGroup showMenu={showMenu}>
        {props.itemsMenu.map((item, index) =>
          item && item.child ? (
            <DropDownTabMenu key={item.text + "-" + index} menuItems={item.child} label={item.text} />
          ) : item ? (
            <ButtonHeader key={item.text + "_" + index} onClick={changePage(item.onclick)} isActive={item.isActive}>
              {item.text}
            </ButtonHeader>
          ) : null
        )}
      </ButtonsGroup>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${theme.colors.white};
  font-family: "FCSM Text", sans-serif;
  text-transform: uppercase;
  white-space: nowrap;
  z-index: 15;

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    flex-direction: column;
  }
`;

const TitleButtons = styled.div`
  display: none;

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: grid;
    grid-template-columns: auto auto;
    justify-content: center;
    width: 100%;
    align-items: center;
    grid-column-gap: 4.27vw;
    height: 10.13vw;
    background: ${({ theme }) => theme.colors.blackLight_red};
    white-space: nowrap;
  }
`;

const ButtonsGroup = styled.div<{ showMenu: boolean }>`
  display: flex;
  background-color: ${theme.colors.black};
  width: 100%;
  transition: all 0.4s ease;
  justify-content: space-between;
  overflow: auto;

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: ${({ showMenu }) => (showMenu ? "flex" : "none ")};
    position: absolute;
    z-index: 10;
    flex-direction: column;
  }
`;

const ButtonHeader = styled.div<{ isActive: boolean }>`
  cursor: pointer;
  font-size: 0.73vw;
  padding: 0.63vw;
  display: flex;
  font-weight: 600;
  align-items: center;
  justify-content: center;
  color: ${({ isActive, theme }) => (isActive ? theme.colors.white_whiteGray : theme.colors.gray_grayDark1)};
  background: ${({ isActive, theme }) => (isActive ? theme.colors.blackLight_red : theme.colors.black_white)};
  width: 100%;
  min-width: fit-content;

  &:hover {
    color: ${({ isActive, ...props }) => (isActive ? theme.colors.white : props.theme.colors.white_red)};
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 1.56vw;
    font-size: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.8vw;
    border-bottom: unset;
    padding: 1.47vw 4.27vw;
    justify-content: flex-start;
  }
`;

const TitleHeader = styled.span`
  color: ${theme.colors.white};
  font-size: 4.8vw;
  font-weight: bold;
`;

const Arrow = styled.div<{ showMenu: boolean }>`
  width: 3.2vw;
  height: 3.2vw;
  border: 3px solid ${theme.colors.white};
  border-top: none;
  border-right: none;
  transition: 0.3s ease;
  transform: ${({ showMenu }) => (showMenu ? "rotate(135deg)" : "rotate(-45deg)")};
  margin-top: ${({ showMenu }) => (showMenu ? "1.87vw" : "-2.13vw")};
`;
