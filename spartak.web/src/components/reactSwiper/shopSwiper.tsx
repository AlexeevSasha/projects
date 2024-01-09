import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import styled from "styled-components";
import { lang } from "../../../public/locales/lang";
import { DataContext } from "../../core/dataProvider";
import { IProduct } from "../../api/dto/IProduct";
import { theme } from "../../assets/theme/theme";
import { CardShop } from "../cardShop/cardShop";
import MainBannerWithTitle from "../mainBannerWithTitle/MainBannerWithTitle";
import { SwiperWrapper } from "./swiperWrapper";
import { SwipeWithControl } from "./swipeWithControl";

interface IProps {
  itemsList: IProduct[];
  title: string;
}

export const ShopSwiper = ({ itemsList, title }: IProps) => {
  const { locale = "ru" } = useRouter();
  const { setLoading } = useContext(DataContext);

  useEffect(() => {
    const swiper = document.querySelector<HTMLDivElement>(".main-shop-swiper");
    const wrapper = swiper?.querySelector(".swiper-wrapper");

    if (!swiper || !wrapper) return;

    const setAttribute: EventListener = (e) => swiper.setAttribute("style", e.type === "mouseover" ? "z-index: 3" : "");
    wrapper.addEventListener("mouseover", setAttribute);
    wrapper.addEventListener("mouseleave", setAttribute);

    return () => {
      wrapper.removeEventListener("mouseover", setAttribute);
      wrapper.removeEventListener("mouseleave", setAttribute);
    };
  }, []);

  return (
    <>
      <BannerWrapper>
        <MainBannerWithTitle title="" banner={"/images/profile/denariiSwiper_v1.0.0.png"} smallTitle />
      </BannerWrapper>

      <Container>
        <SwipeWithControl<IProduct>
          className="main-shop-swiper"
          title={title}
          itemsList={itemsList}
          swipeProps={{ freeMode: true, scrollbar: true }}
          renderSeeAll={
            <Link prefetch={false} href={`${process.env.NEXT_PUBLIC_SHOP_URL_FRONT}`} passHref>
              <GoShop className="go-shop">{lang[locale].mainPage.goShop}</GoShop>
            </Link>
          }
        >
          {(value: IProduct) => <CardShop productInfo={value} setLoading={setLoading} />}
        </SwipeWithControl>
      </Container>
    </>
  );
};

const Container = styled(SwiperWrapper)`
  margin-top: -12.19vw;
  padding-bottom: 2.08vw;

  h2 {
    color: ${theme.colors.white};
  }

  div:first-of-type {
    overflow-x: clip;
  }
  & .main-shop-swiper.swiper {
    overflow: inherit;
  }

  & .swiper {
    width: 100%;
    margin-top: 3.33vw;
    padding-bottom: 5.6vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      & .swiper {
        padding-bottom: 8.87vw;
      }
      & > .swiper-scrollbar {
        bottom: 0;
        background: ${({ theme }) => theme.colors.blackLight_whiteGray};

        .swiper-scrollbar-drag {
          background: ${({ theme }) => theme.colors.grayDark_gray1};
        }
      }
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      & .swiper {
        padding-bottom: 14.93vw;
      }

      & > .swiper-scrollbar {
        bottom: 0;
      }
    }
  }

  & .swiper .swiper-slide {
    position: relative;
    width: 19.69vw;
    margin-right: 1.25vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: -19.3vw;
    padding-bottom: 10.43vw;

    & .swiper .swiper-slide {
      width: 44.2vw;
      margin-right: 3.13vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: -21.87vw;
    padding-bottom: 10.67vw;

    & .swiper .swiper-slide {
      margin-right: 3.2vw;
      overflow: visible;
    }
  }
`;

const GoShop = styled.a`
  display: block;
  position: absolute;
  right: 0;
  bottom: 3.6vw;
  text-align: right;
  cursor: pointer;
  font-family: "FCSM Text", sans-serif;
  color: ${({ theme }) => theme.colors.grayLight_grayDark1};
  font-size: 0.73vw;
  text-transform: uppercase;
  text-decoration: none;
  z-index: 2;
  font-weight: 600;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    /* display: none; */
    position: relative;
    font-size: 1.83vw;
    bottom: 0;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 2.67vw;
  }
`;

const BannerWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-top: 6.25vw;
  div {
    color: ${theme.colors.white};
  }
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 10.43vw;
    article {
      height: 358px;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: 10.67vw;
    article {
      height: 180px;
    }
  }
`;
