import styled from "styled-components";
import { theme } from "../../assets/theme/theme";

export const TabletContainer = styled.div`
  display: none;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: flex;
    width: 100%;
  }
`;
