import { styled } from "../../../styles/styled";
import { theme } from "../../../styles/theme";

export const ModalText = styled.div<{ error?: boolean }>`
  font-weight: 600;
  margin-bottom: 16px;
  margin-top: 30px;
  color: ${({ error }) => (error ? theme.colors.lightRed : theme.colors.black)};
`;
