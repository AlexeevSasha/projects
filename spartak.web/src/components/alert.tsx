import React from "react";
import styled from "styled-components";
import { GiftIcon } from "../assets/icon/GiftIcon";
import { IconInfo } from "../assets/icon/iconInfo";
import { theme } from "../assets/theme/theme";

type Props = {
  className?: string;
  type: "error" | "warning" | "success" | "info";
  message: string;
  icon?: JSX.Element;
};

export const Alert = ({ className, type, message, icon }: Props) => {
  return message ? (
    <Container className={className} type={type}>
      <IconWrapper type={type}>
        {icon ||
          (type === "error" && <IconInfo />) ||
          (type === "warning" && <IconInfo />) ||
          (type === "success" && <GiftIcon />) ||
          (type === "info" && <IconInfo />)}
      </IconWrapper>

      <span>{message}</span>
    </Container>
  ) : null;
};

const Container = styled.div<{ type: string }>`
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  background: ${({ type }) => {
    return (
      (type === "error" && "#f05a4f7f") ||
      (type === "warning" && "#ffbd3e4c") ||
      (type === "success" && "#05c84a4c") ||
      (type === "info" && "#91d5ff4c")
    );
  }};
  color: ${theme.colors.white};
  display: flex;
  align-items: center;
  letter-spacing: 0.1px;
  transition: all ease 0.3s;
  padding: 0.416vw 0.83vw;
  font-size: 0.73vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 1.04vw 2.08vw;
    font-size: 1.82vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 2.13vw 4.26vw;
    font-size: 3.73vw;
  }

  & > svg {
    color: ${theme.colors.green2};
    margin-right: 0.5vw;
    font-size: 1.25vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      font-size: 3.13vw;
      margin-right: 1.2vw;
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      font-size: 6.4vw;
      margin-right: 2.4vw;
    }
  }
`;

const IconWrapper = styled.div<{ type: string }>`
  color: ${({ type }) => {
    return (
      (type === "error" && "#F05A4F") ||
      (type === "warning" && "#FFBD3E") ||
      (type === "success" && "#05C84A") ||
      (type === "info" && "#91d5ff")
    );
  }};
  padding-right: 0.416vw;
  font-size: 1.25vw;
  align-self: flex-start;

  & > svg {
    display: block;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-right: 1.04vw;
    font-size: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-right: 2.13vw;
    font-size: 6.4vw;
  }
`;
