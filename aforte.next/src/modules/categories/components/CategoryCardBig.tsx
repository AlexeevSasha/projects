import styled from "astroturf/react";
import { HTMLAttributes } from "react";
import { CategoryT } from "../interfaces/category";
import { NextImage } from "../../../common/components/NextImage";

type Props = CategoryT & HTMLAttributes<HTMLDivElement>;

export const CategoryCardBig = ({ name, image, hasChildren, totalProduct, ...attr }: Props) => {
  return (
    <Container {...attr}>
      <ImageContainer>{image && <NextImage src={image} alt="image" />}</ImageContainer>
      <Title>{name}</Title>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  background: #ffffff;
  border-radius: 40px;
  height: 220px;
  width: 100%;
  cursor: pointer;

  &:hover {
    box-shadow: $shadowHoverCard;
  }

  @include respond-to(small) {
    &:hover {
      box-shadow: none;
    }
  }
`;

const Title = styled.div`
  @import "variables";

  margin-top: 12px;
  min-height: 40px;
  font-weight: 600;
  color: $black;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: 90px;
  overflow: hidden;
`;
