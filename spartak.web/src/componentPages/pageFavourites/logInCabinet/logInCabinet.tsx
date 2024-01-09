import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { theme } from "../../../assets/theme/theme";
import { CustomButton } from "../../../components/buttons/customButton";

export const LogInCabinet = () => {
  const { locale = "ru", push, asPath } = useRouter();

  return (
    <Content>
      <Title>{lang[locale].shop.logInCabinet}</Title>
      <Text>{lang[locale].shop.logInCabinetDetails}</Text>
      <Button type={"red"} onClick={() => push(`/auth/signin?backUrl=${encodeURIComponent(asPath)}`)}>
        {lang[locale].header.login}
      </Button>
    </Content>
  );
};
const Content = styled.div`
  width: 50%;
  padding: 1.25vw 2.08vw;
  background: ${({ theme }) => theme.colors.redOpacity_fireEngineRedOpacity};
  color: ${({ theme }) => theme.colors.white_black};
  font-family: "FCSM Text", sans-serif;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  grid-row-gap: 0.63vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: auto;
    padding: 3.13vw 5.22vw;
    grid-row-gap: 1.56vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 3.2vw;
    grid-row-gap: 2.13vw;
  }
`;

const Title = styled.h2`
  font-weight: 700;
  margin: 0;
  font-size: 1.67vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
  }
`;
const Text = styled.p`
  margin: 0;
  font-size: 0.83vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
  }
`;
const Button = styled(CustomButton)`
  padding: 0.73vw 7.19vw;
  width: fit-content;
  max-width: 100%;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 1.83vw 17.99vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 3.73vw 0;
    width: 100%;
  }
`;
