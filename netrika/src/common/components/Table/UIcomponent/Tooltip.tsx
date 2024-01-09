import React, { useEffect } from "react";
import react, { FC, useRef, useState } from "react";
import styled from "styled-components";
import { theme } from "../../../styles/theme";
import { createPortal } from "react-dom";

interface IProps {
  containerWidth?: string;
  contentWidth?: string;
  optionsStyle?: react.CSSProperties;
  positionX?: "left" | "right";
  positionY?: "top" | "bottom";
  top?: string;
}
export const Tooltip: FC<IProps> = ({
  children,
  containerWidth = "16px",
  positionX = "left",
  positionY = "bottom",
  contentWidth = "200px",
}) => {
  const elemRef = useRef<HTMLDivElement>(null);
  const [isComponentVisible, setIsComponentVisible] = useState<boolean>(false);
  const [positionElement, setPositionElement] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  useEffect(() => {
    elemRef &&
      setPositionElement({
        x: elemRef?.current?.getBoundingClientRect()?.x || 0,
        y: elemRef?.current?.getBoundingClientRect()?.y || 0,
      });
  }, [elemRef]);

  const onHoverMouse = () => {
    setIsComponentVisible(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => setIsComponentVisible(false), 400);
  };

  return (
    <Container onMouseLeave={handleMouseLeave} width={containerWidth} ref={elemRef} onMouseMove={onHoverMouse}>
      <div>{children?.[0]}</div>
      {createPortal(
        isComponentVisible && (
          <TooltipContainer
            contentWidth={contentWidth}
            style={{
              transform: `translatex(${positionX === "right" ? "5%" : "-100%"})`,
              top: positionY === "bottom" ? `${positionElement.y + 100}px` : `${positionElement.y - 200}px`,
              left: positionX === "right" ? `${positionElement.x + 10}px` : `${positionElement.x - 15}px`,
            }}
          >
            {children?.[1]}
          </TooltipContainer>
        ),
        document.getElementById("overlay-root") as HTMLElement
      )}
    </Container>
  );
};

const Container = styled.div<{ width?: string }>`
  position: relative;
  width: ${(props) => props.width};
`;

const TooltipContainer = styled.div<{ contentWidth: string }>`
  position: absolute;
  padding: 5px 2px;
  margin: 10px 0 0;
  list-style-type: none;
  width: ${(props) => props.contentWidth};
  border-radius: 5px;
  box-sizing: border-box;
  max-height: 280px;
  overflow-y: auto;
  z-index: 999999;
  background: ${theme.colors.white};
  box-shadow: ${theme.shadows.optionContainerShadow};
`;
