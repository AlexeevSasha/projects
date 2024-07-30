import React from "react";
import { Divider, Drawer } from "antd";
import { UpText, ItemDrawer, ItemLaw, DownText } from "../../../ui/descriptionText";
import { useSelector } from "react-redux";
import { getAccessNameInString } from "../../../common/helpers/employees/getAccessName";
import { accessNames } from "../../../common/accessControles/accessNames";
import type { IEmployeeRole } from "../../../api/dto/employees/IEmployeeRole";
import { resetDuplicatePoliceRole } from "../../../common/helpers/employees/resetDuplicatePoliceRole";
import type { StateType } from "../../../core/redux/store";
import { useTranslation } from "react-i18next";

interface IProps {
  role: IEmployeeRole | null;
  onClose: () => void;
}

export const RoleDescription = React.memo(({ role, onClose }: IProps) => {
  const roleAccessEntities = useSelector((state: StateType) => state.roleAccess.entities);
  const policiesRoleWithoutDuplicate = resetDuplicatePoliceRole(role?.policies);
  const { t } = useTranslation();

  return (
    <Drawer
      title={<UpText>{role?.name}</UpText>}
      headerStyle={{ borderBottom: "none" }}
      closable={true}
      destroyOnClose={true}
      onClose={onClose}
      visible={!!role}
      width={560}
    >
      <ItemDrawer>
        {role &&
          policiesRoleWithoutDuplicate.map((police, i) => {
            if (police === accessNames.fullAccess) {
              return (
                <ItemLaw style={{ maxWidth: "250px" }} key={police + role.id}>
                  <UpText>{t("employees.role.description.points.title")}</UpText>
                  <DownText>{t("employees.role.description.points.content")}</DownText>
                </ItemLaw>
              );
            }

            const keyAccess = getAccessNameInString(police);
            const accessItem = roleAccessEntities[keyAccess];
            if (accessItem) {
              const accessValue = accessItem.policies.find((policeItem) => policeItem.value === police);

              return (
                accessItem && (
                  <React.Fragment key={police + role.id}>
                    <ItemLaw>
                      <UpText>{accessItem.category}</UpText>
                      <DownText>{accessValue && accessValue.label}</DownText>
                    </ItemLaw>
                    {(i + 1) % 2 === 0 && i + 1 !== role.policies.length && <Divider />}
                  </React.Fragment>
                )
              );
            }

            return <></>;
          })}
      </ItemDrawer>
      <Divider />
    </Drawer>
  );
});
