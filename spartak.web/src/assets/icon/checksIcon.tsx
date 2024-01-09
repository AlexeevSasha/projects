import React, { DetailedHTMLProps, SVGAttributes } from "react";

type Props = DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement> & { title?: string };

export const ChecksIcon = ({ title, ...props }: Props) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <path
        d="M20.25 6.75L9.75 17.2495L4.5 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
