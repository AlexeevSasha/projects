import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Divider, Drawer, Form, Input, InputNumber, Modal, Tabs } from "antd";
import { theme } from "assets/theme/theme";
import { getPartnersSection } from "common/constants/partners";
import { deepMerge } from "common/helpers/deepMerge";
import { required } from "common/helpers/validators/required";
import { Layouts, Section } from "common/interfaces/common";
import { Partner, PartnerType } from "common/interfaces/partners";
import { memo, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "store";
import { rightsSelector } from "store/auth/authSelectors";
import { draftPartner, getPartner, publishPartner } from "store/partners/partnersActionAsync";
import { partnerSelector } from "store/partners/partnersSelectors";
import { partnersActions } from "store/partners/partnersSlice";
import styled from "styled-components";
import { HeaderText } from "ui/HeaderText";
import { ImageField } from "ui/ImageField";
import { Loader } from "ui/Loader";
import { SelectField } from "ui/SelectField";
import { UploadDesc } from "ui/UploadDesc";
import { requiredMinMax } from "../../common/helpers/validators/requiredMinMax";
import { noticeActions } from "../../store/notice/notice";

const { confirm } = Modal;

export const PartnersForm = memo(() => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();
  const isCreate = pathname.endsWith("create");
  const [form] = Form.useForm<Partner>();
  const { t } = useTranslation();
  const [lang, setLang] = useState("Ru");
  const [visible, setVisible] = useState(true);
  const [values, setValues] = useState<Partner | undefined>();
  const dispatch = useAppDispatch();
  const partner = useSelector(partnerSelector);
  const rights = useSelector(rightsSelector);
  const section = getPartnersSection(rights);

  const layoutsOptions = useMemo(
    () =>
      Object.entries(Layouts).map(([value, label]) => ({
        label: t(`allPages.layouts.${label}`),
        value,
      })),
    []
  );
  const sectionOptions = useMemo(
    () =>
      Object.entries(Section).map(([value, label]) => ({
        label: t(`allPages.sections.${label}`),
        value,
      })),
    []
  );

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
      title: <TitleText>{t(`allPages.${draft ? "hideConfirmTitle" : "confirmTitle"}`)}</TitleText>,
      icon: <QuestionCircleOutlined style={{ color: theme.colors.red1 }} />,
      content: t(`partners.${draft ? "hideConfirmText" : "confirmText"}`),
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
    const formValues = deepMerge<Partner>({ ...values, PartnerType: PartnerType.own, Id: id }, form.getFieldsValue());
    dispatch((draft ? draftPartner : publishPartner)(formValues))
      .unwrap()
      .then(() => {
        dispatch(
          noticeActions.add({
            message: t(`partners.${draft ? "successHide" : "successPublish"}`),
          })
        );
        closeDrawer();
      });
  };

  useEffect(() => {
    if (!isCreate && id) {
      dispatch(getPartner(id)).unwrap().then(setValues);
    }

    return () => {
      dispatch(partnersActions.resetPartner());
    };
  }, [id]);

  return (
    <Drawer
      title={<HeaderText>{isCreate ? t("partners.form.addTitle") : t("partners.form.editTitle")}</HeaderText>}
      closable={false}
      destroyOnClose={true}
      getContainer={false}
      onClose={closeDrawer}
      visible={visible}
      width="440px"
      bodyStyle={{ padding: "0 30px" }}
      footer={
        <Footer>
          <div>
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
              onClick={() => (isCreate || partner?.Status === "Draft" ? showConfirm : submitForm)()}
              type="primary"
              htmlType="submit"
            >
              {isCreate || partner?.Status === "Draft"
                ? t("allPages.buttonsText.publish")
                : t("allPages.buttonsText.save")}
            </Button>
          </div>
        </Footer>
      }
    >
      <Tabs defaultActiveKey={lang} onChange={handleTabClick}>
        <Tabs.TabPane tab={t("allPages.ru")} key="Ru" />
        <Tabs.TabPane tab={t("allPages.en")} key="En" />
      </Tabs>

      {!isCreate && !partner ? (
        <Loader />
      ) : (
        <Form form={form} layout="vertical" requiredMark={false} initialValues={partner} validateTrigger="onBlur">
          <Form.Item name="SortOrder" label={t("allPages.form.sortOrder") + " *"} rules={[{ validator: required }]}>
            <InputNumber min={1} name="sortOrder" style={{ width: 145 }} />
          </Form.Item>

          <Form.Item
            name={["FullName", lang]}
            label={t("partners.form.partnerName") + " *"}
            rules={[{ validator: (_, value) => requiredMinMax(_, value, 1, 50) }]}
          >
            <Input name="partnerName" placeholder={t("partners.form.partnerNamePlaceholder")} />
          </Form.Item>

          <Form.Item name="Layout" label={t("allPages.location") + " *"} rules={[{ validator: required }]}>
            <SelectField placeholder={t("partners.form.locationPlaceholder")} options={layoutsOptions} />
          </Form.Item>

          <Form.Item
            name="Section"
            label={t("media.section") + " *"}
            rules={[{ validator: required }]}
            initialValue={section}
          >
            <SelectField
              disabled={!!section}
              placeholder={t("partners.form.sectionPlaceholder")}
              options={sectionOptions}
            />
          </Form.Item>

          <Form.Item
            name={["Information", lang]}
            label={t("partners.form.info") + " *"}
            rules={[{ validator: required }]}
          >
            <Input.TextArea rows={8} name="info" />
          </Form.Item>

          <Form.Item name={["PartnerUrl", lang]} label={t("partners.form.link")}>
            <Input name="partnerUrl" placeholder={t("partners.form.linkPlaceholder")} />
          </Form.Item>

          <Divider dashed />

          <Form.Item name="ImageUrl" label={t("partners.form.logo") + " *"} rules={[{ validator: required }]}>
            <ImageField
              validation={{
                width: 244,
                height: 122,
                size: 2048,
                format: ["png"],
                exact: true,
              }}
            />
          </Form.Item>

          <UploadDesc>
            {t("allPages.form.uploadDesc", {
              width: "244",
              height: "122",
              size: "2",
              format: "png",
            })}
          </UploadDesc>
        </Form>
      )}
    </Drawer>
  );
});

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  width: 100%;
`;

const TitleText = styled.span`
  font-weight: 600;
  font-size: 16px;
  padding: 16px 24px 0;
  display: block;
`;
