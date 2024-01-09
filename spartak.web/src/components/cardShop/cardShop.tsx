import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useCallback, useState } from "react";
import styled from "styled-components";
import type { IProduct } from "../../api/dto/IProduct";
import { theme } from "../../assets/theme/theme";
import { CustomButton } from "../buttons/customButton";
import { shopRepository } from "../../api/shopRepository";
import { DataContext } from "../../core/dataProvider";
import { LikeContainer } from "./componentCardShop/commonComponents";
import { IconLike } from "../../assets/icon/iconLike";
import { lang } from "../../../public/locales/lang";
import { SizesLine } from "./componentCardShop/sizesLine";
import { NextImage } from "../../ui/nextImage/nextImage";
import { getCookie } from "../../assets/constants/getCookie";

interface IProps {
  productInfo: IProduct;
  setLoading: (value: boolean) => void;
}

export const CardShop = (props: IProps) => {
  const {
    shop: { favourites = undefined } = {},
    setListShop,
    updateFavourites,
    setDrawerIsOpen,
  } = useContext(DataContext);
  const { locale = "ru" } = useRouter();
  const [activeAppearence, setActiveAppearence] = useState(props.productInfo.appearence?.[0]);
  const [activeImage, setActiveImage] = useState<string>(activeAppearence.files[0].src);
  const [activeSize, setActiveSize] = useState(activeAppearence.list?.[0]);

  const handleAddProduct = (id: number) => {
    props.setLoading(true);
    shopRepository
      .addBasketProduct(id)
      .then((res) => {
        if (!getCookie("access_token"))
          document.cookie = "basketId=" + res.basketId + `;domain=${process.env.NEXT_PUBLIC_DOMAIN};path=/`;
        shopRepository.fetchShopBasket().then((res) => setListShop(res));
      })
      .finally(() => props.setLoading(false));
  };

  useEffect(() => {
    setActiveAppearence(props.productInfo.appearence?.[0]);
    setActiveImage(props.productInfo.appearence?.[0]?.files[0].src);
  }, [props]);

  const priceBlock = useCallback(
    (withButton: boolean) => (
      <PriceBlock>
        {activeSize.oldPrice ? <Price>{activeSize.oldPrice}</Price> : null}

        {/* {activeSize.price ? <NewPrice>{activeSize.price}</NewPrice> : null} */}
        {activeSize.denarii ? (
          activeSize.priceN ? (
            <NewPrice>
              {activeSize.priceN}
              <Denary src={"/images/gladiator.svg"} alt={"denarii"} />
            </NewPrice>
          ) : null
        ) : activeSize.price ? (
          <NewPrice>{activeSize.price}</NewPrice>
        ) : null}

        {withButton ? (
          <Button
            type="red"
            onClick={() => {
              handleAddProduct(activeSize.id);
              setDrawerIsOpen(true);
            }}
          >
            {lang[locale].button.inGarbage}
          </Button>
        ) : null}
      </PriceBlock>
    ),
    [activeSize, locale]
  );

  return (
    <ContainerCard>
      <Link prefetch={false} href={`${process.env.NEXT_PUBLIC_SHOP_URL_FRONT}${props.productInfo.link}`} passHref>
        <ContainerImg>
          <ImgContainer>
            <NextImage src={activeImage} alt={props.productInfo.title} objectFit="cover" />
          </ImgContainer>
          {activeSize.discountPercent && (
            <DiscountBlock>
              <Discount>{"-" + activeSize.discountPercent + "%"}</Discount>
            </DiscountBlock>
          )}
          <LikeContainer
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              updateFavourites(props.productInfo.id);
            }}
          >
            <IconLike isActive={favourites?.some((id) => id === props.productInfo.id.toString())} />
          </LikeContainer>

          <WripperLines
            onMouseOut={() => {
              setActiveImage(activeAppearence.files[0].src);
            }}
          >
            {activeAppearence.files.map(({ src }, index) => (
              <LineContainer key={`${index}${src}`} onMouseEnter={() => setActiveImage(src)}>
                <Line isActive={src === activeImage} />
              </LineContainer>
            ))}
          </WripperLines>
        </ContainerImg>
      </Link>

      <DescriptionBlock>
        <TitleContainer>
          <Link prefetch={false} href={`${process.env.NEXT_PUBLIC_SHOP_URL_FRONT}${props.productInfo.link}`} passHref>
            <Title>{props.productInfo.title}</Title>
          </Link>
          {priceBlock(false)}
        </TitleContainer>
      </DescriptionBlock>

      <HoverBlock>
        <Link prefetch={false} href={`${process.env.NEXT_PUBLIC_SHOP_URL_FRONT}${props.productInfo.link}`} passHref>
          <FullText>{props.productInfo.title}</FullText>
        </Link>
        <ContainerColors>
          {props.productInfo.appearence.map((elem, index) => (
            <ItemImage
              key={`${index}${elem.xml}`}
              active={activeAppearence.xml === elem.xml}
              onClick={() => setActiveAppearence(elem)}
            >
              <NextImage src={elem.files[0]?.src} />{" "}
            </ItemImage>
          ))}
        </ContainerColors>
        <SizesLine onClick={setActiveSize} activeSize={activeSize} activeAppearence={activeAppearence} />
        {priceBlock(true)}
      </HoverBlock>
    </ContainerCard>
  );
};

