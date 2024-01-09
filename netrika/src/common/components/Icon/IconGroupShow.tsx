import { theme } from "common/styles/theme";
import React from "react";
import { styled } from "../../styles/styled";

export const IconGroupShow: React.FC = React.memo(() => {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.5 3C0.5 1.61929 1.61929 0.5 3 0.5H17C18.3807 0.5 19.5 1.61929 19.5 3V17C19.5 18.3807 18.3807 19.5 17 19.5H3C1.61929 19.5 0.5 18.3807 0.5 17V3Z"
        stroke={theme.colors.hightBlue}
      />
      <path
        d="M0.5 3C0.5 1.61929 1.61929 0.5 3 0.5H17C18.3807 0.5 19.5 1.61929 19.5 3V17C19.5 18.3807 18.3807 19.5 17 19.5H3C1.61929 19.5 0.5 18.3807 0.5 17V3Z"
        stroke={theme.colors.green}
      />
      <path
        d="M10.7852 9.73047H15.6133V11.3477H10.7852V16.3398H9.15625V11.3477H4.35156V9.73047H9.15625V4.71484H10.7852V9.73047Z"
        fill={theme.colors.green}
      />
    </Svg>
  );
});

const Svg = styled.svg`
  cursor: pointer;
`;
