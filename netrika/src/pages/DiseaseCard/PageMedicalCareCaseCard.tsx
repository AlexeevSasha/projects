import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import {
  selectCurrentMedicalCarCase,
  selectCustomBlocks,
} from "../../module/diseaseCardEpicrisis/diseaseCardEpicrisisSelector";
import { DiseaseCardEpicrisisThunk } from "../../module/diseaseCardEpicrisis/diseaseCardEpicrisisThunk";
import { diseaseMedicalCareCaseCardSelector } from "../../module/diseaseMedicalCareCaseCard/diseaseMedicalCareCaseCardSelector";
import { DiseaseMedicalCareCaseCardThunk } from "../../module/diseaseMedicalCareCaseCard/diseaseMedicalCareCaseCardThunk";
import { CustomBlocks } from "./component/IntegralDiseaseEpicrisis/CustomBlocks";
import { MedicalCareCaseCardGeneralInfo } from "./component/MedicalCareCaseCard/MedicalCareCaseCardGeneralInfo";
import { MedicalCareCaseCardMedicalEpisodes } from "./component/MedicalCareCaseCard/MedicalCareCaseCardMedicalEpisodes";
import { FooterPatientCard } from "./component/FooterPatientCard";
import { IDiseaseCardCustomBlock } from "../../common/interfaces/IDiseaseCardCustomBlock";
import { deepCopyFunction } from "../../common/helpers/deepCopy";
import { IIntegralDiseaseEpicrisisVisible } from "../../common/interfaces/IIntegralDiseaseEpicrisisVisible";
import { IsOpenCardContext } from "common/components/Container/DiseaseCardLayout";

export const PageMedicalCareCaseCard = () => {
  const dispatch = useDispatch();
  const { registerId, patientId, caseBizKey } = useParams<{
    registerId: string;
    patientId: string;
    caseBizKey: string;
  }>();

  /** Методы для работы с раскрывающимися карточками */
  const [openedBlocks, setOpenedBlocks] = useState<string[]>([]);
  const isOpen = (value: string) => openedBlocks.indexOf(value) !== -1;
  const trigger = (value: string) =>
    setOpenedBlocks(isOpen(value) ? openedBlocks.filter((item) => item !== value) : [...openedBlocks, value]);
  const openAll = (value: string[]) => setOpenedBlocks(value);
  const closeAll = () => setOpenedBlocks([]);
  /************************************************* */

  const { customBlocks } = useSelector(selectCustomBlocks);
  const { steps, loadingSteps } = useSelector(diseaseMedicalCareCaseCardSelector);
  const { currentMedicalCareCase } = useSelector(selectCurrentMedicalCarCase);

  const [leftCustomBlocks, setLeftCustomBlocks] = useState<IDiseaseCardCustomBlock[]>([]);
  const [rightCustomBlocks, setRightCustomBlocks] = useState<IDiseaseCardCustomBlock[]>([]);
  const customBlocksClone = deepCopyFunction(customBlocks.sort((a, b) => a.sort - b.sort));
  const customBlocksBreaker = Math.ceil(customBlocksClone.length / 2);

  useEffect(() => {
    dispatch(DiseaseCardEpicrisisThunk.getCurrentMedicalCareCase(Number(caseBizKey)));
    dispatch(DiseaseMedicalCareCaseCardThunk.getSteps(Number(caseBizKey)));
    dispatch(DiseaseMedicalCareCaseCardThunk.getCustomBlocks(Number(registerId), patientId, Number(caseBizKey)));
  }, [dispatch, caseBizKey, patientId, registerId]);

  useEffect(() => {
    setLeftCustomBlocks(customBlocksClone.splice(0, customBlocksBreaker));
    setRightCustomBlocks(customBlocksClone);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customBlocks, customBlocksBreaker]);

  return (
    <IsOpenCardContext.Provider value={{ isOpen, trigger, openAll, closeAll }}>
      <div id="container">
        {currentMedicalCareCase ? <MedicalCareCaseCardGeneralInfo medicalCareCase={currentMedicalCareCase} /> : null}

        <MedicalCareCaseCardMedicalEpisodes steps={steps} loadingSteps={loadingSteps} />
        <CustomBlocksContainer>
          <LeftBlock>
            {leftCustomBlocks && <CustomBlocks MedicalCareCaseCardCustomBlocks={leftCustomBlocks} />}
          </LeftBlock>
          <RightBlock>
            {rightCustomBlocks && <CustomBlocks MedicalCareCaseCardCustomBlocks={rightCustomBlocks} />}
          </RightBlock>
        </CustomBlocksContainer>
      </div>
      <FooterPatientCard visibleCustomBlocks={[] as IIntegralDiseaseEpicrisisVisible[]} />
    </IsOpenCardContext.Provider>
  );
};

const CustomBlocksContainer = styled.div`
  display: flex;
`;

const LeftBlock = styled.div`
  width: 49%;
  margin-right: 65px;
`;

const RightBlock = styled.div`
  width: 49%;
`;
