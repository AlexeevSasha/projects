import { Modal } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { MenuItemStyles } from "../ui/commonComponents";
import { useAppDispatch } from "../core/redux/store";
import { logout } from "../api/baseRequest";

export const ExitSidebarItem = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  // const exitTheApp = () => {
  //   clearStorageAndCookie();
  //   dispatch(clearAuthData());
  // };

  const showExitModal = () => {
    Modal.confirm({
      title: t("privateLayout.sideBar.exit.modal.title"),
      maskClosable: true,
      content: t("privateLayout.sideBar.exit.modal.content"),
      okText: t("common.buttonsText.confirm"),
      cancelText: t("common.buttonsText.cancel"),
      onOk: () => logout()
    });
  };

  return (
    <MenuItemStyles style={{ padding: "0 26px" }} key={"exit"} onClick={showExitModal} icon={<LogoutOutlined />}>
      {t("privateLayout.sideBar.exit.title")}
    </MenuItemStyles>
  );
};
