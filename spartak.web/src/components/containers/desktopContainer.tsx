import styled from "styled-components";
import { theme } from "../../assets/theme/theme";

export const DesktopContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: none;
  }
`;
