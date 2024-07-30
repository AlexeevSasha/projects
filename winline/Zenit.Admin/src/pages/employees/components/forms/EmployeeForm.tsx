import React, { useEffect } from "react";
import { Button, Drawer, Form, Input, Select } from "antd";
import { useSelector } from "react-redux";
import { addEmployee, updateDataEmployee } from "../../../../modules/employees/employeesActionAsync";
import { employeeRolesSelectorEntities } from "../../../../modules/employeeRoles/employeeRolesSelector";
import type { IEmployee } from "../../../../api/dto/employees/IEmployee";
import type { AppDispatch, StateType } from "../../../../core/redux/store";
import { useTranslation } from "react-i18next";
import { unwrapResult } from "@reduxjs/toolkit";
import { validationName } from "../../../../common/helpers/commonValidators/validationName";
import { checkFullAccessPolice } from "../../../../common/helpers/employees/checkFullAccessPolice";
import { useAppDispatch } from "../../../../core/redux/store";

interface IProps {
  idEntityChanged: number | null;
  onClose: () => void;
  visible: boolean;
  roleAccess: boolean;
}

export const EmployeeForm = React.memo(({ idEntityChanged, onClose, roleAccess, visible }: IProps) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { isLoading } = useSelector((state: StateType) => state.employees);
  const employeeForChanged = useSelector<StateType, IEmployee | undefined>((state: StateType): IEmployee | undefined =>
    idEntityChanged ? state.employees.entities[idEntityChanged] : undefined
  );
  const { t } = useTranslation();
  const roles = useSelector(employeeRolesSelectorEntities)
    .filter((role) => !checkFullAccessPolice(role))
    .map((role) => ({ label: role.name, value: role.id }));

  useEffect(() => {
    if (employeeForChanged) {
      form.setFieldsValue({
        name: employeeForChanged.name,
        email: employeeForChanged.email,
        roleId: employeeForChanged.roleId
      });
    }
  }, [idEntityChanged]);

  const closeDrawer = () => {
    form.resetFields();
    onClose();
  };

  const submitForm = () => {
    form.validateFields().then(async (values) => {
      if (employeeForChanged) {
        await dispatch(updateDataEmployee({ ...employeeForChanged, ...values })).then(unwrapResult);
      } else {
        await dispatch(addEmployee(values)).then(unwrapResult);
      }
      closeDrawer();
    });
  };

  return (
    <Drawer
      title={
        idEntityChanged ? t("common.edit") + " " + t("employees.entity") : t("common.buttonsText.create") + " " + t("employees.entity")
      }
      closable={false}
      destroyOnClose={true}
      onClose={closeDrawer}
      visible={visible}
      width={305}
      footer={
        <div
          style={{
            textAlign: "right"
          }}
        >
          <Button onClick={closeDrawer} style={{ marginRight: 8 }}>
            {t("common.buttonsText.cancel")}
          </Button>
          <Button disabled={isLoading} onClick={submitForm} type="primary" htmlType={"submit"}>
            {t("common.buttonsText.save")}
          </Button>
        </div>
      }
    >
      <Form form={form} layout="vertical">
        <Form.Item name={"name"} label={t("employees.name")} rules={[{ validator: validationName }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name={"email"}
          label={t("common.email")}
          required={false}
          rules={[
            { required: true, message: t("validations.required") },
            { type: "email", message: t("validations.invalidEmail") }
          ]}
        >
          <Input disabled={!!employeeForChanged} />
        </Form.Item>
        <Form.Item
          name={"roleId"}
          required={false}
          label={t("common.role")}
          rules={[{ required: true, message: t("validations.required") }]}
        >
          <Select placeholder={t("common.selectPlaceholder")} options={roles} disabled={!roleAccess} />
        </Form.Item>
      </Form>
    </Drawer>
  );
});
