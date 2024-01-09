import { useMemo } from "react";
import { IHorisontMenu } from "../../../common/components/HorisontalNavMenuRegister";
import { AppSettings } from "../../../common/constants/appSettings";

export const useRegisterDisease = (): IHorisontMenu[] => {
  return useMemo(() => {
    const register = [
      { name: "Интегральный эпикриз заболевания", url: "integralDiseaseEpicrisis", index: 1 },
      { name: "Анализ качества ведения пациента", url: "patientManagement", index: 2 },
    ];

    if (AppSettings.get("show_screen_route")) {
      register.push({ name: "Маршрут пациента", url: "patientDashboard", index: 3 });
    }

    return register;
  }, []);
};
