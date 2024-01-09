import React, { ReactNode, useCallback, useState } from "react";
import { IconArrow } from "../Icon/IconArrow";
import { theme } from "../../styles/theme";
import styled, { css } from "styled-components";

interface AccordionProps {
  title: ReactNode;
  children: ReactNode;
  description?: ReactNode;
  isActive?: boolean;
  size?: "sm";
  onlyBorderContent?: boolean;
  hiddenArrow?: boolean;
  hiddenBorder?: boolean;
  hiddenPadding?: boolean;
  disabledClick?: boolean;
  styleContainer?: React.CSSProperties;
  styleTitle?: React.CSSProperties;
}

export const Accordion = ({ title, children, isActive = false, ...props }: AccordionProps) => {
  const [active, setActive] = useState(isActive);

  const toggleAccordion = useCallback(() => {
    setActive((prev) => !prev);
  }, []);

  return (
    <AccordionContainer
      style={props.styleContainer}
      onlyBorderContent={props.onlyBorderContent}
      hiddenPadding={props.hiddenPadding}
      hiddenBorder={props.hiddenBorder}
      size={props.size}
    >
      <HeaderContainer disabledClick={props.disabledClick} onClick={toggleAccordion}>
        <AccordionTitle style={props.styleTitle}>{title}</AccordionTitle>
        <AccordionIcon hidden={props.hiddenArrow}>
          <IconArrow rotate={active ? "" : "-90deg"} color={theme.colors.green} />
        </AccordionIcon>
      </HeaderContainer>
      {props.description ? <Description>{props.description}</Description> : null}
      {active && React.Children.count(children) ? (
        <AccordionContent isBorder={props.onlyBorderContent}>{children}</AccordionContent>
      ) : null}
    </AccordionContainer>
  );
};

const HeaderContainer = styled.div<{ disabledClick?: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: none;
  outline: none;
  margin: 0;

  ${({ disabledClick }) =>
    disabledClick &&
    css`
      cursor: default;
      pointer-events: none;
    `}
`;

const AccordionTitle = styled.div`
  font-weight: bold;
  font-size: 14px;
  flex: 1;
`;

const AccordionContainer = styled.div<
  Pick<AccordionProps, "size" | "hiddenBorder" | "hiddenPadding" | "onlyBorderContent">
>`
  display: flex;
  flex-direction: column;
  padding: 12px;
  border-radius: 6px;
  border: ${({ hiddenBorder }) => (hiddenBorder ? "none" : `1px solid ${theme.colors.green}`)};

  ${({ size }) =>
    size === "sm" &&
    css`
      padding: 6px 12px;
    `}

  ${({ hiddenPadding }) =>
    hiddenPadding &&
    css`
      padding: 0;
    `}


  ${({ onlyBorderContent }) =>
    onlyBorderContent &&
    css`
      padding: 0;
      border: none;
    `}
`;

const AccordionContent = styled.div<{ isBorder?: boolean }>`
  margin-top: 14px;
  background: transparent;
  transition: max-height 0.6s ease;
  font-weight: 400;
  font-size: 14px;
  line-height: 26px;

  ${({ isBorder }) =>
    isBorder &&
    css`
      border: 1px solid ${theme.colors.green};
      padding: 12px;
      border-radius: 6px;
      margin-top: 6px;
    `}
`;

const AccordionIcon = styled.span<{ hidden?: boolean }>`
  width: 16px;
  height: 16px;
  margin-left: 15px;
  display: ${({ hidden }) => (hidden ? "none" : "flex")};
  align-items: center;
  justify-content: end;
`;

const Description = styled.div`
  margin-top: 15px;
`;
