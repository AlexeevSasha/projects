import React, { DetailedHTMLProps, SVGAttributes } from "react";

type Props = DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement> & { title?: string; selected?: boolean };

export const RadioIcon = ({ title, selected, ...props }: Props) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>

      <rect x="1" y="1" width="18" height="18" rx="9" stroke={selected ? "#CC122D" : "#A5ACB8"} strokeWidth="2" />
      {selected && <rect x="5" y="5" width="10" height="10" rx="5" fill="#CC122D" />}
    </svg>
  );
};
