import { Descriptions, Drawer } from "antd";
import { useSelector } from "react-redux";
import { getAccessNameInString } from "../../../common/helpers/employees/getAccessName";
import { accessNames } from "../../../common/accessControles/accessNames";
import { resetDuplicatePoliceRole } from "../../../common/helpers/employees/resetDuplicatePoliceRole";
import type { IEmployeeRole } from "../../../api/dto/employees/IEmployeeRole";
import type { StateType } from "../../../core/redux/store";
import { useTranslation } from "react-i18next";

interface IProps {
  role: IEmployeeRole | null;
  onClose: () => void;
}

export const RoleDescription = ({ role, onClose }: IProps) => {
  const roleAccessEntities = useSelector((state: StateType) => state.roleAccess.entities);
  const policiesRoleWithoutDuplicate = resetDuplicatePoliceRole(role?.policies);
  const { t } = useTranslation();

  return (
    <Drawer title={role?.name} closable={true} destroyOnClose={true} onClose={onClose} visible={!!role} width={560}>
      <Descriptions column={2}>
        {role &&
          policiesRoleWithoutDuplicate.map((police) => {
            if (police === accessNames.fullAccess) {
              return (
                <Descriptions.Item key={police + role.id} label={t("employees.role.description.points.title")}>
                  {t("employees.role.description.points.content")}
                </Descriptions.Item>
              );
            }

            const keyAccess = getAccessNameInString(police);
            const accessItem = roleAccessEntities[keyAccess];
            if (accessItem) {
              const accessValue = accessItem.policies.find((policeItem) => policeItem.value === police);

              return (
                accessItem && (
                  <Descriptions.Item key={police + role.id} label={accessItem.category}>
                    {accessValue && accessValue.label}
                  </Descriptions.Item>
                )
              );
            }

            return <></>;
          })}
      </Descriptions>
    </Drawer>
  );
};
