import React from "react";
import { Button, Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import styled from "styled-components";

interface IProps {
  exportFileHandler(fileExtension: string): void;
}

export const ExportFileButton = ({ exportFileHandler }: IProps) => {
  const menu = (changeFormatFile: (format: string) => void) => (
    <Menu>
      <Menu.Item onClick={() => changeFormatFile("CSV")} key="CSV">
        CSV
      </Menu.Item>
      <Menu.Item onClick={() => changeFormatFile("XLSX")} key="XLSX">
        XLS
      </Menu.Item>
    </Menu>
  );

  const changeFormatFile = (format: string) => {
    exportFileHandler(format);
  };

  const menuWithHandler = menu(changeFormatFile);

  return (
    <Dropdown trigger={["click"]} overlay={menuWithHandler}>
      <ButtonDownload type={"primary"} icon={<DownOutlined />}>
        Экспорт
      </ButtonDownload>
    </Dropdown>
  );
};

const ButtonDownload = styled(Button)`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: baseline;

  @media (max-width: 1000px) {
    margin-bottom: 24px;
  }
  & > span:first-child {
    margin-left: 6px;
  }
`;
