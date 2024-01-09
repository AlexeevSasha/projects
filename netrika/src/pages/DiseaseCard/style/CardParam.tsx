import styled from "styled-components";
import { theme } from "common/styles/theme";

export const CardParamLine = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  margin-bottom: 10px;
`;

export const CardParamTitle = styled.div`
  color: ${theme.colors.hightBlue};
  font-weight: bold;
`;

export const CardParamValue = styled.div`
  color: ${theme.colors.black};
  font-weight: bold;
  text-align: right;

  justify-self: flex-end;
`;
