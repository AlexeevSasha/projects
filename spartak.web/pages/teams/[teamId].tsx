import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { ampluaRepository } from "../../src/api/ampluaRepository";
import { coachesRepository } from "../../src/api/coachesRepository";
import { IAmplua } from "../../src/api/dto/IAmplua";
import { ICoach } from "../../src/api/dto/ICoach";
import { IPlayer } from "../../src/api/dto/IPlayer";
import { IStaff } from "../../src/api/dto/IStaff";
import { medicalRepository } from "../../src/api/medicalRepository";
import { playerRepository } from "../../src/api/playerRepository";
import { staffRepository } from "../../src/api/staffRepository";
import { getTeamsLayout } from "../../src/componentPages/pageTeams/teamLayout";
import { TeamLineUp } from "../../src/componentPages/pageTeams/teamLineUp";
import { NoData } from "../../src/components/noData/noData";
import { getInitialData } from "../../src/core/getInitialData";
import { LoadingScreen } from "../../src/ui/LoadingScreen ";

interface IProps {
  players?: IPlayer[];
  amplua?: IAmplua[];
  coaches?: ICoach[];
  staff?: IStaff[];
  medical?: IStaff[];
}

export default function TeamsPage(props: IProps) {
  const router = useRouter();
  return (
    <>
      {(props.amplua && props.amplua?.length > 0 && props.players && props.players?.length > 0) ||
      (props.staff && props.staff?.length > 0) ||
      (props.coaches && props.coaches?.length > 0) ||
      (props.medical && props.medical?.length > 0) ? (
        <TeamLineUp
          players={props.players}
          coaches={props.coaches}
          staff={props.staff}
          medical={props.medical}
          amplua={props.amplua}
        />
      ) : router.isFallback ? (
        <LoadingScreen />
      ) : (
        <NoData />
      )}
    </>
  );
}

TeamsPage.getLayout = getTeamsLayout;

export const getStaticProps: GetStaticProps = async ({ params = {} }) => {
  if (!params.teamId) return { props: {} };

  const { metaTags } = await getInitialData({ pathname: "/teams" });
  const teamId = String(params.teamId);

  const [ampluaRes, playersRes, coacheRes, staffRes, medicalRes] = await Promise.allSettled([
    ampluaRepository.fetchAmplua(),
    playerRepository.fetchPlayers({
      InTeamArray: teamId,
      Status: "Published",
      PlayerType: "OwnPlayer",
    }),
    coachesRepository.fetchCoaches({
      Status: "Published",
      coachSection: "Site",
      sorting: "SortOrder asc",
      coachesTeam: teamId,
    }),
    staffRepository.fetchStaff({
      Status: "Published",
      sorting: "SortOrder asc",
      StaffCoachesTeam: teamId,
    }),
    medicalRepository.fetchMedical({
      Status: "Published",
      sorting: "SortOrder asc",
      StaffCoachesTeam: teamId,
    }),
  ]);

  const amplua = ampluaRes.status === "fulfilled" ? ampluaRes.value.value || [] : [];
  const players = playersRes.status === "fulfilled" ? playersRes.value.value || [] : [];
  const coaches = coacheRes.status === "fulfilled" ? coacheRes.value.value || [] : [];
  const staff = staffRes.status === "fulfilled" ? staffRes.value.value || [] : [];
  const medical = medicalRes.status === "fulfilled" ? medicalRes.value.value || [] : [];

  return {
    props: { amplua, players, coaches, staff, medical, metaTags },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_LONG),
  };
};

export const getStaticPaths: GetStaticPaths = async () => ({ paths: [], fallback: true });
