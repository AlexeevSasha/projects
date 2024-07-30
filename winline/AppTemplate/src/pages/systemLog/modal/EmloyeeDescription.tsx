import React from "react";
import { ItemText, UpText, FirstFieldItemText } from "../../../ui/descriptionText";
import { Drawer } from "antd";
import { useTranslation } from "react-i18next";
import type { IEmployee } from "../../../api/dto/employees/IEmployee";
import { getFormatedDate } from "../../../common/helpers/getFormatedDate";
import { formsConstantsValidation } from "../../../common/constants/formsConstantsValidation";

interface IProps {
  descriptionEmployee?: IEmployee;
  onClose(): void;
}

export const EmployeeDescription = ({ descriptionEmployee, onClose }: IProps) => {
  const { t } = useTranslation();

  return (
    <Drawer
      title={<UpText>{t("systemLog.description.employee.title")}</UpText>}
      headerStyle={{ borderBottom: "none" }}
      closable={true}
      destroyOnClose={true}
      onClose={onClose}
      visible={!!descriptionEmployee}
      width={560}
    >
      <ItemText>
        <FirstFieldItemText>{t("employees.name") + " " + t("common.user") + ":"}</FirstFieldItemText>
        <span>{descriptionEmployee?.name}</span>
      </ItemText>
      <ItemText>
        <FirstFieldItemText>{t("systemLog.description.employee.email")}</FirstFieldItemText>
        <span>{descriptionEmployee?.email}</span>
      </ItemText>
      <ItemText>
        <FirstFieldItemText>{t("systemLog.createdUtc")}</FirstFieldItemText>
        <span>{getFormatedDate(descriptionEmployee?.createdUtc, formsConstantsValidation.dateTimeFormat)}</span>
      </ItemText>
    </Drawer>
  );
};
