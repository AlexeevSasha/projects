import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, DatePicker, Drawer, Form, Input, InputNumber, Modal, Select, Tabs, Tag, Typography } from "antd";
import { theme } from "assets/theme/theme";
import { statusColors } from "common/constants/status";
import { deepMerge } from "common/helpers/deepMerge";
import { birthdayValidator } from "common/helpers/validators/birthdayValidator";
import { countryValidator } from "common/helpers/validators/countryValidator";
import { fullNameValidator } from "common/helpers/validators/fullNameValidator";
import { required } from "common/helpers/validators/required";
import { roleValidator } from "common/helpers/validators/roleValidator";
import { Staff } from "common/interfaces/staff";
import moment from "moment";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "store";
import { clubsMedicalActions } from "store/clubsMedical/clubsMedical";
import { countriesOptionsSelector, ownTeamsOptionsSelector } from "store/dictionary/dictionarySelectors";
import { noticeActions } from "store/notice/notice";
import styled from "styled-components";
import { HeaderText } from "ui/HeaderText";
import { ImageField } from "ui/ImageField";
import { Loader } from "ui/Loader";
import { SelectField } from "ui/SelectField";
import { selectProps } from "../../common/helpers/customMulti";
import {
  draftClubsMedical,
  getClubsMedicalById,
  publishClubsMedical,
} from "../../store/clubsMedical/clubsMedicalActionAsync";
import { clubsMedicalPersonSelector } from "../../store/clubsMedical/clubsMedicalSelectors";

const { Text } = Typography;

const { confirm } = Modal;

export const ClubsMedicalForm = memo(() => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();
  const isCreate = pathname.endsWith("create");
  const [form] = Form.useForm<Staff>();
  const { t } = useTranslation();
  const [lang, setLang] = useState("Ru");
  const [visible, setVisible] = useState(true);
  const [values, setValues] = useState<Staff | undefined>();
  const dispatch = useAppDispatch();
  const countries = useSelector(countriesOptionsSelector);
  const teams = useSelector(ownTeamsOptionsSelector);
  const medicalPerson = useSelector(clubsMedicalPersonSelector);

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
      content: t(`clubsStaff.${draft ? "hideConfirmText" : "confirmText"}`),
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
      (draft ? draftClubsMedical : publishClubsMedical)(deepMerge<Staff>({ ...values, Id: id }, form.getFieldsValue()))
    )
      .unwrap()
      .then(() => {
        dispatch(
          noticeActions.add({
            message: t(`clubsStaff.${draft ? "successHide" : "successPublish"}`),
            closable: true,
          })
        );
        closeDrawer();
      });
  };

  useEffect(() => {
    if (!isCreate && id) {
      dispatch(getClubsMedicalById(id)).unwrap().then(setValues);
    }

    return () => {
      dispatch(clubsMedicalActions.resetMedical());
    };
  }, [id]);

  return (
    <Drawer
      title={<HeaderText>{isCreate ? t("clubsStaff.addEmployee") : t("clubsStaff.editEmployee")}</HeaderText>}
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
            onClick={() => (isCreate || medicalPerson?.Status === "Draft" ? showConfirm : submitForm)()}
            type="primary"
            htmlType="submit"
          >
            {isCreate || medicalPerson?.Status === "Draft"
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

      {!isCreate && !medicalPerson ? (
        <Loader />
      ) : (
        <Form form={form} layout="vertical" requiredMark={false} initialValues={medicalPerson} validateTrigger="onBlur">
          {medicalPerson && (
            <Status>
              {t("allPages.status")}:{" "}
              <Tag color={statusColors[medicalPerson?.Status || "None"]}>
                {t(`allPages.statuses.${medicalPerson?.Status || "None"}`)}
              </Tag>
            </Status>
          )}

          <Form.Item name="SortOrder" label={t("allPages.form.sortOrder") + " *"} rules={[{ validator: required }]}>
            <InputNumber
              style={{ width: 145 }}
              min={1}
              name="clubsEmployeeOrder"
              placeholder={t("allPages.form.orderPlaceholder")}
            />
          </Form.Item>

          <Form.Item
            name={["FullName", lang]}
            label={t("clubsStaff.fio") + " *"}
            rules={[{ validator: (_, value) => fullNameValidator(_, value) }]}
          >
            <Input name="clubsPlayerFio" placeholder={t("clubsStaff.fioPlaceholder")} />
          </Form.Item>

          <Form.Item
            name={["Position", lang]}
            label={t("allPages.position") + " *"}
            rules={[{ validator: roleValidator }]}
          >
            <Input placeholder={t("allPages.form.positionPlaceholder")} />
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

          <Form.Item
            name="CitizenshipId"
            label={t("allPages.form.citizenship") + " *"}
            rules={[{ validator: countryValidator }]}
          >
            <SelectField placeholder={t("allPages.form.citizenshipPlaceholder")} options={countries} />
          </Form.Item>

          <Form.Item name="TeamIds" label={t("allPages.form.teamBinding") + " *"} rules={[{ validator: required }]}>
            <Select
              style={{ width: "100%" }}
              {...selectProps({
                options: teams || [],
                fieldName: "TeamIds",
                form,
              })}
            />
          </Form.Item>

          <Form.Item name={["Biography", lang]} label={t("allPages.form.biography")}>
            <Input.TextArea rows={8} name="clubsEmployeeBiography" />
          </Form.Item>

          <Form.Item name="ImageUrl" label={t("allPages.photo") + " *"} rules={[{ validator: required }]}>
            <ImageField
              validation={{
                width: 914,
                height: 836,
                size: 2048,
                format: ["png"],
                exact: true,
              }}
            />
          </Form.Item>

          <Text>
            {t("allPages.form.uploadDesc", {
              format: "png",
              width: "914",
              height: "836",
              size: "2",
            })}
          </Text>
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
