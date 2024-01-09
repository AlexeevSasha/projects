import React, { useContext } from "react";
import styled from "styled-components";
import { theme } from "../../assets/theme/theme";
import { ContainerContent } from "../containers/containerContent";
import { DataContext } from "../../core/dataProvider";
import { AllPartners } from "./componentFooter/allPartners";
import { ClubFoundation } from "./componentFooter/clubFoundation";
import { NavigationBlock } from "./componentFooter/navigationBlock";
import { PartnersScrolling } from "./componentFooter/partnersScrolling";
import { PartnersStatic } from "./componentFooter/partnersStatic";
import { SocialNetworks } from "./componentFooter/socialNetworks";

export const Footer = () => {
  const { data: { partners = [], teams = [], shopCategories = { ru: [], en: [] } } = {} } = useContext(DataContext);

  return (
    <Container id="footer">
      <PartnersIconsBlock>
        <PartnersStatic partners={partners} />
        <AllPartners partners={partners} />
        <PartnersScrolling partners={partners} />
      </PartnersIconsBlock>

      <NavigationContainer>
        <StyledLineAfterSwipe />
        <SocialNetworks />
        <StyledLine />
        <NavigationBlock teams={teams} shopCategories={shopCategories} />
        <StyledLineAfterNav />
        <ClubFoundation />
      </NavigationContainer>
    </Container>
  );
};

const Container = styled.footer`
  display: grid;
  grid-auto-rows: auto auto;
  width: 100%;
  background: ${theme.colors.blackLight};
  justify-items: center;
  overflow-x: hidden;
`;

const PartnersIconsBlock = styled.article`
  background: ${theme.colors.blackLight};
  display: grid;
  justify-items: center;
  padding-bottom: 3.33vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-bottom: 3.91vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-bottom: 6.4vw;
  }
`;

const NavigationContainer = styled(ContainerContent)`
  flex-direction: column;
  color: ${theme.colors.gray};
`;
const StyledLineAfterSwipe = styled.hr`
  background: ${theme.colors.grayDark};
  height: 0.05vw;
  border: none;
  width: 100%;
  margin: 0;
  display: none;

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: block;
  }
`;
const StyledLine = styled.hr`
  background: ${theme.colors.grayDark};
  width: 100%;
  height: 0.05vw;
  border: none;
  margin: 1.25vw 0 1.61vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 2.87vw 0 4.3vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: none;
  }
`;
const StyledLineAfterNav = styled.hr`
  width: 100%;
  background: ${theme.colors.grayDark};
  height: 0.05vw;
  border: none;
  margin: 0;
`;
