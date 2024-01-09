import React from "react";
import { styled } from "../../styles/styled";

interface IProps {
  rotate: string;
  color?: string;
}

export const IconShevron: React.FC<IProps> = React.memo(({ rotate, color }) => {
  return (
    <>
      <Svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg" rotate={rotate}>
        <path
          d="M0.863118 11.5791C0.701877 11.4178 0.701877 11.1558 0.863118 10.9946L6.01273 5.85504L0.863118 0.705426C0.701877 0.544186 0.701877 0.282171 0.863118 0.12093C1.02436 -0.0403101 1.28637 -0.0403101 1.44761 0.12093L6.8794 5.55271C6.96002 5.63333 7.00033 5.73411 7.00033 5.84496C7.00033 5.94574 6.96002 6.05659 6.8794 6.13721L1.44761 11.569C1.28637 11.7403 1.02436 11.7403 0.863118 11.5791Z"
          fill={color}
        />
      </Svg>
    </>
  );
});

const Svg = styled.svg<{ rotate: string }>`
  transform: rotate(${(props) => props.rotate});
`;
