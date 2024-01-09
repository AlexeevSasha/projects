import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Divider, Drawer, Form, Input, InputNumber, Modal, Tabs, Tag } from "antd";
import { theme } from "assets/theme/theme";
import { statusColors } from "common/constants/status";
import { deepMerge } from "common/helpers/deepMerge";
import { fullNameValidator } from "common/helpers/validators/fullNameValidator";
import { required } from "common/helpers/validators/required";
import { GraduateSection } from "common/interfaces/graduateSections";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "store";
import { graduateSectionsActions } from "store/graduateSections/graduateSections";
import {
  draftGraduateSections,
  getGraduateSectionsById,
  publishGraduateSections,
} from "store/graduateSections/graduateSectionsActionAsync";
import { graduateSectionSelector } from "store/graduateSections/graduateSectionsSelectors";
import { noticeActions } from "store/notice/notice";
import styled from "styled-components";
import { HeaderText } from "ui/HeaderText";
import { ImageField } from "ui/ImageField";
import { Loader } from "ui/Loader";
import { UploadDesc } from "ui/UploadDesc";

const { confirm } = Modal;

export const GraduateSectionsForm = memo(() => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();
  const isCreate = pathname.endsWith("create");
  const [form] = Form.useForm<GraduateSection>();
  const { t } = useTranslation();
  const [lang, setLang] = useState("Ru");
  const [visible, setVisible] = useState(true);
  const [values, setValues] = useState<GraduateSection | undefined>();
  const dispatch = useAppDispatch();
  const graduate = useSelector(graduateSectionSelector);

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
      content: t(`graduateSections.${draft ? "draftConfirmText" : "publishConfirmText"}`),
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
      (draft ? draftGraduateSections : publishGraduateSections)(
        deepMerge<GraduateSection>({ ...values, Id: id }, form.getFieldsValue())
      )
    )
      .unwrap()
      .then(() => {
        dispatch(
          noticeActions.add({
            message: t(`graduateSections.${draft ? "draftSuccess" : "publichSuccess"}`),
          })
        );
        closeDrawer();
      });
  };

  useEffect(() => {
    if (!isCreate && id) {
      dispatch(getGraduateSectionsById(id)).unwrap().then(setValues);
    }

    return () => {
      dispatch(graduateSectionsActions.resetEntity());
    };
  }, [id]);

  return (
    <Drawer
      title={
        <HeaderText>{isCreate ? t("graduateSections.createSection") : t("graduateSections.editSection")}</HeaderText>
      }
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

          <Form.Item name="SortOrder" label={t("allPages.form.sortOrder") + " *"} rules={[{ validator: required }]}>
            <InputNumber
              style={{ width: 145 }}
              min={1}
              name="SortOrder"
              placeholder={t("allPages.form.orderPlaceholder")}
            />
          </Form.Item>

          <Form.Item
            name={["FullName", lang]}
            label={t("graduateSections.sectionName") + " *"}
            rules={[{ validator: (_, value) => fullNameValidator(_, value) }]}
          >
            <Input name="sectionName" placeholder={t("clubsStaff.fioPlaceholder")} />
          </Form.Item>

          <Divider />

          <UploadWrapper>
            <div>
              <Form.Item
                name="ImageSectionUrl"
                label={t("graduateSections.sectionImg") + " *"}
                rules={[{ validator: required }]}
              >
                <ImageField
                  withCrop
                  validation={{
                    width: 780,
                    height: 427,
                    size: 2048,
                    format: ["png", "jpeg"],
                  }}
                />
              </Form.Item>

              <UploadDesc>
                {t("allPages.form.uploadDesc", {
                  width: "780",
                  height: "427",
                  size: "2",
                  format: "png, jpeg",
                })}
              </UploadDesc>
            </div>

            <div>
              <Form.Item
                name="ImageTeamUrl"
                label={t("graduateSections.teamImg") + " *"}
                rules={[{ validator: required }]}
              >
                <ImageField
                  withCrop
                  validation={{
                    width: 780,
                    height: 780,
                    size: 2048,
                    format: ["png", "jpeg"],
                  }}
                />
              </Form.Item>

              <UploadDesc>
                {t("allPages.form.uploadDesc", {
                  width: "780",
                  height: "780",
                  size: "2",
                  format: "png, jpeg",
                })}
              </UploadDesc>
            </div>
          </UploadWrapper>

          <Divider />
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

const UploadWrapper = styled.div`
  display: flex;
`;
