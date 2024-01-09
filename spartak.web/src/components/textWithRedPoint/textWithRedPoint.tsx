import React, { FC } from "react";
import styled from "styled-components";
import { theme } from "../../assets/theme/theme";
import { NextImage } from "../../ui/nextImage/nextImage";

export const TextWithRedPoint: FC = ({ children }) => {
  return (
    <Content>
      <ImageContainer>
        <NextImage alt={"Red Point"} src={"/images/stadium/RedPoint.svg"} />
      </ImageContainer>
      <P>{children}</P>
    </Content>
  );
};

const Content = styled.div`
  display: grid;
  grid-template-columns: 2.08vw 1fr;
  grid-column-gap: 0.63vw;
  align-items: center;
  justify-content: start;
  margin: 1.25vw 0;

  &:nth-child(1) {
    margin: 0 0 1.25vw;
  }

  &:nth-last-child(1) {
    margin: 1.25vw 0;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 5.22vw 1fr;
    grid-column-gap: 1.56vw;
    margin: 4.17vw 0;

    &:nth-child(1) {
      margin: 0 0 4.17vw;
    }

    &:nth-last-child(1) {
      margin: 4.17vw 0;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: 10.67vw 1fr;
    grid-column-gap: 3.2vw;
    margin: 9.07vw 0;

    &:nth-child(1) {
      margin: 0 0 9.07vw;
    }

    &:nth-last-child(1) {
      margin: 9.07vw 0;
    }
  }
`;

const P = styled.div`
  margin: 0 0 auto;
`;

const ImageContainer = styled.div`
  width: 2.08vw;
  height: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 5.22vw;
    height: 5.22vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 10.67vw;
    height: 10.67vw;
  }
`;
