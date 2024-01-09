import React from "react";
import styled from "styled-components";
import { theme } from "../../../../assets/theme/theme";
import ticketsAndAttributes from "../../../../assets/images/loyalty/ticketsAndAttributes.png";
import cardOwner from "../../../../assets/images/loyalty/debit card.png";
import Link from "next/link";
import { LoyaltyMainDataType } from "../../../../../pages/more/loyalty/main";
import Image from "next/image";

type IProps = LoyaltyMainDataType["whatIsDenary"];

export const WhatIsDenary = (props: IProps) => {
  return (
    <Container>
      <Title>{props.title}</Title>

      <TextContainer>
        <P>{props.text1}</P>
        <P>{props.text2}</P>
      </TextContainer>

      <DescriptionContainer>
        <DescItem>
          <ImgContainer>
            <Image layout={"fill"} src={ticketsAndAttributes.src} alt={"tickets and atributes"} />
          </ImgContainer>

          <div>
            <ItemName>{props.items[0].title}</ItemName>

            <ItemText>
              {props.items[0].text1}
              <Link prefetch={false} href={"/"} passHref>
                <CustomLink>&nbsp;{props.items[0].linkText1}</CustomLink>
              </Link>
              &nbsp;{props.items[0].text2}
              <Link prefetch={false} href={`${process.env.NEXT_PUBLIC_SHOP_URL_FRONT}`} passHref>
                <CustomLink>&nbsp;{props.items[0].linkText2}</CustomLink>
              </Link>
            </ItemText>
          </div>
        </DescItem>

        <DescItem>
          <ImgContainer>
            <Image layout={"fill"} src={cardOwner.src} alt={"pay with spartak"} />
          </ImgContainer>

          <div>
            <ItemName>{props.items[1].title}</ItemName>
            <ItemText>{props.items[1].text1}</ItemText>
          </div>
        </DescItem>
      </DescriptionContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 6.2vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 5.22vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 21.33vw;
  }
`;

const Title = styled.h6`
  margin: 0 0 1.25vw;
  font-weight: 700;
  font-size: 2.71vw;
  line-height: 3.33vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 0 0 3.13vw;
    font-size: 5.22vw;
    line-height: 6.52vw;
    max-width: 60%;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 0 0 6.4vw;
    font-size: 8.53vw;
    line-height: 11.2vw;
    max-width: none;
  }
`;

const TextContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1.25vw;
  margin-bottom: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 1fr;
    grid-gap: 3.13vw;
    margin-bottom: 5.22vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-gap: 6.4vw;
    margin-bottom: 6.4vw;
  }
`;

const P = styled.p`
  margin: 0;
  font-weight: 500;
  font-size: 0.94vw;
  line-height: 1.46vw;
  letter-spacing: 0.01vw;
  color: ${({ theme }) => theme.colors.grayLight_grayDark};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
    line-height: 3.65vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    line-height: 5.87vw;
  }
`;

const DescriptionContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0.83vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 1fr;
    grid-gap: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-gap: 6.4vw;
  }
`;

const DescItem = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 1.67vw;
  border: 1px solid ${theme.colors.grayDark};
  align-items: center;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 4.17vw;
    flex-direction: row;
    column-gap: 3.13vw;

    &:nth-child(even) {
      flex-direction: row-reverse;
    }

    & > :nth-child(2) {
      margin-bottom: auto;
      height: 100%;
    }
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 6.4vw;
    flex-direction: column;
    grid-row-gap: 3.2vw;

    &:nth-child(even) {
      flex-direction: column;
    }
  }
`;

const ImgContainer = styled.div`
  width: 12.86vw;
  height: 7.5vw;
  position: relative;
  margin-bottom: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    min-width: 32.16vw;
    height: 18.75vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    min-width: 42.67vw;
    min-height: 25.07vw;
  }
`;

const ItemName = styled.p`
  margin: 0;
  font-weight: 700;
  font-size: 1.67vw;
  line-height: 2.19vw;
  margin-bottom: 0.42vw;
  align-self: flex-start;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
    line-height: 5.48vw;
    margin-bottom: 1.04vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
    line-height: 9.07vw;
    margin-bottom: 1.07vw;
  }
`;

const CustomLink = styled.a`
  text-decoration: none;
  color: ${theme.colors.red};
  cursor: pointer;
`;

const ItemText = styled.div`
  font-weight: 500;
  font-size: 1.25vw;
  line-height: 1.77vw;
  color: ${({ theme }) => theme.colors.gray_black};
  word-break: break-word;
  white-space: pre-line;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
    line-height: 4.43vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.8vw;
    line-height: 7.47vw;
  }
`;
