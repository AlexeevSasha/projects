import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { lang } from "../../../public/locales/lang";
import { comicRepository } from "../../../src/api/comicRepository";
import { getKidsLayout } from "../../../src/componentPages/kids/kidsLayout";
import { Season, SeasonProps } from "../../../src/componentPages/kids/season";

export default function ComicsPage(props: SeasonProps) {
  return <Season {...props} />;
}

ComicsPage.getLayout = getKidsLayout;

export const getStaticProps: GetStaticProps = async ({ locale = "ru", params }) => {
  const comics = params?.season
    ? (await (
        await comicRepository.fetchByFilter({
          ComicSeasonId: String(params.season),
          excludeDeletedUtc: true,
          sorting: "SortOrder DESC",
        })
      ).items) || []
    : [];

  return {
    props: { title: lang[locale].kids.comics, comics },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_LONG),
  };
};

export const getStaticPaths: GetStaticPaths = async () => ({ paths: [], fallback: true });
