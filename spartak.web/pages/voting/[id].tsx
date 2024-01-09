import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { mvpVotingRepository } from "../../src/api/MvpVotingRepository";
import { IMatchDto } from "../../src/api/dto/IMatchDto";
import { matchRepository } from "../../src/api/matchRepository";
import { getYearsOld, toISOString } from "../../src/assets/constants/date";
import { Voting } from "../../src/componentPages/voting/components/voting";
import { VotingDataType } from "../../src/componentPages/voting/interfaces/VotingT";
import { UseWinlineModal } from "../../src/componentPages/voting/useWinlineModal";
import { GetLayout } from "../../src/components/layout/getLayout";
import { NoData } from "../../src/components/noData/noData";
import { DataContext } from "../../src/core/dataProvider";
import { getInitialData } from "../../src/core/getInitialData";
import { LoadingScreen } from "../../src/ui/LoadingScreen ";
import { mediaRepository } from "../../src/api/mediaRepository";
import { IMediaShort, listFieldMediaShort } from "../../src/api/dto/IMedia";

interface IProps {
  voting: VotingDataType;
  match: IMatchDto | null;
  votingId: string | null;
  news: IMediaShort[] | null;
}

export default function VotingPage(props: IProps) {
  const { push, asPath, isFallback } = useRouter();
  const [voting, setVoting] = useState(props.voting);
  const [showModal, setShowModal] = useState(false);
  const { auth: { user = undefined } = {}, setLoading } = useContext(DataContext);
  const birthDate = user?.personalData.BirthDate || toISOString(new Date());

  const fetchVoting = () => {
    props.votingId
      ? mvpVotingRepository
          .fetchVotingData(String(props.votingId))
          .then((res) => {
            setVoting(res);
          })
          .finally(() => setLoading(false))
      : setLoading(false);
  };

  const handleVote = (Id: VotingDataType["Variants"][0]["Id"]) => {
    if (!user) {
      push(`/auth/signin?backUrl=${encodeURIComponent(asPath)}`);
    } else if (getYearsOld(birthDate) < 18 || !user.AllowToUseWinline) {
      setShowModal(true);
    } else {
      setLoading(true);
      mvpVotingRepository
        .vote(Id)
        .then(() => {
          window.scroll({ top: (document.getElementById("condition")?.offsetTop || 0) - 100, behavior: "smooth" });
          fetchVoting();
        })
        .catch(() => setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      setLoading(true);
      fetchVoting();
    }
  }, [user]);

  return isFallback ? (
    <LoadingScreen />
  ) : (
    <>
      {showModal && (
        <UseWinlineModal
          birthDate={birthDate}
          onClose={() => setShowModal(false)}
          onConfirm={() => setShowModal(false)}
        />
      )}

      {voting || props.voting ? (
        props.match ? (
          <Voting.MatchVoting voting={voting || props.voting} onVote={handleVote} match={props.match} />
        ) : props.voting.Month ? (
          <Voting.MonthVoting voting={voting || props.voting} onVote={handleVote} news={props.news} />
        ) : (
          <Voting.SeasonVoting voting={voting || props.voting} onVote={handleVote} news={props.news} />
        )
      ) : (
        <NoData />
      )}
    </>
  );
}

VotingPage.getLayout = GetLayout;

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const { metaTags } = await getInitialData({ pathname: "/teams/voting" });
  const voting = await mvpVotingRepository.fetchVotingData(String(params?.id));
  const match = voting.MatchId ? await matchRepository.fetchMatch({ matchId: voting.MatchId }) : null;

  const news = voting.Month
    ? await mediaRepository.fetchMvpMedia(
        {
          TeamsIds: "c383d6b5-3130-45a0-9ad9-7af1598348c5", // id для команды МВП
          // MediaStatus: "None",
          MediaHeader: locale,
          sorting: "PublishDateTime desc",
          Section: "Site",
          pageSize: 15,
        },
        listFieldMediaShort
      )
    : null;

  return {
    props: { match, voting, metaTags, votingId: String(params?.id), news: news?.value || null },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE),
  };
};

export const getStaticPaths: GetStaticPaths = async () => ({ paths: [], fallback: true });
