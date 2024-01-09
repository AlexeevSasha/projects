import { selectPatient, selectPatientError } from "module/diseaseCardEpicrisis/diseaseCardEpicrisisSelector";
import { DiseaseCardEpicrisisThunk } from "module/diseaseCardEpicrisis/diseaseCardEpicrisisThunk";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useLocation, useParams } from "react-router-dom";
import { WorkSection } from "common/components/Container/WorkSection";
import { routesDiseaseCard } from "../../constants/routes";
import { PageLoading } from "../../../pages/PageLoading";
import { styled } from "../../styles/styled";
import { theme } from "../../styles/theme";
import { DiseaseCardLayout } from "../Container/DiseaseCardLayout";
import { diseaseCardPatientManagementThunk } from "../../../module/diseaseCardPatientManagement/diseaseCardPatientManagementThunk";
import { AppSettings } from "../../constants/appSettings";

export const RouterDiseaseCard: React.FC = () => {
  const location = useLocation();
  const { registerId, patientId } = useParams<{ registerId: string; patientId: string }>();
  const patient = useSelector(selectPatient);
  const error = useSelector(selectPatientError);
  const dispatch = useDispatch();
  const isMedicalCareCaseCard = location.pathname.indexOf("medicalCareCaseCard") > 0;

  useEffect(() => {
    dispatch(DiseaseCardEpicrisisThunk.getPatient(Number(registerId), patientId));
    if (!isMedicalCareCaseCard) {
      dispatch(diseaseCardPatientManagementThunk.getInfoClinrec(Number(registerId), patientId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, patientId, registerId]);

  return patient && !error ? (
    <WorkSection hideLeftMenu disableLeftMenuPadding>
      <DiseaseCardLayout hideNav={isMedicalCareCaseCard} hideCalendar={isMedicalCareCaseCard}>
        <Switch>
          {routesDiseaseCard.map((route, idx) => {
            return route.component ? (
              <Route
                key={idx}
                path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}${route.path}`}
                render={() => <route.component />}
              />
            ) : null;
          })}
        </Switch>
      </DiseaseCardLayout>
    </WorkSection>
  ) : error ? (
    <>
      <WorkSection hideLeftMenu>
        <BigContainer>Ошибка загрузки</BigContainer>
      </WorkSection>
    </>
  ) : (
    <PageLoading text="Загрузка контента" />
  );
};

const BigContainer = styled.div`
  height: 100vh;
  background: ${theme.colors.lightBlue};
  display: flex;
  flex-direction: column;
  transition: padding-left 0.5s ease;
  width: 100%;

  align-items: center;
  justify-content: center;
  font-size: 34px;
  color: ${theme.colors.grayBlue};
  line-height: 200%;
`;
