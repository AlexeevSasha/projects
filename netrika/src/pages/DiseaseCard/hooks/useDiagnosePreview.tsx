import { IDiagnoseBase } from "../../../common/interfaces/IDiagnoseBase";
import React, { useMemo } from "react";
import moment from "moment/moment";
import { SectionBaseDiagnose } from "../component/IntegralDiseaseEpicrisis/Diagnose/SectionBaseDiagnose";
import { Accordion } from "../../../common/components/Accordion/Accordion";
import { styled } from "../../../common/styles/styled";
import { theme } from "../../../common/styles/theme";

export const useDiagnosePreview = (
  diagnoses: { diagnosisDate: Date; diagnoses: IDiagnoseBase[] }[],
  isPreview: boolean
) => {
  const items = useMemo(() => {
    if (!diagnoses?.length) return null;

    return diagnoses?.map((item, index) => {
      return item.diagnoses?.length ? (
        <Accordion
          key={index}
          isActive={isPreview && index === 0}
          title={<DateTitle>{moment(item.diagnosisDate).format("DD.MM.YYYY")}</DateTitle>}
        >
          {item?.diagnoses?.map((item, i) => (
            <SectionBaseDiagnose isActiveAccordion={isPreview} key={i} diagnose={item} collapse rightCol />
          ))}
        </Accordion>
      ) : null;
    });
  }, [diagnoses, isPreview]);

  const contentDiagnose = useMemo(() => {
    const restDiagnose = items?.slice(1)?.filter(Boolean) || [];

    return (
      <Container>
        {items?.[0]}
        {restDiagnose.length ? (
          <Accordion hiddenBorder hiddenPadding title={"Исторические данные:"}>
            <Container>{restDiagnose}</Container>
          </Accordion>
        ) : null}
      </Container>
    );
  }, [items]);

  return { contentDiagnose };
};

const DateTitle = styled.div`
  color: ${theme.colors.hightBlue};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
