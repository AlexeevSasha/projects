import styled from "styled-components";
import { CustomButton } from "./customButton";
import { theme } from "../../assets/theme/theme";

export const MoreButton = styled(CustomButton)`
  width: fit-content;
  margin: 0 auto 2.08vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 0 auto 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 0 auto 4.27vw;
  }
`;
