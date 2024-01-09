import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { IMedia } from "../../../src/api/dto/IMedia";
import { mediaRepository } from "../../../src/api/mediaRepository";
import { AcademyGallery } from "../../../src/componentPages/pageAcademy/media/academyGallery";
import { AcademyNews } from "../../../src/componentPages/pageAcademy/media/academyNews";
import { AcademyVideos } from "../../../src/componentPages/pageAcademy/media/academyVideos";
import { GetLayout } from "../../../src/components/layout/getLayout";

export type AcademyMediaProps = {
  anotherMedia: IMedia[] | null;
  media: IMedia | null;
};

export default function SomeMediaAcademy(props: AcademyMediaProps) {
  return (
    <>
      {props.media?.MediaType === "News" && <AcademyNews {...props} />}
      {props.media?.MediaType === "Gallery" && <AcademyGallery {...props} />}
      {props.media?.MediaType === "Video" && <AcademyVideos {...props} />}
    </>
  );
}

SomeMediaAcademy.getLayout = GetLayout;

export const getStaticProps: GetStaticProps = async (context) => {
  const media = (await mediaRepository.fetchMedia({ Id: `${context.params?.id}` }))?.value?.[0] || null;

  const anotherMedia = media.MediaType
    ? (
        await mediaRepository.fetchMedia({
          MediaStatus: "Published",
          MediaType: media?.MediaType === "Gallery" ? "News" : media.MediaType,
          NotId: `${context.params?.id}`,
          TeamsIds: media?.MediaType === "Gallery" ? media?.TeamId : undefined,
          MediaCategoryId: media?.MediaType != "Gallery" ? media?.MediaCategoryId : undefined,
          MediaHeader: context.locale,
          sorting: "PublishDateTime desc",
          Section: "Academy",
          pageSize: media?.MediaType === "Gallery" ? 5 : 3,
        })
      )?.value || null
    : null;

  return {
    props: { media, anotherMedia },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE),
  };
};

export const getStaticPaths: GetStaticPaths = async () => ({ paths: [], fallback: true });
