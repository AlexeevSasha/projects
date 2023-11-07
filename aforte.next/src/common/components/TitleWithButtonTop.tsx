import styled from "astroturf/react";
import { useMemo } from "react";
import { IconRightArray } from "./icons/IconArray";
import Link from "next/link";

type Props = {
  title: string;
  link?: string;
};

export const TitleWithButtonTop = ({ title, link }: Props) => {
  const render = useMemo(
    () => (
      <>
        <Title notLink={!link}>{title}</Title>
        {link && (
          <Circle>
            <IconRightArray />
          </Circle>
        )}
      </>
    ),
    [title, link]
  );

  return link ? <CustomLink href={link}>{render}</CustomLink> : render;
};

const CustomLink = styled(Link)`
  @import "variables";

  @include transition();

  display: inline-grid;
  grid-template-columns: 1fr 54px;
  grid-column-gap: 4px;
  cursor: pointer;
  color: $white;

  & > div {
    background: $orange1;
  }

  &:hover {
    grid-column-gap: 8px;
  }

  &:hover > div {
    background: $orangeHover;
  }

  @include respond-to(small) {
    grid-template-columns: 1fr 40px;
  }
`;

const Title = styled.div<{ notLink: boolean }>`
  @import "variables";

  display: inline-block;
  padding: 16px 24px;
  font-weight: 600;
  border-radius: 28px;
  font-size: 18px;
  line-height: 22px;

  &.notLink {
    background: $white;
  }

  @include respond-to(small) {
    padding: 14px 24px;
    line-height: 12px;
  }
`;

const Circle = styled.div`
  @import "variables";

  position: relative;
  height: 54px;
  width: 54px;
  border-radius: 28px;

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    path {
      fill: $white;
    }
  }

  @include respond-to(small) {
    height: 40px;
    width: 40px;
  }
`;
