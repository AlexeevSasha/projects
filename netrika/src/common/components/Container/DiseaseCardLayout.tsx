/* eslint-disable @typescript-eslint/no-empty-function */
import {
  selectDoctorCardUrl,
  selectFilteredMedicalCareCase,
  selectPatient,
  selectVisible,
} from "../../../module/diseaseCardEpicrisis/diseaseCardEpicrisisSelector";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { HorisontalNavMenuRegister } from "common/components/HorisontalNavMenuRegister";
import { FlexContainer } from "common/ui/FlexContainer";
import { ControlVimisBlock } from "../../../pages/DiseaseCard/component/PatientCard/ControlVimisBlock";
import { CoverageBlock } from "../../../pages/DiseaseCard/component/PatientCard/CoverageBlock";
import { PatientInfo } from "../../../pages/DiseaseCard/component/PatientCard/PatientInfo";
import { useRegisterDisease } from "../../../pages/DiseaseCard/hooks/useRegisterDisease";
import { theme } from "common/styles/theme";
import { Divider } from "common/ui/Divider";
import { DiseaseCardEpicrisisAction } from "module/diseaseCardEpicrisis/diseaseCardEpicrisisAction";
import { Moment } from "moment";
import { CalendarEpicrisis } from "pages/DiseaseCard/component/IntegralDiseaseEpicrisis/CalendarEpicrisis/CalendarEpicrisis";
import { MedOrganization } from "pages/DiseaseCard/component/IntegralDiseaseEpicrisis/MedOrganization";
import { useParams } from "react-router-dom";
import { NotCustomBlocksEnum } from "common/interfaces/NotCustomBlocksEnum";
import { MedicalCareCase } from "pages/DiseaseCard/component/IntegralDiseaseEpicrisis/MedicalCareCase";
import { DiseaseCardEpicrisisThunk } from "module/diseaseCardEpicrisis/diseaseCardEpicrisisThunk";
import { DictionaryClinrecPompThunk } from "../../../module/dictionaryClinrecPomp/dictionaryClinrecPompThunk";
import { IconLoading } from "../Icon/IconLoading";
import { BlockFilterInfo } from "../../../pages/DiseaseCard/component/IntegralDiseaseEpicrisis/BlockFilterInfo";

export const IsOpenCardContext = React.createContext<{
  isOpen: (value: string) => boolean;
  trigger: (value: string) => void;
  openAll?: (value: string[]) => void;
  closeAll?: () => void;
  hideStatusCounter?: boolean;
}>({
  isOpen: (value = "") => false,
  closeAll: () => {},
  openAll: (value = [""]) => {},
  trigger: (value = "") => {},
  hideStatusCounter: true,
});

interface Props {
  hideNav: boolean;
  hideCalendar: boolean;
}

