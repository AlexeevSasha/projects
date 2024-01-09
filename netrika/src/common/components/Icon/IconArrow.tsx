import { theme } from "common/styles/theme";
import React from "react";
import { styled } from "../../styles/styled";

interface IProps {
  rotate: string;
  color?: string;
  width?: string;
  height?: string;
}

export const IconArrow: React.FC<IProps> = React.memo(({ rotate, color, width, height }) => {
  return (
    <>
      <Svg
        width={width ? width : "8"}
        height={height ? height : "5"}
        viewBox="0 0 8 5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        rotate={rotate}
      >
        <path
          d="M3.9958 2.62753L1.92981 0.726076C1.77291 0.58134 1.55988 0.5 1.33773 0.5C1.11558 0.5 0.902558 0.58134 0.745651 0.726076C0.418116 1.02753 0.418116 1.51448 0.745651 1.81593L3.40792 4.27391C3.73545 4.57536 4.26455 4.57536 4.59208 4.27391L7.25435 1.82366C7.58188 1.52221 7.58188 1.03526 7.25435 0.733806C7.09744 0.589069 6.88442 0.507729 6.66227 0.507729C6.44012 0.507729 6.22709 0.589069 6.07019 0.733806L3.9958 2.62753Z"
          fill={color ? color : theme.colors.green}
        />
      </Svg>
    </>
  );
});

const Svg = styled.svg<{ rotate: string }>`
  transform: rotate(${(props) => props.rotate});
`;
