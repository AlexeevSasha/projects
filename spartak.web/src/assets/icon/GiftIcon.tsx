import React, { DetailedHTMLProps, SVGAttributes } from "react";

type Props = DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement> & { title?: string };

export const GiftIcon = ({ title, ...props }: Props) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <path
        d="M20.25 7.5H3.75C3.33579 7.5 3 7.83579 3 8.25V11.25C3 11.6642 3.33579 12 3.75 12H20.25C20.6642 12 21 11.6642 21 11.25V8.25C21 7.83579 20.6642 7.5 20.25 7.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.5 12V18.75C19.5 18.9489 19.421 19.1397 19.2803 19.2803C19.1397 19.421 18.9489 19.5 18.75 19.5H5.25C5.05109 19.5 4.86032 19.421 4.71967 19.2803C4.57902 19.1397 4.5 18.9489 4.5 18.75V12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 7.5V19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M16.2426 6.43969C15.182 7.50035 12 7.50035 12 7.50035C12 7.50035 12 4.31837 13.0607 3.25771C13.4827 2.83615 14.0549 2.59944 14.6514 2.59961C15.2479 2.59978 15.8199 2.83682 16.2417 3.25862C16.6635 3.68042 16.9006 4.25245 16.9007 4.84897C16.9009 5.44548 16.6642 6.01765 16.2426 6.43969V6.43969Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.75735 6.43969C8.81801 7.50035 12 7.50035 12 7.50035C12 7.50035 12 4.31837 10.9393 3.25771C10.5173 2.83615 9.94512 2.59944 9.3486 2.59961C8.75209 2.59978 8.18005 2.83682 7.75825 3.25862C7.33645 3.68042 7.09941 4.25245 7.09924 4.84897C7.09907 5.44548 7.33579 6.01765 7.75735 6.43969V6.43969Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
