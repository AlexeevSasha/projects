import { UserOutlined } from "@ant-design/icons";
import { unwrapResult } from "@reduxjs/toolkit";
import { Button, Card, Form, Input, Space, Typography } from "antd";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { theme } from "assets/theme/theme";
import { routePaths } from "common/constants/routePaths";
import { isValidEmail } from "common/helpers/validators/validationEmail";
import { forgotPassword } from "store/auth/authActionAsync";
import { authAction } from "store/auth/authSlice";
import { useAppDispatch } from "../../../store";
import { useSelector } from "react-redux";
import { alertSelector } from "../../../store/auth/authSelectors";

const { Title, Paragraph } = Typography;

export const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const alert = useSelector(alertSelector);

  useEffect(() => {
    alert.message && dispatch(authAction.clearAuthAlert());
  }, [alert]);

  const submitForm = async () => {
    const email = form.getFieldValue("email");
    if (isValidEmail(email)) {
      try {
        await dispatch(forgotPassword(email)).then(unwrapResult);
      } finally {
        navigate(routePaths.sign.auth);
        dispatch(
          authAction.setAuthAlert({
            message: t("auth.forgotPassword.uiContent.modal.success.successForgot"),
            type: "success",
          })
        );
      }
    } else {
      dispatch(
        authAction.setAuthAlert({
          message: t("back:validations.InvalidEmail"),
          type: "error",
        })
      );
    }
  };

  return (
    <Card>
      <MainCard align={"center"} direction={"vertical"}>
        <CardTitle level={4}>{t("auth.forgotPassword.title")}</CardTitle>
        <Paragraph
          style={{
            color: theme.colors.gray,
            display: "inline-block",
            maxWidth: "21em",
          }}
        >
          {t("auth.forgotPassword.paragraph")}
        </Paragraph>
        <Form form={form}>
          <Form.Item name={"email"}>
            <Input
              size={"large"}
              placeholder={t("auth.forgotPassword.uiContent.placeholders.email")}
              prefix={<UserOutlined style={{ color: theme.colors.default }} />}
            />
          </Form.Item>
          <Form.Item>
            <Button onClick={submitForm} size={"large"} type="primary" htmlType="submit" block>
              {t("auth.forgotPassword.uiContent.buttonsText.submit")}
            </Button>
          </Form.Item>
          <Button onClick={() => navigate(routePaths.sign.auth)} size={"large"} block>
            {t("auth.forgotPassword.uiContent.buttonsText.back")}
          </Button>
        </Form>
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
