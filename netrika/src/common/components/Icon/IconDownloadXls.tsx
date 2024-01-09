import { styled } from "common/styles/styled";
import { theme } from "common/styles/theme";
import React from "react";

export const IconDownloadXls = React.memo(() => {
  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="path-1-inside-1_7288_24052" fill="white">
        <path d="M1 14.1172V15.9995H15V14.1172H1Z" />
      </mask>
      <path
        d="M1 14.1172V10.1172H-3V14.1172H1ZM1 15.9995H-3V19.9995H1V15.9995ZM15 15.9995V19.9995H19V15.9995H15ZM15 14.1172H19V10.1172H15V14.1172ZM-3 14.1172V15.9995H5V14.1172H-3ZM1 19.9995H15V11.9995H1V19.9995ZM19 15.9995V14.1172H11V15.9995H19ZM15 10.1172H1V18.1172H15V10.1172Z"
        fill={theme.colors.hightBlue}
        mask="url(#path-1-inside-1_7288_24052)"
      />
      <path
        d="M6.04315 7.64706H7V5.64706V2H9V5.64706V7.64706H9.95685L8 9.4888L6.04315 7.64706Z"
        stroke={theme.colors.hightBlue}
        strokeWidth="4"
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
      stroke: ${theme.colors.green};
    }
`;
