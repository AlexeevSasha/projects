import { GetStaticProps } from "next";
import React from "react";
import seodata from "../../../public/seo/seoData.json";
import { comicRepository } from "../../../src/api/comicRepository";
import { comicSeasonRepository } from "../../../src/api/comicSeasonRepository";
import { ComicEntity } from "../../../src/api/dto/kids";
import { Comics, ComicsProps } from "../../../src/componentPages/kids/comics";
import { getKidsLayout } from "../../../src/componentPages/kids/kidsLayout";
import { cmsRepository } from "../../../src/api/cmsRepository";
import { getLocalValue } from "../../../src/assets/helpers/getLocalValue";

export default function ComicsPage(props: ComicsProps) {
  return <Comics {...props} />;
}

ComicsPage.getLayout = getKidsLayout;

export const getStaticProps: GetStaticProps = async ({ locale = "ru" }) => {
  const res = (await cmsRepository.fetchCms({ Type: "kidsComics" })).value[0];
  const comicsMainInfo = res?.JsonData ? JSON.parse(res.JsonData) : null;

  const [seasonRes, comicsRes] = await Promise.allSettled([
    comicSeasonRepository.fetchAll(),
    comicRepository.fetchAll(),
  ]);
  const seasons = seasonRes.status === "fulfilled" ? seasonRes.value.reverse() : [];

  const { comics, special } =
    comicsRes.status === "fulfilled"
      ? comicsRes.value.reduce(
          ({ comics, special }: { comics: Record<string, ComicEntity[]>; special: ComicEntity[] }, item) => {
            if (item.IsSpecialEdition) special.push(item);
            else comics[item.ComicSeasonId] = [...(comics[item.ComicSeasonId] || []), item];

            return { comics, special };
          },
          { comics: {}, special: [] }
        )
      : { comics: {}, special: [] };

  return {
    props: {
      title: comicsMainInfo?.mainInfo?.title || (seodata as Record<string, any>)["/more/kids/comics"].h1,
      metaTags: comicsMainInfo?.metaTags || (seodata as Record<string, any>)["/more/kids/comics"] || null,
      bannerSrc: getLocalValue(comicsMainInfo?.mainInfo?.previewImg, locale),
      seasons,
      comics,
      special,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_LONG),
  };
};
