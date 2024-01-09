import React from "react";
import styled from "styled-components";
import { theme } from "../../assets/theme/theme";

interface IProps {
  sizeSteps: [string, string, string];
}

export const PaginationSize = ({ sizeSteps }: IProps) => {
  return (
    <Container>
      <span>Показать по:</span>
      {sizeSteps.map((size) => (
        <StepSize key={size}>{size}</StepSize>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  font-size: 0.83vw;
  column-gap: 0.63vw;
  white-space: nowrap;
  color: ${theme.colors.gray};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.8vw;
  }
`;

const StepSize = styled.span`
  cursor: pointer;
  &:hover {
    color: ${theme.colors.red};
  }
`;
