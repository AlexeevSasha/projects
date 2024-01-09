import { GetServerSideProps } from "next";
import { getInitialData } from "../../src/core/getInitialData";
import { LoadingScreen } from "../../src/ui/LoadingScreen ";

export default function TeamsPage() {
  return <LoadingScreen />;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { teams = [] } = await getInitialData({ pathname: "/teams" });

  return { redirect: { permanent: true, destination: `/teams/${teams[0]?.Id}` } };
};
