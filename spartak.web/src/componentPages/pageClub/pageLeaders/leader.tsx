import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { ILeadership } from "../../../api/dto/ILeadership";
import { formatDate } from "../../../assets/constants/date";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { theme } from "../../../assets/theme/theme";
import { ContainerContent } from "../../../components/containers/containerContent";
import { NoData } from "../../../components/noData/noData";
import { HoverButton } from "../../../components/personButton";
import { PersonCard } from "../../../components/personCard";
import { SwiperWrapper } from "../../../components/reactSwiper/swiperWrapper";
import { SwipeWithControl } from "../../../components/reactSwiper/swipeWithControl";
import { LoadingScreen } from "../../../ui/LoadingScreen ";
import { NextImage } from "../../../ui/nextImage/nextImage";
import { CoachName } from "../../pageAcademy/coaches/coachName";

export type LeaderPageProps = {
  leader: ILeadership | null;
  otherLeaders?: ILeadership[];
  section: "site" | "academy";
};

export const Leader = ({ leader, otherLeaders, section }: LeaderPageProps) => {
  const { locale = "ru", isFallback } = useRouter();

  if (isFallback) return <LoadingScreen />;
  if (!leader) return <NoData />;

  return (
    <>
      <Container>
        <div>
          <CoachName name={leader.FullName} />

          <InfoTablet>
            <InfoBlock>
              <InfoTitle>{lang[locale].academy.coachPosition}</InfoTitle>
              <InfoData>{getLocalValue(leader.Position, locale)}</InfoData>
            </InfoBlock>

            <InfoBlock>
              <InfoTitle>{lang[locale].academy.coachBirthDay}</InfoTitle>
              <InfoData>{formatDate(leader.Birthday, "dd mmmm yyyy", locale)}</InfoData>
            </InfoBlock>
          </InfoTablet>
        </div>

        <ImageBlock>{leader.ImageUrl && <NextImage src={leader.ImageUrl} />}</ImageBlock>
      </Container>

      <Biography>
        <BiographyContent>
          <BiographyTitle>{lang[locale].academy[section === "site" ? "biography" : "biographyA"]}</BiographyTitle>

          <BiographyText dangerouslySetInnerHTML={{ __html: getLocalValue(leader?.Biography, locale) }} />
        </BiographyContent>
      </Biography>

      {!!otherLeaders?.length && (
        <SwiperContainer>
          <SwipeWithControl<ILeadership>
            className="otherCoachesSwiper"
            title={<SwiperTitle>{lang[locale].academy.otherLeaders}</SwiperTitle>}
            itemsList={otherLeaders}
            swipeProps={{ scrollbar: true }}
          >
            {(value) => (
              <HoverButton url={`${section === "site" ? "/leaders" : "/academy/employees"}/${value.Id}`}>
                <PersonCard data={value} locationAcademy showBirthday showPosition />
              </HoverButton>
            )}
          </SwipeWithControl>
        </SwiperContainer>
      )}
    </>
  );
};

const Container = styled(ContainerContent)`
  color: ${({ theme }) => theme.colors.white_black};
  margin-top: 2.08vw;
  align-items: flex-start;
  & > div:nth-child(2) {
    margin: 0 auto;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 3.13vw;
    flex-direction: column-reverse;

    & > div:nth-child(2) {
      height: 87.48vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: 4.26vw;
  }

  & > div {
    width: 33.64vw;
    // height: 41.45vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      height: auto;
      width: 100%;
    }
  }
`;

const InfoTablet = styled.div`
  box-sizing: border-box;
  border: 0.05vw solid ${({ theme }) => theme.colors.white_gray1};
  margin-top: 6.77vw;

  > :first-child {
    background-color: ${({ theme }) => theme.colors.blackRed_whiteGray};
    border-bottom: 0.05vw solid ${({ theme }) => theme.colors.white_gray1};
  }
`;

const InfoBlock = styled.p`
  background: ${({ theme }) => theme.colors.black_white};
  margin: 0;
  display: grid;
  width: 100%;
  box-sizing: border-box;
  padding: 1.67vw 1.25vw;
  gap: 0.42vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 3.13vw 4.17vw;
    gap: 1.04vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 2.13vw 4.27vw;
    gap: 2.13vw;
  }
`;

const InfoTitle = styled.span`
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.white_black};
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

const InfoData = styled.span`
  color: ${theme.colors.red};
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
const ImageBlock = styled.div`
  height: 41.45vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: auto;
    width: 100%;
  }
`;

const Biography = styled.div`
  background: ${({ theme }) => theme.colors.blackLight_whiteGray};
  padding-bottom: 7.1875vw;
  color: ${({ theme }) => theme.colors.white_black};
  margin: 3.125vw 0 5.2vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-bottom: 5.215vw;
    margin: 5.215vw 0;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-bottom: 6.4vw;
    margin: 10.66vw 0;
  }
`;

const BiographyContent = styled(ContainerContent)`
  display: block;
`;

const BiographyTitle = styled.h2`
  margin: 2.08vw 0;
  font-size: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 5.215vw 0;
    font-size: 5.215vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 6.4vw 0;
    font-size: 8.53vw;
  }
`;

const BiographyText = styled.div`
  font-size: 0.9375vw;
  line-height: 1.46vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.08vw;
    line-height: 2.86vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.26vw;
    line-height: 5.86vw;
  }
`;

const SwiperTitle = styled.span`
  font-size: 2.08vw;
  line-height: 1em;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 5.215vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8vw;
  }
`;

const SwiperContainer = styled(SwiperWrapper)`
  margin-bottom: 2.9vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 10.43vw;

    & .swiper {
      width: 100%;
      margin-right: unset;
      padding-bottom: 3vw;
    }

    & .swiper .swiper-slide {
      width: 46vw;
      margin-right: 2.09vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 21vw;
  }
`;
