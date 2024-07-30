import styled from "styled-components";

export const FiltersHeader = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 16px;
  grid-gap: 16px;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;
