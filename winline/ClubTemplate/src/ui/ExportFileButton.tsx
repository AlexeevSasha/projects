import React from "react";
import { Button, Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
interface IProps {
  exportFileHandler(fileExtension: string): void;
}

export const ExportFileButton = ({ exportFileHandler }: IProps) => {
  const menu = (changeFormatFile: (format: string) => void) => (
    <Menu>
      <Menu.Item onClick={() => changeFormatFile("csv")} key="csv">
        CSV
      </Menu.Item>
      <Menu.Item onClick={() => changeFormatFile("xlsx")} key="xlsx">
        XLS
      </Menu.Item>
    </Menu>
  );

  const changeFormatFile = (format: string) => {
    exportFileHandler(format);
  };
  const { t } = useTranslation();
  const menuWithHandler = menu(changeFormatFile);

  return (
    <Dropdown trigger={["click"]} overlay={menuWithHandler}>
      <Button type={"primary"} icon={<DownOutlined />}>
        {t("common.buttonsText.export")}
      </Button>
    </Dropdown>
  );
};
