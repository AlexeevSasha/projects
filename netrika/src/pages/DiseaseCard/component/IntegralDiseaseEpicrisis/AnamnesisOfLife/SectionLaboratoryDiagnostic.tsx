import { ILabDiagnostic } from "common/interfaces/ILabDiagnostic";
import { BlockLine } from "pages/DiseaseCard/style/BlockLine";
import moment from "moment";
import React, { FC, useMemo } from "react";
import { Type, Value } from "../../../style/Description";
import { Accordion } from "../../../../../common/components/Accordion/Accordion";
import styled from "styled-components";
import { getSortByDate } from "../../../helpers/getSortByDate";

interface IProps {
  display: string;
  items: ILabDiagnostic[];
  isPreview?: boolean;
}

export const SectionLaboratoryDiagnostic: FC<IProps> = ({
  display = "Лабораторная диагностика",
  items = [],
  isPreview,
}) => {
  const indexItemsWithDiagnosticTests = useMemo(() => items?.findIndex((el) => el?.diagnosticTests?.length), [items]);

  if (!items || !items?.length) return null;
  return (
    <Accordion isActive={isPreview} onlyBorderContent title={display}>
      <Container>
        {items?.map((item, i) => (
          <Accordion
            isActive={isPreview && indexItemsWithDiagnosticTests === i}
            onlyBorderContent
            key={item.labDiagnosticGroup + i}
            disabledClick={!item.diagnosticTests || !item.diagnosticTests?.length}
            hiddenArrow={!item.diagnosticTests || !item.diagnosticTests?.length}
            title={item.labDiagnosticGroup}
            styleTitle={{ fontWeight: 500 }}
          >
            <Container>
              {item.diagnosticTests &&
                getSortByDate(item.diagnosticTests, "labDiagnosticDate")?.map((attribute, i) => (
                  <Accordion
                    onlyBorderContent
                    key={attribute.labDiagnosticTestName + i}
                    disabledClick={!attribute.labHistory || !attribute.labHistory?.length}
                    hiddenArrow={!attribute.labHistory || !attribute.labHistory?.length}
                    title={
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Type>
                          ({attribute.labDiagnosticGroupName}) - {attribute.labDiagnosticTestName}{" "}
                          {moment(attribute.labDiagnosticDate).format("DD.MM.YYYY")}
                        </Type>
                        <Value>{attribute.labDiagnosticResult + " "}</Value>
                      </div>
                    }
                    styleTitle={{ fontWeight: 500 }}
                  >
                    <Container>
                      {attribute.labHistory?.map((history, index) => (
                        <BlockLine style={{ margin: 0 }} key={index}>
                          <Type>{moment(history.date).format("DD.MM.YYYY")}</Type>
                          <Value>{history.value}</Value>
                        </BlockLine>
                      ))}
                    </Container>
                  </Accordion>
                ))}
            </Container>
          </Accordion>
        ))}
      </Container>
    </Accordion>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
