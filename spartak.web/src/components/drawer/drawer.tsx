import React, { FC, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { theme } from "../../assets/theme/theme";
import { Close } from "../../assets/icon/close";
import { ru } from "../../../public/locales/ru/ru";
import { useRouter } from "next/router";
import { lang } from "../../../public/locales/lang";

interface IProps {
  onClose: () => void;
  title?: keyof typeof ru.shop;
}

const delay = 225;

export const Drawer: FC<IProps> = ({ onClose, children }) => {
  const { locale = "ru" } = useRouter();
  const [opened, setOpened] = useState(false);

  const handleClose = () => {
    setOpened(false);
    setTimeout(onClose, delay);
  };

  const onKeydown = ({ key }: KeyboardEvent) => key === "Escape" && handleClose();

  useEffect(() => {
    document.addEventListener("keydown", onKeydown);
    document.body.setAttribute("style", "overflow: hidden");
    setTimeout(() => setOpened(true));

    return () => {
      document.removeEventListener("keydown", onKeydown);
      document.body.setAttribute("style", "");
    };
  }, []);

  return (
    <>
      <DrawerBlackWrapper onClick={handleClose} aria-hidden="true" open={opened} />

      <DrawerContainer open={opened}>
        <Header>
          <Title>{lang[locale].shop.cart}</Title>

          <CloseContainer>
            <Close onClick={handleClose} />
          </CloseContainer>
        </Header>

        <Content>{children}</Content>
      </DrawerContainer>
    </>
  );
};

const DrawerBlackWrapper = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity ${delay}ms cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;

  ${({ open }) => {
    if (open) {
      return css`
        opacity: 1;
        z-index: 999;
        visibility: visible;
      `;
    } else {
      return css`
        opacity: 0;
        z-index: -1;
        visibility: hidden;
        transition: ${delay}ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      `;
    }
  }}
`;

const DrawerContainer = styled.div<{ open: boolean }>`
  font-family: "FCSM Text", sans-serif;
  top: 0;
  right: 0;
  flex: 1 0 auto;
  height: 100%;
  display: flex;
  outline: 0;
  z-index: 1200;
  position: fixed;
  overflow-y: auto;
  flex-direction: column;
  background-color: ${theme.colors.white};
  width: 28.44vw;
  flex-shrink: 0;

  ${({ open }) => {
    if (open) {
      return css`
        visibility: visible;
        transform: none;
        box-shadow: 0 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14),
          0px 6px 30px 5px rgba(0, 0, 0, 0.12);
      `;
    } else {
      return css`
        visibility: hidden;
        width: 240px;
        transform: translateX(240px);
        flex-shrink: 0;
        transition: ${delay}ms cubic-bezier(0, 0, 0.2, 1) 0ms;
      `;
    }
  }}
  transition: box-shadow ${delay}ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
  transform ${delay}ms cubic-bezier(0, 0, 0.2, 1) 0ms;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 71.84vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 100vw;
  }
`;

const Header = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.25vw;
  flex-basis: min-content;
  svg {
    width: 0.86vw;
    height: 0.86vw;
    align-items: center;
  }
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 0 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 0 4.27vw;
  }
`;

const Title = styled.h2`
  color: ${theme.colors.black};
  font-size: 1.25vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
  }
`;

const CloseContainer = styled.div`
  width: 1.25vw;
  height: 1.25vw;
  display: flex;
  align-items: center;
  cursor: pointer;

  svg {
    width: 100%;
    height: 100%;
  }
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 3.13vw;
    height: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 6.4vw;
    height: 6.4vw;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
