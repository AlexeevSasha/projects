import React from "react";
import styled from "styled-components";
import { ContainerContent } from "../../../components/containers/containerContent";
import { theme } from "../../../assets/theme/theme";
import { IconRedPoint } from "../../../assets/icon/iconRedPoint";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { useRouter } from "next/router";
import { IStadiumUsefulInfo } from "../../../api/dto/IStadiumUsefulInfo";

interface IProps {
  usefulInfo?: IStadiumUsefulInfo;
}

export const UsefulInfoComponent = (props: IProps) => {
  const { locale = "ru" } = useRouter();
  return (
    <StyledContainer>
      <TerritoryGroups>
        <BlockTitle>{getLocalValue(props.usefulInfo?.entranceInfo?.title, locale)}</BlockTitle>
        <div>
          <PointsDescription>{getLocalValue(props.usefulInfo?.entranceInfo?.additionalInfo, locale)}</PointsDescription>
          {props.usefulInfo?.entranceNames ? (
            <PointBlock>
              {props.usefulInfo?.entranceNames?.map((item, index) => (
                <Point key={index}>
                  <IconRedPoint />
                  {getLocalValue(item, locale)}
                </Point>
              ))}
            </PointBlock>
          ) : null}
        </div>
      </TerritoryGroups>

      {props.usefulInfo?.usefulInfoBlocks?.length
        ? props.usefulInfo?.usefulInfoBlocks?.map((item, index) => (
            <PaddingBlock key={index}>
              <BlockTitle
                dangerouslySetInnerHTML={{
                  __html: getLocalValue(item.title, locale),
                }}
              />
              <Description
                dangerouslySetInnerHTML={{
                  __html: getLocalValue(item.description, locale),
                }}
              />
            </PaddingBlock>
          ))
        : null}
    </StyledContainer>
  );
};

const StyledContainer = styled(ContainerContent)`
  align-items: start;
  color: ${({ theme }) => theme.colors.white_black};
  padding: 4.17vw 0 5.21vw;
  font-family: "FCSM Text", sans-serif;
  flex-direction: column;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 5.22vw 0 10.43vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 10.67vw 0 21.33vw;
  }
`;

const TerritoryGroups = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const BlockTitle = styled.h2`
  margin: 0;
  padding-bottom: 1.25vw;
  font-size: 2.08vw;
  font-weight: bold;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-bottom: 3.13vw;
    font-size: 4.17vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-bottom: 4.27vw;
    font-size: 8.53vw;
  }
`;
const Description = styled.div<{ roboto?: boolean }>`
  width: 66%;
  display: block;
  flex-direction: column;
  font-size: 0.94vw;
  color: ${({ theme }) => theme.colors.grayLight_grayDark};
  font-family: ${(props) => (props.roboto ? "Roboto" : "FCSM Text")}, sans-serif;

  img {
    width: 61.56vw;
    height: 42.5vw;
    padding-top: 1.25vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      width: 93.87vw;
      height: 64.93vw;
      padding-top: 3.13vw;
    }
    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      width: 91.47vw;
      height: 63.2vw;
      padding-top: 6.4vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
    width: 100%;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
  }
`;
const PointsDescription = styled.div`
  padding-bottom: 1.25vw;
  font-size: 0.94vw;
  color: ${({ theme }) => theme.colors.grayLight_grayDark};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
    padding-bottom: 2.35vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    padding-bottom: 6.4vw;
  }
`;
const PointBlock = styled(Description)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  column-gap: 1.25vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    column-gap: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: 1fr;
    row-gap: 6.4vw;
  }
`;
const Point = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 0.6vw;
  color: ${({ theme }) => theme.colors.white_black};
  background: ${({ theme }) => theme.colors.blackLight_white1};
  padding: 0 16.51vw 0 1.25vw;
  font-size: 1.25vw;
  font-weight: 500;

  svg {
    padding: 1.25vw 0;
    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      padding: 4.17vw 0;
    }
    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      padding: 6.4vw 0;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
    padding: 0 3.13vw;
    gap: 1.56vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.8vw;
    padding: 0 6.4vw;
    gap: 3.2vw;
  }
`;
const PaddingBlock = styled.div`
  padding-top: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-top: 5.22vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-top: 10.67vw;
  }
`;
