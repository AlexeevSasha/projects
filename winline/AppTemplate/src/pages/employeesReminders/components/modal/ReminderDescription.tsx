import { ItemText, UpText, FirstFieldItemText } from "../../../../ui/descriptionText";
import { Divider, Drawer } from "antd";
import type { IEmployeeReminder } from "../../../../api/dto/employees/IEmployeeReminder";
import { useTranslation } from "react-i18next";

interface IProps {
  visible: boolean;
  onClose(): void;
  reminder?: IEmployeeReminder;
  setShowEmployees: Function;
}

export const ReminderDescription = ({ visible, onClose, reminder, setShowEmployees }: IProps) => {
  const { t } = useTranslation();

  return (
    <Drawer
      title={<UpText>{`${t("common.id" + ":")} ${reminder?.id}`}</UpText>}
      headerStyle={{ borderBottom: "none" }}
      closable={true}
      destroyOnClose={true}
      onClose={onClose}
      visible={visible}
      width={560}
    >
      <ItemText>
        <FirstFieldItemText>{t("common.heading")}:</FirstFieldItemText>
        <span>{reminder?.title}</span>
      </ItemText>
      <ItemText>
        <FirstFieldItemText>{t("common.text")}:</FirstFieldItemText>
        <span>{reminder?.text}</span>
      </ItemText>
      <Divider />
      <ItemText>
        <FirstFieldItemText>{t("common.employees")}:</FirstFieldItemText>
        <span>{setShowEmployees(reminder?.employees)}</span>
      </ItemText>
    </Drawer>
  );
};
