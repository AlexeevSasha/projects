import React from "react";
import styled from "styled-components";
import { theme } from "../theme/theme";

interface IProps {
  ds?: string;
  ts?: string;
  ms?: string;
}

export const IconRedPoint = (props: IProps) => {
  return (
    <Svg {...props} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="20" fill="#CC122D" fillOpacity="0.1" />
      <circle cx="20" cy="20" r="8" fill="#C8122D" />
    </Svg>
  );
};

const Svg = styled.svg<{ ds?: string; ts?: string; ms?: string }>`
  width: ${(props) => (props.ds ? props.ds : "2.08vw")};
  height: ${(props) => (props.ds ? props.ds : "2.08vw")};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: ${(props) => (props.ts ? props.ts : "3.13vw")};
    width: ${(props) => (props.ts ? props.ts : "3.13vw")};
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: ${(props) => (props.ts ? props.ms : "6.4vw")};
    width: ${(props) => (props.ts ? props.ms : "6.4vw")};
  }
`;
