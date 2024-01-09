import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";
import { lang } from "../public/locales/lang";
import { VotingType, mvpVotingRepository } from "../src/api/MvpVotingRepository";
import { calendarEventsRepository } from "../src/api/calendarEventsRepository";
import { cmsRepository } from "../src/api/cmsRepository";
import { EventEntityDto } from "../src/api/dto/EventEntity";
import { IBlocksOfMatch } from "../src/api/dto/IBlocksOfMatch";
import { IMediaShort, listFieldMediaShort } from "../src/api/dto/IMedia";
import { IProduct } from "../src/api/dto/IProduct";
import { ITeam } from "../src/api/dto/ITeam";
import { ITournamentAndSeasons } from "../src/api/dto/ITournamentAndSeasons";
import { ITournamentTable } from "../src/api/dto/ITournamentTable";
import { matchRepository } from "../src/api/matchRepository";
import { mediaRepository } from "../src/api/mediaRepository";
import { shopRepository } from "../src/api/shopRepository";
import { getTimeZoneOffset } from "../src/assets/constants/date";
import { getLocalValue } from "../src/assets/helpers/getLocalValue";
import { theme } from "../src/assets/theme/theme";
import { BottomBanner } from "../src/componentPages/pageMain/bottomBanner/bottomBanner";
import { Calendar } from "../src/componentPages/pageMain/calendar/calendar";
import { ClubTrophies } from "../src/componentPages/pageMain/clubTrophies/clubTrophies";
import { PageMainNews } from "../src/componentPages/pageMain/mainPageNews/pageMainNews";
import { Matches } from "../src/componentPages/pageMain/matches/matches";
import { MatchesVideo } from "../src/componentPages/pageMain/matchsVideo/matchsVideo";
import { Subscribe } from "../src/componentPages/pageMain/subscribe/subscribe";
import { TournamentTable } from "../src/componentPages/pageMain/tournamentTable/TournamentTable";
import { VotingEntity } from "../src/componentPages/voting/interfaces/VotingT";
import { GetLayout } from "../src/components/layout/getLayout";
import { MediaBanner } from "../src/components/mediaBanner";
import { ShopSwiper } from "../src/components/reactSwiper/shopSwiper";
import { SwiperWithBigActiveElem } from "../src/components/reactSwiper/swiperWithBigActiveElem";
import { getDataByTeamId, getInitialData } from "../src/core/getInitialData";

interface IProps {
  shopProductList?: IProduct[];
  newsList?: IMediaShort[];
  videoList?: IMediaShort[];
  blockOfMatches?: IBlocksOfMatch;
  events?: Record<number, EventEntityDto[]>;
  tournamentsAndSeasons?: ITournamentAndSeasons[];
  tableData?: ITournamentTable[] | null;
  team?: ITeam;
  votings?: VotingEntity[];
  banner?: any;
}

export default function Index(props: IProps) {
  const { locale = "ru" } = useRouter();

  return (
    <>
      <Matches showScroll blockOfMatches={props.blockOfMatches || {}} teamId={props.team?.Id} banner={props?.banner} />
      <Calendar
        events={props.events || {}}
        voting={props.votings || []}
        dateOfEngSeason={props.tournamentsAndSeasons?.[0].Seasons[0].EndDate}
      />
      <PageMainNews newsList={props.newsList || []} />
      <Subscribe />
      <TournamentTable
        tournaments={props.tournamentsAndSeasons || []}
        tableData={props.tableData || []}
        team={props.team}
      />
      <SwiperWithBigActiveElem title={lang[locale].mainPage.specialOffers} />
      <MatchesVideo videoList={props.videoList || []} />

      <MediaBanner locationKey="Web.Main.Video" />

      {!!props.shopProductList?.length && (
        <ShopSwiper
          itemsList={props.shopProductList}
          title={lang[locale].profile.denariiPage.cartInfo.purchases.shop}
        />
      )}
      <ClubTrophies addPadding={!props.shopProductList?.length} />
      <StyledBottomBanner>
        <BottomBanner
          title={getLocalValue(lang[locale].main.bannerForApps.title, locale)}
          text={getLocalValue(lang[locale].main.bannerForApps.description, locale)}
          img={"/images/banners/bgMainL_v1.0.0.jpg"}
        />
      </StyledBottomBanner>
    </>
  );
}

Index.getLayout = GetLayout;

const isDev = process.env.NODE_ENV !== "production";

