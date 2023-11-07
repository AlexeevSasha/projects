import { LanguageT } from "../../../common/interfaces/LanguageT";

export const getRolesValue = (lang: LanguageT) => {
  const role = lang.common.role;
  return {
    Client: role.client,
    Admin: role.admin,
    Partner: role.partner,
    Consultant: role.consultant,
    Guest: role.guest,
  };
};
