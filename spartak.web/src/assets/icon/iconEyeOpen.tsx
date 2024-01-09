import React, { DetailedHTMLProps, SVGAttributes } from "react";

type Props = DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement> & { title?: string };

export const IconEyeOpen = ({ title, ...props }: Props) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>

      <path
        d="M12 5.24951C4.5 5.24951 1.5 12.0002 1.5 12.0002C1.5 12.0002 4.5 18.7495 12 18.7495C19.5 18.7495 22.5 12.0002 22.5 12.0002C22.5 12.0002 19.5 5.24951 12 5.24951Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
