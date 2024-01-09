import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { IAboutStadium } from "../../../api/dto/IAboutStadion";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { theme } from "../../../assets/theme/theme";
import { NextImage } from "../../../ui/nextImage/nextImage";

interface IProps {
  stadiumHistoryData?: IAboutStadium["stadiumHistory"];
}

export const StadiumHistory = (props: IProps) => {
  const { locale } = useRouter();
  return props.stadiumHistoryData ? (
    <MainContainer>
      <Container>
        <HistoryDates>
          <HistoryTitle>{getLocalValue(props?.stadiumHistoryData?.title, locale)}</HistoryTitle>

          <HistoryDescription>
            <div
              dangerouslySetInnerHTML={{
                __html: getLocalValue(props?.stadiumHistoryData?.firstParagraph1Column, locale),
              }}
            />

            <div
              dangerouslySetInnerHTML={{
                __html: getLocalValue(props?.stadiumHistoryData?.firstParagraph2Column, locale),
              }}
            />
          </HistoryDescription>
        </HistoryDates>

        {getLocalValue(props?.stadiumHistoryData?.firstParagraphImg, locale) ? (
          <StyledPhotoBlock>
            <NextImage
              src={getLocalValue(props?.stadiumHistoryData?.firstParagraphImg, locale)}
              alt="First Paragraph Img"
            />
          </StyledPhotoBlock>
        ) : null}

        <HistoryDatesBlock>
          <DescriptionBlock>
            <div
              dangerouslySetInnerHTML={{
                __html: getLocalValue(props?.stadiumHistoryData?.secondParagraph1Column, locale),
              }}
            />

            {getLocalValue(props?.stadiumHistoryData?.secondParagraphImg, locale) ? (
              <HistoryImageContainer>
                <NextImage
                  src={getLocalValue(props?.stadiumHistoryData?.secondParagraphImg, locale)}
                  alt="Second Paragraph Img"
                  objectFit="cover"
                />
              </HistoryImageContainer>
            ) : null}
          </DescriptionBlock>

          <DescriptionBlock>
            <Order
              dangerouslySetInnerHTML={{
                __html: getLocalValue(props?.stadiumHistoryData?.thirdParagraph2Column, locale),
              }}
            />

            {getLocalValue(props?.stadiumHistoryData?.thirdParagraphImg, locale) ? (
              <HistoryImageContainer>
                <NextImage
                  src={getLocalValue(props?.stadiumHistoryData?.thirdParagraphImg, locale)}
                  alt="Third Paragraph Img"
                  objectFit="cover"
                />
              </HistoryImageContainer>
            ) : null}
          </DescriptionBlock>
        </HistoryDatesBlock>
      </Container>
    </MainContainer>
  ) : null;
};

const MainContainer = styled.article`
  background: ${({ theme }) => theme.colors.blackLight_white1};
  color: ${({ theme }) => theme.colors.white_black};
  margin-left: auto;
  margin-right: auto;
  z-index: 9;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  margin-bottom: 4.17vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 10.43vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 10.67vw;
  }
`;

const Container = styled.section`
  width: 82.5vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 93.87vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 91.47vw;
  }
`;

const StyledPhotoBlock = styled.div`
  padding-bottom: 3.33vw;
  width: 100%;
  height: 31.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-bottom: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-bottom: 2.67vw;
    height: 59.19vw;
  }
`;

const HistoryDates = styled.div`
  display: grid;
  grid-template-rows: auto;
  padding-bottom: 3.33vw;
`;

const HistoryDatesBlock = styled.div`
  display: grid;
  grid-template-rows: auto;
  padding-bottom: 3.33vw;
  grid-row-gap: 4.17vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-row-gap: 0;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
  }
`;

const HistoryTitle = styled.div`
  font-size: 2.09vw;
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  padding: 3.33vw 0 2.14vw 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 5.22vw;
    padding: 5.22vw 0 3.13vw 0;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8.53vw;
    padding: 6.4vw 0;
  }
`;

const HistoryDescription = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  font-family: Roboto, sans-serif;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 1.25vw;
  font-size: 0.94vw;
  text-align: left;

  img {
    width: 100%;
    height: auto;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
    grid-template-columns: auto;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
  }
`;

const DescriptionBlock = styled.div<{ revert?: boolean }>`
  display: grid;
  justify-content: center;
  align-items: center;
  font-family: Roboto, sans-serif;
  grid-template-columns: auto auto;
  grid-column-gap: 7.29vw;
  font-size: 0.94vw;
  text-align: left;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
    grid-template-columns: auto;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
  }
`;

const HistoryImageContainer = styled.div`
  width: 34.9vw;
  height: 25.94vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 5.22vw 0;
    width: 100%;
    height: 59.19vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 6.4vw 0;
    height: 59.19vw;
  }
`;
const Order = styled.div`
  order: 1;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    order: unset;
  }
`;
