import { Container } from "common/components/Container";
import { getLayout } from "common/components/layout/Layout";
import React, { useEffect, useState } from "react";
import styled from "astroturf/react";
import { NextImage } from "common/components/NextImage";
import { Button } from "common/components/Button";
import { getProducts } from "api/productsApi";
import { ProductT } from "modules/products/interfaces/product";
import { CustomSwiper } from "modules/slider/components/CustomSwiper";
import { Product } from "modules/products/components/Product";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();
  const [recommendationProducts, setRecommendationProducts] = useState<ProductT[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const request = await getProducts({});
      setRecommendationProducts(request.data.items);
    };
    fetchData();
  }, []);

  return (
    <Container>
      <Wrapper>
        <InfoBlock>
          <ImageContainer>
            <NextImage src={"/images/404.png"} alt={"404"} />
          </ImageContainer>
          <ErrorText>404 ошибка</ErrorText>
          <ErrorTitle>Такой страницы нет</ErrorTitle>
          <ErrorDescription>
            Попробуйте вернуться назад или поищите что-нибудь другое
          </ErrorDescription>
          <CustomButton typeBtn="blue" onClick={() => router.push("/")}>На главную</CustomButton>
        </InfoBlock>
        <CustomSwiper<ProductT>
          id={"404"}
          sliderSettings={{ desktopSB: 16, mobileSB: 8 }}
          items={recommendationProducts}
        >
          {(param) => (
            <CustomSwiper.SlideOfProduct>
              <Product.Card {...param} />
            </CustomSwiper.SlideOfProduct>
          )}
        </CustomSwiper>
      </Wrapper>
    </Container>
  );
}

Custom404.getLayout = getLayout;

const Wrapper = styled.div`
  @import "variables";
  margin: 88px 0 48px 0;
  @include respond-to(small) {
    margin: 48px 0;
  }
`;

const InfoBlock = styled.div`
  @import "variables";
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 116px;
  @include respond-to(small) {
    margin-bottom: 48px;
  }
`;

const ImageContainer = styled.div`
  @import "variables";
  min-width: 220px;
  div {
    height: 220px;
  }
  @include respond-to(small) {
    min-width: 180px;
    div {
      height: 180px;
    }
  }
`;

const ErrorText = styled.span`
  @import "variables";
  font-weight: 500;
  font-size: 15px;
  line-height: 137%;
  opacity: 0.3;
  margin-top: 32px;
  text-align: center;
`;

const ErrorTitle = styled.h1`
  @import "variables";
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  margin: 4px 0px 0px 0px;
  text-align: center;
  @include respond-to(small) {
    font-weight: 600;
    font-size: 20px;
    line-height: 137%;
  }
`;

const ErrorDescription = styled.span`
  @import "variables";
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  margin-top: 12px;
  text-align: center;
  @include respond-to(small) {
    font-size: 13px;
    line-height: 20px;
    margin-top: 16px;
  }
`;

const CustomButton = styled(Button)`
  @import "variables";
  margin-top: 20px;
  padding: 16.5px 40px;
  @include respond-to(small) {
    margin-top: 24px;
    padding: 17px 0px;
    width: 100%;
  }
`;
