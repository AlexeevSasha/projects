import { theme } from "common/styles/theme";
import React from "react";
import { styled } from "../../styles/styled";

export const IconGroupCross: React.FC = React.memo(() => {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="20" height="20" fill="white" />
      <rect x="0.5" y="0.5" width="19" height="19" rx="2.5" fill={theme.colors.green} stroke={theme.colors.green} />
      <g clipPath="url(#clip0)">
        <path
          d="M10.7252 9.93017L10.6545 10.0009L10.7252 10.0716L14.2644 13.6105L14.2644 13.6106C14.4452 13.7912 14.4452 14.0843 14.2644 14.2649L14.2644 14.265C14.1739 14.3554 14.0556 14.4006 13.9372 14.4006C13.8187 14.4006 13.7004 14.3554 13.6099 14.265L10.0708 10.7258L10.0001 10.6551L9.92939 10.7258L6.39006 14.265C6.29961 14.3554 6.18128 14.4006 6.06284 14.4006C5.94439 14.4006 5.82603 14.3554 5.73556 14.2651C5.5548 14.0845 5.55481 13.7914 5.73559 13.6108L5.73562 13.6107L9.27495 10.0716L9.34566 10.0009L9.27495 9.93017L5.73562 6.39103L5.73559 6.391C5.5548 6.21037 5.5548 5.91727 5.73559 5.73663L5.73562 5.7366C5.91645 5.55577 6.20923 5.55577 6.39006 5.7366L6.39006 5.7366L9.92939 9.27574L10.0001 9.34645L10.0708 9.27574L13.6099 5.7366C13.7908 5.55577 14.0835 5.55577 14.2644 5.7366L14.2644 5.73663C14.4452 5.91727 14.4452 6.21037 14.2644 6.391L14.2644 6.39103L10.7252 9.93017Z"
          fill={theme.colors.white}
          stroke={theme.colors.white}
          strokeWidth="0.2"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="9" height="9" fill={theme.colors.green} transform="translate(5.5 5.5)" />
        </clipPath>
      </defs>
    </Svg>
  );
});

const Svg = styled.svg`
  cursor: pointer;
`;
