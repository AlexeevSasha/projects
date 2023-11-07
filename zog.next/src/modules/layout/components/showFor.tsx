import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import React from "react";
import { getCurrentRoles } from "../../user/constants/currentRoles";
import { UserT } from "../../user/interfaces/UserT";

const roleAccess = (auth: any, userData: Session) => {
  if (typeof auth === "boolean") return userData;
  if (typeof auth === "string") auth = [auth];
  if (auth && typeof auth === "object" && Array.isArray(auth)) {
    if (!auth.length) return true;
    const currentRole = getCurrentRoles(userData?.user as UserT);
    return !!auth.includes(currentRole);
  }
  return false;
};

interface IShowFor {
  children: React.ReactNode;
  auth?: boolean | string | object;
  showForOther?: React.ReactNode;
  loading?: React.ReactNode;
}

export const ShowFor = ({
  children,
  auth = true,
  showForOther = null,
  loading = null,
}: IShowFor) => {
  const { status, data } = useSession();
  if (status === "loading") return <>{loading}</>;

  return <>{status === "authenticated" && roleAccess(auth, data) ? children : showForOther}</>;
};
