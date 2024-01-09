import { useMemo } from "react";
import styled from "styled-components";
import { theme } from "../../../assets/theme/theme";
import { ContainerContent } from "../../../components/containers/containerContent";
import { DescriptionFromCMS } from "../../../ui/descriptionFromCMS/descriptionFromCMS";
import { TitleFromCMS } from "../../../ui/titleFromCMS/titleFromCMS";
import { BlockPhotoWithDescription } from "./componentHistoryEmblem/blockPhotoWithDescription";
import { CenturySparBlock } from "./componentHistoryEmblem/centurySparBlock";
import { IClubHistory } from "../../../api/dto/IClubHistory";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { useRouter } from "next/router";
import { NextImage } from "../../../ui/nextImage/nextImage";

interface IProps {
  historyData?: IClubHistory;
}

export const HistoryEmblem = (props: IProps) => {
  const { locale } = useRouter();

  const emblems = useMemo(
    () =>
      props.historyData?.emblemHistory?.emblems?.map((years, i) => (
        <EmblemBlock key={i}>
          <EmblemImg>{years.photoOfEmblem && <NextImage src={years.photoOfEmblem} alt={`emblem${i + 1}`} />}</EmblemImg>
          <EmblemLabel>{getLocalValue(years.periodOfUseEmblem, locale)}</EmblemLabel>
        </EmblemBlock>
      )),
    [props.historyData]
  );

  return (
    <Container>
      <BlockPhotoWithDescription
        positionPhoto={"right"}
        photo={props.historyData?.historyOfCreation?.img}
        description={getLocalValue(props.historyData?.historyOfCreation?.description, locale)}
        title={getLocalValue(props.historyData?.historyOfCreation?.title, locale)}
      />

      <SectionHistoryEmblem>
        <TitleFromCMS>{getLocalValue(props.historyData?.emblemHistory?.title, locale)}</TitleFromCMS>
        <EmblemHistoryDescription>
          <DescriptionFromCMS>
            {getLocalValue(props.historyData?.emblemHistory?.firstColumn, locale)}
          </DescriptionFromCMS>
          <DescriptionFromCMS>
            {getLocalValue(props.historyData?.emblemHistory?.secondColumn, locale)}
          </DescriptionFromCMS>
        </EmblemHistoryDescription>
      </SectionHistoryEmblem>

      <EmblemsBlock>{emblems}</EmblemsBlock>

      <CenturySparBlock century={props.historyData?.anniversaryOfCreation} />
    </Container>
  );
};

const Container = styled(ContainerContent)`
  margin-top: 4.17vw;
  margin-bottom: 6.09vw;
  flex-direction: column;
  gap: 4.17vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    gap: 10.43vw;
    margin-top: 10.43vw;
    margin-bottom: 14.6vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    gap: 10.67vw;
    margin-top: 10.67vw;
    margin-bottom: 16.53vw;
  }
`;

const SectionHistoryEmblem = styled.section`
  width: 100%;
`;

const EmblemHistoryDescription = styled.p`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1.25vw;
  margin: 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 1fr;
  }
`;

const EmblemsBlock = styled.section`
  width: inherit;
  display: grid;
  grid-template-columns: repeat(6, auto);

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: repeat(3, auto);
    grid-row-gap: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: repeat(2, auto);
    grid-row-gap: 4.27vw;
  }
`;

const EmblemBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.83vw;
`;

const EmblemImg = styled.div`
  width: 12.71vw;
  height: 10.94vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 29.2vw;
    height: 29.20vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 44vw;
    height: 44.53vw;
  }
`;

const EmblemLabel = styled.label`
  font-family: "FCSM Text", sans-serif;
  color: ${({ theme }) => theme.colors.gray_grayDark1};
  font-size: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.8vw;
  }
`;