export const getStaticProps: GetStaticProps = async ({ locale = "ru" }) => {
  isDev && console.log("\r\n\r\n", "\x1b[34m", "start", "/index", new Date());

  const { metaTags = {}, teams = [] } = await getInitialData({ pathname: "/" });

  const team = teams[0] || null;
  const teamId = team?.Id;
  const instatId = team?.InStatId?.toString();

  if (!teamId) return { props: {}, revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_MIN) };

  const { tournamentsAndSeasons = [], blockOfMatches = {} } = await getDataByTeamId({ teamId });
  const { Tournament = {}, Seasons = [] } = tournamentsAndSeasons[0] || {};

  const [shopProductList, newsRes, videoRes, eventsRes, votingSeasonRes, votingMonthRes, calendarRes] =
    await Promise.allSettled([
      shopRepository.fetchShopProductList({ locale }),
      mediaRepository.fetchMedia(
        {
          MediaType: "News",
          IsDraft: "false",
          PublishDateTime: true,
          currentPage: 1,
          pageSize: 6,
          sorting: "PublishDateTime desc",
          Section: "Site",
          MediaHeader: locale,
        },
        listFieldMediaShort
      ),
      mediaRepository.fetchMedia(
        {
          MediaType: "Video",
          IsDraft: "false",
          PublishDateTime: true,
          currentPage: 1,
          pageSize: 10,
          sorting: "PublishDateTime desc",
          Section: "Site",
        },
        listFieldMediaShort
      ),
      calendarEventsRepository.fetchCalendarEvents({ teamId, dateEnd: Seasons[0].EndDate }),
      mvpVotingRepository.fetchVotings({ mvpVotingType: VotingType.season }),
      mvpVotingRepository.fetchVotings({ mvpVotingType: VotingType.month }),
      matchRepository.fetchCalendar({
        teamId,
        tournamentId: Tournament.Id,
        seasonId: Seasons[0]?.Id,
        matchListType: "All",
        Status: "Published",
      }),
    ]);

  const events =
    eventsRes.status === "fulfilled"
      ? eventsRes.value.reduce((acc: Record<number, EventEntityDto[]>, event: EventEntityDto) => {
          const date = new Date(+new Date(event.DateStart) - getTimeZoneOffset() + 10800000);
          const key = +Date.UTC(date.getFullYear(), date.getMonth());
          return acc[key]
            ? { ...acc, [key]: [...acc[key], { ...event, DateStart: date.toString() }] }
            : { ...acc, [key]: [{ ...event, DateStart: date.toString() }] };
        }, {})
      : {};

  const isPlayOff =
    calendarRes.status === "fulfilled" ? calendarRes.value.some(({ Round }) => Round?.IsPlayOff) : false;

  const tableData =
    !isPlayOff && Seasons
      ? await matchRepository
          .fetchTournamentTable({
            tournamentId: Tournament.Id,
            seasonId: Seasons[0]?.Id,
            teamId,
          })
          .then((res) => {
            let result: ITournamentTable[] = res.map((elem, index) =>
              elem.Team?.Id === instatId ? { ...elem, index: index + 1, active: true } : { ...elem, index: index + 1 }
            );

            res.find((item, index) => {
              if (item.Team?.Id === instatId) {
                if (index < 4) {
                  result = result.slice(0, 5);
                } else if (index > res.length - 3) {
                  result = result.slice(-5);
                } else {
                  result = result.slice(index - 2, index + 3);
                }
                return true;
              }
              return false;
            });

            return result;
          })
      : null;

  isDev && console.log("\x1b[34m", "done", "/index", new Date(), "\r\n");

  const response = (await cmsRepository.fetchCms({ Type: "mainPage" })).value[0];
  const enterData = response?.JsonData ? JSON.parse(response.JsonData) : null;

  return {
    props: {
      shopProductList: shopProductList.status === "fulfilled" ? shopProductList.value || [] : [],
      newsList: newsRes.status === "fulfilled" ? newsRes.value.value || [] : [],
      videoList: videoRes.status === "fulfilled" ? videoRes.value.value || [] : [],
      blockOfMatches,
      events,
      tournamentsAndSeasons,
      tableData,
      team,
      metaTags: enterData?.metaTags || metaTags,
      banner: enterData?.mainInfo || null,
      votings: [
        votingMonthRes.status === "fulfilled" ? votingMonthRes.value[0] : undefined,
        votingSeasonRes.status === "fulfilled" ? votingSeasonRes.value[0] : undefined,
      ].filter((elem) => elem),
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_MIN),
  };
};

const StyledBottomBanner = styled.div`
  & > article {
    background-color: ${({ theme }) => theme.colors.none_black};

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      height: 38.33vw;
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      height: 89.3vw;
    }
  }
`;
