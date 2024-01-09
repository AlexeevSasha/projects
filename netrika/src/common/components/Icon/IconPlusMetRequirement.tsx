import React from "react";
import { styled } from "../../styles/styled";

export const IconPlusMetRequirement: React.FC = React.memo(() => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_1604_49)">
        <path
          d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
          fill="#1DAC06"
        />
        <path
          d="M13.1064 10.979H17.0747V13.2246H13.1064V17.1723H10.8608V13.2246H6.89258V10.979H10.8608V6.97998H13.1064V10.979Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_1604_49">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </Svg>
  );
});

const Svg = styled.svg`
  position: absolute;
  left: -10px;
  top: -10px;
  z-index: 999;
`;
