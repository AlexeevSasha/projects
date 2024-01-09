import { DiseaseCardEpicrisisAction } from "module/diseaseCardEpicrisis/diseaseCardEpicrisisAction";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "../../common/styles/styled";
import { selectIsLoading, selectVisible } from "../../module/diseaseCardEpicrisis/diseaseCardEpicrisisSelector";
import { FooterPatientCard } from "./component/FooterPatientCard";
import { useVisibleCardsByPosition } from "./hooks/useSortVisibleList";
import { FlexContainer } from "common/ui/FlexContainer";
import { IconLoading } from "../../common/components/Icon/IconLoading";
import { CardClinrec } from "./component/IntegralDiseaseEpicrisis/CardClinrec";
import { diseaseCardPatientManagementSelector } from "../../module/diseaseCardPatientManagement/diseaseCardPatientManagementSelector";
import { CardRouteVIMIS } from "./component/IntegralDiseaseEpicrisis/CardRouteVIMIS/CardRouteVIMIS";
import { useParams } from "react-router";

export const PageIntegralDiseaseEpicrisis = () => {
  const dispatch = useDispatch();
  const { registerId, patientId } = useParams<{ registerId: string; patientId: string }>();

  const visibleList = useSelector(selectVisible);
  const loading = useSelector(selectIsLoading);
  const state = useSelector(diseaseCardPatientManagementSelector);

  const blocksList = useVisibleCardsByPosition();

  useEffect(() => {
    dispatch(DiseaseCardEpicrisisAction.clearPreferentialMedicationSupply());
  }, [dispatch]);

  if (loading)
    return (
      <LoadingContainer>
        <IconLoading />
      </LoadingContainer>
    );
  return (
    <>
      <FlexContainer>
        {blocksList.top}
        <CardRouteVIMIS registerId={registerId} patientId={patientId} />
        <CardClinrec clinrecs={state.clinrec} loading={state.loadingClinrec} isCard />
        <FlexContainer direction="row" fullWidth alignItems="stretch" spacing={16}>
          <FlexContainer justify="start" alignItems="stretch" basis="50%">
            {blocksList.left}
          </FlexContainer>
          <FlexContainer justify="start" alignItems="stretch" basis="50%">
            {blocksList.right}
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
      <FooterPatientCard visibleCustomBlocks={visibleList.filter((item) => item.isCustom)} />
    </>
  );
};

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;
