import { DetailedHTMLProps, SVGAttributes } from "react";

type Props = DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement> & { title?: string };

export const CaretRight = ({ title, ...props }: Props) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <path d="M6 3L11 8L6 13" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
