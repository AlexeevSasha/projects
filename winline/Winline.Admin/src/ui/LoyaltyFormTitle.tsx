import styled from "styled-components";

export const LoyaltyFormTitle = styled.div<{widthDT?: string}>`
  width: ${({widthDT}) => widthDT};
  font-size: 14px;
  font-weight: 600;
  @media (max-width: 1000px) {
    width: inherit;
  }
`;
