import React from "react";
import styled from "styled-components";
import { theme } from "../../../assets/theme/theme";
import { NextImage } from "../../../ui/nextImage/nextImage";

interface IProps {
  title: string;
  text: string;
  imgSrc: string;
}

export const EmptyTableMatches = ({ title, text, imgSrc }: IProps) => {
  return (
    <Content>
      <Title>{title}</Title>
      <ImgContainer><NextImage src={imgSrc} alt={title} /></ImgContainer>
      <Text>{text}</Text>
    </Content>
  );
};

const Content = styled.div`
  color: ${({ theme }) => theme.colors.white_black};
  width: 100%;
  font-family: "FCSM Text", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  grid-row-gap: 1.25vw;
  padding: 6.25vw 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-row-gap: 3.13vw;
    min-height: auto;
    padding: 10.43vw 0;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-row-gap: 4.27vw;
    padding: 10.67vw 0;
  }
`;

const Title = styled.h5`
  font-size: 2.08vw;
  font-weight: 700;
  margin: 0;
  font-family: "FCSM Text", sans-serif;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 5.22vw;
  }
`;

const Text = styled.p`
  margin: 0;
  font-size: 0.94vw;
  font-weight: 500;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
  }
`;

const ImgContainer = styled.div`
  width: 4.17vw;
  height: 4.17vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 10.43vw;
    height: 10.43vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 17.07vw;
    height: 17.07vw;
  }
`;
