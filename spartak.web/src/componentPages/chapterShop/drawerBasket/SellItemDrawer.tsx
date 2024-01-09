import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { IProductCart, IProductList } from "../../../api/dto/IProductInfo";
import { shopRepository } from "../../../api/shopRepository";
import { ClearCartIcon } from "../../../assets/icon/clearCartIcon";
import { MinusIcon } from "../../../assets/icon/minusIcon";
import { PlusIcon } from "../../../assets/icon/plusIcon";
import { theme } from "../../../assets/theme/theme";
import { NextImage } from "../../../ui/nextImage/nextImage";

interface Props {
  item: IProductList;
  onDelete: (id: number) => void;
  setList: (items: IProductCart) => void;
  setLoading: (value: boolean) => void;
}

export const SellItemDrawer = ({ item, setList, setLoading, onDelete }: Props) => {
  const { locale = "ru" } = useRouter();

  const handleUpdate = (quantity: number) => {
    setLoading(true);
    shopRepository.updateBasketProduct(item.id, quantity).then(() =>
      shopRepository
        .fetchShopBasket()
        .then((res) => setList(res))
        .finally(() => {
          setLoading(false);
        })
    );
  };

  return (
    <>
      <WrapperItem>
        <Link prefetch={false} href={`${process.env.NEXT_PUBLIC_SHOP_URL_FRONT}/${item.link}`} passHref>
          <ImageItem onClick={() => setLoading(true)}>
            <NextImage src={item.photo} alt={item.title} />
          </ImageItem>
        </Link>

        <ItemDescription>
          <Link prefetch={false} href={`${process.env.NEXT_PUBLIC_SHOP_URL_FRONT}/${item.link}`} passHref>
            <Title onClick={() => setLoading(true)} dangerouslySetInnerHTML={{ __html: item.title }} />
          </Link>

          <Size>
            {lang[locale].shop.size}:&nbsp;
            {item.size}
          </Size>

          <DesktopItemDetails>
            <TitlePrice>
              {lang[locale].shop.unitPrice}{" "}
              {item.denarii ? (
                <Price>
                  {item.priceN} <Denary src={"/images/gladiator.svg"} alt="denarii" />
                </Price>
              ) : (
                <Price>{item.price}</Price>
              )}
            </TitlePrice>

            <Controls>
              <MinusIcon onClick={() => item.quantity > 1 && handleUpdate(item.quantity - 1)} />
              {item.quantity}
              <PlusIcon onClick={() => handleUpdate(item.quantity + 1)} />
            </Controls>

            <TitlePrice>
              {lang[locale].shop.total}:
              <TotalPrice>
                {`${item.quantity * parseFloat(item.price.replace(/ /g, ""))} `}
                {item.denarii ? <Denary src={"/images/gladiator.svg"} alt="denarii" /> : " ₽"}
              </TotalPrice>
            </TitlePrice>

            <SvgContainer>
              <ClearCartIcon onClick={() => onDelete(item.id)} />
            </SvgContainer>
          </DesktopItemDetails>
        </ItemDescription>

        <MobileSvgContainer>
          <ClearCartIcon onClick={() => onDelete(item.id)} />
        </MobileSvgContainer>
      </WrapperItem>

      <MobileItemDetails>
        <TitlePrice>
          {lang[locale].shop.unitPrice}
          <br />
          {item.denarii ? (
            <Price>
              {item.priceN} <Denary src={"/images/gladiator.svg"} alt="denarii" />
            </Price>
          ) : (
            <Price>{item.price}</Price>
          )}
        </TitlePrice>

        <Controls>
          <MinusIcon onClick={() => item.quantity > 1 && handleUpdate(item.quantity - 1)} />
          {item.quantity}
          <PlusIcon onClick={() => handleUpdate(item.quantity + 1)} />
        </Controls>

        <TitlePrice>
          {lang[locale].shop.total}:
          <br />
          <TotalPrice>
            {`${item.quantity * parseFloat(item.price.replace(/ /g, ""))} `}
            {item.denarii ? <Denary src={"/images/gladiator.svg"} alt="denarii" /> : " ₽"}
          </TotalPrice>
        </TitlePrice>
      </MobileItemDetails>
    </>
  );
};

const WrapperItem = styled.div<{ lastItem?: boolean }>`
  display: flex;
  min-height: 4.06vw;
  border-bottom: 1px solid ${theme.colors.grayLight};
  padding: 0.83vw 0;
  font-weight: 500;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 2.86vw 0;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 2.7vw 0;
    border-bottom: none;
  }
`;

const ImageItem = styled.div`
  cursor: pointer;
  width: 4.6vw;
  height: 4.6vw;
  border: 1px solid ${theme.colors.grayLight};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 10.17vw;
    height: 10.17vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 20.8vw;
    height: 20.8vw;
  }
`;

const ItemDescription = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.16vw 0;
  flex: 1;
  margin: 0 0.625vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 0 1.56vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 0 2.4vw;
  }
`;

const Title = styled.p`
  cursor: pointer;
  align-items: flex-start;
  margin: 0;
  font-size: 0.83vw;
  flex-wrap: wrap;
  color: ${theme.colors.black};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
  }
`;

const Size = styled.p`
  margin: 0;
  text-transform: uppercase;
  color: ${theme.colors.grayDark};
  font-size: 0.63vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.56vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.2vw;
  }
`;

const DesktopItemDetails = styled.div`
  margin-top: 0.83vw;
  display: flex;

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: none;
  }
`;

const MobileItemDetails = styled.div`
  display: none;

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: flex;
    border-bottom: 1px solid ${theme.colors.grayLight};
    margin-top: 1.14vw;
    padding-bottom: 3.34vw;
  }
`;

const TitlePrice = styled.div`
  font-size: 0.64vw;
  color: ${theme.colors.gray};
  text-transform: uppercase;
  width: 5.2vw;

  &:not(:first-child) {
    padding-left: 1.19vw;
    width: max-content;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.56vw;
    width: 13vw;

    &:not(:first-child) {
      padding-left: 3vw;
      width: max-content;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.2vw;
    width: 29vw;

    &:not(:first-child) {
      padding-left: 9vw;
    }
  }
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.94vw;
  margin-top: 0.26vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.8vw;
  }
`;

const Denary = styled.img`
  width: 1.04vw;
  height: 1.04vw;
  cursor: pointer;
  margin-left: 0.21vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 2.6vw;
    height: 2.6vw;
    margin-left: 0.52vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 4.27vw;
    height: 4.27vw;
    margin-left: 1.07vw;
  }
`;

const Controls = styled.div`
  font-size: 1.25vw;
  display: flex;
  justify-content: space-between;
  color: ${theme.colors.black};
  align-items: center;
  flex-basis: 6.66vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
    flex-basis: 16.68vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
    flex-basis: 27.73vw;
  }
`;

const TotalPrice = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.25vw;
  color: ${theme.colors.black};
  white-space: nowrap;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.8vw;
  }
`;

const SvgContainer = styled.div`
  display: flex;
  margin-left: auto;
  padding-bottom: 0.42vw;
  cursor: pointer;

  svg {
    width: 1.25vw;
    height: 1.25vw;
  }

  svg > path {
    stroke: ${theme.colors.grayDark};
  }

  svg:hover {
    path {
      stroke: ${theme.colors.red};
    }
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    svg {
      width: 3.13vw;
      height: 3.13vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    align-items: flex-start;

    svg {
      width: 6.4vw;
      height: 6.4vw;
    }
  }
`;

const MobileSvgContainer = styled(SvgContainer)`
  display: none;

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: block;
  }
`;
