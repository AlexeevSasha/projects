import styled from "styled-components";
import { theme } from "../theme/theme";

interface IProps {
  rotate?: string;
  size?: "sm" | "md";
}

export const IconArrowDown = (props: IProps) => {
  return (
    <Svg
      viewBox="0 0 12 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={props.rotate ? { transform: `rotate(${props.rotate})` } : {}}
      size={props.size || "sm"}
    >
      <path d="M11 1L6 6L1 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
};

const sizeWidth = {
  desktop: { sm: "0.52vw", md: "0.78vw" },
  tablet: { sm: "1.96vw", md: "1.96vw" },
  mobile: { sm: "4vw", md: "4vw" },
};

const sizeHeight = {
  desktop: { sm: "0.26vw", md: "0.39vw" },
  tablet: { sm: "0.91vw", md: "0.98vw" },
  mobile: { sm: "1.87vw", md: "2vw" },
};

const Svg = styled.svg<{ size: "sm" | "md" }>`
  transition: all 0.2s ease-in-out;
  width: ${(props) => sizeWidth.desktop[props.size]};
  height: ${(props) => sizeHeight.desktop[props.size]};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: ${(props) => sizeWidth.tablet[props.size]};
    height: ${(props) => sizeHeight.tablet[props.size]};
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: ${(props) => sizeWidth.mobile[props.size]};
    height: ${(props) => sizeHeight.mobile[props.size]};
  }
`;
