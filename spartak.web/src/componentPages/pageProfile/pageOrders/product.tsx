import { useRouter } from "next/router";
import React, { useMemo } from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { theme } from "../../../assets/theme/theme";
import type { IOrderBasket } from "../../../api/dto/IOrders";
import { NextImage } from "../../../ui/nextImage/nextImage";

type Props = {
  product: IOrderBasket;
};

export const Product = ({ product }: Props) => {
  const { locale = "ru" } = useRouter();

  const propertiesData = useMemo(
    () =>
      Array.isArray(product.props)
        ? product.props?.map((elem) => (
            <Color key={elem.value}>
              <Attr>{elem.label}: </Attr> <span dangerouslySetInnerHTML={{ __html: elem.value }} />
            </Color>
          ))
        : null,
    [product.props]
  );

  return (
    <Container>
      <Photo>
        <NextImage src={`${product.files?.[0].src}`} />
      </Photo>

      <Info>
        <div>
          <Name>{product.title?.replaceAll("&quot;", '"')}</Name>

          {product?.code && (
            <Code>
              <Attr>{lang[locale].profileOrders.vendorCode}</Attr> {product.code}
            </Code>
          )}
        </div>

        {Array.isArray(product.props) && product.props.length && <div>{propertiesData}</div>}
      </Info>

      <Price>
        <Attr>{lang[locale].profileOrders.pricePerOne}: </Attr>
        <div>{product.price}</div>
      </Price>

      <Count>{parseInt(product.quantity)}</Count>

      <Sum>
        <div>{lang[locale].profileOrders.sum}: </div>
        <div>{product.priceSum}</div>
      </Sum>
    </Container>
  );
};

const Container = styled.div`
  font-family: "FCSM Text", sans-serif;
  font-weight: 500;
  letter-spacing: 0.1px;
  font-size: 0.625vw;
  width: 100%;
  display: grid;
  grid: auto / 5.73vw auto 7vw 3vw 8vw;
  grid-gap: 0.625vw;
  align-items: center;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.grayDark_gray1}`};
  color: ${({ theme }) => theme.colors.gray_grayDark1};
  padding: 1.05vw 0;
  white-space: nowrap;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.56vw;
    padding: 2.6vw 0;
    grid-gap: 1.56vw;
    grid: 1fr auto / 14.34vw 14.77vw 6.68vw auto;
    grid-template-areas:
      "a b b b"
      "a c d e";
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.2vw;
    padding: 6.13vw 0;
    grid-gap: 3.2vw;
    grid: auto auto auto / 18.66vw auto 23vw;
    grid-template-areas:
      "a b b b "
      "d d d d "
      "e f f g";
  }
`;

const Photo = styled.div`
  align-self: flex-start;
  width: 100%;
  height: 5.74vw;
  border: 1px solid ${theme.colors.gray1};
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-area: a;
    height: 14.34vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 18.66vw;
  }
`;

const Info = styled.div`
  align-self: start;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-area: b;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-area: unset;
    display: contents;

    & > div:first-child {
      grid-area: b;
    }

    & > div:last-child {
      grid-area: d;
    }
  }
`;

const Attr = styled.span`
  text-transform: uppercase;
`;

const Name = styled.div`
  font-size: 0.94vw;
  color: ${({ theme }) => theme.colors.white_black};
  white-space: normal;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.8vw;
  }
`;

const Code = styled.div`
  margin-bottom: 0.625vw;
`;

const Color = styled.div`
  margin-bottom: 0.2vw;
`;

const Price = styled.div`
  text-transform: uppercase;

  & > div:nth-child(2) {
    font-size: 0.94vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-area: c;

    & > div:nth-child(2) {
      font-size: 2.34vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-area: e;

    & > div:nth-child(2) {
      font-size: 4.8vw;
    }
  }
`;

const Count = styled.div`
  font-size: 1.25vw;
  color: ${({ theme }) => theme.colors.white_black};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-area: d;
    font-size: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-area: f;
    font-size: 6.4vw;
    text-align: center;
  }
`;

const Sum = styled.div`
  text-transform: uppercase;

  & > div:nth-child(2) {
    font-size: 1.25vw;
    color: ${({ theme }) => theme.colors.white_black};
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-area: e;

    & > div:nth-child(2) {
      font-size: 3.13vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-area: g;

    & > div:nth-child(2) {
      font-size: 6.4vw;
    }
  }
`;
