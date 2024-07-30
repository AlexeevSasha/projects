/* eslint-disable no-unused-expressions */
/* eslint-disable one-var */
import { Modal, Select } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
const { Option } = Select;

interface IProps {
  setHtmlData?: any | null;
  htmlData: string | null;
}

export const ViewingHtmlModal = React.memo(({ setHtmlData, htmlData }: IProps) => {
  const { t } = useTranslation();
  const [device, setDevice] = useState<{ width: number; height: number }>({ width: 390, height: 609 });
  const [nameDevice, setNameDevice] = useState<string>("iPhone 12 Pro");

  const handleCancel = () => {
    setHtmlData(null);
    setNameDevice("iPhone 12 Pro");
    setDevice({ width: 390, height: 609 });
  };
  const handleOk = () => {
    setHtmlData(null);
  };

  const changeDevices = (e: string) => {
    switch (e) {
      case "iPhone 12 Pro":
        setDevice({ width: 390, height: 609 });
        break;
      case "Pixel 5":
        setDevice({ width: 393, height: 416 });
        break;
      case "Samsung Galaxy S8+":
        setDevice({ width: 360, height: 505 });
        break;
      case "Redmi Note 10S":
        setDevice({ width: 393, height: 616 });
        break;
      default:
        device;
    }
  };

  return (
    <>
      <Modal
        visible={htmlData !== null}
        onCancel={handleCancel}
        onOk={handleOk}
        title={
          <>
            <span>{t("marketing.infoPages.form.viewing")}</span>
            <Select
              value={nameDevice}
              bordered={false}
              onChange={(e: any) => {
                changeDevices(e);
                setNameDevice(e);
              }}
            >
              <Option value="iPhone 12 Pro">iPhone 12 Pro</Option>
              <Option value="Pixel 5">Pixel 5</Option>
              <Option value="Samsung Galaxy S8+">Samsung Galaxy S8+</Option>
              <Option value="Redmi Note 10S">Redmi Note 10S</Option>
            </Select>
          </>
        }
        width={device.width}
        style={{ borderRadius: "10px" }}
        bodyStyle={{ padding: "0px 6px 0px 6px", overflowX: "scroll", height: device.height }}
        footer={null}
      >
        {htmlData && <div dangerouslySetInnerHTML={{ __html: htmlData }}></div>}
      </Modal>
    </>
  );
});
