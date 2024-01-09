import { useEffect, useMemo, useState } from "react";
import { IPatientRoute } from "../../../../../../../common/interfaces/patient/IPatientRoute";
import { IPatientRoutePoint } from "../../../../../../../common/interfaces/patient/IPatientRoutePoint";
import { theme } from "../../../../../../../common/styles/theme";
import { scrollToElem } from "../../../../../../../common/helpers/scrollToElem";

export const usePointData = (currentRoute: IPatientRoute | null) => {
  const [currentPoint, setCurrentPoint] = useState<IPatientRoutePoint | null>(null);

  //  получение елемента по клику на график и  добавление клика на нужные элементы
  useEffect(() => {
    // инициализация дефолтной точки и скрол к ней

    if (currentRoute) {
      const defaultPoint = currentRoute.points?.find((point) => point.isCurrentPoint);
      defaultPoint && setCurrentPoint(defaultPoint);
      defaultPoint && scrollToElem(`point-code-${defaultPoint?.stateCode}`);
    }

    // добавление клика для routeType === brief

    if (currentRoute && currentRoute?.routeType === "brief") {
      const elementList = document.querySelectorAll("div.action-block:has( .route[id])");
      elementList.forEach((el) =>
        el.addEventListener("click", () => {
          const elementId = el.querySelector(".route[id]");
          const pointCode = elementId?.id.replace("point-code-", "");
          currentRoute &&
            elementId &&
            setCurrentPoint(currentRoute?.points?.find((p) => p?.stateCode === pointCode) || null);
        })
      );
    } // добавление клика для routeType === bpmn
    else if (currentRoute && currentRoute?.routeType === "bpmn") {
      const elementList = document.querySelectorAll("div.pr-block");
      elementList.forEach((el) =>
        el.addEventListener("click", () => {
          const elementId = el.querySelector("[id]");
          const pointCode = elementId?.id.replace("point-number-", "");
          currentRoute &&
            elementId &&
            setCurrentPoint(currentRoute?.points?.find((p) => p?.stateCode === pointCode) || null);
        })
      );
    }

    return () => setCurrentPoint(null);
  }, [currentRoute]);

  // добавление рамки для точки и скрытие рамки при размонтировании
  useEffect(() => {
    if (currentPoint) {
      const currentPointElement = document.getElementById(`point-code-${currentPoint?.stateCode}`);
      if (currentPointElement) {
        currentPointElement.style.border = `5px solid ${theme.colors.green}`;
        // очистка текущей точки если не нашел элемет
      } else setCurrentPoint(null);
    }
    return () => {
      if (currentPoint) {
        const currentPointElement = document.getElementById(`point-code-${currentPoint?.stateCode}`);
        if (currentPointElement) {
          currentPointElement.style.border = "none";
        }
      }
    };
  }, [currentPoint]);

  // Получение  исмени стэйджа для точки
  const currentStageName = useMemo(
    () => currentRoute?.stages?.find((st) => st.stageCode === currentPoint?.stageCode)?.stageName,
    [currentRoute, currentPoint]
  );

  // Получение  отклонения для точки
  const currentDeviations = useMemo(
    () =>
      currentRoute?.deviations
        ?.filter((d) => d?.stateCode === currentPoint?.stateCode)
        ?.map((d) => ({ ...d, stageName: currentStageName, pointName: currentPoint?.pointName })),
    [currentPoint, currentRoute, currentStageName]
  );
  // Получение  рекомендаций для точки
  const currentRecommendations = useMemo(
    () =>
      currentPoint?.recommendations?.map((rec) => ({
        ...rec,
        recommendationDate: currentPoint?.recommendationDate,
      })),
    [currentPoint]
  );

  return { currentPoint, currentStageName, currentDeviations, currentRecommendations };
};
