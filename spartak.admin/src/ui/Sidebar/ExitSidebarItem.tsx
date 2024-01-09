import { LogoutOutlined } from "@ant-design/icons";
import { Menu, Modal } from "antd";
import { theme } from "assets/theme/theme";
import React from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "store";
import { authAction } from "store/auth/authSlice";
import styled from "styled-components";

export const ExitButton = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const showExitModal = () => {
    Modal.confirm({
      title: t("sideBar.exit.modal.title"),
      content: <ContentModal>{t("sideBar.exit.modal.content")}</ContentModal>,
      okText: t("sideBar.exit.modal.okText"),
      cancelText: t("sideBar.exit.modal.cancelText"),
      onOk: async () =>
        await new Promise<void>((resolve) => {
          dispatch(authAction.clearAuthData());
          resolve();
        }),
    });
  };

  return (
    <MenuItem onClick={showExitModal} icon={<LogoutOutlined />}>
      {t("sideBar.exit.title")}
    </MenuItem>
  );
};

const ContentModal = styled.div`
  max-width: 15rem;
  display: inline-block;
`;

const MenuItem = styled(Menu.Item)`
  margin: 0 !important;
  background: ${theme.colors.neroGray};
  color: ${theme.colors.white};
`;
