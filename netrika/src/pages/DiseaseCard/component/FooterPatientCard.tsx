import { styled } from "common/styles/styled";
import { theme } from "common/styles/theme";
import { selectCustomBlocks } from "module/diseaseCardEpicrisis/diseaseCardEpicrisisSelector";
import React, { useCallback, useContext } from "react";
import { useSelector } from "react-redux";
import { IconArrowTop } from "common/components/Icon/IconArrowTop";
import { IsOpenCardContext } from "common/components/Container/DiseaseCardLayout";
import { IIntegralDiseaseEpicrisisVisible } from "../../../common/interfaces/IIntegralDiseaseEpicrisisVisible";

interface IProps {
  visibleCustomBlocks: IIntegralDiseaseEpicrisisVisible[];
}
export const FooterPatientCard = ({ visibleCustomBlocks }: IProps) => {
  const { openAll, closeAll } = useContext(IsOpenCardContext);
  const { customBlocks } = useSelector(selectCustomBlocks);

  const scrollToTop = useCallback(() => {
    const element = document.getElementById("container");
    if (element) {
      element.children[0].scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  return (
    <>
      <FooterContainer>
        <Elem onClick={closeAll}>Свернуть всё</Elem>
        <Elem
          onClick={() =>
            openAll?.([
              "card_diagnose",
              "card_anamnes_of_desease",
              "card_instrumental_research",
              "card_anamnesis_of_life",
              "card_reference_plan",
              "card_referral",
              "card_instrumentalAnalysis",
              "card_aggregates",
              "card_preferentialMedicationSupply",
              "card_general_info",
              "card_medical_episodes",
              "card_immunization",
              "card_dispensary",
              "card_documents",
              "card_recipes",
              "card_med_org",
              "card_calendar",
              "card_medical_care_case",
              "card_clinrecs",
              "card_reports",
              "card_vaccinationСalendar",
              "card_services",
              "card_routeVIMIS",
              /* id для кастомных блоков */
              ...customBlocks.map((item) => {
                return `card_${item.id}`;
              }),
              ...visibleCustomBlocks?.map((item) => {
                return `card_${item.id}`;
              }),
            ])
          }
        >
          Показать всё
        </Elem>
        <Elem onClick={scrollToTop} style={{ width: "100px" }}>
          <IconArrowTop width={14} />
        </Elem>
      </FooterContainer>
      <HeightElem />
    </>
  );
};

const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  height: 30px;
  width: 100%;
  background-color: ${theme.colors.white};
  border-top: 2px solid ${theme.colors.green};

  display: grid;
  align-items: center;
  justify-content: flex-end;
  grid-template-columns: auto auto auto;

  padding: 0 25px;
`;

const Elem = styled.span`
  cursor: pointer;
  display: flex;
  justify-content: center;
  color: ${theme.colors.green};

  :hover {
    opacity: 0.7;
  }

  border-right: 2px solid ${theme.colors.green};
  padding: 0 35px;
`;

const HeightElem = styled.div`
  width: 100%;
  margin-top: 30px;
`;
