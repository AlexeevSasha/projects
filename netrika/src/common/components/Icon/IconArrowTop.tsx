import { theme } from "common/styles/theme";
import React from "react";

interface IProps {
  width?: number;
  height?: number;
}

export const IconArrowTop = React.memo((props: IProps) => {
  return (
    <svg
      width={props.width ? props.width : 24}
      height={props.height ? props.height : 32}
      viewBox="0 0 24 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.08839 10.4516C0.637202 10.8875 0.637202 11.6131 1.08839 12.0643C1.52434 12.5002 2.2499 12.5002 2.68484 12.0643L10.8622 3.88695L10.8622 30.871C10.8632 31.5 11.3631 32 11.9922 32C12.6212 32 13.1374 31.5 13.1374 30.871L13.1374 3.88695L21.2995 12.0643C21.7507 12.5002 22.4773 12.5002 22.9122 12.0643C23.3634 11.6131 23.3634 10.8865 22.9122 10.4516L12.799 0.338392C12.3631 -0.112797 11.6375 -0.112797 11.2026 0.338392L1.08839 10.4516Z"
        fill={theme.colors.green}
      />
    </svg>
  );
});
