import { FC, useMemo, useState } from "react";
import { Button, Drawer, Form, Input, Select } from "antd";
import type { IEmployeeReminder } from "../../../../api/dto/employees/IEmployeeReminder";
import { addReminder } from "../../../../modules/employeeReminders/employeeRemindersActionAsync";
import type { IEmployee } from "../../../../api/dto/employees/IEmployee";
import { useTranslation } from "react-i18next";
import { unwrapResult } from "@reduxjs/toolkit";
import { AppDispatch, StateType, useAppDispatch } from "../../../../core/redux/store";
import { useSelector } from "react-redux";
import TextArea from "antd/lib/input/TextArea";
import { selectProps } from "../../../../common/helpers/customMulti";

interface IProps {
  visible: boolean;
  remindersOptions: IEmployeeReminder[];
  closeDrawer(): void;
  employees: IEmployee[];
}

export const RemindersForm: FC<IProps> = ({ visible, closeDrawer, employees }) => {
  const [value, setValue] = useState<number[]>([]);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { isLoading } = useSelector((state: StateType) => state.employeeReminders);
  const { t } = useTranslation();
  const closeWithClearDescription = () => {
    closeDrawer();
    setValue([]);
    form.resetFields();
  };

  const submitReminder = () => {
    form.validateFields().then(async (values) => {
      dispatch(addReminder({ ...values })).then(unwrapResult);
      closeWithClearDescription();
    });
  };

  const multiOptions = useMemo(
    () => [
      ...employees.map((employee) => {
        return { label: employee.name, value: employee.id };
      })
    ],
    [employees]
  );

  return (
    <Drawer
      title={t("employees.reminders.form.title")}
      closable={false}
      destroyOnClose={true}
      onClose={closeWithClearDescription}
      visible={visible}
      width={305}
      footer={
        <div
          style={{
            textAlign: "right"
          }}
        >
          <Button onClick={closeWithClearDescription} style={{ marginRight: 8 }}>
            {t("common.buttonsText.cancel")}
          </Button>
          <Button disabled={isLoading} onClick={submitReminder} type="primary" htmlType={"submit"}>
            {t("common.buttonsText.save")}
          </Button>
        </div>
      }
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name={"title"}
          required={false}
          label={t("common.heading")}
          rules={[
            { required: true, message: t("validations.required") },
            { max: 50, message: t("validations.maxLengthExceeded", { max: 50 }) }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={"text"}
          label={t("common.text")}
          required={false}
          rules={[
            { required: true, message: t("validations.required") },
            { max: 300, message: t("validations.maxLengthExceeded", { max: 300 }) }
          ]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item
          name={"employees"}
          label={t("common.employees")}
          required={false}
          rules={[{ required: true, message: t("validations.required") }]}
        >
          <Select
            {...selectProps(
              "employees",
              multiOptions,
              value,
              setValue,
              form,
              t("employees.reminders.form.fields.employees.placeholder"),
              undefined
            )}
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
};
