import React, { useState, useRef, MouseEvent } from "react";
import styled from "astroturf/react";
import { IconStar } from "../../../common/components/icons/IconSrar";

type Props = {
  total: number;
  halfStar?: boolean;
  active?: number;
  disable?: boolean;
};

export const StarRating = ({ total, halfStar, active = -1, disable }: Props) => {
  const [activeStar, setActiveStar] = useState(active);
  const [hoverActiveStar, setHoverActiveStar] = useState(-1);
  const [isHover, setIsHover] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const getNumberRating = (clientX: number) => {
    if (disable) return active;
    const sizeStar = halfStar ? 0.5 : 1;
    const { width, left } = containerRef?.current?.getBoundingClientRect() as DOMRect;
    const percent = (clientX - left) / width;
    return Math.round((percent * total + sizeStar / 2) / sizeStar) * sizeStar;
  };

  const handleClick = (event: MouseEvent) => {
    setIsHover(false);
    setActiveStar(getNumberRating(event.clientX));
  };

  const handleMouseMove = (event: MouseEvent) => {
    setIsHover(true);
    setHoverActiveStar(getNumberRating(event.clientX));
  };

  const handleMouseLeave = () => {
    setIsHover(false);
    setHoverActiveStar(-1);
  };

  return (
    <Container
      disable={disable}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={containerRef}
    >
      {[...new Array(total)].map((_, index) => {
        const activeState = isHover ? hoverActiveStar : activeStar;

        const showEmptyIcon = activeState === -1 || activeState < index + 1;
        const isHalfCurrent = Math.ceil(activeState) === index + 1;
        const halfStart = activeState !== 1 && isHalfCurrent;

        return (
          <Content key={index}>
            <HalfStart style={{ width: halfStart ? `${(activeState % 1) * 100}%` : "0%" }}>
              <IconStar color={"orange"} />
            </HalfStart>
            {showEmptyIcon ? <IconStar /> : <IconStar color={"orange"} />}
          </Content>
        );
      })}
    </Container>
  );
};

const Container = styled.div<{ disable?: boolean }>`
  display: inline-flex;
  cursor: pointer;

  &.disable {
    cursor: default;
  }
`;

const Content = styled.div`
  display: inline-flex;
  position: relative;
`;

const HalfStart = styled.div`
  position: absolute;
  overflow: hidden;
`;
