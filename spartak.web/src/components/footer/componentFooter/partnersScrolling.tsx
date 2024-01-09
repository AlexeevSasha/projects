import { useRouter } from "next/router";
import React, { useRef } from "react";
import styled from "styled-components";
import SwiperCore from "swiper";
import "swiper/css";
import { IPartner } from "../../../api/dto/IPartner";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { theme } from "../../../assets/theme/theme";
import { NextImage } from "../../../ui/nextImage/nextImage";
import { ReactSwiper } from "../../reactSwiper/ReactSwiper";

interface IProps {
  partners: IPartner[];
}

export const PartnersScrolling = ({ partners }: IProps) => {
  const swiperRef = useRef<SwiperCore>();
  const { locale } = useRouter();

  const rotationPartners = partners
    .filter((partner: any) => partner.Layout == "Rotation")
    .filter((partner) => partner.Status === "Published");

  return rotationPartners.length ? (
    <Container
      onMouseEnter={() => swiperRef.current?.autoplay.stop()}
      onMouseLeave={() => rotationPartners.length >= 5 && swiperRef.current?.autoplay.start()}
    >
      <ReactSwiper<IPartner>
        className="rotationPartnersSwiper"
        autoplay={rotationPartners.length <= 5 ? false : { delay: 2000 }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        slidesPerView={"auto"}
        itemsList={rotationPartners}
        loop={true}
        render={(elem) => (
          <NativeLink href={getLocalValue(elem.PartnerUrl, locale)} target="_blank" rel="noreferrer">
            <ImgContainer>
              <NextImage src={elem.ImageUrl} alt={getLocalValue(elem.FullName, locale)} />
            </ImgContainer>
          </NativeLink>
        )}
      />
      <LeftGradient />
      <RightGradient />
    </Container>
  ) : null;
};

const Container = styled.nav`
  width: 99vw;
  padding: 1.67vw 0;
  overflow: hidden;
  display: flex;
  position: relative;

  .swiper-slide {
    width: 12.71vw !important;
    height: 100%;
    margin-right: 1.25vw;
  }
  .swiper {
    z-index: 0;
  }
  .swiper-wrapper {
    z-index: 0;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    .swiper-slide {
      width: 15.65vw !important;
      margin-right: 2.09vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: none;
  }
`;
const LeftGradient = styled.div`
  width: 20.46vw;
  height: 100%;
  background: linear-gradient(90.29deg, #1b232c 0.31%, rgba(24, 31, 39, 0) 99.8%);
  background-size: 20.46vw 100%;
  position: absolute;
  left: 0;
  background-repeat: no-repeat;
`;
const RightGradient = styled.div`
  width: 20.46vw;
  height: 100%;
  background: linear-gradient(90.63deg, #1b232c 0.61%, rgba(24, 31, 39, 0) 99.58%);
  transform: matrix(-1, 0, 0, 1, 0, 0);
  background-size: 20.46vw 100%;
  position: absolute;
  right: 0;
  background-repeat: no-repeat;
`;

const NativeLink = styled.a`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const ImgContainer = styled.div`
  width: 100%;
  height: 6.35vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 6.26vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 4.8vw;
  }
`;
