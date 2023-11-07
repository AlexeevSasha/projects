import { UserRoleT } from "../interfaces/UserRoleT";
import { UserT } from "../interfaces/UserT";
import { createArrayRoles } from "./createArrayRoles";

const checkWindow = typeof window !== "undefined";

export const getCurrentRoles = (user: UserT) => {
  const localRole = checkWindow && (window?.localStorage?.getItem("role") as UserRoleT);
  const myRoles = createArrayRoles(user);

  if (localRole && myRoles.includes(localRole)) {
    return localRole;
  }
  return setCurrentRoles(user.userRole);
};

export const setCurrentRoles = (role: UserRoleT) => {
  checkWindow && window?.localStorage?.setItem("role", role);
  return role;
};
