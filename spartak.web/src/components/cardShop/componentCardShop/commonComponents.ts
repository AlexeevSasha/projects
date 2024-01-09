import styled from "styled-components";
import { theme } from "../../../assets/theme/theme";

export const LikeContainer = styled.div`
  position: absolute;

  top: 0.83vw;
  right: 0.83vw;
  z-index: 10;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 3.13vw;
    height: 3.13vw;

    top: 2.09vw;
    right: 2.09vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 6.4vw;
    height: 6.4vw;
    top: 2.09vw;
    right: 2.09vw;
  }
`;
