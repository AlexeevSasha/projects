import { Typography } from "antd";
import styled from "styled-components";
import { ReactNode } from "react";
import { theme } from "../assets/theme/theme";

const { Text } = Typography;

type Props = {
  label: string | ReactNode;
  prompt?: string;
  required?: boolean;
  children?: ReactNode;
};

export const RowLabel = ({ label, prompt, required, children }: Props) => {
  return (
    <TextWrapper>
      <Text strong>
        {label}
        {required && <Required>*</Required>}
        {children}
      </Text>
      <Text type="secondary" style={{ fontSize: 14 }}>
        {prompt}
      </Text>
    </TextWrapper>
  );
};

const TextWrapper = styled.div`
  display: flex;
  flex-flow: column;
  width: 200px;
`;
const Required = styled.span`
  color: ${theme.colors.red1};
`;
