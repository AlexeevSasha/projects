import React from "react";
import styled from "styled-components";
import { theme } from "../../../../assets/theme/theme";
import { ContainerContent } from "../../../../components/containers/containerContent";
import { NextImage } from "../../../../ui/nextImage/nextImage";

export const SectorPlane = () => {
  return (
    <ContainerContent>
      <StyledPlan ><NextImage src="/images/tickets/familySector/darkThemePlan_v1.0.0.png" /></StyledPlan>
    </ContainerContent>
  );
};

const StyledPlan = styled.section`  
  height: 367px;
  width: 100%;
  margin: 0 12.5vw 5.21vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 30.64vw;
    margin: 0 0 10.43vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 29.87vw;
    margin-bottom: 10.67vw;
  }
`;
