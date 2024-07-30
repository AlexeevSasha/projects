import React from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import {MailOutlined, UnlockOutlined} from "@ant-design/icons";
import { theme } from "../../assets/theme/theme";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { routePaths } from "../../common/constants/routePaths";
import { authorizationUser } from "../../modules/authorization/authorizationActionAsync";
import { useSelector } from "react-redux";
import { isValidEmail } from "../../common/helpers/commonValidators/validationEmail";
import { useTranslation } from "react-i18next";
import { StateType, useAppDispatch } from "../../core/redux/store";
import { CardBody, CardTitle } from "../../ui/commonComponents";

export const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const isDisabledAuthorization = useSelector((state: StateType) => state.authData.isLoading);
  const [form] = Form.useForm();

  const submitForm = () => {
    const fields = form.getFieldsValue();
    if (!fields.email || !fields.password) {
      message.error(t("auth.nodata"));
    } else if (!isValidEmail(fields.email)) {
      message.error(t("validations.invalidEmail"));
    } else {
      dispatch(authorizationUser({ remember: !!fields.remember, login: fields.email, password: fields.password }));
    }
  };

  return (
    <CardBody>
      <CardTitle level={4}>{t("auth.formHeader")}</CardTitle>
      <Form form={form} style={{ width: "100%" }}>
        <Form.Item key={"email"} name={"email"}>
          <Input size={"large"}
                 placeholder={t("common.email")}
                 prefix={<MailOutlined  style={{ color: theme.colors.default }} />}
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
                required: false
              }
            ]}
          >
            <Checkbox>{t("auth.uiContent.checkBoxText.remember")}</Checkbox>
          </Form.Item>
          <Link to={routePaths.sign.forgotPassword}>{t("auth.uiContent.linksText.forgotPassword")}</Link>
        </RememberContainer>
        <Form.Item key={"button"}>
          <Button disabled={isDisabledAuthorization} onClick={submitForm} size={"large"} type="primary" htmlType="submit" block>
            {t("auth.uiContent.buttonsText.submit")}
          </Button>
        </Form.Item>
      </Form>
    </CardBody>
  );
};

const RememberContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  & > div.ant-form-item {
    margin-bottom: 0;
  }
  
  a {
    :focus {
      color: #ff7a45;
    }
  }
`;


