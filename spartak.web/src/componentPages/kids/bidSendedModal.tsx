import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { lang } from "../../../public/locales/lang";
import { theme } from "../../assets/theme/theme";
import { H1 } from "../../components/modal/modalUi";

export const BidSendedModal = () => {
  const { locale = "ru" } = useRouter();

  return (
    <Container>
      <H1>{lang[locale].kids.bidSendedTitle}</H1>

      <Text>{lang[locale].kids.bidSendedText}</Text>
    </Container>
  );
};

const Container = styled.div`
  font-family: "FCSM Text";
  font-weight: 500;
  width: 20.15vw;
  margin: 0 auto;
  display: flex;
  flex-flow: column;
  justify-content: center;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;
  }
`;

const Text = styled.div`
  font-size: 0.9375vw;
  margin-top: 0.625vw;
  text-align: center;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.34vw;
    margin-top: 1.56vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.26vw;
    margin-top: 3.2vw;
  }
`;
