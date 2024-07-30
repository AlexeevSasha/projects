import { Button, Card, Form, Input, message, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { theme } from "../../assets/theme/theme";
import { useNavigate } from "react-router-dom";
import { routePaths } from "../../common/constants/routePaths";
import { forgotPassword } from "../../modules/authorization/authorizationActionAsync";
import { isValidEmail } from "../../common/helpers/commonValidators/validationEmail";
import { useTranslation } from "react-i18next";
import { unwrapResult } from "@reduxjs/toolkit";
import { CardTitle, MainCard } from "../../ui/commonComponents";
import { useAppDispatch } from "../../core/redux/store";

const { Paragraph } = Typography;

export const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const submitForm = async () => {
    const email = form.getFieldValue("email");
    if (isValidEmail(email)) {
      //@ts-ignore
      await dispatch(forgotPassword(email)).then(unwrapResult);
      navigate(routePaths.sign.auth);
      message.success(t("forgotPassword.uiContent.modal.success.successForgot"));
    } else {
      message.error(t("validations.invalidEmail"));
    }
  };

  return (
    <Card>
      <MainCard align={"center"} direction={"vertical"}>
        <CardTitle level={4}>{t("forgotPassword.title")}</CardTitle>
        <Paragraph style={{ color: theme.colors.gray, display: "inline-block", textAlign: "left", maxWidth: "21em" }}>
          {t("forgotPassword.paragraph")}
        </Paragraph>
        <Form form={form}>
          <Form.Item name={"email"}>
            <Input size={"large"} placeholder={t("common.email")} prefix={<UserOutlined style={{ color: theme.colors.default }} />} />
          </Form.Item>
          <Form.Item>
            <Button onClick={submitForm} size={"large"} type="primary" htmlType="submit" block>
              {t("common.buttonsText.continue")}
            </Button>
          </Form.Item>
          <Button onClick={() => navigate(routePaths.sign.auth)} size={"large"} block>
            {t("forgotPassword.uiContent.buttonsText.back")}
          </Button>
        </Form>
      </MainCard>
    </Card>
  );
};
