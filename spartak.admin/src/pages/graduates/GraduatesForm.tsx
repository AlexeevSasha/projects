import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, DatePicker, Drawer, Form, Input, Modal, Select, Tabs, Tag } from "antd";
import { theme } from "assets/theme/theme";
import { statusColors } from "common/constants/status";
import { deepMerge } from "common/helpers/deepMerge";
import { birthdayValidator } from "common/helpers/validators/birthdayValidator";
import { fullNameValidator } from "common/helpers/validators/fullNameValidator";
import { required } from "common/helpers/validators/required";
import { urlValidator } from "common/helpers/validators/urlValidator";
import { Graduate } from "common/interfaces/graduates";
import moment from "moment";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "store";
import { graduatesActions } from "store/graduates/graduates";
import { draftGraduate, getGraduateById, publishGraduate } from "store/graduates/graduatesActionAsync";
import { graduateSectionOptionsSelector, graduateSelector } from "store/graduates/graduatesSelectors";
import { noticeActions } from "store/notice/notice";
import styled from "styled-components";
import { HeaderText } from "ui/HeaderText";
import { Loader } from "ui/Loader";

const { confirm } = Modal;

export const GraduatefForm = memo(() => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();
  const isCreate = pathname.endsWith("create");
  const [form] = Form.useForm<Graduate>();
  const { t } = useTranslation();
  const [lang, setLang] = useState("Ru");
  const [visible, setVisible] = useState(true);
  const [values, setValues] = useState<Graduate | undefined>();
  const dispatch = useAppDispatch();
  const graduate = useSelector(graduateSelector);
  const sectionsOptions = useSelector(graduateSectionOptionsSelector);

  const closeDrawer = () => {
    form.resetFields();
    setVisible(false);
    setTimeout(() => navigate(-1), 150);
  };

  const handleTabClick = (key: string) => {
    setValues(form.getFieldsValue());
    setLang(key);
  };

  const showConfirm = (draft?: boolean) => {
    confirm({
      title: <HeaderText>{t(`allPages.${draft ? "hideConfirmTitle" : "confirmTitle"}`)}</HeaderText>,
      icon: <QuestionCircleOutlined style={{ color: theme.colors.red1 }} />,
      content: t(`graduates.${draft ? "draftConfirmText" : "publishConfirmText"}`),
      okText: t("allPages.buttonsText.confirm"),
      cancelText: t("allPages.buttonsText.cancel"),
      onOk: () => submitForm(draft),
    });
  };

  const submitForm = async (draft?: boolean) => {
    if (
      !draft &&
      !(await form
        .validateFields()
        .then(() => true)
        .catch(() => false))
    ) {
      dispatch(noticeActions.add({ message: t("allPages.formError"), type: "error" }));

      return;
    }
    dispatch(
      (draft ? draftGraduate : publishGraduate)(deepMerge<Graduate>({ ...values, Id: id }, form.getFieldsValue()))
    )
      .unwrap()
      .then(() => {
        dispatch(
          noticeActions.add({
            message: t(`graduates.${draft ? "draftSuccess" : "publichSuccess"}`),
            closable: true,
          })
        );
        closeDrawer();
      });
  };

  useEffect(() => {
    if (!isCreate && id) {
      dispatch(getGraduateById(id)).unwrap().then(setValues);
    }

    return () => {
      dispatch(graduatesActions.resetEntity());
    };
  }, [id]);

  return (
    <Drawer
      title={<HeaderText>{isCreate ? t("graduates.addGraduate") : t("graduates.changeGraduate")}</HeaderText>}
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

          <Button
            onClick={() => showConfirm(true)}
            style={{
              marginRight: 8,
              color: theme.colors.red1,
              borderColor: theme.colors.red1,
            }}
          >
            {t("allPages.buttonsText.draft")}
          </Button>

          <Button
            onClick={() => (isCreate || graduate?.Status === "Draft" ? showConfirm : submitForm)()}
            type="primary"
            htmlType="submit"
          >
            {isCreate || graduate?.Status === "Draft"
              ? t("allPages.buttonsText.publish")
              : t("allPages.buttonsText.save")}
          </Button>
        </Footer>
      }
    >
      <Tabs defaultActiveKey={lang} onChange={handleTabClick}>
        <Tabs.TabPane tab={t("allPages.ru")} key="Ru" />
        <Tabs.TabPane tab={t("allPages.en")} key="En" />
      </Tabs>

      {!isCreate && !graduate ? (
        <Loader />
      ) : (
        <Form form={form} layout="vertical" requiredMark={false} initialValues={graduate} validateTrigger="onBlur">
          {graduate && (
            <Status>
              {t("allPages.status")}:{" "}
              <Tag color={statusColors[graduate?.Status || "None"]}>
                {t(`allPages.statuses.${graduate?.Status || "None"}`)}
              </Tag>
            </Status>
          )}

          <Form.Item
            name={["FullName", lang]}
            label={t("graduates.nameField") + " *"}
            rules={[{ validator: (_, value) => fullNameValidator(_, value) }]}
          >
            <Input name="clubsPlayerFio" placeholder={t("graduates.fioPlaceholder")} />
          </Form.Item>

          <Form.Item
            name="Birthday"
            label={t("allPages.form.dateOfBirth") + " *"}
            getValueFromEvent={(date) => date?.toISOString()}
            getValueProps={(date) => ({
              value: date ? moment(date) : undefined,
            })}
            rules={[{ validator: birthdayValidator }]}
          >
            <DatePicker
              getPopupContainer={(triggerNode) => triggerNode}
              showToday={false}
              name="clubsEmployeeDateOfBirth"
              placeholder={t("allPages.form.dateOfBirthPlaceholder")}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item name="GraduateUrl" label={t("allPages.link")} rules={[{ validator: urlValidator }]}>
            <Input name="clubsEmployeePosition" placeholder={t("graduates.urlPlaceholder")} />
          </Form.Item>

          <Form.Item name={["Team", lang]} label={t("graduates.team")}>
            <Input name="clubsEmployeePosition" placeholder={t("graduates.teamPlaceholder")} />
          </Form.Item>

          <Form.Item name="GraduateSectionId" label={t("graduates.sections") + " *"} rules={[{ validator: required }]}>
            <Select
              style={{ width: "100%" }}
              options={sectionsOptions}
              placeholder={t("graduates.sectionPlaceholder")}
            />
          </Form.Item>
        </Form>
      )}
    </Drawer>
  );
});

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
`;

const Status = styled.div`
  margin-bottom: 8px;

  & > *:last-child {
    margin-left: 8px;
  }
`;
