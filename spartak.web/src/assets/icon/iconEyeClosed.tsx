import React, { DetailedHTMLProps, SVGAttributes } from "react";

type Props = DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement> & { title?: string };

export const IconEyeClosed = ({ title, ...props }: Props) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>

      <path
        d="M18.8579 11.9346L20.9963 15.6384"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.4546 13.9937L15.1215 17.7759"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.53714 13.9917L8.87012 17.7746"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.13823 11.9316L2.9895 15.6533"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 9.83203C4.57617 11.783 7.4657 14.25 12.0001 14.25C16.5344 14.25 19.4239 11.783 21.0001 9.83205"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
