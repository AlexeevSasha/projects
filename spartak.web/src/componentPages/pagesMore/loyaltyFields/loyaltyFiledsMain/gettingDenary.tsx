import React from "react";
import styled from "styled-components";
import { theme } from "../../../../assets/theme/theme";
import { LoyaltyMainDataType } from "../../../../../pages/more/loyalty/main";
import { useRouter } from "next/router";

type IProps = LoyaltyMainDataType["gettingDenary"];

export const GettingDenary = ({ title, teams2, teams1, teams3, text1, text2 }: IProps) => {
  const { locale = "ru" } = useRouter();

  return (
    <Container>
      <Title>{title}</Title>

      <ItemContainer>
        <Item>
          <Circle />
          <P>{teams1.join(", ")}</P>
        </Item>

        <Item>
          <Circle />
          <P>{teams2.join(", ")}</P>
        </Item>

        <Item>
          <Circle />
          <P>{teams3.join(", ")}</P>
        </Item>
      </ItemContainer>

      <TextContainer>
        <P dangerouslySetInnerHTML={{ __html: text1 }} />

        <P
          dangerouslySetInnerHTML={{
            __html: text2.replace(
              "process.env.NEXT_PUBLIC_SHOP_URL_FRONT",
              `${process.env.NEXT_PUBLIC_SHOP_URL_FRONT}${locale === "ru" ? "" : "/en"}`
            ),
          }}
        />
      </TextContainer>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  /* flex-direction: column; */
  margin-bottom: 6.2vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 10.43vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 10.67vw;
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
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    line-height: 11.2vw;
    font-size: 8.53vw;
    margin: 0 0 6.4vw;
  }
`;

const ItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 1.25vw;
  /* grid-auto-rows: auto; */

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 1fr;
    grid-row-gap: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-row-gap: 3.2vw;
  }
`;

const Item = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 1.04vw;
  align-self: center;
  background: ${({ theme }) => theme.colors.black_whiteGray};
  border: 1px solid ${({ theme }) => theme.colors.grayDark_gray1};
  padding: 1.25vw;
  box-sizing: border-box;
  height: 100%;
  align-items: center;

  &:nth-child(1) > :nth-child(1):after {
    content: "+1";
  }

  &:nth-child(2) > :nth-child(1):after {
    content: "+2";
  }

  &:nth-child(3) > :nth-child(1):after {
    content: "+3";
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 3.13vw;
    grid-gap: 2.61vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 5.07vw 4.27vw;
    grid-gap: 4.27vw;
  }
`;

const Circle = styled.div`
  width: 3.39vw;
  height: 3.39vw;
  background: ${theme.colors.red};
  color: ${theme.colors.white};
  border-radius: 100px;
  position: relative;

  &:after {
    position: absolute;
    font-weight: 700;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.67vw;
    line-height: 2.19vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 8.47vw;
    height: 8.47vw;

    &:after {
      font-size: 4.17vw;
      line-height: 5.48vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 13.33vw;
    height: 13.33vw;

    &:after {
      font-size: 6.4vw;
      line-height: 9.07vw;
    }
  }
`;

const P = styled.p`
  margin: 0;
  font-weight: 500;
  font-family: "FCSM Text", sans-serif;
  font-style: normal;
  font-size: 1.25vw;
  line-height: 1.77vw;
  color: ${({ theme }) => theme.colors.grayLight_grayDark};

  .green {
    color: ${theme.colors.green2};
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    line-height: 4.43vw;
    font-size: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    line-height: 7.47vw;
    font-size: 4.27vw;
  }
`;

const TextContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1.25vw;
  margin-top: 2.08vw;

  & a {
    text-decoration: none;
    color: ${theme.colors.red};
  }

  & p {
    font-family: "FCSM Text", sans-serif;
    font-weight: 500;
    font-size: 0.94vw;
    line-height: 1.46vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 1fr;
    grid-gap: 3.13vw;
    margin-top: 3.13vw;
    font-size: 2.35vw;

    & p {
      font-size: 2.35vw;
      line-height: 3.65vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-gap: 6.4vw;
    margin-top: 3.2vw;
    font-size: 4.27vw;

    & p {
      font-size: 4.27vw;
      line-height: 5.87vw;
    }
  }
`;
