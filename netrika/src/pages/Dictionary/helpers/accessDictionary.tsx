import { UserRolesEnum } from "../../../common/interfaces/user/UserRolesEnum";

export const accessDictionary = (user: string) => {
  return (
    user !== UserRolesEnum.RegistryExpert &&
    user !== UserRolesEnum.RegistrySuperExpert &&
    user !== UserRolesEnum.RegistryOrgCurator &&
    user !== UserRolesEnum.RegistryDiseaseKurator
  );
};
