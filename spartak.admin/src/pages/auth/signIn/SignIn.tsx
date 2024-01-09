import React from "react";
import { Button, Card, Checkbox, Form, Input, Typography } from "antd";
import { UnlockOutlined, UserOutlined } from "@ant-design/icons";
import { theme } from "assets/theme/theme";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { routePaths } from "common/constants/routePaths";
import { authorizationUser } from "store/auth/authActionAsync";
import { useSelector } from "react-redux";
import { isValidEmail } from "common/helpers/validators/validationEmail";
import { authAction } from "store/auth/authSlice";
import { useTranslation } from "react-i18next";
import { StateType, useAppDispatch } from "store";

const { Title } = Typography;

export const SignIn: React.FC = () => {
  const { t } = useTranslation();
  const isDisabledAuthorization = useSelector((state: StateType) => state.auth.isLoading);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const submitForm = () => {
    const { email: login, password } = form.getFieldsValue();

    if (!login || !password) {
      dispatch(authAction.setAuthAlert({ message: t("auth.nodata"), type: "error" }));
    } else if (!isValidEmail(login)) {
      dispatch(authAction.setAuthAlert({ message: t("back:validations.InvalidEmail"), type: "error" }));
    } else {
      dispatch(authorizationUser({ login, password }));
    }
  };

  return (
    <CardBody>
      <CardTitle level={4}>{t("auth.formHeader")}</CardTitle>

      <Form form={form} style={{ width: "100%" }}>
        <Form.Item key={"email"} name={"email"}>
          <Input
            size={"large"}
            placeholder={t("auth.uiContent.placeholders.email")}
            prefix={<UserOutlined style={{ color: theme.colors.default }} />}
          />
        </Form.Item>

        <Form.Item key={"password"} name={"password"}>
          <Input.Password
            size={"large"}
            placeholder={t("auth.uiContent.placeholders.password")}
            prefix={<UnlockOutlined style={{ color: theme.colors.default }} />}
          />
        </Form.Item>

        <RememberContainer>
          <Form.Item
            key={"remember"}
            name="remember"
            valuePropName="checked"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Checkbox>{t("auth.uiContent.checkBoxText.remember")}</Checkbox>
          </Form.Item>
          <Link to={routePaths.sign.forgotPassword}>{t("auth.uiContent.linksText.forgotPassword")}</Link>
        </RememberContainer>

        <Form.Item key={"button"}>
          <Button
            disabled={isDisabledAuthorization}
            onClick={submitForm}
            size={"large"}
            type="primary"
            htmlType="submit"
            block
          >
            {t("auth.uiContent.buttonsText.submit")}
          </Button>
        </Form.Item>
      </Form>
    </CardBody>
  );
};

const CardBody = styled(Card)`
  & .ant-card-body {
    padding: 24px 24px 0 !important;
  }
`;

const CardTitle = styled(Title)`
  font-weight: 600;
  font-size: 20px;
  line-height: 28px !important;
`;

const RememberContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  & > div.ant-form-item {
    margin-bottom: 0;
  }
`;
