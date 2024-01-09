import { theme } from "common/styles/theme";
import { styled } from "../../../common/styles/styled";

export const BorderGreen = styled.div<{ hidePadding?: boolean }>`
  border: 1px solid ${theme.colors.green};
  border-radius: 10px;
  margin-bottom: 12px;
  padding: ${(props) => (props.hidePadding ? "0" : "12px 12px 0")};
  overflow: hidden;
`;
