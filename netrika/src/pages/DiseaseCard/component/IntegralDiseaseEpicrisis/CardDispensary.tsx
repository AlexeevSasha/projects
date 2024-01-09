import { theme } from "common/styles/theme";
import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconLoading } from "common/components/Icon/IconLoading";
import { Card } from "common/components/Card/Card";
import { Type, Value } from "../../style/Description";
import { selectDispensary } from "../../../../module/diseaseCardEpicrisis/diseaseCardEpicrisisSelector";
import { DiseaseCardEpicrisisThunk } from "../../../../module/diseaseCardEpicrisis/diseaseCardEpicrisisThunk";
import moment from "moment";
import { Accordion } from "../../../../common/components/Accordion/Accordion";
import styled from "styled-components";
import { getSortByDate } from "../../helpers/getSortByDate";

interface IProps {
  registerId: string;
  patientId: string;
  isPreview: boolean;
}

const conditionYesAndNo = (num: number) => (num ? "Да" : "Нет");

export const CardDispensary: React.FC<IProps> = ({ registerId, patientId, isPreview }) => {
  const dispatch = useDispatch();
  const { dispensary, loadingDispensary } = useSelector(selectDispensary);

  const openCard = useCallback(() => {
    if (dispensary.length === 0) {
      dispatch(DiseaseCardEpicrisisThunk.getDispensary(Number(registerId), patientId));
    }
  }, [registerId, patientId, dispatch, dispensary]);

  const render = useMemo(() => {
    if (!dispensary?.length) return <div style={{ color: theme.colors.opacityGray }}>Нет данных</div>;

    const data = getSortByDate(dispensary, "recommendationDate").map((item, i) => (
      <Accordion
        isActive={isPreview && !i}
        key={i}
        title={<Type style={{ fontWeight: 600 }}>Диспансеризация 1-й этап</Type>}
      >
        <Container>
          <Content>
            <Type>Диспансеризация проводится в ходе выездной работы </Type>
            <Value>{conditionYesAndNo(item.isGuested)}</Value>
          </Content>
          <Content>
            <Type>
              Дано направление на дополнительное диагностическое исследование, не входящее в объем диспансеризации
            </Type>
            <Value>{conditionYesAndNo(item.hasExtraResearchRefferal)}</Value>
          </Content>
          <Content>
            <Type>Взят под диспансерное наблюдение</Type>
            <Value>{conditionYesAndNo(item.isUnderObservation)}</Value>
          </Content>
          <Content>
            <Type>
              Дано направление для получения специализированной, в том числе высокотехнологичной медицинской помощи
            </Type>
            <Value>{conditionYesAndNo(item.hasExpertCareRefferal)}</Value>
          </Content>
          <Content>
            <Type>Назначено лечение</Type>
            <Value>{conditionYesAndNo(item.hasPrescribeCure)}</Value>
          </Content>
          <Content>
            <Type>Дано направление на санаторно-курортное лечение</Type>
            <Value>{conditionYesAndNo(item.hasHealthResortRefferal)}</Value>
          </Content>
          <Content>
            <Type>Необходимо прохождение 2-го этапа диспансеризации</Type>
            <Value>{conditionYesAndNo(item.hasSecondStageRefferal)}</Value>
          </Content>
          <Content>
            <Type>Группа здоровья</Type>
            <Value>{item.hgroupDisplay || "Нет данных"}</Value>
          </Content>
          <Content>
            <Type>Дата установки группы</Type>
            <Value>{item.hgroupDate ? moment(item.hgroupDate).format("DD.MM.YYYY") : "Нет данных"}</Value>
          </Content>
          <Content>
            <Type>Врач</Type>
            <Value>{item.doctorName || "Нет данных"}</Value>
          </Content>
          <Accordion size={"sm"} title={"Текст рекомендации"}>
            <Type style={{ width: "100%" }}>{item.recommendationText || "Нет данных"}</Type>
          </Accordion>
          <Content>
            <Type>Дата назначения рекомендации</Type>
            <Value>
              {item.recommendationDate ? moment(item.recommendationDate).format("DD.MM.YYYY") : "Нет данных"}
            </Value>
          </Content>
          <Content>
            <Type>Врач, назначивший рекомендацию</Type>
            <Value>{item.recommendationDoctorName || "Нет данных"}</Value>
          </Content>
        </Container>
      </Accordion>
    ));

    return <Container>{data}</Container>;
  }, [dispensary, isPreview]);

  return (
    <Card
      id={"dispensary"}
      title={"Диспансеризация и профилактические осмотры"}
      max_height={600}
      isEmpty={!dispensary?.length}
      overflowY={"scroll"}
      onClick={openCard}
    >
      {loadingDispensary ? <IconLoading /> : render}
    </Card>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;
