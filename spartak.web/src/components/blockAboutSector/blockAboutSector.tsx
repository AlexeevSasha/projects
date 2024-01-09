import { useRouter } from "next/router";
import React, { useContext } from "react";
import styled from "styled-components";
import { LocaleType } from "../../api/dto/LocaleType";
import { getLocalValue } from "../../assets/helpers/getLocalValue";
import { theme } from "../../assets/theme/theme";
import { ThemeContext } from "../../core/themeProvider";
import { NextImage } from "../../ui/nextImage/nextImage";

export interface IBlockAboutSector {
  title?: LocaleType;
  img?: LocaleType;
  description?: LocaleType;
  blockParams?: { label?: LocaleType; value?: LocaleType }[];
}

interface IProps {
  sectorInfo?: IBlockAboutSector;
  index: number;
  withoutGradient?: boolean;
}

export const BlockAboutSector = (props: IProps) => {
  const { locale = "ru" } = useRouter();
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <StyledContainer>
      <InfoImage withoutGradient={props.withoutGradient || !isDarkTheme} index={props.index}>
        <ImageContainer>
          <NextImage src={getLocalValue(props.sectorInfo?.img, locale) ?? ""} objectFit="fill" />
        </ImageContainer>
      </InfoImage>

      <InfoSection index={props.index}>
        {getLocalValue(props.sectorInfo?.title, locale) && getLocalValue(props.sectorInfo?.description, locale) ? (
          <TitleDescription>
            <InfoTitle>{getLocalValue(props.sectorInfo?.title, locale)}</InfoTitle>
            <InfoDescription
              dangerouslySetInnerHTML={{
                __html: getLocalValue(props.sectorInfo?.description, locale),
              }}
            />
          </TitleDescription>
        ) : null}

        <InfoSizeContainer columnCount={props.sectorInfo?.blockParams?.length || 0}>
          {props.sectorInfo?.blockParams?.map((el, index) =>
            el.value ? (
              <InfoSizeBlock key={`k${index + 1}`}>
                <InfoSizeTitle>{getLocalValue(el.label, locale)}</InfoSizeTitle>
                <InfoSize>{getLocalValue(el.value, locale)}</InfoSize>
              </InfoSizeBlock>
            ) : null
          )}
        </InfoSizeContainer>
      </InfoSection>
    </StyledContainer>
  );
};

const ImageContainer = styled.div`
  display: block;
  height: 100%;
`;
const StyledContainer = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100%;

  p {
    margin: 0;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    flex-direction: column;
  }
`;

const InfoImage = styled.div<{ index: number; withoutGradient?: boolean }>`
  position: relative;
  width: 34.9vw;
  order: ${(props) => (props.index % 2 === 0 || 0 ? "1" : "2")};

  :before {
    content: " ";
    background: ${(props) =>
      !props.withoutGradient &&
      `linear-gradient(
      89.11deg,
      rgba(13, 17, 22, 0) 0.77%,
      #0d1116 95.31%
    )`};
    transform: ${(props) => (props.index % 2 === 0 || 0 ? "" : "matrix(-1, 0, 0, 1, -1, 0)")};
    top: -1px;
    bottom: -1px;
    left: -1px;
    right: -1px;
    position: absolute;
    z-index: 1;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      background: linear-gradient(175.86deg, rgba(13, 17, 22, 0) 0%, #0d1116 93.24%);
    }
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    background-position-y: initial;
    width: 100%;
    height: 36.9vw;
    order: 1;
    margin-bottom: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 4.27vw;
    height: 36.27vw;
  }
`;

const InfoSection = styled.div<{ index: number }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 40.63vw;
  order: ${(props) => (props.index % 2 === 0 || 0 ? "2" : "1")};
  gap: 2.19vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;
    order: 2;
    gap: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    gap: 4.27vw;
  }
`;

const TitleDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    gap: 2.09vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    gap: 4.27vw;
  }
`;

const InfoTitle = styled.span`
  display: block;
  color: ${({ theme }) => theme.colors.white_black};
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  font-size: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
  }
`;

const InfoDescription = styled.div`
  display: block;
  color: ${({ theme }) => theme.colors.grayLight_grayDark};
  font-family: "FCSM Text", sans-serif;
  font-size: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
  }
`;

const InfoSizeContainer = styled.div<{ columnCount: number }>`
  display: grid;
  grid-template-columns: repeat(${({ columnCount }) => (columnCount <= 2 ? 2 : columnCount)}, 1fr);
  grid-column-gap: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-column-gap: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-column-gap: 4.27vw;
    grid-template-columns: 1fr 1fr;
  }
`;

const InfoSizeBlock = styled.p`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.white_black};
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  border: 0.05vw solid ${({ theme }) => theme.colors.grayDark_red};
  background: ${({ theme }) => theme.colors.none_red};
  width: 100%;
  box-sizing: border-box;
  padding: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 3.73vw;
  }
`;

const InfoSizeTitle = styled.span`
  text-transform: uppercase;
  color: ${theme.colors.white};
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  font-size: 0.83vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.83vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.2vw;
  }
`;

const InfoSize = styled.span`
  color: ${({ theme }) => theme.colors.red_white};
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  font-size: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
  }
`;
