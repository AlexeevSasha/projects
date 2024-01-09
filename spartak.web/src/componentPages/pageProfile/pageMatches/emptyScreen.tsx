import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import Ball from "../../../assets/images/ball.png";
import { theme } from "../../../assets/theme/theme";
import { IconImage } from "../../../components/IconImage";

export const EmptyScreen = () => {
  const { locale = "ru" } = useRouter();

  return (
    <Container>
      <Title>{lang[locale].profile.matches.emptyTitle}</Title>

      <IconImage url={Ball.src} />

      <p>{lang[locale].profile.matches.emptyDesc}</p>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  margin: 2.08vw 0 6.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 2.08vw 0 10.43vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 2.08vw 0 10.66vw;
  }

  & > div {
    color: ${theme.colors.red};
    width: 4.17vw;
    height: 4.17vw;
    margin: 1.25vw 0;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      width: 10.43vw;
      height: 10.43vw;
      margin: 3.13vw 0;
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      width: 17vw;
      height: 17vw;
      margin: 4.27vw 0;
    }
  }

  & > p {
    font-family: "FCSM Text", sans-serif;
    font-weight: 500;
    letter-spacing: 0.1px;
    font-size: 0.9375vw;
    text-align: center;
    margin: 0;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      font-size: 2.35vw;
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      font-size: 4.27vw;
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
