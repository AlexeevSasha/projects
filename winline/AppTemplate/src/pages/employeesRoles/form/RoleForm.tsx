import React, { useEffect } from "react";
import { Button, Drawer, Form, Input, Typography, Divider, message, Radio } from "antd";
import styled from "styled-components";
import { addEmployeeRole, updateEmployeeRole } from "../../../modules/employeeRoles/employeeRolesActionAsync";
import { useSelector } from "react-redux";
import { getAccessNameInObject } from "../../../common/helpers/employees/getAccessName";
import { roleAccessAll, roleAccessAllForRoleUpdate } from "../../../modules/roleAccess/roleAccessSelector";
import type { IEmployeeRole } from "../../../api/dto/employees/IEmployeeRole";
import { filtersPolicyNone } from "../../../common/helpers/employees/operationsWithPolicyNone";
import { theme } from "../../../assets/theme/theme";
import { AppDispatch, StateType, useAppDispatch } from "../../../core/redux/store";
import { useTranslation } from "react-i18next";
import { validationName } from "../../../common/helpers/commonValidators/validationName";
import { unwrapResult } from "@reduxjs/toolkit";

interface IProps {
  dataFormRole: IEmployeeRole | null | {};
  onClose: () => void;
}

const { Title, Paragraph } = Typography;

export const RoleForm = React.memo(({ dataFormRole, onClose }: IProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isLoading } = useSelector((state: StateType) => state.employeeRoles);
  const rolesAccess = useSelector((state: StateType) =>
    dataFormRole && "policies" in dataFormRole ? roleAccessAllForRoleUpdate(state, dataFormRole.policies) : roleAccessAll(state)
  );
  const [form] = Form.useForm();

  const closeDrawer = () => {
    form.resetFields();
    onClose();
  };

  useEffect(() => {
    form.resetFields();
  }, [form, dataFormRole]);

  const submitFormRole = () => {
    form.validateFields().then(async (values) => {
      const cloneFields = { ...values };
      delete cloneFields.name;
      const valuesWithoutNone = filtersPolicyNone(values);
      const assignedFields = Object.values<string>(cloneFields).filter((field) => !field.includes("none"));
      if (!assignedFields.length) {
        message.error(t("employees.role.form.uiContent.alerts.accessRule"));
      } else {
        if (dataFormRole && "id" in dataFormRole) {
          await dispatch(updateEmployeeRole({ ...dataFormRole, ...valuesWithoutNone })).then(unwrapResult);
        } else {
          await dispatch(addEmployeeRole(valuesWithoutNone)).then(unwrapResult);
        }
        closeDrawer();
      }
    });
  };

  return (
    <Drawer
      title={
        <>
          <Title level={5}>
            {dataFormRole && "id" in dataFormRole
              ? t("common.edit") + " " + t("common.role").toLowerCase()
              : t("common.buttonsText.create") + " " + t("common.role").toLowerCase()}
          </Title>
        </>
      }
      closable={false}
      destroyOnClose={true}
      onClose={closeDrawer}
      visible={!!dataFormRole}
      width={560}
      footer={
        <div
          style={{
            textAlign: "right"
          }}
        >
          <Button onClick={closeDrawer} style={{ marginRight: 8 }}>
            {t("common.buttonsText.cancel")}
          </Button>
          <Button disabled={isLoading} onClick={submitFormRole} type="primary" htmlType={"submit"}>
            {t("common.buttonsText.save")}
          </Button>
        </div>
      }
    >
      <FormRole form={form} layout="vertical">
        <Form.Item
          label={<LabelFormItem>{t("common.title")}</LabelFormItem>}
          required={false}
          style={{ maxWidth: "50%" }}
          initialValue={dataFormRole && "name" in dataFormRole ? dataFormRole.name : ""}
          rules={[
            {
              validator: validationName
            }
          ]}
          name={"name"}
        >
          <Input size={"middle"} />
        </Form.Item>
        <Divider />
        <CustomSpaceItem>
          {rolesAccess.map((role, i) => (
            <React.Fragment key={role.category}>
              <Form.Item
                style={{ flexBasis: "35%" }}
                label={<LabelFormItem>{role.category}</LabelFormItem>}
                initialValue={role.defaultValue?.value}
                name={getAccessNameInObject(role.policies[0])}
              >
                <Radio.Group options={role.policies} style={{ display: "flex", flexDirection: "column" }} />
              </Form.Item>
              {(i + 1) % 2 === 0 && i + 1 !== rolesAccess.length && <Divider />}
            </React.Fragment>
          ))}
        </CustomSpaceItem>
      </FormRole>
    </Drawer>
  );
});

const LabelFormItem = styled(Paragraph)`
  width: 145px;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: ${theme.colors.gray};
`;

const CustomSpaceItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 40px;
  flex-wrap: wrap;
`;

const FormRole = styled(Form)`
  & label.ant-radio-wrapper {
    margin-bottom: 8px;
  }
`;
