import { DetailedHTMLProps, SVGAttributes } from "react";
import React from "react";

type Props = DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement> & { title?: string };

export const CalendarIcon = ({ title, ...props }: Props) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <path
        d="M19.5 3.75H4.5C4.08579 3.75 3.75 4.08579 3.75 4.5V19.5C3.75 19.9142 4.08579 20.25 4.5 20.25H19.5C19.9142 20.25 20.25 19.9142 20.25 19.5V4.5C20.25 4.08579 19.9142 3.75 19.5 3.75Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M16.5 2.25V5.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.5 2.25V5.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.75 8.25H20.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
