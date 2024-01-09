import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Drawer, Form, Input, Modal } from "antd";
import { theme } from "assets/theme/theme";
import { fullNameValidator } from "common/helpers/validators/fullNameValidator";
import { roleValidator } from "common/helpers/validators/roleValidator";
import { Employee } from "common/interfaces/employee";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "store";
import { employeeViewActions } from "store/employeeView/employeeView";
import { editEmployee, getEmployeeById, publishEmployee } from "store/employeeView/employeeViewActionAsync";
import { employeeSelector } from "store/employeeView/employeeViewSelectors";
import { noticeActions } from "store/notice/notice";
import styled from "styled-components";
import { HeaderText } from "ui/HeaderText";
import { Loader } from "ui/Loader";
import { SelectField, SelectFieldOption } from "ui/SelectField";
import { validationEmail } from "../../common/helpers/validators/validationEmail";

const { confirm } = Modal;

type Props = {
  roleOptions?: SelectFieldOption[];
};

export const EmployeeForm = memo(({ roleOptions }: Props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();
  const isCreate = pathname.endsWith("create");
  const [form] = Form.useForm<Employee>();
  const { t } = useTranslation();
  const [visible, setVisible] = useState(true);
  const [values, setValues] = useState<Employee | undefined>();
  const dispatch = useAppDispatch();
  const employee = useSelector(employeeSelector);

  const closeDrawer = () => {
    form.resetFields();
    setVisible(false);
    setTimeout(() => navigate(-1), 150);
  };

  const showConfirm = () => {
    confirm({
      title: <HeaderText>{t(`allPages.confirmTitle`)}</HeaderText>,
      icon: <QuestionCircleOutlined style={{ color: theme.colors.red1 }} />,
      okText: t("allPages.buttonsText.confirm"),
      cancelText: t("allPages.buttonsText.cancel"),
      onOk: submitForm,
    });
  };

  const submitForm = async () => {
    const { Email, ...data } = form.getFieldsValue();
    if (
      !(await form
        .validateFields()
        .then(() => true)
        .catch(() => false))
    ) {
      return;
    }
    if (data.Name !== values?.Name || data.RoleId !== values?.RoleId) {
      dispatch(id && values ? editEmployee({ ...data, Id: id }) : publishEmployee(form.getFieldsValue()))
        .unwrap()
        .then(() => {
          dispatch(
            noticeActions.add(
              isCreate
                ? {
                    message: t("employee.employeeCreated"),
                    description: t("employee.employeeCreatedDesc"),
                    closable: true,
                    timeout: 5000,
                  }
                : {
                    message: t("employee.successUpdateEmployee"),
                    closable: true,
                    timeout: 5000,
                  }
            )
          );
          closeDrawer();
        });
    } else {
      closeDrawer();
    }
  };

  useEffect(() => {
    if (!isCreate && id) {
      dispatch(getEmployeeById(id)).unwrap().then(setValues);
    }

    return () => {
      dispatch(employeeViewActions.resetEmployee());
    };
  }, [id]);

  return (
    <Drawer
      title={<HeaderText>{isCreate ? t("employee.create") : t("employee.edit")}</HeaderText>}
      closable={false}
      destroyOnClose={true}
      getContainer={false}
      onClose={closeDrawer}
      visible={visible}
      width="440px"
      bodyStyle={{ padding: "0 30px 130px" }}
      footer={
        <Footer>
          <Button onClick={closeDrawer} style={{ marginRight: 8 }}>
            {t("allPages.buttonsText.cancel")}
          </Button>

          <Button onClick={isCreate ? showConfirm : submitForm} type="primary" htmlType="submit">
            {t("allPages.buttonsText.save")}
          </Button>
        </Footer>
      }
    >
      {!isCreate && !employee ? (
        <Loader />
      ) : (
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          initialValues={employee}
          validateTrigger="onBlur"
          style={{ paddingTop: "24px" }}
        >
          <Form.Item
            name="Name"
            label={t("pagesSections.name")}
            rules={[{ validator: (_, value) => fullNameValidator(_, value, true) }]}
          >
            <Input name="employeeName" />
          </Form.Item>

          <Form.Item name="Email" label={t("employee.mail")} rules={[{ validator: validationEmail }]}>
            <Input name="employeeEmail" disabled={!!values?.Email} />
          </Form.Item>

          <Form.Item name="RoleId" label={t("employee.role")} rules={[{ validator: roleValidator }]}>
            <SelectField options={roleOptions || []} placeholder={t("roles.all")} />
          </Form.Item>
        </Form>
      )}
    </Drawer>
  );
});

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
