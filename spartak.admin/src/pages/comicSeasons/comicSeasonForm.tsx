import { Button, Drawer, Form, Input, Tabs } from "antd";
import { deepMerge } from "common/helpers/deepMerge";
import { required } from "common/helpers/validators/required";
import { ComicSessonEntity } from "common/interfaces/kids";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "store";
import { comicSeasonsActions } from "store/comicSeasons/comicSeasons";
import { getComicSeasonById, saveComicSeasons } from "store/comicSeasons/comicSeasonsActionAsync";
import { comicSeasonSelector } from "store/comicSeasons/comicSeasonsSelectors";
import { noticeActions } from "store/notice/notice";
import styled from "styled-components";
import { HeaderText } from "ui/HeaderText";
import { Loader } from "ui/Loader";

export const ComicSeasonForm = memo(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();
  const isCreate = pathname.endsWith("create");
  const [form] = Form.useForm<ComicSessonEntity>();
  const [lang, setLang] = useState("Ru");
  const [visible, setVisible] = useState(true);
  const [values, setValues] = useState<ComicSessonEntity | undefined>();
  const dispatch = useAppDispatch();
  const comicSeason = useSelector(comicSeasonSelector);

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
    await dispatch(
      saveComicSeasons(deepMerge<ComicSessonEntity>({ ...values, Id: comicSeason?.Id }, form.getFieldsValue()))
    )
      .unwrap()
      .then(() => {
        dispatch(noticeActions.add({ message: t("allPages.saveSuccess") }));
        closeDrawer();
      });
  };

  useEffect(() => {
    if (!isCreate && id) {
      dispatch(getComicSeasonById(id)).unwrap().then(setValues);
    }

    return () => {
      dispatch(comicSeasonsActions.resetEntity());
    };
  }, [id]);

  return (
    <Drawer
      title={<HeaderText>{t(`kids.${isCreate ? "seasonCreation" : "seasonEditing"}`)}</HeaderText>}
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

          <Button onClick={submitForm} type="primary" htmlType="submit">
            {t("allPages.buttonsText.save")}
          </Button>
        </Footer>
      }
    >
      <Tabs defaultActiveKey={lang} onChange={handleTabClick}>
        <Tabs.TabPane tab={t("allPages.ru")} key="Ru" />
        <Tabs.TabPane tab={t("allPages.en")} key="En" />
      </Tabs>

      {!isCreate && !comicSeason ? (
        <Loader />
      ) : (
        <Form form={form} layout="vertical" requiredMark={false} initialValues={comicSeason} validateTrigger="onBlur">
          <Form.Item
            name={["ComicSeasonName", lang]}
            label={t("kids.seasonName") + "*"}
            rules={[{ validator: required }]}
          >
            <Input placeholder={t("kids.seasonNamePlaceholder")} />
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
