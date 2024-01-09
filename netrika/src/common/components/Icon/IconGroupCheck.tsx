import { theme } from "common/styles/theme";
import React from "react";
import { styled } from "../../styles/styled";

export const IconGroupCheck: React.FC = React.memo(() => {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.5 3C0.5 1.61929 1.61929 0.5 3 0.5H17C18.3807 0.5 19.5 1.61929 19.5 3V17C19.5 18.3807 18.3807 19.5 17 19.5H3C1.61929 19.5 0.5 18.3807 0.5 17V3Z"
        fill={theme.colors.green}
        stroke={theme.colors.green}
      />
      <path
        d="M13.2485 6L8.49845 10.9989L6.65201 9.0559L5.2002 10.5841L8.49847 14.0555L14.7002 7.52823L13.2485 6Z"
        fill={theme.colors.white}
      />
    </Svg>
  );
});

const Svg = styled.svg`
  cursor: pointer;
`;
