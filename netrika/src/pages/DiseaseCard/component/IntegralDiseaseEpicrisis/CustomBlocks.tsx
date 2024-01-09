import { selectCustomBlocks } from "module/diseaseCardEpicrisis/diseaseCardEpicrisisSelector";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Card } from "common/components/Card/Card";
import { DefaultGroup } from "../DefaultGroup";
import { SectionAppliedMed } from "./AnamnesisOfDisease/SectionAppliedMed";
import { SectionSurgicalIntervention } from "./AnamnesisOfDisease/SectionSurgicalIntervention";
import { SectionInstrumentalResearch } from "./AnamnesisOfLife/SectionInstrumentalResearch";
import { SectionLaboratoryDiagnostic } from "./AnamnesisOfLife/SectionLaboratoryDiagnostic";
import { IDiseaseCardCustomBlock } from "../../../../common/interfaces/IDiseaseCardCustomBlock";

interface IProps {
  MedicalCareCaseCardCustomBlocks?: IDiseaseCardCustomBlock[];
}

export const CustomBlocks = ({ MedicalCareCaseCardCustomBlocks }: IProps) => {
  const { customBlocks } = useSelector(selectCustomBlocks);
  const currentBlock = MedicalCareCaseCardCustomBlocks ? MedicalCareCaseCardCustomBlocks : customBlocks;

  const blocks = useMemo(() => {
    if (currentBlock)
      return currentBlock.map((block) => (
        <Card key={block.id} id={`${block.id}`} title={block.description} max_height={600} overflowY={"scroll"}>
          {block.groups.map((group) => {
            switch (group.name) {
              case "observation": {
                return <DefaultGroup items={group.items} />;
              }
              case "instrumentalResearchUsed": {
                return <SectionInstrumentalResearch instance={group.items[0]} display={group.display} />;
              }
              case "laboratoryDiagnosticUsed": {
                return <SectionLaboratoryDiagnostic items={group.items} display={group.display} />;
              }
              case "surgicalInterventionUsed": {
                return <SectionSurgicalIntervention items={group.items} display={group.display} />;
              }
              case "medUsed": {
                return <SectionAppliedMed items={group.items} display={group.display} />;
              }

              case "instrumentalResearchPrescribed": {
                return <SectionInstrumentalResearch instance={group.items[0]} display={group.display} />;
              }
              case "laboratoryDiagnosticPrescribed": {
                return <SectionLaboratoryDiagnostic items={group.items} display={group.display} />;
              }
              case "surgicalInterventionPrescribed": {
                return <SectionSurgicalIntervention items={group.items} display={group.display} />;
              }
              case "medPrescribed": {
                return <SectionAppliedMed items={group.items} display={group.display} />;
              }

              default:
                return null;
            }
          })}
        </Card>
      ));
    return null;
  }, [currentBlock]);

  return <>{blocks}</>;
};
