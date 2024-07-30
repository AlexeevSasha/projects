import { useEffect, useState } from "react";
import { Button, Form, Input, message, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { theme } from "../../assets/theme/theme";
import { UnlockOutlined } from "@ant-design/icons";
import { isValidPassword } from "../../common/helpers/authorization/passwordValidation";
import { parseQueryString } from "../../common/helpers/authorization/parseQueryString";
import { routePaths } from "../../common/constants/routePaths";
import { invitation } from "../../api/requests/auth";
import { useTranslation } from "react-i18next";
import { formsConstantsValidation } from "../../common/constants/formsConstantsValidation";
import { CardBody, CardTitle, MainCard } from "../../ui/commonComponents";

const { Paragraph } = Typography;
const length = formsConstantsValidation.password;

export const Invitation = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = parseQueryString(location.search);
  const [initialData, setInvitationData] = useState<{ name: string; email: string; token: string }>({
    name: queryParams.name,
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
    if (!sessionStorage.getItem("invitation_saved")) {
      sessionStorage.setItem(
        "invitation_saved",
        JSON.stringify({
          name: queryParams.name,
          email: queryParams.email,
          token: queryParams.token
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
        navigate(`${routePaths.sign.invitation}?name=${invitationData.name}&email=${invitationData.email}&token=${invitationData.token}`);
      }
      setInvitationData(invitationData);
    }

    return () => {
      sessionStorage.removeItem("invitation_saved");
    };
  }, []);

  const submitForm = async () => {
    form
      .validateFields()
      .then(async ({ password }) => {
        if (isValidPassword(password)) {
          try {
            await invitation({ token: initialData.token, password });
            navigate("success", { replace: true });
          } catch (error) {
            navigate("error", { replace: true });
          }
        } else {
          throw "";
        }
      })
      .catch(() => message.error(t("validations.invalidPassword", { min: length.min, max: length.max })));
  };

  return (
    <CardBody>
      <MainCard align={"center"} direction={"vertical"}>
        <CardTitle level={4}>{t("invitation.title")}</CardTitle>
        <Paragraph style={{ color: theme.colors.gray, display: "inline-block", textAlign: "left", maxWidth: "21em" }}>
          <div
            dangerouslySetInnerHTML={{
              __html: t("invitation.paragraph", {
                name: decodeURIComponent(initialData.name),
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
            <Button onClick={submitForm} size={"large"} type="primary" htmlType="submit" block>
              {t("common.buttonsText.continue")}
            </Button>
          </Form.Item>
        </Form>
      </MainCard>
    </CardBody>
  );
};
