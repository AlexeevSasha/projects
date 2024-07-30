import React, { useEffect, useState } from "react";
import { Modal, Switch } from "antd";
import { useTranslation } from "react-i18next";

interface IProps {
  title: string;
  status: boolean;
  disabled?: boolean;
  content: string;
  changeVisibility: Function;
}

const SwitchWithModal = ({ title, status, disabled, content, changeVisibility }: IProps) => {
  const { t } = useTranslation();
  const [checked, setChecked] = useState(status);

  useEffect(() => setChecked(status), [status]);

  const handleClick = () => {
    Modal.confirm({
      title: title + "?",
      maskClosable: true,
      content: content,
      okText: t("common.buttonsText.confirm"),
      cancelText: t("common.buttonsText.cancel"),
      onOk: () => {
        changeVisibility();
      }
    });
  };

  return <Switch onClick={() => handleClick()} checked={checked} disabled={disabled} />;
};

export default SwitchWithModal;
