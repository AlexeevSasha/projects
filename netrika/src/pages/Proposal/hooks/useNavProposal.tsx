import { useMemo } from "react";
import { IHorisontMenu } from "../../../common/components/HorisontalNavMenuRegister";
import { useSelector } from "react-redux";
import { configurationSelector } from "../../../module/configuration/configurationSelector";
import { visibilityChaptersUserSelector } from "../../../module/usersList/usersListSelector";

export const useNavigationProposal = (): IHorisontMenu[] => {
  const { checkControlEventsOption } = useSelector(configurationSelector);
  const { contingentOption } = useSelector(configurationSelector);
  const { seeAllChaptersOrder } = useSelector(visibilityChaptersUserSelector);

  return useMemo(() => {
    const menu = [
      { name: "Общие сведения", url: "info", index: 1 },
      { name: "Критерии", url: "criterion", index: 2 },
    ];

    if (!seeAllChaptersOrder) return menu;

    const additionalMenu = [
      { name: "Контрольные списки", url: "checklist", index: 4 },
      { name: "Информация о заболевании", url: "diseaseCard", index: 5 },
      { name: "Требования качества", url: "qualityRequirements", index: 6 },
    ];

    contingentOption && menu.push({ name: "Контингент", url: "contingent", index: 3 });
    checkControlEventsOption && menu.push({ name: "Контрольные события", url: "controlEvents", index: 7 });

    return menu.concat(additionalMenu).sort((a, b) => a.index - b.index);
  }, [checkControlEventsOption, contingentOption, seeAllChaptersOrder]);
};
