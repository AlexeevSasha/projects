import React from "react";
import styled from "styled-components";
import { theme } from "../../../assets/theme/theme";
import { NextImage } from "../../../ui/nextImage/nextImage";

interface Props {
  text: string;
  title?: string;
  srcImg: string;
}
export const EmptyScreenMatches = ({ text, title, srcImg }: Props) => {
  return (
    <Content>
      <Title>{title}</Title>
      <ImgContainer withoutTitle={!title}>
        <NextImage src={srcImg} alt={title} />
      </ImgContainer>
      {title ? (
        <Text dangerouslySetInnerHTML={{ __html: text }} />
      ) : (
        <TextWithoutTitle dangerouslySetInnerHTML={{ __html: text }} />
      )}
    </Content>
  );
};

const Content = styled.div`
  color: ${({ theme }) => theme.colors.white_black};
  width: 100%;
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  display: flex;
  grid-column: span 2;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  grid-row-gap: 1.25vw;
  padding: 6.25vw 0;
  box-sizing: border-box;
  text-align: center;

  a {
    text-decoration: none;
    color: ${theme.colors.red};
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-row-gap: 3.13vw;
    min-height: auto;
    padding: 10.43vw 4vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-row-gap: 4.27vw;
    padding: 10.67vw 4vw;
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
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8.53vw;
  }
`;

const Text = styled.span`
  font-size: 0.94vw;
  font-weight: 500;
  line-height: 1.46vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
    line-height: 3.65vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    line-height: 5.87vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
  }
`;

const TextWithoutTitle = styled.span`
  font-size: 1.67vw;
  font-weight: 700;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-weight: 500;
    letter-spacing: 0.1px;
  }
`;

const ImgContainer = styled.div<{ withoutTitle: boolean }>`
  width: ${({ withoutTitle }) => (withoutTitle ? "5.21vw" : "4.17vw")};
  height: ${({ withoutTitle }) => (withoutTitle ? "5.21vw" : "4.17vw")};
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: ${({ withoutTitle }) => (withoutTitle ? "13.04vw" : "10.43vw")};
    height: ${({ withoutTitle }) => (withoutTitle ? "13.04vw" : "10.43vw")};
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: ${({ withoutTitle }) => (withoutTitle ? "13.33vw" : "17.07vw")};
    height: ${({ withoutTitle }) => (withoutTitle ? "13.33vw" : "17.07vw")};
  }
`;
