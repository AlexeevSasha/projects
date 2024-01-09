import React, { useCallback, useMemo } from "react";
import { DiseaseCardEpicrisisThunk } from "../../../../module/diseaseCardEpicrisis/diseaseCardEpicrisisThunk";
import { useDispatch, useSelector } from "react-redux";
import { IconLoading } from "../../../../common/components/Icon/IconLoading";
import { selectReports } from "../../../../module/diseaseCardEpicrisis/diseaseCardEpicrisisSelector";
import { Card } from "../../../../common/components/Card/Card";
import { theme } from "../../../../common/styles/theme";
import styled from "styled-components";
import { Type, Value } from "../../style/Description";
import { MyLink } from "./CardDocuments";
import moment from "moment";
import { Accordion } from "../../../../common/components/Accordion/Accordion";
import { getSortByDate } from "../../helpers/getSortByDate";

interface IProps {
  registerId: string;
  patientId: string;
  isPreview: boolean;
}

export const CardTmReports: React.FC<IProps> = ({ registerId, patientId, isPreview }) => {
  const dispatch = useDispatch();
  const { loadingReports, reports } = useSelector(selectReports);

  const openCard = useCallback(async () => {
    await dispatch(DiseaseCardEpicrisisThunk.getTmReports(Number(registerId), patientId));
  }, [registerId, patientId, dispatch]);

  const render = useMemo(() => {
    if (!reports?.length) return <div style={{ color: theme.colors.opacityGray }}>Нет данных</div>;

    const data = getSortByDate(reports, "date").map((report, index) => (
      <Accordion
        isActive={isPreview && !index}
        title={
          <ContentFlex>
            <div>Дата:</div>
            {report.date ? <div style={{ marginRight: "15px" }}>{moment(report.date).format("DD.MM.YYYY")}</div> : ""}
          </ContentFlex>
        }
        key={index}
      >
        <Container>
          <ContentFlex>
            <Type>Ссылка на файл протокола:</Type>
            <Value>
              <MyLink href={report.url} target={"_blank"}>
                {report.url}
              </MyLink>
            </Value>
          </ContentFlex>
          <ContentFlex>
            <Type>Медицинский работник:</Type>
            <Value>{report.doctor}</Value>
          </ContentFlex>
          <ContentFlex>
            <Type>Медицинская организация:</Type>
            <Value>{report.performerOrganization}</Value>
          </ContentFlex>
          <ContentFlex>
            <Type>Вид консультации:</Type>
            <Value>{report.category}</Value>
          </ContentFlex>
          <ContentFlex>
            <Type>Диагноз в назначении:</Type>
            <Value>{report.diagnosisRequester}</Value>
          </ContentFlex>
          <ContentFlex>
            <Type>Диагноз по окончнию консультации:</Type>
            <Value>{report.diagnosisPerformer}</Value>
          </ContentFlex>
        </Container>
      </Accordion>
    ));

    return <Container>{data}</Container>;
  }, [reports, isPreview]);

  return (
    <Card
      id={"reports"}
      title={"Телемедицинские консультации"}
      max_height={600}
      isEmpty={!reports?.length}
      overflowY={"scroll"}
      onClick={openCard}
    >
      {loadingReports ? <IconLoading /> : render}
    </Card>
  );
};

const ContentFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
