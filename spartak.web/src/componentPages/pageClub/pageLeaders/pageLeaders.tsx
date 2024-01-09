import React from "react";
import styled from "styled-components";
import { ILeadership } from "../../../api/dto/ILeadership";
import { theme } from "../../../assets/theme/theme";
import { ContainerContent } from "../../../components/containers/containerContent";
import { NoData } from "../../../components/noData/noData";
import { HoverButton } from "../../../components/personButton";
import { PersonCard } from "../../../components/personCard";

interface IProps {
  leaders?: ILeadership[];
}

export const PageLeaders = ({ leaders }: IProps) => {
  return (
    <Container>
      {leaders?.length ? (
        <LeadersCart>
          {leaders.map((elem, i) => (
            <HoverButton key={i} url={`/leaders/${elem.Id}`}>
              <PersonCard key={i} data={elem} showPosition />
            </HoverButton>
          ))}
        </LeadersCart>
      ) : (
        <NoData />
      )}
    </Container>
  );
};

const Container = styled(ContainerContent)`
  margin-top: 4.17vw;
  margin-bottom: 5.31vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 10.43vw;
    margin-bottom: 10.43vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: 10.67vw;
    margin-bottom: 10.67vw;
  }
`;

const LeadersCart = styled.section`
  width: inherit;
  display: grid;
  grid: auto / repeat(3, 1fr);
  grid-column-gap: 1.25vw;
  grid-row-gap: 2.08vw;
  align-items: flex-start;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: 1fr;
    grid-gap: 4.27vw;
  }
`;
