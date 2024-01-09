import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { theme } from "../../../assets/theme/theme";
import { ContainerContent } from "../../../components/containers/containerContent";
import { ContainerScroll } from "../../../components/containers/containerHorizontalScroll";
import { DescriptionFromCMS } from "../../../ui/descriptionFromCMS/descriptionFromCMS";
import { HorizontalTimeline } from "./horizontalTimeLine";
import { ITimeline } from "../../../api/dto/IClubResults";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { useRouter } from "next/router";
import { NextImage } from "../../../ui/nextImage/nextImage";

interface IProps {
  timelineData?: ITimeline[];
}

export const HistoryEvents = (props: IProps) => {
  const { locale } = useRouter();
  const [active, setActive] = useState(0);
  const [linePosition, setLinePosition] = useState(0);
  const [leftIndex, setLeftIndex] = useState(0);

  const timeline = useMemo(() => {
    return (props.timelineData || []).sort(
      (a, b) => +getLocalValue(a?.eventDate, locale) - +getLocalValue(b?.eventDate, locale)
    );
  }, [props.timelineData]);

  const arrayOfYears = useMemo(() => timeline.map((elem) => getLocalValue(elem?.eventDate, locale)), [timeline]);

  const onAddActive = useCallback(
    (index: number) => {
      setActive(index);
    },
    [active]
  );

  const onRight = useCallback(() => {
    if (active <= (arrayOfYears?.length || 0) - 2) {
      setActive(active + 1);
      if (active > 9 && active - leftIndex === 10) {
        setLinePosition(linePosition - 1);
        setLeftIndex(leftIndex + 1);
      }
    }
  }, [active, linePosition]);

  const onLeft = useCallback(() => {
    if (active > 0) {
      setActive(active - 1);
      if (active === leftIndex) {
        setLinePosition(linePosition + 1);
        setLeftIndex(leftIndex - 1);
      }
    }
  }, [linePosition, active, leftIndex]);

  const eventData = useMemo(
    () => (
      <>
        <HistoryEventYear>{arrayOfYears?.[active]}</HistoryEventYear>
        <DescriptionPhotoBlock>
          <PhotoWithPaddingContainer>
            <NextImage src={getLocalValue(timeline[active]?.eventPhoto, locale)} />
          </PhotoWithPaddingContainer>
          <TitleDescriptionBlock>
            <DescriptionFromCMS
              dangerouslySetInnerHTML={{
                __html: getLocalValue(timeline[active]?.eventDescription, locale),
              }}
            />
          </TitleDescriptionBlock>
        </DescriptionPhotoBlock>
      </>
    ),
    [active]
  );

  return props.timelineData ? (
    <>
      <ScrollYearsLine>
        <HorizontalTimeline
          active={active}
          onRight={onRight}
          onLeft={onLeft}
          arrayOfYears={arrayOfYears}
          onAddActive={onAddActive}
          linePosition={linePosition}
        />
      </ScrollYearsLine>
      <Container>{eventData}</Container>
    </>
  ) : null;
};

const Container = styled(ContainerContent)`
  flex-direction: column;
  justify-content: center;
`;

const HistoryEventYear = styled.h1`
  margin: 0;
  box-sizing: border-box;
  width: inherit;
  border: ${(props) => `0.05vw solid ${props.theme.colors.grayDark_red}`};
  background: ${(props) => props.theme.colors.none_red};
  font-size: 3.75vw;
  letter-spacing: -0.02em;
  color: ${(props) => props.theme.colors.red_white};
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 1.25vw 3.33vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    border: 0.13vw solid ${theme.colors.grayDark};
    padding: 3.13vw;
    font-size: 6.78vw;
    letter-spacing: normal;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    border: 0.27vw solid ${theme.colors.grayDark};
    font-size: 8.53vw;
    padding: 4.27vw;
  }
`;

const ScrollYearsLine = styled(ContainerScroll)`
  &::-webkit-scrollbar-track-piece {
    background-color: ${({ theme }) => theme.colors.blackLight_whiteGray};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.grayDark_gray1};
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 5.22vw;
    ::-webkit-scrollbar {
      height: 1.3vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 6.4vw;
    width: 100vw;
    ::-webkit-scrollbar {
      height: 1.07vw;
    }
  }
`;

const DescriptionPhotoBlock = styled.section`
  box-sizing: border-box;
  border: 0.05vw solid ${theme.colors.grayDark};
  border-top: 0;
  display: flex;
  width: inherit;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    flex-direction: column;
    border-width: 0 0.13vw 0.13vw 0.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    flex-direction: column;
    border-width: 0 0.27vw 0.27vw 0.27vw;
  }
`;

const PhotoWithPaddingContainer = styled.div`
  box-sizing: border-box;
  padding: 3.33vw;
  display: block;
  width: 50%;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: inherit;
    height: 55.02vw;
    padding: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 51.2vw;
    padding: 4.27vw;
  }
`;

const TitleDescriptionBlock = styled.div`
  box-sizing: border-box;
  width: 50%;
  margin: 0;
  padding: 3.33vw;
  border-left: 0.05vw solid ${theme.colors.grayDark};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 3.13vw;
    width: inherit;
    border-top: 0.13vw solid ${theme.colors.grayDark};
    border-left: 0;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 4.27vw;
    width: inherit;
    border-top: 0.27vw solid ${theme.colors.grayDark};
  }
`;
