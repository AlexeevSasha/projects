import { DetailedHTMLProps, SVGAttributes } from "react";
import styled from "styled-components";
import { theme } from "../theme/theme";

type Props = Omit<DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement>, "ref"> & { title?: string };

export const IconMagnifyingGlass = ({ title, ...props }: Props) => {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>

      <path
        d="M10.875 18.75C15.2242 18.75 18.75 15.2242 18.75 10.875C18.75 6.52576 15.2242 3 10.875 3C6.52576 3 3 6.52576 3 10.875C3 15.2242 6.52576 18.75 10.875 18.75Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.4431 16.4438L20.9994 21.0002"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

const Svg = styled.svg`
  font-size: 1vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.66vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 2.6vw;
  }

  @media screen and (max-width: ${theme.rubberSize.phone}) {
    font-size: 5.33vw;
  }
`;
