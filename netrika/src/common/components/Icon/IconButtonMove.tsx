import { theme } from "common/styles/theme";
import React from "react";
import { CSSProperties } from "styled-components";

interface IProps {
  color?: string;
  rotate?: CSSProperties;
}

export const IconButtonMove: React.FC<IProps> = React.memo((props) => {
  return (
    <svg style={props.rotate} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="0.5"
        y="0.5"
        width="15"
        height="15"
        rx="1.5"
        fill="white"
        stroke={props.color ? props.color : theme.colors.green}
      />
      <path
        fill={props.color ? props.color : theme.colors.green}
        d="M7.9958 8.12753L5.92981 6.22608C5.77291 6.08134 5.55988 6 5.33773 6C5.11558 6 4.90256 6.08134 4.74565 6.22608C4.41812 6.52753 4.41812 7.01448 4.74565 7.31593L7.40792 9.77391C7.73545 10.0754 8.26455 10.0754 8.59208 9.77391L11.2543 7.32366C11.5819 7.02221 11.5819 6.53526 11.2543 6.23381C11.0974 6.08907 10.8844 6.00773 10.6623 6.00773C10.4401 6.00773 10.2271 6.08907 10.0702 6.23381L7.9958 8.12753Z"
      />
    </svg>
  );
});