const ContainerImg = styled.a`
  position: relative;
  display: flex;
  overflow: hidden;
  align-items: center;
  height: 19.69vw;
  filter: contrast(90%);

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 45.37vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 44.27vw;
  }
`;

const TitleContainer = styled.div`
  position: relative;
`;

const HoverBlock = styled.div<{ isDescriptionStatic?: boolean }>`
  display: none;
  position: absolute;
  top: 19.69vw;
  box-sizing: border-box;
  padding: 0.83vw;
  bottom: auto;
  background: ${({ theme }) => theme.colors.black_white};
  width: 19.69vw;
  border-left: ${({ theme }) => `1px solid ${theme.colors.grayDark_gray1}`};
  border-right: ${({ theme }) => `1px solid ${theme.colors.grayDark_gray1}`};
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.grayDark_gray1}`};
  z-index: 20;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: none;
  }
`;

const DiscountBlock = styled.p`
  top: 0.83vw;
  left: 0.83vw;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1.04vw;
  margin: 0;
  position: absolute;
  background-color: rgba(204, 18, 45, 0.1);
  width: 4.27vw;
  height: 1.35vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    top: 2.09vw;
    left: 2.09vw;
    background-color: ${theme.colors.red};
    width: 10.69vw;
    height: 4.17vw;
    border-radius: 2.61vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    top: 2.13vw;
    left: 2.13vw;
    width: 14.93vw;
    height: 6.4vw;
    border-radius: 5.33vw;
  }
`;

const Discount = styled.span`
  color: ${theme.colors.red};
  font-family: "FCSM Text", sans-serif;
  font-weight: 600;
  font-size: 0.73vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    color: ${theme.colors.white};
    font-size: 1.83vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.2vw;
  }
`;

const WripperLines = styled.div`
  position: absolute;
  display: flex;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  grid-column-gap: 0.21vw;
  margin: 0 0.83vw 0.83vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: none;
  }
`;

const LineContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Line = styled.div<{ isActive: boolean }>`
  background-color: ${({ isActive }) => (isActive ? theme.colors.red : "rgba(13, 17, 22, 0.3);")};
  height: 0.21vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 0.52vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 1.07vw;
  }
`;

const ImgContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const DescriptionBlock = styled.div`
  font-family: "FCSM Text", sans-serif;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  padding: 0.83vw;
  background: ${({ theme }) => theme.colors.black_white};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 2.13vw;
  }
`;

const FullText = styled.h3`
  font-weight: 500;
  font-size: 0.94vw;
  color: ${({ theme }) => theme.colors.white_black};
  cursor: pointer;
  margin: 0 0 0.73vw;
  line-height: 1.77vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
    margin: 0 0 1.91vw;
    line-height: 4.43vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    margin: 2.13vw 0;
    line-height: 5.87vw;
  }
`;
const Title = styled(FullText)`
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  height: 3.54vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 8.86vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 11.74vw;
  }
`;

const PriceBlock = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  grid-row-gap: 1.72vw;
`;

const Price = styled.span`
  font-weight: 500;
  font-size: 1.25vw;
  color: ${theme.colors.grayDark};
  text-decoration: line-through;
  margin-right: 0.83vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
    flex-grow: 0.2;
  }
`;

const NewPrice = styled.span`
  font-weight: 700;
  font-size: 1.25vw;
  color: ${({ theme }) => theme.colors.white_black};
  display: flex;
  align-items: center;

  img {
    margin-left: 0.21vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
    img {
      margin-left: 0.52vw;
    }
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
    img {
      margin-left: 1.07vw;
    }
  }
`;

const Denary = styled.img`
  width: 1.25vw;
  height: 1.25vw;
  cursor: pointer;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 2.6vw;
    height: 2.6vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 4.27vw;
    height: 4.27vw;
  }
`;

const ItemImage = styled.div<{ active: boolean }>`
  width: 3.44vw;
  height: 3.44vw;
  flex-shrink: 0;
  cursor: pointer;
  border: ${({ active }) => (active ? `2px solid ${theme.colors.red}` : "2px solid transparent")};

  &:hover {
    border-color: ${theme.colors.red};
  }
`;

const ContainerColors = styled.div`
  display: flex;
  grid-column-gap: 0.63vw;
  overflow: auto;
  margin-bottom: 0.83vw;
`;

const Button = styled(CustomButton)`
  padding: 0.52vw 0.83vw;
  margin-left: auto;
  /* display: none; */
  transition: scale 0.3s ease;
  font-size: 0.73vw;

  &:active {
    transform: scale(1.1);
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.83vw;
    padding: 1.3vw 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 2.73vw;
    flex-grow: 1;
    padding: 1.67vw 1.27vw;
    text-align: center;
  }
`;

const ContainerCard = styled.div<{ isDescriptionStatic?: boolean }>`
  width: 19.69vw;
  position: relative;
  cursor: pointer;
  font-weight: 500;
  transition: 0.3s ease;

  &:hover {
    z-index: 20;
  }
  &:hover ${HoverBlock} {
    display: block;
  }
  &:hover ${ImgContainer} {
    transform: scale(1.1);
    transition: 0.6s ease;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 45.37vw;

    &:hover ${HoverBlock} {
      display: none;
    }
    &:hover ${ImgContainer} {
      transform: none;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 43.27vw;
  }
`;
