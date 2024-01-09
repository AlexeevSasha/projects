import { styled } from "common/styles/styled";
import { theme } from "common/styles/theme";
import { selectInstrumentalAnalysis } from "module/diseaseCardEpicrisis/diseaseCardEpicrisisSelector";
import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconLoading } from "common/components/Icon/IconLoading";
import { Card } from "common/components/Card/Card";
import { BlockLine } from "../../style/BlockLine";
import { Type, Value } from "../../style/Description";
import { DiseaseCardEpicrisisThunk } from "../../../../module/diseaseCardEpicrisis/diseaseCardEpicrisisThunk";
import { Accordion } from "../../../../common/components/Accordion/Accordion";
import moment from "moment";
import { IInstrumentalAnalysis } from "../../../../common/interfaces/IInstrumentalAnalysis";

interface IProps {
  registerId: string;
  patientId: string;
  isPreview: boolean;
}

export const CardInstrumentalAnalysis: React.FC<IProps> = ({ registerId, patientId, isPreview }) => {
  const dispatch = useDispatch();
  const { instrumentalAnalysis, loadingInstrumentalAnalysis } = useSelector(selectInstrumentalAnalysis);

  const sortAnalysis = useCallback((data: IInstrumentalAnalysis[]) => {
    return data?.sort((a, b) => {
      const dateA = moment(a.diagnosticReportIssued?.split(" ")?.[0], "DD.MM.YYYY", true);
      const dateB = moment(b.diagnosticReportIssued?.split(" ")?.[0], "DD.MM.YYYY", true);

      if (dateA.isValid() && dateB.isValid()) return dateB.diff(dateA);
      return -1;
    });
  }, []);

  const infoList = useMemo(() => {
    const data = isPreview ? sortAnalysis(instrumentalAnalysis) : instrumentalAnalysis;
    return data.map((item, index) => {
      if (
        item.diagnosticReportIssued ||
        item.diagnosticReportType ||
        item.practitionerOrganization ||
        item.practitionerDoctor ||
        item.diagnosticReportObservations
      ) {
        return (
          <Accordion
            isActive={isPreview && !index}
            key={index}
            title={
              <Container>
                <LeftColumn>{item.diagnosticReportIssued && `${item.diagnosticReportIssued}`}</LeftColumn>
                <RightColumn>{item.diagnosticReportType}</RightColumn>
              </Container>
            }
          >
            {item.practitionerOrganization ? (
              <BlockLine>
                <StyledType>МО:</StyledType>
                <StyledValue>{item.practitionerOrganization}</StyledValue>
              </BlockLine>
            ) : null}
            {item.practitionerDoctor ? (
              <BlockLine>
                <StyledType>Врач:</StyledType>
                <StyledValue>{item.practitionerDoctor}</StyledValue>
              </BlockLine>
            ) : null}
            {item.diagnosticReportObservations ? (
              <Accordion isActive={isPreview} onlyBorderContent title={"Результат исследования:"}>
                <div>{item.diagnosticReportObservations}</div>
              </Accordion>
            ) : null}
          </Accordion>
        );
      } else {
        return null;
      }
    });
  }, [instrumentalAnalysis, isPreview, sortAnalysis]);

  const openCard = useCallback(() => {
    if (instrumentalAnalysis.length === 0) {
      dispatch(DiseaseCardEpicrisisThunk.getInstrumentalAnalysis(Number(registerId), patientId));
    }
  }, [registerId, patientId, dispatch, instrumentalAnalysis]);

  return (
    <Card
      id={"instrumentalAnalysis"}
      title={"Инструментальные исследования"}
      max_height={600}
      isEmpty={!(instrumentalAnalysis.length > 0)}
      overflowY={"scroll"}
      onClick={openCard}
    >
      {loadingInstrumentalAnalysis ? (
        <IconLoading />
      ) : (
        <>
          {instrumentalAnalysis.length > 0 ? (
            <AccordionContainer>{infoList}</AccordionContainer>
          ) : (
            <div style={{ color: theme.colors.opacityGray, marginBottom: "23px" }}>Нет исследований</div>
          )}
        </>
      )}
    </Card>
  );
};

const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Container = styled.div`
  display: grid;
  grid: auto / 1fr 2fr;
  grid-gap: 15px;

  &:first-child {
    margin-top: 0;
  }
`;
const LeftColumn = styled.div<{ color?: string }>`
  display: flex;
  flex-flow: column;
  position: relative;
  color: ${({ color }) => color};
`;
const RightColumn = styled.div`
  display: flex;
  flex-flow: column;
  text-align: end;
`;
const StyledType = styled(Type)`
  width: 30%;
`;
const StyledValue = styled(Value)`
  width: 70%;
`;
