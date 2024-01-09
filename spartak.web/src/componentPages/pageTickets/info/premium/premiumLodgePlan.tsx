import React from "react";
import styled from "styled-components";
import { theme } from "../../../../assets/theme/theme";
import { ContainerContent } from "../../../../components/containers/containerContent";
import { NextImage } from "../../../../ui/nextImage/nextImage";

export const PremiumLodgePlan = () => {
  return (
    <ContainerContent>
      <StyledPlan ><NextImage src="/images/tickets/premium/planLight_v1.0.0.png" /></StyledPlan>
    </ContainerContent>
  );
};

const StyledPlan = styled.section`  
  height: 26.3vw;
  width: 100%;
  margin-bottom: 5.21vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 10.43vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 10.67vw;
  }
`;
