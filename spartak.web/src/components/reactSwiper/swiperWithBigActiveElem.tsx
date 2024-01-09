import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { LocaleType } from "../../api/dto/LocaleType";
import { getLocalValue } from "../../assets/helpers/getLocalValue";
import { theme } from "../../assets/theme/theme";
import { CustomButton } from "../buttons/customButton";
import { SwiperWrapper } from "./swiperWrapper";
import { SwipeWithControl } from "./swipeWithControl";
import { NextLink } from "../nextLink/nextLink";
import { NextImage } from "../../ui/nextImage/nextImage";

type ListItem = {
  imageUrl: string;
  text: LocaleType;
  btnText: LocaleType;
  url: string;
};

type Props = {
  title: string;
  itemsList?: ListItem[];
};

const defautlItemsList: ListItem[] = [
  {
    imageUrl: "/images/main/specialOffers/rent_fields_v1.0.0.png",
    text: { Ru: "Аренда полей в “Сокольниках”", En: "Rent of fields in “Sokolniki”" },
    btnText: { Ru: "Забронировать", En: "Book" },
    url: "https://sokolniki.spartak.com/",
  },
  {
    imageUrl: "/images/main/specialOffers/excursion_tours_v1.0.0.jpg",
    text: { Ru: "Экскурсионные туры", En: "Excursion tours" },
    btnText: { Ru: "Выбрать тур", En: "Choose a tour" },
    url: "/stadium/services/excursionTours",
  },
  {
    imageUrl: "/images/main/specialOffers/VIP_boxes_v1.0.0.jpg",
    text: { Ru: "VIP-Ложи Открытие Банк Арены", En: "VIP-Lodges Opening Bank Arena" },
    btnText: { Ru: "Забронировать", En: "Book" },
    url: "/stadium/services/vip",
  },
];

export const SwiperWithBigActiveElem = ({ title, itemsList = defautlItemsList }: Props) => {
  const { locale = "ru" } = useRouter();

  return (
    <Content>
      <SwipeWithControl<ListItem>
        className="offers-swiper"
        title={title}
        itemsList={itemsList}
        swipeProps={{ slideToClickedSlide: true, loop: true, scrollbar: true }}
      >
        {(value) => (
          <Slide url={value.imageUrl}>
            <SlideImgContainer>
              <NextImage src={value.imageUrl} objectFit="fill" />
            </SlideImgContainer>
            <SlideContent>
              <TitleCard>{getLocalValue(value.text, locale)}</TitleCard>

              <NextLink url={value.url} target={value.url.includes("http") ? "_blank" : "_self"}>
                <StyledButton type="red">{getLocalValue(value.btnText, locale)}</StyledButton>
              </NextLink>
            </SlideContent>
          </Slide>
        )}
      </SwipeWithControl>
    </Content>
  );
};

const Content = styled(SwiperWrapper)`
  margin-bottom: 5.21vw;

  & .swiper.offers-swiper {
    margin-top: 3.33vw;
  }

  & .swiper.offers-swiper .swiper-slide {
    transition: width 0.3s;
    margin: 0;
    width: 26.6vw;
    height: 23.96vw;

    &::after {
      height: 100%;
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(13, 17, 22, 0.5);
    }
  }

  & .swiper.offers-swiper .swiper-slide.swiper-slide-active {
    width: 40.63vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 10.43vw;

    & .swiper.offers-swiper {
      width: 100%;
      padding-bottom: 4.82vw;
    }

    & .swiper.offers-swiper .swiper-slide {
      width: 100%;
      height: 59.97vw;
      margin: 0;
    }

    & .swiper.offers-swiper .swiper-slide.swiper-slide-active {
      width: 100%;
      height: auto;
    }

    & .swiper .swiper-scrollbar {
      background: ${({ theme }) => theme.colors.none_whiteGray};

      .swiper-scrollbar-drag {
        background: ${({ theme }) => theme.colors.grayDark_gray1};
      }
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 10.67vw;
    & .swiper.offers-swiper {
      padding-bottom: 6.93vw;
    }
    & .swiper.offers-swiper .swiper-slide {
      height: 82.13vw;
    }
  }
`;

const Slide = styled.div<{ url: string }>`
  position: relative;
  font-family: "FCSM Text", sans-serif;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: flex-end;
  box-sizing: border-box;
`;
const SlideImgContainer = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;

const SlideContent = styled.div`
  z-index: 1;
  padding: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 5.21vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 4.26vw 2.93vw;
  }
  a {
    text-decoration: none;
  }
`;

const TitleCard = styled.h4`
  font-weight: 700;
  font-size: 1.67vw;
  color: ${theme.colors.white};
  margin: 0 0 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
    line-height: 1.5;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
    line-height: 1.5;
  }
`;

const StyledButton = styled(CustomButton)`
  width: fit-content;
  color: ${theme.colors.white};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 1.7vw 3.25vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 2.4vw 4.6vw;
  }
`;
