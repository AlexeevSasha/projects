import styled from "astroturf/react";
import { CustomSwiper } from "../../slider/components/CustomSwiper";
import { NextImage } from "../../../common/components/NextImage";
import { ProductT } from "../interfaces/product";

type Props = Pick<ProductT, "images">;

export const ProductImageMobile = ({ images }: Props) => {
  return (
    <Wrapper>
      <CustomSwiper<string>
        id={"image-product-mobile-slider"}
        pagination={true}
        items={images}
        slidesPerView={1}
      >
        {(param) => (
          <ContainerImage>
            <NextImage src={param} alt={"product"} />
            <Text>Фотография может отличаться от товара</Text>
          </ContainerImage>
        )}
      </CustomSwiper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  @import "variables";
  display: none;

  @include respond-to(small) {
    display: block;
    min-width: 300px;
    height: 300px;
  }
`;

const ContainerImage = styled.div`
  @import "variables";

  min-width: 300px;
  height: 300px;
  padding: 80px 16px 80px;
  border-radius: 28px;
`;

export const Text = styled.p`
  @import "variables";

  margin: 40px 0 0;
  text-align: center;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.02em;
  color: rgb($black, 0.3);

  @media (max-width: 1000px) {
    margin: 10px 0 0;
  }
`;
