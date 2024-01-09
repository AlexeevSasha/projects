import React from "react";
import { styled } from "../../styles/styled";
import { theme } from "../../styles/theme";

export const IconUpdate: React.FC = React.memo(() => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="12" height="14" viewBox="0 0 12 14" fill="none">
      <path
        d="M6 3.18182V5.09091L9 2.54545L6 0V1.90909C2.685 1.90909 0 4.18727 0 7C0 7.99909 0.345 8.92818 0.93 9.71091L2.025 8.78182C1.6875 8.25364 1.5 7.64273 1.5 7C1.5 4.89364 3.5175 3.18182 6 3.18182ZM11.07 4.28909L9.975 5.21818C10.305 5.75273 10.5 6.35727 10.5 7C10.5 9.10636 8.4825 10.8182 6 10.8182V8.90909L3 11.4545L6 14V12.0909C9.315 12.0909 12 9.81273 12 7C12 6.00091 11.655 5.07182 11.07 4.28909Z"
        fill="#808080"
      />
    </Svg>
  );
});

const Svg = styled.svg`
  cursor: pointer;
  path {
    fill: ${theme.colors.hightBlue};
  }
  :hover {
    path {
      fill: ${theme.colors.green};
      // stroke: ${theme.colors.green};
    }
`;
