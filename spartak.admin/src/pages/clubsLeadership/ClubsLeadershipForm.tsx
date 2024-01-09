import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, DatePicker, Drawer, Form, Input, InputNumber, Modal, Tabs, Tag, Typography } from "antd";
import { theme } from "assets/theme/theme";
import { statusColors } from "common/constants/status";
import { deepMerge } from "common/helpers/deepMerge";
import { birthdayValidator } from "common/helpers/validators/birthdayValidator";
import { fullNameValidator } from "common/helpers/validators/fullNameValidator";
import { required } from "common/helpers/validators/required";
import { roleValidator } from "common/helpers/validators/roleValidator";
import moment from "moment";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "store";
import { noticeActions } from "store/notice/notice";
import styled from "styled-components";
import { HeaderText } from "ui/HeaderText";
import { ImageField } from "ui/ImageField";
import { Loader } from "ui/Loader";
import { SelectField } from "ui/SelectField";
import {
  draftClubsLeader,
  getClubsLeaderById,
  publishClubsLeader,
} from "../../store/clubsLeadership/clubsLeadershipActionAsync";
import { ILeadership } from "../../common/interfaces/ILeadership";
import { clubsLeaderSelector } from "../../store/clubsLeadership/clubsLeadershipSelectors";
import { clubsLeadershipActions } from "store/clubsLeadership/clubsLeadership";
import { rightsSelector } from "store/auth/authSelectors";
import { getClubSection } from "common/constants/teams";
import TextArea from "antd/lib/input/TextArea";

const { Text } = Typography;

const { confirm } = Modal;

export const ClubsLeadershipForm = memo(() => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();
  const isCreate = pathname.endsWith("create");
  const [form] = Form.useForm<ILeadership>();
  const { t } = useTranslation();
  const [lang, setLang] = useState("Ru");
  const [visible, setVisible] = useState(true);
  const [values, setValues] = useState<ILeadership | undefined>();
  const dispatch = useAppDispatch();
  const rights = useSelector(rightsSelector);
  const section = getClubSection(rights);

  const leader = useSelector(clubsLeaderSelector);

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
      content: t(`clubsLeadership.${draft ? "hideConfirmText" : "confirmText"}`),
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
      (draft ? draftClubsLeader : publishClubsLeader)(
        deepMerge<ILeadership>({ ...values, Id: id }, form.getFieldsValue())
      )
    )
      .unwrap()
      .then(() => {
        dispatch(
          noticeActions.add({
            message: t(`clubsLeadership.${draft ? "successHide" : "successPublish"}`),
            closable: true,
          })
        );
        closeDrawer();
      });
  };

  useEffect(() => {
    if (!isCreate && id) {
      dispatch(getClubsLeaderById(id)).unwrap().then(setValues);
    }

    return () => {
      dispatch(clubsLeadershipActions.resetLeader());
    };
  }, [id]);

  return (
    <Drawer
      title={<HeaderText>{isCreate ? t("clubsLeadership.addEmployee") : t("clubsLeadership.editEmployee")}</HeaderText>}
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
            onClick={() => (isCreate || leader?.Status === "Draft" ? showConfirm : submitForm)()}
            type="primary"
            htmlType="submit"
          >
            {isCreate || leader?.Status === "Draft"
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

      {!isCreate && !leader ? (
        <Loader />
      ) : (
        <Form form={form} layout="vertical" requiredMark={false} initialValues={leader} validateTrigger="onBlur">
          {leader && (
            <Status>
              {t("allPages.status")}:{" "}
              <Tag color={statusColors[leader?.Status || "None"]}>
                {t(`allPages.statuses.${leader?.Status || "None"}`)}
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
            label={t("clubsLeadership.fio") + " *"}
            rules={[{ validator: (_, value) => fullNameValidator(_, value) }]}
          >
            <Input name="clubsLeadershipFio" placeholder={t("clubsLeadership.fioPlaceholder")} />
          </Form.Item>

          <Form.Item
            name={["Position", lang]}
            label={t("allPages.position") + " *"}
            rules={[{ validator: roleValidator }]}
          >
            <Input placeholder={t("allPages.form.positionPlaceholder")} />
          </Form.Item>

          <Form.Item
            name="Section"
            label={t("clubsLeadership.section") + " *"}
            rules={[{ validator: required }]}
            initialValue={section}
          >
            <SelectField
              disabled={!!section}
              options={[
                { value: "Site", label: "Сайт" },
                { value: "Academy", label: "Академия" },
              ]}
            />
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
          <Form.Item name={["Biography", lang]} label={t("allPages.form.biography")}>
            <TextArea rows={8} />
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

          <StyledText>
            {t("allPages.form.uploadDesc", {
              width: "914",
              height: "836",
              size: "2",
              format: "png",
            })}
          </StyledText>
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
const StyledText = styled(Text)`
  color: ${theme.colors.middleGray};
`;
