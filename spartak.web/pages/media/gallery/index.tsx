import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { lang } from "../../../public/locales/lang";
import seodata from "../../../public/seo/seoData.json";
import { ICategory } from "../../../src/api/dto/ICategory";
import { ITeam } from "../../../src/api/dto/ITeam";
import { mediaRepository } from "../../../src/api/mediaRepository";
import { teamRepository } from "../../../src/api/teamRepository";
import { getLocalValue } from "../../../src/assets/helpers/getLocalValue";
import { mediaMainSubMenu } from "../../../src/componentPages/pageMediaNews/mediaNavMenu/mediaMainSubMenu";
import { MediaNavMenu } from "../../../src/componentPages/pageMediaNews/mediaNavMenu/mediaNavMenu";
import { GetLayout } from "../../../src/components/layout/getLayout";
import MainBannerWithTitle from "../../../src/components/mainBannerWithTitle/MainBannerWithTitle";
import { MediaList } from "../../../src/components/mediaList";
import { MobileTabMenu } from "../../../src/components/tabMenu/mobileTabMenu";

interface IProps {
  categoryList: ICategory[];
  teams: ITeam[];
  year: number;
  month: number;
  teamId: string;
}

export default function Gallery({ categoryList, teams, year, month, teamId }: IProps) {
  const { locale = "ru", query, replace, push } = useRouter();

  const checkIsActive = (id: string) => {
    return query?.team === id;
  };
  const title = teams.find((item) => checkIsActive(item.Id))?.FullName ?? { Ru: "Команда", En: "Team" };
  const itemsMenu = useMemo(
    () => [
      ...teams.map((item) => {
        return {
          onclick: () =>
            push({
              pathname: "/media/news",
              query: { team: item.Id, year: query.year, month: query.month, category: query.category },
            }),
          isActive: checkIsActive(item.Id),
          text: getLocalValue(item.FullName, locale),
        };
      }),
    ],
    [query, teams]
  ).filter(Boolean);

  useEffect(() => {
    (query.team !== teamId || query.month !== `${month}` || query.year !== `${year}` || query.category == undefined) &&
      replace({ query: `team=${teamId}&month=${month}&year=${year}&category=${query.category || 0}` }, undefined, {
        shallow: true,
      });
  }, []);

  const isYouthCommand = () => {
    return teams
      .find((team) => team.Id === teamId)
      ?.ShortName.En.toLowerCase()
      .includes("youth");
  };

  return (
    <>
      <MobileTabMenu title={getLocalValue(title, locale)} itemsMenu={itemsMenu} />

      <MainBannerWithTitle
        title={lang[locale].header.navList["media/gallery"]}
        banner={isYouthCommand() ? "/images/media/youthBanner_v1.0.0.png" : "/images/media/newsBanner_v1.0.0.png"}
      />
      <MediaNavMenu subMenuList={mediaMainSubMenu} categoryList={categoryList} />
      <MediaList mediaType="Gallery" section="Site" teamId={teamId} />
    </>
  );
}

Gallery.getLayout = GetLayout;

export const getServerSideProps: GetServerSideProps = async ({ query, res }) => {
  res.setHeader("Cache-Control", `public, s-maxage=${process.env.NEXT_PUBLIC_REVALIDATE}, stale-while-revalidate=59`);

  const [categoryRes, teamRes] = await Promise.allSettled([
    mediaRepository.fetchMediaCategories({ section: "Site", mediaType: "Gallery" }),
    teamRepository.fetchTeams({
      TeamType: "OwnTeam",
      Status: "Published",
      sorting: "SortOrder asc",
      DisplayTeamInTheMedia: "true",
      Section: "Site",
    }),
  ]);

  const categoryList = categoryRes.status === "fulfilled" ? categoryRes.value || [] : [];
  const teams = teamRes.status === "fulfilled" ? teamRes.value.value || [] : [];

  // Если в query параметрах не указан id, то получает первую команду как активную
  const teamId =
    (teams.find((elem: ITeam) => elem.Id === query.team) || teams[0])?.Id || "94974f94-27da-4350-81b3-9eb7afa82237";

  // Получение списка галерей
  const date = new Date();
  const year = Number(query.year || date.getFullYear());
  const month = Number(query.month || date.getMonth());

  return {
    props: {
      categoryList,
      teams,
      year,
      month,
      teamId,
      metaTags: (seodata as Record<string, any>)["/media/gallery"],
    },
  };
};
