import React, { Fragment } from "react";
import styled from "styled-components";
import { ComicEntity, ComicSessonEntity } from "../../api/dto/kids";
import { theme } from "../../assets/theme/theme";
import { ContainerContent } from "../../components/containers/containerContent";
import { NextImage } from "../../ui/nextImage/nextImage";
import { ComicBanner } from "./comicBanner";
import { SeasonSwiper } from "./seasonSwiper";

export type ComicsProps = {
  seasons: ComicSessonEntity[];
  comics: Record<string, ComicEntity[]>;
  special: ComicEntity[];
};

export const Comics = ({ seasons, comics, ...props }: ComicsProps) => {
  const [bannerData, ...special] = props.special;

  return (
    <Container>
      {bannerData && <ComicBanner {...bannerData} />}

      {seasons.reduce((elems: JSX.Element[], season, i) => {
        if (comics[season.Id]?.length) {
          elems.push(
            <Fragment key={season.Id}>
              <SeasonSwiper comics={comics[season.Id].slice(0, 6)} season={season} />

              {!i && special.length ? (
                <SpecEditionWrapper>
                  <ImgWrapper>
                    <NextImage src="/images/kids/specEditionBg_v1.0.0.png" objectFit="cover" />
                  </ImgWrapper>

                  <SeasonSwiper comics={special} />
                </SpecEditionWrapper>
              ) : null}
            </Fragment>
          );
        }

        return elems;
      }, [])}
    </Container>
  );
};

const Container = styled(ContainerContent)`
  display: block;
  color: ${theme.colors.white};
  font-family: "FCSM Text", sans-serif;
  margin-bottom: 9.27vw;

  & > * {
    margin-top: 6.25vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    & > * {
      margin-top: 10.43vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    & > * {
      margin-top: 10.66vw;
    }
  }
`;

const SpecEditionWrapper = styled.div`
  position: relative;
  padding: 4.17vw 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 5.215vw 0;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 8.53vw 0;
  }
`;

const ImgWrapper = styled.div`
  right: -8.671875vw;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    right: 0;
  }
`;