export const DiseaseCardLayout = (props: PropsWithChildren<Props>) => {
  const { registerId, patientId } = useParams<{ registerId: string; patientId: string }>();
  const dispatch = useDispatch();

  /** Методы для работы с раскрывающимися карточками */
  const [openedBlocks, setOpenedBlocks] = useState<string[]>([]);
  const isOpen = (value: string) => openedBlocks.indexOf(value) !== -1;
  const trigger = (value: string) =>
    setOpenedBlocks(isOpen(value) ? openedBlocks.filter((item) => item !== value) : [...openedBlocks, value]);
  const openAll = (value: string[]) => setOpenedBlocks(value);
  const closeAll = () => setOpenedBlocks([]);
  /************************************************* */

  const patient = useSelector(selectPatient);
  const { doctorCardUrl, loadingDoctorCardUrl } = useSelector(selectDoctorCardUrl);

  const visibleList = useSelector(selectVisible);
  const medicalCareCase = useSelector(selectFilteredMedicalCareCase);

  const links = useRegisterDisease();

  useEffect(() => {
    if (!props.hideCalendar) {
      dispatch(DiseaseCardEpicrisisThunk.getVisible(Number(registerId)));
      dispatch(DiseaseCardEpicrisisThunk.getMedicalCareCase(Number(registerId), patientId));
      dispatch(DictionaryClinrecPompThunk.getInfoForCreateClinrec());
      dispatch(DictionaryClinrecPompThunk.getPompProfiles());
    }
    dispatch(DiseaseCardEpicrisisThunk.getPatientDoctorCardUrl(Number(registerId), patientId));
  }, [dispatch, patientId, props.hideCalendar, registerId]);

  const filterMedDocs = (date: Moment, type: string) => {
    dispatch(DiseaseCardEpicrisisAction.setDateFilter({ date, dateType: type }));
  };

  return (
    <IsOpenCardContext.Provider value={{ isOpen, trigger, openAll, closeAll, hideStatusCounter: true }}>
      <GridContainer hideNav={props.hideNav}>
        <Sidebar justify="start" alignItems="stretch" spacing={15}>
          <SidebarCard spacing={10} alignItems="start">
            <CardContent>
              <PatientInfo patient={patient} showFIO={true} />
              {patient?.controlVimis && patient.controlVimis?.length > 0 ? (
                <>
                  <ControlVimisBlock controlVimis={patient.controlVimis} />
                  <Divider />
                </>
              ) : null}
              {patient?.coverage && patient.coverage.length > 0 ? (
                <>
                  <CoverageBlock coverage={patient.coverage} />
                  <Divider />
                </>
              ) : null}

              <Link
                id={"link_iap"}
                onClick={() => {
                  if (doctorCardUrl) {
                    window.open(doctorCardUrl, "_blank");
                  }
                }}
                isLoading={loadingDoctorCardUrl}
              >
                перейти в интегральный анамнез пациента
                {loadingDoctorCardUrl && <IconLoading hidePadding width={10} height={10} />}
              </Link>
            </CardContent>
          </SidebarCard>

          {!props.hideCalendar && (
            <CalendarEpicrisis
              filters={
                visibleList.find((item) => item.confBlockId === NotCustomBlocksEnum.MedicalOrganization) ? (
                  <MedOrganization patientId={patientId} registerId={registerId} />
                ) : null
              }
              titleCard="Календарь медицинского обслуживания"
              pickDates={filterMedDocs}
              hideMonth={true}
              footer={
                visibleList.find((item) => item.confBlockId === NotCustomBlocksEnum.MedicalCareCase) &&
                medicalCareCase.length > 0 ? (
                  <BlockFilterInfo />
                ) : null
              }
            />
          )}

          {visibleList.find((item) => item.confBlockId === NotCustomBlocksEnum.MedicalCareCase) &&
            (medicalCareCase.length > 0 ? <MedicalCareCase /> : null)}
        </Sidebar>
        {!props.hideNav && (
          <Nav>
            <HorisontalNavMenuRegister links={links} />
          </Nav>
        )}

        <MainContent>{props.children}</MainContent>
      </GridContainer>
    </IsOpenCardContext.Provider>
  );
};

const GridContainer = styled.div<{ hideNav: boolean }>`
  flex: 1 1 auto;
  display: grid;
  grid-template-areas:
    "sidebar  nav           "
    "sidebar  mainContent   ";
  grid-template-rows: ${({ hideNav }) => (hideNav ? "0 1fr" : "50px 1fr")};
  grid-template-columns: 420px 1fr;
  grid-gap: 16px;
  overflow: hidden;
  margin: 0;
  padding-bottom: 0;
  background: ${theme.colors.lightBlue};
`;

const Sidebar = styled(FlexContainer)`
  grid-area: sidebar;
  padding: 15px 15px 40px;
  overflow-y: auto;
  overflow-x: hidden;
  background: ${theme.colors.bgGrayPrimary};
  box-shadow: ${theme.shadows.containerShadow};
`;

const Nav = styled.div`
  grid-area: nav;
`;

const MainContent = styled.div`
  grid-area: mainContent;
  padding: 3px;
  overflow-y: auto;
`;

const Link = styled.div<{ isLoading: boolean }>`
  font-size: 12px;
  font-weight: 600;
  display: flex;
  width: 100%;
  color: ${theme.colors.green};
  text-decoration-line: underline;
  cursor: pointer;
  .container_loading {
    width: 10px;
    margin-left: 10px;
  }

  ${(props) =>
    props.isLoading &&
    css`
      cursor: initial;
      text-decoration-line: none;
      color: ${theme.colors.opacityGray};
    `}
`;

const SidebarCard = styled(FlexContainer)`
  border-radius: 10px;
  background: ${theme.colors.white};
  align-items: stretch;
`;

const CardContent = styled(FlexContainer)`
  padding: 10px;
  gap: 15px;
  align-items: stretch;
  justify-content: flex-start;
`;
