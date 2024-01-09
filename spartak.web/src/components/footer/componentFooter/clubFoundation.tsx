import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { theme } from "../../../assets/theme/theme";
import { NextImage } from "../../../ui/nextImage/nextImage";

export const ClubFoundation = () => {
  const presentYear = new Date().getFullYear();
  const { locale = "ru" } = useRouter();

  return (
    <Container>
      <Foundation>{lang[locale].footer.clubFoundation(presentYear)}</Foundation>

      <Developer
        target="_blank"
        href="https://dex-it.ru/?utm_source=spartak-web&utm_medium=organic&utm_campaign=site-spartak&utm_content=logo&utm_term=logo"
      >
        {lang[locale].footer.developer}
        <NextImage src="/images/DEX.svg" />
      </Developer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${theme.colors.gray};
  font-size: 0.73vw;
  font-family: "FCSM Text", sans-serif;
  padding: 2.08vw 0 3.07vw;
  white-space: break-spaces;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.56vw;
    padding: 4.17vw 0 5.22vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    flex-direction: column;
    font-size: 3.2vw;
    padding: 8.53vw 0 4.27vw;
  }
`;

const Foundation = styled.span`
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 44.85vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 100%;
    margin-bottom: 3.57vw;
  }
`;

const Developer = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  color: ${theme.colors.gray};

  & > div {
    width: 3.6vw;
    height: 1.82vw;
    margin-left: 0.4vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    & > div {
      width: 9vw;
      height: 4.56vw;
      margin-left: 1vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: unset;

    & > div {
      width: 16.8vw;
      height: 8.53vw;
      margin-left: 2vw;
    }
  }
`;
