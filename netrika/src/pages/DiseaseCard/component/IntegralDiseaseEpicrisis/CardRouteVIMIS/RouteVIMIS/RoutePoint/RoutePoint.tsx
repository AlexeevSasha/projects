import React from "react";

import { usePointData } from "./usePointData";
import { IPatientRoute } from "../../../../../../../common/interfaces/patient/IPatientRoute";
import { DescriptionWaypoint } from "../DescriptionWaypoint";
import { RecommendationsList } from "../RecommendationsList";
import { DeviationsInfo } from "./Deviation/DeviationsInfo";
import { DeviationsList } from "./Deviation/DeviationsList";

interface IProps {
  route: IPatientRoute | null;
}

export const RoutePoint: React.FC<IProps> = ({ route }) => {
  const { currentPoint, currentStageName, currentRecommendations, currentDeviations } = usePointData(route);

  return (
    <>
      {currentPoint && (
        <div style={{ overflowY: "auto", paddingRight: "5px" }}>
          <DescriptionWaypoint
            isCurrentPoint={currentPoint?.isCurrentPoint ? "Да" : "Нет"}
            beginOn={currentPoint.beginOn}
            isDead={currentPoint?.isDead ? "Мертв" : undefined}
            moName={currentPoint.moName}
            pointName={currentPoint.pointName}
            stageName={currentStageName}
          />
          <RecommendationsList recommendations={currentRecommendations || []} />
          <DeviationsInfo
            crCriticalDeviationCount={currentPoint?.crCriticalDeviationCount}
            crDeviationCount={currentPoint?.crDeviationCount}
            deviationCount={currentPoint?.deviationCount}
            pggDeviationCount={currentPoint?.pggDeviationCount}
            pompDeviationCount={currentPoint?.pompDeviationCount}
            criticalDeviationCount={currentPoint?.criticalDeviationCount}
            pggCriticalDeviationCount={currentPoint?.pggCriticalDeviationCount}
            pompCriticalDeviationCount={currentPoint?.pompCriticalDeviationCount}
          />
          <DeviationsList deviations={currentDeviations || []} />
        </div>
      )}
    </>
  );
};
