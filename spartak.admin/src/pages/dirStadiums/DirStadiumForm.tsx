import { Button, Drawer, Form, Input, InputNumber, Modal, Switch, Tabs, Typography } from "antd";
import { deepMerge } from "common/helpers/deepMerge";
import { Stadium } from "common/interfaces/stadiums";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "store";
import { getStadiumById, publishStadium } from "store/dirStadiums/dirStadiumActionAsync";
import { dirStadiumsActions } from "store/dirStadiums/dirStadiums";
import { dirStadiumSelector } from "store/dirStadiums/dirStadiumsSelectors";
import { noticeActions } from "store/notice/notice";
import styled from "styled-components";
import { Loader } from "ui/Loader";
import { requiredMinMax } from "../../common/helpers/validators/requiredMinMax";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { theme } from "../../assets/theme/theme";
import { HeaderText } from "../../ui/HeaderText";

const { confirm } = Modal;

export const DirStadiumForm = React.memo(() => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();
  const isCreate = pathname.endsWith("create");
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [lang, setLang] = useState("Ru");
  const [visible, setVisible] = useState(true);
  const [values, setValues] = useState<Stadium | undefined>();
  const dispatch = useAppDispatch();
  const stadium = useSelector(dirStadiumSelector);

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
    if (
      !(await form
        .validateFields()
        .then(() => true)
        .catch(() => false))
    ) {
      dispatch(noticeActions.add({ message: t("allPages.formError"), type: "error" }));

      return;
    }
    dispatch(publishStadium(deepMerge<Stadium>({ ...values, Id: id }, form.getFieldsValue())))
      .unwrap()
      .then(() => {
        closeDrawer();
        dispatch(noticeActions.add({ message: t(isCreate ? "dirStadiums.successAdd" : "allPages.saveSuccess") }));
      });
  };

  useEffect(() => {
    if (!isCreate && id) {
      dispatch(getStadiumById(id)).unwrap().then(setValues);
    }

    return () => {
      dispatch(dirStadiumsActions.resetStadium());
    };
  }, [id]);

  const showConfirm = () => {
    confirm({
      title: <HeaderText>{t(`allPages.confirmTitle`)}</HeaderText>,
      icon: <QuestionCircleOutlined style={{ color: theme.colors.red1 }} />,
      content: t(`dirStadiums.confirmText`),
      okText: t("allPages.buttonsText.confirm"),
      cancelText: t("allPages.buttonsText.cancel"),
      onOk: submitForm,
    });
  };

  return (
    <Drawer
      title={<Title>{isCreate ? t("dirStadiums.form.addTitle") : t("dirStadiums.form.editTitle")}</Title>}
      closable={false}
      destroyOnClose={true}
      getContainer={false}
      onClose={closeDrawer}
      visible={visible}
      width="440px"
      footer={
        <Footer>
          <Button onClick={closeDrawer} style={{ marginRight: 8 }}>
            {t("allPages.buttonsText.cancel")}
          </Button>

          <Button onClick={!isCreate ? submitForm : showConfirm} type="primary" htmlType={"submit"}>
            {t("allPages.buttonsText.publish")}
          </Button>
        </Footer>
      }
    >
      <Tabs defaultActiveKey={lang} onChange={handleTabClick}>
        <Tabs.TabPane tab="Русский язык" key="Ru" />
        <Tabs.TabPane tab="Английский язык" key="En" />
      </Tabs>

      {!isCreate && !stadium ? (
        <Loader />
      ) : (
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          initialValues={stadium || values}
          validateTrigger="onBlur"
        >
          <Form.Item
            name={["FullName", lang]}
            label={t("dirStadiums.form.stadionName") + " *"}
            rules={[{ validator: (_, value) => requiredMinMax(_, value, 1, 50) }]}
          >
            <Input name="stadiumName" placeholder={t("dirStadiums.form.stadionNamePlaceholder")} />
          </Form.Item>

          <Form.Item name="InStatId" label="id Instat">
            <InputNumber
              min={1}
              name="stadiumInStat"
              placeholder={t("dirStadiums.form.enterIdInstat")}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <SwitchContainer>
            <Typography.Text>{t("dirStadiums.form.yandexGoButton")}</Typography.Text>

            <Form.Item name="YandexGoButton" valuePropName="checked">
              <Switch />
            </Form.Item>
          </SwitchContainer>
        </Form>
      )}
    </Drawer>
  );
});

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
`;

const Footer = styled.div`
  text-align: right;
`;

const SwitchContainer = styled.div`
  display: flex;
  width: 280px;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`;
