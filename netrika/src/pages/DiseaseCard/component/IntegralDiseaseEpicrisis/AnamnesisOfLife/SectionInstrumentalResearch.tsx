import { IInstrumentalResearchHistory } from "common/interfaces/IInstrumentalResearchHistory";
import React, { FC } from "react";
import { DefaultGroup } from "../../DefaultGroup";
import { InstrResearchGroup } from "./InstrumentalResearch/InstrResearchGroup";
import { SurgicalInterventionGroup } from "./InstrumentalResearch/SurgicalInterventionGroup";
import { Accordion } from "../../../../../common/components/Accordion/Accordion";
import styled from "styled-components";

interface IProps {
  display: string;
  instance: IInstrumentalResearchHistory;
  isPreview?: boolean;
}

export const SectionInstrumentalResearch: FC<IProps> = ({
  display = "Инструментальное исследование",
  instance,
  isPreview,
}) => {
  const showInstance = instance?.instrResearch?.length || instance?.observations?.length || instance?.services?.length;

  if (!showInstance) return null;
  return (
    <Accordion isActive={isPreview} onlyBorderContent title={display}>
      <Container>
        <DefaultGroup items={instance?.observations} />
        <InstrResearchGroup items={instance?.instrResearch} />
        <SurgicalInterventionGroup items={instance?.services} />
      </Container>
    </Accordion>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
