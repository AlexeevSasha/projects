import React from "react";
import styled from "styled-components";

export const IconTail = () => {
  return (
    <Svg width="14" height="6" viewBox="0 0 14 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.69842 4.88436C6.4474 5.52634 7.5526 5.52634 8.30158 4.88436L14 0H0L5.69842 4.88436Z" fill="#A5ACB8" />
    </Svg>
  );
};
const Svg = styled.svg`
  path {
    fill: ${({ theme }) => theme.colors.gray_grayDark1};
`;
