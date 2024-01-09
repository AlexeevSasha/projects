import React, { DetailedHTMLProps, SVGAttributes } from "react";
import styled from "styled-components";
import { theme } from "../theme/theme";

type Props = Omit<DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement>, "ref"> & { title?: string };

export const WarningTriangle = ({ title, ...props }: Props) => {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <path d="M12 9.75V13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M10.8014 4.69435L3.18631 17.9116C3.06446 18.1231 3.0002 18.3631 3 18.6075C2.9998 18.8518 3.06366 19.092 3.18516 19.3037C3.30667 19.5153 3.48152 19.6912 3.69214 19.8134C3.90275 19.9356 4.1417 20 4.38494 20H19.6151C19.8583 20 20.0972 19.9356 20.3079 19.8134C20.5185 19.6912 20.6933 19.5153 20.8148 19.3037C20.9363 19.092 21.0002 18.8518 21 18.6075C20.9998 18.3631 20.9355 18.1231 20.8137 17.9116L13.1986 4.69435C13.077 4.4832 12.9022 4.30789 12.6918 4.18602C12.4814 4.06415 12.2428 4 12 4C11.7572 4 11.5186 4.06415 11.3082 4.18602C11.0978 4.30789 10.923 4.4832 10.8014 4.69435V4.69435Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 18C12.6213 18 13.125 17.4963 13.125 16.875C13.125 16.2537 12.6213 15.75 12 15.75C11.3787 15.75 10.875 16.2537 10.875 16.875C10.875 17.4963 11.3787 18 12 18Z"
        fill="currentColor"
      />
    </Svg>
  );
};

const Svg = styled.svg`
  flex-shrink: 0;
  color: ${theme.colors.pink};
  font-size: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.phone}) {
    font-size: 6.4vw;
  }
`;
