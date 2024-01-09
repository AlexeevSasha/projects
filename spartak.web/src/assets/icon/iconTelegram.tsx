import styled from "styled-components";
import { theme } from "../theme/theme";

export const IconTelegram = () => {
  return (
    <Svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.87503 10.537L13.8998 16.7188C13.9811 16.7903 14.0796 16.8395 14.1856 16.8615C14.2916 16.8836 14.4015 16.8777 14.5045 16.8445C14.6076 16.8112 14.7002 16.7518 14.7734 16.672C14.8466 16.5922 14.8977 16.4948 14.9219 16.3892L17.8605 3.56637C17.8859 3.4555 17.8806 3.3398 17.8451 3.23174C17.8096 3.12368 17.7453 3.02735 17.6591 2.95314C17.5729 2.87892 17.4681 2.82963 17.356 2.81059C17.2438 2.79154 17.1286 2.80345 17.0228 2.84504L2.60425 8.50945C2.47859 8.55882 2.37229 8.64755 2.30126 8.76236C2.23023 8.87718 2.1983 9.01191 2.21022 9.14639C2.22215 9.28087 2.27731 9.40788 2.36744 9.5084C2.45756 9.60892 2.57782 9.67755 2.71021 9.70403L6.87503 10.537Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.875 10.5374L17.5088 2.85742"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.3834 13.6245L7.94194 16.0659C7.85453 16.1533 7.74317 16.2128 7.62193 16.2369C7.50069 16.2611 7.37503 16.2487 7.26082 16.2014C7.14662 16.1541 7.04901 16.074 6.98033 15.9712C6.91166 15.8684 6.875 15.7476 6.875 15.624V10.5371"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

const Svg = styled.svg`
  width: 1.25vw;
  height: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 3.13vw;
    height: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 6.4vw;
    height: 6.4vw;
  }
`;
