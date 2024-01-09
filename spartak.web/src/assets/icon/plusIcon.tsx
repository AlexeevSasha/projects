import React from "react";
import styled from "styled-components";
import { theme } from "../theme/theme";

interface IProps {
  onClick: () => void;
}

export const PlusIcon = ({ onClick }: IProps) => {
  return (
    <IconWrapper onClick={onClick}>
      <StyledSVG width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.125 10H16.875" stroke="#A5ACB8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 3.125V16.875" stroke="#A5ACB8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </StyledSVG>
    </IconWrapper>
  );
};
const StyledSVG = styled.svg`
  width: 1.23vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 2.69vw;
    height: 4.69vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 4.27vw;
    height: 4.27vw;
  }
`;
const IconWrapper = styled.div`
  border: 1px solid ${theme.colors.gray};
  height: 1.88vw;
  width: 1.88vw;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background: ${theme.colors.red};
    border: 1px solid ${theme.colors.red};
    ${StyledSVG} {
      path {
        stroke: ${theme.colors.white};
      }
    }
  }
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 4.69vw;
    height: 4.69vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 7.47vw;
    height: 7.47vw;
  }
`;
