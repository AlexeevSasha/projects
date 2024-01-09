import React from "react";
import styled from "styled-components";
import { theme } from "../theme/theme";

export const IconVkColored = () => {
  return (
    <Svg width="24" height="14" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.0023 14C5.33301 14 0.958636 8.74472 0.776367 0H4.61803C4.74422 6.4184 7.57632 9.13711 9.81962 9.69767V0H13.4371V5.53552C15.6524 5.29728 17.9795 2.77477 18.7647 0H22.3821C21.7792 3.41941 19.2555 5.94192 17.4608 6.97896C19.2555 7.81979 22.1298 10.02 23.2234 14H19.2414C18.3862 11.3373 16.2552 9.27725 13.4371 8.99697V14H13.0023Z"
        fill="#0077FF"
      />
    </Svg>
  );
};

const Svg = styled.svg`
  height: 1.25vw;
  width: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 3.13vw;
    width: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 6.4vw;
    width: 6.4vw;
  }
`;
