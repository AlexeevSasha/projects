import styled from "astroturf/react";
import { Brand } from "./Brand";
import { CustomSwiper } from "../../../modules/slider/components/CustomSwiper";
import { BrandT } from "../../interfaces/brand";

type Props = {
  brands: BrandT[];
};

export const Brands = ({ brands }: Props) => {
  return (
    <div>
      <Title>Популярные бренды</Title>
      <CustomSwiper<BrandT>
        sliderSettings={{ padding: true, desktopSB: 16, mobileSB: 16 }}
        items={brands}
        id={"brands-slider"}
      >
        {(param) => (
          <BrandContainer>
            <Brand {...param} />
          </BrandContainer>
        )}
      </CustomSwiper>
    </div>
  );
};

const BrandContainer = styled.div`
  width: 176px;
`;

const Title = styled.h3`
  @import "variables";

  font-weight: 600;
  font-size: 24px;
  line-height: 137%;
  color: $black;
  margin: 0;

  @include respond-to(small) {
    font-size: 18px;
  }
`;
