import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Checkbox, Drawer, Form, Input, Modal } from "antd";
import { theme } from "assets/theme/theme";
import { required } from "common/helpers/validators/required";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "store";
import { employeeRoleActions } from "store/employeeRole/employeeRole";
import {
  createEmployeeRole,
  getEmployeeRoleById,
  updateEmployeeRole,
} from "store/employeeRole/employeeRoleActionAsync";
import { employeeRoleAccessSelector, employeeRoleSelector } from "store/employeeRole/employeeRoleSelectors";
import { noticeActions } from "store/notice/notice";
import styled from "styled-components";
import { HeaderText } from "ui/HeaderText";
import { Loader } from "ui/Loader";

const { confirm } = Modal;

export const EmployeeRoleForm = memo(() => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();
  const isCreate = pathname.endsWith("create");
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [visible, setVisible] = useState(true);
  const dispatch = useAppDispatch();
  const role = useSelector(employeeRoleSelector);
  const policiesOptions = useSelector(employeeRoleAccessSelector);

  const closeDrawer = () => {
    form.resetFields();
    setVisible(false);
    setTimeout(() => navigate(-1), 150);
  };

  const showConfirm = () => {
    confirm({
      title: <HeaderText>{t(`allPages.confirmTitle`)}</HeaderText>,
      icon: <QuestionCircleOutlined style={{ color: theme.colors.red1 }} />,
      content: t(`roles.confirm`),
      okText: t("allPages.buttonsText.confirm"),
      cancelText: t("allPages.buttonsText.cancel"),
      onOk: submitForm,
    });
  };

  const submitForm = async () => {
    if (
      !(await form
        .validateFields()
        .then(() => true)
        .catch(() => false))
    ) {
      return;
    }

    const values = form.getFieldsValue();

    if (!values.Policies.length) {
      dispatch(noticeActions.add({ message: t(`validations.noLessOneRightRole`), type: "error" }));

      return;
    }

    dispatch((isCreate ? createEmployeeRole : updateEmployeeRole)({ ...role, ...values }))
      .unwrap()
      .then(() => {
        dispatch(noticeActions.add({ message: t(isCreate ? `roles.roleSuccessCreate` : `allPages.roleSuccessSaved`) }));
        closeDrawer();
      });
  };

  useEffect(() => {
    if (!isCreate && id) {
      dispatch(getEmployeeRoleById(id));
    }

    return () => {
      dispatch(employeeRoleActions.resetRole());
    };
  }, [id]);

  return (
    <Drawer
      title={<HeaderText>{isCreate ? t("employee.createRole") : t("employee.editRole")}</HeaderText>}
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
      {!isCreate && !role ? (
        <Loader />
      ) : (
        <Form
          style={{ paddingTop: "24px" }}
          form={form}
          layout="vertical"
          requiredMark={false}
          initialValues={role}
          validateTrigger="onBlur"
        >
          <Form.Item name={"Name"} label={t("roles.roleName")} rules={[{ validator: required }]}>
            <Input name="roleName" />
          </Form.Item>

          <Row>
            <Form.Item initialValue="none" name="Policies">
              <Group name="Policies" options={policiesOptions} />
            </Form.Item>
          </Row>
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

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Group = styled(Checkbox.Group)`
  display: flex;
  flex-flow: column;
`;
