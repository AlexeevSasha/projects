import { useSelector } from "react-redux";
import { selectPatientRout } from "../../../module/diseaseCardEpicrisis/diseaseCardEpicrisisSelector";
import { useCallback, useMemo, useState } from "react";
import { IPatientRoute } from "../../../common/interfaces/patient/IPatientRoute";

type TGraph = { value: number; label: string } | string;

export const useCurrentRoute = () => {
  const { patientRoute } = useSelector(selectPatientRout);
  const [currentGraph, setCurrentGraph] = useState<TGraph>("");
  const [currentRoute, setCurrentRoute] = useState<IPatientRoute | null>(null);

  const isData = useMemo(() => {
    return !!patientRoute?.length;
  }, [patientRoute]);

  const optionsGraphs = useMemo(() => {
    if (!!patientRoute?.length) {
      return patientRoute.map((route, index) => ({ value: index, label: `${route?.graphName}` }));
    } else return [];
  }, [patientRoute]);

  const onChangeGraph = useCallback(
    (value: { value: number; label: string } | "") => {
      setCurrentGraph(value);
      if (typeof value !== "string") {
        const route = patientRoute?.[value.value];
        setCurrentRoute(route);
      } else setCurrentRoute(null);
    },
    [patientRoute]
  );

  return { isData, optionsGraphs, onChangeGraph, currentGraph, currentRoute };
};
