import styled from "astroturf/react";
import { DetailedHTMLProps, RefObject, SVGAttributes } from "react";

type Props = DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement> & {
  ref?: ((instance: SVGSVGElement | null) => void) | RefObject<SVGSVGElement> | null;
  name: string;
  color?: string;
  set?: string;
  width?: string;
  height?: string;
  viewBox?: string;
};

export const Icon = ({
  name,
  set = "icons",
  width = "24",
  height = "24",
  viewBox = "0 0 24 24",
  ...props
}: Props) => {
  return (
    <Svg width={width} height={height} fill="none" viewBox={viewBox} {...props}>
      <use xlinkHref={`/icons/${set}.svg#${name}`} />
    </Svg>
  );
};

const Svg = styled.svg<{ color?: string }>`
  display: block;
`;
