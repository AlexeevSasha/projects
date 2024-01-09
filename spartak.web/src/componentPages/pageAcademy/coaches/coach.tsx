import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { ICoach } from "../../../api/dto/ICoach";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { theme } from "../../../assets/theme/theme";
import { ContainerContent } from "../../../components/containers/containerContent";
import { HoverButton } from "../../../components/personButton";
import { PersonCard } from "../../../components/personCard";
import { SwiperWrapper } from "../../../components/reactSwiper/swiperWrapper";
import { SwipeWithControl } from "../../../components/reactSwiper/swipeWithControl";
import { CoachView } from "./coachView";

export type CoachPageProps = {
  coach: ICoach | null;
  otherCoaches?: ICoach[];
  section: "site" | "academy";
};

export const Coach = ({ coach, otherCoaches, section }: CoachPageProps) => {
  const { locale = "ru" } = useRouter();

  return (
    <>
      {coach && <CoachView coach={coach} />}

      <Biography>
        <BiographyContent>
          <BiographyTitle>{lang[locale].academy[section === "site" ? "biography" : "biographyA"]}</BiographyTitle>

          <BiographyText dangerouslySetInnerHTML={{ __html: getLocalValue(coach?.Biography, locale) }} />
        </BiographyContent>
      </Biography>

      {!!otherCoaches?.length && (
        <SwiperContainer>
          <SwipeWithControl<ICoach>
            className="otherCoachesSwiper"
            title={<SwiperTitle>{lang[locale].academy.otherCoaches}</SwiperTitle>}
            itemsList={otherCoaches}
            swipeProps={{ scrollbar: true }}
          >
            {(value) => (
              <HoverButton url={`${section === "site" ? "/coaches" : "/academy/employees"}/${value.Id}`}>
                <PersonCard data={value} locationAcademy showBirthday showPosition />
              </HoverButton>
            )}
          </SwipeWithControl>
        </SwiperContainer>
      )}
    </>
  );
};

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
