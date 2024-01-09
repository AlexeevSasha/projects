import React from "react";
import { theme } from "../../styles/theme";
import { styled } from "../../styles/styled";

export const IconPlus = React.memo(() => {
  return (
    <Svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      className="bi bi-plus"
      viewBox="0 0 16 16"
    >
      <path
        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
        fill={theme.colors.green}
        stroke={theme.colors.green}
        strokeWidth="0.3"
      />
    </Svg>
  );
});

const Svg = styled.svg`
  path {
    stroke: hsl(0, 0%, 60%);
    fill: hsl(0, 0%, 60%);
  }
  &:hover {
    path {
      fill: hsl(0, 0%, 80%);
      stroke: hsl(0, 0%, 80%);
    }
  }
`;
