import { UnlockOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Space, Typography } from "antd";
import { activationRepository } from "api/activationRepository";
import { theme } from "assets/theme/theme";
import { routePaths } from "common/constants/routePaths";
import { parseQueryString } from "common/helpers/authorization/parseQueryString";
import { isValidPassword } from "common/helpers/authorization/passwordValidation";
import { useActions } from "common/helpers/useActions";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { authAction } from "store/auth/authSlice";
import styled from "styled-components";

const { Title, Paragraph } = Typography;

const actionCreators = {
  setNewDataAlert: authAction.setAuthAlert,
};

export const RecoveryPassword = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = parseQueryString(location.search);
  const [initialData, setRecoveryData] = useState<{
    email: string;
    token: string;
  }>({
    email: queryParams.email,
    token: queryParams.token,
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
      if (
        queryParams.email !== recoveryData.email ||
        queryParams.token !== recoveryData.token ||
        Object.keys(queryParams).length !== 2
      ) {
        navigate(
          `/${routePaths.sign.auth}/${routePaths.sign.recoveryPassword}?email=${recoveryData.email}&token=${recoveryData.token}`
        );
      }
      setRecoveryData(recoveryData);
    }

    return () => {
      sessionStorage.removeItem("recovery_saved");
    };
  }, []);

  const { setNewDataAlert } = useActions(actionCreators);

  const redirectRoute = (route: string) => {
    navigate(route);
  };

  const submitForm = async () => {
    form
      .validateFields()
      .then(async ({ password }) => {
        // ПОТОМУ УБРАТЬ , ПРОВЕРКА ВАЛИДНОСТИ ПАРОЛЕЙ НА ПРОДЕ
        // eslint-disable-next-line max-len
        // console.log('IS_VALID_PASSWORD_RECOVERY', password, 'JS =>', isValidPassword(password), 'C# =>', /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/.test(password));
        if (isValidPassword(password)) {
          try {
            await activationRepository.recovery({
              token: initialData.token,
              password,
            });
            redirectRoute(`/${routePaths.sign.auth}/${routePaths.sign.recoveryPassword}Success/recovery`);
          } catch (error) {
            redirectRoute(`/${routePaths.sign.auth}/${routePaths.sign.recoveryPassword}Error/recovery`);
          }
        } else {
          throw "";
        }
      })
      .catch(() => {
        setNewDataAlert({
          message: t("auth.recovery.uiContent.modal.errorPassword"),
          type: "error",
        });
      });
  };

  return (
    <Card>
      <MainCard align={"center"} direction={"vertical"}>
        <CardTitle level={4}>{t("auth.recovery.title")}</CardTitle>
        <Paragraph style={{ color: theme.colors.gray }}>
          <div
            dangerouslySetInnerHTML={{
              __html: t("auth.recovery.paragraph", {
                email: decodeURIComponent(initialData.email),
              }),
            }}
          />
        </Paragraph>
        <Form form={form}>
          <Form.Item name={"password"}>
            <Input.Password
              size={"large"}
              placeholder={t("auth.recovery.uiContent.placeholders.password")}
              prefix={<UnlockOutlined style={{ color: theme.colors.default }} />}
            />
          </Form.Item>
          <Form.Item>
            <Button
              style={{ minWidth: "282px" }}
              onClick={submitForm}
              size={"large"}
              type="primary"
              htmlType="submit"
              block
            >
              {t("auth.recovery.uiContent.buttonsText.submit")}
            </Button>
          </Form.Item>
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
  & > div.ant-space-item:nth-of-type(2) {
    align-self: flex-start;
  }
`;
