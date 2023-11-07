import styled from "astroturf/react";
import React, { HTMLAttributes } from "react";
import { CategoryT } from "../interfaces/category";
import { NextImage } from "../../../common/components/NextImage";
import { Icon } from "../../../common/components/Icon";

type Props = CategoryT & HTMLAttributes<HTMLDivElement>;

export const CategoryCardSmall = ({ name, image, hasChildren, totalProduct, ...attr }: Props) => {
  return (
    <Container {...attr}>
      <ImageContainer>{image && <NextImage src={image} alt="image" />}</ImageContainer>
      <div>{name}</div>
      <Icon
        style={{ marginLeft: "auto" }}
        width="7"
        height="12"
        viewBox="0 0 7 12"
        name="array-small"
      />
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  width: 100%;
  background: $white;
  color: $black;
  cursor: pointer;
  border-bottom: 1px solid #f6f8fd;
  padding: 16px;
  border-radius: 24px;

  &:hover {
    box-shadow: $shadowHoverCard;
  }

  svg {
    display: none;
  }

  @include respond-to(small) {
    background: transparent;
    border-radius: 0;
    padding: 16px;
    &:hover {
      box-shadow: none;
    }
    svg {
      display: block;
    }
  }
`;

const ImageContainer = styled.div`
  @import "variables";

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #f6f8fd;
  border-radius: 12px;
  margin-right: 12px;
  width: 68px;
  height: 68px;

  img {
    object-fit: contain;
    width: 90%;
  }
  @include respond-to(small) {
    width: 48px;
    height: 48px;
  }
`;
