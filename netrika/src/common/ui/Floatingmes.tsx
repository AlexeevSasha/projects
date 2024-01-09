import { theme } from "common/styles/theme";
import { styled } from "../styles/styled";

export const Floatingmes = styled.p<{ visible?: boolean; whiteSpace?: string }>`
  display: ${(props) => (props.visible ? "block" : "none")};
  position: absolute;
  font-style: normal;
  font-weight: normal;
  line-height: 19px;
  letter-spacing: 0.0025em;
  color: ${theme.colors.hightBlue};
  background: ${theme.colors.white};
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  max-width: 400px;
  z-index: 99999999;
  left: -87px;
  width: max-content;
  white-space: ${(props) => (props.whiteSpace ? props.whiteSpace : "nowrap")};
  padding: 4px 8px;
`;

export const FloatingmesContainer = styled.div`
  position: relative;
  :hover {
    .floatingmes {
      display: block;
    }
  }
`;
