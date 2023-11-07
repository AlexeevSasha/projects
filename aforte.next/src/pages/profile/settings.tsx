import { getUserAddress } from "api/userAddressApi";
import { getUser } from "api/userApi";
import { AppContext } from "common/components/ContextProvider";
import { getProfileLayout } from "common/components/layout/ProfileLayout";
import { TitleH1 } from "common/components/TitleH1";
import { getInitialData } from "common/hooks/useInitialData";
import { ModalNames } from "common/interfaces/modal";
import { Profile } from "modules/profile/components/Profile";
import { UserT } from "modules/profile/interfaces/user";
import { UserAddressT } from "modules/profile/interfaces/userAddress";
import { GetServerSideProps } from "next";
import { useContext, useEffect } from "react";

type Props = {
  user: UserT;
  userAddress: UserAddressT[];
};

export default function SettingsPage(props: Props) {
  const { openModal } = useContext(AppContext);
  useEffect(() => {
    if (!props.user.confirmEmail) {
      openModal(ModalNames.ALERT_MODAL, {
        children: <Profile.ProfileSettingsEmailAlert email={props.user.email} />,
      });
    }
  }, []);
  return (
    <>
      <TitleH1 title={"Изменить профиль"} />
      <Profile.ProfileBanner settings />
      <Profile.ProfileSettings user={props.user} userAddress={props.userAddress} />
    </>
  );
}

SettingsPage.getLayout = getProfileLayout;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { metaTags = {}, ...initialData } = await getInitialData({
      pathname: "/profile/settings",
    });
    const [user, userAddress] = await Promise.allSettled([getUser(), getUserAddress()]);
    return {
      props: {
        user: user.status === "fulfilled" ? user.value : [],
        userAddress: userAddress.status === "fulfilled" ? userAddress.value : [],
        initialData: { metaTags, ...initialData },
      },
    };
  } catch {
    return { props: {} };
  }
};
