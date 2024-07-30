import styled, { css } from "styled-components";
import { Typography } from "antd";
import { theme } from "../assets/theme/theme";

const { Paragraph } = Typography;

const normalStyles = css`
  font-style: normal;
  font-weight: normal;
  color: ${theme.colors.gray};
`;

export const UpText = styled(Paragraph)`
  ${normalStyles};
  font-size: 16px;
  line-height: 24px;
`;

export const ItemText = styled(Paragraph)`
  ${normalStyles};
  font-size: 14px;
  line-height: 22px;

  & > span:last-child {
    margin-left: 8px;
    color: ${theme.colors.middleGray};
  }
  & > a:last-child {
    margin-left: 5px;
  }
`;

export const FirstFieldItemText = styled.span`
  white-space: nowrap;
`;
