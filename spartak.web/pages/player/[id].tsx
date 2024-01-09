import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import seodata from "../../public/seo/seoData.json";
import { IMediaShort, listFieldMediaShort } from "../../src/api/dto/IMedia";
import type { IPlayer } from "../../src/api/dto/IPlayer";
import { ITeamsInfo } from "../../src/api/dto/ITeamsInfo";
import { LocaleType } from "../../src/api/dto/LocaleType";
import { mediaRepository } from "../../src/api/mediaRepository";
import { playerRepository } from "../../src/api/playerRepository";
import { AnotherPlayers } from "../../src/componentPages/pagePlayer/anotherPlayers/anotherPlayers";
import { PlayerBiography } from "../../src/componentPages/pagePlayer/playerBiography/playerBiography";
import { PlayerCareer } from "../../src/componentPages/pagePlayer/playerCareer/playerCareer";
import { PlayerNews } from "../../src/componentPages/pagePlayer/playerNews/playerNews";
import { PlayerPersonalData } from "../../src/componentPages/pagePlayer/playerPersonalData";
import { GetLayout } from "../../src/components/layout/getLayout";
import { NoData } from "../../src/components/noData/noData";
import { metaInterpolate } from "../../src/helpers/metaInterpolate";
import { LoadingScreen } from "../../src/ui/LoadingScreen ";

interface IProps {
  player: IPlayer;
  otherPlayersList: IPlayer[];
  matchInfo: ITeamsInfo;
  amplua: LocaleType;
  playerNews: IMediaShort[];
}

export default function Player(props: IProps) {
  const router = useRouter();
  return (
    <>
      {props.player ? (
        <>
          <PlayerPersonalData player={props.player} amplua={props.player.Amplua?.Name} />
          <PlayerBiography biography={props.player?.Biography} achievements={props.player?.Achievements} />
          <PlayerCareer career={props.player.PlayerCareer} />
          <PlayerNews news={props.playerNews} />
          <AnotherPlayers players={props.otherPlayersList} />
        </>
      ) : router.isFallback ? (
        <LoadingScreen />
      ) : (
        <NoData />
      )}
    </>
  );
}

Player.getLayout = GetLayout;

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const player = (await playerRepository.fetchPlayers({ Id: `${params?.id}`, Status: "Published" })).value[0] || null;

  const InTeamArray = player?.Teams?.[0]?.Id;

  const [otherPlayers, playerNews] = await Promise.allSettled([
    // Получение всех игроков, кроме текущего
    playerRepository.fetchPlayers({
      NotId: `${params?.id}`,
      Status: "Published",
      PlayerType: "OwnPlayer",
      InTeamArray,
    }),

    // получение новостей игрока
    mediaRepository.fetchMedia(
      {
        PlayersIds: `${params?.id}`,
        IsDraft: "false",
        PublishDateTime: true,
        MediaHeader: locale,
        sorting: "PublishDateTime desc",
      },
      listFieldMediaShort
    ),
  ]);

  return {
    props: {
      player,
      otherPlayersList: otherPlayers.status === "fulfilled" ? otherPlayers.value.value : {},
      playerNews: playerNews.status === "fulfilled" ? playerNews.value.value : [],
      metaTags: metaInterpolate((seodata as Record<string, any>)["/player/[id]"], player?.FullName) || null,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_LONG),
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: true };
};
