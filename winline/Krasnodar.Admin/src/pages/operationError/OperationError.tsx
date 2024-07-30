import { Button, Card, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { routePaths } from "../../common/constants/routePaths";
import { theme } from "../../assets/theme/theme";
import { useTranslation } from "react-i18next";
import { CardTitle, MainCard } from "../../ui/commonComponents";

const { Paragraph } = Typography;

export const OperationError = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Card>
      <MainCard align={"center"} direction={"vertical"}>
        <CardTitle level={4}>{t("operationError.title")}</CardTitle>
        <Paragraph style={{ color: theme.colors.gray, display: "inline-block", textAlign: "left", maxWidth: "21em" }}>
          {t(
            `operationError.${
              location.pathname.split("/").slice(2, 3).toString() === "recoveryPassword" ? "recovery" : "invitation"
            }.paragraph`
          )}
        </Paragraph>
        <Button onClick={() => navigate(routePaths.sign.auth)} size={"large"} type="primary" htmlType="submit" block>
          {t("operationSuccess.uiContent.buttonsText.back")}
        </Button>
      </MainCard>
    </Card>
  );
};
