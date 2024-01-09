import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Card } from "common/components/Card/Card";
import { IIntegralDiseaseEpicrisisVisible } from "../../../../common/interfaces/IIntegralDiseaseEpicrisisVisible";
import { IntegralDiseaseEpicrisisApiRequest } from "../../../../api/integralDiseaseEpicrisisApiRequest";
import { IDiseaseCardCustomBlock } from "../../../../common/interfaces/IDiseaseCardCustomBlock";
import { SectionAppliedMed } from "./AnamnesisOfDisease/SectionAppliedMed";
import { SectionLaboratoryDiagnostic } from "./AnamnesisOfLife/SectionLaboratoryDiagnostic";
import { DefaultGroup } from "../DefaultGroup";
import { SectionSurgicalIntervention } from "./AnamnesisOfDisease/SectionSurgicalIntervention";
import { SectionInstrumentalResearch } from "./AnamnesisOfLife/SectionInstrumentalResearch";
import { SectionRefferal } from "./SectionRefferal";
import { IconLoading } from "../../../../common/components/Icon/IconLoading";
import styled from "styled-components";

interface IProps {
  visibleCustomBlock: IIntegralDiseaseEpicrisisVisible;
  registerId: string;
  patientId: string;
}

export const CustomBlockCard = ({ visibleCustomBlock, registerId, patientId }: IProps) => {
  const [customBlock, setCustomBlock] = useState<IDiseaseCardCustomBlock>({} as IDiseaseCardCustomBlock);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    return () => setCustomBlock({} as IDiseaseCardCustomBlock);
  }, []);

  const clickCustomBlock = useCallback(async (registerId: number, id: string, orderConfBlockId: number) => {
    setLoading(true);
    try {
      const result = await new IntegralDiseaseEpicrisisApiRequest().getCustomBlocks(registerId, id, orderConfBlockId);
      if (result.isError) {
        throw result;
      }
      setLoading(false);
      setCustomBlock(result.result);
    } catch (error) {
      setLoading(false);
    }
  }, []);

  const render = useMemo(() => {
    if (!customBlock || !customBlock.groups?.length) return null;

    const data = customBlock.groups.map((group) => {
      switch (group.name) {
        case "observation": {
          return <DefaultGroup items={group.items} isObservation />;
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
        case "referral": {
          return <SectionRefferal items={group.items} display={group.display} />;
        }

        default:
          return null;
      }
    });

    return <Container>{data}</Container>;
  }, [customBlock]);

  return (
    <Card
      key={visibleCustomBlock.id}
      id={`${visibleCustomBlock.id}`}
      title={visibleCustomBlock.blockName}
      max_height={600}
      overflowY={"scroll"}
      onClick={() => clickCustomBlock(Number(registerId), patientId, visibleCustomBlock.id)}
    >
      {loading ? <IconLoading /> : render}
    </Card>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
