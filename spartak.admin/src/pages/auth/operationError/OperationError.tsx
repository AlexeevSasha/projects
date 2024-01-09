import { Card, Space, Typography } from "antd";
import { theme } from "assets/theme/theme";
import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const { Title, Paragraph } = Typography;

export const OperationError = () => {
  const { t } = useTranslation();
  const { type } = useParams<{ type: string }>();

  return (
    <Card>
      <MainCard align={"center"} direction={"vertical"}>
        <CardTitle level={4}>{t("auth.operationError.title")}</CardTitle>
        <Paragraph
          style={{
            color: theme.colors.gray,
            display: "inline-block",
            maxWidth: "21em",
          }}
        >
          {type === "recovery"
            ? t("auth.operationError.recovery.paragraph")
            : t("auth.operationError.invitation.paragraph")}
        </Paragraph>
      </MainCard>
    </Card>
  );
};

const CardTitle = styled(Title)`
  font-weight: 600;
  font-size: 20px;
  line-height: 28px !important;
`;

const MainCard = styled(Space)`
  & > div.ant-space-item:last-child {
    align-self: stretch;
  }
`;
