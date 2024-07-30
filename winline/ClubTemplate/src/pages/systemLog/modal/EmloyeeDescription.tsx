import { Descriptions, Drawer } from "antd";
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
      title={t("systemLog.userCard")}
      closable={true}
      destroyOnClose={true}
      onClose={onClose}
      visible={!!descriptionEmployee}
      width={560}
    >
      <Descriptions column={1}>
        <Descriptions.Item label={t("employees.name") + " " + t("common.user")}>{descriptionEmployee?.name}</Descriptions.Item>
        <Descriptions.Item label={t("common.email")}>{descriptionEmployee?.email}</Descriptions.Item>
        <Descriptions.Item label={t("common.createdUtc")}>
          {getFormatedDate(descriptionEmployee?.createdUtc, formsConstantsValidation.dateFormat)}
        </Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
};
