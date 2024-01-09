import { QuestionCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { t } from "i18next";
import { theme } from "../../assets/theme/theme";
import { HeaderText } from "../../ui/HeaderText";

export const saveConfirm = () =>
  new Promise<boolean>((resolve) => {
    Modal.confirm({
      title: <HeaderText>{t("matches.saveChanges")}</HeaderText>,
      icon: <QuestionCircleOutlined style={{ color: theme.colors.red1 }} />,
      content: t("matches.unsavedChanges"),
      okText: t("allPages.buttonsText.confirm"),
      cancelText: t("allPages.buttonsText.cancel"),
      onOk: () => resolve(true),
      onCancel: () => resolve(false),
    });
  });
