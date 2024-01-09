import styled from "styled-components";
import { theme } from "../assets/theme/theme";

export const Spacer = styled.div<{ width?: string; height?: string[] }>`
  width: ${({ width }) => width || "auto"};
  height: ${({ height }) => height?.[0] || "auto"};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: ${({ height }) => height?.[1] || "initial"};
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: ${({ height }) => height?.[2] || "initial"};
  }
`;
