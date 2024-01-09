import { theme } from "common/styles/theme";
import React from "react";

export const IconFence: React.FC = () => {
  return (
    <svg width="6" height="16" viewBox="0 0 6 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 1L2 15C2 15.55 1.55 16 1 16C0.45 16 0 15.55 0 15L0 1C0 0.45 0.45 0 1 0C1.55 0 2 0.45 2 1ZM6 1L6 15C6 15.55 5.55 16 5 16C4.45 16 4 15.55 4 15L4 1C4 0.45 4.45 0 5 0C5.55 0 6 0.45 6 1Z"
        fill={theme.colors.grayBlue}
      />
    </svg>
  );
};
