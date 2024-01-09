import styled from "styled-components";
import { theme } from "../assets/theme/theme";

export const FromBaseLocal = styled.div`
  display: flex;
  font-family: "SF Pro Display", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  align-items: center;
  color: ${theme.colors.neroGray};
  padding-bottom: 16px;
  column-gap: 8px;
  cursor: pointer;
`;
