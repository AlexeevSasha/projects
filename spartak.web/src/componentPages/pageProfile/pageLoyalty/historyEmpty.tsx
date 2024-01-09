import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { theme } from "../../../assets/theme/theme";
import { IconGift } from "../../../assets/icon/iconGift";

export const HistoryEmpty = () => {
  const { locale = "ru" } = useRouter();

  return (
    <Container>
      <Title>{lang[locale].profileLoyalty.noHistory}</Title>
      <div>
        <IconGift />
      </div>

      <p>{lang[locale].profileLoyalty.noHistoryDesc}</p>
    </Container>
  );
};

const Container = styled.div`
  grid-column-start: 1;
  grid-column-end: 4;
  display: flex;
  flex-flow: column;
  align-items: center;
  margin: 6.25vw 0;
  color: ${({ theme }) => theme.colors.white_black};
  width: 100%;

  & > div {
    color: ${theme.colors.red};
    margin: 1.25vw 0;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      margin: 3.13vw 0;
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      margin: 4.27vw 0;
    }
  }

  & > p {
    font-family: "FCSM Text", sans-serif;
    font-weight: 500;
    letter-spacing: 0.1px;
    font-size: 0.9375vw;
    text-align: center;
    width: 26.66vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      font-size: 2.35vw;
      width: 100%;
      max-width: 66.75vw;
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      font-size: 4.27vw;
      max-width: unset;
    }
  }

  & a {
    color: ${theme.colors.red};
    text-decoration: none;
  }
`;

const Title = styled.span`
  font-size: 2.08vw;
  font-weight: 700;
  font-family: "FCSM Text", sans-serif;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-bottom: 3.13vw;
    font-size: 5.22vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-bottom: 6.4vw;
    font-size: 8.53vw;
  }
`;
