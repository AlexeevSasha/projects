import React, { FC } from "react";
import styled from "styled-components";
import { theme } from "../../assets/theme/theme";
import { IconTail } from "../../assets/icon/iconTail";

interface IProps {
  position: "top" | "bottom" | "right" | "left";
}

export const Tooltip: FC<IProps> = ({ position, children }) => {
  return (
    <InfoTooltip position={position}>
      <span>
        <IconTail />
      </span>
      <Info>{children}</Info>
    </InfoTooltip>
  );
};
export const InfoTooltip = styled.div<{ position: "top" | "bottom" | "right" | "left" }>`
  background: ${({ theme }) => theme.colors.gray_grayDark1};
  color: ${({ theme }) => theme.colors.blackLight_black};
  display: flex;
  font-family: "Roboto", sans-serif;
  position: absolute;
  border-radius: 2px;
  letter-spacing: 0.1px;
  font-size: 0.73vw;
  transform: translate(50%, -100%);
  z-index: 10;
  width: max-content;
  max-height: 6.98vw;
  right: ${({ position }) => (position === "right" ? "-60px" : "50%")};
  top: ${({ position }) =>
    position === "top" ? "-0.36vw" : position === "bottom" ? "3.39vw" : position === "right" ? "unset" : "3.39vw"};

  span {
    position: absolute;
    svg {
      width: ${({ position }) => (position !== "left" ? "0.73vw" : "0.73vw")};
      height: ${({ position }) => (position !== "left" ? "0.3125vw" : "0.73vw")};
    }

    bottom: ${({ position }) =>
      position === "top" ? "0.63vw" : position === "left" ? "50%" : position === "right" ? "40%" : "unset"};
    top: ${({ position }) =>
      position === "top" ? "1vw" : position === "bottom" ? "-0.5vw" : position === "right" ? "12px" : "unset"};
    left: ${({ position }) =>
      position === "top"
        ? "48%"
        : position === "left"
        ? "90%"
        : position === "bottom"
        ? "calc(50% - 1vw)"
        : position === "right"
        ? "-2px"
        : "0"};
    transform: ${({ position }) =>
      position === "top"
        ? "translate(-50%, 100%)"
        : position === "left"
        ? "translate(0%, 50%) rotate(140deg)"
        : position === "right"
        ? "rotate(0.25turn)"
        : "rotate(0.5turn)"};

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      svg {
        width: ${({ position }) => (position !== "left" ? "0.73vw" : "1.83vw")};
        height: ${({ position }) => (position !== "left" ? "0.3125vw" : "0.73vw")};
      }
      left: ${({ position }) => (position === "left" ? "90%" : "96%")};
      bottom: 50%;
      transform: translate(0%, 50%) rotate(-90deg);
      width: 1.825vw;
      height: 0.78vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.82vw;
    transform: translate(-0.78vw, -50%);
    width: 15.64vw;
    max-height: 17.47vw;
    top: 50%;
    right: 100%;
  }
`;
const Info = styled.div`
  padding: 0.3vw 0.6vw;
  overflow: auto;
  flex: 1;
`;
