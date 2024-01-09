import React from "react";
import styled from "styled-components";
import { theme } from "../../../assets/theme/theme";
import { AboutInfrasctructure } from "./aboutInfrasctructure";
import { IAcademyInfrastructure } from "../../../api/dto/IAcademyInfrastructure";
import { CMS } from "../../../modules/cms/components/cms";
import { DescriptionInfrastructure } from "./descriptionInfrastructure";

export type InfrastructureProps = {
  infrastructure: IAcademyInfrastructure;
};

export const Infrastructure = ({ infrastructure }: InfrastructureProps) => {
  return (
    <Content>
      <AboutInfrasctructure about={infrastructure.about} />
      <CMS.Banner banner={infrastructure.redBlock} />
      <DescriptionInfrastructure description={infrastructure.description} />
    </Content>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4.17vw 8.75vw;
  color: ${({ theme }) => theme.colors.white_black};
  font-family: "FCSM Text", sans-serif;
  font-weight: 500;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 5.22vw 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 7.2vw 4.27vw;
  }
`;
