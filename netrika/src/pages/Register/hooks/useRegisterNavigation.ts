import { useMemo } from "react";
import { IHorisontMenu } from "../../../common/components/HorisontalNavMenuRegister";
import { useSelector } from "react-redux";
import { authorizationSelector } from "../../../module/authorization/authorizationSelector";
import { UserRolesEnum } from "common/interfaces/user/UserRolesEnum";
import { configurationSelector } from "../../../module/configuration/configurationSelector";
import { visibilityChaptersUserSelector } from "../../../module/usersList/usersListSelector";

export const useRegisterNavigation = (): IHorisontMenu[] => {
  const { login } = useSelector(authorizationSelector);
  const { contingentOption } = useSelector(configurationSelector);

  const { seeAllChaptersRegister } = useSelector(visibilityChaptersUserSelector);

  return useMemo(() => {
    const menu = [{ name: "Контрольные списки", url: "checklist", index: 2 }];

    if (login === UserRolesEnum.RegistryAdmin || login === UserRolesEnum.RegistrySuperUsr) {
      menu.push({ name: "Общие сведения", url: "info", index: 3 });
    }
    seeAllChaptersRegister && contingentOption && menu.push({ name: "Контингент", url: "contingents", index: 1 });

    return menu.sort((a, b) => a.index - b.index);
  }, [login, contingentOption, seeAllChaptersRegister]);
};
