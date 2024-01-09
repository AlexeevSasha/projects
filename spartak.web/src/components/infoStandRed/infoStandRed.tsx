import React from "react";
import styled from "styled-components";
import { theme } from "../../assets/theme/theme";
import { ContainerWithBackgroundImg } from "../containers/containerWithBackgroundImg";

interface Props {
  textLeft: string;
  textRight: string;
}
export const InfoStandRed = ({ textLeft, textRight }: Props) => {
  return (
    <ContainerWithBackgroundImg src="/images/banners/back_v1.0.0.png" gradient={""} position={"center"}>
      <Content>
        <P>{textLeft}</P>
        <P>{textRight}</P>
      </Content>
    </ContainerWithBackgroundImg>
  );
};

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 2.08vw;
  color: ${theme.colors.white};
  grid-column-gap: 3.54vw;
  font-size: 1.25vw;
  margin-bottom: 4.17vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 1fr;
    padding: 3.13vw;
    grid-row-gap: 3.13vw;
    font-size: 2.35vw;
    margin-bottom: 10.43vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 6.4vw;
    grid-row-gap: 6.4vw;
    font-size: 4.27vw;
    margin-bottom: 6.13vw;
  }
`;

const P = styled.p`
  margin: 0;
`;
