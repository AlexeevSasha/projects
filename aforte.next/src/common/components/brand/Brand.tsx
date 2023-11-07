import styled from "astroturf/react";
import { NextImage } from "../NextImage";
import { BrandT } from "../../interfaces/brand";

export const Brand = ({ img, alt }: BrandT) => {
  return (
    <ContainerBrand>
      <NextImage src={img} alt={alt} />
    </ContainerBrand>
  );
};

const ContainerBrand = styled.div`
  @import "variables";

  cursor: pointer;
  max-width: 200px;
  width: 100%;
  border-radius: 40px;
  background: $white;
  padding: 30px 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  & > div {
    width: 90px;
    height: 60px;
  }

  &:hover {
    box-shadow: $shadowHoverCard;
  }

  @include respond-to(small) {
    padding: 18px 35px;
    &:hover {
      box-shadow: none;
    }
  }
`;
