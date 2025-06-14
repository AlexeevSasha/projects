import { theme } from "common/styles/theme";
import React from "react";

export const IconCheck: React.FC<{ disabled?: boolean }> = React.memo(({ disabled = false }) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="0.5"
        y="0.5"
        width="15"
        height="15"
        rx="1.5"
        fill={disabled ? theme.colors.gray : theme.colors.white}
        stroke={disabled ? theme.colors.gray : theme.colors.green}
      />
      <path
        d="M3.91308 7.03516H3.91326C3.99256 7.03525 4.07081 7.05331 4.14213 7.08798C4.21341 7.12262 4.27591 7.17295 4.32497 7.2352L3.91308 7.03516ZM3.91308 7.03516H3.09394C2.89031 7.03516 2.7766 7.26975 2.90232 7.4292L2.90237 7.42927L6.11214 11.4957L6.11218 11.4957C6.32247 11.7619 6.72568 11.7611 6.93667 11.4962L6.93708 11.4957L12.6597 4.24398C12.6598 4.24377 12.66 4.24357 12.6602 4.24336C12.7884 4.08293 12.6699 3.85 12.4689 3.85H11.6498C11.4894 3.85 11.3367 3.9235 11.2376 4.05044C11.2375 4.05055 11.2374 4.05066 11.2373 4.05077L6.52403 10.0216M3.91308 7.03516L6.52403 10.0216M6.52403 10.0216L4.32506 7.23531L6.52403 10.0216Z"
        fill={disabled ? theme.colors.white : theme.colors.green}
        stroke={theme.colors.white}
        strokeWidth="0.3"
      />
    </svg>
  );
});
