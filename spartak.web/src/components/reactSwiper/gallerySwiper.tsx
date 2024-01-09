import React from "react";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/navigation";
import { IconPlus } from "../../assets/icon/iconPlus";
import { theme } from "../../assets/theme/theme";
import { Modal } from "../modal/modal";
import { ReactSwiper } from "./ReactSwiper";
import { NextImage } from "../../ui/nextImage/nextImage";

interface IProps {
  photoList: string[];
  clickClose: () => void;
  initialSlide?: number;
}

export const GallerySwiper = ({ photoList, clickClose, initialSlide }: IProps) => {
  return (
    <Modal clickClose={clickClose}>
      <CloseIcon onClick={clickClose}>
        <IconPlus color={theme.colors.white} rotate={"-45deg"} />
      </CloseIcon>

      <SwiperWrapper>
        <ReactSwiper<string>
          className="gallery-swiper"
          navigation={true}
          keyboard={{ enabled: true }}
          initialSlide={initialSlide || 0}
          itemsList={photoList}
          render={(photo) => (
            <ImgContainer>
              <NextImage src={photo} alt={photo} objectFit="contain" />
            </ImgContainer>
          )}
        />
      </SwiperWrapper>
    </Modal>
  );
};

const SwiperWrapper = styled.div`
  width: 100%;

  & > .swiper {
    position: unset;
    width: 100%;
    height: 80vh;
  }

  & > .swiper > .swiper-wrapper {
    width: 82.5vw;
  }

  & > .swiper .swiper-slide {
  }
  & > .swiper.gallery-swiper > .swiper-button-next {
    border: 0.05vw solid ${theme.colors.white};
    padding: 1.2vw 1.1vw;
    right: 1.83vw;
  }

  & > .swiper.gallery-swiper > .swiper-button-prev {
    border: 0.05vw solid ${theme.colors.white};
    padding: 1.2vw 1.1vw;
    left: 1.83vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    & > .swiper {
      width: 100%;
    }

    & > .swiper > .swiper-wrapper {
      width: 91.47vw;
    }

    & > .swiper.gallery-swiper > .swiper-button-prev {
      padding: 1.952vw 1.76vw;
    }

    & > .swiper.gallery-swiper > .swiper-button-next {
      padding: 1.952vw 1.76vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    & > .swiper {
      width: 100%;
    }

    & > .swiper > .swiper-wrapper {
      width: 100vw;
    }
  }
`;

const ImgContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100%;
`;

const CloseIcon = styled.span`
  position: absolute;
  top: 2.08vw;
  right: 2.08vw;
  z-index: 5;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    top: 5.22vw;
    right: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    top: 6.4vw;
    right: 2.13vw;
  }
`;
