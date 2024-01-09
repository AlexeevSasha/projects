import React, { MouseEvent, useRef, useState } from "react";
import { styled } from "common/styles/styled";
import { theme } from "common/styles/theme";
import { Floatingmes } from "common/ui/Floatingmes";
import { css } from "styled-components";

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr<{ active?: boolean; isDragging?: boolean; withHover?: boolean }>`
  background: ${(props) => (props.active ? theme.colors.oceanic : theme.colors.white)};
  display: ${(props) => (props.isDragging ? "flex" : "table-row")};
  justify-content: space-between;
  border-bottom: 1px solid ${theme.colors.gray};
  ${({ withHover }) =>
    withHover &&
    css`
      :hover {
        background: rgb(230, 247, 255);
      }
    `} /* cursor: pointer; */
`;

export const Th = styled.th<{ sort?: boolean; textBold?: boolean; width?: string }>`
  font-weight: ${(props) => (props.textBold ? "bold" : "normal")};
  font-size: 14px;
  color: ${theme.colors.hightBlue};
  background: ${theme.colors.white};
  position: sticky;
  top: 0;
  white-space: nowrap;
  padding: 12px 20px;
  text-align: left;
  cursor: ${(props) => (props.sort ? "pointer" : "default")};
  z-index: 1;
  width: ${(props) => props.width};

  span {
    font-size: 14px;
  }
`;

export const Td = styled.td<{ isClicker?: boolean; noWrapText?: boolean; width?: string; noWordBreak?: boolean }>`
  text-align: start;
  color: ${theme.colors.black};
  padding: 4px 20px;
  cursor: ${(props) => (props.isClicker ? "pointer" : "default")};
  white-space: ${(props) => (props.noWrapText ? "nowrap" : "normal")};
  word-break: ${(props) => (props.noWordBreak ? "normal" : "break-word")}
  width: ${(props) => props.width};
`;

export const ContainerControl = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ConnectingLine = styled.span`
  position: absolute;
  height: 100%;
  width: 11px;
  border-top: 1px solid ${theme.colors.gray};
  border-bottom: 1px solid ${theme.colors.gray};
  border-left: 1px solid ${theme.colors.gray};
  border-image: initial;
  border-right: none;
  top: -19px;
  left: 8px;
`;

export const ItemLink = styled.div`
  color: ${theme.colors.green};
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

interface IProps {
  id?: string;
  visible?: boolean;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  title: string;
  position?: "left" | "right";
  top?: string;
  noMarg?: boolean;
  calendar?: boolean;
}

export const IconContainerFloatingmes: React.FC<IProps> = ({
  children,
  visible = true,
  position = "left",
  top,
  noMarg,
  ...props
}) => {
  const elemRef = useRef<HTMLDivElement>(null);
  const [visibleFloatingmes, updateVisibleFloatingmes] = useState(false);
  const [positionMouseX, updatePositionMouseX] = useState(0);

  const onHoverMouse = (event: React.MouseEvent) => {
    updatePositionMouseX(event.clientX - (elemRef?.current?.getBoundingClientRect()?.x || 0));
    updateVisibleFloatingmes(true);
  };

  const onOutMouse = () => {
    updateVisibleFloatingmes(false);
  };
  return (
    <IconContainer
      className={"iconFloatingmes"}
      noMarg={noMarg}
      calendar={props.calendar}
      id={props.id}
      onClick={props.onClick}
      ref={elemRef}
      onMouseMove={onHoverMouse}
      onMouseLeave={onOutMouse}
    >
      {children}
      {visible ? (
        <Floatingmes
          whiteSpace={props.title.length > 25 ? " initial" : undefined}
          style={{
            transform: `translatex(${position === "right" ? "5%" : "-100%"})`,
            top: `${top ? top : "-30px"}`,
            left: position === "right" ? `${positionMouseX + 10}px` : `${positionMouseX - 15}px`,
          }}
          visible={visibleFloatingmes}
        >
          {props.title}
        </Floatingmes>
      ) : null}
    </IconContainer>
  );
};

export const IconContainer = styled.div<{ noMarg?: boolean; calendar?: boolean }>`
  margin: ${({ noMarg }) => (noMarg ? 0 : "0 8px")};
  display: ${({ noMarg }) => (noMarg ? "block" : "flex")};
  align-items: center;
  position: relative;
  cursor: pointer;

  span {
    cursor: pointer;

    svg {
      cursor: pointer;
    }
  }

  ${({ calendar }) =>
    calendar &&
    `
    max-width: 50px;
    width: 100%;
    margin: 0 2px;
  `}
`;
