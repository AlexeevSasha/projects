import React from "react";
import styled from "styled-components";
import { theme } from "../../assets/theme/theme";
import { NextImage } from "../../ui/nextImage/nextImage";

interface IProps {
  first: string;
  second: string;
  main: string;
  left?: boolean;
  number?: number;
  onClick?: (value?: number) => void;
}

export const BlockTriplePhoto = (props: IProps) => {
  return (
    <BlockPhoto>
      {props.first ? (
        <FirstPhoto onClick={() => props.onClick?.(props.number)}>
          <ImgContainer>
            <NextImage alt="Picture of the author" objectFit="cover" src={props.first} />
          </ImgContainer>
        </FirstPhoto>
      ) : null}

      {props.second ? (
        <SecondPhoto onClick={() => props.onClick?.((props.number || 0) + 1)}>
          <ImgContainer>
            <NextImage alt="Picture of the author" objectFit="cover" src={props.second} />
          </ImgContainer>
        </SecondPhoto>
      ) : null}

      {props.main ? (
        <Main onClick={() => props.onClick?.((props.number || 0) + 2)}>
          <ImgContainer>
            <NextImage alt="Picture of the author" objectFit="cover" src={props.main} />
          </ImgContainer>
        </Main>
      ) : null}
    </BlockPhoto>
  );
};

const BlockPhoto = styled.section`
  display: grid;
  direction: ltr;
  grid-template-columns: 2fr 1fr;
  grid-gap: 0.21vw;
  grid-template-rows: repeat(2, auto);
  width: 100%;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-gap: 0.52vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-gap: 1.07vw;
  }
`;

const FirstPhoto = styled.div`
  grid-area: 1/1/3/2;
  height: 25.63vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-area: auto;
    height: 43.29vw;
    width: 100%;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 48vw;
  }
`;

const SecondPhoto = styled.div`
  grid-area: 1/2/1/2;
  height: 12.71vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-area: auto;
    height: 43.29vw;
    width: 100%;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 48vw;
  }
`;

const Main = styled.div`
  grid-area: 2/2/2/2;
  height: 12.71vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-area: auto;
    height: 43.29vw;
    width: 100%;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 48vw;
  }
`;

const ImgContainer = styled.div`
  cursor: pointer;
  height: 100%;
`;
