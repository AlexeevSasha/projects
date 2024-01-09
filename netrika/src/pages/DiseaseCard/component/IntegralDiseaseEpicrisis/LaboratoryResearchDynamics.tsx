import React, { FC } from "react";
import styled from "styled-components";
import { Card } from "common/components/Card/Card";
import { AppSettings } from "../../../../common/constants/appSettings";

interface IProps {
  patientId: string;
}

export const LaboratoryResearchDynamics: FC<IProps> = ({ patientId }) => (
  <Card id={"laboratory_research_dynamics"} title={"Динамика лабораторных исследований"} close={true}>
    <BodyContainer>
      <iframe
        id={"iframe_laboratory_research_dynamics"}
        width="100%"
        height="580px"
        seamless
        frameBorder="0"
        src={`${AppSettings.get("ExlabUI_URL") + patientId}`}
        title="Динамика лабораторных исследований"
      />
    </BodyContainer>
  </Card>
);

const BodyContainer = styled.div`
  margin-top: 40px;
  padding-right: 35px;

  display: flex;
  flex-wrap: wrap;
  overflow: auto;
`;
