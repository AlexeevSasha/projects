import React from "react";
import styled from "styled-components";
import { theme } from "../../../../assets/theme/theme";

interface IProps {
  title: string;
  text: string;
}

export const NewsArticle = (props: IProps) => {
  return (
    <StyledContainer>
      <ArticleTitle
        dangerouslySetInnerHTML={{
          __html: props.title,
        }}
      />
      <TextBlock dangerouslySetInnerHTML={{ __html: props.text }} />
    </StyledContainer>
  );
};

const StyledContainer = styled.section`
  word-wrap: break-word;
  width: 100%;
  padding: 2.08vw;
  background-color: ${({ theme }) => theme.colors.blackLight_whiteGray};

  box-sizing: border-box;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 3.13vw;
    width: 100vw;
    margin-left: -3.2vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-left: -4.5vw;
    padding: 6.4vw;
  }
`;

const ArticleTitle = styled.h2`
  text-transform: uppercase;
  font-family: "FCSM Text", sans-serif;
  font-weight: 500;
  font-size: 0.83vw;
  margin: 0;
  color: ${({ theme }) => theme.colors.gray_blackLight};
  padding-bottom: 0.84vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
    padding-bottom: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    padding-bottom: 4.27vw;
  }
`;

const TextBlock = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.colors.white_black};

  img {
    max-width: 100%;
  }

  iframe {
    width: 100%;
    height: 28vw;
  }

  a {
    color: ${theme.colors.red};
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    iframe {
      height: 53vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    iframe {
      height: 48vw;
    }
  }
`;
