import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import LoadingScreen from "./LoadingScreen";
import { checkRouterRedirect } from "../../common/constants/checkRouterRedirect";
import { getCurrentRoles } from "../../modules/user/constants/currentRoles";
import { UserT } from "../../modules/user/interfaces/UserT";
import { setLanguage } from "../../common/constants/setLanguage";

const PageAccess = ({
  children,
  roles,
  redirectTo = "/",
}: {
  children: React.ReactElement;
  roles?: string[];
  redirectTo?: string;
}) => {
  const { status, data } = useSession();
  const [access, setAccess] = useState(true);
  const checkRoles = !roles ? ["Admin", "Consultant", "Client", "Partner", "Guest"] : roles;
  const router = useRouter();

  useEffect(() => {
    setLanguage(router);
    if (data?.user) {
      const currentRole = getCurrentRoles(data.user as UserT);
      const match = checkRoles?.filter((req) => currentRole === req);
      if (!match?.length || status !== "authenticated") setAccess(false);
    }
    if (data === null) setAccess(false);
  }, [data]);

  useEffect(() => {
    if (!access) checkRouterRedirect(router.pathname) && router.replace(redirectTo);
  }, [access]);

  return (
    <>
      <LoadingScreen show={status === "loading"} />
      {children}
    </>
  );
};

export default PageAccess;
