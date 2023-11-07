import { useState } from "react";
import styled from "astroturf/react";

type Props = {
  position: "left" | "right" | "bottom" | "top";
  children: JSX.Element;
  text: string;
  delay?: number;
};

export const Tooltip = ({ position, children, text, delay }: Props) => {
  let timeout: NodeJS.Timeout;
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, delay || 0);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <Container onMouseEnter={showTip} onMouseLeave={hideTip}>
      {children}
      {active && <TooltipStyle position={position}>{text}</TooltipStyle>}
    </Container>
  );
};

const Container = styled.div`
  display: inline-block;
  position: relative;
`;

const TooltipStyle = styled.div<{ position: Props["position"] }>`
  @import "variables";

  position: absolute;
  border-radius: 12px;
  left: 50%;
  transform: translateX(-50%);
  width: 290px;
  padding: 16px;
  color: $black;
  background: $white;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0.02em;
  z-index: 100;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);

  &:before {
    content: " ";
    left: 50%;
    border: solid transparent;
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-width: 6px;
    margin-left: calc(6px * -1);
  }

  &.position-top {
    bottom: calc(100% + 10px);

    &:before {
      top: 100%;
      border-top-color: $white;
    }
  }

  &.position-bottom {
    top: calc(100% + 10px);

    &:before {
      bottom: 100%;
      border-bottom-color: $white;
    }
  }

  &.position-left {
    left: auto;
    right: calc(100% + 10px);
    top: 50%;
    transform: translateX(0) translateY(-50%);

    &:before {
      left: auto;
      right: calc(6px * -2);
      top: 50%;
      transform: translateX(0) translateY(-50%);
      border-left-color: $white;
    }
  }

  &.position-right {
    left: calc(100% + 10px);
    top: 50%;
    transform: translateX(0) translateY(-50%);

    &:before {
      left: calc(6px * -1);
      top: 50%;
      transform: translateX(0) translateY(-50%);
      border-right-color: $white;
    }
  }

  @include respond-to(small) {
    display: none;
  }
`;
