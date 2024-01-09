import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Divider, Drawer, Form, Input, InputNumber, Modal, Tabs } from "antd";
import { theme } from "assets/theme/theme";
import { deepMerge } from "common/helpers/deepMerge";
import { cityValidator } from "common/helpers/validators/cityValidator";
import { countryValidator } from "common/helpers/validators/countryValidator";
import { fullNameValidator } from "common/helpers/validators/fullNameValidator";
import { required } from "common/helpers/validators/required";
import { Team, TeamType } from "common/interfaces/teams";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "store";
import { citiesOptionsSelector, countriesOptionsSelector } from "store/dictionary/dictionarySelectors";
import { dirTemasActions } from "store/dirTeams/dirTeams";
import { getDirTeamById, publishDirTeam } from "store/dirTeams/dirTeamsActionAsync";
import { dirTeamSelector } from "store/dirTeams/dirTeamsSelectors";
import { noticeActions } from "store/notice/notice";
import styled from "styled-components";
import { ImageField } from "ui/ImageField";
import { Loader } from "ui/Loader";
import { SelectField } from "ui/SelectField";
import { UploadDesc } from "ui/UploadDesc";
import { HeaderText } from "../../ui/HeaderText";

const { confirm } = Modal;

export const DirTeamsForm = memo(() => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();
  const isCreate = pathname.endsWith("create");
  const [form] = Form.useForm<Team>();
  const { t } = useTranslation();
  const [lang, setLang] = useState("Ru");
  const [visible, setVisible] = useState(true);
  const [values, setValues] = useState<Team | undefined>();
  const dispatch = useAppDispatch();
  const team = useSelector(dirTeamSelector);
  const countriesOptions = useSelector(countriesOptionsSelector);
  const citiesOptions = useSelector(citiesOptionsSelector);

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
    const formValues = deepMerge<Team>({ ...values, Id: id, TeamType: TeamType.opposite }, form.getFieldsValue());
    formValues.ShortName = { ...formValues.FullName };
    dispatch(publishDirTeam(formValues))
      .unwrap()
      .then(() => {
        closeDrawer();
        dispatch(noticeActions.add({ message: t(isCreate ? "dirTeam.successAdd" : "allPages.saveSuccess") }));
      });
  };

  useEffect(() => {
    if (!isCreate && id) {
      dispatch(getDirTeamById(id)).unwrap().then(setValues);
    }

    return () => {
      dispatch(dirTemasActions.resetTeam());
    };
  }, [id]);

  const showConfirm = () => {
    confirm({
      title: <HeaderText>{t(`allPages.confirmTitle`)}</HeaderText>,
      icon: <QuestionCircleOutlined style={{ color: theme.colors.red1 }} />,
      content: t(`dirTeam.confirmText`),
      okText: t("allPages.buttonsText.confirm"),
      cancelText: t("allPages.buttonsText.cancel"),
      onOk: submitForm,
    });
  };

  return (
    <Drawer
      title={<Title>{isCreate ? t("dirTeam.form.teamBuilding") : t("dirTeam.form.editTitle")}</Title>}
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
            {isCreate ? t("allPages.buttonsText.publish") : t("allPages.buttonsText.save")}
          </Button>
        </Footer>
      }
    >
      <Tabs defaultActiveKey={lang} onChange={handleTabClick}>
        <Tabs.TabPane tab="Русский язык" key="Ru" />
        <Tabs.TabPane tab="Английский язык" key="En" />
      </Tabs>

      {!isCreate && !team ? (
        <Loader />
      ) : (
        <Form form={form} layout="vertical" requiredMark={false} initialValues={team} validateTrigger="onBlur">
          <Form.Item name="SortOrder" style={{ display: "none" }} initialValue={10}>
            <InputNumber />
          </Form.Item>

          <Form.Item
            name={["FullName", lang]}
            label={t("dirTeam.form.commandName") + " *"}
            rules={[{ validator: (_, value) => fullNameValidator(_, value) }]}
          >
            <Input name="teamName" placeholder={t("dirTeam.form.commandNamePlaceholder")} />
          </Form.Item>

          <Form.Item name="CityId" label={t("dirTeam.form.city") + " *"} rules={[{ validator: cityValidator }]}>
            <SelectField placeholder={t("dirTeam.form.cityPlaceholder")} options={citiesOptions} />
          </Form.Item>

          <Form.Item
            name="CountryId"
            label={t("dirTeam.form.country") + " *"}
            rules={[{ validator: countryValidator }]}
          >
            <SelectField placeholder={t("dirTeam.form.countryPlaceholder")} options={countriesOptions} />
          </Form.Item>

          <Divider style={{ margin: "12px 0" }} dashed />

          <Form.Item name="ImageUrl" label={t("dirTeam.form.teamLogo") + " *"} rules={[{ validator: required }]}>
            <ImageField
              validation={{
                width: 220,
                height: 220,
                size: 2048,
                format: ["png"],
                exact: true,
              }}
            />
          </Form.Item>

          <UploadDesc>
            {t("allPages.form.uploadDesc", {
              width: "220",
              height: "220",
              size: "2",
              format: "png",
            })}
          </UploadDesc>
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
