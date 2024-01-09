import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { lang } from "../../../public/locales/lang";
import { ComicEntity, ComicSessonEntity } from "../../api/dto/kids";
import { getLocalValue } from "../../assets/helpers/getLocalValue";
import { theme } from "../../assets/theme/theme";
import { SeeAll } from "../../components/reactSwiper/seeAll";
import { SwiperWrapper } from "../../components/reactSwiper/swiperWrapper";
import { SwipeWithControl } from "../../components/reactSwiper/swipeWithControl";
import { useWindowSize } from "../../core/hooks/UseWindowSize";
import { ComicCard } from "./comicCard";

type Props = {
  comics: ComicEntity[];
  season?: ComicSessonEntity;
};

export const SeasonSwiper = ({ comics, season }: Props) => {
  const { locale = "ru" } = useRouter();
  const isSpecial = !season;
  const Container = isSpecial ? SpecialContainer : SeasonContainer;
  const { width = 0 } = useWindowSize(true);

  return (
    <Container showSeeAll={comics.length > (width < 1200 ? 2 : 4)}>
      <SwipeWithControl<ComicEntity>
        className={"comic-swiper-" + (season?.Id || "")}
        title={isSpecial ? lang[locale].kids.specEdition : getLocalValue(season.ComicSeasonName, locale)}
        itemsList={comics}
        hideControls={comics.length < 4}
        swipeProps={{ scrollbar: comics.length > 2 }}
        renderSeeAll={
          isSpecial || comics.length < 4 ? undefined : (
            <Link prefetch={false} href={`/kids/comics/${season.Id}`} passHref>
              <ComicsSeeAll>{lang[locale].kids.allEditionOfSeason}</ComicsSeeAll>
            </Link>
          )
        }
      >
        {(value) => <ComicCard comic={value} isSpecial={isSpecial} />}
      </SwipeWithControl>
    </Container>
  );
};

const SeasonContainer = styled(SwiperWrapper)<{ showSeeAll?: boolean }>`
  & > div:first-child {
    padding-bottom: ${({ showSeeAll }) => showSeeAll && "3.02vw"};
  }

  & .swiper-controls {
    margin-bottom: 2.08vw;
  }

  & .swiper-controls > div:first-child {
    font-size: 2.08vw;
  }

  & .swiper {
    width: 100%;
  }

  & .swiper .swiper-slide {
    width: max-content;
    margin-right: 1.25vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    & > div:first-child {
      padding-bottom: 0;
    }

    & .swiper-controls {
      margin-bottom: 5.215vw;
    }

    & .swiper {
      padding-bottom: 4vw;
    }

    & .swiper-controls > div:first-child {
      font-size: 5.215vw;
    }

    & .swiper .swiper-slide {
      margin-right: 3.13vw;
    }

    & .swiper .swiper-scrollbar {
      background: ${({ theme }) => theme.colors.blackLight_whiteGray};

      .swiper-scrollbar-drag {
        background: ${({ theme }) => theme.colors.grayDark_gray1};
      }
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-bottom: ${({ showSeeAll }) => (showSeeAll ? "10.66vw" : "0")};

    & .swiper-controls {
      margin-bottom: 8.53vw;
    }

    & .swiper.comic-swiper {
      padding-bottom: 4vw;
    }

    & .swiper-controls > div:first-child {
      font-size: 8.53vw;
    }

    & .swiper .swiper-slide {
      margin-right: 3.2vw;
    }
  }
`;

const SpecialContainer = styled(SeasonContainer)`
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-bottom: 0;
  }
`;

const ComicsSeeAll = styled(SeeAll)`
  font-weight: 600;
  font-size: 0.73vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.82vw;
    top: unset;
    bottom: -6vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
    bottom: -10vw;
  }
`;
