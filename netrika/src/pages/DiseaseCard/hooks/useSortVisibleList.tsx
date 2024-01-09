import React, { ReactNode, useEffect, useState } from "react";
import { NotCustomBlocksEnum } from "../../../common/interfaces/NotCustomBlocksEnum";
import { CardDiagnose } from "../component/IntegralDiseaseEpicrisis/CardDiagnose";
import { CardObjectiveState } from "../component/IntegralDiseaseEpicrisis/CardObjectiveState";
import { CardAnamnesisOfDisease } from "../component/IntegralDiseaseEpicrisis/CardAnamnesisOfDisease";
import { CardAnamnesisOfLife } from "../component/IntegralDiseaseEpicrisis/CardAnamnesisOfLife";
import { CardImmunization } from "../component/IntegralDiseaseEpicrisis/CardImmunization";
import { CardReferencePlan } from "../component/IntegralDiseaseEpicrisis/CardReferencePlan";
import { CardReferral } from "../component/IntegralDiseaseEpicrisis/CardReferral";
import { CardInstrumentalAnalysis } from "../component/IntegralDiseaseEpicrisis/CardInstrumentalAnalysis";
import { CardPreferentialMedicationSupply } from "../component/IntegralDiseaseEpicrisis/CardPreferentialMedicationSupply";
import { CardAggregates } from "../component/IntegralDiseaseEpicrisis/CardAggregates";
import { CustomBlockCard } from "../component/IntegralDiseaseEpicrisis/CustomBlockCard";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { selectVisible } from "../../../module/diseaseCardEpicrisis/diseaseCardEpicrisisSelector";
import { CardDispensary } from "../component/IntegralDiseaseEpicrisis/CardDispensary";
import { CardDocuments } from "../component/IntegralDiseaseEpicrisis/CardDocuments";
import { CardRecipes } from "../component/IntegralDiseaseEpicrisis/CardRecipes";
import { VaccinationCalendar } from "../component/IntegralDiseaseEpicrisis/VaccinationCalendar";
import { CardTmReports } from "../component/IntegralDiseaseEpicrisis/CardTmReports";
import { LaboratoryResearchDynamics } from "../component/IntegralDiseaseEpicrisis/LaboratoryResearchDynamics";
import { CardMedicalServices } from "../component/IntegralDiseaseEpicrisis/CardMedicalServices";

export const useVisibleCardsByPosition = (): GroupedByPositionCards => {
  const { registerId, patientId } = useParams<{ registerId: string; patientId: string }>();
  const visibleList = useSelector(selectVisible);
  const [blocksList, setBlocksList] = useState<GroupedByPositionCards>({ top: [], left: [], right: [] });

  useEffect(() => {
    const result: GroupedByPositionCards = { top: [], left: [], right: [] };
    visibleList
      .sort((a, b) => a.sort - b.sort)
      .forEach((item, i) => {
        const sideBudder = (i + 1) % 2 > 0 ? result.left : result.right;
        if (item.confBlockId === NotCustomBlocksEnum.Diagnose) {
          sideBudder.push(
            <CardDiagnose isPreview={item.isPreview} key={item.id} patientId={patientId} registerId={registerId} />
          );
          return;
        } else if (item.confBlockId === NotCustomBlocksEnum.ObjectiveState) {
          sideBudder.push(
            <CardObjectiveState
              isPreview={item.isPreview}
              key={item.id}
              patientId={patientId}
              registerId={registerId}
            />
          );
          return;
        } else if (item.confBlockId === NotCustomBlocksEnum.AnamnesisOfDisease) {
          sideBudder.push(
            <CardAnamnesisOfDisease
              isPreview={item.isPreview}
              key={item.id}
              patientId={patientId}
              registerId={registerId}
            />
          );
          return;
        } else if (item.confBlockId === NotCustomBlocksEnum.AnamnesisOfLife) {
          sideBudder.push(
            <CardAnamnesisOfLife
              isPreview={item.isPreview}
              key={item.id}
              patientId={patientId}
              registerId={registerId}
            />
          );
          return;
        } else if (item.confBlockId === NotCustomBlocksEnum.Immunization) {
          sideBudder.push(
            <CardImmunization isPreview={item.isPreview} key={item.id} patientId={patientId} registerId={registerId} />
          );
          return;
        } else if (item.confBlockId === NotCustomBlocksEnum.ReferencePlan) {
          sideBudder.push(
            <CardReferencePlan isPreview={item.isPreview} key={item.id} patientId={patientId} registerId={registerId} />
          );
          return;
        } else if (item.confBlockId === NotCustomBlocksEnum.Referrals) {
          sideBudder.push(
            <CardReferral isPreview={item.isPreview} key={item.id} patientId={patientId} registerId={registerId} />
          );
          return;
        } else if (item.confBlockId === NotCustomBlocksEnum.InstrumentalAnalysis) {
          sideBudder.push(
            <CardInstrumentalAnalysis
              isPreview={item.isPreview}
              key={item.id}
              patientId={patientId}
              registerId={registerId}
            />
          );
          return;
        } else if (item.confBlockId === NotCustomBlocksEnum.PreferentialMedicationSupply) {
          sideBudder.push(
            <CardPreferentialMedicationSupply key={item.id} patientId={patientId} registerId={registerId} />
          );
          return;
        } else if (item.confBlockId === NotCustomBlocksEnum.Aggregates) {
          sideBudder.push(<CardAggregates key={item.id} patientId={patientId} registerId={registerId} />);
          return;
        } else if (item.confBlockId === NotCustomBlocksEnum.Dispensary) {
          sideBudder.push(
            <CardDispensary isPreview={item.isPreview} key={item.id} patientId={patientId} registerId={registerId} />
          );
          return;
        } else if (item.confBlockId === NotCustomBlocksEnum.MedicalServices) {
          sideBudder.push(
            <CardMedicalServices
              isPreview={item.isPreview}
              key={item.id}
              patientId={patientId}
              registerId={registerId}
            />
          );
          return;
        } else if (item.confBlockId === NotCustomBlocksEnum.Documents) {
          result.top.push(
            <CardDocuments isPreview={item.isPreview} key={item.id} patientId={patientId} registerId={registerId} />
          );
          return;
        } else if (item.confBlockId === NotCustomBlocksEnum.VaccinationCalendar) {
          result.top.push(<VaccinationCalendar key={item.id} patientId={patientId} registerId={registerId} />);
          return;
        } else if (item.confBlockId === NotCustomBlocksEnum.DynamicsLaboratoryResearch) {
          result.top.push(<LaboratoryResearchDynamics key={item.id} patientId={patientId} />);
          return;
        } else if (item.confBlockId === NotCustomBlocksEnum.Recipes) {
          sideBudder.push(
            <CardRecipes isPreview={item.isPreview} key={item.id} patientId={patientId} registerId={registerId} />
          );
          return;
        } else if (item.confBlockId === NotCustomBlocksEnum.TmReports) {
          sideBudder.push(
            <CardTmReports isPreview={item.isPreview} key={item.id} patientId={patientId} registerId={registerId} />
          );
          return;
        } else if (item.confBlockId === NotCustomBlocksEnum.UserBlock) {
          sideBudder.push(
            <CustomBlockCard patientId={patientId} registerId={registerId} key={item.id} visibleCustomBlock={item} />
          );
          return;
        }
      });
    setBlocksList(result);
  }, [patientId, registerId, visibleList]);

  return blocksList;
};

interface GroupedByPositionCards {
  top: ReactNode[];
  left: ReactNode[];
  right: ReactNode[];
}
