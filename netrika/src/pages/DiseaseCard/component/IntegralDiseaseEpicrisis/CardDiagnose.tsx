import { styled } from "common/styles/styled";
import { theme } from "common/styles/theme";
import { selectDiagnose } from "module/diseaseCardEpicrisis/diseaseCardEpicrisisSelector";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconLoading } from "common/components/Icon/IconLoading";
import { Card } from "common/components/Card/Card";
import { DeathInfoBlock } from "./Diagnose/DeathInfoBlock";
import { DiseaseCardEpicrisisThunk } from "../../../../module/diseaseCardEpicrisis/diseaseCardEpicrisisThunk";
import { RangeSwitch } from "../RangeSwitch";
import { IsOpenCardContext } from "../../../../common/components/Container/DiseaseCardLayout";
import { IDiagnoseBase } from "../../../../common/interfaces/IDiagnoseBase";
import { useDiagnosePreview } from "../../hooks/useDiagnosePreview";

interface IProps {
  registerId: string;
  patientId: string;
  isPreview: boolean;
}

export const CardDiagnose: React.FC<IProps> = ({ registerId, patientId, isPreview }) => {
  const dispatch = useDispatch();
  const { isOpen } = useContext(IsOpenCardContext);
  const [fromAll, setFromAll] = useState<boolean>(true);

  const { diagnose, loadingDiagnose } = useSelector(selectDiagnose);
  const [sortedDiagnose, setSortedDiagnose] = useState<{ diagnosisDate: Date; diagnoses: IDiagnoseBase[] }[]>(
    diagnose.diagnoses
  );
  const { deathInfo, diagnoses } = diagnose;
  const { contentDiagnose } = useDiagnosePreview(sortedDiagnose, isPreview);

  useEffect(() => {
    if (!loadingDiagnose && diagnose.diagnoses?.length) {
      if (fromAll) {
        setSortedDiagnose(diagnose.diagnoses);
      } else {
        const newD = diagnose.diagnoses.map((d) => ({ ...d, diagnoses: d.diagnoses.filter((d2) => d2.fromSms) }));
        setSortedDiagnose(newD);
      }
    }
  }, [fromAll, loadingDiagnose, diagnose.diagnoses]);

  const openCard = useCallback(() => {
    if (Object.keys(diagnose).length === 0 && diagnose.constructor === Object) {
      dispatch(DiseaseCardEpicrisisThunk.getDiagnose(Number(registerId), patientId));
    }
  }, [registerId, patientId, dispatch, diagnose]);

  return (
    <Wrapper>
      {(!loadingDiagnose || deathInfo || !!diagnoses?.length) && isOpen("card_diagnose") && (
        <SwitchWrapper>
          <RangeSwitch
            rightTextWidth={"145px"}
            leftTextWidth={"65px"}
            defaultValue={fromAll}
            onChange={(value) => setFromAll(value)}
            rightText={"из всех источников"}
            leftText={"из СЭМД"}
          />
        </SwitchWrapper>
      )}
      <Card
        id={"diagnose"}
        title={"Диагноз"}
        max_height={600}
        isEmpty={!(deathInfo || diagnose.diagnoses)}
        overflowY={"scroll"}
        onClick={openCard}
      >
        {loadingDiagnose ? (
          <IconLoading />
        ) : deathInfo || !!diagnoses?.length ? (
          <ContentWrapper>
            {deathInfo ? <DeathInfoBlock deathInfo={deathInfo} /> : null}
            {contentDiagnose}
          </ContentWrapper>
        ) : (
          <div style={{ color: theme.colors.opacityGray, marginBottom: "23px" }}>Нет данных</div>
        )}
      </Card>
    </Wrapper>
  );
};

const SwitchWrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: 35px;
  left: 15px;
  background: white;
  width: calc(100% - 30px);
`;
const Wrapper = styled.div`
  position: relative;
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 45px;
`;
