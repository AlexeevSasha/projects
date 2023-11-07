import { UserT } from "../interfaces/UserT";

export const createArrayRoles = (user: UserT) => {
  const roles = [user.userRole];
  if (user.userRole !== "Partner" && user.isPartner) roles.push("Partner");
  return roles;
};
