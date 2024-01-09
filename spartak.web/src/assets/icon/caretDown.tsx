import { DetailedHTMLProps, SVGAttributes } from "react";
import React from "react";

type Props = DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement> & { title?: string };

export const CaretDown = ({ title, ...props }: Props) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <path
        d="M6 8.4707L10 12.4707L14 8.4707"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
