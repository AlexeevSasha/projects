import { DetailedHTMLProps, RefObject, SVGAttributes } from "react";
import styled from "styled-components";
import { theme } from "../theme/theme";

type IProps = DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement> & {
  rotate?: string;
  disabled?: boolean;
  ref?: ((instance: SVGSVGElement | null) => void) | RefObject<SVGSVGElement> | null;
};

export const IconArrowRight = ({ rotate, disabled, ...props }: IProps) => {
  return (
    <Svg
      disabled={disabled}
      style={{ transform: `rotate(${rotate})` }}
      viewBox="0 0 21 20"
      fill="none"
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3.625 10H17.375" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.75 4.375L17.375 10L11.75 15.625" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
};

const Svg = styled.svg<{ rotate?: boolean; disabled?: boolean }>`
  width: 1.25vw;
  height: 1.25vw;

  path {
    stroke: ${(props) => (props.disabled ? props.theme.colors.grayDark_gray1 : props.theme.colors.grayLight_grayDark)};
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 3.13vw;
    height: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 5.33vw;
    height: 5.33vw;
  }
`;
