import { Button, Card, Space, Typography } from "antd";
import { theme } from "assets/theme/theme";
import { routePaths } from "common/constants/routePaths";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const { Title, Paragraph } = Typography;

export const OperationSuccess = () => {
  const { t } = useTranslation();
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();

  return (
    <Card>
      <MainCard align={"center"} direction={"vertical"}>
        <CardTitle level={4}>
          {type === "recovery"
            ? t("auth.operationSuccess.recovery.title")
            : t("auth.operationSuccess.invitation.title")}
        </CardTitle>
        <Paragraph
          style={{
            color: theme.colors.gray,
            display: "inline-block",
            maxWidth: "21em",
          }}
        >
          {t("auth.operationSuccess.paragraph")}
        </Paragraph>
        <Button
          style={{ minWidth: "282px" }}
          onClick={() => navigate(routePaths.sign.auth)}
          size={"large"}
          type="primary"
          htmlType="submit"
          block
        >
          {t("auth.operationSuccess.uiContent.buttonsText.back")}
        </Button>
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
  & > div.ant-space-item:nth-of-type(2) {
    align-self: flex-start;
  }
`;
