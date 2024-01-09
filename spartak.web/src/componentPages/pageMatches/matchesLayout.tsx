import { useRouter } from "next/router";
import { PageProps } from "../../../pages/_app";
import { IBlocksOfMatch } from "../../api/dto/IBlocksOfMatch";
import { ISeason, ITournamentAndSeasons } from "../../api/dto/ITournamentAndSeasons";
import { getLocalValue } from "../../assets/helpers/getLocalValue";
import { theme } from "../../assets/theme/theme";
import { IMetaTags } from "../../components/baseMeta/baseMeta";
import { ContainerWithBackgroundImg } from "../../components/containers/containerWithBackgroundImg";
import { INavMenuList } from "../../components/header/component/getMenuItems";
import { GetLayout } from "../../components/layout/getLayout";
import { InitialDataType } from "../../core/hooks/useInitialData";
import { ListMatchCard } from "./matchCard/listMatchCard";
import { MatchNavBar } from "./matchNavBar/matchNavBar";
import { MatchesTabMenu } from "./matchesTabMenu";

type Props = PageProps & {
  tournamentsAndSeasons?: ITournamentAndSeasons[];
  blockOfMatches?: IBlocksOfMatch;
  teamId?: string;
  tournament?: ITournamentAndSeasons;
  season?: ISeason;
  metaTags?: IMetaTags | null;
  initialData?: InitialDataType;
  bannerSpartak: string;
  bannerSpartakYouth: string;
};

export const MatchesLayout = (page: JSX.Element, props: Props) => {
  const { locale = "ru" } = useRouter();

  const isYouthCommand = () => {
    return props.initialData.teams
      .find((team) => team.Id === props.teamId)
      ?.ShortName.En.toLowerCase()
      .includes("youth");
  };

  return GetLayout(
    <>
      <MatchesTabMenu {...props} />

      <ContainerWithBackgroundImg
        gradient={theme.gradients.first}
        src={
          isYouthCommand() ? getLocalValue(props.bannerSpartakYouth, "ru") : getLocalValue(props.bannerSpartak, "ru")
        }
        position="center"
      >
        <ListMatchCard blockOfMatches={props.blockOfMatches} showScroll />
      </ContainerWithBackgroundImg>

      <MatchNavBar
        tournamentsAndSeasons={props.tournamentsAndSeasons}
        defaultTournament={{
          value: props.tournament?.Tournament.Id || "",
          label: getLocalValue(props.tournament?.Tournament.Name, locale),
        }}
        defaultSeason={{ value: props.season?.Id || "", label: getLocalValue(props.season?.Name, locale) }}
        menuList={!props.tournament?.Tournament.ShowTournamentTable ? mockSubMenu : undefined}
      />

      {page}
    </>,
    props
  );
};

const mockSubMenu: INavMenuList[] = [
  { label: "matches/forthcoming", link: "/matches/forthcoming", query: {} },
  { label: "matches/past", link: "/matches/past", query: {} },
];
