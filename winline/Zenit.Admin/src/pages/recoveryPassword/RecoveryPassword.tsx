import React, { useEffect, useState } from "react";
import { Button, Form, Input, message, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { UnlockOutlined } from "@ant-design/icons";
import { theme } from "../../assets/theme/theme";
import { isValidPassword } from "../../common/helpers/authorization/passwordValidation";
import { parseQueryString } from "../../common/helpers/authorization/parseQueryString";
import { routePaths } from "../../common/constants/routePaths";
import { recovery } from "../../api/requests/auth";
import { useTranslation } from "react-i18next";
import { CardBody, CardTitle, MainCard } from "../../ui/commonComponents";

const { Paragraph } = Typography;

export const RecoveryPassword = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = parseQueryString(location.search);
  const [initialData, setRecoveryData] = useState<{ email: string; token: string }>({
    email: queryParams.email,
    token: queryParams.token
  });

  useEffect(() => {
    const validKeys = Object.keys(queryParams).filter((key) => key);
    const valueParams = validKeys.map((key) => queryParams[key]);
    const isInvalidParams = valueParams.findIndex((param) => /(undefined|null|NaN)/.test(param) || param.length === 0);
    // eslint-disable-next-line no-bitwise
    if (~isInvalidParams) {
      navigate(routePaths.sign.auth);
    }
  }, []);

  useEffect(() => {
    if (!sessionStorage.getItem("recovery_saved")) {
      sessionStorage.setItem("recovery_saved", JSON.stringify({ email: queryParams.email, token: queryParams.token }));
    } else {
      const recoveryData = JSON.parse(sessionStorage.getItem("recovery_saved") as string);
      // ЗАЩИТА ОТ ИЗМЕНЕНИЯ ПАРАМЕТРОВ URL
      if (queryParams.email !== recoveryData.email || queryParams.token !== recoveryData.token || Object.keys(queryParams).length !== 2) {
        navigate(`${routePaths.sign.recoveryPassword}?email=${recoveryData.email}&token=${recoveryData.token}`);
      }
      setRecoveryData(recoveryData);
    }

    return () => {
      sessionStorage.removeItem("recovery_saved");
    };
  }, []);

  const submitForm = async () => {
    form
      .validateFields()
      .then(async ({ password }) => {
        // ПОТОМУ УБРАТЬ , ПРОВЕРКА ВАЛИДНОСТИ ПАРОЛЕЙ НА ПРОДЕ
        // eslint-disable-next-line max-len
        // console.log('IS_VALID_PASSWORD_RECOVERY', password, 'JS =>', isValidPassword(password), 'C# =>', /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/.test(password));
        if (isValidPassword(password)) {
          try {
            await recovery({ token: initialData.token, password });
            navigate("success", { replace: true });
          } catch (error) {
            navigate("error", { replace: true });
          }
        } else {
          throw "";
        }
      })
      .catch(() => message.error(t("recovery.uiContent.modal.errorPassword")));
  };

  return (
    <CardBody>
      <MainCard alignSelf="flex-start" align={"center"} direction={"vertical"}>
        <CardTitle level={4}>{t("recovery.title")}</CardTitle>
        <Paragraph style={{ color: theme.colors.gray, textAlign: "left" }}>
          <div
            dangerouslySetInnerHTML={{
              __html: t("recovery.paragraph", {
                email: decodeURIComponent(initialData.email)
              })
            }}
          />
        </Paragraph>
        <Form form={form}>
          <Form.Item name={"password"}>
            <Input.Password
              size={"large"}
              placeholder={t("invitation.uiContent.placeholders.password")}
              prefix={<UnlockOutlined style={{ color: theme.colors.default }} />}
            />
          </Form.Item>
          <Form.Item>
            <Button style={{ minWidth: "282px" }} onClick={submitForm} size={"large"} type="primary" htmlType="submit" block>
              {t("common.buttonsText.save")}
            </Button>
          </Form.Item>
        </Form>
      </MainCard>
    </CardBody>
  );
};
