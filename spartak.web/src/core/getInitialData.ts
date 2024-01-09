import NodeCache from "node-cache";
import seoData from "../../public/seo/seoData.json";
import { advRepository } from "../api/advRepository";
import { matchRepository } from "../api/matchRepository";
import { partnerRepository } from "../api/partnerRepository";
import { shopRepository } from "../api/shopRepository";
import { teamRepository } from "../api/teamRepository";
import { InitialDataType } from "./hooks/useInitialData";

if (globalThis && !(globalThis as any).dataCache) {
  (globalThis as any).dataCache = new NodeCache();
}

type Props = {
  pathname?: string;
  locale?: string;
  fetchCommon?: boolean;
};

export const getInitialData = async ({ pathname, locale }: Props = {}) => {
  if (pathname?.includes("/webView/") || pathname?.includes("/auth/"))
    return Promise.resolve({} as Partial<InitialDataType>);

  const dataCache = (globalThis as any).dataCache;

  const data: Partial<InitialDataType> = {
    partners: dataCache.get("partners"),
    teams: dataCache.get("teams"),
    banners: dataCache.get("banners"),
    metaTags: pathname ? (seoData as Record<string, any>)[pathname] : null,
  };

  const [partnerRes, teamsRes, bannersRes] = await Promise.allSettled([
    !data.partners
      ? partnerRepository.fetchPartners({ sorting: "SortOrder asc", Section: "Site" })
      : Promise.resolve({ value: data.partners }),
    !data.teams
      ? teamRepository.fetchTeams({
          TeamType: "OwnTeam",
          Status: "Published",
          sorting: "SortOrder asc",
          DisplayTeamInfoOnTheSite: "true",
          Section: "Site",
        })
      : Promise.resolve({ value: data.teams }),
    !data.banners ? advRepository.fetchAllBanners() : Promise.resolve(data.banners),
  ]);

  if (!data.partners) {
    data.partners = partnerRes.status === "fulfilled" ? partnerRes.value.value : [];
    data.partners.length && dataCache.set("partners", data.partners, 60);
  }

  if (!data.teams) {
    data.teams = teamsRes.status === "fulfilled" ? teamsRes.value.value : [];
    data.teams.length && dataCache.set("teams", data.teams, 60);
  }

  if (!data.banners) {
    data.banners = bannersRes.status === "fulfilled" ? bannersRes.value : {};
    Object.keys(data.banners).length && dataCache.set("banners", data.banners, 60);
  }

  if (locale) {
    const dataByLang = dataCache.get("shopCategories") || { ru: [], en: [] };

    if (!dataByLang[`${locale}`]?.length) {
      dataByLang[`${locale}`] = await shopRepository.fetchShopCategories(locale);
      dataCache.set("shopCategories", dataByLang, 60);
    }

    data.shopCategories = dataByLang;
  }

  return data;
};

type DataByTeamProps = {
  teamId: string;
};

export const getDataByTeamId = async ({ teamId }: DataByTeamProps) => {
  const dataCache = (globalThis as any).dataCache;

  const dataByTeam = dataCache.get(teamId) || {};

  const [blockOfMatchesRes, tournamentsAndSeasonsRes] = await Promise.allSettled([
    !dataByTeam.blockOfMatches ? matchRepository.fetchBlocksOfMatches({ teamId }) : Promise.resolve({}),
    !dataByTeam.tournamentsAndSeasons ? matchRepository.fetchTournamentsAndSeasons({ teamId }) : Promise.resolve([]),
  ]);

  if (!dataByTeam.blockOfMatches) {
    const blockOfMatches = blockOfMatchesRes.status === "fulfilled" ? blockOfMatchesRes.value : {};
    Object.keys(blockOfMatches).length && (dataByTeam.blockOfMatches = blockOfMatches);
  }

  if (!dataByTeam.tournamentsAndSeasons) {
    const tournamentsAndSeasons = tournamentsAndSeasonsRes.status === "fulfilled" ? tournamentsAndSeasonsRes.value : [];
    tournamentsAndSeasons.length && (dataByTeam.tournamentsAndSeasons = tournamentsAndSeasons);
  }

  !Object.keys(dataCache.get(teamId) || {}).length && dataCache.set(teamId, dataByTeam, 60);

  return dataByTeam;
};
