import { UnlockOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Space, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { theme } from "assets/theme/theme";
import { formsConstantsValidation } from "common/constants/formsConstantsValidation";
import { routePaths } from "common/constants/routePaths";
import { parseQueryString } from "common/helpers/authorization/parseQueryString";
import { isValidPassword } from "common/helpers/authorization/passwordValidation";
import { useActions } from "common/helpers/useActions";
import { authAction } from "store/auth/authSlice";
import { activationRepository } from "api/activationRepository";

const { Title, Paragraph } = Typography;

const actionCreators = {
  setNewDataAlert: authAction.setAuthAlert,
};

const length = formsConstantsValidation.password;

export const Invitation = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = parseQueryString(location.search);
  const [initialData, setInvitationData] = useState<{
    name: string;
    email: string;
    token: string;
  }>({
    name: queryParams.name,
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
    if (!sessionStorage.getItem("invitation_saved")) {
      sessionStorage.setItem(
        "invitation_saved",
        JSON.stringify({
          name: queryParams.name,
          email: queryParams.email,
          token: queryParams.token,
        })
      );
    } else {
      const invitationData = JSON.parse(sessionStorage.getItem("invitation_saved") as string);
      // ЗАЩИТА ОТ ИЗМЕНЕНИЯ ПАРАМЕТРОВ URL
      if (
        queryParams.name !== invitationData.name ||
        queryParams.email !== invitationData.email ||
        queryParams.token !== invitationData.token ||
        Object.keys(queryParams).length !== 3
      ) {
        // eslint-disable-next-line max-len
        navigate(
          `/${routePaths.sign.auth}/${routePaths.sign.invitation}?name=${invitationData.name}&email=${invitationData.email}&token=${invitationData.token}`
        );
      }
      setInvitationData(invitationData);
    }

    return () => {
      sessionStorage.removeItem("invitation_saved");
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
        if (isValidPassword(password)) {
          try {
            await activationRepository.invitation({
              token: initialData.token,
              password,
            });
            redirectRoute(`/${routePaths.sign.auth}/${routePaths.sign.invitation}Success/invitation`);
          } catch (error) {
            redirectRoute(`/${routePaths.sign.auth}/${routePaths.sign.invitation}Error/invitation`);
          }
        } else {
          throw "";
        }
      })
      .catch(() => {
        setNewDataAlert({
          message: t("back:validations.InvalidPassword", {
            min: length.min,
            max: length.max,
          }),
          type: "error",
        });
      });
  };

  return (
    <Card>
      <MainCard align={"center"} direction={"vertical"}>
        <CardTitle level={4}>{t("auth.invitation.title")}</CardTitle>
        <Paragraph
          style={{
            color: theme.colors.gray,
            display: "inline-block",
            maxWidth: "21em",
          }}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: t("auth.invitation.paragraph", {
                name: decodeURIComponent(initialData.name),
                email: decodeURIComponent(initialData.email),
              }),
            }}
          />
        </Paragraph>
        <Form form={form}>
          <Form.Item name={"password"}>
            <Input.Password
              size={"large"}
              placeholder={t("auth.invitation.uiContent.placeholders.password")}
              prefix={<UnlockOutlined style={{ color: theme.colors.default }} />}
            />
          </Form.Item>
          <Form.Item>
            <Button onClick={submitForm} size={"large"} type="primary" htmlType="submit" block>
              {t("auth.invitation.uiContent.buttonsText.submit")}
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
  & > div.ant-space-item:last-child {
    align-self: stretch;
  }
`;
