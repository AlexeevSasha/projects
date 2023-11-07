import styled from "astroturf/react";
import { Container } from "../Container";
import { IconArraySmall } from "../icons/IconArraySmall";
import React, { useRef, useState } from "react";
import { CustomSwiper } from "../../../modules/slider/components/CustomSwiper";
import { productMock } from "../../../api/mockData/productMock";
import { ProductCard } from "../../../modules/products/components/ProductCard";
import { SwiperWithButtonTop } from "../../../modules/slider/components/SwiperWithButtonTop";
import { Product } from "../../../modules/products/components/Product";
import { useResize } from "../../hooks/useResize";

export const RecentlyViewed = () => {
  const [open, setOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const { width } = useResize();

  const toggle = () => {
    setOpen((prev) => !prev);
    setHeight(!open ? ref?.current?.clientHeight || 0 : 0);
  };

  return (
    <div>
      {width > 768 ? (
        <ContainerBlock>
          <Container>
            <Head>
              <Title>
                Вы недавно смотрели <span>48</span>
              </Title>
              <SvgContainer onClick={toggle}>
                <IconArraySmall rotate={open ? "180deg" : "0"} />
              </SvgContainer>
            </Head>
            <Content open={open} style={{ height: height + "px" }}>
              <div ref={ref}>
                <CustomSwiper
                  sliderSettings={{ desktopSB: 16 }}
                  id={"footer-products-slider"}
                  items={productMock}
                >
                  {(param) => (
                    <ContainerProductCard>
                      <ProductCard {...param} />
                    </ContainerProductCard>
                  )}
                </CustomSwiper>
              </div>
            </Content>
          </Container>
        </ContainerBlock>
      ) : (
        <Container>
          <MobileBlock>
            <SwiperWithButtonTop
              id={"footer-products-slider-mobile"}
              title={"Недавно смотрели"}
              link={"/"}
              items={productMock}
              sliderSettings={{ mobileSB: 8 }}
            >
              {(param) => (
                <CustomSwiper.SlideOfProduct>
                  <Product.Card {...param} />
                </CustomSwiper.SlideOfProduct>
              )}
            </SwiperWithButtonTop>
          </MobileBlock>
        </Container>
      )}
    </div>
  );
};

const MobileBlock = styled.div`
  @import "variables";

  display: none;

  @include respond-to(small) {
    display: block;
  }
`;

const ContainerProductCard = styled.div`
  width: 250px;
`;

const ContainerBlock = styled.div`
  @import "variables";

  position: relative;
  z-index: 1;
  background: $blue1;
  color: $white;
  padding: 24px 0 72px;
  border-radius: 48px 48px 0 0;
  margin-bottom: -48px;
  overflow: hidden;

  @include respond-to(small) {
    display: none;
  }
`;

const Head = styled.div`
  @import "variables";

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  @import "variables";

  font-weight: 600;
  font-size: 18px;
  line-height: 137%;
  letter-spacing: 0.02em;

  span {
    color: rgb($white, 0.5);
    margin-left: 6px;
  }
`;

const SvgContainer = styled.div`
  @import "variables";

  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    transition: all 0.2s ease-in-out;
    width: 20px;
    height: 20px;
    path {
      stroke: $white;
    }
  }
`;

const Content = styled.div<{ open: boolean }>`
  @import "variables";

  transition: height 0.2s ease-in-out;
  & > div {
    transition: all 0.2s ease-in-out;
    padding: 24px 10px 0;
    opacity: 0;
    overflow: hidden;
    z-index: -999;
  }

  &.open {
    & > div {
      opacity: 1;
      position: relative;
      z-index: 0;
    }
  }

  @include respond-to(small) {
    & > div {
      padding: 24px 0 0;
    }
  }
`;
