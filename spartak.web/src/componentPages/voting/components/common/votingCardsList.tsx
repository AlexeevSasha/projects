import styled from "styled-components";
import { theme } from "../../../../assets/theme/theme";

export const VotingCardsList = styled.div<{ row: number }>`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  grid-row-gap: 2.08vw;
  grid-column-gap: 1.25vw;

  margin-bottom: 4.17vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 8.34vw;
    grid-row-gap: 3.13vw;
    grid-column-gap: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 10.67vw;
    grid-row-gap: 6.4vw;
    grid-column-gap: 2.13vw;
    align-items: flex-end;
  }
`;
