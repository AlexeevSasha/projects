import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { theme } from "../../../assets/theme/theme";
import { IconCLock } from "../../../assets/icon/iconCLock";

export const EmptyPurchases = () => {
  const { locale = "ru" } = useRouter();

  return (
    <Container>
      <Title>{lang[locale].profile.denariiPage.noPurchases}</Title>

      <div>
        <IconCLock />
      </div>

      <p>{lang[locale].profile.denariiPage.notPurchasesYet}</p>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  margin-top: 2.08vw;
  color: ${({ theme }) => theme.colors.white_black};

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
