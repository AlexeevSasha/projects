import styled from "astroturf/react";
import { NextImage } from "../../../common/components/NextImage";
import { CustomSwiper } from "../../slider/components/CustomSwiper";
import { useState } from "react";
import { ProductT } from "../interfaces/product";

type Props = Pick<ProductT, "images">;

export const ProductImageDesktop = ({ images }: Props) => {
  const [mainSrcImage, setMainSrcImage] = useState(images[0]);
  const handlerClick = (src: string) => {
    setMainSrcImage(src);
  };

  return (
    <Wrapper>
      <ContainerBigImage>
        <NextImage id={"big-image-products"} src={mainSrcImage} alt={"product"} />
        <Text>Фотография может отличаться от товара</Text>
      </ContainerBigImage>

      {images.length > 1 ? (
        <CustomSwiper<string>
          id={"image-product-slider"}
          items={images.filter((el) => el !== mainSrcImage)}
          arrowSettings={{ size: "sm" }}
          sliderSettings={{ desktopSB: 14 }}
        >
          {(param) => (
            <ContainerSmallImages onClick={() => handlerClick(param)}>
              <NextImage src={param} alt={"product"} />
            </ContainerSmallImages>
          )}
        </CustomSwiper>
      ) : null}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  @import "variables";

  @include respond-to(small) {
    display: none;
  }
`;

const ContainerBigImage = styled.div`
  @import "variables";

  width: 400px;
  height: 400px;
  padding: 80px 16px 80px;
  background: $grey;
  border-radius: 28px;

  @media (max-width: 1000px) {
    height: 250px;
    width: 250px;
    padding: 20px 10px 60px;
  }
`;

const Text = styled.p`
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

const ContainerSmallImages = styled(ContainerBigImage)`
  margin-top: 12px;
  width: 124px;
  height: 124px;
  padding: 8px;
  cursor: pointer;

  @media (max-width: 1000px) {
    width: 115px;
    height: 115px;
  }
`;
