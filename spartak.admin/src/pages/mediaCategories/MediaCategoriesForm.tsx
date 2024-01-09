import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Drawer, Form, Input, Modal, Tabs } from "antd";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store";
import { mediaCategorySelector } from "../../store/mediaCategories/mediaCategorySelectors";
import { Category } from "../../common/interfaces/mediaCategory";
import { deepMerge } from "../../common/helpers/deepMerge";
import { HeaderText } from "../../ui/HeaderText";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { theme } from "../../assets/theme/theme";
import { getCategoryById, publishCategory } from "../../store/mediaCategories/mediaCategoryActionAsync";
import { Loader } from "../../ui/Loader";
import styled from "styled-components";
import { mediaCategoryActions } from "../../store/mediaCategories/mediaCategory";
import { noticeActions } from "store/notice/notice";
import { requiredMinMax } from "../../common/helpers/validators/requiredMinMax";

const { confirm } = Modal;

export const MediaCategoriesForm = React.memo(() => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isCreate = pathname.endsWith("create");
  const [visible, setVisible] = useState(true);
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [lang, setLang] = useState("Ru");
  const [values, setValues] = useState<Category | undefined>();
  const category = useSelector(mediaCategorySelector);
  const dispatch = useAppDispatch();

  const closeDrawer = () => {
    form.resetFields();
    setVisible(false);
    setTimeout(() => navigate(-1), 150);
  };

  const handleTabClick = (key: string) => {
    setValues(form.getFieldsValue());
    setLang(key);
  };

  const submitForm = async () => {
    const formValues = deepMerge<Category>({ ...values, Id: id }, form.getFieldsValue());
    if (
      !(await form
        .validateFields()
        .then(() => true)
        .catch(() => false)) ||
      !formValues.CategoryName?.Ru ||
      !formValues.CategoryName?.En
    ) {
      dispatch(noticeActions.add({ message: t("allPages.formError"), type: "error" }));

      return;
    }
    dispatch(publishCategory(formValues))
      .unwrap()
      .then(() => closeDrawer());
  };

  const showConfirm = () => {
    confirm({
      title: <HeaderText>{t("allPages.confirmTitle")}</HeaderText>,
      icon: <QuestionCircleOutlined style={{ color: theme.colors.red1 }} />,
      content: t("mediaCategories.confirmText"),
      okText: t("allPages.buttonsText.confirm"),
      cancelText: t("allPages.buttonsText.cancel"),
      onOk: submitForm,
    });
  };

  useEffect(() => {
    if (!isCreate && id) {
      dispatch(getCategoryById(id))
        .unwrap()
        .then((value) => setValues(value));
    }

    return () => {
      dispatch(mediaCategoryActions.resetCategory());
    };
  }, [id]);

  return (
    <Drawer
      title={
        <HeaderText>{isCreate ? t("mediaCategories.categoryCreate") : t("mediaCategories.categoryEdit")}</HeaderText>
      }
      closable={false}
      destroyOnClose={true}
      getContainer={false}
      onClose={closeDrawer}
      visible={visible}
      width="440px"
      bodyStyle={{ padding: "0 30px" }}
      footer={
        <Footer isCreate={isCreate}>
          <Button onClick={closeDrawer} style={{ marginRight: 8 }}>
            {t("allPages.buttonsText.cancel")}
          </Button>

          <Button onClick={isCreate ? showConfirm : () => submitForm()} type="primary" htmlType="submit">
            {isCreate ? t("allPages.buttonsText.publish") : t("allPages.buttonsText.save")}
          </Button>
        </Footer>
      }
    >
      <Tabs defaultActiveKey={lang} onChange={handleTabClick}>
        <Tabs.TabPane tab={t("allPages.ru")} key="Ru" />
        <Tabs.TabPane tab={t("allPages.en")} key="En" />
      </Tabs>

      {!isCreate && !category ? (
        <Loader />
      ) : (
        <Form form={form} layout="vertical" requiredMark={false} initialValues={category}>
          <Form.Item
            name={["CategoryName", lang]}
            label={t("mediaCategories.categoryName") + " *"}
            rules={[{ validator: (_, value) => requiredMinMax(_, value, 1, 50) }]}
          >
            <Input placeholder={t("mediaCategories.categoryNamePlaceholder")} />
          </Form.Item>
        </Form>
      )}
    </Drawer>
  );
});

const Footer = styled.div<{ isCreate: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
