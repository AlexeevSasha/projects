import { theme } from "common/styles/theme";
import React from "react";
import { Floatingmes, FloatingmesContainer } from "common/ui/Floatingmes";

interface IProps {
  hideFloatingmes?: boolean;
}

export const IconProfile: React.FC<IProps> = React.memo((props) => {
  return (
    <FloatingmesContainer>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0)">
          <path
            d="M6.74992 8.57569C4.70984 8.57569 3.05 6.91598 3.05 4.8759C3.05 2.83582 4.70984 1.17598 6.74992 1.17598C8.79 1.17598 10.4498 2.83582 10.4498 4.8759C10.4498 6.91598 8.79 8.57569 6.74992 8.57569ZM6.74992 2.20094C5.27491 2.20094 4.07496 3.40075 4.07496 4.8759C4.07496 6.35092 5.27491 7.55072 6.74992 7.55072C8.22493 7.55072 9.42488 6.35092 9.42488 4.8759C9.42488 3.40075 8.22493 2.20094 6.74992 2.20094Z"
            fill={theme.colors.white}
            stroke={theme.colors.white}
            strokeWidth="0.1"
          />
          <path
            d="M1.07496 15.7498V15.7998H1.12496H12.3746H12.4246V15.7498V13.6874C12.4246 12.3159 11.3087 11.2 9.93723 11.2H3.56234C2.19087 11.2 1.07496 12.3159 1.07496 13.6874V15.7498ZM12.9371 16.8248H0.562482C0.279605 16.8248 0.05 16.5952 0.05 16.3123V13.6874C0.05 11.7508 1.6258 10.175 3.56234 10.175H9.93723C11.8738 10.175 13.4496 11.7508 13.4496 13.6874V16.3123C13.4496 16.5952 13.22 16.8248 12.9371 16.8248Z"
            fill={theme.colors.white}
            stroke={theme.colors.white}
            strokeWidth="0.1"
          />
        </g>
        <defs>
          <clipPath id="clip0">
            <rect width="18" height="18" fill={theme.colors.white} />
          </clipPath>
        </defs>
      </svg>
      {props.hideFloatingmes ? null : (
        <Floatingmes style={{ left: "-23px", top: "31px" }} className="floatingmes">
          Профиль
        </Floatingmes>
      )}
    </FloatingmesContainer>
  );
});
