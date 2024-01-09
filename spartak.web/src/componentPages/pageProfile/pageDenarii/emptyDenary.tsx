import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { theme } from "../../../assets/theme/theme";
import { NextLink } from "../../../components/nextLink/nextLink";
import { IconCoin } from "../../../assets/icon/iconCoin";

export const EmptyDenary = () => {
  const { locale = "ru" } = useRouter();

  return (
    <Container>
      <div>
        <IconCoin />
      </div>

      <p>
        <span>{lang[locale].profile.denariiPage.emptyDenari}</span>
        <NextLink url={"/more/loyalty/main"} target={"_self"}>
          {lang[locale].profile.denariiPage.emptyDenariLink}
        </NextLink>
      </p>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  margin-top: 2.08vw;
  color: ${({ theme }) => theme.colors.white_black};
  background: ${({ theme }) => theme.colors.blackLight_white1};
  padding: 5.5vw 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 10.43vw 0;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 15.46vw 0;
  }

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
    margin: 0;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      font-size: 2.35vw;
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      font-size: 4.27vw;
    }
  }

  & span {
    display: block;
  }

  & a {
    color: ${theme.colors.red};
    text-decoration: none;
  }
`;
