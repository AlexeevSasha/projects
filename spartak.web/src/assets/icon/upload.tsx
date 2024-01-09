import { DetailedHTMLProps, SVGAttributes } from "react";

type Props = DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement> & { title?: string };

export const UploadIcon = ({ title, ...props }: Props) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <path
        d="M6.71875 6.40539L10 3.125L13.2812 6.40539"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 11.8751V3.12744"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.875 11.875V16.25C16.875 16.4158 16.8092 16.5747 16.6919 16.6919C16.5747 16.8092 16.4158 16.875 16.25 16.875H3.75C3.58424 16.875 3.42527 16.8092 3.30806 16.6919C3.19085 16.5747 3.125 16.4158 3.125 16.25V11.875"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
