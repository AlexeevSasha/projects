import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import seodata from "../../../public/seo/seoData.json";
import { IMatchDto, MatchEvent } from "../../../src/api/dto/IMatchDto";
import { IMediaShort, listFieldMediaShort } from "../../../src/api/dto/IMedia";
import { matchRepository } from "../../../src/api/matchRepository";
import { mediaRepository } from "../../../src/api/mediaRepository";
import { formatDate } from "../../../src/assets/constants/date";
import { MatchInfoLayout } from "../../../src/componentPages/pageMatches/matchInfoLayout";
import { MediaGalleryList } from "../../../src/componentPages/pageMediaGallery/mediaGalleryList";
import { metaInterpolate } from "../../../src/helpers/metaInterpolate";
import { cmsRepository } from "../../../src/api/cmsRepository";

interface IProps {
  match?: IMatchDto;
  events?: MatchEvent[];
  galleryList: IMediaShort[];
  banner: string;
}

export default function Gallery(props: IProps) {
  return <MediaGalleryList galleryList={props.galleryList} defaultUrl={"/media/gallery/"} />;
}

Gallery.getLayout = MatchInfoLayout;

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const [matchRes, eventsRes] = await Promise.allSettled([
    matchRepository.fetchMatch({ matchId: `${params?.id}` }),
    matchRepository.fetchMatchEvents({ matchId: `${params?.id}` }),
  ]);

  const match = matchRes.status === "fulfilled" ? matchRes.value : null;
  const events: MatchEvent[] = eventsRes.status === "fulfilled" ? eventsRes.value : [];

  const galleryRes = await mediaRepository.fetchMedia(
    {
      MediaType: "Gallery",
      MatchId: `${params?.id}`,
      MediaStatus: "Published",
      sorting: "PublishDateTime desc",
      MediaHeader: locale,
      Section: "Site",
    },
    listFieldMediaShort
  );

  const metaTags = metaInterpolate(
    (seodata as Record<string, any>)["/matches/[id]/gallery"],
    match?.HomeTeam?.Name,
    match?.GuestTeam?.Name,
    {
      Ru: formatDate(match?.Date, "yyyy.MM.dd", "ru"),
      En: formatDate(match?.Date, "yyyy.MM.dd", "en"),
    }
  );

  const response = (await cmsRepository.fetchCms({ Type: "matchInfo" })).value[0];
  const enterData = response?.JsonData ? JSON.parse(response.JsonData) : null;

  return {
    props: {
      galleryList: galleryRes.value,
      match: match
        ? {
          ...match,
          GuestTeam: {
            ...match.GuestTeam,
            Events: events.filter(({ TeamId }) => TeamId === match?.GuestTeam?.Id),
          },
          HomeTeam: {
            ...match.HomeTeam,
            Events: events.filter(({ TeamId }) => TeamId === match?.HomeTeam?.Id),
          },
        }
        : null,
      events,
      metaTags,
      banner: enterData?.mainInfo.previewImg || null,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_MIN),
  };
};

export const getStaticPaths: GetStaticPaths = async () => ({ paths: [], fallback: true });
