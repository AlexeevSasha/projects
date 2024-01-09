import React from "react";
import { styled } from "../../styles/styled";

export const IconIndicator: React.FC = React.memo(() => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="12" fill="#EC2222" />
      <path
        d="M10.7969 4.49902L10.9688 14.8652H13.0205L13.1924 4.49902H10.7969ZM11.9893 20.1611C12.7949 20.1611 13.4072 19.5596 13.4072 18.7754C13.4072 17.9912 12.7949 17.3896 11.9893 17.3896C11.2051 17.3896 10.582 17.9912 10.582 18.7754C10.582 19.5596 11.2051 20.1611 11.9893 20.1611Z"
        fill="white"
      />
    </Svg>
  );
});

const Svg = styled.svg`
  position: absolute;
  right: -10px;
  top: -10px;
  z-index: 999;
`;
