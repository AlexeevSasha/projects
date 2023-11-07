import { getUser, getUserDistributions } from "api/userApi";
import { getProfileLayout } from "common/components/layout/ProfileLayout";
import { TitleH1 } from "common/components/TitleH1";
import { Profile } from "modules/profile/components/Profile";
import { UserT } from "modules/profile/interfaces/user";
import { UserDistributionsT } from "modules/profile/interfaces/userDistributions";
import { GetServerSideProps } from "next";
import { getInitialData } from "common/hooks/useInitialData";

type Props = {
  user: UserT;
  distributions: UserDistributionsT;
};

export default function DistributionPage(props: Props) {
  return (
    <>
      <TitleH1 title={"Настройки рассылок"} />
      <Profile.ProfileBanner distributions />
      <Profile.DistributionsForm distributions={props.distributions} />
    </>
  );
}

DistributionPage.getLayout = getProfileLayout;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { metaTags = {}, ...initialData } = await getInitialData({ pathname: "/profile/distributions" });
    const [user, distributions] = await Promise.allSettled([getUser(), getUserDistributions()]);
    return {
      props: {
        user: user.status === "fulfilled" ? user.value : [],
        distributions: distributions.status === "fulfilled" ? distributions.value : [],
        initialData: { metaTags, ...initialData },
      },
    };
  } catch {
    return { props: {} };
  }
};

