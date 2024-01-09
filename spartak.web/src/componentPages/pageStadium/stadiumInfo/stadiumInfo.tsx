import React from "react";
import { ContainerContent } from "../../../components/containers/containerContent";
import styled from "styled-components";
import { theme } from "../../../assets/theme/theme";
import { useRouter } from "next/router";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { IAboutStadium } from "../../../api/dto/IAboutStadion";
import { NextImage } from "../../../ui/nextImage/nextImage";

interface IProps {
  stadiumInfoData?: IAboutStadium["characteristic"];
}

export const StadiumInfo = (props: IProps) => {
  const { locale } = useRouter();

  return props.stadiumInfoData ? (
    <ContainerContent>
      <Container>
        <PhotoAndDescription>
          {getLocalValue(props?.stadiumInfoData?.img, locale) ? (
            <PhotoBlock>
              <StadiumPhotoContainer>
                <NextImage src={getLocalValue(props?.stadiumInfoData?.img, locale)} />
              </StadiumPhotoContainer>
            </PhotoBlock>
          ) : null}

          {props.stadiumInfoData?.list?.[0] != null && props.stadiumInfoData.list.length > 0 ? (
            <InfoTableBlock>
              {props?.stadiumInfoData?.list?.map((elem, index: number) => (
                <React.Fragment key={index}>
                  {getLocalValue(elem?.name, locale) || getLocalValue(elem?.description, locale) ? (
                    <InfoTableRow>
                      <Title>{getLocalValue(elem?.name, locale)}</Title>

                      <Info>{getLocalValue(elem?.description, locale)}</Info>
                    </InfoTableRow>
                  ) : null}
                </React.Fragment>
              ))}
            </InfoTableBlock>
          ) : null}
        </PhotoAndDescription>

        <DescriptionBlock>
          <div
            dangerouslySetInnerHTML={{
              __html: getLocalValue(props?.stadiumInfoData?.columnText1, locale),
            }}
          />

          <div
            dangerouslySetInnerHTML={{
              __html: getLocalValue(props?.stadiumInfoData?.columnText2, locale),
            }}
          />
        </DescriptionBlock>
      </Container>
    </ContainerContent>
  ) : null;
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PhotoAndDescription = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
  padding: 6.25vw 0 4.17vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    padding: 0 0 6.22vw 0;
  }
`;
const PhotoBlock = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  position: relative;
  height: 100%;
`;

const StadiumPhotoContainer = styled.div`
  width: 100%;
  height: 100%;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 5.22vw 0;
    height: calc(100vw - 31vw);
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 6.4vw 0 2vw 0;
    height: calc(100vw - 24vw);
  }
`;

const InfoTableBlock = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
`;

const InfoTableRow = styled.div`
  padding: 2.08vw 1.25vw;
  border: 1px solid ${theme.colors.grayDark};
  width: 100%;
  margin-top: -1px;
  box-sizing: border-box;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 5.22vw 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 4.27vw;
  }
`;

const Title = styled.p`
  margin: 0;
  padding-bottom: 0.42vw;
  font-size: 0.83vw;
  color: ${({ theme }) => theme.colors.white_black};
  text-transform: uppercase;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.2vw;
  }
`;
const Info = styled.p`
  margin: 0;
  font-size: 2.08vw;
  color: ${theme.colors.red};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 5.22vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
  }
`;

const DescriptionBlock = styled.div`
  p {
    margin: 0;
  }
  margin: 1em 0;
  display: flex;
  gap: 1.25vw;
  font-size: 0.94vw;
  padding-bottom: 5.21vw;
  line-height: 1.46vw;
  font-family: "FCSM Text", sans-serif;
  color: ${({ theme }) => theme.colors.white_black};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    justify-content: center;
    grid-template-columns: auto;
    font-size: 2.35vw;
    gap: 3.13vw;
    line-height: 3.65vw;
    padding-bottom: 5.22vw;
    flex-direction: column;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    line-height: 5.87vw;
    font-size: 4.27vw;
    gap: 4.27vw;
    padding-bottom: 10.67vw;
  }
`;
