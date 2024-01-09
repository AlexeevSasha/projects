import styled from "styled-components";
import { theme } from "../../assets/theme/theme";

export const MobileContainer = styled.div`
  display: none;

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: block;
  }
`;
