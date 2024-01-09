import styled from "styled-components";
import { theme } from "../assets/theme/theme";

export const UploadDesc = styled.span<{ width?: number }>`
  color: ${theme.colors.middleGray};
  ${(props) => props?.width && `width: ${props?.width}px`};
`;
